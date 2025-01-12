"use client";
import React from "react";
import HomePageLayout from "../components/Common/Layout/HomePageLayout";
import { BannerSection } from "../components/Pages/HomePage/BannerSection";
import SearchSection from "../components/Pages/HomePage/SearchSection";
import BookingSection from "../components/Pages/HomePage/BookingSection";
import SpecialtySection from "../components/Pages/HomePage/SpecialtySection";
import TopDoctorsSection from "../components/Pages/HomePage/TopDoctorsSection";

const HomePage: React.FC = () => {
  return (
    <HomePageLayout>
      <div className="home-page px-20 py-4 w-full bg-gradient-to-bl">
        <BannerSection />
        <SearchSection />
        <BookingSection />
        <SpecialtySection />
        <TopDoctorsSection />
      </div>
    </HomePageLayout>
  );
};

export default HomePage;
