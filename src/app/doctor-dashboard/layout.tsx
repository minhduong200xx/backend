"use client";
import { Button } from "antd";

import { useAuth } from "../../context/AuthProvider";
import { useRouter } from "next/navigation";
import { lazy } from "react";
const DashboardLayout = lazy(
  () => import("../../components/Common/Layout/DashboardLayout")
);
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  return (
    <DashboardLayout type="doctor">
      {user && user.role_id === 4
        ? children
        : !loading && (
            <div className="flex flex-col items-center justify-center h-screen text-center">
              <h1>You must login as doctor to access this page</h1>
              <Button type="primary" onClick={() => router.push("/login")}>
                Go to Login Page
              </Button>
            </div>
          )}
    </DashboardLayout>
  );
}
