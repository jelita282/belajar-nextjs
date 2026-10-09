import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();

    // 📍 INI KUNCI UTAMANYA: Tambahkan relasi ke app_users
    const { data, error } = await supabase
      .from("favorites")
      .select("*, app_users(*)"); 

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (err) {
    console.error("Error di API Favorites:", err);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}

// (Biarkan fungsi POST() di bawahnya tetap seperti aslinya, jangan dihapus)