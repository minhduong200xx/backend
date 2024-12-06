import { NextRequest, NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
//get patient by id
export async function GET({ params }: { params: { id: string } }) {
  try {
    const patient = await prisma.patients.findUnique({
      where: { patient_id: Number(params.id) },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json(patient);
  } catch (error) {
    console.error("Error fetching patient:", error);
    return NextResponse.json(
      { error: "Failed to fetch patient" },
      { status: 500 }
    );
  }
}

//update patient by id
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    } = await request.json();
    // if (Object.keys(request.json()).length === 0) {
    //   return NextResponse.json(
    //     { message: "No changes detected" },
    //     { status: 400 }
    //   );
    // }
    const patient = await prisma.patients.findUnique({
      where: { patient_id: Number(params.id) },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    const updatedData: Partial<{
      first_name: string;
      last_name: string;
      date_of_birth: string;
      gender: string;
      phone_number: string;
      email: string;
      address: string;
      emergency_contact: string;
      medical_history: string;
    }> = {};

    if (patient.first_name !== first_name) updatedData.first_name = first_name;
    if (patient.last_name !== last_name) updatedData.last_name = last_name;
    if (patient.date_of_birth !== date_of_birth)
      updatedData.date_of_birth = date_of_birth;
    if (patient.gender !== gender) updatedData.gender = gender;
    if (patient.phone_number !== phone_number)
      updatedData.phone_number = phone_number;
    if (patient.email !== email) updatedData.email = email;
    if (patient.address !== address) updatedData.address = address;
    if (patient.emergency_contact !== emergency_contact)
      updatedData.emergency_contact = emergency_contact;
    if (patient.medical_history !== medical_history)
      updatedData.medical_history = medical_history;

    if (Object.keys(updatedData).length === 0) {
      return NextResponse.json(
        { message: "No changes detected" },
        { status: 400 }
      );
    }

    const updatedPatient = await prisma.patients.update({
      where: { patient_id: Number(params.id) },
      data: updatedData,
    });

    return NextResponse.json(updatedPatient);
  } catch (error) {
    console.error("Error updating patient:", error);
    return NextResponse.json(
      { error: "Failed to update patient" },
      { status: 500 }
    );
  }
}

//delete patient by id
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const patient = await prisma.patients.findUnique({
      where: { patient_id: Number(params.id) },
    });

    if (!patient) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    await prisma.patients.delete({
      where: { patient_id: Number(params.id) },
    });

    return NextResponse.json({
      message: "Patient deleted successfully",
      patient,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete patient" },
      { status: 500 }
    );
  }
}
