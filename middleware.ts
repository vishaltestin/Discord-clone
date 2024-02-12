import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const publicPaths = ["/login", "/register", "/api/uploadthing"];
  const token = request.cookies.get("token")?.value || "";

  const isTokenExpired = (token: string) => {
    const expirationTimestamp = getTokenExpirationTimestamp(token);
    const currentTimestamp = Math.floor(Date.now() / 1000); // Current time in seconds

    return expirationTimestamp && expirationTimestamp < currentTimestamp;
  };

  if (publicPaths.includes(path) && token && !isTokenExpired(token)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!publicPaths.includes(path) || (path.startsWith("/servers/") && !isTokenExpired(token))) {
    if (!token || isTokenExpired(token)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (path.startsWith("/servers/") && !token) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
}

export const config = {
  matcher: ["/", "/login", "/register", "/servers/:path*"],
};

// Function to extract expiration timestamp from the token
function getTokenExpirationTimestamp(token: string): number | null {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp || null;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
}
