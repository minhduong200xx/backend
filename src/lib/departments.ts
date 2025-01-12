import { Department } from "../types/type";
import axios, { AxiosResponse } from "axios";

export async function getDepartments(): Promise<AxiosResponse> {
  try {
    const response = await axios.get("/api/departments");
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
}

export async function getDepartmentById(
  departmentId: number
): Promise<AxiosResponse> {
  try {
    const response = await axios.get(`/api/departments/${departmentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching department:", error);
    throw error;
  }
}

export async function createDepartment(
  department: Department
): Promise<AxiosResponse> {
  try {
    const response = await axios.post("/api/departments", department);
    return response.data;
  } catch (error) {
    console.error("Error creating department:", error);
    throw error;
  }
}

export async function updateDepartment(
  department: Department
): Promise<AxiosResponse> {
  try {
    const response = await axios.put(
      `/api/departments/${department.department_id}`,
      department
    );
    return response.data;
  } catch (error) {
    console.error("Error updating department:", error);
    throw error;
  }
}

export async function deleteDepartment(
  departmentId: number
): Promise<AxiosResponse> {
  try {
    const response = await axios.delete(`/api/departments/${departmentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting department:", error);
    throw error;
  }
}
