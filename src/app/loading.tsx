import { Flex, Spin } from "antd";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex justify-center items-center h-screen">
      <Spin size="large" />
    </div>
  );
}
