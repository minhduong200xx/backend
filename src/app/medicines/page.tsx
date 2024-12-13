"use client";
import React, { useState } from "react";
import {
  Input,
  Slider,
  Select,
  Card,
  Row,
  Col,
  Button,
  Modal,
  Image,
} from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Search } = Input;
const { Option } = Select;

const medicines = [
  {
    id: 1,
    name: "Aspirin",
    price: 10,
    category: "Pain Relief",
    description: "Aspirin is used to reduce pain, fever, or inflammation.",
    stock: 10,
  },
  {
    id: 2,
    name: "Tylenol",
    price: 15,
    category: "Pain Relief",
    description:
      "Tylenol is used to treat mild to moderate pain and reduce fever.",
    stock: 0,
  },
  {
    id: 3,
    name: "Amoxicillin",
    price: 20,
    category: "Antibiotic",
    description:
      "Amoxicillin is used to treat a wide variety of bacterial infections.",
    stock: 5,
  },
  {
    id: 4,
    name: "Ciprofloxacin",
    price: 25,
    category: "Antibiotic",
    description:
      "Ciprofloxacin is used to treat a variety of bacterial infections.",
    stock: 0,
  },
  {
    id: 5,
    name: "Metformin",
    price: 30,
    category: "Diabetes",
    description:
      "Metformin is used to control high blood sugar in people with type 2 diabetes.",
    stock: 20,
  },
  {
    id: 6,
    name: "Insulin",
    price: 35,
    category: "Diabetes",
    description:
      "Insulin is used to control blood sugar in people with diabetes.",
    stock: 0,
  },
];

const categories = ["Pain Relief", "Antibiotic", "Diabetes"];

const MedicinesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const [cart, setCart] = useState<any[]>([]);
  const [selectedMedicine, setSelectedMedicine] = useState<any | null>(null);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value as [number, number]);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };

  const handleAddToCart = (medicine: any) => {
    setCart([...cart, medicine]);
  };

  const handleViewDetails = (medicine: any) => {
    setSelectedMedicine(medicine);
  };

  const handleCloseModal = () => {
    setSelectedMedicine(null);
  };

  const filteredMedicines = medicines.filter((medicine) => {
    return (
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      medicine.price >= priceRange[0] &&
      medicine.price <= priceRange[1] &&
      (selectedCategory ? medicine.category === selectedCategory : true)
    );
  });

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-center items-center py-2">
        Medicines
      </h1>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <div style={{ marginBottom: "20px" }}>
            <Search
              placeholder="Search medicines"
              onSearch={handleSearch}
              enterButton
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <h3>Price Range</h3>
            <Slider
              range
              defaultValue={priceRange}
              max={50}
              onChange={handlePriceChange}
            />
          </div>
          <div>
            <Select
              placeholder="Filter by category"
              onChange={handleCategoryChange}
              allowClear
              style={{ width: "100%" }}
            >
              {categories.map((category) => (
                <Option key={category} value={category}>
                  {category}
                </Option>
              ))}
            </Select>
          </div>
        </Col>
        <Col span={18}>
          <Row gutter={[16, 16]}>
            {filteredMedicines.map((medicine) => (
              <Col span={8} key={medicine.id}>
                <Card title={medicine.name}>
                  <Image src="/img1.jpeg" />
                  <p>
                    {" "}
                    <b>Price:</b> ${medicine.price}
                  </p>
                  <p>
                    <b>Category:</b> {medicine.category}
                  </p>
                  <p
                    style={{
                      color: medicine.stock > 0 ? "green" : "red",
                      fontWeight: 600,
                    }}
                  >
                    {medicine.stock > 0
                      ? `In Stock: ${medicine.stock}`
                      : "Out of Stock"}
                  </p>
                  <div className="flex p-2 items-center text-center justify-center ">
                    <Button
                      type="primary"
                      icon={<ShoppingCartOutlined />}
                      onClick={() => handleAddToCart(medicine)}
                      style={{ marginRight: "10px" }}
                      disabled={medicine.stock === 0}
                    >
                      Add to Cart
                    </Button>
                    <Button onClick={() => handleViewDetails(medicine)}>
                      View Details
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Modal
        title={selectedMedicine?.name}
        open={!!selectedMedicine}
        onCancel={handleCloseModal}
        footer={null}
      >
        <p>{selectedMedicine?.description}</p>
        <p>Price: ${selectedMedicine?.price}</p>
        <p>Category: {selectedMedicine?.category}</p>
        <p
          style={{
            color: selectedMedicine?.stock > 0 ? "green" : "red",
          }}
        >
          {selectedMedicine?.stock > 0
            ? `In Stock: ${selectedMedicine?.stock}`
            : "Out of Stock"}
        </p>
      </Modal>
    </div>
  );
};

export default MedicinesPage;
