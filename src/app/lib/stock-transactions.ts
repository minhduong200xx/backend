import { StockTransaction } from "../types/type";
import axios, { AxiosResponse } from "axios";

export async function getStockTransactions(): Promise<AxiosResponse> {
  try {
    const response = await axios.get("/api/stock-transactions");
    return response.data;
  } catch (error) {
    console.error("Error fetching stock transactions:", error);
    throw error;
  }
}

export async function getStockTransactionById(
  transactionId: number
): Promise<AxiosResponse> {
  try {
    const response = await axios.get(
      `/api/stock-transactions/${transactionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching stock transaction:", error);
    throw error;
  }
}

export async function createStockTransaction(
  transaction: StockTransaction
): Promise<AxiosResponse> {
  try {
    const response = await axios.post("/api/stock-transactions", transaction);
    return response.data;
  } catch (error) {
    console.error("Error creating stock transaction:", error);
    throw error;
  }
}

export async function updateStockTransaction(
  transaction: StockTransaction
): Promise<AxiosResponse> {
  try {
    const response = await axios.put(
      `/api/stock-transactions/${transaction.transaction_id}`,
      transaction
    );
    return response.data;
  } catch (error) {
    console.error("Error updating stock transaction:", error);
    throw error;
  }
}

export async function deleteStockTransaction(
  transactionId: number
): Promise<AxiosResponse> {
  try {
    const response = await axios.delete(
      `/api/stock-transactions/${transactionId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting stock transaction:", error);
    throw error;
  }
}
