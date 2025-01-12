"use client";
import React from "react";
import { Card, Button, Tag } from "antd";
import Image, { StaticImageData } from "next/image";

interface DoctorCardProps {
  name: string;
  available: boolean;
  speciality: string;
  imgUrl: string;
  experience: number;
  onBookAppointment: () => void;
  onViewProfile: () => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({
  name,
  speciality,
  available,
  imgUrl,
  experience,
  onBookAppointment,
  onViewProfile,
}) => {
  return (
    <div className="border border-blue-200 w-fit text-center rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
      <Image
        className="bg-blue-600"
        src={imgUrl || "/doc1.png"}
        alt=""
        width={300}
        height={300}
      />
      <div className="p-4">
        <div className="flex justify-between items-center gap-2">
          <div
            className={`flex items-center gap-2 text-sm text-center ${
              available ? "text-green-500" : "text-gray-500"
            } `}
          >
            <p
              className={`w-2 h-2 ${
                available ? "bg-green-500" : "bg-gray-500"
              }  rounded-full`}
            ></p>
            <p>{available ? "Available" : "Not Available"}</p>
          </div>
          <Tag color="blue" className="text-sm">
            {experience} years experience
          </Tag>
        </div>

        <p className="text-gray-900 text-lg font-medium">{name}</p>
        <p className="text-gray-600 text-sm">{speciality}</p>
      </div>
      <div className="flex justify-center space-x-4 pb-4">
        <Button type="primary" onClick={onBookAppointment}>
          Book Appointment
        </Button>
        <Button onClick={onViewProfile}>View Profile</Button>
      </div>
    </div>
  );
};

export default DoctorCard;
