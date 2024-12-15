"use client";

import { useState, useEffect } from "react";
import { Terminal, Command } from "lucide-react";
import { Sidebar } from "./Sidebar";
import { Terminal as TerminalComponent } from "@/features/terminal/Terminal";
import { GNUTerryPratchett } from "@/features/gnu-terry-pratchett/GNUTerryPratchett";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isGnuModalOpen, setIsGnuModalOpen] = useState(false);

  const toggleTerminal = () => {
    setIsTerminalOpen(!isTerminalOpen);
  };

  const toggleCommandPalette = () => {
    setIsCommandPaletteOpen(!isCommandPaletteOpen);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey &&
        event.key === "p"
      ) {
        event.preventDefault();
        toggleCommandPalette();
      }
      if ((event.metaKey || event.ctrlKey) && event.key === "`") {
        event.preventDefault();
        toggleTerminal();
      }
      if (event.key === "Escape") {
        if (isCommandPaletteOpen) setIsCommandPaletteOpen(false);
        if (isTerminalOpen) setIsTerminalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandPaletteOpen, isTerminalOpen]);

  const handleModalBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsCommandPaletteOpen(false);
      setIsGnuModalOpen(false);
    }
  };

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

      {/* Fixed Bottom Toolbar */}
      <div className="fixed bottom-0 left-0 right-0 h-12 bg-black border-t border-gray-800 flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTerminal}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
            aria-label="Open Terminal"
          >
            <Terminal className="w-5 h-5" />
          </button>
          <button
            onClick={toggleCommandPalette}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
            aria-label="Open Command Palette"
          >
            <Command className="w-5 h-5" />
          </button>
        </div>
        <button
          onClick={() => setIsGnuModalOpen(true)}
          className="text-gray-400 hover:text-white text-sm transition-colors"
        >
          G.N.U PTerry
        </button>
      </div>

      {/* Modals */}
      {isCommandPaletteOpen && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          onClick={handleModalBackdropClick}
        >
          <div className="bg-gray-800 w-2/3 rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
              <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-2">
                <Command className="w-5 h-5 text-gray-400" />
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
      )}

      <TerminalComponent
        isOpen={isTerminalOpen}
        onClose={toggleTerminal}
        onBackdropClick={() => {}}
      />

      <GNUTerryPratchett
        isOpen={isGnuModalOpen}
        onClose={() => setIsGnuModalOpen(false)}
        onBackdropClick={handleModalBackdropClick}
      />
    </div>
  );
}
