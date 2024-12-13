import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const JWT_SECRET = process.env.NEXTAUTH_JWT_SECRET as string;
const JWT_REFRESH_SECRET = process.env.NEXTAUTH_JWT_REFRESH_SECRET as string;
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const savedToken = req.cookies.get("refreshToken");
    if (savedToken) {
      return NextResponse.json(
        { message: "You are already logged in." },
        { status: 400 }
      );
    }

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    if (!user.status) {
      return NextResponse.json(
        { message: "Your account is inactive. Please contact the admin." },
        { status: 403 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const accessToken = jwt.sign(
      { id: user.user_id, email: user.email, role: user.role_id },
      JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign({ id: user.user_id }, JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({
      message: "Login successful.",
      accessToken,
      refreshToken,
      user: {
        user_id: user.user_id,
        user_name: user.user_name,
        email: user.email,
        role_id: user.role_id,
      },
    });
    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });
    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    response.headers.set("Authorization", `Bearer ${accessToken}`);

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { message: "An error occurred during login." },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const accessToken = req.cookies.get("accessToken");
    if (!accessToken) {
      return NextResponse.json(
        { message: "Access token is missing." },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(accessToken.value, JWT_SECRET) as any;
    const user = await prisma.user.findUnique({
      where: { user_id: decoded.id },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        user_id: user.user_id,
        user_name: user.user_name,
        email: user.email,
        role_id: user.role_id,
      },
    });
  } catch (error) {
    console.error("Fetch user error:", error);
    return NextResponse.json(
      { message: "An error occurred while fetching user information." },
      { status: 500 }
    );
  }
}
