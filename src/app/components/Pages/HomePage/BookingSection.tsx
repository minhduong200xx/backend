"use client";
import React from "react";
import { Button } from "antd";
import "tailwindcss/tailwind.css";
import Link from "next/link";

const BookingSection: React.FC = () => {
  const handleBooking = () => {
    console.log("Booking an appointment...");
    // Implement your booking logic here
  };

  return (
    <div
      className="text-center h-screen flex gap-6 justify-center items-center"
      style={{
        backgroundImage: `url("/booking.jpeg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        borderRadius: "8px",
        boxShadow: "0 0 20px 10px #84bfd3",
      }}
    >
      <div className="flex justify-center items-center gap-6">
        <h1 className="text-6xl text-black font-bold mb-4 ">
          Book an Appointment
        </h1>
        <Button
          type="primary"
          onClick={handleBooking}
          className="animate-bounce"
        >
          <Link href="/booking-appointment">Book Now → </Link>
        </Button>
      </div>
    </div>
  );
};

export default BookingSection;
