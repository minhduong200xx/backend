import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//get all appointments
export async function GET() {
  try {
    const appointments = await prisma.appointments.findMany({
      include: {
        patient: true,
        doctor: true,
      },
    });
    return NextResponse.json(appointments);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching appointments." },
      { status: 500 }
    );
  }
}

//create new appointment
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    const newAppointment = await prisma.appointments.create({
      data,
    });
    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating appointment." },
      { status: 500 }
    );
  }
}

//delete all appointments
export async function DELETE() {
  try {
    await prisma.appointments.deleteMany({});
    return NextResponse.json({ message: "All appointments deleted." });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting appointments." },
      { status: 500 }
    );
  }
}
