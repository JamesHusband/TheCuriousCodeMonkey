"use client";

import { Command } from "lucide-react";
import { useDialog } from "@/lib/providers/DialogProvider";

export function CommandPalette() {
  const { closeDialog } = useDialog();

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeDialog("commandPalette");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div className="bg-gray-800 w-2/3 rounded-lg shadow-lg overflow-hidden">
        <div className="p-4">
          <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-2">
            <Command
              className="w-5 h-5 text-gray-400"
              data-testid="command-icon"
            />
            <input
              type="text"
              placeholder="Type a command or search..."
              className="w-full bg-transparent border-none focus:outline-none text-white"
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
}
