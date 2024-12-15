"use client";

import { MainLayout } from "@/lib/components/MainLayout";

export default function TechnicalCommunicationPage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
            Technical Communication
          </h1>
          <p className="text-xl text-gray-300">
            Explore the art of conveying complex technical concepts with clarity
            and precision. Learn how to create documentation that bridges the
            gap between technical expertise and practical understanding.
          </p>
          <div className="border-l-4 border-red-600/50 pl-4 py-2 bg-gray-800/50">
            <p className="text-gray-300">Coming soon...</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
