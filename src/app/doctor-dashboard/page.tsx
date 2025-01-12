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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
      <Card title="Appointments">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
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
    </div>
  );
};

export default Dashboard;
