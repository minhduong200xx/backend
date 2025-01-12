import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", doctors: 10 },
  { name: "Feb", doctors: 15 },
  { name: "Mar", doctors: 20 },
  { name: "Apr", doctors: 25 },
  { name: "May", doctors: 30 },
  { name: "Jun", doctors: 35 },
  { name: "Jul", doctors: 40 },
  { name: "Aug", doctors: 45 },
  { name: "Sep", doctors: 50 },
  { name: "Oct", doctors: 55 },
  { name: "Nov", doctors: 60 },
  { name: "Dec", doctors: 65 },
];

const DoctorChart: React.FC = () => {
  return (
    <ResponsiveContainer width={400} height={400}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="doctors"
          stroke="#8884d8"
          fill="#8884d8"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default DoctorChart;
