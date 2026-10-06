"use server";

import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

// Ubah parameter menjadi formData
export async function deleteMessageAction(formData) {
  //ekstrak ID dari formData
  const id = formData.get("id");

 if (!id) return;

  // Hapus data secara permanen dari Supabase
  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("id", id); // Hapus baris di mana kolom 'id' sama dengan id dari form

  if (error) {
    console.error("Gagal menghapus pesan:", error.message);
    return;
  }
  
  // Muat ulang halaman agar UI ter-update
  revalidatePath("/messages");
}