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
  userId: string;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  status: boolean;
}
export interface Patient {
  patientId: string;
  userId: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  gender?: string;
  address?: string;
  emergencyContact?: string;
  medicalHistory?: string;
  appointments?: string[];
}
