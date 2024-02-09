"use client";

import Sidebar from "@/components/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next";
import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Modal from "react-modal";
import "./globals.css";

const queryClient = new QueryClient();

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathName = usePathname();
  const getCurrentUserRole = async () => {
    try {
      const res = await getCurrentUser();
      return res.roles;
    } catch (error) {
      console.log(error);
    }
  };
  const [role, setrole] = useState("USER_ROLES");
  useEffect(() => {
    getCurrentUserRole().then((res) => {
      setrole(res);
    });
    Modal.setAppElement("#htmlParrent");
  }, []);
  return (
    <html lang="en" id="htmlParrent">
      <QueryClientProvider client={queryClient}>
        <body className={inter.className}>
          <div
            className={`min-h-screen flex flex-col flex-auto flex-shrink-0 antialiased bg-gray-50 text-gray-800 ${
              pathName === "/login" ? "" : "pl-64"
            }`}
          >
            {pathName === "/login" ? null : (
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
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <div className="ml-4 hover:text-gray-600 hover:bg-gray-200 p-2 rounded-full">
                        <button
                          onClick={() => {
                            deleteCookie("token");
                            window.location.href = "/login";
                          }}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {pathName === "/login" ? null : <Sidebar role={role} />}

            <main>{children}</main>
          </div>
          <Toaster />
        </body>
      </QueryClientProvider>
    </html>
  );
}
