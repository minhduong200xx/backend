"use client";
import React from "react";
import { Card } from "antd";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", appointments: 400, payments: 2400, patients: 2400 },
  { name: "Feb", appointments: 300, payments: 1398, patients: 2210 },
  { name: "Mar", appointments: 200, payments: 9800, patients: 2290 },
  { name: "Apr", appointments: 278, payments: 3908, patients: 2000 },
  { name: "May", appointments: 189, payments: 4800, patients: 2181 },
  { name: "Jun", appointments: 239, payments: 3800, patients: 2500 },
  { name: "Jul", appointments: 349, payments: 4300, patients: 2100 },
];

const payments = [
  { name: "Jan", payments: 2400 },
  { name: "Feb", payments: 1398 },
  { name: "Mar", payments: 9800 },
  { name: "Apr", payments: 3908 },
  { name: "May", payments: 4800 },
  { name: "Jun", payments: 3800 },
  { name: "Jul", payments: 4300 },
];
const patients = [
  { name: "Jan", patients: 2400 },
  { name: "Feb", patients: 1398 },
  { name: "Mar", patients: 9800 },
  { name: "Apr", patients: 3908 },
  { name: "May", patients: 4800 },
  { name: "Jun", patients: 3800 },
  { name: "Jul", patients: 4300 },
];
const doctors = [
  { name: "Cardiology", value: 400 },
  { name: "Neurology", value: 300 },
  { name: "Orthopedics", value: 300 },
  { name: "Dermatology", value: 200 },
];
const users = [
  { name: "Admin", value: 400 },
  { name: "Doctor", value: 300 },
  { name: "Patient", value: 300 },
  { name: "Nurse", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
      <Card title="Appointments" className="mb-4">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="appointments"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
      <Card title="Payments" className="mb-4">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={payments}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="payments"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
      <Card title="Patients" className="mb-4">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={patients}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="patients"
              stroke="#FFBB28"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>
      <Card title="Doctors" className="mb-4">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={doctors}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {doctors.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>
      <Card title="Users" className="mb-4">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={users}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#82ca9d"
              label
            >
              {users.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default Dashboard;
