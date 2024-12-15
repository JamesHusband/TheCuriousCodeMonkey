"use client";

import Link from "next/link";
import { Navigation } from "@/features/navigation/Navigation";
import { getAssetPath } from "@/lib/utils";

export function Sidebar() {
  return (
    <div className="fixed inset-y-0 left-0 w-1/6 min-h-screen">
      <aside className="min-h-screen bg-gray-800 text-white flex flex-col">
        {/* Fixed Header */}
        <div className="shrink-0 p-3 bg-red-700">
          <Link href={getAssetPath("/home")}>
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-kPKtHawIQ4HnJREMS9NfnjEqidHyqh.png"
              alt="Monkey Logo"
              className="w-12 h-12 rounded-full mx-auto"
            />
          </Link>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-3">
            <Navigation />
          </div>
        </div>
      </aside>
    </div>
  );
}
