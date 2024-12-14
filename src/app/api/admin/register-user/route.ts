import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { PrismaClient } from "@prisma/client";
// import { getServerSection } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]/route";
import jwt from "jsonwebtoken";
import { Resend } from "resend";
const prisma = new PrismaClient();
const JWT_SECRET = process.env.NEXTAUTH_JWT_SECRET as string;
export async function POST(req: NextRequest) {
  const resend = new Resend("re_XUwa4jJ9_2gX5exCK7ZPyCm9FpVTNsVB3");
  try {
    const { email, first_name, last_name, role_id } = await req.json();
    const token = req.cookies.get("accessToken")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "You must logged in as admin." },
        { status: 403 }
      );
    }
    if (!email || !first_name || !last_name || !role_id) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    const decoded = jwt.verify(token, JWT_SECRET);

    // Safely cast the decoded token to the expected structure
    const { role: sessionRole } = decoded as {
      id: string;
      email: string;
      role: string;
    };

    if (Number(sessionRole) !== 1) {
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
          fees: 0,
        },
      });
    }

    try {
      const { data } = await resend.emails.send({
        from: "Eclinic@resend.dev",
        to: email,
        subject: "Your account have been created",
        html: `<h1>Hello ${first_name}</h1>
        <p>
           Your account has been created. Here are your credentials:<br><br>
           <b>Email:</b> ${email}<br>
           <b>Password:</b> ${generatedPassword}<br><br>
           Please change your password after logging in.<br><br>
           Best regards,<br>
           The Admin Team
        </p>`,
      });
      return NextResponse.json(
        {
          message: "User created successfully and email sent",
          user: newUser,
          data,
        },
        { status: 201 }
      );
    } catch (error) {
      console.error("Failed to send email:", error);
      return NextResponse.json(
        {
          message: `User created but email could not be sent.The password is ${generatedPassword}  `,
        },
        { status: 500 }
      );
    }

    // if (!emailResult.success) {

    // }

    // Success response
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
