export interface Doctor {
  doctor_id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  specialty?: string;
  date_of_birth?: string;
  email?: string;
  gender?: string;
  phone_number?: string;
  address?: string;
  experience_years?: number;
  working_days?: string;
  appointments?: string[];
  medical_records?: string[];
}

export interface Department {
  department_id: number;
  department_name: string;
  description?: string;
}
export interface User {
  user_id: number;
  first_name?: string;
  last_name?: string;
  user_name: string;
  email: string;
  password?: string;
  role_id: number;
  created_at: string;
  updated_at: string;
  status: boolean;
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
  appointments?: string[];
  medical_records?: string[];
}
export interface Medicine {
  medicine_id: number;
  medicine_name: string;
  description?: string;
  quantity_in_stock: number;
  price_per_unit: number;
  expiration_date?: string;
  supplier_id: number;
}
export interface StockTransaction {
  transaction_id: number;
  transaction_date: string;
  transaction_type: string;
  quantity: number;
  notes?: string;
  medicine_id: number;
}
export interface Supplier {
  supplier_id: number;
  supplier_name: string;
  contact_person?: string;
  phone_number?: string;
  email?: string;
  address?: string;
}
export interface Appointment {
  appointment_id: number;
  appointment_date: string;
  reason_for_visit?: string;
  status: string;
  patient_id?: number;
  doctor_id?: number;
}
export interface Prescription {
  prescription_id: number;
  medicine_name?: string;
  dosage?: string;
  duration?: string;
  record_id: number;
}

export interface PrescriptionMedicine {
  prescription_id: number;
  medicine_id: number;
  quantity: number;
}
