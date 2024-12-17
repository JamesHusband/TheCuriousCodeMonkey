"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Toolbar } from "@/lib/components/toolbar";
import Link from "next/link";
import { getAssetPath } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-gray-800 border-b border-gray-700 flex items-center justify-between px-4 z-50">
        <Link href={getAssetPath("/home")} className="flex items-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-kPKtHawIQ4HnJREMS9NfnjEqidHyqh.png"
            alt="Monkey Logo"
            className="w-8 h-8 rounded-full"
          />
          <span className="ml-3 font-semibold text-lg">Code Monkey</span>
        </Link>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </header>

      {/* Desktop Sidebar */}
      <aside
        className={`fixed top-0 right-0 h-screen w-[280px] bg-gray-800 border-l border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:left-0 lg:border-r lg:border-l-0 lg:w-64 z-40 ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        }`}
      >
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </aside>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="pt-16 lg:pt-0 lg:pl-64 min-h-screen pb-12 transition-all duration-300">
        <div className="p-4 sm:p-6 md:p-8">{children}</div>
      </main>

      <Toolbar />
    </div>
  );
}
