import { NextRequest, NextResponse } from "next/server";

/**
 * alternate way : return NextResponse.redirect(new URL("/dashboard", request.url));
 */
export function redirectTo(request: NextRequest, path: string): NextResponse {
  const url = request.nextUrl.clone();
  if (request.nextUrl.pathname === path) {
    // must exclude "/error" from nextjs middleware config paths
    url.pathname = "/error";
    url.searchParams.set("reason", "redirect-loop detected in middleware");
  } else url.pathname = path;
  return NextResponse.redirect(url);
}
