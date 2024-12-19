"use client";

import Link from "next/link";
import { Navigation } from "@/lib/components/navigation/Navigation";
import { getAssetPath } from "@/lib/utils";

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  return (
    <div className="h-full w-full">
      <aside className="h-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white flex flex-col">
        {/* Fixed Header - Only visible on desktop */}
        <div className="hidden lg:block shrink-0 p-4 bg-red-600 dark:bg-red-700">
          <Link href={getAssetPath("/")} className="block">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-kPKtHawIQ4HnJREMS9NfnjEqidHyqh.png"
              alt="Monkey Logo"
              className="w-12 h-12 rounded-full mx-auto"
            />
          </Link>
        </div>

        {/* Mobile Menu Header - Only visible on mobile */}
        <div className="lg:hidden shrink-0 p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">Navigation</h2>
        </div>

        {/* Scrollable Navigation with touch support */}
        <div className="flex-1 overflow-y-auto overscroll-contain touch-pan-y">
          <nav className="p-4" onClick={onClose}>
            <Navigation />
          </nav>
        </div>
      </aside>
    </div>
  );
}
