import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import HomeView from "@/modules/home/ui/views/home-view";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Story Of Tassels",
  description: "Book services easily",
  icons: {
    icon: "/sslogo.png",
    shortcut: "/sslogo.png",
    apple: "/sslogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TRPCReactProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased mt-10`}
        >
          {children}
        </body>
      </html>
    </TRPCReactProvider>
  );
}
