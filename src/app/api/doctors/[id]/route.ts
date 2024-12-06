// File: api/doctor/[id]/route.ts

import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const doctor = await prisma.doctors.findUnique({
      where: { doctor_id: Number(params.id) },
    });

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    return NextResponse.json(doctor);
  } catch (error) {
    console.error("Error retrieving doctor:", error);
    return NextResponse.json(
      { error: "Failed to retrieve doctor" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const doctor = await prisma.doctors.findUnique({
      where: { doctor_id: Number(params.id) },
    });

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    await prisma.doctors.delete({
      where: { doctor_id: Number(params.id) },
    });

    return NextResponse.json({
      message: "Doctor deleted successfully",
      doctor,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete doctor" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json();

    if (data.date_of_birth) {
      data.date_of_birth = new Date(data.date_of_birth).toISOString();
    }

    const updatedDoctor = await prisma.doctors.update({
      where: { doctor_id: Number(params.id) },
      data,
    });

    return NextResponse.json(updatedDoctor);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update doctor", error },
      { status: 500 }
    );
  }
}
