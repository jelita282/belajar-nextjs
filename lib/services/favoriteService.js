import {
  findAllFavorites,
  findFavoriteById,
  insertFavorite,
  deleteFavoriteById,
} from "@/lib/repositories/favoriteRepository";

function validateFavoriteInput(body) {
  if (!body.id || !body.name) {
    return { valid: false, error: "id dan name wajib diisi" };
  }
  return { valid: true };
}

export async function getAllFavorites() {
  return await findAllFavorites();
}

export async function addFavorite(body) {
  const validation = validateFavoriteInput(body);
  if (!validation.valid) {
    return { success: false, status: 400, error: validation.error };
  }

  const alreadyExists = await findFavoriteById(body.id);
  if (alreadyExists) {
    return { success: false, status: 400, error: "User ini sudah difavoritkan" };
  }

  const saved = await insertFavorite(body);
  return { success: true, status: 201, data: saved };
}

export async function removeFavorite(id) {
  const deleted = await deleteFavoriteById(id);
  if (!deleted) {
    return { success: false, status: 404, error: "Data tidak ditemukan" };
  }

  return { success: true, status: 200, message: "Berhasil dihapus" };
}
