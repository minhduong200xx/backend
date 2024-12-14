"use client";
import React, { useEffect } from "react";
import { Modal, Form, Input, DatePicker, Button, FormInstance } from "antd";
import { useAuth } from "@/app/context/AuthProvider";
import { changeUserToPatient } from "@/app/lib/users";

interface BookingAppointmentModalProps {
  isModalVisible: boolean;
  handleCancel: () => void;
  handleFinish: (values: any) => void;
  form: FormInstance;
}

const BookingAppointmentModal: React.FC<BookingAppointmentModalProps> = ({
  isModalVisible,
  handleCancel,
  handleFinish,
  form,
}) => {
  const { user, getAuth } = useAuth();
  console.log(user);
  const setValues = async () => {
    if (user && user.role_id === 2) {
      await changeUserToPatient(user.user_id);
      await getAuth();
    }
    if (user) {
      form.setFieldValue("patient_id", user.patient_id);
      form.setFieldValue("first_name", user.first_name);
      form.setFieldValue("last_name", user.last_name);
    }
  };
  useEffect(() => {
    setValues();
  }, [user]);

  return (
    <Modal
      title="Book Appointment"
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
    >
      <Form name="booking-appointment" form={form} onFinish={handleFinish}>
        <Form.Item name="patient_id" label="Patient ID" hidden>
          <Input disabled />
        </Form.Item>
        <Form.Item name="first_name" label="First Name">
          <Input disabled />
        </Form.Item>
        <Form.Item name="last_name" label="Last Name">
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="appointmentDateTime"
          label="Appointment Date & Time"
          rules={[{ required: true, message: "Please select a date" }]}
        >
          <DatePicker
            showTime={{ format: "HH:mm" }}
            format="YYYY-MM-DD HH:mm"
          />
        </Form.Item>
        <Form.Item
          name="reason"
          label="Reason for Visit"
          rules={[{ required: true, message: "Please enter a reason" }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Book
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BookingAppointmentModal;
