"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const FavoriteContext = createContext(undefined);

export function FavoriteProvider({ children }) {
  const { isLoggedIn } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (!isLoggedIn) {
      setFavorites([]);
      return;
    }

    // Dibungkus dalam fungsi async agar terhindar dari error ESLint
    const loadFavorites = async () => {
      try {
        const res = await fetch("/api/favorites");
        if (res.ok) {
          const data = await res.json();
          setFavorites(data);
        }
      } catch (error) {
        console.error("Gagal mengambil data favorites:", error);
      }
    };

    loadFavorites();
  }, [isLoggedIn]);

  async function addFavorite(user) {
    if (!isLoggedIn) {
      alert("Silakan login terlebih dahulu untuk menambahkan favorite.");
      return;
    }

    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: user.id }),
    });

    if (res.ok) {
      const saved = await res.json();
      
      // Tambahan cerdas: Gabungkan data profil lokal agar saat baru diklik, 
      // halaman tidak menampilkan "User Tidak Diketahui" sebelum di-refresh.
      const newFavorite = {
        ...saved,
        app_users: {
          id: user.id,
          name: user.name,
          email: user.email,
          company_name: user.company?.name || "",
        }
      };
      setFavorites((prev) => [...prev, newFavorite]);
    }
  }

  async function removeFavorite(userId) {
    const res = await fetch(`/api/favorites/${userId}`, { method: "DELETE" });

    if (res.ok) {
      setFavorites((prev) => prev.filter((f) => f.user_id !== userId));
    }
  }

  function isFavorite(userId) {
    return favorites.some((f) => f.user_id === userId);
  }

  const value = { favorites, addFavorite, removeFavorite, isFavorite };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorite() {
  const context = useContext(FavoriteContext);
  if (context === undefined) {
    throw new Error("useFavorite harus dipakai di dalam <FavoriteProvider>");
  }
  return context;
}