import { RegisterRequest } from "@/types/type";
import axios from "axios";

export default async function register(data: RegisterRequest) {
  try {
    const response = await axios.post("/api/account/register", data);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}
