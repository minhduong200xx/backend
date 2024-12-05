import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const JWT_SECRET = process.env.NEXTAUTH_JWT_SECRET as string; // Replace with your secret key

const prisma = new PrismaClient();
export async function GET(req: NextRequest) {
  try {
    // Get the token from cookies (extract the value)
    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "You are not logged in." },
        { status: 401 }
      );
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Safely cast the decoded token to the expected structure
    const { id, email, role } = decoded as {
      id: string;
      email: string;
      role: string;
    };

    if (!id || !email || !role) {
      return NextResponse.json({ message: "Invalid token." }, { status: 401 });
    }
    const result = await prisma.role.findUnique({
      where: {
        role_id: Number(role),
      },
    });
    // Return the user's role
    return NextResponse.json({
      message: "Role fetched successfully.",
      role: result?.role_name,
    });
  } catch (error) {
    console.error("Error fetching user role:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}
