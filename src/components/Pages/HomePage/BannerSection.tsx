import React from "react";
import { Carousel } from "antd";
import Image from "next/image";

export const BannerSection: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wra bg-blue-600 rounded-lg px-6 md:px-10">
      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight ">
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img src="/group_profiles.png" alt="Sale" />
          <p>
            Simply browse through our extensive list of trusted doctors,{" "}
            <br className="hidden sm:block" /> schedule your appointment
            hassle-free
          </p>
        </div>
        <a
          className="flex items-center gap-2 bg-white font-semibold px-8 py-3 rounded-full text-black text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300"
          href="#speciality"
        >
          Book appointment
        </a>
      </div>
      <div className="md:w-1/2 relative ">
        <img
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
          src="/header_img.png"
          alt=""
        />
      </div>
    </div>
  );
};
