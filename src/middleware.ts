import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Clone the response
  const response = NextResponse.next();

  // Add the GNU Terry Pratchett header
  response.headers.set("X-Clacks-Overhead", "GNU Terry Pratchett");

  return response;
}

// Configure which paths the middleware runs on
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
