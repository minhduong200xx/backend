"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Input, Form, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import type { ColumnsType } from "antd/es/table";
import useDebounce from "@/app/hooks/useDebounce";
import SupplierModal from "../Modal/SupplierModal";
import type { Supplier } from "@/app/types/type";

const { Search } = Input;

const SupplierTable: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 300);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    const response = await axios.get("/api/suppliers");
    setSuppliers(response.data);
    setFilteredSuppliers(response.data);
  };

  const handleAdd = () => {
    setEditingSupplier(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: Supplier) => {
    setEditingSupplier(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (supplier_id: number) => {
    await axios.delete(`/api/suppliers/${supplier_id}`);
    fetchSuppliers();
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    if (editingSupplier) {
      await axios.put(`/api/suppliers/${editingSupplier.supplier_id}`, values);
    } else {
      await axios.post("/api/suppliers", values);
    }
    setIsModalVisible(false);
    form.resetFields();
    fetchSuppliers();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    const filteredData = suppliers.filter((supplier) => {
      const matchesSearchText =
        supplier.supplier_name
          .toLowerCase()
          .includes(debouncedSearchText.toLowerCase()) ||
        supplier.contact_person
          ?.toLowerCase()
          .includes(debouncedSearchText.toLowerCase()) ||
        supplier.email
          ?.toLowerCase()
          .includes(debouncedSearchText.toLowerCase());

      return matchesSearchText;
    });
    setFilteredSuppliers(filteredData);
  }, [debouncedSearchText, suppliers]);

  const columns: ColumnsType<Supplier> = [
    {
      title: "Supplier ID",
      dataIndex: "supplier_id",
      key: "supplier_id",
    },
    {
      title: "Supplier Name",
      dataIndex: "supplier_name",
      key: "supplier_name",
    },
    {
      title: "Contact Person",
      dataIndex: "contact_person",
      key: "contact_person",
    },
    {
      title: "Phone Number",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: Supplier) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.supplier_id)}
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
            placeholder="Search suppliers"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: 16, width: 300 }}
            enterButton
          />
        </div>
        <Button type="primary" style={{ marginBottom: 16 }} onClick={handleAdd}>
          Create New Supplier
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredSuppliers}
        rowKey="supplier_id"
        pagination={{ pageSize: 6 }}
        loading={suppliers.length === 0}
      />
      <SupplierModal
        open={isModalVisible}
        selectedSupplier={editingSupplier}
        onClose={handleCancel}
        onSave={handleOk}
        form={form}
      />
    </div>
  );
};

export default SupplierTable;
