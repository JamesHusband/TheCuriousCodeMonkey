"use client";

import { Terminal, Command, Sun, Moon } from "lucide-react";
import { useDialog } from "@/lib/providers/DialogProvider";
import { useTheme } from "@/lib/providers/ThemeProvider";
import { ToolbarButton } from "./ToolbarButton";

export function QuickActions() {
  const { toggleDialog } = useDialog();
  const { theme, toggleTheme } = useTheme();

  console.log("Current theme:", theme);

  return (
    <div className="flex items-center space-x-4">
      {/* Desktop-only actions */}
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

      {/* Theme toggle - always visible */}
      <ToolbarButton
        onClick={toggleTheme}
        icon={
          theme === "dark" ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )
        }
        label={
          theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"
        }
      />
    </div>
  );
}
