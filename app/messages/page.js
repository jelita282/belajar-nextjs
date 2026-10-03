import { messages } from "@/lib/db";
import { deleteMessageAction } from "./actions"; // Import Server Action

export default function MessagesPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-bold">Pesan Masuk</h1>

      <div className="mt-8 space-y-4">
        {messages.length === 0 ? (
          <p className="text-muted-foreground">Belum ada pesan masuk.</p>
        ) : (
          messages.map((msg) => (
            // Tambahkan flex agar tombol hapus berada di sebelah kanan
            <div key={msg.id} className="rounded-lg border p-4 flex justify-between items-start">
              <div>
                <p className="font-medium">{msg.name} — {msg.email}</p>
                <p className="mt-1 text-sm text-muted-foreground">{msg.message}</p>
              </div>

              {/* Form untuk memanggil Server Action*/}
              <form action={deleteMessageAction.bind(null, msg.id)}>
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                >
                  Hapus
                </button>
              </form>
            </div>
          ))
        )}
      </div>
    </section>
  );
}