import { NextResponse } from "next/server";

export function middleware(req: Request) {
  const url = new URL(req.url);
  
  if (url.pathname.startsWith("/api/auth/error")) {
    const error = url.searchParams.get("error") || "";
    return NextResponse.redirect(new URL(`/logg-inn?error=${encodeURIComponent(error)}`, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/auth/error"],
};
