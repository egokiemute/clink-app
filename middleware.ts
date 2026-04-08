import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  // Redirect to tryclink.com/documentation to docs.tryclink.com
  if (hostname === "docs.tryclink.com") {
    // If user visits the root of the subdomain, redirect to /labs
    if (url.pathname === "/") {
      url.pathname = "/documentation";
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}
