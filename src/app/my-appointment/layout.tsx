import HomePageLayout from "../components/Common/Layout/HomePageLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <HomePageLayout>{children}</HomePageLayout>;
}
