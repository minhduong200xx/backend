"use client";
import React from "react";
import HomePageLayout from "./components/Common/Layout/HomePageLayout";
import { CarouselSection } from "./components/Pages/HomePage/CarouselSection";
import SearchSection from "./components/Pages/HomePage/SearchSection";
import BookingSection from "./components/Pages/HomePage/BookingSection";
import SpecialtySection from "./components/Pages/HomePage/SpecialtySection";

const HomePage: React.FC = () => {
  return (
    <HomePageLayout>
      <div className="home-page mx-auto w-full bg-gradient-to-bl from-[#9de8f4] to-blue-100">
        <CarouselSection />
        <SearchSection />
        <BookingSection />
        <SpecialtySection />
      </div>
    </HomePageLayout>
  );
};

export default HomePage;
