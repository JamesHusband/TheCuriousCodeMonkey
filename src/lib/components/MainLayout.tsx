"use client";

import { useState, useEffect } from "react";
import { Terminal, Command } from "lucide-react";
import { Sidebar } from "@/lib/components/Sidebar";
import { Terminal as TerminalComponent } from "@/lib/components/Terminal";
import { GNUTerryPratchett } from "@/lib/components/GNUTerryPratchett";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const [darkMode, setDarkMode] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);
  const [isGnuModalOpen, setIsGnuModalOpen] = useState(false);

  const toggleTerminal = () => {
    setIsTerminalOpen(!isTerminalOpen);
  };

  const toggleCommandPalette = () => {
    setIsCommandPaletteOpen(!isCommandPaletteOpen);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Command Palette shortcut (Cmd/Ctrl + Shift + P)
      if (
        (event.metaKey || event.ctrlKey) &&
        event.shiftKey &&
        event.key === "p"
      ) {
        event.preventDefault();
        toggleCommandPalette();
      }

      // Terminal shortcut (Cmd/Ctrl + `)
      if ((event.metaKey || event.ctrlKey) && event.key === "`") {
        event.preventDefault();
        toggleTerminal();
      }

      // ESC key handling
      if (event.key === "Escape") {
        if (isCommandPaletteOpen) setIsCommandPaletteOpen(false);
        if (isTerminalOpen) setIsTerminalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCommandPaletteOpen, isTerminalOpen]);

  // Toolbar visibility
  useEffect(() => {
    const handleToolbarVisibility = () => {
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        const mainRect = mainContent.getBoundingClientRect();
        setShowToolbar(mainRect.top <= 0);
      }
    };

    // Initial check
    handleToolbarVisibility();
    window.addEventListener("scroll", handleToolbarVisibility);
    return () => window.removeEventListener("scroll", handleToolbarVisibility);
  }, []);

  const handleModalBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsCommandPaletteOpen(false);
      setIsGnuModalOpen(false);
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      {/* Command Palette Modal */}
      {isCommandPaletteOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleModalBackdropClick}
        >
          <div className="bg-[#1f2937] w-2/3 rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
              <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-2">
                <Command className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent border-none focus:outline-none text-white"
                  autoFocus
                />
              </div>
              <div className="mt-2 max-h-96 overflow-y-auto">
                <div className="text-gray-400 text-sm p-2">
                  No commands available yet...
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terminal Modal */}
      <TerminalComponent
        isOpen={isTerminalOpen}
        onClose={toggleTerminal}
        onBackdropClick={() => {}}
      />

      {/* GNU Terry Pratchett Modal */}
      <GNUTerryPratchett
        isOpen={isGnuModalOpen}
        onClose={() => setIsGnuModalOpen(false)}
        onBackdropClick={handleModalBackdropClick}
      />

      {/* IDE-like Toolbar */}
      <div
        className={`fixed bottom-0 left-0 right-0 h-12 bg-[#1f2937] border-t border-gray-700 flex items-center justify-between px-4 z-40 transition-all duration-300 ${
          showToolbar ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTerminal}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors group relative"
            aria-label="Open Terminal"
          >
            <Terminal className="w-5 h-5" />
            <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-xs text-gray-300 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              ⌘ `
            </span>
          </button>
          <button
            onClick={toggleCommandPalette}
            className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-md transition-colors group relative"
            aria-label="Open Command Palette"
          >
            <Command className="w-5 h-5" />
            <span className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-xs text-gray-300 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              ⌘ ⇧ P
            </span>
          </button>
        </div>
        <button
          onClick={() => setIsGnuModalOpen(true)}
          className="text-gray-400 hover:text-white text-sm transition-colors"
          aria-label="GNU Terry Pratchett - A tribute to Sir Terry Pratchett"
        >
          G.N.U PTerry
        </button>
      </div>

      {/* Main Content */}
      <div
        className={`flex min-h-screen ${showToolbar ? "pb-12" : ""}`}
        id="main-content"
      >
        <div className="fixed top-0 left-0 h-screen">
          <Sidebar />
        </div>

        {/* Main content */}
        <main
          className={`flex-1 ml-64 ${
            darkMode ? "bg-gray-900 text-white" : "bg-gray-100"
          } transition-colors duration-300 ease-in-out overflow-auto`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
