"use client";
import React, { useState } from "react";
import { Calendar, Badge, Modal, List, Typography, BadgeProps } from "antd";
import { Appointment } from "@/types/type";
import useSWR from "swr";
import axios from "axios";
import { useAuth } from "@/context/AuthProvider";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Schedule: React.FC = () => {
  const { user } = useAuth();
  const url = `/api/appointments/doctors/${user?.doctor_id}`;
  const { data: appointments = [] } = useSWR(url, fetcher);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setModalVisible(true);
  };

  const getListData = (value: Date) => {
    const filteredAppointments = appointments.filter(
      (appointment: Appointment) => {
        const appointmentDate = appointment.appointment_date_time
          ? new Date(appointment.appointment_date_time)
          : new Date();

        return (
          appointmentDate.getFullYear() === value.getFullYear() &&
          appointmentDate.getMonth() === value.getMonth() &&
          appointmentDate.getDate() === value.getDate()
        );
      }
    );

    return filteredAppointments.map((appointment: Appointment) => ({
      type: appointment.cancelled
        ? "error"
        : appointment.isCompleted
        ? "success"
        : "processing",
      content: `${
        appointment.appointment_date_time
          ? new Date(appointment.appointment_date_time)
              .toISOString()
              .slice(11, 16)
          : ""
      } - ${appointment.patient.first_name} ${
        appointment.patient.last_name
      } - ${appointment.reason_for_visit}`,
    }));
  };

  const dateCellRender = (value: { toDate: () => Date }) => {
    const listData = getListData(value.toDate());
    return (
      <ul className="events">
        {listData.map((item, index) => (
          <li key={index}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
            />
          </li>
        ))}
      </ul>
    );
  };

  const renderModalContent = () => {
    if (!selectedDate) return null;

    const listData = getListData(selectedDate);
    return (
      <List
        dataSource={listData}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text>{item.content}</Typography.Text>
          </List.Item>
        )}
      />
    );
  };

  return (
    <div>
      <Calendar
        dateCellRender={dateCellRender}
        onSelect={(value) => handleDateSelect(value.toDate())}
      />
      <Modal
        title={`Appointments on ${selectedDate?.toDateString()}`}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {renderModalContent()}
      </Modal>
    </div>
  );
};

export default Schedule;
