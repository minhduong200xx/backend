import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json(
        {
          message: "User ID are required.",
        },
        { status: 400 }
      );
    }
    const session = await getSession();
    if (!session || session.user.role_id !== 1) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
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
