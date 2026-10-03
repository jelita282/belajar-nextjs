export function validateFavoriteInput(body) {
  if (!body.id || !body.name) {
    return { valid: false, error: "id dan name wajib diisi" };
  }

  return { valid: true };
}