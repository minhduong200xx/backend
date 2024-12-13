"use client";
import { Button } from "antd";
import DashboardLayout from "../components/Common/Layout/DashboardLayout";
import { useAuth } from "../context/AuthProvider";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();
  const router = useRouter();
  return (
    <DashboardLayout>
      {user ? (
        children
      ) : (
        <div className="flex flex-col items-center justify-center h-screen text-center">
          <h1>You must login to access this page</h1>
          <Button type="primary" onClick={() => router.push("/login")}>
            Go to Login Page
          </Button>
        </div>
      )}
    </DashboardLayout>
  );
}
