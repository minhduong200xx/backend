import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//get all stock transactions
export async function GET() {
  try {
    const stockTransactions = await prisma.stock_Transactions.findMany();
    return NextResponse.json(stockTransactions);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching stock transactions." },
      { status: 500 }
    );
  }
}

//create new stock transaction
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    const newStockTransaction = await prisma.stock_Transactions.create({
      data,
    });
    return NextResponse.json(newStockTransaction, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating stock transaction." },
      { status: 500 }
    );
  }
}

//delete all stock transactions
export async function DELETE() {
  try {
    await prisma.stock_Transactions.deleteMany({});
    return NextResponse.json({ message: "All stock transactions deleted." });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting stock transactions." },
      { status: 500 }
    );
  }
}
