// proxy.js (pengganti middleware.js di Next.js 16)
import { NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/proxy";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // 1. Logger: catat setiap request ke /api/...
  if (pathname.startsWith("/api")) {
    const waktu = new Date().toISOString();
    console.log(`[${waktu}] ${request.method} ${pathname}`);
  }

  // 2. Maintenance mode: lempar semua halaman ke /maintenance
  const isMaintenance = process.env.MAINTENANCE_MODE === "true";
  const isMaintenancePage = pathname === "/maintenance";

  if (isMaintenance && !isMaintenancePage) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  // 3. Refresh sesi Supabase + ambil user yang sedang login
  const { response, user } = await updateSession(request);

  // 4. Auth guard: halaman yang dilindungi butuh login
  const protectedPaths = ["/favorites"];

  if (!user && protectedPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Sudah login tidak perlu buka halaman login lagi
  if (user && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response; // wajib return response ini supaya cookie sesi ikut terkirim
}

export const config = {
  matcher: ["/((?!_next|favicon.ico).*)"], // semua path, kecuali file internal Next.js
};