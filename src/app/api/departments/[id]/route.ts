import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get department by id
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const department = await prisma.departments.findUnique({
      where: { department_id: Number(params.id) },
    });
    if (!department) {
      return NextResponse.json(
        { message: "Department not found." },
        { status: 404 }
      );
    }
    return NextResponse.json(department);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching department." },
      { status: 500 }
    );
  }
}

// Update department by id
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  try {
    const department = await prisma.departments.findUnique({
      where: { department_id: Number(params.id) },
    });
    if (!department) {
      return NextResponse.json(
        { message: "Department not found." },
        { status: 404 }
      );
    }
    const updatedDepartment = await prisma.departments.update({
      where: { department_id: Number(params.id) },
      data,
    });
    return NextResponse.json({
      message: "Department updated",
      updatedDepartment,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error updating department." },
      { status: 500 }
    );
  }
}

// Delete department by id
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const department = await prisma.departments.findUnique({
      where: { department_id: Number(params.id) },
    });
    if (!department) {
      return NextResponse.json(
        { message: "Department not found." },
        { status: 404 }
      );
    }
    const deletedDepartment = await prisma.departments.delete({
      where: { department_id: Number(params.id) },
    });
    return NextResponse.json({
      message: "Department deleted",
      deletedDepartment,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error deleting department." },
      { status: 500 }
    );
  }
}
