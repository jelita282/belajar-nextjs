"use server";

import { messages } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function deleteMessageAction(id) {
  // 1. Mencari posisi (index) pesan berdasarkan ID-nya
  const index = messages.findIndex((msg) => msg.id === id);

  if (index !== -1) {
    // 2. Menghapus data dari array db.js
    messages.splice(index, 1);
    
    // 3. Memerintahkan Next.js untuk memuat ulang halaman secara otomatis
    revalidatePath("/messages");
  }
}