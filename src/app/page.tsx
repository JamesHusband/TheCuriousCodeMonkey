"use client";

import { useState, useEffect, useRef } from "react";
import {
  Filter,
  Search,
  Mail,
  Terminal,
  ChevronDown,
  Command,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Component() {
  const [darkMode, setDarkMode] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [showToolbar, setShowToolbar] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isGnuModalOpen, setIsGnuModalOpen] = useState(false);
  const monkeyHeadRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      const scrollingDown = e.deltaY > 0;
      const mainContent = document.getElementById("main-content");

      if (!mainContent) return;
      const mainRect = mainContent.getBoundingClientRect();

      // If we're in the hero section or trying to scroll back to it
      if (mainRect.top >= 0 || !scrollingDown) {
        e.preventDefault();

        const scrollDelta = e.deltaY;
        const newScrollY = Math.max(
          0,
          Math.min(lastScrollY.current + scrollDelta, window.innerHeight)
        );

        // Calculate progress (0 to 1)
        const progress = Math.min(newScrollY / window.innerHeight, 1);

        // Update monkey head position and opacity
        if (monkeyHeadRef.current) {
          monkeyHeadRef.current.style.transform = `translateY(-${
            progress * 100
          }%)`;
          monkeyHeadRef.current.style.opacity = `${1 - progress}`;
        }

        // Show/hide title based on progress
        if (progress > 0.3 && !titleVisible) {
          setTitleVisible(true);
        } else if (progress <= 0.3 && titleVisible) {
          setTitleVisible(false);
        }

        // When animation is complete, allow scrolling to main content
        if (progress === 1 && !hasAnimated.current) {
          hasAnimated.current = true;
          document
            .getElementById("main-content")
            ?.scrollIntoView({ behavior: "smooth" });
        }

        // When scrolling back to top
        if (progress === 0) {
          hasAnimated.current = false;
          window.scrollTo({ top: 0, behavior: "smooth" });
        }

        lastScrollY.current = newScrollY;
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [titleVisible]);

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
    // Only close if clicking the backdrop itself, not its children
    if (e.target === e.currentTarget) {
      setIsCommandPaletteOpen(false);
      setIsTerminalOpen(false);
    }
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="w-1/2 bg-[#ff4b1f]"></div>
          <div className="w-1/2 bg-[#1f2937]"></div>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <div className="relative w-[500px] h-[500px] mx-auto mb-8">
            <Image
              src="/assets/monkey-brain.webp"
              alt="The Curious Code Monkey Brain"
              width={500}
              height={500}
              className="absolute inset-0"
              priority
            />
            <div
              ref={monkeyHeadRef}
              className="absolute inset-0"
              style={{
                transform: "translateY(0)",
                opacity: 1,
                willChange: "transform, opacity",
              }}
            >
              <Image
                src="/assets/monkey-head.webp"
                alt="The Curious Code Monkey Head"
                width={500}
                height={500}
                priority
              />
            </div>
          </div>
          <div
            ref={titleRef}
            className={`bg-black bg-opacity-75 p-6 rounded-lg transform transition-all duration-1000 ${
              titleVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
            style={{
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              THE CURIOUS CODE MONKEY
            </h1>
            <p className="text-xl md:text-2xl text-gray-200">
              A FULL STACK DEVELOPER BLOG
            </p>
          </div>
        </div>
        <div
          className={`absolute bottom-8 z-10 text-white transition-opacity duration-300 ${
            !hasAnimated.current ? "opacity-100" : "opacity-0"
          }`}
        >
          <p className="text-sm mb-2 text-center">Scroll to reveal</p>
          <ChevronDown className="w-8 h-8 animate-bounce" />
        </div>
      </section>

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
                {/* Command list will go here */}
                <div className="text-gray-400 text-sm p-2">
                  No commands available yet...
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terminal Modal */}
      {isTerminalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleModalBackdropClick}
        >
          <div className="bg-[#1f2937] w-3/4 h-2/3 rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
              <span className="text-gray-300">Terminal</span>
              <button
                onClick={toggleTerminal}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            <div className="p-4 font-mono text-green-400 bg-black h-full">
              <div>Welcome to The Curious Code Monkey Terminal...</div>
            </div>
          </div>
        </div>
      )}

      {/* GNU Terry Pratchett Modal */}
      {isGnuModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleModalBackdropClick}
        >
          <div className="bg-[#1f2937] w-11/12 md:w-3/4 lg:w-2/3 max-w-3xl rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center justify-between bg-gray-800 px-4 py-2">
              <span className="text-gray-300 font-semibold">
                GNU Terry Pratchett
              </span>
              <button
                onClick={() => setIsGnuModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                ×
              </button>
            </div>
            <div className="p-6 text-gray-300 space-y-4 font-serif">
              <div className="flex items-center justify-center mb-6">
                <Image
                  src="/assets/bee.png"
                  alt="A bee for Terry Pratchett"
                  width={200}
                  height={200}
                  className="mix-blend-screen"
                  priority
                />
              </div>
              <blockquote className="text-lg italic border-l-4 border-red-700 pl-4">
                "You know they'll never really die while the Trunk is alive[...]
                It lives while the code is shifted, and they live with it,
                always Going Home."
                <footer className="text-sm mt-2">
                  - Moist von Lipwig, Going Postal, Chapter 13
                </footer>
              </blockquote>

              <p>
                In Terry Pratchett's Discworld series, the clacks are a series
                of semaphore towers loosely based on the concept of the
                telegraph. Invented by an artificer named Robert Dearheart, the
                towers could send messages "at the speed of light" using
                standardized codes. Three of these codes are of particular
                import:
              </p>

              <div className="bg-gray-800 p-4 rounded-lg font-mono">
                <p>
                  <strong>G:</strong> send the message on
                </p>
                <p>
                  <strong>N:</strong> do not log the message
                </p>
                <p>
                  <strong>U:</strong> turn the message around at the end of the
                  line and send it back again
                </p>
              </div>

              <p>
                When Dearheart's son John died due to an accident while working
                on a clacks tower, Dearheart inserted John's name into the
                overhead of the clacks with a "GNU" in front of it as a way to
                memorialize his son forever (or for at least as long as the
                clacks are standing.)
              </p>

              <blockquote className="text-lg italic border-l-4 border-red-700 pl-4">
                "A man is not dead while his name is still spoken."
                <footer className="text-sm mt-2">
                  - Going Postal, Chapter 4 prologue
                </footer>
              </blockquote>

              <p>
                Keeping the legacy of Sir Terry Pratchett alive forever.
                <br />
                For as long as his name is still passed along the Clacks
                <sup>1</sup>,<br />
                Death can't have him.
              </p>

              <p className="text-sm text-gray-400">
                <sup>1</sup> Nowadays called the Internet.
              </p>

              <div className="mt-6 text-center">
                <a
                  href="http://www.gnuterrypratchett.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 bg-red-700 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Visit GNU Terry Pratchett Website
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

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
          {/* Add more toolbar items here later */}
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
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800 text-white flex flex-col">
          <div className="p-6 bg-red-700 flex justify-center items-center">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-kPKtHawIQ4HnJREMS9NfnjEqidHyqh.png"
              alt="Monkey Logo"
              className="w-24 h-24 rounded-full"
            />
          </div>
          <div className="p-4">
            <NavigationPlaceholder />
          </div>
          <div className="p-4">
            <CategoryListPlaceholder />
          </div>
          <div className="p-4">
            <RecentPostsPlaceholder />
          </div>
          <div className="flex-grow"></div>
          <div className="p-4 bg-red-700 flex justify-center items-center">
            <FooterPlaceholder />
          </div>
        </aside>

        {/* Main content */}
        <main
          className={`flex-1 ${
            darkMode ? "bg-gray-900 text-white" : "bg-gray-100"
          } transition-colors duration-300 ease-in-out overflow-auto`}
        >
          <div className="p-4">
            <SearchPlaceholder />
          </div>

          <div className="p-4">
            <FilterPlaceholder />
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }, (_, i) => (
                <CardPlaceholder key={i} />
              ))}
            </div>
          </div>

          <div className="p-4">
            <PaginationPlaceholder />
          </div>

          <div className="p-4">
            <NewsletterSignupPlaceholder />
          </div>
        </main>
      </div>
    </div>
  );
}

function NavigationPlaceholder() {
  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <div className="h-6 w-3/4 bg-gray-600 rounded mb-2"></div>
      <div className="h-6 w-1/2 bg-gray-600 rounded mb-2"></div>
      <div className="h-6 w-2/3 bg-gray-600 rounded"></div>
    </div>
  );
}

function CategoryListPlaceholder() {
  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <div className="h-6 w-full bg-gray-600 rounded mb-2"></div>
      <div className="h-4 w-1/2 bg-gray-600 rounded mb-2"></div>
      <div className="h-4 w-3/4 bg-gray-600 rounded mb-2"></div>
      <div className="h-4 w-2/3 bg-gray-600 rounded"></div>
    </div>
  );
}

function RecentPostsPlaceholder() {
  return (
    <div className="bg-gray-700 p-4 rounded-lg">
      <div className="h-6 w-full bg-gray-600 rounded mb-2"></div>
      <div className="h-4 w-3/4 bg-gray-600 rounded mb-2"></div>
      <div className="h-4 w-5/6 bg-gray-600 rounded mb-2"></div>
      <div className="h-4 w-2/3 bg-gray-600 rounded"></div>
    </div>
  );
}

function SearchPlaceholder() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between">
      <span className="text-gray-600 dark:text-gray-300">
        Search Placeholder
      </span>
      <Search className="w-5 h-5 text-gray-400" />
    </div>
  );
}

function FilterPlaceholder() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between">
      <span className="text-gray-600 dark:text-gray-300">
        Filter Placeholder
      </span>
      <Filter className="w-5 h-5 text-gray-400" />
    </div>
  );
}

function CardPlaceholder() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all duration-300 ease-in-out hover:shadow-lg transform hover:-translate-y-1">
      <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
      <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  );
}

function PaginationPlaceholder() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-center">
      <span className="text-gray-600 dark:text-gray-300">
        Pagination Placeholder
      </span>
    </div>
  );
}

function NewsletterSignupPlaceholder() {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center justify-between">
      <span className="text-gray-600 dark:text-gray-300">
        Newsletter Signup Placeholder
      </span>
      <Mail className="w-5 h-5 text-gray-400" />
    </div>
  );
}

function FooterPlaceholder() {
  return (
    <div className="w-full h-10 bg-gray-700 rounded flex items-center justify-center">
      <span className="text-gray-400 text-sm">Footer Placeholder</span>
    </div>
  );
}
