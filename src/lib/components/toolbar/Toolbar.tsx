"use client";

import { QuickActions } from "./QuickActions";
import { GNUButton } from "./GNUButton";

export function Toolbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-black border-t border-gray-800 flex items-center justify-between px-4">
      <QuickActions />
      <GNUButton />
    </div>
  );
}
