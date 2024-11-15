import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//get prescription medicine by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const prescriptionMedicine =
      await prisma.prescriptions_Medicines.findUnique({
        where: {
          prescription_id_medicine_id: {
            prescription_id: Number(params.id.split("-")[0]),
            medicine_id: Number(params.id.split("-")[1]),
          },
        },
      });
    if (!prescriptionMedicine) {
      return NextResponse.json(
        { message: "Prescription medicine not found." },
        { status: 404 }
      );
    }
    return NextResponse.json(prescriptionMedicine);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching prescription medicine." },
      { status: 500 }
    );
  }
}

// Update prescription medicine by id
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  try {
    const prescriptionMedicine =
      await prisma.prescriptions_Medicines.findUnique({
        where: {
          prescription_id_medicine_id: {
            prescription_id: Number(params.id.split("-")[0]),
            medicine_id: Number(params.id.split("-")[1]),
          },
        },
      });
    if (!prescriptionMedicine) {
      return NextResponse.json(
        { message: "Prescription medicine not found." },
        { status: 404 }
      );
    }
    const updatedPrescriptionMedicine =
      await prisma.prescriptions_Medicines.update({
        where: {
          prescription_id_medicine_id: {
            prescription_id: Number(params.id.split("-")[0]),
            medicine_id: Number(params.id.split("-")[1]),
          },
        },
        data,
      });
    return NextResponse.json(updatedPrescriptionMedicine);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating prescription medicine." },
      { status: 500 }
    );
  }
}

// Delete prescription medicine by id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const prescriptionMedicine = await prisma.prescriptions_Medicines.findUnique({
    where: {
      prescription_id_medicine_id: {
        prescription_id: Number(params.id.split("-")[0]),
        medicine_id: Number(params.id.split("-")[1]),
      },
    },
  });
  if (!prescriptionMedicine) {
    return NextResponse.json(
      { message: "Prescription medicine not found." },
      { status: 404 }
    );
  }
  try {
    const deletedPrescriptionMedicine =
      await prisma.prescriptions_Medicines.delete({
        where: {
          prescription_id_medicine_id: {
            prescription_id: Number(params.id.split("-")[0]),
            medicine_id: Number(params.id.split("-")[1]),
          },
        },
      });
    return NextResponse.json(deletedPrescriptionMedicine);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting prescription medicine." },
      { status: 500 }
    );
  }
}
