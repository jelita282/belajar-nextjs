import { connection } from "next/server";
// Import disesuaikan menggunakan server client
import { createClient } from "@/lib/supabase/server";
import { deleteMessageAction } from "./actions";

export default async function MessagesPage() {
  // Mengaktifkan rendering dinamis (bawaan Next.js versi terbaru)
  await connection();

  // 1. Panggil instance Supabase di dalam komponen
  const supabase = await createClient();

  // 2. Ambil data dari tabel 'messages'
  const { data: messages, error } = await supabase
    .from("messages") 
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Gagal memuat pesan: {error.message}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Daftar Pesan</h1>
      
      {!messages || messages.length === 0 ? (
        <p className="text-muted-foreground">Belum ada pesan yang masuk.</p>
      ) : (
        <ul className="space-y-4">
          {messages.map((msg) => (
            <li key={msg.id} className="flex items-start justify-between rounded-lg border p-4 shadow-sm">
              <div>
                {/* Sesuaikan msg.name / msg.message dengan nama kolom di tabel database kamu */}
                <p className="font-semibold">{msg.name || "Anonim"}</p>
                <p className="mt-1 text-foreground">{msg.message}</p>
              </div>
              
              {/* Form penghapusan yang memanggil deleteMessageAction */}
              <form action={deleteMessageAction}>
                <input type="hidden" name="id" value={msg.id} />
                <button 
                  type="submit" 
                  className="rounded-md bg-destructive px-3 py-1.5 text-sm font-medium text-destructive-foreground hover:bg-destructive/90"
                >
                  Hapus
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}