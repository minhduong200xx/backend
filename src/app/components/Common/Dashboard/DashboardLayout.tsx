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
import { Button, Layout, Menu, theme, Dropdown, Avatar } from "antd";
import { useRouter, usePathname } from "next/navigation";
import BreadcrumbComponent from "../Breadcumb";
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
  const selectedKey = pathname.replace("/dashboard/", "");
  const menu = (
    <Menu>
      <Menu.Item key="profile" onClick={() => router.push("/profile")}>
        Profile
      </Menu.Item>
      <Menu.Item key="settings" onClick={() => router.push("/settings")}>
        Settings
      </Menu.Item>
      <Menu.Item key="logout" onClick={() => router.push("/logout")}>
        <b className="text-red-500">Logout</b>
      </Menu.Item>
    </Menu>
  );
  return (
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
              key: "appointment",
              icon: <FaCalendarPlus />,
              label: "Appointment",
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
          ]}
        />
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
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
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
              Hello, <b className="text-blue-500">Admin</b>
            </h3>
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              className="flex float-right"
            >
              <Avatar style={{ cursor: "pointer" }} icon={<UserOutlined />} />
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
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
