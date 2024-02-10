import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPaths = ["/login", "/register", "/api/uploadthing"];
  const token = request.cookies.get("token")?.value || "";

  if (publicPaths.includes(path) && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!publicPaths.includes(path) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // if (path === "/api/uploadthing" && !token) {
  //   return new NextResponse("Unauthorized", { status: 401 });
  // }
  if (path.startsWith("/servers/") && !token) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

}

export const config = {
  matcher: ["/", "/login", "/register","/servers/:path*"],
};
