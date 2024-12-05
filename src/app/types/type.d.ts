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
