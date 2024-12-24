import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//get payment by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const payment = await prisma.payments.findUnique({
      where: { payment_id: params.id },
    });
    if (!payment) {
      return NextResponse.json(
        { message: "Payment not found." },
        { status: 404 }
      );
    }
    return NextResponse.json(payment);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching payment." },
      { status: 500 }
    );
  }
}

//update payment by id
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  try {
    const payment = await prisma.payments.findUnique({
      where: { payment_id: params.id },
    });
    if (!payment) {
      return NextResponse.json(
        { message: "Payment not found." },
        { status: 404 }
      );
    }
    const updatedPayment = await prisma.payments.update({
      where: { payment_id: params.id },
      data,
    });
    return NextResponse.json(updatedPayment);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating payment." },
      { status: 500 }
    );
  }
}

//delete payment by id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const payment = await prisma.payments.findUnique({
      where: { payment_id: params.id },
    });
    if (!payment) {
      return NextResponse.json(
        { message: "Payment not found." },
        { status: 404 }
      );
    }
    const deletedPayment = await prisma.payments.delete({
      where: { payment_id: params.id },
    });
    return NextResponse.json(deletedPayment);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting payment." },
      { status: 500 }
    );
  }
}
