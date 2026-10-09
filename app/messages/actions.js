"use server";

// Import disesuaikan menggunakan server client
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteMessageAction(formData) {
  // 1. Panggil instance Supabase di dalam fungsi
  const supabase = await createClient(); 

  // 2. Ambil ID pesan dari input form
  const messageId = formData.get("id");

  if (!messageId) return;

  // 3. Eksekusi penghapusan database (Sesuaikan 'messages' dengan nama tabel aslimu)
  const { error } = await supabase
    .from("messages") 
    .delete()
    .eq("id", messageId);

  if (error) {
    console.error("Gagal menghapus pesan:", error.message);
  }

  // 4. Perbarui tampilan halaman setelah data dihapus
  revalidatePath("/messages");
}