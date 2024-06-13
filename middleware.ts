import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === "/login" || path === "/signup"

  const token = request.cookies.get("token")?.value

  if (isPublicPath && token) {
    const response = NextResponse.redirect(new URL("/", request.nextUrl))
    return response
  }

  if (path === "/" && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl))
  }
}

export const config = {
  matcher: ["/", "/login", "/signup"],
}
