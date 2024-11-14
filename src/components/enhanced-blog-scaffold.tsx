"use client";

import { useState } from "react";
import { Filter, Search, Mail, Terminal } from "lucide-react";

export function EnhancedBlogScaffold() {
  const [darkMode, setDarkMode] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={`flex h-screen ${darkMode ? "dark" : ""}`}>
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
        {/* Terminal Placeholder */}
        <div className="p-4">
          <TerminalPlaceholder />
        </div>

        {/* Search Placeholder */}
        <div className="p-4">
          <SearchPlaceholder />
        </div>

        {/* Filter Placeholder */}
        <div className="p-4">
          <FilterPlaceholder />
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }, (_, i) => (
              <CardPlaceholder key={i} />
            ))}
          </div>
        </div>

        {/* Pagination Placeholder */}
        <div className="p-4">
          <PaginationPlaceholder />
        </div>

        {/* Newsletter Signup Placeholder */}
        <div className="p-4">
          <NewsletterSignupPlaceholder />
        </div>
      </main>
    </div>
  );
}

function TerminalPlaceholder() {
  return (
    <div className="w-full bg-black text-green-400 p-4 font-mono text-sm rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Terminal className="w-5 h-5 mr-2" />
          <span>Terminal</span>
        </div>
        <span className="text-gray-500">Placeholder</span>
      </div>
      <div className="h-4 w-3/4 bg-green-900 rounded mb-2"></div>
      <div className="h-4 w-1/2 bg-green-900 rounded mb-2"></div>
      <div className="h-4 w-5/6 bg-green-900 rounded"></div>
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
