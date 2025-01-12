"use client";
import React from "react";
import Image from "next/image";
import { useAppContext } from "@/context/AppProvider";
import { useRouter } from "next/navigation";

// const doctors = [
//   {
//     _id: "doc1",
//     name: "Dr. Richard James",
//     image: "/doc1.png",
//     speciality: "General physician",
//     degree: "MBBS",
//     experience: "4 Years",
//     about:
//       "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
//     fees: 50,
//     address: {
//       line1: "17th Cross, Richmond",
//       line2: "Circle, Ring Road, London",
//     },
//   },
//   {
//     _id: "doc2",
//     name: "Dr. Emily Larson",
//     image: "/doc2.png",
//     speciality: "Gynecologist",
//     degree: "MBBS",
//     experience: "3 Years",
//     about:
//       "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
//     fees: 60,
//     address: {
//       line1: "27th Cross, Richmond",
//       line2: "Circle, Ring Road, London",
//     },
//   },
//   {
//     _id: "doc3",
//     name: "Dr. Sarah Patel",
//     image: "/doc3.png",
//     speciality: "Dermatologist",
//     degree: "MBBS",
//     experience: "1 Years",
//     about:
//       "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
//     fees: 30,
//     address: {
//       line1: "37th Cross, Richmond",
//       line2: "Circle, Ring Road, London",
//     },
//   },
//   {
//     _id: "doc4",
//     name: "Dr. Christopher Lee",
//     image: "/doc4.png",
//     speciality: "Pediatricians",
//     degree: "MBBS",
//     experience: "2 Years",
//     about:
//       "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
//     fees: 40,
//     address: {
//       line1: "47th Cross, Richmond",
//       line2: "Circle, Ring Road, London",
//     },
//   },
//   {
//     _id: "doc5",
//     name: "Dr. Jennifer Garcia",
//     image: "/doc5.png",
//     speciality: "Neurologist",
//     degree: "MBBS",
//     experience: "4 Years",
//     about:
//       "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
//     fees: 50,
//     address: {
//       line1: "57th Cross, Richmond",
//       line2: "Circle, Ring Road, London",
//     },
//   },
//   {
//     _id: "doc6",
//     name: "Dr. Andrew Williams",
//     image: "/doc6.png",
//     speciality: "Neurologist",
//     degree: "MBBS",
//     experience: "4 Years",
//     about:
//       "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
//     fees: 50,
//     address: {
//       line1: "57th Cross, Richmond",
//       line2: "Circle, Ring Road, London",
//     },
//   },
//   {
//     _id: "doc7",
//     name: "Dr. Christopher Davis",
//     image: "/doc7.png",
//     speciality: "Gastroenterologist",
//     degree: "MBBS",
//     experience: "4 Years",
//     about:
//       "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
//     fees: 50,
//     address: {
//       line1: "17th Cross, Richmond",
//       line2: "Circle, Ring Road, London",
//     },
//   },
//   {
//     _id: "doc8",
//     name: "Dr. Timothy White",
//     image: "/doc8.png",
//     speciality: "Gynecologist",
//     degree: "MBBS",
//     experience: "3 Years",
//     about:
//       "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
//     fees: 60,
//     address: {
//       line1: "27th Cross, Richmond",
//       line2: "Circle, Ring Road, London",
//     },
//   },
//   {
//     _id: "doc9",
//     name: "Dr. Ava Mitchell",
//     image: "/doc9.png",
//     speciality: "Dermatologist",
//     degree: "MBBS",
//     experience: "1 Years",
//     about:
//       "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
//     fees: 30,
//     address: {
//       line1: "37th Cross, Richmond",
//       line2: "Circle, Ring Road, London",
//     },
//   },
//   {
//     _id: "doc10",
//     name: "Dr. Jeffrey King",
//     image: "/doc10.png",
//     speciality: "Pediatricians",
//     degree: "MBBS",
//     experience: "2 Years",
//     about:
//       "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
//     fees: 40,
//     address: {
//       line1: "47th Cross, Richmond",
//       line2: "Circle, Ring Road, London",
//     },
//   },
//   {
//     _id: "doc11",
//     name: "Dr. Zoe Kelly",
//     image: "/doc11.png",
//     speciality: "Neurologist",
//     degree: "MBBS",
//     experience: "4 Years",
//     about:
//       "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
//     fees: 50,
//     address: {
//       line1: "57th Cross, Richmond",
//       line2: "Circle, Ring Road, London",
//     },
//   },
//   {
//     _id: "doc12",
//     name: "Dr. Patrick Harris",
//     image: "/doc12.png",
//     speciality: "Neurologist",
//     degree: "MBBS",
//     experience: "4 Years",
//     about:
//       "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
//     fees: 50,
//     address: {
//       line1: "57th Cross, Richmond",
//       line2: "Circle, Ring Road, London",
//     },
//   },
//   {
//     _id: "doc13",
//     name: "Dr. Chloe Evans",
//     image: "/doc13.png",
//     speciality: "General physician",
//     degree: "MBBS",
//     experience: "4 Years",
//     about:
//       "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
//     fees: 50,
//     address: {
//       line1: "17th Cross, Richmond",
//       line2: "Circle, Ring Road, London",
//     },
//   },
//   {
//     _id: "doc14",
//     name: "Dr. Ryan Martinez",
//     image: "/doc14.png",
//     speciality: "Gynecologist",
//     degree: "MBBS",
//     experience: "3 Years",
//     about:
//       "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
//     fees: 60,
//     address: {
//       line1: "27th Cross, Richmond",
//       line2: "Circle, Ring Road, London",
//     },
//   },
//   {
//     _id: "doc15",
//     name: "Dr. Amelia Hill",
//     image: "/doc15.png",
//     speciality: "Dermatologist",
//     degree: "MBBS",
//     experience: "1 Years",
//     about:
//       "Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.",
//     fees: 30,
//     address: {
//       line1: "37th Cross, Richmond",
//       line2: "Circle, Ring Road, London",
//     },
//   },
// ];
const TopDoctorsSection: React.FC = () => {
  const { doctors } = useAppContext();
  const router = useRouter();
  return (
    <div style={{ padding: "50px" }}>
      <h1 className="text-4xl font-bold text-center pb-4">Top Doctors</h1>
      <p className="text-center mb-8 font-semibold">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="grid grid-cols-4 gap-8">
        {doctors.slice(0, 8).map((doctor) => (
          <div
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            key={doctor.doctor_id}
            onClick={() => {
              router.push(`/doctors/${doctor.doctor_id}`);
            }}
          >
            <Image
              className="bg-blue-600"
              src={doctor.image || "/doc1.png"}
              alt=""
              width={300}
              height={300}
            />
            <div className="p-4">
              <div
                className={`flex items-center gap-2 text-sm text-center ${
                  doctor.available ? "text-green-500" : "text-gray-500"
                } `}
              >
                <p
                  className={`w-2 h-2 ${
                    doctor.available ? "bg-green-500" : "bg-gray-500"
                  }  rounded-full`}
                ></p>
                <p>{doctor.available ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-gray-900 text-lg font-medium">
                Dr. {doctor.first_name + " " + doctor.last_name}
              </p>
              <p className="text-gray-600 text-sm">{doctor.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDoctorsSection;
