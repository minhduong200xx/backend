import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json();
    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "You are not logged in." },
        { status: 401 }
      );
    }
    if (!userId) {
      return NextResponse.json(
        {
          message: "User ID are required.",
        },
        { status: 400 }
      );
    }

    // Update user status in the database
    const updatedUser = await prisma.user.update({
      where: { user_id: userId },
      data: { status: !status },
    });

    return NextResponse.json(
      {
        message: `Update user status successfully.`,
        user: updatedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user status:", error);
    return NextResponse.json(
      {
        message: "Failed to update user status.",
      },
      { status: 500 }
    );
  }
}
