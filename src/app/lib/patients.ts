import { AnyARecord } from "node:dns";
import { Patient } from "../types/type";
import axios, { AxiosResponse } from "axios";

export async function getPatients(): Promise<AxiosResponse> {
  try {
    const response = await axios.get("/api/patients");
    return response.data;
  } catch (error) {
    console.error("Error fetching patients:", error);
    throw error;
  }
}

export async function getPatientById(
  patientId: number
): Promise<AxiosResponse> {
  try {
    const response = await axios.get(`/api/patients/${patientId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching patient:", error);
    throw error;
  }
}

export async function createPatient(patient: Patient): Promise<AxiosResponse> {
  try {
    const response = await axios.post("/api/patients", patient);
    return response.data;
  } catch (error) {
    console.error("Error creating patient:", error);
    throw error;
  }
}

export async function updatePatient(patient: Patient): Promise<AxiosResponse> {
  try {
    const response = await axios.put(
      `/api/patients/${patient.patient_id}`,
      patient
    );
    return response.data;
  } catch (error) {
    console.error("Error updating patient:", error);
    throw error;
  }
}

export async function deletePatient(patientId: number): Promise<AxiosResponse> {
  try {
    const response = await axios.delete(`/api/patients/${patientId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting patient:", error);
    throw error;
  }
}

export async function getPatientMedicalRecords(
  patientId: number
): Promise<AxiosResponse> {
  try {
    const response = await axios.get(
      `/api/patients/${patientId}/medical-records`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching patient medical records:", error);
    throw error;
  }
}

export async function getPatientAppointments(
  patientId: string
): Promise<AxiosResponse> {
  try {
    const response = await axios.get(`/api/appointments/patients/${patientId}`);
    return response;
  } catch (error) {
    console.error("Error fetching patient appointments:", error);
    throw error;
  }
}

export async function getPatientRole(
  patientId: string
): Promise<AxiosResponse> {
  try {
    const response = await axios.get(`/api/patients/${patientId}/role`);
    return response.data;
  } catch (error) {
    console.error("Error fetching patient role:", error);
    throw error;
  }
}

export async function bookingAppointment(
  data: AnyARecord
): Promise<AxiosResponse> {
  try {
    const response = await axios.post(`/api/appointments`, data);
    return response.data;
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw error;
  }
}

export async function onlinePayment(
  patientId: number,
  appointmentId: number
): Promise<AxiosResponse> {
  try {
    const response = await axios.post(
      `/api/patients/${patientId}/appointments/${appointmentId}/payment`
    );
    return response.data;
  } catch (error) {
    console.error("Error making payment:", error);
    throw error;
  }
}

export async function cancelPatientAppointment(
  appointmentId: number
): Promise<AxiosResponse> {
  const data = { cancelled: true };
  try {
    const response = await axios.put(
      `/api/appointments/${appointmentId}`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    throw error;
  }
}

export async function getPatientProfile(
  patientId: number
): Promise<AxiosResponse> {
  try {
    const response = await axios.get(`/api/patients/${patientId}/profile`);
    return response.data;
  } catch (error) {
    console.error("Error fetching patient profile:", error);
    throw error;
  }
}

export async function updatePatientProfile(
  patientId: number,
  profile: any
): Promise<AxiosResponse> {
  try {
    const response = await axios.put(
      `/api/patients/${patientId}/profile`,
      profile
    );
    return response.data;
  } catch (error) {
    console.error("Error updating patient profile:", error);
    throw error;
  }
}
