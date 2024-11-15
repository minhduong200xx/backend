-- CreateTable
CREATE TABLE "Suppliers" (
    "supplier_id" SERIAL NOT NULL,
    "supplier_name" TEXT NOT NULL,
    "contact_person" TEXT,
    "phone_number" TEXT,
    "email" TEXT,
    "address" TEXT,

    CONSTRAINT "Suppliers_pkey" PRIMARY KEY ("supplier_id")
);

-- CreateTable
CREATE TABLE "Patients" (
    "patient_id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "date_of_birth" TIMESTAMP(3),
    "gender" TEXT,
    "phone_number" TEXT,
    "email" TEXT,
    "address" TEXT,
    "emergency_contact" TEXT,
    "medical_history" TEXT,

    CONSTRAINT "Patients_pkey" PRIMARY KEY ("patient_id")
);

-- CreateTable
CREATE TABLE "Doctors" (
    "doctor_id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "specialty" TEXT,
    "phone_number" TEXT,
    "email" TEXT,
    "experience_years" INTEGER,
    "working_days" TEXT,

    CONSTRAINT "Doctors_pkey" PRIMARY KEY ("doctor_id")
);

-- CreateTable
CREATE TABLE "Departments" (
    "department_id" SERIAL NOT NULL,
    "department_name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Departments_pkey" PRIMARY KEY ("department_id")
);

-- CreateTable
CREATE TABLE "Appointments" (
    "appointment_id" SERIAL NOT NULL,
    "appointment_date" TIMESTAMP(3) NOT NULL,
    "reason_for_visit" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Scheduled',
    "patient_id" INTEGER NOT NULL,
    "doctor_id" INTEGER NOT NULL,

    CONSTRAINT "Appointments_pkey" PRIMARY KEY ("appointment_id")
);

-- CreateTable
CREATE TABLE "Medical_Records" (
    "record_id" SERIAL NOT NULL,
    "diagnosis" TEXT,
    "treatment" TEXT,
    "record_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "patient_id" INTEGER NOT NULL,
    "doctor_id" INTEGER NOT NULL,

    CONSTRAINT "Medical_Records_pkey" PRIMARY KEY ("record_id")
);

-- CreateTable
CREATE TABLE "Prescriptions" (
    "prescription_id" SERIAL NOT NULL,
    "medicine_name" TEXT,
    "dosage" TEXT,
    "duration" TEXT,
    "record_id" INTEGER NOT NULL,

    CONSTRAINT "Prescriptions_pkey" PRIMARY KEY ("prescription_id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "payment_id" SERIAL NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DOUBLE PRECISION NOT NULL,
    "payment_method" TEXT NOT NULL DEFAULT 'Cash',
    "appointment_id" INTEGER NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("payment_id")
);

-- CreateTable
CREATE TABLE "Medicines" (
    "medicine_id" SERIAL NOT NULL,
    "medicine_name" TEXT NOT NULL,
    "description" TEXT,
    "quantity_in_stock" INTEGER NOT NULL DEFAULT 0,
    "price_per_unit" DOUBLE PRECISION NOT NULL,
    "expiration_date" TIMESTAMP(3),
    "supplier_id" INTEGER NOT NULL,

    CONSTRAINT "Medicines_pkey" PRIMARY KEY ("medicine_id")
);

-- CreateTable
CREATE TABLE "Stock_Transactions" (
    "transaction_id" SERIAL NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "transaction_type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "notes" TEXT,
    "medicine_id" INTEGER NOT NULL,

    CONSTRAINT "Stock_Transactions_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateTable
CREATE TABLE "Prescriptions_Medicines" (
    "prescription_id" INTEGER NOT NULL,
    "medicine_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Prescriptions_Medicines_pkey" PRIMARY KEY ("prescription_id","medicine_id")
);

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
