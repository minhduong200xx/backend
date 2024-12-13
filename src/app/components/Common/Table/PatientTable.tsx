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
    dataIndex: "patient_id",
    key: "patient_id",
  },
  {
    title: "User ID",
    dataIndex: "user_id",
    key: "user_id",
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
    patient_id: 1,
    user_id: 1,
    first_name: "John",
    last_name: "Doe",
    date_of_birth: "1990-01-01",
    email: "john.doe@example.com",
    phone_number: "123-456-7890",
    gender: "Male",
    address: "123 Main St, Anytown, USA",
    emergency_contact: "Jane Doe - 987-654-3210",
    medical_history: "No known allergies. Previous surgery in 2015.",
    appointments: ["2023-01-01", "2023-02-01"],
  },
  {
    patient_id: 2,
    user_id: 2,
    first_name: "Jane",
    last_name: "Smith",
    date_of_birth: "1985-05-15",
    email: "jane.smith@example.com",
    phone_number: "987-654-3210",
    gender: "Female",
    address: "456 Elm St, Othertown, USA",
    emergency_contact: "John Smith - 123-456-7890",
    medical_history: "Allergic to penicillin. Asthma.",
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
        rowKey="patient_id"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        pagination={{ pageSize: 6 }}
      />
      <PatientProfileModal
        open={!!selectedPatient}
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
