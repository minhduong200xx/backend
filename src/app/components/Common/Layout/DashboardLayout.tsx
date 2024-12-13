"use client";
import React, { useState } from "react";
import { FaCalendarPlus, FaUserDoctor } from "react-icons/fa6";
import { FcDepartment } from "react-icons/fc";
import { GiMedicines } from "react-icons/gi";
import { LuPackageOpen } from "react-icons/lu";
import {
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Dropdown, Avatar, message } from "antd";
import { useRouter, usePathname } from "next/navigation";
import BreadcrumbComponent from "../Breadcumb";
import { TbTruckDelivery } from "react-icons/tb";
import { FaPrescriptionBottleAlt } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import { useAuth } from "@/app/context/AuthProvider";
const { Header, Sider, Content } = Layout;
interface DashboardLayoutProps {
  children: React.ReactNode;
}
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();
  const pathname = usePathname();
  const navigate = (key: string) => {
    router.push(`/dashboard/${key}`);
  };
  const [messageApi, contextHolder] = message.useMessage();
  const { user, logOut } = useAuth();

  const selectedKey = pathname.replace("/dashboard/", "");
  const menu = (
    <Menu>
      <Menu.Item
        key="profile"
        style={{ paddingLeft: 30 }}
        onClick={() => router.push("/profile")}
      >
        Profile
      </Menu.Item>
      <Menu.Item
        key="settings"
        onClick={() => router.push("/settings")}
        style={{ paddingLeft: 30 }}
      >
        Settings
      </Menu.Item>
      <Menu.Item key="logout" onClick={logOut}>
        <Button type="link" icon={<IoIosLogOut />} className="text-red-500">
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      {user && user.role_id === 1 ? (
        <Layout style={{ height: "100vh", width: "100vw" }}>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[selectedKey]}
              onClick={(e) => navigate(e.key)}
              items={[
                {
                  key: "",
                  icon: <DashboardOutlined />,
                  label: "Dashboard",
                  style: {
                    fontSize: "18px",
                    color: "#fff",
                  },
                },
                {
                  key: "users",
                  icon: <UserOutlined />,
                  label: "Users",
                },
                {
                  key: "patients",
                  icon: <UserAddOutlined />,
                  label: "Patients",
                },
                {
                  key: "doctors",
                  icon: <FaUserDoctor />,
                  label: "Doctors",
                },
                {
                  key: "departments",
                  icon: <FcDepartment />,
                  label: "Departments",
                },
                {
                  key: "appointments",
                  icon: <FaCalendarPlus />,
                  label: "Appointments",
                },
                {
                  key: "medicines",
                  icon: <GiMedicines />,
                  label: "Medicines",
                },
                {
                  key: "stock-transactions",
                  icon: <LuPackageOpen />,
                  label: "Stock Transactions",
                },
                {
                  key: "suppliers",
                  icon: <TbTruckDelivery />,
                  label: "Suppliers",
                },
                {
                  key: "prescriptions",
                  icon: <FaPrescriptionBottleAlt />,
                  label: "Prescriptions",
                },
              ]}
            />

            <Button
              type="default"
              icon={<IoIosLogOut />}
              onClick={() => {
                logOut();
                router.push("/");
              }}
              style={{
                width: 100,
                marginLeft: 50,
                backgroundColor: "red",
                color: "white",
                border: "none",
              }}
            >
              Logout
            </Button>
          </Sider>
          <Layout>
            <Header
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 20,
                background: colorBgContainer,
              }}
            >
              <div className="header-left">
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
                <b
                  style={{
                    fontSize: "24px",
                  }}
                >
                  Dashboard
                </b>
              </div>
              <div className="header-right flex items-center justify-between gap-4">
                <h3>
                  Hello, <b className="text-blue-500">{user?.user_name}</b>
                </h3>
                <Dropdown
                  overlay={menu}
                  trigger={["click"]}
                  className="flex float-right"
                >
                  <Avatar
                    style={{ cursor: "pointer" }}
                    icon={<UserOutlined />}
                  />
                </Dropdown>
              </div>
            </Header>
            <BreadcrumbComponent />
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
                height: "100%",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {contextHolder}
              {children}
            </Content>
          </Layout>
        </Layout>
      ) : (
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <h1>
            You are not authorized to access this page. Please login as an admin
          </h1>
          <Button type="primary" onClick={() => router.push("/")}>
            Go to Home Page
          </Button>
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
