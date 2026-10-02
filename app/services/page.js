import { Code2, LineChart, Palette } from "lucide-react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const services = [
  {
    icon: Code2,
    title: "Mau Pinjam",
    description:
      "Cek biaya nyata, pahami risikonya, dan lihat alternatif sebelum tanda tangan.",
  },
  {
    icon: Palette,
    title: "Sudah Terjerat",
    description:
      "Pahami kondisi, cari solusi, dan dapatkan langkah yang bisa kamu lakukan.",
  },
  {
    icon: LineChart,
    title: "Bingung mulai dari mana",
    description:
      "Ceritakan situasimu, AI akan membantu mengarahkan langkah selanjutnya.",
  },
];

export default function ServicesPage() {
  return (
    <section className="relative">
      <div className="bg-grid bg-radial-fade absolute inset-0 -z-10" />

      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold text-primary">Fitur</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            Fitur Kami
          </h1>
          <p className="mt-4 text-muted-foreground">
            Pilihan Fitur yang sesuai dengan kondisimu.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {services.map(({ icon: Icon, title, description }) => (
            <Card
              key={title}
              className="group relative overflow-hidden border border-white/10 bg-foreground/[0.03] transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
            >
              <CardHeader>
                <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <Icon className="size-5" />
                </div>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}