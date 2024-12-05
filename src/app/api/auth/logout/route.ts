import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // Get tokens from cookies
    const accessToken = req.cookies.get("accessToken");
    const refreshToken = req.cookies.get("refreshToken");

    if (!accessToken && !refreshToken) {
      return NextResponse.json(
        { message: "You have not logged in." },
        { status: 401 }
      );
    }

    // Clear both tokens from cookies
    const response = NextResponse.json({
      message: "Logged out successfully.",
    });

    response.cookies.set("accessToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: -1, // Remove cookie
    });

    response.cookies.set("refreshToken", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: -1, // Remove cookie
    });

    return response;
  } catch (error) {
    console.error("Logout error:", error);
    return NextResponse.json(
      { message: "Internal server error during logout." },
      { status: 500 }
    );
  }
}
