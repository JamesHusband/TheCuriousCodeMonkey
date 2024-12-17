"use client";

import { Terminal, Command } from "lucide-react";
import { useDialog } from "@/lib/providers/DialogProvider";
import { ToolbarButton } from "./ToolbarButton";

export function QuickActions() {
  const { toggleDialog } = useDialog();

  return (
    <div className="hidden md:flex items-center space-x-4">
      <ToolbarButton
        onClick={() => toggleDialog("terminal")}
        icon={<Terminal className="w-5 h-5" />}
        label="Open Terminal"
      />
      <ToolbarButton
        onClick={() => toggleDialog("commandPalette")}
        icon={<Command className="w-5 h-5" />}
        label="Open Command Palette"
      />
    </div>
  );
}
