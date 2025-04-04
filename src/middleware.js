import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export const middleware = async (req) => {
  // console.log("From middleware", req.nextUrl.pathname);
  const path = req.nextUrl.pathname;
  const protectedPaths = ["/my-bookings", "/checkout"];
  const isProtected = protectedPaths.some((p) => path.startsWith(p));

  if (!isProtected) return NextResponse.next();

  const token = await getToken({ req });
  const isAuthPage = path.startsWith("/login");

  // Authenticated user trying to access auth page
  if (token && isAuthPage) {
    const redirectUrl = req.nextUrl.searchParams.get("redirect") || "/";
    return NextResponse.redirect(new URL(redirectUrl, req.url));
  }

  // Unauthenticated user trying to access protected route
  if (!token && !isAuthPage) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/my-bookings", "/my-bookings/:path*", "/checkout/:path*"],
};
