import { favorites } from "@/lib/db";

export async function GET() {
  return Response.json(favorites);
}

export async function POST(request) {
  const body = await request.json();

  if (!body.id || !body.name) {
    return Response.json(
      { error: "id dan name wajib diisi" },
      { status: 400 }
    );
  }

  const alreadyExists = favorites.some((f) => f.id === body.id);
  if (alreadyExists) {
    return Response.json(
      { error: "User ini sudah difavoritkan" },
      { status: 400 }
    );
  }

  favorites.push(body);
  return Response.json(body, { status: 201 });
}