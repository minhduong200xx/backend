"use client";
import React, { useEffect } from "react";
import { Modal, Button, Form, Input, Row, Col, DatePicker } from "antd";
import moment from "moment";
import type { Medicine } from "@/types/type";

interface MedicinesDescModalProps {
  visible: boolean;
  onClose: () => void;
  selectedMedicine: Medicine | null;
  onSave: (updatedMedicine: Medicine) => void;
  form: any;
}

const MedicinesDescModal: React.FC<MedicinesDescModalProps> = ({
  visible,
  onClose,
  selectedMedicine,
  onSave,
  form,
}) => {
  useEffect(() => {
    if (selectedMedicine) {
      form.setFieldsValue({
        ...selectedMedicine,
        expiration_date: selectedMedicine.expiration_date
          ? moment(selectedMedicine.expiration_date)
          : null,
      });
    }
  }, [selectedMedicine, form]);

  const handleSave = () => {
    form.validateFields().then((values: any) => {
      const updatedMedicine = {
        ...values,
        expiration_date: values.expiration_date
          ? values.expiration_date.toISOString()
          : null,
      };
      onSave(updatedMedicine as Medicine);
    });
  };

  return (
    <Modal
      title={selectedMedicine ? "Edit Medicine" : "Add Medicine"}
      visible={visible}
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
              label="Medicine ID"
              name="medicine_id"
              rules={[
                { required: true, message: "Please input the medicine ID!" },
              ]}
            >
              <Input disabled={!!selectedMedicine} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Medicine Name"
              name="medicine_name"
              rules={[
                { required: true, message: "Please input the medicine name!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Quantity in Stock"
              name="quantity_in_stock"
              rules={[
                {
                  required: true,
                  message: "Please input the quantity in stock!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Price per Unit"
              name="price_per_unit"
              rules={[
                { required: true, message: "Please input the price per unit!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Expiration Date" name="expiration_date">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Supplier ID"
              name="supplier_id"
              rules={[
                { required: true, message: "Please input the supplier ID!" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default MedicinesDescModal;
