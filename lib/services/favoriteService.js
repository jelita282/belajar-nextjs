import { favorites } from "@/lib/db"; 

export const addFavorite = (data) => {
  // Skenario: menolak data tanpa name
  if (!data || !data.name) {
    return { success: false, status: 400 };
  }

  // Skenario: menolak id yang sudah ada
  const isExist = favorites.some((fav) => fav.id === data.id);
  if (isExist) {
    return { success: false, status: 400, error: "User ini sudah difavoritkan" };
  }

  // Skenario: berhasil menyimpan data valid
  favorites.push(data);
  return { success: true, status: 201 };
};

export const removeFavorite = (id) => {
  const index = favorites.findIndex((fav) => fav.id === id);
  
  // Skenario: gagal kalau id tidak ditemukan
  if (index === -1) {
    return { success: false, status: 404 };
  }

  // Skenario: berhasil menghapus data yang ada
  favorites.splice(index, 1);
  return { success: true, status: 200 };
};