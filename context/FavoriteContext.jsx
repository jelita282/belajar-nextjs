"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FavoriteContext = createContext(undefined);

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // ---> USEEFFECT YANG SUDAH DIGABUNG (DENGAN PENGAMAN) <---
  useEffect(() => {
    fetch("/api/favorites")
      .then((res) => {
        // Cek dulu apakah respons API berhasil (status 200-299)
        if (!res.ok) {
           throw new Error(`Gagal mengambil data: Status ${res.status}`);
        }
        return res.json();
      })
      .then(setFavorites)
      .catch((error) => console.error("Error fetching favorites:", error)); 
  }, []);

  async function addFavorite(user) {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (res.ok) {
      const saved = await res.json();
      // Tambahkan baris ini untuk membongkar bungkusan data dari API
      const userData = saved.data ? saved.data : saved; 
      
      // Masukkan userData yang sudah bersih ke dalam state
      setFavorites((prev) => [...prev, userData]);
    }
  }

  async function removeFavorite(userId) {
    const res = await fetch(`/api/favorites/${userId}`, { method: "DELETE" });

    if (res.ok) {
      setFavorites((prev) => prev.filter((f) => f.id !== userId));
    }
  }

  function isFavorite(userId) {
    return favorites.some((f) => f.id === userId);
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