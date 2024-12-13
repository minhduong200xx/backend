"use client";
import React, { useState, useEffect } from "react";
import { Input, Select, Card, Row, Col } from "antd";
import "tailwindcss/tailwind.css";
import DoctorCard from "../components/Common/Card/DoctorCard";
import doc1 from "@/assets/assets_frontend/doc1.png";
const { Search } = Input;
const { Option } = Select;

const doctors = [
  {
    name: "Dr. John Doe",
    specialty: "Cardiology",
    experience: 10,
    imageUrl: "/images/doctor1.jpg",
  },
  {
    name: "Dr. Jane Smith",
    specialty: "Dermatology",
    experience: 5,
    imageUrl: "/images/doctor2.jpg",
  },
  {
    name: "Dr. Alice Johnson",
    specialty: "Neurology",
    experience: 15,
    imageUrl: "/images/doctor3.jpg",
  },
  {
    name: "Dr. Bob Brown",
    specialty: "Pediatrics",
    experience: 8,
    imageUrl: "/images/doctor4.jpg",
  },
];

const DoctorPage: React.FC = () => {
  const [filteredDoctors, setFilteredDoctors] = useState(doctors);
  const [searchText, setSearchText] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState<string | undefined>(
    undefined
  );
  const [experienceFilter, setExperienceFilter] = useState<number | undefined>(
    undefined
  );

  useEffect(() => {
    const filtered = doctors.filter((doctor) => {
      const matchesSearchText = doctor.name
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesSpecialty = specialtyFilter
        ? doctor.specialty === specialtyFilter
        : true;
      const matchesExperience = experienceFilter
        ? doctor.experience >= experienceFilter
        : true;
      return matchesSearchText && matchesSpecialty && matchesExperience;
    });
    setFilteredDoctors(filtered);
  }, [searchText, specialtyFilter, experienceFilter]);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleSpecialtyChange = (value: string) => {
    setSpecialtyFilter(value);
  };

  const handleExperienceChange = (value: number) => {
    setExperienceFilter(value);
  };

  const handleBookAppointment = (doctorName: string) => {
    console.log(`Booking an appointment with ${doctorName}...`);
    // Implement your booking logic here
  };

  const handleViewProfile = (doctorName: string) => {
    console.log(`Viewing profile of ${doctorName}...`);
    // Implement your view profile logic here
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-center">Find a Doctor</h1>
        <div className="flex justify-center space-x-4 mb-4">
          <Select
            placeholder="Filter by Specialty"
            onChange={handleSpecialtyChange}
            allowClear
            className="w-40"
          >
            <Option value="Cardiology">Cardiology</Option>
            <Option value="Dermatology">Dermatology</Option>
            <Option value="Neurology">Neurology</Option>
            <Option value="Pediatrics">Pediatrics</Option>
          </Select>
          <Select
            placeholder="Filter by Experience Years"
            onChange={handleExperienceChange}
            allowClear
            className="w-40"
          >
            <Option value={5}>More than 5 years</Option>
            <Option value={10}>More than 10 years</Option>
            <Option value={15}>More than 15 years</Option>
          </Select>
          <Search
            placeholder="Search doctors"
            onSearch={handleSearch}
            className="max-w-lg"
          />
        </div>
      </div>
      <Row gutter={[16, 16]}>
        {filteredDoctors.map((doctor, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <DoctorCard
              name={doctor.name}
              specialty={doctor.specialty}
              imageUrl={doc1}
              onBookAppointment={() => handleBookAppointment(doctor.name)}
              onViewProfile={() => handleViewProfile(doctor.name)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DoctorPage;
