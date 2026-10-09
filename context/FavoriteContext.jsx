"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";

const FavoriteContext = createContext(undefined);

export function FavoriteProvider({ children }) {
  const { isLoggedIn } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    let isMounted = true;

    if (!isLoggedIn) {
      // Solusi ESLint: Menunda pemanggilan setState ke akhir antrean eksekusi
      // agar tidak memicu render beruntun (cascading renders) yang dilarang React.
      const timeoutId = setTimeout(() => {
        if (isMounted) setFavorites([]);
      }, 0);
      return () => {
        clearTimeout(timeoutId);
        isMounted = false;
      };
    }

    const loadFavorites = async () => {
      try {
        const res = await fetch("/api/favorites");
        if (res.ok) {
          const data = await res.json();
          if (isMounted) setFavorites(data);
        }
      } catch (error) {
        console.error("Gagal mengambil data favorites:", error);
      }
    };

    loadFavorites();

    return () => {
      isMounted = false;
    };
  }, [isLoggedIn]);

  async function addFavorite(user) {
    if (!isLoggedIn) {
      alert("Silakan login terlebih dahulu untuk menambahkan favorite.");
      return;
    }

    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id }),
      });

      if (res.ok) {
        const saved = await res.json();
        
        // Membentuk struktur data yang sama persis dengan kembalian dari Supabase
        const newFavorite = {
          ...saved,
          app_users: {
            id: user.id,
            name: user.name,
            email: user.email,
            company_name: user.company?.name || user.company_name || "-",
          }
        };
        setFavorites((prev) => [...prev, newFavorite]);
      }
    } catch (error) {
      console.error("Gagal menambah favorite:", error);
    }
  }

  async function removeFavorite(userId) {
    try {
      const res = await fetch(`/api/favorites/${userId}`, { method: "DELETE" });
      if (res.ok) {
        setFavorites((prev) => prev.filter((f) => f.user_id !== userId));
      }
    } catch (error) {
      console.error("Gagal menghapus favorite:", error);
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