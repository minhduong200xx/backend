"use client";
import React, { useEffect } from "react";
import { Layout, Menu, Button, Avatar } from "antd";
import {
  HomeOutlined,
  InfoCircleOutlined,
  TeamOutlined,
  UserOutlined,
  BookOutlined,
  DashboardFilled,
  CalendarOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import { useAuth } from "@/app/context/AuthProvider";
import FooterSection from "../../Pages/HomePage/FooterSection";
import Loading from "@/app/loading";
const { Header, Content, Footer } = Layout;

const HomePageLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, getAuth, logOut, loading } = useAuth();
  useEffect(() => {
    getAuth();
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <Layout className="flex flex-col min-h-screen">
      <Header className="flex justify-between items-center bg-blue-900 px-6">
        <div className="text-white text-2xl font-bold">eClinic</div>
        <Menu theme="dark" mode="horizontal" className="flex-1">
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link href="/">Home</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<InfoCircleOutlined />}>
            <Link href="/about">About</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<TeamOutlined />}>
            <Link href="/forum">Forum</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UserOutlined />}>
            <Link href="/doctors">Doctor</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<BookOutlined />}>
            <Link href="/blog">Blog</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<CalendarOutlined />}>
            <Link href="/booking-appointment">Appointment</Link>
          </Menu.Item>
        </Menu>
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center gap-4">
              <Avatar
                icon={<UserOutlined />}
                style={{ backgroundColor: "white", color: "black" }}
              />
              <div className="text-white">
                Hello, <b>{user?.user_name}</b>
              </div>
              <Menu mode="horizontal" theme="dark">
                <Menu.SubMenu key="SubMenu" title="Account">
                  {user?.role_id === 1 && (
                    <Menu.Item key="6" icon={<DashboardFilled />}>
                      <Link href="/dashboard">Dashboard</Link>
                    </Menu.Item>
                  )}
                  <Menu.Item key="profile">
                    <Link href="/profile">Profile</Link>
                  </Menu.Item>
                  <Menu.Item key="settings">
                    <Link href="/settings">Settings</Link>
                  </Menu.Item>
                  <Menu.Item
                    key="logout"
                    onClick={() => {
                      logOut();
                      console.log(user);
                    }}
                  >
                    <Link href="/">Logout</Link>
                  </Menu.Item>
                </Menu.SubMenu>
              </Menu>
            </div>
          ) : (
            <>
              <Button type="primary">
                <Link href="/login">Login</Link>
              </Button>
              <Button type="primary" style={{ backgroundColor: "green" }}>
                <Link href="/register">Register</Link>
              </Button>
            </>
          )}
        </div>
      </Header>
      <Content className="flex-1 bg-gray-100">
        <div className="bg-white rounded-lg shadow-md">{children}</div>
      </Content>
      <FooterSection />
    </Layout>
  );
};

export default HomePageLayout;
