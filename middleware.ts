import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoggedIn = request.cookies.get("login")?.value;

  if (!isLoggedIn && pathname === "/dashboard") {
    return NextResponse.redirect(new URL("login", request.url));
  }
  if (isLoggedIn && pathname == "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
