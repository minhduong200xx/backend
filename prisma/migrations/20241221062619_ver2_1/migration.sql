/*
  Warnings:

  - The primary key for the `Appointments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `appointment_date` on the `Appointments` table. All the data in the column will be lost.
  - The primary key for the `Departments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Doctors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `specialty` on the `Doctors` table. All the data in the column will be lost.
  - You are about to drop the column `working_days` on the `Doctors` table. All the data in the column will be lost.
  - The primary key for the `Medical_Records` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Medicines` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Patients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Payments` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Prescriptions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Prescriptions_Medicines` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Stock_Transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Suppliers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[user_id]` on the table `Doctors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Patients` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amount` to the `Appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appointment_date_time` to the `Appointments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fees` to the `Doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Patients` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Appointments" DROP CONSTRAINT "Appointments_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "Appointments" DROP CONSTRAINT "Appointments_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "Medical_Records" DROP CONSTRAINT "Medical_Records_doctor_id_fkey";

-- DropForeignKey
ALTER TABLE "Medical_Records" DROP CONSTRAINT "Medical_Records_patient_id_fkey";

-- DropForeignKey
ALTER TABLE "Medicines" DROP CONSTRAINT "Medicines_supplier_id_fkey";

-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_appointment_id_fkey";

-- DropForeignKey
ALTER TABLE "Prescriptions" DROP CONSTRAINT "Prescriptions_record_id_fkey";

-- DropForeignKey
ALTER TABLE "Prescriptions_Medicines" DROP CONSTRAINT "Prescriptions_Medicines_medicine_id_fkey";

-- DropForeignKey
ALTER TABLE "Prescriptions_Medicines" DROP CONSTRAINT "Prescriptions_Medicines_prescription_id_fkey";

-- DropForeignKey
ALTER TABLE "Stock_Transactions" DROP CONSTRAINT "Stock_Transactions_medicine_id_fkey";

-- AlterTable
ALTER TABLE "Appointments" DROP CONSTRAINT "Appointments_pkey",
DROP COLUMN "appointment_date",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "appointment_date_time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "cancelled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "first_name" TEXT,
ADD COLUMN     "isCompleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "last_name" TEXT,
ADD COLUMN     "payment" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "appointment_id" DROP DEFAULT,
ALTER COLUMN "appointment_id" SET DATA TYPE TEXT,
ALTER COLUMN "patient_id" SET DATA TYPE TEXT,
ALTER COLUMN "doctor_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Appointments_pkey" PRIMARY KEY ("appointment_id");
DROP SEQUENCE "Appointments_appointment_id_seq";

-- AlterTable
ALTER TABLE "Departments" DROP CONSTRAINT "Departments_pkey",
ALTER COLUMN "department_id" DROP DEFAULT,
ALTER COLUMN "department_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Departments_pkey" PRIMARY KEY ("department_id");
DROP SEQUENCE "Departments_department_id_seq";

-- AlterTable
ALTER TABLE "Doctors" DROP CONSTRAINT "Doctors_pkey",
DROP COLUMN "specialty",
DROP COLUMN "working_days",
ADD COLUMN     "about" TEXT,
ADD COLUMN     "address" TEXT,
ADD COLUMN     "available" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "date_of_birth" TIMESTAMP(3),
ADD COLUMN     "degree" TEXT,
ADD COLUMN     "fees" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "slot_booked" TIMESTAMP(3)[],
ADD COLUMN     "speciality" TEXT,
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "doctor_id" DROP DEFAULT,
ALTER COLUMN "doctor_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Doctors_pkey" PRIMARY KEY ("doctor_id");
DROP SEQUENCE "Doctors_doctor_id_seq";

-- AlterTable
ALTER TABLE "Medical_Records" DROP CONSTRAINT "Medical_Records_pkey",
ALTER COLUMN "record_id" DROP DEFAULT,
ALTER COLUMN "record_id" SET DATA TYPE TEXT,
ALTER COLUMN "patient_id" SET DATA TYPE TEXT,
ALTER COLUMN "doctor_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Medical_Records_pkey" PRIMARY KEY ("record_id");
DROP SEQUENCE "Medical_Records_record_id_seq";

-- AlterTable
ALTER TABLE "Medicines" DROP CONSTRAINT "Medicines_pkey",
ALTER COLUMN "medicine_id" DROP DEFAULT,
ALTER COLUMN "medicine_id" SET DATA TYPE TEXT,
ALTER COLUMN "supplier_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Medicines_pkey" PRIMARY KEY ("medicine_id");
DROP SEQUENCE "Medicines_medicine_id_seq";

-- AlterTable
ALTER TABLE "Patients" DROP CONSTRAINT "Patients_pkey",
ADD COLUMN     "image" TEXT,
ADD COLUMN     "user_id" TEXT NOT NULL,
ALTER COLUMN "patient_id" DROP DEFAULT,
ALTER COLUMN "patient_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Patients_pkey" PRIMARY KEY ("patient_id");
DROP SEQUENCE "Patients_patient_id_seq";

-- AlterTable
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_pkey",
ALTER COLUMN "payment_id" DROP DEFAULT,
ALTER COLUMN "payment_id" SET DATA TYPE TEXT,
ALTER COLUMN "appointment_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Payments_pkey" PRIMARY KEY ("payment_id");
DROP SEQUENCE "Payments_payment_id_seq";

-- AlterTable
ALTER TABLE "Prescriptions" DROP CONSTRAINT "Prescriptions_pkey",
ALTER COLUMN "prescription_id" DROP DEFAULT,
ALTER COLUMN "prescription_id" SET DATA TYPE TEXT,
ALTER COLUMN "record_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Prescriptions_pkey" PRIMARY KEY ("prescription_id");
DROP SEQUENCE "Prescriptions_prescription_id_seq";

-- AlterTable
ALTER TABLE "Prescriptions_Medicines" DROP CONSTRAINT "Prescriptions_Medicines_pkey",
ALTER COLUMN "prescription_id" SET DATA TYPE TEXT,
ALTER COLUMN "medicine_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Prescriptions_Medicines_pkey" PRIMARY KEY ("prescription_id", "medicine_id");

-- AlterTable
ALTER TABLE "Stock_Transactions" DROP CONSTRAINT "Stock_Transactions_pkey",
ALTER COLUMN "transaction_id" DROP DEFAULT,
ALTER COLUMN "transaction_id" SET DATA TYPE TEXT,
ALTER COLUMN "medicine_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Stock_Transactions_pkey" PRIMARY KEY ("transaction_id");
DROP SEQUENCE "Stock_Transactions_transaction_id_seq";

-- AlterTable
ALTER TABLE "Suppliers" DROP CONSTRAINT "Suppliers_pkey",
ALTER COLUMN "supplier_id" DROP DEFAULT,
ALTER COLUMN "supplier_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Suppliers_pkey" PRIMARY KEY ("supplier_id");
DROP SEQUENCE "Suppliers_supplier_id_seq";

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "user_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role_id" TEXT NOT NULL DEFAULT '2',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "image" TEXT,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Role" (
    "role_id" TEXT NOT NULL,
    "role_name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("role_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_role_name_key" ON "Role"("role_name");

-- CreateIndex
CREATE UNIQUE INDEX "Doctors_user_id_key" ON "Doctors"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Patients_user_id_key" ON "Patients"("user_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patients" ADD CONSTRAINT "Patients_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Doctors" ADD CONSTRAINT "Doctors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patients"("patient_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctors"("doctor_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medical_Records" ADD CONSTRAINT "Medical_Records_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "Patients"("patient_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medical_Records" ADD CONSTRAINT "Medical_Records_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "Doctors"("doctor_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescriptions" ADD CONSTRAINT "Prescriptions_record_id_fkey" FOREIGN KEY ("record_id") REFERENCES "Medical_Records"("record_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_appointment_id_fkey" FOREIGN KEY ("appointment_id") REFERENCES "Appointments"("appointment_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medicines" ADD CONSTRAINT "Medicines_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "Suppliers"("supplier_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock_Transactions" ADD CONSTRAINT "Stock_Transactions_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "Medicines"("medicine_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescriptions_Medicines" ADD CONSTRAINT "Prescriptions_Medicines_prescription_id_fkey" FOREIGN KEY ("prescription_id") REFERENCES "Prescriptions"("prescription_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prescriptions_Medicines" ADD CONSTRAINT "Prescriptions_Medicines_medicine_id_fkey" FOREIGN KEY ("medicine_id") REFERENCES "Medicines"("medicine_id") ON DELETE CASCADE ON UPDATE CASCADE;
