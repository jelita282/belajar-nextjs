import { addFavorite } from "@/lib/services/favoriteService";
// 1. Tambahkan import ini untuk mengambil data dari db.js
import { favorites } from "@/lib/db"; 

// 2. Tambahkan fungsi GET ini untuk merespons fetch() dari frontend
export async function GET() {
  return Response.json(favorites);
}

// 3. fungsi POST ini untuk menambahkan data ke favorites
export async function POST(request) {
  let body;

  try {
    //mengecek apakah request memiliki body
    const text = await request.text();
    if (!text) {
       return Response.json({ error: "Body request tidak boleh kosong sama sekali" }, { status: 400 });
    }
    body = JSON.parse(text);

    // Mengecek jika user mengirim objek JSON yang kosong seperti "{}"
    if (Object.keys(body).length === 0) {
       return Response.json({ error: "Data kosong. Harap kirimkan id dan name." }, { status: 400 });
    }

  } catch (error) {
    return Response.json({ error: "Format JSON tidak valid" }, { status: 400 });
  }

  const result = addFavorite(body);

  if (!result.success) {
    return Response.json({ error: result.error }, { status: result.status });
  }
return Response.json({ success: true, data: body }, { status: result.status });
}