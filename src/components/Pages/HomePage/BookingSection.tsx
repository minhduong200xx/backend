"use client";
import React from "react";
import { Button } from "antd";
import "tailwindcss/tailwind.css";
import Link from "next/link";
import Image from "next/image";

const BookingSection: React.FC = () => {
  const handleBooking = () => {
    console.log("Booking an appointment...");
  };

  return (
    <div className="flex bg-primary bg-blue-600 rounded-lg px-4 sm:px-10 md:px-14 lg:px-12 my-20">
      <div className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-white">
          <p>Book Appointment</p>
          <p className="mt-4">With 100+ Trusted Doctors</p>
        </div>
        <Button
          href="/register"
          className="bg-white text-base font-bold sm:text-base  px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all"
          style={{ fontWeight: 600 }}
        >
          Create Account
        </Button>
      </div>

      <div className="hidden md:block md:w-1/2 lg:w-[370px] relative ">
        <Image
          className="w-full absolute bottom-0 right-0 max-w-md"
          src={"/appointment_img.png"}
          alt="appoint"
          width={370}
          height={370}
        />
      </div>
    </div>
  );
};

export default BookingSection;
