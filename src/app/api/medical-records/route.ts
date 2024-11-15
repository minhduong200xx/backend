import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//get all medical records
export async function GET() {
  try {
    const medicalRecords = await prisma.medical_Records.findMany({
      include: {
        patient: true,
        doctor: true,
      },
    });
    return NextResponse.json(medicalRecords);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching medical records." },
      { status: 500 }
    );
  }
}

//create a new medical record
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    const newRecord = await prisma.medical_Records.create({
      data,
    });
    return NextResponse.json(newRecord, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating medical record." },
      { status: 500 }
    );
  }
}

//delete all medical records
export async function DELETE() {
  try {
    await prisma.medical_Records.deleteMany({});
    return NextResponse.json({ message: "All medical records deleted." });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting medical records." },
      { status: 500 }
    );
  }
}
