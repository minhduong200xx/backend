"use client";
import React, { useEffect } from "react";
import { Modal, Button, Form, Input, Row, Col } from "antd";
import type { Prescription } from "@/types/type";

interface PrescriptionsModalProps {
  open: boolean;
  onClose: () => void;
  selectedPrescription: Prescription | null;
  onSave: (updatedPrescription: Prescription) => void;
  form: any;
}

const PrescriptionsModal: React.FC<PrescriptionsModalProps> = ({
  open,
  onClose,
  selectedPrescription,
  onSave,
  form,
}) => {
  useEffect(() => {
    if (selectedPrescription) {
      form.setFieldsValue(selectedPrescription);
    }
  }, [selectedPrescription, form]);

  const handleSave = () => {
    form.validateFields().then((values: Prescription) => {
      onSave(values);
    });
  };

  return (
    <Modal
      title={selectedPrescription ? "Edit Prescription" : "Add Prescription"}
      open={open}
      onCancel={onClose}
      footer={[
        <Button key="close" onClick={onClose}>
          Close
        </Button>,
        <Button key="save" type="primary" onClick={handleSave}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Prescription ID"
              name="prescription_id"
              rules={[
                {
                  required: true,
                  message: "Please input the prescription ID!",
                },
              ]}
            >
              <Input disabled={!!selectedPrescription} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Medicine Name" name="medicine_name">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Dosage" name="dosage">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Duration" name="duration">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Record ID"
          name="record_id"
          rules={[{ required: true, message: "Please input the record ID!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PrescriptionsModal;
