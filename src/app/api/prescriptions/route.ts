import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//get all prescriptions
export async function GET() {
  try {
    const prescriptions = await prisma.prescriptions.findMany();
    return NextResponse.json(prescriptions);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching prescriptions." },
      { status: 500 }
    );
  }
}

//create new prescription
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    const newPrescription = await prisma.prescriptions.create({
      data,
    });
    return NextResponse.json(newPrescription, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating prescription." },
      { status: 500 }
    );
  }
}

//delete all prescriptions
export async function DELETE() {
  try {
    await prisma.prescriptions.deleteMany({});
    return NextResponse.json({ message: "All prescriptions deleted." });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting prescriptions." },
      { status: 500 }
    );
  }
}
