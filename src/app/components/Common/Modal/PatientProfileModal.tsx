"use client";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Col, Row } from "antd";
import { Patient } from "@/app/types/type";

interface PatientProfileModalProps {
  open: boolean;
  onClose: () => void;
  selectedPatient: Patient | null;
  onSave: (updatedPatient: Patient) => void;
}

const PatientProfileModal: React.FC<PatientProfileModalProps> = ({
  open,
  onClose,
  selectedPatient,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedPatient) {
      form.setFieldsValue(selectedPatient);
    }
    calculateAge(selectedPatient?.date_of_birth || "");
  }, [selectedPatient, form]);

  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave(values as Patient);
      setIsEditing(false);
      console.log(values);
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
  };

  return (
    <Modal
      title="Patient Profile"
      open={open}
      onCancel={() => (onClose(), setIsEditing(false))}
      width={800}
      footer={[
        <Button key="close" onClick={() => (onClose(), setIsEditing(false))}>
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
      {selectedPatient && (
        <Form form={form} layout="horizontal">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Patient ID"
                name="patient_id"
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
                label="Phone"
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
                <Input disabled={!isEditing} style={{ color: "black" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Age"
                name="age"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input disabled style={{ color: "black" }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Gender"
            name="gender"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Input disabled={!isEditing} style={{ color: "black" }} />
          </Form.Item>
          <Form.Item
            label="Address"
            name="address"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Input disabled={!isEditing} style={{ color: "black" }} />
          </Form.Item>
          <Form.Item
            label="Emergency Contact"
            name="emergency_contact"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
          >
            <Input disabled={!isEditing} style={{ color: "black" }} />
          </Form.Item>
          <Form.Item
            label="Medical History"
            name="medical_history"
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
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default PatientProfileModal;
