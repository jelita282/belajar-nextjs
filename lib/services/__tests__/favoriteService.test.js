import { addFavorite, removeFavorite } from "../favoriteService";
import { favorites } from "@/lib/db"; 

// Bersihkan array sebelum setiap tes dijalankan agar data tes tidak menumpuk
beforeEach(() => {
  favorites.length = 0;
});

describe("favoriteService", () => {
  test("addFavorite berhasil menyimpan data valid", () => {
    const result = addFavorite({ id: 1, name: "Ayu" });
    
    expect(result.success).toBe(true);
    expect(result.status).toBe(201);
  });

  test("addFavorite menolak data tanpa name", () => {
    const result = addFavorite({ id: 1 });
    
    expect(result.success).toBe(false);
    expect(result.status).toBe(400);
  });

  test("addFavorite menolak id yang sudah ada", () => {
    addFavorite({ id: 1, name: "Ayu" });
    const result = addFavorite({ id: 1, name: "Ayu Lagi" });
    
    expect(result.success).toBe(false);
    expect(result.status).toBe(400);
    expect(result.error).toBe("User ini sudah difavoritkan");
  });

  test("removeFavorite berhasil menghapus data yang ada", () => {
    addFavorite({ id: 1, name: "Ayu" });
    const result = removeFavorite(1);
    
    expect(result.success).toBe(true);
  });

  test("removeFavorite gagal kalau id tidak ditemukan", () => {
    const result = removeFavorite(999);
    
    expect(result.success).toBe(false);
    expect(result.status).toBe(404);
  });
});