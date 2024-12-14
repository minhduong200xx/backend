"use client";
import React from "react";
import { Card, Col, Row, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { doctors } from "@/assets/assets_frontend/assets"; // Adjust the import path as needed

const { Meta } = Card;

const TopDoctorsSection: React.FC = () => {
  return (
    <div style={{ padding: "50px" }}>
      <h1 className="text-4xl font-bold text-center mb-8">Top Doctors</h1>
      <Row gutter={[16, 16]}>
        {doctors.map((doctor) => (
          <Col span={8} key={doctor._id}>
            <Card
              hoverable
              cover={<img alt={doctor.name} src={doctor.image} />}
            >
              <Meta
                avatar={<Avatar icon={<UserOutlined />} />}
                title={doctor.name}
                description={
                  <>
                    <p>Speciality: {doctor.speciality}</p>
                    <p>Experience: {doctor.experience}</p>
                    <p>Fees: ${doctor.fees}</p>
                    <p>
                      Address: {doctor.address.line1}, {doctor.address.line2}
                    </p>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TopDoctorsSection;
