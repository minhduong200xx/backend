import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const appointments = await prisma.appointments.findMany({
      where: { patient_id: params.id },
    });
    if (appointments.length === 0) {
      return NextResponse.json(
        { message: "No appointments found for this patient ID." },
        { status: 404 }
      );
    }
    return NextResponse.json(appointments);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching appointments by patient ID." },
      { status: 500 }
    );
  }
}
