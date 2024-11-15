import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//get appointment by ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const appointment = await prisma.appointments.findUnique({
      where: { appointment_id: Number(params.id) },
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

//update appointment by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const appointment = await prisma.appointments.findUnique({
    where: { appointment_id: Number(params.id) },
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
  try {
    const updatedAppointment = await prisma.appointments.update({
      where: { appointment_id: Number(params.id) },
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
  { params }: { params: { id: string } }
) {
  try {
    const appointment = await prisma.appointments.findUnique({
      where: { appointment_id: Number(params.id) },
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
      where: { appointment_id: Number(params.id) },
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
