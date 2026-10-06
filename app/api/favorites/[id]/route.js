import { removeFavorite } from "@/lib/services/favoriteService";

export async function DELETE(request, { params }) {
  const { id } = await params;
  const result = await removeFavorite(id);

  if (!result.success) {
    return Response.json({ error: result.error }, { status: result.status });
  }

  return Response.json({ message: result.message });
}
