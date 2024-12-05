"use client";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Row, Col } from "antd";
import { Doctor } from "@/app/types/type";

interface DoctorProfileModalProps {
  open: boolean;
  onClose: () => void;
  selectedDoctor: Doctor | null;
  onSave: (updatedDoctor: Doctor) => void;
  form: any;
}

const DoctorProfileModal: React.FC<DoctorProfileModalProps> = ({
  open,
  onClose,
  selectedDoctor,
  onSave,
  form,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedDoctor) {
      form.setFieldsValue(selectedDoctor);
      form.setFieldsValue({
        date_of_birth: selectedDoctor.date_of_birth
          ? new Date(selectedDoctor.date_of_birth).toISOString().split("T")[0]
          : "",
      });
    }
  }, [selectedDoctor, form]);

  const handleSave = () => {
    form.validateFields().then((values: Doctor) => {
      onSave(values);
      console.log("values", values);
      setIsEditing(false);
      return values;
    });
  };

  const calculateAge = (dateOfBirth: string) => {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    form.setFieldsValue({ age });
    return age;
  };

  return (
    <Modal
      title="Doctor Profile"
      open={open}
      onCancel={() => {
        onClose();
        setIsEditing(false);
      }}
      width={800}
      footer={[
        <Button
          key="close"
          onClick={() => {
            onClose();
            setIsEditing(false);
          }}
        >
          Close
        </Button>,
        <Button
          type="primary"
          key="edit"
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>,
      ]}
    >
      {selectedDoctor && (
        <Form form={form} layout="horizontal">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Doctor ID"
                name="doctor_id"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input disabled style={{ color: "black" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="User ID"
                name="user_id"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input disabled style={{ color: "black" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="First Name"
                name="first_name"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input disabled={!isEditing} style={{ color: "black" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Last Name"
                name="last_name"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input disabled={!isEditing} style={{ color: "black" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input disabled={!isEditing} style={{ color: "black" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phone Number"
                name="phone_number"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input disabled={!isEditing} style={{ color: "black" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Date of Birth"
                name="date_of_birth"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input
                  disabled={!isEditing}
                  style={{ color: "black" }}
                  placeholder="yyyy-mm-dd"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Gender"
                name="gender"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input disabled={!isEditing} style={{ color: "black" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Age"
                name="age"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input
                  disabled
                  value={calculateAge(selectedDoctor.date_of_birth!)}
                  style={{ color: "black" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Specialty"
                name="specialty"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input disabled={!isEditing} style={{ color: "black" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Experience Years"
                name="experience_years"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input disabled={!isEditing} style={{ color: "black" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Working Days"
                name="working_days"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input disabled={!isEditing} style={{ color: "black" }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Address"
            name="address"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Input disabled={!isEditing} style={{ color: "black" }} />
          </Form.Item>
          {/* <Form.Item
            label="Medical Records"
            name="medical_records"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Input.TextArea disabled={!isEditing} style={{ color: "black" }} />
          </Form.Item>
          <Form.Item
            label="Appointments"
            name="appointments"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Input.TextArea disabled={!isEditing} style={{ color: "black" }} />
          </Form.Item> */}
        </Form>
      )}
    </Modal>
  );
};

export default DoctorProfileModal;
