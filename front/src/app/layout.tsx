"use client"

import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/header";
import Footer from "../components/footer";
import { AuhtProvider } from "@/providers/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ToastContainer/>
        <AuhtProvider>
          <Header />
          <div className="h-full">{children}</div>
          <Footer />
        </AuhtProvider>
      </body>
    </html>
  );
}
