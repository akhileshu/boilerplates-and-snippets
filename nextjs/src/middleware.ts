// import { getAuthToken } from "@/server/middleware/getAuthToken";
import { isMobileUserAgent } from "@/server/middleware/isMobileUserAgent";
import { redirectTo } from "@/server/middleware/redirectTo";
import { NextRequest, NextResponse } from "next/server";
import { rateLimit } from "./server/middleware/rateLimit";

export async function middleware(request: NextRequest) {
  const isMaintenance = process.env.MAINTENANCE_MODE === "true";
  const { pathname } = request.nextUrl;

  if (isMaintenance && pathname !== "/maintenance")
    return redirectTo(request, "/maintenance");

  if (process.env.NODE_ENV === "production" && rateLimit(request)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  if (isMobileUserAgent(request) && pathname !== "/mobile-warning") {
    return redirectTo(request, "/mobile-warning");
  }

  /*
  const token = await getAuthToken(request);
  if (!token) {
    // Allow homepage without token
    if (pathname !== "/") return redirectTo(request, "/");
  }
  // User logged in but profile not setup
  else if (!token.isProfileSetupDone) {
    if (pathname !== "/profile/setup")
      return redirectTo(request, "/profile/setup");
  }
  // User already setup but tries to visit setup page
  else if (pathname === "/profile/setup")
    return redirectTo(request, "/");
*/
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
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|error).*)",
  ],
};
