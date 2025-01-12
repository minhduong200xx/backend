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
  CalendarFilled,
  LogoutOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import { useAuth } from "@/context/AuthProvider";
import FooterSection from "../../Pages/HomePage/FooterSection";
import Loading from "@/app/loading";
const { Header, Content, Footer } = Layout;

const HomePageLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, logOut, loading } = useAuth();

  return loading ? (
    <Loading />
  ) : (
    <Layout className="flex flex-col min-h-screen">
      <Header
        className="flex justify-between items-center bg-blue-900 px-6"
        style={{ backgroundColor: "#2563eb" }}
      >
        <div className="text-white text-2xl font-bold">eClinic</div>
        <Menu
          mode="horizontal"
          className="flex-1"
          style={{ backgroundColor: "#2563eb", padding: "0 20px" }}
        >
          <Menu.Item key="1" icon={<HomeOutlined style={{ color: "white" }} />}>
            <Link
              style={{
                color: "white",
                fontWeight: 600,
              }}
              href="/"
            >
              Home
            </Link>
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={
              <InfoCircleOutlined
                style={{
                  color: "white",
                  fontWeight: 600,
                }}
              />
            }
          >
            <Link
              href="/about"
              style={{
                color: "white",
                fontWeight: 600,
              }}
            >
              About
            </Link>
          </Menu.Item>

          <Menu.Item
            key="3"
            icon={
              <UserOutlined
                style={{
                  color: "white",
                  fontWeight: 600,
                }}
              />
            }
          >
            <Link
              href="/doctors"
              style={{
                color: "white",
                fontWeight: 600,
              }}
            >
              Doctor
            </Link>
          </Menu.Item>
          <Menu.Item
            key="4"
            icon={
              <CalendarOutlined
                style={{
                  color: "white",
                  fontWeight: 600,
                }}
              />
            }
          >
            <Link
              href="/booking-appointment"
              style={{
                color: "white",
                fontWeight: 600,
              }}
            >
              Appointment
            </Link>
          </Menu.Item>
          {user && user.role_id !== 1 && (
            <Menu.Item
              key="5"
              icon={
                <CalendarFilled
                  style={{
                    color: "white",
                    fontWeight: 600,
                  }}
                />
              }
            >
              <Link
                href="/my-appointment"
                style={{
                  color: "white",
                  fontWeight: 600,
                }}
              >
                My Appointment
              </Link>
            </Menu.Item>
          )}
        </Menu>
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center">
              <div className="text-white">
                Hello, <b>{user?.user_name}</b>
              </div>
              <Menu
                mode="horizontal"
                style={{ backgroundColor: "#2563eb", color: "white" }}
              >
                <Menu.SubMenu
                  icon={
                    <Avatar
                      src={user?.image}
                      style={{
                        backgroundColor: "white",
                        padding: "3px",
                      }}
                    />
                  }
                >
                  {user?.role_id === 1 && (
                    <Menu.Item
                      key="/dashboard"
                      icon={
                        <DashboardFilled
                          style={{
                            fontWeight: 600,
                          }}
                        />
                      }
                    >
                      <Link
                        href="/dashboard"
                        style={{
                          fontWeight: 600,
                        }}
                      >
                        Dashboard
                      </Link>
                    </Menu.Item>
                  )}
                  <Menu.Item
                    key="profile"
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    <Link
                      href="/profile"
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      Profile
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="app"
                    style={{
                      fontWeight: 600,
                    }}
                  >
                    <Link
                      href="/my-appointment"
                      style={{
                        fontWeight: 600,
                      }}
                    >
                      My Appointment
                    </Link>
                  </Menu.Item>
                  <Menu.Item
                    key="logout"
                    onClick={() => {
                      logOut();
                      console.log(user);
                    }}
                  >
                    <Link
                      href="/"
                      style={{
                        color: "red",
                        fontWeight: 600,
                      }}
                    >
                      Logout <LogoutOutlined />
                    </Link>
                  </Menu.Item>
                </Menu.SubMenu>
              </Menu>
            </div>
          ) : (
            <>
              <Button type="default">
                <Link
                  href="/login"
                  style={{
                    fontWeight: 600,
                    color: "#2563eb",
                  }}
                >
                  Login
                </Link>
              </Button>
              <Button type="primary" style={{ backgroundColor: "#16a34a" }}>
                <Link
                  href="/register"
                  style={{
                    fontWeight: 600,
                  }}
                >
                  Register
                </Link>
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
