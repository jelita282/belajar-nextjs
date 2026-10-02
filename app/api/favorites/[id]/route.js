import { favorites } from "@/lib/db";

export async function DELETE(request, { params }) {
  const { id } = await params;
  const index = favorites.findIndex((f) => String(f.id) === id);

  if (index === -1) {
    return Response.json({ error: "Data tidak ditemukan" }, { status: 404 });
  }

  favorites.splice(index, 1);
  return Response.json({ message: "Berhasil dihapus" });
}