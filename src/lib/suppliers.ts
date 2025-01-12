import { Supplier } from "../types/type";
import axios, { AxiosResponse } from "axios";

export async function getSuppliers(): Promise<AxiosResponse> {
  try {
    const response = await axios.get("/api/suppliers");
    return response.data;
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    throw error;
  }
}

export async function getSupplierById(
  supplierId: number
): Promise<AxiosResponse> {
  try {
    const response = await axios.get(`/api/suppliers/${supplierId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching supplier:", error);
    throw error;
  }
}

export async function createSupplier(
  supplier: Supplier
): Promise<AxiosResponse> {
  try {
    const response = await axios.post("/api/suppliers", supplier);
    return response.data;
  } catch (error) {
    console.error("Error creating supplier:", error);
    throw error;
  }
}

export async function updateSupplier(
  supplier: Supplier
): Promise<AxiosResponse> {
  try {
    const response = await axios.put(
      `/api/suppliers/${supplier.supplier_id}`,
      supplier
    );
    return response.data;
  } catch (error) {
    console.error("Error updating supplier:", error);
    throw error;
  }
}

export async function deleteSupplier(
  supplierId: number
): Promise<AxiosResponse> {
  try {
    const response = await axios.delete(`/api/suppliers/${supplierId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting supplier:", error);
    throw error;
  }
}
