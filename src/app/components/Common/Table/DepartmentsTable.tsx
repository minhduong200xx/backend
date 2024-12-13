/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Input, Form, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

import type { ColumnsType } from "antd/es/table";
import useDebounce from "@/app/hooks/useDebounce";
import DepartmentsModal from "../Modal/DepartmentsModal";
import { Department } from "@/app/types/type";

const { Search } = Input;

const DepartmentsTable: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  );
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 300);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    const response = await axios.get("/api/departments");
    setDepartments(response.data);
  };

  const handleAdd = () => {
    setEditingDepartment(null);
    setIsModalVisible(true);
  };

  const handleEdit = (record: Department) => {
    setEditingDepartment(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (department_id: number) => {
    await axios.delete(`/api/departments/${department_id}`);
    fetchDepartments();
  };

  const handleOk = async () => {
    const values = await form.validateFields().then((values) => values);
    if (editingDepartment) {
      await axios.put(
        `/api/departments/${editingDepartment.department_id}`,
        values
      );
    } else {
      await axios.post("/api/departments", values);
    }
    setIsModalVisible(false);
    fetchDepartments();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const columns: ColumnsType<Department> = [
    {
      title: "Department ID",
      dataIndex: "department_id",
      key: "department_id",
    },
    {
      title: "Department Name",
      dataIndex: "department_name",
      key: "department_name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: Department) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.department_id)}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const filteredData = departments.filter((department) => {
      const matchesSearchText =
        department.department_name
          .toLowerCase()
          .includes(debouncedSearchText.toLowerCase()) ||
        department.description
          ?.toLowerCase()
          .includes(debouncedSearchText.toLowerCase());

      return matchesSearchText;
    });
    setDepartments(filteredData);
  }, [debouncedSearchText]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Search
            placeholder="Search departments"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: 16, width: 300 }}
            enterButton
          />
        </div>
        <Button type="primary" style={{ marginBottom: 16 }} onClick={handleAdd}>
          Create New Department
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={departments}
        rowKey="department_id"
        pagination={{ pageSize: 6 }}
      />
      <DepartmentsModal
        open={isModalVisible}
        selectedDepartment={editingDepartment}
        onClose={handleCancel}
        onSave={handleOk}
        form={form}
      />
    </div>
  );
};

export default DepartmentsTable;
