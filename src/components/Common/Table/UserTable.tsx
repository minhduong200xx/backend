"use client";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Input, Menu, Select, Table, Tag, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useDebounce from "@/hooks/useDebounce";
import { User } from "@/types/type";

const { Search } = Input;
const { Option } = Select;

const roleMapping: { [key: number]: string } = {
  1: "Admin",
  2: "User",
  3: "Doctor",
  4: "Patient",
};
const handleChangeStatus = (record: User) => {
  // Implement change status logic here
};

const handleEdit = (record: User) => {
  console.log("Edit user:", record);
};

const handleDelete = (record: User) => {
  // Implement delete logic here
};
const columns: ColumnsType<User> = [
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
    title: "User Name",
    dataIndex: "user_name",
    key: "user_name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role_id",
    key: "role",
    render: (role_id: number) => roleMapping[role_id],
  },
  {
    title: "Created At",
    dataIndex: "created_at",
    key: "created_at",
  },
  {
    title: "Updated At",
    dataIndex: "updated_at",
    key: "updated_at",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: boolean, record: User) => (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key="1">
              <span
                onClick={() => handleChangeStatus(record)}
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: status ? "red" : "green",
                }}
              >
                {status ? "Inactive" : "Active"}
              </span>
            </Menu.Item>
          </Menu>
        }
        trigger={["contextMenu"]}
      >
        <Tag
          style={{ width: 60, textAlign: "center", fontWeight: "bold" }}
          color={status ? "green" : "red"}
        >
          {status ? "Active" : "Inactive"}
        </Tag>
      </Dropdown>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    render: (record: User) => (
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

import { v4 as uuidv4 } from "uuid";

const initialData: User[] = [
  {
    user_id: "69208d3c-8d58-44b9-ad74-0fbaa30abbc5",
    first_name: "John",
    last_name: "Doe",
    user_name: "johndoe",
    email: "john.doe@example.com",
    role_id: 1,
    created_at: "2023-01-01",
    updated_at: "2023-01-02",
    status: true,
  },
  {
    user_id: "2ce3a9d6-230a-4d23-bb8c-d56edc4c6817",
    first_name: "Joe",
    last_name: "Doe",
    user_name: "joedoe",
    email: "joe.doe@example.com",
    role_id: 1,
    created_at: "2023-01-01",
    updated_at: "2023-01-02",
    status: false,
  },
  // Add more user data here
  {
    user_id: "c97a60d3-b9b5-4b36-8ec0-be45f1ac62c1",
    first_name: "Jane",
    last_name: "Smith",
    user_name: "janesmith",
    email: "jane.smith@example.com",
    role_id: 2,
    created_at: "2023-02-01",
    updated_at: "2023-02-02",
    status: true,
  },
  {
    user_id: "d4924850-8f5d-408d-b271-921ec3b32f19",
    first_name: "Alice",
    last_name: "Johnson",
    user_name: "alicejohnson",
    email: "alice.johnson@example.com",
    role_id: 2,
    created_at: "2023-03-01",
    updated_at: "2023-03-02",
    status: false,
  },
  {
    user_id: "f1d0104a-d541-4327-9f61-3b5f6044355f",
    first_name: "Bob",
    last_name: "Brown",
    user_name: "bobbrown",
    email: "bob.brown@example.com",
    role_id: 3,
    created_at: "2023-04-01",
    updated_at: "2023-04-02",
    status: true,
  },
];

const UserTable: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState<number | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<boolean | undefined>(
    undefined
  );
  const debouncedSearchText = useDebounce(searchText, 300);

  useEffect(() => {
    const filteredData = initialData.filter((user) => {
      const matchesSearchText =
        user.first_name
          ?.toLowerCase()
          .includes(debouncedSearchText.toLowerCase()) ||
        user.last_name
          ?.toLowerCase()
          .includes(debouncedSearchText.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedSearchText.toLowerCase());

      const matchesRole =
        roleFilter !== undefined ? user.role_id === roleFilter : true;
      const matchesStatus =
        statusFilter !== undefined ? user.status === statusFilter : true;

      return matchesSearchText && matchesRole && matchesStatus;
    });
    setData(filteredData);
  }, [debouncedSearchText, roleFilter, statusFilter]);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <Select
            placeholder="Filter by Role"
            onChange={(value) => setRoleFilter(value)}
            allowClear
            style={{ width: "fit-content" }}
          >
            <Option value={1}>Admin</Option>
            <Option value={2}>User</Option>
            <Option value={3}>Doctor</Option>
            <Option value={4}>Patient</Option>
          </Select>
          <Select
            placeholder="Filter by Status"
            onChange={(value) => setStatusFilter(value)}
            allowClear
            style={{ width: "fit-content" }}
          >
            <Option value={true}>Active</Option>
            <Option value={false}>Inactive</Option>
          </Select>
          <Search
            placeholder="Search users"
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBottom: 16, width: 300 }}
            enterButton
          />
        </div>
        <Button type="primary" style={{ marginBottom: 16 }}>
          Create New User
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        rowKey="user_id"
        pagination={{ pageSize: 6 }}
      />
    </div>
  );
};

export default UserTable;
