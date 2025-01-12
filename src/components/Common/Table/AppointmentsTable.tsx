"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Input, Form, Space, Select, Tag } from "antd";
import axios from "axios";
import useSWR, { mutate } from "swr";
import useDebounce from "@/hooks/useDebounce";
import type { Appointment, Patient } from "@/types/type";
import { useAuth } from "@/context/AuthProvider";
import { useAppContext } from "@/context/AppProvider";
import { ColumnsType } from "antd/es/table";

const { Search } = Input;
const { Option } = Select;

interface AppointmentsTableProps {
  type: "doctor" | "admin";
}

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const AppointmentsTable: React.FC<AppointmentsTableProps> = ({ type }) => {
  const { user } = useAuth();

  const { messageApi } = useAppContext();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);
  const [form] = Form.useForm();

  const debouncedSearchText = useDebounce(searchText, 300);
  const url =
    type === "doctor"
      ? `/api/appointments/doctors/${user?.doctor_id}`
      : `/api/appointments`;
  const { data: appointments = [], error, isLoading } = useSWR(url, fetcher);

  const filteredAppointments = appointments.filter(
    (appointment: Appointment) => {
      const matchesSearchText =
        appointment.reason_for_visit
          ?.toLowerCase()
          .includes(debouncedSearchText.toLowerCase()) ||
        appointment.status
          .toLowerCase()
          .includes(debouncedSearchText.toLowerCase());

      const matchesStatus = statusFilter
        ? (statusFilter === "Completed" && appointment.isCompleted) ||
          (statusFilter === "Cancelled" && appointment.cancelled) ||
          (statusFilter === "Scheduled" &&
            !appointment.isCompleted &&
            !appointment.cancelled)
        : true;

      return matchesSearchText && matchesStatus;
    }
  );

  const handleAdd = () => {
    setEditingAppointment(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Appointment) => {
    setEditingAppointment(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (appointment_id: string) => {
    try {
      await axios.delete(`/api/appointments/${appointment_id}`);
      messageApi.success("Appointment deleted successfully");
      mutate(url); // Revalidate data
    } catch (error) {
      messageApi.error("Error deleting appointment");
    }
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    try {
      if (editingAppointment) {
        await axios.put(
          `/api/appointments/${editingAppointment.appointment_id}`,
          values
        );
        messageApi.success("Appointment updated successfully");
      } else {
        await axios.post("/api/appointments", values);
        messageApi.success("Appointment created successfully");
      }
      mutate(url); // Revalidate data
    } catch (error) {
      messageApi.error("Error saving appointment");
    } finally {
      setIsModalVisible(false);
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleCompleted = async (appointment_id: string) => {
    try {
      await axios.put(`/api/appointments/${appointment_id}`, {
        isCompleted: true,
      });
      messageApi.success("Appointment marked as completed");
      mutate(url); // Revalidate data
    } catch (error) {
      messageApi.error("Error marking appointment as completed");
    }
  };

  const handleCancelAppointment = async (appointment: Appointment) => {
    try {
      await axios.put(`/api/appointments/${appointment.appointment_id}`, {
        cancelled: true,
      });
      messageApi.success("Appointment cancelled successfully");
      mutate(url); // Revalidate data
    } catch (error) {
      messageApi.error("Error cancelling appointment");
    }
  };
  const adminColumns: ColumnsType<Appointment> = [
    {
      title: "Appointment ID",
      dataIndex: "appointment_id",
      key: "appointment_id",
    },
    {
      title: "Appointment Date",
      dataIndex: "appointment_date_time",
      key: "appointment_date_time",
      render: (date: string) => new Date(date).toISOString().split("T")[0],
    },
    {
      title: "Reason for Visit",
      dataIndex: "reason_for_visit",
      key: "reason_for_visit",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag
          color={
            status === "Scheduled"
              ? "blue"
              : status === "Completed"
              ? "green"
              : "red"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Patient Name",
      dataIndex: "patient_name",
      key: "patient_name",
    },
    {
      title: "Doctor Name",
      dataIndex: "doctor_name",
      key: "doctor_name",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: Appointment) => (
        <Space size="middle">
          <Button
            onClick={() => handleEdit(record)}
            disabled={record.isCompleted || record.cancelled}
          >
            Complete
          </Button>
          <Button
            onClick={() => handleDelete(record.appointment_id)}
            disabled={record.isCompleted || record.cancelled}
          >
            Cancel
          </Button>
        </Space>
      ),
    },
  ];

  const doctorColumns: ColumnsType<Appointment> = [
    {
      title: "Appointment ID",
      dataIndex: "appointment_id",
      key: "appointment_id",
    },
    {
      title: "Appointment Date",
      dataIndex: "appointment_date_time",
      key: "appointment_date_time",
      render: (date: string) => {
        const d = new Date(date);
        return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
          .toString()
          .padStart(2, "0")}/${d.getFullYear()}`;
      },
    },
    {
      title: "Reason for Visit",
      dataIndex: "reason_for_visit",
      key: "reason_for_visit",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string, record: Appointment) => (
        <Tag
          color={
            record.isCompleted ? "green" : record.cancelled ? "red" : "blue"
          }
        >
          {record.isCompleted
            ? "Completed"
            : record.cancelled
            ? "Cancelled"
            : "Scheduled"}
        </Tag>
      ),
    },
    {
      title: "Patient Name",
      dataIndex: "patient",
      key: "patient",
      render: (patient: Patient) => {
        return `${patient.first_name} ${patient.last_name}`;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: Appointment) => (
        <Space size="middle">
          <Button
            onClick={() => handleCompleted(record.appointment_id)}
            disabled={record.isCompleted || record.cancelled}
            style={{
              backgroundColor:
                record.isCompleted || record.cancelled ? "gray" : "green",
              color: "white",
            }}
          >
            Complete
          </Button>
          <Button
            onClick={() => handleCancelAppointment(record)}
            disabled={record.isCompleted || record.cancelled}
            style={{
              backgroundColor:
                record.isCompleted || record.cancelled ? "gray" : "red",
              color: "white",
            }}
          >
            Cancel
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Select
            placeholder="Filter by Status"
            onChange={(value) => setStatusFilter(value)}
            allowClear
            style={{ width: 135 }}
          >
            <Option value="Scheduled">Scheduled</Option>
            <Option value="Completed">Completed</Option>
            <Option value="Cancelled">Cancelled</Option>
          </Select>
          <Search
            placeholder="Search appointments"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: 16, width: 300 }}
            enterButton
          />
        </div>
        {type === "admin" && (
          <Button
            type="primary"
            style={{ marginBottom: 16 }}
            onClick={handleAdd}
          >
            Create New Appointment
          </Button>
        )}
      </div>
      <Table
        columns={type === "admin" ? adminColumns : doctorColumns}
        dataSource={filteredAppointments}
        rowKey="appointment_id"
        pagination={{ pageSize: 6 }}
        loading={isLoading}
      />
    </div>
  );
};

export default AppointmentsTable;
