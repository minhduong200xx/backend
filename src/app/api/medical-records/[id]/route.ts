import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//get medical record by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const medicalRecord = await prisma.medical_Records.findUnique({
      where: { record_id: Number(params.id) },
      include: {
        patient: true,
        doctor: true,
      },
    });
    if (!medicalRecord) {
      return NextResponse.json(
        { message: "Medical record not found." },
        { status: 404 }
      );
    }
    return NextResponse.json(medicalRecord);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching medical record." },
      { status: 500 }
    );
  }
}

//update medical record by id
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  try {
    const medicalRecord = await prisma.medical_Records.findUnique({
      where: { record_id: Number(params.id) },
      include: {
        patient: true,
        doctor: true,
      },
    });
    if (!medicalRecord) {
      return NextResponse.json(
        { message: "Medical record not found." },
        { status: 404 }
      );
    }
    const updatedRecord = await prisma.medical_Records.update({
      where: { record_id: Number(params.id) },
      data,
    });
    return NextResponse.json(updatedRecord);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating medical record." },
      { status: 500 }
    );
  }
}

//delete medical record by id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const medicalRecord = await prisma.medical_Records.findUnique({
      where: { record_id: Number(params.id) },
      include: {
        patient: true,
        doctor: true,
      },
    });
    if (!medicalRecord) {
      return NextResponse.json(
        { message: "Medical record not found." },
        { status: 404 }
      );
    }
    const deletedRecord = await prisma.medical_Records.delete({
      where: { record_id: Number(params.id) },
    });
    return NextResponse.json(deletedRecord);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting medical record." },
      { status: 500 }
    );
  }
}
