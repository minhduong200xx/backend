import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function verifySession(req: NextRequest) {
  const JWT_SECRET = process.env.JWT_SECRET as string;
  try {
    // Get the token from cookies
    const token = req.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token found" },
        { status: 401 }
      );
    }

    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // If the token is valid, return the decoded payload
    return { isValid: true, user: decoded };
  } catch (error) {
    console.error("Session verification failed:", error);
    return { isValid: false, message: "Invalid or expired token" };
  }
}
