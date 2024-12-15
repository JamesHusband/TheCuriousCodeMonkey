"use client";

import { MainLayout } from "@/lib/components/layout/MainLayout";
import Image from "next/image";

export default function HomePage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-24">
        {/* Technical Documentation Domain */}
        <section className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square bg-gradient-to-br from-blue-500/10 to-blue-700/10 rounded-2xl p-8 dark:from-blue-500/5 dark:to-blue-700/5">
              <Image
                src="/assets/technical-documentation.webp"
                alt="Technical Documentation Monkey"
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-2xl" />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">
                Technical Documentation
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Master the art of creating comprehensive technical documentation
                that serves as a reliable reference for users, developers, and
                stakeholders alike.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Communication Domain */}
        <section className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
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
            <div className="order-1 lg:order-2 relative aspect-square bg-gradient-to-br from-red-500/10 to-red-700/10 rounded-2xl p-8 dark:from-red-500/5 dark:to-red-700/5">
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
          </div>
        </section>

        {/* Process Documentation Domain */}
        <section className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square bg-gradient-to-br from-green-500/10 to-green-700/10 rounded-2xl p-8 dark:from-green-500/5 dark:to-green-700/5">
              <Image
                src="/assets/process-documentation.webp"
                alt="Process Documentation Monkey"
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-2xl" />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700">
                Process Documentation and Workflows
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Document complex workflows and processes with clarity and
                precision, making them accessible and actionable for all team
                members.
              </p>
            </div>
          </div>
        </section>

        {/* Knowledge Organisation Domain */}
        <section className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-700">
                Knowledge Organisation and Representation
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Learn effective strategies for organizing and representing
                knowledge in ways that enhance understanding and accessibility.
              </p>
            </div>
            <div className="order-1 lg:order-2 relative aspect-square bg-gradient-to-br from-purple-500/10 to-purple-700/10 rounded-2xl p-8 dark:from-purple-500/5 dark:to-purple-700/5">
              <Image
                src="/assets/knowledge-organisation.webp"
                alt="Knowledge Organisation Monkey"
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </section>

        {/* Visualisation Domain */}
        <section className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-square bg-gradient-to-br from-orange-500/10 to-orange-700/10 rounded-2xl p-8 dark:from-orange-500/5 dark:to-orange-700/5">
              <Image
                src="/assets/visualisation-modelling.webp"
                alt="Visualisation and Modelling Monkey"
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-2xl" />
            </div>
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700">
                Visualisation and Modelling
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Discover techniques for creating effective visual
                representations and models that communicate complex ideas
                clearly and intuitively.
              </p>
            </div>
          </div>
        </section>

        {/* Tools and Automation Domain */}
        <section className="space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700">
                Tools and Automation
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Explore tools and automation techniques that streamline
                documentation processes and enhance productivity in technical
                writing workflows.
              </p>
            </div>
            <div className="order-1 lg:order-2 relative aspect-square bg-gradient-to-br from-yellow-500/10 to-yellow-700/10 rounded-2xl p-8 dark:from-yellow-500/5 dark:to-yellow-700/5">
              <Image
                src="/assets/tools-automation.webp"
                alt="Tools and Automation Monkey"
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent rounded-2xl" />
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
