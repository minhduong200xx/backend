import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function DELETE(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
  } = req;
  try {
    // Check if the doctor exists
    const doctor = await prisma.doctors.findUnique({
      where: { doctor_id: Number(id) },
    });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Delete the doctor
    await prisma.doctors.delete({
      where: { doctor_id: Number(id) },
    });

    return res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete doctor" });
  }
}
