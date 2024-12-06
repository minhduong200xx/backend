import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get appointment by ID
export async function GET(
  req: NextRequest,
  context: { params: Record<string, string> }
) {
  try {
    const { id } = context.params;
    const appointment = await prisma.appointments.findUnique({
      where: { appointment_id: Number(id) },
      include: {
        patient: true,
        doctor: true,
      },
    });
    if (!appointment) {
      return NextResponse.json(
        { message: "Appointment not found." },
        { status: 404 }
      );
    }
    return NextResponse.json(appointment);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching appointment." },
      { status: 500 }
    );
  }
}

// Update appointment by ID
export async function PUT(
  req: NextRequest,
  context: { params: Record<string, string> }
) {
  const data = await req.json();
  try {
    const { id } = context.params;
    const appointment = await prisma.appointments.findUnique({
      where: { appointment_id: Number(id) },
      include: {
        patient: true,
        doctor: true,
      },
    });
    if (!appointment) {
      return NextResponse.json(
        { message: "Appointment not found." },
        { status: 404 }
      );
    }
    const updatedAppointment = await prisma.appointments.update({
      where: { appointment_id: Number(id) },
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

// Delete appointment by ID
export async function DELETE(
  req: NextRequest,
  context: { params: Record<string, string> }
) {
  try {
    const { id } = context.params;
    const appointment = await prisma.appointments.findUnique({
      where: { appointment_id: Number(id) },
      include: {
        patient: true,
        doctor: true,
      },
    });
    if (!appointment) {
      return NextResponse.json(
        { message: "Appointment not found." },
        { status: 404 }
      );
    }
    const deletedAppointment = await prisma.appointments.delete({
      where: { appointment_id: Number(id) },
    });
    return NextResponse.json(deletedAppointment);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting appointment." },
      { status: 500 }
    );
  }
}
