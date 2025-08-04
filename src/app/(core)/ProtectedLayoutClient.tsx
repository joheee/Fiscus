// Location: app/(protected)/ProtectedLayoutClient.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { deleteSession } from "../lib/session";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
// We'll need a logout action

// Define the type for the session prop for clarity
type UserSession = {
  user_id: string;
  full_name: string;
  email: string;
};

// --- Sidebar Component ---
function Sidebar({
  isOpen,
  closeSidebar,
}: {
  isOpen: boolean;
  closeSidebar: () => void;
}) {
  return (
    <aside
      className={`absolute left-0 top-0 z-20 h-screen w-64 bg-background shadow-md transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-6">
        <h1 className="text-2xl font-bold ">Fiscus</h1>
        <button onClick={closeSidebar} className="text-gray-600 md:hidden">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
      <nav className="mt-6">
        <Link
          href="/expense"
          onClick={closeSidebar}
          className="block py-2.5 px-6  hover:bg-gray-100"
        >
          Expenses
        </Link>
        <Link
          href="/label"
          onClick={closeSidebar}
          className="block py-2.5 px-6  hover:bg-gray-100"
        >
          Labels
        </Link>
        <Link
          href="/analytic"
          onClick={closeSidebar}
          className="block py-2.5 px-6  hover:bg-gray-100"
        >
          Analytics
        </Link>
      </nav>
    </aside>
  );
}

// --- Navbar Component ---
function Navbar({
  session,
  toggleSidebar,
}: {
  session: UserSession;
  toggleSidebar: () => void;
}) {
  const handleLogout = async () => {
    await deleteSession();
    window.location.href = "/login";
  };

  return (
    <header className="w-full rounded-lg bg-background p-6 shadow-md">
      <div className="flex items-center justify-between">
        {/* Hamburger Menu for Mobile */}
        <button onClick={toggleSidebar} className=" md:hidden">
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http:
            //www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>

        {/* Search Bar (Placeholder) */}
        <div className="hidden md:block"></div>

        {/* User Info and Logout */}
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={handleLogout}>
            Logout {session.full_name}
            <LogOut className="mr-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}

// --- Main Client Layout Component ---
export default function ProtectedLayoutClient({
  session,
  children,
}: {
  session: UserSession;
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen bg-blue-accent">
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
      <div className="flex flex-1 flex-col min-w-0">
        <div className="p-6">
          <Navbar session={session} toggleSidebar={toggleSidebar} />
        </div>
        <main className="flex-1 overflow-y-auto p-6">
          {/* This is where your page content will be rendered */}
          <div className="rounded-lg bg-background p-4 shadow-md">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
