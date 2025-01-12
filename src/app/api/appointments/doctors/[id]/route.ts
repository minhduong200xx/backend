import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const appointments = await prisma.appointments.findMany({
      where: { doctor_id: params.id },
      include: {
        doctor: true,
        patient: true,
      },
    });
    if (appointments.length === 0) {
      return NextResponse.json(
        { message: "No appointments found." },
        { status: 404 }
      );
    }

    return NextResponse.json(appointments);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching appointments." },
      { status: 500 }
    );
  }
}
