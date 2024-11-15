import { PrismaClient } from "@prisma/client";
import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
// Get all patients
export async function GET() {
  try {
    const patients = await prisma.patients.findMany();

    if (patients.length === 0) {
      return NextResponse.json({ message: "No patients found" });
    }

    return NextResponse.json(patients);
  } catch (error) {
    console.error("Error fetching patients:", error);

    if (error instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Known Prisma error occurred while fetching patients." },
        { status: 500 }
      );
    } else if (error instanceof PrismaClientInitializationError) {
      return NextResponse.json(
        {
          error:
            "Failed to initialize Prisma Client, check database connection.",
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { error: "Failed to fetch patients due to an unexpected error." },
        { status: 500 }
      );
    }
  }
}

// Create a new patient
export async function POST(req: NextRequest) {
  try {
    const {
      first_name,
      last_name,
      date_of_birth,
      gender,
      phone_number,
      email,
      address,
      emergency_contact,
      medical_history,
    } = await req.json();

    if (!first_name || !last_name) {
      return NextResponse.json(
        { error: "First name and last name are required" },
        { status: 400 }
      );
    }

    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    if (phone_number && !/^\d{10}$/.test(phone_number)) {
      return NextResponse.json(
        { error: "Invalid phone number format, must be 10 digits" },
        { status: 400 }
      );
    }

    if (date_of_birth && isNaN(Date.parse(date_of_birth))) {
      return NextResponse.json(
        { error: "Invalid date of birth format" },
        { status: 400 }
      );
    }

    const newPatient = await prisma.patients.create({
      data: {
        first_name,
        last_name,
        date_of_birth: date_of_birth ? new Date(date_of_birth) : null,
        gender,
        phone_number,
        email,
        address,
        emergency_contact,
        medical_history,
      },
    });

    return NextResponse.json(newPatient, { status: 201 });
  } catch (error) {
    console.error("Error creating patient:", error);
    return NextResponse.json(
      { error: "Failed to create patient" },
      { status: 500 }
    );
  }
}

// Delete all
export async function DELETE() {
  try {
    const result = await prisma.patients.deleteMany({});

    if (result.count === 0) {
      return NextResponse.json(
        { message: "No patients found to delete" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "All patients deleted successfully",
      count: result.count,
    });
  } catch (error) {
    console.error("Error deleting all patients:", error);
    return NextResponse.json(
      { error: "Failed to delete all patients" },
      { status: 500 }
    );
  }
}
