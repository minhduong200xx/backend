import React from "react";
import { Carousel } from "antd";
import Image from "next/image";

export const CarouselSection: React.FC = () => {
  return (
    <Carousel autoplay style={{ color: "black" }}>
      <div className="relative h-screen w-screen  ">
        <Image
          src="/Medical.jpeg"
          alt="Medical"
          layout="fill"
          objectFit="cover"
          className="rounded-3xl "
        />
      </div>
      <div className="relative h-screen w-screen">
        <Image
          src="/Sale.jpeg"
          alt="Sale"
          layout="fill"
          objectFit="cover"
          className="rounded-3xl "
        />
      </div>
    </Carousel>
  );
};
