"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Input, Select, Form, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import type { ColumnsType } from "antd/es/table";
import useDebounce from "@/app/hooks/useDebounce";
import DoctorProfileModal from "../Modal/DoctorProfileModal";
import { Doctor } from "@/app/types/type";

const { Search } = Input;
const { Option } = Select;

const DoctorTable: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState<string | undefined>(
    undefined
  );
  const [experienceFilter, setExperienceFilter] = useState<number | undefined>(
    undefined
  );
  const debouncedSearchText = useDebounce(searchText, 300);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const response = await axios.get("/api/doctors");
    setDoctors(response.data);
  };

  const handleAdd = () => {
    setEditingDoctor(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record: Doctor) => {
    setEditingDoctor(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (doctor_id: number) => {
    await axios.delete(`/api/doctors/${doctor_id}`);
    fetchDoctors();
  };

  const handleOk = async () => {
    const { age, ...restValues } = await form
      .validateFields()
      .then((values) => values);
    if (editingDoctor) {
      await axios.put(`/api/doctors/${editingDoctor.doctor_id}`, restValues);
    } else {
      await axios.post("/api/doctors", restValues);
    }
    setIsModalVisible(false);
    fetchDoctors();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    fetchDoctors();
    form.resetFields();
  };

  const columns: ColumnsType<Doctor> = [
    {
      title: "Doctor ID",
      dataIndex: "doctor_id",
      key: "doctor_id",
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
      title: "Specialty",
      dataIndex: "specialty",
      key: "specialty",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Experience Years",
      dataIndex: "experience_years",
      key: "experience_years",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: Doctor) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.doctor_id)}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const filteredData = doctors.filter((doctor) => {
      const matchesSearchText =
        doctor.first_name
          .toLowerCase()
          .includes(debouncedSearchText.toLowerCase()) ||
        doctor.last_name
          .toLowerCase()
          .includes(debouncedSearchText.toLowerCase()) ||
        doctor.email?.toLowerCase().includes(debouncedSearchText.toLowerCase());

      const matchesSpecialty = specialtyFilter
        ? doctor.specialty === specialtyFilter
        : true;
      const matchesExperience = experienceFilter
        ? doctor.experience_years! >= experienceFilter
        : true;

      return matchesSearchText && matchesSpecialty && matchesExperience;
    });
    setDoctors(filteredData);
  }, [debouncedSearchText, specialtyFilter, experienceFilter]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Select
            placeholder="Filter by Specialty"
            onChange={(value) => setSpecialtyFilter(value)}
            allowClear
            style={{ width: "fit-content" }}
          >
            <Option value="Cardiology">Cardiology</Option>
            <Option value="Dermatology">Dermatology</Option>
            <Option value="Neurology">Neurology</Option>
            <Option value="Pediatrics">Pediatrics</Option>
          </Select>

          <Select
            placeholder="Filter by Experience Years"
            onChange={(value) => setExperienceFilter(value)}
            allowClear
            style={{ width: "fit-content" }}
          >
            <Option value={5}>More than 5 years</Option>
            <Option value={10}>More than 10 years</Option>
            <Option value={15}>More than 15 years</Option>
          </Select>
          <Search
            placeholder="Search doctors"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: 16, width: 300 }}
            enterButton
          />
        </div>
        <Button type="primary" style={{ marginBottom: 16 }} onClick={handleAdd}>
          Create New Doctor
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={doctors}
        rowKey="doctor_id"
        pagination={{ pageSize: 6 }}
        loading={doctors.length === 0}
      />
      <DoctorProfileModal
        open={isModalVisible}
        selectedDoctor={editingDoctor}
        onClose={handleCancel}
        onSave={handleOk}
        form={form}
      />
    </div>
  );
};

export default DoctorTable;
