import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//get all
export async function GET() {
  try {
    const doctors = await prisma.doctors.findMany();
    const formattedDoctors = doctors.map((doctor) => ({
      ...doctor,
      date_of_birth: doctor.date_of_birth
        ? doctor.date_of_birth.toISOString().split("T")[0]
        : null,
    }));
    return NextResponse.json(formattedDoctors);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch doctors" },
      { status: 500 }
    );
  }
}
//new
export async function POST(request: NextRequest) {
  try {
    const {
      first_name,
      last_name,
      speciality,
      email,
      phone_number,
      experience_years,
    } = await request.json();
    const newDoctor = await prisma.doctors.create({
      data: {
        first_name,
        last_name,
        speciality,
        email,
        phone_number,
        experience_years,
      },
    });
    return NextResponse.json(newDoctor, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create doctor" },
      { status: 500 }
    );
  }
}
//delete all
export async function DELETE() {
  try {
    const result = await prisma.doctors.deleteMany({});

    return NextResponse.json({
      message: "All doctors deleted successfully",
      count: result.count,
    });
  } catch (error) {
    console.error("Error deleting all doctors:", error);
    return NextResponse.json(
      { error: "Failed to delete all doctors" },
      { status: 500 }
    );
  }
}
