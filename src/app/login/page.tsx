"use client";
import React, { useState } from "react";
import { Modal, Button, Form, Input, message, Image } from "antd";
import ReCAPTCHA from "react-google-recaptcha";
import { signIn, useSession } from "next-auth/react";

import { useAuth } from "../../context/AuthProvider";
import { useAppContext } from "../../context/AppProvider";

const LoginModal: React.FC = () => {
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const { logIn, user } = useAuth();
  const { messageApi } = useAppContext();
  const onFinish = async (values: any) => {
    if (!captchaValue) {
      messageApi.open({
        type: "warning",
        content: "Please complete the captcha challenge.",
        duration: 2,
      });
      return;
    }

    try {
      await logIn(values.email, values.password);
      window.location.href = "/";
    } catch (error: any) {
      if (error.response?.status === 403) {
        messageApi.open({
          type: "error",
          content: "Your account is inactive. Please contact the admin.",
          duration: 2,
        });
      } else {
        messageApi.open({
          type: "error",
          content: "Invalid email or password. Please try again.",
          duration: 2,
        });
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-gradient-to-tr from-blue-200 to-slate-100 "
      style={{
        backgroundImage: `url("/good.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {user ? (
        <div className="text-center">
          <p>You have already logged in.</p>
          <Button type="primary" href="/">
            Go to Home
          </Button>
        </div>
      ) : (
        <div className="flex flex-row justify-center items-center gap-10 ">
          <h1 className="text-9xl text-white font-bold">Welcome Back!</h1>
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
            <Form
              name="login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  { type: "email", message: "The input is not valid E-mail!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item className="flex justify-center">
                <ReCAPTCHA
                  sitekey="6LfbbpQqAAAAACYVEDogo3shgdhpPdZXODyP0rPv"
                  onChange={onCaptchaChange}
                />
              </Form.Item>

              <Form.Item className="flex justify-center">
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
            </Form>
            <div className="text-center mt-4">
              <p>
                Don&apos;t have an account?{" "}
                <a href="/register" className="text-blue-500">
                  Register here
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginModal;
