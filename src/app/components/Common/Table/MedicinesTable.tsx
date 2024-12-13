"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Input, Form, Space, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import type { ColumnsType } from "antd/es/table";
import useDebounce from "@/app/hooks/useDebounce";
import MedicinesDescModal from "../Modal/MedicinesDescModal";
import type { Medicine } from "@/app/types/type";

const { Search } = Input;
const { Option } = Select;

const MedicinesTable: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [filteredMedicines, setFilteredMedicines] = useState<Medicine[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [expirationFilter, setExpirationFilter] = useState<string | undefined>(
    undefined
  );
  const debouncedSearchText = useDebounce(searchText, 300);

  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    const response = await axios.get("/api/medicines");
    setMedicines(response.data);
    setFilteredMedicines(response.data);
  };

  const handleAdd = () => {
    setEditingMedicine(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Medicine) => {
    setEditingMedicine(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (medicine_id: number) => {
    await axios.delete(`/api/medicines/${medicine_id}`);
    fetchMedicines();
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    if (editingMedicine) {
      await axios.put(`/api/medicines/${editingMedicine.medicine_id}`, values);
    } else {
      await axios.post("/api/medicines", values);
    }
    setIsModalVisible(false);
    form.resetFields();
    fetchMedicines();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    const filteredData = medicines.filter((medicine) => {
      const matchesSearchText =
        medicine.medicine_name
          .toLowerCase()
          .includes(debouncedSearchText.toLowerCase()) ||
        medicine.description
          ?.toLowerCase()
          .includes(debouncedSearchText.toLowerCase());

      const matchesExpiration = expirationFilter
        ? expirationFilter === "incoming"
          ? new Date(medicine.expiration_date!) > new Date() &&
            new Date(medicine.expiration_date!) <
              new Date(new Date().setMonth(new Date().getMonth() + 1))
          : expirationFilter === "expired"
          ? new Date(medicine.expiration_date!) < new Date()
          : true
        : true;

      return matchesSearchText && matchesExpiration;
    });
    setFilteredMedicines(filteredData);
  }, [debouncedSearchText, expirationFilter, medicines]);

  const columns: ColumnsType<Medicine> = [
    {
      title: "Medicine ID",
      dataIndex: "medicine_id",
      key: "medicine_id",
    },
    {
      title: "Medicine Name",
      dataIndex: "medicine_name",
      key: "medicine_name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Quantity in Stock",
      dataIndex: "quantity_in_stock",
      key: "quantity_in_stock",
    },
    {
      title: "Price per Unit",
      dataIndex: "price_per_unit",
      key: "price_per_unit",
    },
    {
      title: "Expiration Date",
      dataIndex: "expiration_date",
      key: "expiration_date",
      render: (date: string) => new Date(date).toISOString().split("T")[0],
    },
    {
      title: "Supplier ID",
      dataIndex: "supplier_id",
      key: "supplier_id",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: Medicine) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.medicine_id)}
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
            placeholder="Filter by Expiration"
            onChange={(value) => setExpirationFilter(value)}
            allowClear
            style={{ width: 200 }}
          >
            <Option value="incoming">Incoming Expire</Option>
            <Option value="expired">Expired</Option>
          </Select>
          <Search
            placeholder="Search medicines"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: 16, width: 300 }}
            enterButton
          />
        </div>
        <Button type="primary" style={{ marginBottom: 16 }} onClick={handleAdd}>
          Create New Medicine
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredMedicines}
        rowKey="medicine_id"
        pagination={{ pageSize: 6 }}
        loading={medicines.length === 0}
      />
      <MedicinesDescModal
        visible={isModalVisible}
        selectedMedicine={editingMedicine}
        onClose={handleCancel}
        onSave={handleOk}
        form={form}
      />
    </div>
  );
};

export default MedicinesTable;
