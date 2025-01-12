import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
if (process.env.NODE_ENV !== "production") {
  (global as typeof global & { prisma: PrismaClient }).prisma = prisma;
}
const exportedPrisma = { prisma };
export default exportedPrisma;
