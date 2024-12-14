import axios, { AxiosResponse } from "axios";
import { Doctor } from "../types/type";

export async function getDoctors(): Promise<AxiosResponse> {
  try {
    const response = await axios.get("/api/doctors");
    return response;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
}
export async function getDoctorById(doctorId: string): Promise<AxiosResponse> {
  try {
    const response = await axios.get(`/api/doctors/${doctorId}`);
    return response;
  } catch (error) {
    console.error("Error fetching doctor:", error);
    throw error;
  }
}
export async function createDoctor(doctor: Doctor): Promise<AxiosResponse> {
  try {
    const response = await axios.post("/api/doctors", doctor);
    return response.data;
  } catch (error) {
    console.error("Error creating doctor:", error);
    throw error;
  }
}
export async function updateDoctor(doctor: Doctor): Promise<AxiosResponse> {
  try {
    const response = await axios.put(
      `/api/doctors/${doctor.doctor_id}`,
      doctor
    );
    return response.data;
  } catch (error) {
    console.error("Error updating doctor:", error);
    throw error;
  }
}
export async function deleteDoctor(doctorId: number): Promise<AxiosResponse> {
  try {
    const response = await axios.delete(`/api/doctors/${doctorId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting doctor:", error);
    throw error;
  }
}
// export async function getDoctorAppointments(
//   doctorId: number
// ): Promise<AxiosResponse> {
//   try {
//     const response = await axios.get(`/api/doctors/${doctorId}/appointments`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching doctor appointments:", error);
//     throw error;
//   }
// }
// export async function cancelledAppointment(
//   doctorId: number,
//   appointmentId: number
// ): Promise<AxiosResponse> {
//   try {
//     const response = await axios.put(
//       `/api/doctors/${doctorId}/appointments/${appointmentId}/cancelled`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error cancelling appointment:", error);
//     throw error;
//   }
// }
// export async function completedAppointment(
//   doctorId: number,
//   appointmentId: number
// ): Promise<AxiosResponse> {
//   try {
//     const response = await axios.put(
//       `/api/doctors/${doctorId}/appointments/${appointmentId}/completed`
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error completing appointment:", error);
//     throw error;
//   }
// }
