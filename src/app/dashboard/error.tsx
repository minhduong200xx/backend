// Error boundaries must be Client Components
"use client";

import { useEffect } from "react";
import DashboardLayout from "../components/Common/Dashboard/DashboardLayout";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <DashboardLayout>
      <h2 className="text-center text-red-500">Something went wrong!</h2>
      {error.digest && (
        <p className="text-center text-gray-500">{error.digest}</p>
      )}
      <button
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => reset()
        }
      >
        Try again
      </button>
    </DashboardLayout>
  );
}
