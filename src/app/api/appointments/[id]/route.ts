import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();
    const appointment = await prisma.appointments.findUnique({
      where: { appointment_id: params.id },
    });
    if (!appointment) {
      return NextResponse.json(
        { message: "Appointment not found." },
        { status: 404 }
      );
    }
    const updatedAppointment = await prisma.appointments.update({
      where: { appointment_id: params.id },
      data,
    });
    return NextResponse.json(updatedAppointment);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating appointment." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const appointment = await prisma.appointments.findUnique({
      where: { appointment_id: params.id },
    });
    if (!appointment) {
      return NextResponse.json(
        { message: "Appointment not found." },
        { status: 404 }
      );
    }
    await prisma.appointments.delete({
      where: { appointment_id: params.id },
    });
    return NextResponse.json({ message: "Appointment deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting appointment." },
      { status: 500 }
    );
  }
}
