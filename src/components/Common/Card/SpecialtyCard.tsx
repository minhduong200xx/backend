"use client";
import React from "react";

import "tailwindcss/tailwind.css";
import Link from "next/link";
import Image from "next/image";

interface SpecialtyCardProps {
  name: string;
  imgUrl: string;
}

const SpecialtyCard: React.FC<SpecialtyCardProps> = ({ name, imgUrl }) => {
  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
      key={name}
      href={`/doctors/${name}`}
    >
      <Image
        className="w-16 sm:w-24 mb-2"
        width={64}
        height={64}
        src={imgUrl}
        alt={name}
      />
      <p className="text-base text-black">{name}</p>
    </Link>
  );
};

export default SpecialtyCard;
