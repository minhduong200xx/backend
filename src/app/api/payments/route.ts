import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//get all payments
export async function GET() {
  try {
    const payments = await prisma.payments.findMany();
    return NextResponse.json(payments);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching payments." },
      { status: 500 }
    );
  }
}

//create new payment
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    const newPayment = await prisma.payments.create({
      data,
    });
    return NextResponse.json(newPayment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating payment." },
      { status: 500 }
    );
  }
}

//delete all payments
export async function DELETE() {
  try {
    await prisma.payments.deleteMany({});
    return NextResponse.json({ message: "All payments deleted." });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting payments." },
      { status: 500 }
    );
  }
}
