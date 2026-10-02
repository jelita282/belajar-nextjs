// 1. Impor hanya SEKALI di paling atas file
import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // -------------------------------------------------------------------------------------//
  // Latihan 3. Maintenance Mode
  // -------------------------------------------------------------------------------------//
  // Membersihkan spasi atau karakter tersembunyi dari .env.local
  const isMaintenance = String(process.env.MAINTENANCE_MODE || "").trim().toLowerCase() === "true";
  
  const isMaintenancePage = pathname === "/maintenance" || pathname.startsWith("/maintenance/");
  
  // Kecualikan file statis Next.js, API, dan favicon agar aset gambar/CSS tidak terblokir
  const isStaticFile = 
    pathname.startsWith("/_next") || 
    pathname === "/favicon.ico" || 
    pathname.includes(".");

  // LOGIKA: Jika MAINTENANCE_MODE=true DAN user BUKAN di halaman /maintenance DAN BUKAN file statis
  if (isMaintenance && !isMaintenancePage && !isStaticFile) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  // -------------------------------------------------------------------------------------//
  // Latihan 1. Logger (Untuk request ke /api/...)
  // -------------------------------------------------------------------------------------//
  if (pathname.startsWith("/api")) {
    const waktu = new Date().toISOString();
    console.log(`[${waktu}] ${request.method} ${pathname}`);
  }

  // -------------------------------------------------------------------------------------//
  // Latihan 2. Auth Guard Menggunakan Cookie (Untuk halaman /favorites)
  // -------------------------------------------------------------------------------------//
  if (pathname.startsWith("/favorites")) {
    const token = request.cookies.get("token");

    if (!token) {
      // Belum ada tanda login -> lempar ke halaman utama
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Lanjutkan request jika semua kondisi di atas lolos
  return NextResponse.next();
}

// 2. Gunakan Matcher Regex Tunggal yang Mencakup Seluruh Halaman
export const config = {
  matcher: [
    /*
     * Match semua request KECUALI:
     * - _next/static (file statis)
     * - _next/image (optimasi gambar)
     * - favicon.ico (ikon browser)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};