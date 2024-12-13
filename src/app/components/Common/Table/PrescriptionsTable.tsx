"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Input, Form, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import type { ColumnsType } from "antd/es/table";
import useDebounce from "@/app/hooks/useDebounce";
import PrescriptionsModal from "../Modal/PrescriptionsModal";
import type { Prescription } from "@/app/types/type";

const { Search } = Input;

const PrescriptionsTable: React.FC = () => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [filteredPrescriptions, setFilteredPrescriptions] = useState<
    Prescription[]
  >([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPrescription, setEditingPrescription] =
    useState<Prescription | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 300);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    const response = await axios.get("/api/prescriptions");
    setPrescriptions(response.data);
    setFilteredPrescriptions(response.data);
  };

  const handleAdd = () => {
    setEditingPrescription(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Prescription) => {
    setEditingPrescription(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (prescription_id: number) => {
    await axios.delete(`/api/prescriptions/${prescription_id}`);
    fetchPrescriptions();
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    if (editingPrescription) {
      await axios.put(
        `/api/prescriptions/${editingPrescription.prescription_id}`,
        values
      );
    } else {
      await axios.post("/api/prescriptions", values);
    }
    setIsModalVisible(false);
    form.resetFields();
    fetchPrescriptions();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    const filteredData = prescriptions.filter((prescription) => {
      const matchesSearchText =
        prescription.medicine_name
          ?.toLowerCase()
          .includes(debouncedSearchText.toLowerCase()) ||
        prescription.dosage
          ?.toLowerCase()
          .includes(debouncedSearchText.toLowerCase()) ||
        prescription.duration
          ?.toLowerCase()
          .includes(debouncedSearchText.toLowerCase());

      return matchesSearchText;
    });
    setFilteredPrescriptions(filteredData);
  }, [debouncedSearchText, prescriptions]);

  const columns: ColumnsType<Prescription> = [
    {
      title: "Prescription ID",
      dataIndex: "prescription_id",
      key: "prescription_id",
    },
    {
      title: "Medicine Name",
      dataIndex: "medicine_name",
      key: "medicine_name",
    },
    {
      title: "Dosage",
      dataIndex: "dosage",
      key: "dosage",
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
    },
    {
      title: "Record ID",
      dataIndex: "record_id",
      key: "record_id",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: Prescription) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.prescription_id)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Search
            placeholder="Search prescriptions"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: 16, width: 300 }}
            enterButton
          />
        </div>
        <Button type="primary" style={{ marginBottom: 16 }} onClick={handleAdd}>
          Create New Prescription
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredPrescriptions}
        rowKey="prescription_id"
        pagination={{ pageSize: 6 }}
        loading={prescriptions.length === 0}
      />
      <PrescriptionsModal
        open={isModalVisible}
        selectedPrescription={editingPrescription}
        onClose={handleCancel}
        onSave={handleOk}
        form={form}
      />
    </div>
  );
};

export default PrescriptionsTable;
