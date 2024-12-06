"use client";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Input, Menu, Select, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import useDebounce from "@/app/hooks/useDebounce";
import { User } from "@/app/types/type";
const { Search } = Input;
const { Option } = Select;

const columns: ColumnsType<User> = [
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
    title: "User Name",
    dataIndex: "userName",
    key: "userName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Created At",
    dataIndex: "createdAt",
    key: "createdAt",
  },
  {
    title: "Updated At",
    dataIndex: "updatedAt",
    key: "updatedAt",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (record: User) => (
      <Dropdown
        overlay={
          <Menu>
            <Menu.Item key="1">
              <span
                onClick={() => handleChangeStatus(record)}
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  color: record.status ? "red" : "green",
                }}
              >
                {record.status ? "Inactive" : "Active"}
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

const initialData: User[] = [
  {
    userId: "1",
    firstName: "John",
    lastName: "Doe",
    userName: "johndoe",
    email: "john.doe@example.com",
    role: "Admin",
    createdAt: "2023-01-01",
    updatedAt: "2023-01-02",
    status: true,
  },
  {
    userId: "2",
    firstName: "Joe",
    lastName: "Doe",
    userName: "johndoe",
    email: "john.doe@example.com",
    role: "Admin",
    createdAt: "2023-01-01",
    updatedAt: "2023-01-02",
    status: false,
  },
  // Add more user data here
  {
    userId: "3",
    firstName: "Jane",
    lastName: "Smith",
    userName: "janesmith",
    email: "jane.smith@example.com",
    role: "User",
    createdAt: "2023-02-01",
    updatedAt: "2023-02-02",
    status: true,
  },
  {
    userId: "4",
    firstName: "Alice",
    lastName: "Johnson",
    userName: "alicejohnson",
    email: "alice.johnson@example.com",
    role: "User",
    createdAt: "2023-03-01",
    updatedAt: "2023-03-02",
    status: false,
  },
  {
    userId: "5",
    firstName: "Bob",
    lastName: "Brown",
    userName: "bobbrown",
    email: "bob.brown@example.com",
    role: "Moderator",
    createdAt: "2023-04-01",
    updatedAt: "2023-04-02",
    status: true,
  },
  {
    userId: "6",
    firstName: "Charlie",
    lastName: "Davis",
    userName: "charliedavis",
    email: "charlie.davis@example.com",
    role: "User",
    createdAt: "2023-05-01",
    updatedAt: "2023-05-02",
    status: false,
  },
  {
    userId: "7",
    firstName: "Diana",
    lastName: "Evans",
    userName: "dianaevans",
    email: "diana.evans@example.com",
    role: "Admin",
    createdAt: "2023-06-01",
    updatedAt: "2023-06-02",
    status: true,
  },
  {
    userId: "8",
    firstName: "Eve",
    lastName: "Foster",
    userName: "evefoster",
    email: "eve.foster@example.com",
    role: "Moderator",
    createdAt: "2023-07-01",
    updatedAt: "2023-07-02",
    status: true,
  },
  {
    userId: "9",
    firstName: "Frank",
    lastName: "Green",
    userName: "frankgreen",
    email: "frank.green@example.com",
    role: "User",
    createdAt: "2023-08-01",
    updatedAt: "2023-08-02",
    status: false,
  },
  {
    userId: "10",
    firstName: "Grace",
    lastName: "Harris",
    userName: "graceharris",
    email: "grace.harris@example.com",
    role: "Admin",
    createdAt: "2023-09-01",
    updatedAt: "2023-09-02",
    status: true,
  },
  {
    userId: "11",
    firstName: "Hank",
    lastName: "Ivy",
    userName: "hankivy",
    email: "hank.ivy@example.com",
    role: "User",
    createdAt: "2023-10-01",
    updatedAt: "2023-10-02",
    status: true,
  },
  {
    userId: "12",
    firstName: "Ivy",
    lastName: "Jones",
    userName: "ivyjones",
    email: "ivy.jones@example.com",
    role: "Moderator",
    createdAt: "2023-11-01",
    updatedAt: "2023-11-02",
    status: false,
  },
  {
    userId: "13",
    firstName: "Jack",
    lastName: "King",
    userName: "jackking",
    email: "jack.king@example.com",
    role: "Admin",
    createdAt: "2023-12-01",
    updatedAt: "2023-12-02",
    status: true,
  },
  {
    userId: "14",
    firstName: "Karen",
    lastName: "Lee",
    userName: "karenlee",
    email: "karen.lee@example.com",
    role: "User",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-02",
    status: false,
  },
  {
    userId: "15",
    firstName: "Leo",
    lastName: "Miller",
    userName: "leomiller",
    email: "leo.miller@example.com",
    role: "Moderator",
    createdAt: "2024-02-01",
    updatedAt: "2024-02-02",
    status: true,
  },
  {
    userId: "16",
    firstName: "Mia",
    lastName: "Nelson",
    userName: "mianelson",
    email: "mia.nelson@example.com",
    role: "Admin",
    createdAt: "2024-03-01",
    updatedAt: "2024-03-02",
    status: false,
  },
  {
    userId: "17",
    firstName: "Nina",
    lastName: "Olsen",
    userName: "ninaolsen",
    email: "nina.olsen@example.com",
    role: "User",
    createdAt: "2024-04-01",
    updatedAt: "2024-04-02",
    status: true,
  },
  {
    userId: "18",
    firstName: "Oscar",
    lastName: "Parker",
    userName: "oscarparker",
    email: "oscar.parker@example.com",
    role: "Moderator",
    createdAt: "2024-05-01",
    updatedAt: "2024-05-02",
    status: false,
  },
  {
    userId: "19",
    firstName: "Paul",
    lastName: "Quinn",
    userName: "paulquinn",
    email: "paul.quinn@example.com",
    role: "Admin",
    createdAt: "2024-06-01",
    updatedAt: "2024-06-02",
    status: true,
  },
  {
    userId: "20",
    firstName: "Quincy",
    lastName: "Reed",
    userName: "quincyreed",
    email: "quincy.reed@example.com",
    role: "User",
    createdAt: "2024-07-01",
    updatedAt: "2024-07-02",
    status: false,
  },
];
const handleChangeStatus = (record: User) => {
  console.log("Change Status", record);
  // Implement change status logic here
  const updatedData = initialData.map((user) => {
    if (user.userId === record.userId) {
      return { ...user, status: !user.status };
    }
    return user;
  });
  console.log("Updated Data", updatedData);
  // You might want to update the state or make an API call here to persist the changes
};

const handleEdit = (record: User) => {
  console.log("Edit", record);
  // Implement edit logic here
};

const handleDelete = (record: User) => {
  console.log("Delete", record);
  // Implement delete logic here
};
const UserTable: React.FC = () => {
  const [data, setData] = useState(initialData);
  const [searchText, setSearchText] = useState("");
  const [roleFilter, setRoleFilter] = useState<string | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<boolean | undefined>(
    undefined
  );
  const debouncedSearchText = useDebounce(searchText, 300);

  useEffect(() => {
    const filteredData = initialData.filter((user) => {
      const matchesSearchText =
        user.firstName
          .toLowerCase()
          .includes(debouncedSearchText.toLowerCase()) ||
        user.lastName
          .toLowerCase()
          .includes(debouncedSearchText.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedSearchText.toLowerCase());

      const matchesRole = roleFilter ? user.role === roleFilter : true;
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
            <Option value="Admin">Admin</Option>
            <Option value="User">User</Option>
            <Option value="Doctor">Doctor</Option>
            <Option value="Patient">Patient</Option>
          </Select>
          <Select
            placeholder="Filter by Status"
            onChange={(value) => setStatusFilter(value)}
            allowClear
            style={{ width: "fit-content" }}
          >
            <Option value={true}>
              <p className="text-green-600">Active</p>
            </Option>
            <Option value={false}>
              <p className="text-red-600">Inactive</p>
            </Option>
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
        rowKey="userId"
        pagination={{ pageSize: 6 }}
      />
    </div>
  );
};

export default UserTable;
