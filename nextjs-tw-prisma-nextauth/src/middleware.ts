import { NextResponse } from "next/server";
import { rateLimit } from "./lib/rateLimit";
import { isMobileUserAgent } from "./lib/utils";

export function middleware(request: Request) {
  const isMaintenance = process.env.MAINTENANCE_MODE === "true";
  const url = new URL(request.url);

  // Prevent redirect loop for the maintenance page itself
  if (isMaintenance && url.pathname !== "/maintenance") {
    return NextResponse.redirect(new URL("/maintenance", request.url));
  }
  const ip = request.headers.get("x-forwarded-for") || "local";

  if (process.env.NODE_ENV === "production" && rateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const userAgent = request.headers.get("user-agent");

  if (isMobileUserAgent(userAgent) && url.pathname !== "/mobile-warning") {
    return NextResponse.redirect(new URL("/mobile-warning", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
