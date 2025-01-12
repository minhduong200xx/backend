"use client";
import React from "react";
import SpecialtyCard from "../../Common/Card/SpecialtyCard";
import { Carousel } from "antd";
const specialities = [
  {
    name: "General physician",
    imgUrl: "/General_physician.svg",
  },
  {
    name: "Gynecologist",
    imgUrl: "/Gynecologist.svg",
  },
  {
    name: "Dermatologist",
    imgUrl: "/Dermatologist.svg",
  },
  {
    name: "Pediatricians",
    imgUrl: "/Pediatricians.svg",
  },
  {
    name: "Neurologist",
    imgUrl: "/Neurologist.svg",
  },
  {
    name: "Gastroenterologist",
    imgUrl: "/Gastroenterologist.svg",
  },
];

const SpecialtySection: React.FC = () => {
  return (
    <div
      className="text-center h-fit py-4 flex-col gap-6 justify-center items-center"
      id="speciality"
      // style={{
      //   backgroundImage: `url("/Searchss.png")`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      <h2 className="text-4xl font-bold text-black mb-4 text-center">
        Specialties at eClinic
      </h2>
      <p className="text-base font-semibold text-black mb-4 text-center">
        Simply browse through our extensive list of trusted doctors, schedule
        your appointment hassle-free
      </p>
      <div className="flex justify-center items-center gap-6">
        {specialities.map((speciality, index) => (
          <SpecialtyCard
            key={index}
            name={speciality.name}
            imgUrl={speciality.imgUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default SpecialtySection;
