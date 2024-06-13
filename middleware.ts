import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { cookies } from "next/headers"
// import { redirect } from "next/navigation"
import Cookies from "js-cookie"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === "/login" || path === "/signup"

  const token = request.cookies.get("token")?.value
  console.log(`Token: ${token ? "Exists" : "Not exists"}`)
  console.log(cookies().get("token"))

  /* this is currently not working because the cookie is undefined on redirect to "/" after login */
  if (isPublicPath && token) {
    console.log(
      "Redirecting to homepage because token exists and path is public"
    )
    const response = NextResponse.redirect(new URL("/", request.nextUrl))
    // console.log(cookies().get("token")) // undefined
    // response.cookies.set("token", token, { path: "/" }) // This SHOULD ensure token is set in cookies but is not working as intended
    return response
  }

  if (path === "/" && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl))
  }
}

export const config = {
  matcher: ["/", "/login", "/signup"],
}
