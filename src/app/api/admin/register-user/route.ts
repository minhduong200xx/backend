import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import sendEmail from "@/app/lib/sendEmail";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, first_name, last_name, role_id } = await req.json();

    if (!email || !first_name || !last_name || !role_id) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    const session = await getServerSession(authOptions);
    if (!session || session.user.role_id !== 1) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }
    const generatedPassword = uuidv4().slice(0, 8);
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const newUser = await prisma.user.create({
      data: {
        user_name: last_name,
        email,
        first_name,
        last_name,
        password: hashedPassword,
      },
    });

    if (role_id === 4) {
      await prisma.patients.create({
        data: {
          user_id: newUser.user_id,
          first_name: first_name,
          last_name: last_name,
        },
      });
    } else if (role_id === 3) {
      await prisma.doctors.create({
        data: {
          user_id: newUser.user_id,
          first_name: first_name,
          last_name: last_name,
        },
      });
    }
    const emailResult = await sendEmail({
      to: email,
      subject: "Your New Account Details",
      text: `Hello ${first_name},\n\nYour account has been created. Here are your credentials:\n\nEmail: ${email}\nPassword: ${generatedPassword}\n\nPlease change your password after logging in.\n\nBest regards,\nThe Admin Team`,
    });

    if (!emailResult.success) {
      console.error("Failed to send email:", emailResult.error);
      return NextResponse.json(
        { message: "User created but email could not be sent" },
        { status: 500 }
      );
    }

    // Success response
    return NextResponse.json(
      { message: "User created successfully and email sent", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
