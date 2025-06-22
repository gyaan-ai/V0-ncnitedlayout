import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Only handle specific protected admin routes
  const protectedAdminPaths = ["/admin/upload", "/admin/match-entry", "/admin/registrations"]

  // Check if the current path needs admin protection
  const needsAdminAuth = protectedAdminPaths.some((path) => request.nextUrl.pathname.startsWith(path))

  if (needsAdminAuth) {
    // For admin routes, we'll handle auth in the component itself
    // This prevents middleware from causing redirect loops
    return NextResponse.next()
  }

  // Let everything else through
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
