"use client";
import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  message,
  Image,
  Row,
  Col,
} from "antd";
import { getDoctorById } from "../../lib/doctors";
import { Doctor } from "../../types/type";
import moment from "moment";
import { bookingAppointment } from "@/app/lib/patients";
import { useParams, useRouter } from "next/navigation";
import Loading from "@/app/loading";

import { CheckCircleFilled, InfoCircleOutlined } from "@ant-design/icons";
import { useAuth } from "@/app/context/AuthProvider";
import { changeUserToPatient } from "@/app/lib/users";

export default function DoctorDetailsPage() {
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const params = useParams();
  const [slotTime, setSlotTime] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const { user, getAuth } = useAuth();
  const setValues = async () => {
    if (user && user.role_id === 2) {
      await changeUserToPatient(user.user_id);
      await getAuth();
    }
    if (user) {
      form.setFieldValue("patient_id", user.patient_id);
      form.setFieldValue("first_name", user.first_name);
      form.setFieldValue("last_name", user.last_name);
      form.setFieldValue("doctor_id", doctor?.doctor_id);
      form.setFieldValue("amount", doctor?.fees);
    }
  };

  useEffect(() => {
    const fetchDoctor = async () => {
      if (params.id) {
        try {
          const response = await getDoctorById(
            Array.isArray(params.id) ? params.id[0] : params.id
          );
          setDoctor(response.data);
        } catch (error) {
          console.error("Error fetching doctor details:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDoctor();
  }, [params.id]);

  const showModal = async () => {
    if (!user) {
      messageApi.warning("Please login to book an appointment.");
    }

    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const isSlotAvailable = (checkTime: string) => {
    return !doctor?.slot_booked.some((slot) => {
      const slotMoment = moment(slot);
      const checkMoment = moment(checkTime);
      return Math.abs(checkMoment.diff(slotMoment, "minutes")) < 60;
    });
  };
  const handleCheckSlot = async () => {
    await setValues();
    if (!user) {
      messageApi.warning("Please login to check slots.");
    } else {
      if (slotTime && isSlotAvailable(slotTime)) {
        messageApi.success(
          "Selected slot is available. You can book an appointment."
        );

        showModal();
      } else {
        messageApi.error(
          "Selected slot is not available. Please choose another time."
        );
      }
    }
  };
  const handleFinish = async (values: any) => {
    console.log("values", values);
    try {
      if (doctor?.doctor_id !== undefined) {
        await bookingAppointment(values);
        messageApi.success("Appointment booked successfully!");
        setIsModalVisible(false);
        router.push("/my-appointment");
      } else {
        messageApi.error("Error booking appointment.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
      message.error("Failed to book appointment.");
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!doctor) {
    return <div>Doctor not found.</div>;
  }

  return (
    <div className="p-8">
      {contextHolder}
      <div className="flex flex-col sm:flex-row gap-4">
        <Image src={"/img1.jpeg"} width={400} className="rounded-xl" />
        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 sm:mt-0 mt-[-80px]">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {doctor.first_name + " " + doctor.last_name}
            <CheckCircleFilled
              style={{
                color: "green",
                backgroundColor: "white",
              }}
            />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {doctor.degree} - {doctor.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs text-blue-500  rounded-full">
              {doctor.experience_years + " years experience"}
            </button>
          </div>

          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About
              <InfoCircleOutlined />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {doctor.about}
            </p>
          </div>
          <p className=" font-medium mt-4">
            Appointment fee:{" "}
            <span className="text-red-500">
              {"$"}
              {doctor.fees}
            </span>
          </p>
        </div>
      </div>

      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <Form name="booking-appointment" form={form}>
          <Row gutter={16}>
            <Col span={10}>
              <Form.Item
                name="appointment_date_time"
                label="Chose An Appointment Date & Time"
                rules={[
                  { required: true, message: "Please select a date and time" },
                ]}
              >
                <DatePicker
                  showTime={{ format: "HH:mm" }}
                  format="YYYY-MM-DD HH:mm"
                  onChange={(date) => {
                    form.setFieldValue("appointmentDateTime", date),
                      setSlotTime(date ? date.format("YYYY-MM-DD HH:mm") : "");
                  }}
                  className="text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer border border-gray-400 w-full mt-4"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Button
                type="primary"
                onClick={handleCheckSlot}
                className="text-white text-sm font-light rounded-full"
                style={{ backgroundColor: "green" }}
              >
                Check Availability
              </Button>
            </Col>
          </Row>
        </Form>

        <Button
          type="primary"
          onClick={showModal}
          className="bg-primary text-white text-sm font-light  rounded-full "
        >
          Book an Appointment
        </Button>
      </div>

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
          <Form.Item name="doctor_id" label="Doctor ID" hidden>
            <Input disabled />
          </Form.Item>
          <Form.Item name="amount" label="Amount">
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="appointment_date_time"
            label="Appointment Date & Time"
            rules={[{ required: true, message: "Please select a date" }]}
          >
            <DatePicker
              showTime={{ format: "HH:mm" }}
              format="YYYY-MM-DD HH:mm"
            />
          </Form.Item>
          <Form.Item
            name="reason_for_visit"
            label="Reason for Visit"
            rules={[{ required: true, message: "Please enter a reason" }]}
          >
            <Input.TextArea placeholder="Ex: Check Over Health" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Book
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
