'use client'

import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { usePathname } from "next/navigation";
import Sidebar from "@/components/sidebar";


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  const pathName = usePathname();
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className={`min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800 ${pathName === "/login" ? "" : "pl-64"}`}>
          <div className="h-14  bg-gray-300">

          </div>
          {pathName === "/login" ? null : (

            <Sidebar />
          )}

          <main>{children}</main>
        </div>
        <Toaster />
      </body>

    </html>
  );
}
