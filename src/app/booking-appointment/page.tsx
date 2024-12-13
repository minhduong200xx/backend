"use client";
import React from "react";
import {
  Form,
  Input,
  DatePicker,
  TimePicker,
  Button,
  message,
  Image,
  Row,
  Col,
  Select,
} from "antd";
import moment from "moment";
import { useAuth } from "../context/AuthProvider";

const BookingAppointmentPage: React.FC = () => {
  const [form] = Form.useForm();
  const { user } = useAuth();

  const handleSubmit = (values: any) => {
    // Handle form submission logic here
    console.log("Appointment booked:", values);
    message.success("Appointment booked successfully!");
  };
  const doctors = [
    { id: 1, name: "Dr. Smith" },
    { id: 2, name: "Dr. Johnson" },
    { id: 3, name: "Dr. Williams" },
  ];
  return (
    <div className="flex items-center justify-center flex-col md:flex-row">
      {user ? (
        <>
          <div className="md:w-1/2 p-4">
            <Image
              src="/img1.jpeg"
              alt="Booking Appointment"
              className="w-full h-auto"
              preview={false}
            />
          </div>
          <div className="md:w-1/2 p-4 flex flex-col items-center justify-center gap-6">
            <h1 className="font-bold text-4xl animate-bounce">
              Book an Appointment
            </h1>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{
                date: moment(),
                time: moment(),
              }}
              style={{ width: 600 }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="First Name"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your first name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Last Name"
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your last name!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                      { type: "email", message: "Please enter a valid email!" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Phone Number"
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone number!",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                label="Reason for Booking"
                name="reason"
                rules={[
                  {
                    required: true,
                    message: "Please input the reason for booking!",
                  },
                ]}
              >
                <Input.TextArea
                  placeholder="Ex: Overal Health Check "
                  rows={4}
                />
              </Form.Item>

              <Form.Item
                label="Choose Doctor"
                name="doctor"
                rules={[{ required: true, message: "Please choose a doctor!" }]}
              >
                <Select placeholder="Select a doctor">
                  {doctors.map((doctor) => (
                    <Select.Option key={doctor.id} value={doctor.name}>
                      {doctor.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Date"
                    name="date"
                    rules={[
                      { required: true, message: "Please select a date!" },
                    ]}
                  >
                    <DatePicker />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Time"
                    name="time"
                    rules={[
                      { required: true, message: "Please select a time!" },
                    ]}
                  >
                    <TimePicker use12Hours format="h:mm a" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item className="flex items-center justify-center">
                <Button type="primary" htmlType="submit">
                  Book Appointment
                </Button>
              </Form.Item>
            </Form>
          </div>
        </>
      ) : (
        <h1>Please login to book an appointment</h1>
      )}
    </div>
  );
};

export default BookingAppointmentPage;
