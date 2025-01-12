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
import { useAuth } from "@/context/AuthProvider";
const { Header, Sider, Content } = Layout;
interface DashboardLayoutProps {
  children: React.ReactNode;
  type: "doctor" | "admin";
}
const adminItems = [
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
];
const doctorItems = [
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
    key: "patients",
    icon: <UserAddOutlined />,
    label: "Patients",
  },
  {
    key: "appointments",
    icon: <FaCalendarPlus />,
    label: "Appointments",
  },
  {
    key: "schedule",
    icon: <FaCalendarPlus />,
    label: "Your Schedule",
  },
];
const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  type,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const router = useRouter();
  const pathname = usePathname();
  const navigate = (key: string) => {
    router.push(`/${type}-dashboard/${key}`);
  };
  const { user, logOut, loading } = useAuth();
  const role_id = type === "admin" ? 1 : 4;

  if (loading) {
    return <div>Loading...</div>;
  }

  const selectedKey = pathname.replace(`/${type}-dashboard/`, "");

  return (
    <div>
      {user && user.role_id === role_id ? (
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            breakpoint="lg"
            collapsedWidth="0"
          >
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={[selectedKey]}
              onClick={(e) => navigate(e.key)}
              items={type === "admin" ? adminItems : doctorItems}
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
                  {type === "admin" ? "Admin" : "Doctor"} Dashboard
                </b>
              </div>
              <div className="header-right flex items-center justify-between gap-4">
                <Button
                  type="link"
                  icon={<IoIosLogOut />}
                  className="text-red-500"
                  onClick={logOut}
                >
                  Logout
                </Button>
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
      ) : (
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <h1 className="p-4">
            You are not authorized to access this page. Please login as a {type}
            .
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
