import Link from "next/link";
import DashboardLayout from "../../components/Common/Layout/DashboardLayout";

export default function NotFound() {
  return (
    <DashboardLayout>
      <h2 className="text-xl font-semibold">404 Not Found</h2>
      <p>Could not find the requested invoice.</p>
      <Link
        href="/dashboard/invoices"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Go Back
      </Link>
    </DashboardLayout>
  );
}
