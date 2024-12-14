"use client";
import React from "react";
import { Card, Button } from "antd";
import Image, { StaticImageData } from "next/image";

interface DoctorCardProps {
  name: string;
  available: boolean;
  specialty: string;
  onBookAppointment: () => void;
  onViewProfile: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  name,
  specialty,
  available,
  onBookAppointment,
  onViewProfile,
}) => {
  return (
    <Card className="doctor-card text-center p-4 rounded-lg shadow-md">
      <div className="relative w-full h-48 mb-4"></div>
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <span className="flex items-center justify-center mb-2">
        <p
          className={`w-2 h-2 rounded-full ${
            available ? "bg-green-600" : "bg-red-600"
          }`}
        ></p>
        <p className={`ml-2 ${available ? "text-green-500" : "text-red-500"}`}>
          {available ? "Available" : "Unavailable"}
        </p>
      </span>
      <p className="text-gray-600 mb-4">{specialty}</p>
      <div className="flex justify-center space-x-4">
        <Button type="primary" onClick={onBookAppointment}>
          Book Appointment
        </Button>
        <Button onClick={onViewProfile}>View Profile</Button>
      </div>
    </Card>
  );
};

export default DoctorCard;
