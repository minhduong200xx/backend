"use client";
import React from "react";
import SpecialtyCard from "../../Common/Card/SpecialtyCard";
import { Carousel } from "antd";
const specialties = [
  { name: "Cardiology", description: "Heart and blood vessels." },
  { name: "Dermatology", description: "Skin, hair, and nails." },
  { name: "Neurology", description: "Brain and nervous system." },
  { name: "Pediatrics", description: "Healthcare for children." },
  { name: "Orthopedics", description: "Bones and muscles." },
  { name: "Ophthalmology", description: "Eyes and vision." },
  { name: "Gynecology", description: "Women's health." },
  { name: "Psychiatry", description: "Mental health." },
];

const SpecialtySection: React.FC = () => {
  return (
    <div
      className="text-center h-screen flex flex-col gap-6 justify-center items-center"
      // style={{
      //   backgroundImage: `url("/Searchss.png")`,
      //   backgroundSize: "cover",
      //   backgroundPosition: "center",
      // }}
    >
      <h2 className="text-5xl font-bold text-black mb-4 text-center">
        Specialties at eClinic
      </h2>
      <Carousel
        slidesToShow={4}
        slidesToScroll={4}
        autoplay
        style={{
          width: "100vw",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          padding: 60,
          alignItems: "center",
          gap: 20,
        }}
      >
        {specialties.map((specialty, index) => (
          <SpecialtyCard
            key={index}
            name={specialty.name}
            description={specialty.description}
          />
        ))}
      </Carousel>
      <button className=" px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        View More
      </button>
    </div>
  );
};

export default SpecialtySection;
