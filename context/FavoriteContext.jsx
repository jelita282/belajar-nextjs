"use client";

import { createContext, useContext, useState, useEffect } from "react";

// Import Supabase khusus untuk sisi Client.
// Jika file client Supabase kamu bernama lain (misal: "@/lib/supabase"), silakan sesuaikan baris ini.
import { createClient } from "@/lib/supabase/client";

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const supabase = createClient();

  // Fungsi utama untuk menarik data dari database
  const fetchFavorites = async () => {
    try {
      // 📍 INI KUNCI PERBAIKANNYA: 
      // Kita menambahkan ", app_users(*)" di dalam select().
      // Perintah ini menyuruh Supabase untuk tidak hanya mengambil ID favorit, 
      // tetapi juga menarik semua detail nama, email, dll dari tabel app_users.
      const { data, error } = await supabase
        .from("favorites")
        .select("*, app_users(*)"); 

      if (error) {
        console.error("Gagal memuat favorites:", error.message);
        return;
      }

      if (data) {
        setFavorites(data);
      }
    } catch (err) {
      console.error("Terjadi kesalahan sistem saat fetch:", err);
    }
  };

  // Otomatis mengambil data ketika web pertama kali dimuat
  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <FavoriteContext.Provider value={{ favorites, setFavorites, fetchFavorites }}>
      {children}
    </FavoriteContext.Provider>
  );
}

// Hook kustom agar komponen lain mudah menggunakan context ini
export function useFavorite() {
  return useContext(FavoriteContext);
}