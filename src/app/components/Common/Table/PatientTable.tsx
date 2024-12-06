"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import useDebounce from "@/app/hooks/useDebounce";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import PatientProfileModal from "../Modal/PatientProfileModal";
import { Patient } from "@/app/types/type";

const { Search } = Input;

const columns: ColumnsType<Patient> = [
  {
    title: "Patient ID",
    dataIndex: "patientId",
    key: "patientId",
  },
  {
    title: "User ID",
    dataIndex: "userId",
    key: "userId",
  },
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName",
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName",
  },
  {
    title: "Date of Birth",
    dataIndex: "dateOfBirth",
    key: "dateOfBirth",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
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

const initialData: Patient[] = [
  {
    patientId: "1",
    userId: "1",
    firstName: "John",
    lastName: "Doe",
    dateOfBirth: "1990-01-01",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    gender: "Male",
    address: "123 Main St, Anytown, USA",
    emergencyContact: "Jane Doe - 987-654-3210",
    medicalHistory: "No known allergies. Previous surgery in 2015.",
    appointments: ["2023-01-01", "2023-02-01"],
  },
  {
    patientId: "2",
    userId: "2",
    firstName: "Jane",
    lastName: "Smith",
    dateOfBirth: "1985-05-15",
    email: "jane.smith@example.com",
    phone: "987-654-3210",
    gender: "Female",
    address: "456 Elm St, Othertown, USA",
    emergencyContact: "John Smith - 123-456-7890",
    medicalHistory: "Allergic to penicillin. Asthma.",
    appointments: ["2023-03-01", "2023-04-01"],
  },
  // Add more patient data here
];

const handleEdit = (record: Patient) => {
  console.log("Edit", record);
  // Implement edit logic here
};

const handleDelete = (record: Patient) => {
  console.log("Delete", record);
  // Implement delete logic here
};

const PatientTable: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 300);

  useEffect(() => {
    const filteredData = initialData.filter((patient) => {
      const matchesSearchText =
        patient.firstName
          .toLowerCase()
          .includes(debouncedSearchText.toLowerCase()) ||
        patient.lastName
          .toLowerCase()
          .includes(debouncedSearchText.toLowerCase()) ||
        patient.email.toLowerCase().includes(debouncedSearchText.toLowerCase());

      return matchesSearchText;
    });
    setData(filteredData);
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
          Create New Patient
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="patientId"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        pagination={{ pageSize: 6 }}
      />
      <PatientProfileModal
        visible={!!selectedPatient}
        selectedPatient={selectedPatient}
        onClose={handleCloseModal}
        onSave={(updatedPatient) => {
          console.log("Save", updatedPatient);
          // Implement save logic here
        }}
      />
    </div>
  );
};

export default PatientTable;
