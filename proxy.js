import { NextResponse } from "next/server";

// Gunakan nama fungsi proxy menyesuaikan nama file
export function proxy(request) {
  const { pathname } = request.nextUrl;

  const isStaticFile = 
    pathname.startsWith("/_next") || 
    pathname === "/favicon.ico" || 
    pathname.includes(".");
    
  const isApi = pathname.startsWith("/api"); 
  const isMaintenancePage = pathname.startsWith("/maintenance");
  
  // -------------------------------------------------------------------------------------//
  // Maintenance Mode
  // -------------------------------------------------------------------------------------//
  const isMaintenance = String(process.env.MAINTENANCE_MODE || "").trim().toLowerCase() === "true";

  if (isMaintenance && !isMaintenancePage && !isStaticFile && !isApi) {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }

  // -------------------------------------------------------------------------------------//
  // Logger untuk API
  // -------------------------------------------------------------------------------------//
  if (isApi) {
    const waktu = new Date().toISOString();
    console.log(`[${waktu}] ${request.method} ${pathname}`);
  }

  // -------------------------------------------------------------------------------------//
  // Auth Guard Khusus Halaman /favorites
  // -------------------------------------------------------------------------------------//
  if (pathname.startsWith("/favorites")) {
    const customToken = request.cookies.get("token")?.value;
    const hasSupabaseCookie = request.cookies.getAll().some((cookie) =>
      cookie.name.includes("sb-") && cookie.name.includes("-auth-token")
    );

    const isAuthenticated = Boolean(customToken || hasSupabaseCookie);

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};