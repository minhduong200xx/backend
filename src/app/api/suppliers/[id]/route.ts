import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//get supplier by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const supplier = await prisma.suppliers.findUnique({
      where: {
        supplier_id: parseInt(id),
      },
    });

    if (!supplier) {
      return NextResponse.json(
        { message: "Supplier not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(supplier);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching supplier." },
      { status: 500 }
    );
  }
}

//update supplier by id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const supplier = await prisma.suppliers.findUnique({
      where: { supplier_id: Number(params.id) },
    });
    if (!supplier) {
      return NextResponse.json(
        { message: "Supplier not found" },
        { status: 400 }
      );
    }
    const updateSupplier = await prisma.suppliers.update({
      where: { supplier_id: Number(params.id) },
      data: data,
    });

    return NextResponse.json(
      { message: "Supplier updated successfully", updateSupplier },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update supplier" },
      { status: 500 }
    );
  }
}

//delete supplier by id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supplier = await prisma.suppliers.findUnique({
      where: { supplier_id: Number(params.id) },
    });

    if (!supplier) {
      return NextResponse.json(
        { error: "Supplier not found" },
        { status: 404 }
      );
    }

    await prisma.patients.delete({
      where: { patient_id: Number(params.id) },
    });

    return NextResponse.json({
      message: "Supplier deleted successfully",
      supplier,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete supplier" },
      { status: 500 }
    );
  }
}
