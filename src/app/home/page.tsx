"use client";

import { useState, useEffect } from "react";
import { Terminal, Command } from "lucide-react";
import { Sidebar } from "@/lib/components/Sidebar";
import { Terminal as TerminalComponent } from "@/lib/components/Terminal";
import Image from "next/image";
import { GNUTerryPratchett } from "@/lib/components/GNUTerryPratchett";

export default function HomePage() {
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
          <div className="max-w-7xl mx-auto px-4 py-12 space-y-24">
            {/* Technical Communication Domain */}
            <section className="space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative aspect-square bg-gradient-to-br from-red-500/10 to-red-700/10 rounded-2xl p-8 dark:from-red-500/5 dark:to-red-700/5">
                  <Image
                    src="/assets/technical-communication.webp"
                    alt="Technical Communication Monkey"
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-2xl" />
                </div>
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
                    Technical Communication
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    Explore the art of conveying complex technical concepts with
                    clarity and precision. Learn how to create documentation
                    that bridges the gap between technical expertise and
                    practical understanding.
                  </p>
                </div>
              </div>
            </section>

            {/* System Architecture Domain */}
            <section className="space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 order-2 lg:order-1">
                  <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">
                    System Architecture
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    Dive into the principles of building robust and scalable
                    systems. Understand how to design architectures that stand
                    the test of time and adapt to evolving requirements.
                  </p>
                </div>
                <div className="order-1 lg:order-2 relative aspect-square bg-gradient-to-br from-blue-500/10 to-blue-700/10 rounded-2xl p-8 dark:from-blue-500/5 dark:to-blue-700/5">
                  <Image
                    src="/assets/system-architecture.webp"
                    alt="System Architecture Monkey"
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-2xl" />
                </div>
              </div>
            </section>

            {/* Coding Patterns Domain */}
            <section className="space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative aspect-square bg-gradient-to-br from-green-500/10 to-green-700/10 rounded-2xl p-8 dark:from-green-500/5 dark:to-green-700/5">
                  <Image
                    src="/assets/coding-patterns.webp"
                    alt="Coding Patterns Monkey"
                    fill
                    className="object-contain p-4"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-2xl" />
                </div>
                <div className="space-y-6">
                  <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700">
                    Coding Patterns
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300">
                    Master the essential patterns and practices that form the
                    building blocks of elegant code. Learn how to write
                    maintainable, efficient, and beautiful solutions to common
                    programming challenges.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
