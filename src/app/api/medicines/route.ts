import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get all medicines
export async function GET() {
  try {
    const medicines = await prisma.medicines.findMany({
      include: {
        supplier: true,
      },
    });

    return NextResponse.json(medicines);
  } catch (error) {
    console.error("Error fetching medicines:", error);
    return NextResponse.json(
      { message: "Error fetching medicines." },
      { status: 500 }
    );
  }
}

// create new medicine
export async function POST(req: NextRequest) {
  const {
    medicine_name,
    description,
    quantity_in_stock,
    price_per_unit,
    expiration_date,
    supplier_id,
  } = await req.json();

  try {
    const newMedicine = await prisma.medicines.create({
      data: {
        medicine_name,
        description,
        quantity_in_stock,
        price_per_unit,
        expiration_date,
        supplier_id,
      },
    });

    return NextResponse.json(newMedicine, { status: 201 });
  } catch (error) {
    console.error("Error creating medicine:", error);
    return NextResponse.json(
      { message: "Error creating medicine." },
      { status: 500 }
    );
  }
}

// delete all medicines
export async function DELETE() {
  try {
    await prisma.medicines.deleteMany({});
    return NextResponse.json({ message: "All medicines deleted." });
  } catch (error) {
    console.error("Error deleting medicines:", error);
    return NextResponse.json(
      { message: "Error deleting medicines." },
      { status: 500 }
    );
  }
}
