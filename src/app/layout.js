"use client";

import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Modal from "react-modal";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathName = usePathname();
  useEffect(() => {
    Modal.setAppElement("#htmlParrent");
  }, []);
  return (
    <html lang="en" id="htmlParrent">
      <body className={inter.className}>
        <div
          className={`min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800 ${
            pathName === "/login" ? "" : "pl-64"
          }`}
        >
          <div className="h-14  bg-gray-100">
            <div className="flex items-center justify-between h-full px-6 border-b">
              <div className="flex items-center">
                <div className="text-2xl font-semibold ">
                  {pathName === "/"
                    ? "Dashboard"
                    : pathName.replace("/", "").charAt(0).toUpperCase() +
                      pathName.slice(2)}
                </div>
              </div>
              {pathName === "/login" ? null : (
                <div className="flex items-center">
                  <div className="flex items-center">
                    <div className="ml-4 hover:text-gray-600 hover:bg-gray-200 p-2 rounded-full">
                      <button>Logout</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {pathName === "/login" ? null : <Sidebar />}

          <main>{children}</main>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
