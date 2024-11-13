import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET: Retrieve all doctors
export async function GET() {
  try {
    const doctors = await prisma.doctors.findMany();
    return NextResponse.json(doctors);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch doctors" },
      { status: 500 }
    );
  }
}

// POST: Create a new doctor
export async function POST(request: Request) {
  try {
    const {
      first_name,
      last_name,
      specialty,
      email,
      phone_number,
      experience_years,
      working_days,
    } = await request.json();
    const newDoctor = await prisma.doctors.create({
      data: {
        first_name,
        last_name,
        specialty,
        email,
        phone_number,
        experience_years,
        working_days,
      },
    });
    return NextResponse.json(newDoctor, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create doctor" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing doctor
export async function PUT(request: Request) {
  try {
    const { id, first_name, last_name, specialty, email } =
      await request.json();
    const updatedDoctor = await prisma.doctors.update({
      where: { doctor_id: Number(id) },
      data: { first_name, last_name, specialty, email },
    });
    return NextResponse.json(updatedDoctor, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update doctor" },
      { status: 500 }
    );
  }
}

// DELETE: Remove a doctor by id
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await prisma.doctors.delete({
      where: { doctor_id: Number(id) },
    });
    return NextResponse.json({}, { status: 204 }); // No Content
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete doctor" },
      { status: 500 }
    );
  }
}
