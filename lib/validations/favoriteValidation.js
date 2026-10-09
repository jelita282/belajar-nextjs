export function validateFavoriteInput(body) {
  if (!body.user_id) {
    return { valid: false, error: "user_id wajib diisi" };
  }
  return { valid: true };
}