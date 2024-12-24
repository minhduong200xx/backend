import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get medicine by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const medicine = await prisma.medicines.findUnique({
      where: {
        medicine_id: parseInt(id),
      },
      include: {
        supplier: true,
      },
    });

    if (!medicine) {
      return NextResponse.json(
        { message: "Medicine not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(medicine);
  } catch (error) {
    console.error("Error fetching medicine:", error);
    return NextResponse.json(
      { message: "Error fetching medicine." },
      { status: 500 }
    );
  }
}

// update medicine by id
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const {
    medicine_name,
    description,
    quantity_in_stock,
    price_per_unit,
    expiration_date,
    supplier_id,
  } = await req.json();

  try {
    const medicine = await prisma.medicines.findUnique({
      where: { medicine_id: params.id },
    });
    if (!medicine) {
      return NextResponse.json(
        { message: "Medicine not found" },
        { status: 400 }
      );
    }
    const updatedMedicine = await prisma.medicines.update({
      where: {
        medicine_id: params.id,
      },
      data: {
        medicine_name,
        description,
        quantity_in_stock,
        price_per_unit,
        expiration_date,
        supplier_id,
      },
    });

    return NextResponse.json(updatedMedicine);
  } catch (error) {
    console.error("Error updating medicine:", error);
    return NextResponse.json(
      { message: "Error updating medicine." },
      { status: 500 }
    );
  }
}

// Delete medicine by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const medicine = await prisma.medicines.findUnique({
      where: { medicine_id: params.id },
    });
    if (!medicine) {
      return NextResponse.json(
        { message: "Medicine not found" },
        { status: 400 }
      );
    }
    await prisma.medicines.delete({
      where: {
        medicine_id: params.id,
      },
    });

    return NextResponse.json({ message: "Medicine deleted." });
  } catch (error) {
    console.error("Error deleting medicine:", error);
    return NextResponse.json(
      { message: "Error deleting medicine." },
      { status: 500 }
    );
  }
}
