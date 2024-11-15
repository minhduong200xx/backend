import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// get all suppliers
export async function GET() {
  try {
    const suppliers = await prisma.suppliers.findMany();
    return NextResponse.json(suppliers);
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    return NextResponse.json(
      { message: "Error fetching suppliers." },
      { status: 500 }
    );
  }
}

//  create new supplier
export async function POST(req: NextRequest) {
  try {
    const { supplier_name, contact_person, phone_number, email, address } =
      await req.json();

    if (!supplier_name) {
      return NextResponse.json(
        { message: "Supplier name is required." },
        { status: 400 }
      );
    }

    const newSupplier = await prisma.suppliers.create({
      data: {
        supplier_name,
        contact_person,
        phone_number,
        email,
        address,
      },
    });

    return NextResponse.json(newSupplier);
  } catch (error) {
    console.error("Error creating supplier:", error);
    return NextResponse.json(
      { message: "Error creating supplier." },
      { status: 500 }
    );
  }
}

// delete all suppliers
export async function DELETE() {
  try {
    await prisma.suppliers.deleteMany();
    return NextResponse.json({ message: "All suppliers deleted." });
  } catch (error) {
    console.error("Error deleting suppliers:", error);
    return NextResponse.json(
      { message: "Error deleting suppliers." },
      { status: 500 }
    );
  }
}
