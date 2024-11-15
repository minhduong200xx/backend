import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get all departments
export async function GET() {
  try {
    const departments = await prisma.departments.findMany();
    return NextResponse.json(departments);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching departments." },
      { status: 500 }
    );
  }
}

// create new department
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    const newDepartment = await prisma.departments.create({
      data,
    });
    return NextResponse.json(newDepartment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating department." },
      { status: 500 }
    );
  }
}

// delete all departments
export async function DELETE() {
  try {
    await prisma.departments.deleteMany({});
    return NextResponse.json({ message: "All departments deleted." });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting departments." },
      { status: 500 }
    );
  }
}
