"use client";
import React, { useEffect } from "react";
import { Modal, Button, Form, Input, Row, Col } from "antd";
import type { Supplier } from "@/app/types/type";

interface SupplierModalProps {
  open: boolean;
  onClose: () => void;
  selectedSupplier: Supplier | null;
  onSave: (updatedSupplier: Supplier) => void;
  form: any;
}

const SupplierModal: React.FC<SupplierModalProps> = ({
  open,
  onClose,
  selectedSupplier,
  onSave,
  form,
}) => {
  useEffect(() => {
    if (selectedSupplier) {
      form.setFieldsValue(selectedSupplier);
    }
  }, [selectedSupplier, form]);

  const handleSave = () => {
    form.validateFields().then((values: Supplier) => {
      onSave(values);
    });
  };

  return (
    <Modal
      title={selectedSupplier ? "Edit Supplier" : "Add Supplier"}
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
              label="Supplier ID"
              name="supplier_id"
              rules={[
                { required: true, message: "Please input the supplier ID!" },
              ]}
            >
              <Input disabled={!!selectedSupplier} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Supplier Name"
              name="supplier_name"
              rules={[
                { required: true, message: "Please input the supplier name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Contact Person" name="contact_person">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Phone Number" name="phone_number">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Email" name="email">
          <Input />
        </Form.Item>
        <Form.Item label="Address" name="address">
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SupplierModal;
