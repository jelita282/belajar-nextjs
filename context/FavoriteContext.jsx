"use client";

import { createContext, useContext, useEffect, useState } from "react";

const FavoriteContext = createContext(undefined);

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetch("/api/favorites")
      .then((res) => res.json())
      .then(setFavorites);
  }, []);

  async function addFavorite(user) {
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (res.ok) {
      const saved = await res.json();
      setFavorites((prev) => [...prev, saved]);
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