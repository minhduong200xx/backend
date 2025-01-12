"use client";
import React, { useState, useEffect } from "react";
import { Table, Button, Input, Form, Space, Select, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import type { ColumnsType } from "antd/es/table";
import useDebounce from "@/hooks/useDebounce";
import StockTransactionsModal from "../Modal/StockTransactionsModal";
import type { StockTransaction } from "@/types/type";

const { Search } = Input;
const { Option } = Select;

const StockTransactionsTable: React.FC = () => {
  const [transactions, setTransactions] = useState<StockTransaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    StockTransaction[]
  >([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<StockTransaction | null>(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | undefined>(undefined);
  const debouncedSearchText = useDebounce(searchText, 300);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const response = await axios.get("/api/stock-transactions");
    setTransactions(response.data);
    setFilteredTransactions(response.data);
  };

  const handleAdd = () => {
    setEditingTransaction(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record: StockTransaction) => {
    setEditingTransaction(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (transaction_id: number) => {
    await axios.delete(`/api/stock-transactions/${transaction_id}`);
    fetchTransactions();
  };

  const handleOk = async () => {
    const values = await form.validateFields();
    if (editingTransaction) {
      await axios.put(
        `/api/stock-transactions/${editingTransaction.transaction_id}`,
        values
      );
    } else {
      await axios.post("/api/stock-transactions", values);
    }
    setIsModalVisible(false);
    form.resetFields();
    fetchTransactions();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  useEffect(() => {
    const filteredData = transactions.filter((transaction) => {
      const matchesSearchText =
        transaction.transaction_type
          .toLowerCase()
          .includes(debouncedSearchText.toLowerCase()) ||
        transaction.notes
          ?.toLowerCase()
          .includes(debouncedSearchText.toLowerCase());

      const matchesType = typeFilter
        ? transaction.transaction_type === typeFilter
        : true;

      return matchesSearchText && matchesType;
    });
    setFilteredTransactions(filteredData);
  }, [debouncedSearchText, typeFilter, transactions]);

  const columns: ColumnsType<StockTransaction> = [
    {
      title: "Transaction ID",
      dataIndex: "transaction_id",
      key: "transaction_id",
    },
    {
      title: "Transaction Date",
      dataIndex: "transaction_date",
      key: "transaction_date",
      render: (date: string) => new Date(date).toISOString().split("T")[0],
    },
    {
      title: "Transaction Type",
      dataIndex: "transaction_type",
      key: "transaction_type",
      render: (type: string) => (
        <Tag
          color={type === "IN" ? "green" : "blue"}
          style={{ width: 40, textAlign: "center" }}
        >
          {type === "IN" ? "In" : "Out"}
        </Tag>
      ),
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Notes",
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "Medicine ID",
      dataIndex: "medicine_id",
      key: "medicine_id",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: StockTransaction) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.transaction_id)}
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
            placeholder="Filter by Type"
            onChange={(value) => setTypeFilter(value)}
            allowClear
            style={{ width: 125 }}
          >
            <Option value="IN">In</Option>
            <Option value="OUT">Out</Option>
          </Select>
          <Search
            placeholder="Search transactions"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: 16, width: 300 }}
            enterButton
          />
        </div>
        <Button type="primary" style={{ marginBottom: 16 }} onClick={handleAdd}>
          Create New Transaction
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={filteredTransactions}
        rowKey="transaction_id"
        pagination={{ pageSize: 6 }}
        loading={transactions.length === 0}
      />
      <StockTransactionsModal
        visible={isModalVisible}
        selectedTransaction={editingTransaction}
        onClose={handleCancel}
        onSave={handleOk}
        form={form}
      />
    </div>
  );
};

export default StockTransactionsTable;
