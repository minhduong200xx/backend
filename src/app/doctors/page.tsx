"use client";
import React, { useState, useEffect } from "react";
import { Input, Select, Row, Col, Empty } from "antd";
import "tailwindcss/tailwind.css";
import DoctorCard from "../../components/Common/Card/DoctorCard";
import { getDoctors } from "../../lib/doctors";
import { Doctor } from "../../types/type";
import { useRouter } from "next/navigation";

const { Search } = Input;
const { Option } = Select;

const DoctorPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);

  const [searchText, setSearchText] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState<string | undefined>(
    undefined
  );
  const [experienceFilter, setExperienceFilter] = useState<number | undefined>(
    undefined
  );
  const router = useRouter();
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await getDoctors();
        setDoctors(response.data);
        setFilteredDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    const filtered = doctors.filter((doctor) => {
      const matchesSearchText = (doctor.first_name + " " + doctor.last_name)
        .toLowerCase()
        .includes(searchText.toLowerCase());
      const matchesSpecialty = specialtyFilter
        ? doctor.speciality === specialtyFilter
        : true;
      const matchesExperience = experienceFilter
        ? (doctor.experience_years ?? 0) >= experienceFilter
        : true;
      return matchesSearchText && matchesSpecialty && matchesExperience;
    });
    setFilteredDoctors(filtered);
  }, [searchText, specialtyFilter, experienceFilter, doctors]);

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
            {Array.from(
              new Set(doctors.map((doctor) => doctor.speciality))
            ).map((specialty, index) => (
              <Option key={index} value={specialty}>
                {specialty}
              </Option>
            ))}
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
        {filteredDoctors.length > 0 ? (
          filteredDoctors.map((doctor, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <DoctorCard
                name={doctor.first_name + " " + doctor.last_name}
                speciality={doctor.speciality ?? ""}
                experience={doctor.experience_years ?? 0}
                available={doctor.available ?? false}
                imgUrl={doctor.image ?? ""}
                onBookAppointment={() =>
                  handleBookAppointment(
                    doctor.first_name + " " + doctor.last_name
                  )
                }
                onViewProfile={() =>
                  router.push(`/doctors/${doctor.doctor_id}`)
                }
              />
            </Col>
          ))
        ) : (
          <div className="text-center w-full">
            <Empty />
          </div>
        )}
      </Row>
    </div>
  );
};

export default DoctorPage;
