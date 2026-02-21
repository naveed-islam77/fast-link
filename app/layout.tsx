import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import React from "react";
import "./globals.css";
import { ReduxProvider } from "./providers";
import { Toaster } from "sonner";
import "nprogress/nprogress.css";
import RouteProgress from "@/components/RouteProgress";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FastLink - Premium Mobile Devices & Tablets",
  description:
    "Discover the latest FastLink smartphones, tablets, and accessories. Premium quality, innovative technology, and exceptional value.",
  generator: "v0.app",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <ReduxProvider>
          <Toaster richColors />
          <RouteProgress />
          {children}
        </ReduxProvider>
        <Analytics />
      </body>
    </html>
  );
}
