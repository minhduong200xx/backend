"use client";
import React from "react";
import { Card, Row, Col } from "antd";
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

const pieData = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Dashboard = () => {
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Appointments Over Time">
            <ResponsiveContainer width="100%" height={300}>
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
        </Col>
        <Col span={12}>
          <Card title="Payments Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
