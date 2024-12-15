"use client";

import { Sidebar } from "./Sidebar";
import { Toolbar } from "@/lib/components/toolbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Fixed Sidebar */}
      <aside className="fixed top-0 left-0 w-1/6 h-screen bg-black border-r border-gray-800">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="pl-[16.67%] min-h-screen pb-12">
        <div className="p-8">{children}</div>
      </main>

      <Toolbar />
    </div>
  );
}
