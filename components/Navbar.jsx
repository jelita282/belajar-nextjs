"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/UserContext";

// 📍 1. SISIPKAN DI SINI: Import custom hook dari FavoriteContext
import { useFavorite } from "@/context/FavoriteContext";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/about", label: "Sejarah" },
  { href: "/services", label: "Fitur" },
  { href: "/profile", label: "Profil" },
  { href: "/contact", label: "Kontak" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { name, submitted } = useUser();

// 📍 2. SISIPKAN DI SINI: Ambil array favorites dari Context
  const { favorites } = useFavorite();

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-4xl px-4">
      <nav className="flex items-center justify-between gap-4 rounded-full border border-white/10 bg-background/70 px-4 py-2 shadow-lg shadow-black/20 backdrop-blur-xl">
        <Link
          href="/"
          className="shrink-0 text-sm font-bold tracking-tight"
        >
          EduPuan
        </Link>

        <div className="hidden items-center gap-1 text-sm text-muted-foreground sm:flex">
          {links.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-1.5 transition-colors hover:text-foreground",
                  isActive && "bg-foreground/10 text-foreground"
                )}
              >
                {link.label}
              </Link>
            );
          })}

          {/* 📍 3. SISIPKAN DI SINI: Menu Favorite yang dinamis jumlahnya */}
          <Link
            href="/favorites"
            className={cn(
              "rounded-full px-3 py-1.5 font-medium transition-colors hover:text-foreground",
              pathname === "/favorites" && "bg-foreground/10 text-foreground",
              favorites.length > 0 && "text-primary" // Opsional: Beri warna khusus jika ada favorit
            )}
          >
            Favorite ({favorites.length})
          </Link>
       
        </div>

        {submitted && <span className="shrink-0 text-sm font-medium">Hi, {name} 👋</span>}
        
        <Link
          href="/contact"
          className={cn(buttonVariants({ size: "sm" }), "shrink-0 rounded-full")}
        >
          DARURAT
        </Link>
      </nav>
    </header>
  );
}