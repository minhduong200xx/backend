import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", users: 4 },
  { name: "Feb", users: 3 },
  { name: "Mar", users: 5 },
  { name: "Apr", users: 4 },
  { name: "May", users: 6 },
  { name: "Jun", users: 7 },
  { name: "Jul", users: 5 },
  { name: "Aug", users: 8 },
  { name: "Sep", users: 9 },
  { name: "Oct", users: 10 },
  { name: "Nov", users: 11 },
  { name: "Dec", users: 12 },
];

const UserChart: React.FC = () => {
  return (
    <ResponsiveContainer width={400} height={400}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="users" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default UserChart;
