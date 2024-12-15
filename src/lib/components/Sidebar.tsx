"use client";

import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { getAssetPath } from "@/lib/utils";

export function Sidebar() {
  return (
    <aside className="h-screen bg-gray-800 text-white flex flex-col">
      {/* Fixed Header */}
      <div className="flex-none p-6 bg-red-700">
        <Link href={getAssetPath("/home")}>
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-kPKtHawIQ4HnJREMS9NfnjEqidHyqh.png"
            alt="Monkey Logo"
            className="w-24 h-24 rounded-full mx-auto"
          />
        </Link>
      </div>

      {/* Scrollable Navigation */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <Navigation />
        </div>
      </div>
    </aside>
  );
}
