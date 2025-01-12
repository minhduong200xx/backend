"use client";
import React, { useEffect } from "react";
import { Modal, Button, Form, Input, Row, Col, DatePicker, Select } from "antd";
import moment from "moment";
import type { Appointment } from "@/types/type";

interface AppointmentsModalProps {
  visible: boolean;
  onClose: () => void;
  selectedAppointment: Appointment | null;
  onSave: (updatedAppointment: Appointment) => void;
  form: any;
}

const { Option } = Select;

const AppointmentsModal: React.FC<AppointmentsModalProps> = ({
  visible,
  onClose,
  selectedAppointment,
  onSave,
  form,
}) => {
  useEffect(() => {
    if (selectedAppointment) {
      form.setFieldsValue({
        ...selectedAppointment,
        appointment_date_time: selectedAppointment.appointment_date_time
          ? moment(selectedAppointment.appointment_date_time)
          : null,
        doctor_name:
          selectedAppointment.doctor?.first_name +
          " " +
          selectedAppointment.doctor?.last_name,
        patient_name:
          selectedAppointment.patient?.first_name +
          " " +
          selectedAppointment.patient?.last_name,
      });
    }
  }, [selectedAppointment, form]);

  const handleSave = () => {
    form.validateFields().then((values: any) => {
      const updatedAppointment = {
        ...values,
        appointment_date: values.appointment_date
          ? values.appointment_date.toISOString()
          : null,
      };
      onSave(updatedAppointment as Appointment);
    });
  };

  return (
    <Modal
      title={selectedAppointment ? "Edit Appointment" : "Add Appointment"}
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
              label="Appointment ID"
              name="appointment_id"
              rules={[
                { required: true, message: "Please input the appointment ID!" },
              ]}
            >
              <Input disabled={!!selectedAppointment} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Appointment Date"
              name="appointment_date_time"
              rules={[
                {
                  required: true,
                  message: "Please input the appointment date!",
                },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Reason for Visit" name="reason_for_visit">
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: "Please select the status!" }]}
        >
          <Select>
            <Option value="Scheduled">Scheduled</Option>
            <Option value="Completed">Completed</Option>
            <Option value="Cancelled">Cancelled</Option>
          </Select>
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Patient Name"
              name="patient_name"
              rules={[
                { required: true, message: "Please input the patient ID!" },
              ]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Doctor Name"
              name="doctor_name"
              rules={[
                { required: true, message: "Please input the doctor ID!" },
              ]}
            >
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AppointmentsModal;
