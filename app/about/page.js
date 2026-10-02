import { CheckCircle2 } from "lucide-react";

const values = [
  "Menjaga Anonimitas",
  "Data Akurat",
  "Lengkap dan Mengacu pada Kanal Resmi",
];

const stats = [
  { value: "62,14%", label: "Korban Pinjol adalah Perempuan" },
  { value: "1.081", label: "Total Pengaduan Pinjol hingga 2025" },
  { value: "3", label: "Bentuk Penagihan dengan Kekerasan yang Paling Banyak Dilaporkan" },
  { value: "61%", label: "Pengadu adalah Perempuan dari Total Aduan" },
];

export default function AboutPage() {
  return (
    <section className="relative">
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />

      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-2 md:items-center">
        <div>
          <p className="text-sm font-semibold text-primary">Sejarah</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Sejarah
          </h1>

          <p className="mt-4 max-w-md text-muted-foreground">
            EduPuan hadir karena total pengaduan pinjaman online mayoritas dari Perempuan. Aduan mengenai penagihan dengan kekerasan menjadi yang paling banyak dilaporkan.
          </p>

          <ul className="mt-8 space-y-3">
            {values.map((value) => (
              <li key={value} className="flex items-start gap-3 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span className="text-muted-foreground">{value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-foreground/[0.03] p-6"
            >
              <p className="text-3xl font-bold tracking-tight">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}