"use client";
import React from "react";
import { Card, Button } from "antd";
import Image from "next/image";

interface DoctorCardProps {
  name: string;
  specialty: string;
  imageUrl: string;
  onBookAppointment: () => void;
  onViewProfile: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  name,
  specialty,
  imageUrl,
  onBookAppointment,
  onViewProfile,
}) => {
  return (
    <Card className="doctor-card text-center p-4 rounded-lg shadow-md">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={imageUrl}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <h3 className="text-xl font-bold mb-2">{name}</h3>
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
