"use client";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, Col, Row } from "antd";
import { User } from "@/types/type";

interface UserProfileModalProps {
  open: boolean;
  onClose: () => void;
  selectedUser: User | null;
  onSave: (updatedUser: User) => void;
}

const UserProfileModal: React.FC<UserProfileModalProps> = ({
  open,
  onClose,
  selectedUser,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue(selectedUser);
    }
  }, [selectedUser, form]);

  const handleSave = () => {
    form.validateFields().then((values) => {
      onSave(values as User);
      setIsEditing(false);
    });
  };

  return (
    <Modal
      title="User Profile"
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
      {selectedUser && (
        <Form form={form} layout="horizontal">
          <Row gutter={16}>
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
          </Row>
          <Row gutter={16}>
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
            <Col span={12}>
              <Form.Item
                label="User Name"
                name="user_name"
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
                label="Role"
                name="role_id"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input disabled={!isEditing} style={{ color: "black" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Status"
                name="status"
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
        </Form>
      )}
    </Modal>
  );
};

export default UserProfileModal;
