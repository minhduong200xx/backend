import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//get all prescriptions medicines
export async function GET() {
  try {
    const prescriptionsMedicines =
      await prisma.prescriptions_Medicines.findMany();
    return NextResponse.json(prescriptionsMedicines);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching prescriptions medicines." },
      { status: 500 }
    );
  }
}

//create new prescription medicine
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    const newPrescriptionMedicine = await prisma.prescriptions_Medicines.create(
      {
        data,
      }
    );
    return NextResponse.json(newPrescriptionMedicine, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating prescription medicine." },
      { status: 500 }
    );
  }
}

//delete all prescriptions medicines
export async function DELETE() {
  try {
    await prisma.prescriptions_Medicines.deleteMany({});
    return NextResponse.json({
      message: "All prescriptions medicines deleted.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting prescriptions medicines." },
      { status: 500 }
    );
  }
}
