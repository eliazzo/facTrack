/*import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Middleware function to handle route protection based on authentication
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  console.log(`Requested Path: ${path}`)

  // Define paths that are considered public (accessible without a token)
  const isPublicPath = path === "/login" || path === "/signup"

  // Get the token from the cookies
  const token = request.cookies.get("token")?.value || ""

  // Redirect logic based on the path and token presence
  if (isPublicPath && token) {
    // If trying to access a public path with a token, redirect to the home page
    return NextResponse.redirect(new URL("/", request.nextUrl))
  }

  // If trying to access the home page without a token, redirect to the login page
  if (path === "/" && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl))
  }

  // Optional: Add any other specific path protection logic here
}

// Configuration to specify the paths for which this middleware should be executed
export const config = {
  matcher: ["/"], // Apply middleware only to the home page
}*/
