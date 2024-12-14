import { MedicalRecord } from "../types/type";
import axios, { AxiosResponse } from "axios";

export async function getMedicalRecords(): Promise<AxiosResponse> {
  try {
    const response = await axios.get("/api/medical-records");
    return response.data;
  } catch (error) {
    console.error("Error fetching medical records:", error);
    throw error;
  }
}

export async function getMedicalRecordById(
  recordId: number
): Promise<AxiosResponse> {
  try {
    const response = await axios.get(`/api/medical-records/${recordId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching medical record:", error);
    throw error;
  }
}

export async function createMedicalRecord(
  record: MedicalRecord
): Promise<AxiosResponse> {
  try {
    const response = await axios.post("/api/medical-records", record);
    return response.data;
  } catch (error) {
    console.error("Error creating medical record:", error);
    throw error;
  }
}

export async function updateMedicalRecord(
  record: MedicalRecord
): Promise<AxiosResponse> {
  try {
    const response = await axios.put(
      `/api/medical-records/${record.record_id}`,
      record
    );
    return response.data;
  } catch (error) {
    console.error("Error updating medical record:", error);
    throw error;
  }
}

export async function deleteMedicalRecord(
  recordId: number
): Promise<AxiosResponse> {
  try {
    const response = await axios.delete(`/api/medical-records/${recordId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting medical record:", error);
    throw error;
  }
}
