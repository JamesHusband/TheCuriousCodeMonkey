"use client";

import { MainLayout } from "@/lib/components/layout/MainLayout";

export default function SystemArchitecturePage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">
            System Architecture
          </h1>
          <p className="text-xl text-gray-300">
            Dive into the principles of building robust and scalable systems.
            Understand how to design architectures that stand the test of time
            and adapt to evolving requirements.
          </p>
          <div className="border-l-4 border-blue-600/50 pl-4 py-2 bg-gray-800/50">
            <p className="text-gray-300">Coming soon...</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
