import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/_next")) {
        return NextResponse.next();
    }
    const path = request.nextUrl.pathname
    const publicPath = path === '/login' || path === '/register'
    const token = request.cookies.get('token')?.value || ""

    if (publicPath && token) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (!publicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        // '/:path*',
        '/login',
        '/register',
    ]
}