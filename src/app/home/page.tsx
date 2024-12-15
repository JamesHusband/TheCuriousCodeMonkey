"use client";

import { MainLayout } from "@/lib/components/layout/MainLayout";
import Image from "next/image";

export default function HomePage() {
  return (
    <MainLayout>
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
                clarity and precision. Learn how to create documentation that
                bridges the gap between technical expertise and practical
                understanding.
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
                systems. Understand how to design architectures that stand the
                test of time and adapt to evolving requirements.
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
    </MainLayout>
  );
}
