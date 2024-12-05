import { Card, Statistic } from "antd";

const DashboardStats = () => (
  <div style={{ display: "flex", gap: "16px" }}>
    <Card>
      <Statistic title="Active Users" value={1128} />
    </Card>
    <Card>
      <Statistic title="Orders" value={93} />
    </Card>
  </div>
);

export default DashboardStats;
