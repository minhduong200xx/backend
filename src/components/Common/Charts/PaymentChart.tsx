"use client";
import React from "react";
import { Line } from "@ant-design/charts";

const PaymentChart: React.FC = () => {
  const data = [
    { month: "Jan", value: 30 },
    { month: "Feb", value: 40 },
    { month: "Mar", value: 35 },
    { month: "Apr", value: 50 },
    { month: "May", value: 49 },
    { month: "Jun", value: 60 },
    { month: "Jul", value: 70 },
    { month: "Aug", value: 91 },
    { month: "Sep", value: 125 },
    { month: "Oct", value: 140 },
    { month: "Nov", value: 150 },
    { month: "Dec", value: 160 },
  ];

  const config = {
    data,
    xField: "month",
    yField: "value",
    label: {},
    point: {
      size: 5,
      shape: "diamond",
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: "#000",
          fill: "red",
        },
      },
    },
    interactions: [{ type: "marker-active" }],
  };

  return <Line {...config} />;
};

export default PaymentChart;
