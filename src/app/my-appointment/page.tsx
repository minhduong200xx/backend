"use client";
import React, { useState, useEffect } from "react";
import { Table, message, Button } from "antd";
import { Appointment } from "../types/type";
import { useAuth } from "@/app/context/AuthProvider";
import Loading from "@/app/loading";
import {
  getPatientAppointments,
  cancelPatientAppointment,
} from "../lib/patients";

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

  const handleCancel = async (appointmentId: number) => {
    try {
      await cancelPatientAppointment(appointmentId);
      message.success("Appointment cancelled successfully.");
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.appointment_id === appointmentId
            ? { ...appointment, cancelled: true }
            : appointment
        )
      );
    } catch (error) {
      console.error("Error cancelling appointment:", error);
      message.error("Failed to cancel appointment.");
    }
  };

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
      render: (status: string) => (
        <span style={{ color: status === "Scheduled" ? "green" : "inherit" }}>
          {status}
        </span>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `$${amount.toFixed(2)}`,
    },
    {
      title: "Payment",
      dataIndex: "payment",
      key: "payment",
      render: (payment: boolean, record: Appointment) => (
        <span>
          {payment ? (
            "Paid"
          ) : (
            <Button type="link" onClick={() => handlePayOnline(record)}>
              Pay Online
            </Button>
          )}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Appointment) => (
        <Button
          type="link"
          danger
          onClick={() => handleCancel(record.appointment_id)}
          disabled={record.cancelled}
        >
          {record.cancelled ? "Cancelled" : "Cancel"}
        </Button>
      ),
    },
  ];

  const handlePayOnline = (record: Appointment) => {
    // Implement your payment logic here
    console.log("Paying online for appointment:", record);
  };

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
