"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitContactForm(formData) {
  try {
    const supabase = await createClient();
    
    // Ambil data dari form
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Masukkan data ke tabel Supabase
    const { error } = await supabase
      .from("messages")
      .insert([{ name, email, message }]);

    if (error) {
      return { success: false, error: error.message };
    }

    // Perbarui halaman agar data terbaru langsung muncul
    revalidatePath("/messages");
    
    // KEMBALIKAN STATUS SUKSES KE KLIEN
    return { success: true };
  } catch (err) {
    console.error("Kesalahan sistem pada action:", err);
    // Jika ada error, kembalikan format pesan yang bisa dibaca klien (bukan meledak)
    return { success: false, error: "Gagal memproses pengiriman di server." };
  }
}