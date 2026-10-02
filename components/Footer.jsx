import Link from "next/link";

const columns = [
  {
    title: "Fitur",
    links: [
      { href: "/", label: "Cek Penawaran" },
      { href: "/about", label: "Cek Tanda Ilegal" },
      { href: "/services", label: "Alternatif Solusi" },
    ],
  },
  {
    title: "Hubungi Kami",
    links: [
      { href: "/profile", label: "Profil" },
      { href: "/contact", label: "Kontak Kami" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <p className="text-lg font-bold">EduPuan</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Keputusan yang lebih bijak untuk masa depan yang lebih baik. EduPuan merupakan platform literasi dan edukasi yang membantu kamu memahami risiko pinjaman online, mengenali alternatif, dan membantumu membuat keputusan yang lebih bijak.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:flex sm:gap-16">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="text-xs font-semibold tracking-wide text-foreground/80 uppercase">
                  {column.title}
                </p>

                <ul className="mt-3 space-y-2">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 EduPuan. Jelita Ekaseptiani Narentar - Maria Walanda Maramis.</p>
          <p>Built with Next.js &amp; Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}