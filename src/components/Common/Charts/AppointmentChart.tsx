import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", appointments: 30 },
  { name: "Feb", appointments: 20 },
  { name: "Mar", appointments: 50 },
  { name: "Apr", appointments: 40 },
  { name: "May", appointments: 60 },
  { name: "Jun", appointments: 70 },
  { name: "Jul", appointments: 50 },
  { name: "Aug", appointments: 80 },
  { name: "Sep", appointments: 90 },
  { name: "Oct", appointments: 100 },
  { name: "Nov", appointments: 110 },
  { name: "Dec", appointments: 120 },
];

const AppointmentChart: React.FC = () => {
  return (
    <ResponsiveContainer width={400} height={400}>
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
  );
};

export default AppointmentChart;
