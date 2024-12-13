"use client";
import React from "react";
import HomePageLayout from "@/app/components/Common/Layout/HomePageLayout";
import "tailwindcss/tailwind.css";

const AboutPage: React.FC = () => {
  return (
    <>
      <div className="p-8 bg-white rounded-lg shadow-md mx-auto w-[80%]">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-900">
          About Us
        </h1>
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Welcome to eClinic, your trusted partner in healthcare. Our mission is
          to provide high-quality medical services to our community. We are
          committed to improving the health and well-being of our patients
          through compassionate care, advanced medical technology, and a team of
          dedicated healthcare professionals.
        </p>
        <h2 className="text-3xl font-bold mb-4 text-blue-800">Our Vision</h2>
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Our vision is to be the leading healthcare provider in the region,
          known for our excellence in patient care, innovation, and community
          involvement. We strive to create a healthier future for all by
          promoting wellness, preventing illness, and providing exceptional
          medical treatment.
        </p>
        <h2 className="text-3xl font-bold mb-4 text-blue-800">Our Values</h2>
        <ul className="list-disc list-inside mb-6 text-lg leading-relaxed text-gray-700">
          <li>
            Compassion: We treat our patients with kindness, empathy, and
            respect.
          </li>
          <li>
            Excellence: We are committed to delivering the highest quality of
            care.
          </li>
          <li>
            Integrity: We uphold the highest standards of honesty and ethics.
          </li>
          <li>
            Innovation: We embrace new technologies and treatments to improve
            patient outcomes.
          </li>
          <li>
            Collaboration: We work together as a team to achieve the best
            results for our patients.
          </li>
        </ul>
        <h2 className="text-3xl font-bold mb-4 text-blue-800">Our Team</h2>
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          Our team of healthcare professionals includes experienced doctors,
          nurses, and support staff who are dedicated to providing personalized
          care to each patient. We believe in continuous learning and
          professional development to stay at the forefront of medical
          advancements.
        </p>
        <h2 className="text-3xl font-bold mb-4 text-blue-800">Contact Us</h2>
        <p className="mb-6 text-lg leading-relaxed text-gray-700">
          If you have any questions or would like to schedule an appointment,
          please contact us at (123) 456-7890 or email us at info@eclinic.com.
          We look forward to serving you and your family.
        </p>
      </div>
    </>
  );
};

export default AboutPage;
