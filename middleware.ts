import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.NEXTAUTH_JWT_SECRET as string;

export function middleware(req: NextRequest) {
  const token = req.cookies.get("accessToken")?.value;
  const url = req.nextUrl.clone();

  if (!token) {
    if (url.pathname !== "/login") {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // Decode token or fetch user data based on the token
  const user = parseToken(token);

  if (!user) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (user.role_id === 1 && url.pathname === "/dashboard") {
    return NextResponse.next();
  }
  if (user) {
    if (url.pathname === "/login") {
      // Disable login page for role_id = 2
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
  }

  // Redirect to not authorized page if accessing unauthorized routes
  url.pathname = "/not-authorized";
  return NextResponse.redirect(url);
}

// Helper function to parse token (example: JWT decoding)
function parseToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

export const config = {
  matcher: ["/dashboard", "/login", "/not-authorized"],
};
