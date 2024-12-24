import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//get prescription by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const prescription = await prisma.prescriptions.findUnique({
      where: { prescription_id: params.id },
    });
    if (!prescription) {
      return NextResponse.json(
        { message: "Prescription not found." },
        { status: 404 }
      );
    }
    return NextResponse.json(prescription);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching prescription." },
      { status: 500 }
    );
  }
}

// Update prescription by id
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  try {
    const prescription = await prisma.prescriptions.findUnique({
      where: { prescription_id: params.id },
    });
    if (!prescription) {
      return NextResponse.json(
        { message: "Prescription not found." },
        { status: 404 }
      );
    }
    const updatedPrescription = await prisma.prescriptions.update({
      where: { prescription_id: params.id },
      data,
    });
    return NextResponse.json(updatedPrescription);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating prescription." },
      { status: 500 }
    );
  }
}

//delete prescription by id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const prescription = await prisma.prescriptions.findUnique({
      where: { prescription_id: params.id },
    });
    if (!prescription) {
      return NextResponse.json(
        { message: "Prescription not found." },
        { status: 404 }
      );
    }
    const deletedPrescription = await prisma.prescriptions.delete({
      where: { prescription_id: params.id },
    });
    return NextResponse.json(deletedPrescription);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting prescription." },
      { status: 500 }
    );
  }
}
