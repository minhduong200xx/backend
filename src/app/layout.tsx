"use client";
import localFont from "next/font/local";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";

import { Suspense, useState } from "react";
import Loading from "./loading";
import { AuthProvider } from "../context/AuthProvider";
import { AppProvider } from "../context/AppProvider";
import { SWRConfig } from "swr";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SWRConfig
          value={{
            refreshInterval: 3000,
            fetcher: (resource, init) =>
              fetch(resource, init).then((res) => res.json()),
          }}
        >
          <AppProvider>
            <AuthProvider>
              <Suspense fallback={<Loading />}>
                <AntdRegistry>{children}</AntdRegistry>
              </Suspense>
            </AuthProvider>
          </AppProvider>
        </SWRConfig>
      </body>
    </html>
  );
}
