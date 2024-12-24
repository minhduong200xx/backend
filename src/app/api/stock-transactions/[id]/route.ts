import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//get stock transaction by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const stockTransaction = await prisma.stock_Transactions.findUnique({
      where: { transaction_id: params.id },
    });
    if (!stockTransaction) {
      return NextResponse.json(
        { message: "Stock transaction not found." },
        { status: 404 }
      );
    }
    return NextResponse.json(stockTransaction);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching stock transaction." },
      { status: 500 }
    );
  }
}

//update stock transaction by id
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  try {
    const stockTransaction = await prisma.stock_Transactions.findUnique({
      where: { transaction_id: params.id },
    });
    if (!stockTransaction) {
      return NextResponse.json(
        { message: "Stock transaction not found." },
        { status: 404 }
      );
    }
    const updatedStockTransaction = await prisma.stock_Transactions.update({
      where: { transaction_id: params.id },
      data,
    });
    return NextResponse.json(updatedStockTransaction);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating stock transaction." },
      { status: 500 }
    );
  }
}

//delete stock transaction by id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const stockTransaction = await prisma.stock_Transactions.findUnique({
      where: { transaction_id: params.id },
    });
    if (!stockTransaction) {
      return NextResponse.json(
        { message: "Stock transaction not found." },
        { status: 404 }
      );
    }
    const deletedStockTransaction = await prisma.stock_Transactions.delete({
      where: { transaction_id: params.id },
    });
    return NextResponse.json(deletedStockTransaction);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting stock transaction." },
      { status: 500 }
    );
  }
}
