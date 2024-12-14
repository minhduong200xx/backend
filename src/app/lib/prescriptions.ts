import { Prescription } from "../types/type";
import axios, { AxiosResponse } from "axios";

export async function getPrescriptions(): Promise<AxiosResponse> {
  try {
    const response = await axios.get("/api/prescriptions");
    return response.data;
  } catch (error) {
    console.error("Error fetching prescriptions:", error);
    throw error;
  }
}

export async function getPrescriptionById(
  prescriptionId: number
): Promise<AxiosResponse> {
  try {
    const response = await axios.get(`/api/prescriptions/${prescriptionId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching prescription:", error);
    throw error;
  }
}

export async function createPrescription(
  prescription: Prescription
): Promise<AxiosResponse> {
  try {
    const response = await axios.post("/api/prescriptions", prescription);
    return response.data;
  } catch (error) {
    console.error("Error creating prescription:", error);
    throw error;
  }
}

export async function updatePrescription(
  prescription: Prescription
): Promise<AxiosResponse> {
  try {
    const response = await axios.put(
      `/api/prescriptions/${prescription.prescription_id}`,
      prescription
    );
    return response.data;
  } catch (error) {
    console.error("Error updating prescription:", error);
    throw error;
  }
}

export async function deletePrescription(
  prescriptionId: number
): Promise<AxiosResponse> {
  try {
    const response = await axios.delete(`/api/prescriptions/${prescriptionId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting prescription:", error);
    throw error;
  }
}
