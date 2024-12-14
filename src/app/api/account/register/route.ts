import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
//normal register
export async function POST(req: NextRequest) {
  const { user_name, first_name, last_name, email, password } =
    await req.json();

  if (!email || !password) {
    return NextResponse.json(
      {
        message: "Email and password are required",
      },
      { status: 400 }
    );
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        {
          message: "User have already existed",
        },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        user_name,
        email,
        first_name,
        last_name,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        message: "User registered successfully",

        user,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error registering user",
        error,
      },
      { status: 500 }
    );
  }
}
//register new user with role
