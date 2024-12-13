"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Input, Form, Space, Select, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import type { ColumnsType } from "antd/es/table";
import useDebounce from "@/app/hooks/useDebounce";
import AppointmentsModal from "../Modal/AppointmentsModal";
import type { Appointment } from "@/app/types/type";

const { Search } = Input;
const { Option } = Select;

const AppointmentsTable: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<
    Appointment[]
  >([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | undefined>(
    undefined
  );
  const debouncedSearchText = useDebounce(searchText, 300);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const response = await axios.get("/api/appointments");
    setAppointments(response.data);
    setFilteredAppointments(response.data);
  };

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

  const handleDelete = async (appointment_id: number) => {
    await axios.delete(`/api/appointments/${appointment_id}`);
    fetchAppointments();
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    if (editingAppointment) {
      await axios.put(
        `/api/appointments/${editingAppointment.appointment_id}`,
        values
      );
    } else {
      await axios.post("/api/appointments", values);
    }
    setIsModalVisible(false);
    form.resetFields();
    fetchAppointments();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    const filteredData = appointments.filter((appointment) => {
      const matchesSearchText =
        appointment.reason_for_visit
          ?.toLowerCase()
          .includes(debouncedSearchText.toLowerCase()) ||
        appointment.status
          .toLowerCase()
          .includes(debouncedSearchText.toLowerCase());

      const matchesStatus = statusFilter
        ? appointment.status === statusFilter
        : true;

      return matchesSearchText && matchesStatus;
    });
    setFilteredAppointments(filteredData);
  }, [debouncedSearchText, statusFilter, appointments]);

  const columns: ColumnsType<Appointment> = [
    {
      title: "Appointment ID",
      dataIndex: "appointment_id",
      key: "appointment_id",
    },
    {
      title: "Appointment Date",
      dataIndex: "appointment_date",
      key: "appointment_date",
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
      title: "Patient ID",
      dataIndex: "patient_id",
      key: "patient_id",
    },
    {
      title: "Doctor ID",
      dataIndex: "doctor_id",
      key: "doctor_id",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: Appointment) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.appointment_id)}
          />
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
        <Button type="primary" style={{ marginBottom: 16 }} onClick={handleAdd}>
          Create New Appointment
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredAppointments}
        rowKey="appointment_id"
        pagination={{ pageSize: 6 }}
        loading={appointments.length === 0}
      />
      <AppointmentsModal
        visible={isModalVisible}
        selectedAppointment={editingAppointment}
        onClose={handleCancel}
        onSave={handleOk}
        form={form}
      />
    </div>
  );
};

export default AppointmentsTable;
