import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get all appointments
export async function GET() {
  try {
    const appointments = await prisma.appointments.findMany();
    return NextResponse.json(appointments);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching appointments." },
      { status: 500 }
    );
  }
}

// Create new appointment
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    const newAppointment = await prisma.appointments.create({
      data: {
        appointment_date_time: new Date(data.appointment_date_time),
        first_name: data.first_name,
        last_name: data.last_name,
        reason_for_visit: data.reason_for_visit,
        status: data.status,
        amount: data.amount,
        payment: data.payment,
        cancelled: data.cancelled,
        isCompleted: data.isCompleted,
        patient_id: data.patient_id,
        doctor_id: data.doctor_id,
      },
    });
    const doctor = await prisma.doctors.findUnique({
      where: { doctor_id: newAppointment.doctor_id },
    });

    if (doctor) {
      const updatedSlots = doctor.slot_booked
        ? [...doctor.slot_booked, newAppointment.appointment_date_time]
        : [newAppointment.appointment_date_time];
      await prisma.doctors.update({
        where: { doctor_id: newAppointment.doctor_id },
        data: { slot_booked: updatedSlots },
      });
    }

    return NextResponse.json(newAppointment, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating appointment." },
      { status: 500 }
    );
  }
}

// Delete all appointments
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
