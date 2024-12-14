import { Payment } from "../types/type";
import axios, { AxiosResponse } from "axios";

export async function getPayments(): Promise<AxiosResponse> {
  try {
    const response = await axios.get("/api/payments");
    return response.data;
  } catch (error) {
    console.error("Error fetching payments:", error);
    throw error;
  }
}

export async function getPaymentById(
  paymentId: number
): Promise<AxiosResponse> {
  try {
    const response = await axios.get(`/api/payments/${paymentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching payment:", error);
    throw error;
  }
}

export async function createPayment(payment: Payment): Promise<AxiosResponse> {
  try {
    const response = await axios.post("/api/payments", payment);
    return response.data;
  } catch (error) {
    console.error("Error creating payment:", error);
    throw error;
  }
}

export async function updatePayment(payment: Payment): Promise<AxiosResponse> {
  try {
    const response = await axios.put(
      `/api/payments/${payment.payment_id}`,
      payment
    );
    return response.data;
  } catch (error) {
    console.error("Error updating payment:", error);
    throw error;
  }
}

export async function deletePayment(paymentId: number): Promise<AxiosResponse> {
  try {
    const response = await axios.delete(`/api/payments/${paymentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting payment:", error);
    throw error;
  }
}
