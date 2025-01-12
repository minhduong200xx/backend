"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import useDebounce from "@/hooks/useDebounce";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import PatientProfileModal from "../Modal/PatientProfileModal";
import { Appointment, Patient } from "@/types/type";
import { useAuth } from "@/context/AuthProvider";
import useSWR from "swr";
import axios from "axios";

const { Search } = Input;
const adminColumns: ColumnsType<Patient> = [
  {
    title: "Patient ID",
    dataIndex: "patient_id",
    key: "patient_id",
  },
  {
    title: "First Name",
    dataIndex: "first_name",
    key: "first_name",
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Date of Birth",
    dataIndex: "date_of_birth",
    key: "date_of_birth",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone_number",
    key: "phone_number",
  },
];
const doctorColumns: ColumnsType<Patient> = [
  {
    title: "No.",
    key: "index",
    dataIndex: "index",
    render: (_: any, __: Patient, index: number) => index + 1,
  },
  {
    title: "First Name",
    dataIndex: "first_name",
    key: "first_name",
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Date of Birth",
    dataIndex: "date_of_birth",
    key: "date_of_birth",
    render: (date: string) => {
      const d = new Date(date);
      return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${d.getFullYear()}`;
    },
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone_number",
    key: "phone_number",
  },
  {
    title: "Gender",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "Actions",
    key: "actions",
    render: (record: Patient) => (
      <div className="flex flex-row gap-1">
        <Button type="link" onClick={() => handleEdit(record)}>
          <EditOutlined />
        </Button>
        <Button type="link" onClick={() => handleDelete(record)} color="danger">
          <DeleteOutlined />
        </Button>
      </div>
    ),
  },
];

const handleEdit = (record: Patient) => {
  console.log("Edit", record);
  // Implement edit logic here
};

const handleDelete = (record: Patient) => {
  console.log("Delete", record);
  // Implement delete logic here
};

interface PatientTableProps {
  type: "doctor" | "admin";
}
const fetcher = (url: string) => axios.get(url).then((res) => res.data);
const PatientTable: React.FC<PatientTableProps> = ({ type }) => {
  const { user } = useAuth();
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 300);
  const url =
    type === "doctor"
      ? `/api/appointments/doctors/${user?.doctor_id}`
      : `/api/patients`;

  const { data: appointments = [], error, isLoading } = useSWR(url, fetcher);
  const patients =
    type === "doctor"
      ? appointments.reduce((acc: Patient[], appointment: Appointment) => {
          if (!acc.find((p) => p.patient_id === appointment.patient_id)) {
            acc.push(appointment.patient);
          }
          return acc;
        }, [])
      : appointments;

  useEffect(() => {
    const filteredData = patients.filter((patient: Patient) => {
      const matchesSearchText =
        patient.first_name
          .toLowerCase()
          .includes(debouncedSearchText.toLowerCase()) ||
        patient.last_name
          .toLowerCase()
          .includes(debouncedSearchText.toLowerCase()) ||
        (patient.email ?? "")
          .toLowerCase()
          .includes(debouncedSearchText.toLowerCase());

      return matchesSearchText;
    });
  }, [debouncedSearchText]);

  const handleRowClick = (record: Patient) => {
    setSelectedPatient(record);
  };

  const handleCloseModal = () => {
    setSelectedPatient(null);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Search
            placeholder="Search patients"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: 16, width: 300 }}
            enterButton
          />
        </div>
        <Button type="primary" style={{ marginBottom: 16 }}>
          Create New Patient Record
        </Button>
      </div>
      <Table
        columns={type === "doctor" ? doctorColumns : adminColumns}
        dataSource={patients}
        // Use the generated unique key
        rowKey={type === "doctor" ? "index" : "patient_id"}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        pagination={{ pageSize: 6 }}
        loading={isLoading}
      />

      <PatientProfileModal
        type={type}
        open={!!selectedPatient}
        selectedPatient={selectedPatient}
        onClose={handleCloseModal}
        appointments={appointments.filter(
          (a: Appointment) => a.patient_id === selectedPatient?.patient_id
        )}
        onSave={(updatedPatient) => {
          console.log("Save", updatedPatient);
          // Implement save logic here
        }}
      />
    </div>
  );
};

export default PatientTable;
