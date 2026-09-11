import { auth } from "@/auth"

export const proxy = auth((req) => {
    const isLoggedIn = !!req.auth
    const isOnAdmin = req.nextUrl.pathname.startsWith("/admin")

    if (isOnAdmin && !isLoggedIn) {
        const loginUrl = new URL("/login", req.nextUrl.origin)
        return Response.redirect(loginUrl)
    }
})

export const config = {
    matcher: ["/admin/:path*"],
}