import axios, { AxiosResponse } from "axios";
export async function getAppointments(): Promise<AxiosResponse> {
  try {
    const response = await axios.get("/api/appointments");
    return response.data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    throw error;
  }
}
export async function getAppointmentById(
  appointmentId: number
): Promise<AxiosResponse> {
  try {
    const response = await axios.get(`/api/appointments/${appointmentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching appointment:", error);
    throw error;
  }
}
export async function createAppointment(
  appointment: any
): Promise<AxiosResponse> {
  try {
    const response = await axios.post("/api/appointments", appointment);
    return response.data;
  } catch (error) {
    console.error("Error creating appointment:", error);
    throw error;
  }
}

export async function updateAppointment(
  appointment: any
): Promise<AxiosResponse> {
  try {
    const response = await axios.put(
      `/api/appointments/${appointment.appointment_id}`,
      appointment
    );
    return response.data;
  } catch (error) {
    console.error("Error updating appointment:", error);
    throw error;
  }
}
export async function deleteAppointment(
  appointmentId: number
): Promise<AxiosResponse> {
  try {
    const response = await axios.delete(`/api/appointments/${appointmentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting appointment:", error);
    throw error;
  }
}

export async function getDoctorAppointments(
  doctorId: number
): Promise<AxiosResponse> {
  try {
    const response = await axios.get(`/api/appointments/${doctorId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    throw error;
  }
}
