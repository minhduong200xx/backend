"use client";
import React, { useState, useEffect } from "react";
import { Table, message } from "antd";

import { Appointment } from "../types/type";
import { useAuth } from "@/app/context/AuthProvider";
import Loading from "@/app/loading";
import { getPatientAppointments } from "../lib/patients";

const MyAppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAppointments = async () => {
      if (user?.patient_id) {
        try {
          const response = await getPatientAppointments(user.patient_id);
          setAppointments(response.data);
        } catch (error) {
          console.error("Error fetching appointments:", error);
          message.error("Failed to fetch appointments.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAppointments();
  }, [user?.patient_id]);

  if (loading) {
    return <Loading />;
  }

  const columns = [
    {
      title: "Date",
      dataIndex: "appointment_date_time",
      key: "appointment_date_time",
      render: (text: string) => new Date(text).toLocaleString(),
    },

    {
      title: "Reason",
      dataIndex: "reason_for_visit",
      key: "reason_for_visit",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">My Appointments</h1>
      <Table
        dataSource={appointments}
        columns={columns}
        rowKey="appointment_id"
      />
    </div>
  );
};

export default MyAppointmentsPage;
