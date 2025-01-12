import React, { createContext, useContext, useEffect, useState } from "react";
import { message } from "antd";
import axios from "axios";
import { Doctor, Patient } from "../types/type";
import { MessageInstance } from "antd/es/message/interface";
import { getPatients } from "@/lib/patients";
import { getDoctors } from "@/lib/doctors";
import { useSWRConfig } from "swr";

interface AppContextProps {
  doctors: Doctor[];
  loading: boolean;
  patients: Patient[];
  messageApi: MessageInstance;
}
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { mutate } = useSWRConfig();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getDoctors();
        setDoctors(response.data);
      } catch (error) {
        message.error("Failed to fetch doctors");
      } finally {
        setLoading(false);
        mutate("/api/doctors");
      }
    };
    const fetchPatients = async () => {
      try {
        const response = await getPatients();
        setPatients(response.data);
      } catch (error) {
        message.error("Failed to fetch patients");
      } finally {
        setLoading(false);
        mutate("/api/patients");
      }
    };
    fetchPatients();
    fetchDoctors();
  }, []);

  return (
    <AppContext.Provider value={{ doctors, patients, loading, messageApi }}>
      {contextHolder}
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
