"use client";
import React, { useState } from "react";
import { Input, Select } from "antd";
const { Search } = Input;
const { Option } = Select;

const SearchSection: React.FC = () => {
  const [category, setCategory] = useState<string>("doctor");

  const handleCategoryChange = (value: string) => {
    setCategory(value);
  };

  const handleSearch = (value: string) => {
    console.log(`Searching for ${value} in category ${category}`);
    // Implement your search logic here
  };

  return (
    <div className="text-center h-auto flex flex-row gap-4 p-4 mb-4 justify-center items-center">
      <div
        className="h-60 w-60"
        style={{
          backgroundImage: `url("/poster2.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "50%",
          boxShadow: "0 0 20px 10px #84bfd3",
        }}
      ></div>
      <div
        className="h-60 w-60 -ml-12 mt-72"
        style={{
          backgroundImage: `url("/Searchss.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "50%",
          boxShadow: "0 0 20px 10px #84bfd3",
        }}
      ></div>
      <div
        className="h-60 w-60 -ml-36 -mt-36"
        style={{
          backgroundImage: `url("/health.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "50%",
          boxShadow: "0 0 20px 10px #84bfd3",
        }}
      ></div>
      <span className=" bg-white  rounded-full shadow-2xl p-12 mx-5 py-10 flex flex-col gap-3">
        <h2 className="text-3xl font-bold">
          Search for Doctors, Medicines, Blogs, etc.
        </h2>
        <div className="flex justify-center items-center space-x-4">
          <Select
            defaultValue="doctor"
            onChange={handleCategoryChange}
            className="w-40"
          >
            <Option value="doctor">Doctor</Option>
            <Option value="medicines">Medicines</Option>
            <Option value="blog">Blog</Option>
          </Select>
          <Search
            placeholder="Search..."
            enterButton
            onSearch={handleSearch}
            className="max-w-lg"
          />
        </div>
      </span>
    </div>
  );
};

export default SearchSection;
