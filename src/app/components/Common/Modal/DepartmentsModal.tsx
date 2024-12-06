// src/components/DepartmentsModal.tsx
import React, { useEffect } from "react";
import { Modal, Form, Input, Row, Col, Button, FormInstance } from "antd";
import { Department } from "@/app/types/type";

interface DepartmentsModalProps {
  open: boolean;
  onClose: () => void;
  selectedDepartment: Department | null;
  onSave: (updatedDepartment: Department) => void;
  form: FormInstance;
}

const DepartmentsModal: React.FC<DepartmentsModalProps> = ({
  open,
  onClose,
  selectedDepartment,
  onSave,
  form,
}) => {
  useEffect(() => {
    if (selectedDepartment) {
      form.setFieldsValue(selectedDepartment);
    } else {
      form.resetFields();
    }
  }, [selectedDepartment, form]);

  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave(values as Department);
      onClose();
      return values;
    });
  };
  return (
    <Modal
      title={selectedDepartment ? "Edit Department" : "Add Department"}
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
              label="Department ID"
              name="department_id"
              rules={[
                { required: true, message: "Please input the department ID!" },
              ]}
            >
              <Input disabled={!!selectedDepartment} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Department Name"
              name="department_name"
              rules={[
                {
                  required: true,
                  message: "Please input the department name!",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Description" name="description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DepartmentsModal;
