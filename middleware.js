import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // 1. Definisikan jalur-jalur yang perlu dikecualikan
  const isStaticFile = 
    pathname.startsWith("/_next") || 
    pathname === "/favicon.ico" || 
    pathname.includes(".");
    
  // 📍 TAMBAHAN: Kita harus tahu apakah ini jalur API atau bukan
  const isApi = pathname.startsWith("/api"); 
  
  const isMaintenancePage = pathname.startsWith("/maintenance");
  
  // -------------------------------------------------------------------------------------//
  // Maintenance Mode
  // -------------------------------------------------------------------------------------//
  const isMaintenance = String(process.env.MAINTENANCE_MODE || "").trim().toLowerCase() === "true";

  // LOGIKA: Jika maintenance aktif, bukan halaman maintenance, bukan file statis, DAN BUKAN API
  if (isMaintenance && !isMaintenancePage && !isStaticFile && !isApi) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  // -------------------------------------------------------------------------------------//
  // Logger (Untuk request ke /api/...)
  // -------------------------------------------------------------------------------------//
  if (isApi) {
    const waktu = new Date().toISOString();
    console.log(`[${waktu}] ${request.method} ${pathname}`);
  }

  // -------------------------------------------------------------------------------------//
  // Auth Guard Menggunakan Cookie (Untuk halaman /favorites)
  // -------------------------------------------------------------------------------------//
  /*if (pathname.startsWith("/favorites")) {
    const token = request.cookies.get("token");

    if (!token) {
      // Belum ada tanda login -> lempar ke halaman utama
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
*/
  // Lanjutkan request jika semua kondisi di atas lolos
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};