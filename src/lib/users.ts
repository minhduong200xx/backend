import axios, { AxiosResponse } from "axios";
import { User } from "../types/type";
export async function getUsers(): Promise<AxiosResponse> {
  try {
    const response = await axios.get("/api/users");
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
export async function getUserById(userId: number): Promise<AxiosResponse> {
  try {
    const response = await axios.get(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}
export async function createUser(user: User): Promise<AxiosResponse> {
  try {
    const response = await axios.post("/api/users", user);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
export async function updateUser(user: User): Promise<AxiosResponse> {
  try {
    const response = await axios.put(`/api/users/${user.user_id}`, user);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}
export async function deleteUser(userId: number): Promise<AxiosResponse> {
  try {
    const response = await axios.delete(`/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}
export async function changeUserStatus(userId: number): Promise<AxiosResponse> {
  try {
    const response = await axios.post(`/api/admin`, { userId });
    return response.data;
  } catch (error) {
    console.error("Error changing user status:", error);
    throw error;
  }
}
export async function getUserRole(userId: number): Promise<AxiosResponse> {
  try {
    const response = await axios.get(`/api/users/${userId}/role`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user role:", error);
    throw error;
  }
}
export async function changeUserToPatient(
  userId: string
): Promise<AxiosResponse> {
  try {
    const response = await axios.put(`/api/users/${userId}/patient`);
    return response.data;
  } catch (error) {
    console.error("Error changing user to patient:", error);
    throw error;
  }
}
export async function getUserProfile(): Promise<AxiosResponse> {
  try {
    const response = await axios.get("/api/users/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}
export async function updateUserProfile(user: User): Promise<AxiosResponse> {
  try {
    const response = await axios.put("/api/users/profile", user);
    return response.data;
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
}
export async function changeUserPassword(
  userId: number,
  password: string
): Promise<AxiosResponse> {
  try {
    const response = await axios.put(`/api/users/${userId}/password`, {
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error changing user password:", error);
    throw error;
  }
}
export async function resetPassword(
  userId: number,
  password: string
): Promise<AxiosResponse> {
  try {
    const response = await axios.put(`/api/users/${userId}/reset`, {
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error resetting password:", error);
    throw error;
  }
}
export async function registerByAdmin(
  email: string,
  first_name: string,
  last_name: string,
  role_id: number
): Promise<AxiosResponse> {
  try {
    const response = await axios.post(`/api/admin/register-user`, {
      email,
      first_name,
      last_name,
      role_id,
    });
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}
