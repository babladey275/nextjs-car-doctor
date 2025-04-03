import { NextResponse } from "next/server";

export const middleware = async (req) => {
  // console.log("From middleware", req.nextUrl.pathname);

  return NextResponse.next();
};

export const config = {
  matcher: ["/my-bookings", "/my-bookings/:path*", "/checkout/:path*"],
};
