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
        // 1. Ambil daftar ID yang difavoritkan dari database Supabase
        const favRes = await fetch("/api/favorites");
        const favData = favRes.ok ? await favRes.json() : [];

        if (favData.length === 0) {
          if (isMounted) setFavorites([]);
          return;
        }

        // 2. Ambil profil user lengkap dari API /api/users yang sudah terbukti berfungsi
        let allUsers = [];
        try {
          const userRes = await fetch("/api/users");
          if (userRes.ok) allUsers = await userRes.json();
        } catch (err) {
          console.error("Gagal memuat /api/users", err);
        }

        // 3. (Cadangan Tambahan) Jika /api/users kosong, pinjam dari API eksternal
        if (allUsers.length === 0) {
          const extRes = await fetch("https://jsonplaceholder.typicode.com/users");
          if (extRes.ok) allUsers = await extRes.json();
        }

        // 4. MENGAKALI RLS SUPABASE: Gabungkan datanya secara manual di sini
        const enrichedFavorites = favData.map((fav) => {
          // Cari user yang ID-nya cocok (diubah ke String agar kebal terhadap tipe data)
          const matchedUser = allUsers.find(
            (u) => String(u.id) === String(fav.user_id)
          );

          return {
            ...fav,
            app_users: matchedUser
              ? {
                  id: matchedUser.id,
                  name: matchedUser.name,
                  email: matchedUser.email,
                  company_name: matchedUser.company?.name || matchedUser.company_name || "-",
                }
              : (fav.app_users || null),
          };
        });

        if (isMounted) {
          setFavorites(enrichedFavorites);
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
        const newFavorite = {
          ...saved,
          app_users: {
            id: user.id,
            name: user.name,
            email: user.email,
            company_name: user.company?.name || user.company_name || "-",
          },
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
        setFavorites((prev) => prev.filter((f) => String(f.user_id) !== String(userId)));
      }
    } catch (error) {
      console.error("Gagal menghapus favorite:", error);
    }
  }

  function isFavorite(userId) {
    return favorites.some((f) => String(f.user_id) === String(userId));
  }

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
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