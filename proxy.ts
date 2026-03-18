import NextAuth from "next-auth"
import authConfig from "./auth.config"

const { auth } = NextAuth(authConfig)

// @ts-ignore
export default auth((req) => {
    const isLoggedIn = !!req.auth
    const { nextUrl } = req
    const isAuthRoute = nextUrl.pathname.startsWith('/login')
    const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth')
    const isPublicRoute = nextUrl.pathname === '/' || nextUrl.pathname.startsWith('/services') || nextUrl.pathname.startsWith('/games')

    // @ts-ignore
    console.log(`Middleware: ${nextUrl.pathname} | LoggedIn: ${isLoggedIn} | Role: ${req.auth?.user?.role}`)

    // Admin Route Protection
    if (nextUrl.pathname.startsWith('/admin') && nextUrl.pathname !== '/admin/login') {
        // @ts-ignore
        if (req.auth?.user?.role !== 'ADMIN') {
            return Response.redirect(new URL('/admin/login', nextUrl))
        }
    }

    // Checkout Protection
    if (nextUrl.pathname.startsWith('/checkout') && !isLoggedIn) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }
        const encodedCallbackUrl = encodeURIComponent(callbackUrl);
        return Response.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl))
    }

    return; // Allow
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
