import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get("host") || "";

  // docs.tryclink.com → /documentation
  if (hostname === "docs.tryclink.com") {
    if (url.pathname === "/") {
      url.pathname = "/documentation";
      return NextResponse.rewrite(url);
    }
  }

  // pay.tryclink.com/{id} → internally served from /pay/{id}
  // e.g. pay.tryclink.com/pay_abc123 → /pay/pay_abc123
  if (hostname === "pay.tryclink.com") {
    if (url.pathname === "/") {
      // Nothing lives at the root of the pay subdomain
      url.pathname = "/not-found";
      return NextResponse.rewrite(url);
    }
    // Rewrite /{id} → /pay/{id} so it hits app/pay/[id]/page.tsx
    if (!url.pathname.startsWith("/pay/")) {
      url.pathname = `/pay${url.pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const proxyConfig = {
  matcher: [
    // Run on all paths except Next.js internals and static files
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
