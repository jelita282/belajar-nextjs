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

export async function PATCH(request, { params }) {
  const { id } = await params;

// 1. Mencari posisi datanya di array (sama seperti logika DELETE)
  const index = favorites.findIndex((f) => String(f.id) === id);
  if (index === -1) {
    return Response.json({ error: "Data tidak ditemukan" }, { status: 404 });
  }

  try {
    const body = await request.json();

// 2. Memvalidasi data agar tidak memproses request kosong
    if (!body || Object.keys(body).length === 0) {
      return Response.json({ error: "Data update tidak boleh kosong" }, { status: 400 });
    }

    // 3. Menggabungkan data lama dengan data baru yang dikirim user
    favorites[index] = { ...favorites[index], ...body };

    return Response.json({
      message: "Data berhasil diperbarui",
      data: favorites[index]
    });
    
  } catch (error) {
    return Response.json({ error: "Format JSON tidak valid" }, { status: 400 });
  }
}