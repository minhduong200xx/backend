"use client";
import React from "react";
import { Card, Image } from "antd";
import "tailwindcss/tailwind.css";

interface SpecialtyCardProps {
  name: string;
  description: string;
}

const SpecialtyCard: React.FC<SpecialtyCardProps> = ({ name, description }) => {
  return (
    <Card title={name} className="text-center w-80 h-96 mx-4">
      <Image src="/cardiology.jpg" alt="Medical" preview={false} />
      <p>{description}</p>
    </Card>
  );
};

export default SpecialtyCard;
