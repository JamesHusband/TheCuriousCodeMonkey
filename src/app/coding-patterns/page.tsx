"use client";

import { MainLayout } from "@/features/layout/MainLayout";

export default function CodingPatternsPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700">
            Coding Patterns
          </h1>
          <p className="text-xl text-gray-300">
            Master the essential patterns and practices that form the building
            blocks of elegant code. Learn how to write maintainable, efficient,
            and beautiful solutions to common programming challenges.
          </p>
          <div className="border-l-4 border-green-600/50 pl-4 py-2 bg-gray-800/50">
            <p className="text-gray-300">Coming soon...</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
