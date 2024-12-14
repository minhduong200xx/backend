export interface Supplier {
  supplier_id: number;
  supplier_name: string;
  contact_person?: string;
  phone_number?: string;
  email?: string;
  address?: string;
  medicines: Medicine[];
}

export interface User {
  user_id: number;
  first_name?: string;
  last_name?: string;
  user_name: string;
  email: string;
  password: string;
  role_id: number;
  created_at: string;
  updated_at: string;
  patient?: Patient;
  doctor?: Doctor;
  image?: string;
  status: boolean;
  patient_id?: number;
  doctor_id?: number;
}

export interface Role {
  role_id: number;
  role_name: string;
  users: User[];
}

export interface Patient {
  patient_id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  email?: string;
  gender?: string;
  phone_number?: string;
  address?: string;
  emergency_contact?: string;
  medical_history?: string;
  appointments: Appointment[];
  medical_records: MedicalRecord[];
  user: User;
  image?: string;
}

export interface Doctor {
  doctor_id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  speciality?: string;
  date_of_birth?: string;
  email?: string;
  gender?: string;
  phone_number?: string;
  address?: string;
  experience_years?: number;
  appointments: Appointment[];
  medical_records: MedicalRecord[];
  user: User;
  image?: string;
  degree?: string;
  about?: string;
  available: boolean;
  fees: number;
  slot_booked: any[];
}

export interface Department {
  department_id: number;
  department_name: string;
  description?: string;
}

export interface Appointment {
  appointment_id: number;
  slot_date: string;
  slot_time: string;
  first_name?: string;
  last_name?: string;
  reason_for_visit?: string;
  status: string;
  amount: number;
  payment: boolean;
  cancelled: boolean;
  isCompleted: boolean;
  patient_id: number;
  doctor_id: number;
  patient: Patient;
  doctor: Doctor;
  payments: Payment[];
}

export interface MedicalRecord {
  record_id: number;
  diagnosis?: string;
  treatment?: string;
  record_date: string;
  patient_id: number;
  doctor_id: number;
  patient: Patient;
  doctor: Doctor;
  prescriptions: Prescription[];
}

export interface Prescription {
  prescription_id: number;
  medicine_name?: string;
  dosage?: string;
  duration?: string;
  record_id: number;
  record: MedicalRecord;
  prescription_medicines: PrescriptionMedicine[];
}

export interface Payment {
  payment_id: number;
  payment_date: string;
  amount: number;
  payment_method: string;
  appointment_id: number;
  appointment: Appointment;
}

export interface Medicine {
  medicine_id: number;
  medicine_name: string;
  description?: string;
  quantity_in_stock: number;
  price_per_unit: number;
  expiration_date?: string;
  supplier_id: number;
  supplier: Supplier;
  stock_transactions: StockTransaction[];
  prescription_medicines: PrescriptionMedicine[];
}

export interface StockTransaction {
  transaction_id: number;
  transaction_date: string;
  transaction_type: string;
  quantity: number;
  notes?: string;
  medicine_id: number;
  medicine: Medicine;
}

export interface PrescriptionMedicine {
  prescription_id: number;
  medicine_id: number;
  quantity: number;
  prescription: Prescription;
  medicine: Medicine;
}
export interface RegisterRequest {
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  password: string;
  role_id?: number;
}
