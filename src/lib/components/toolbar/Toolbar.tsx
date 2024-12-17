"use client";

import { QuickActions } from "./QuickActions";
import { GNUButton } from "./GNUButton";

export function Toolbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 h-12 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between px-4 z-50">
      <div className="flex-1">
        <QuickActions />
      </div>
      <div className="hidden md:block">
        <GNUButton />
      </div>
    </div>
  );
}
