"use client";

import { DomainSection } from "@/lib/components/domains/DomainSection";
import { MainLayout } from "@/lib/components/layout/MainLayout";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

export default function HomePage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Welcome Section */}
        <section className="relative max-w-5xl animate-in fade-in duration-1000 mb-16">
          <div className="mb-16">
            {/* Mobile Layout */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-16">
              {/* Header Group (Image + Title) */}
              <div className="flex items-center gap-6 lg:block">
                <div className="relative w-20 h-20 sm:w-28 sm:h-28 lg:w-[400px] lg:h-[400px] shrink-0">
                  <Image
                    src={getAssetPath("/assets/hello-world.png")}
                    alt="The Curious Code Monkey"
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 80px, (max-width: 768px) 112px, 400px"
                    priority
                  />
                </div>
                {/* Mobile-only title */}
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-gray-100 lg:hidden">
                  Welcome to The Curious Code Monkey!
                </h1>
              </div>

              {/* Content */}
              <div className="flex-1 animate-in fade-in duration-1000 delay-300">
                {/* Desktop-only title */}
                <h1 className="hidden lg:block text-7xl font-bold text-gray-800 dark:text-gray-100 mb-10">
                  Welcome to The Curious Code Monkey!
                </h1>
                <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-200 leading-relaxed">
                  <span className="font-semibold">The Curious Code Monkey</span>{" "}
                  makes it easy for you to discover everything you need to know
                  about technical documentation, communication, and knowledge
                  management.
                </p>
              </div>
            </div>
          </div>

          <div className="animate-in fade-in duration-1000 delay-500">
            {/* Desktop-only description */}
            <p className="hidden lg:block text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-16">
              This site shows you the big picture, how all these subjects
              intersect, work together, and remain relevant. We explore the
              connections between technical writing, documentation patterns, and
              communication principles that often remain unexplored. This is the
              journey we embark on together.
            </p>

            <div className="pt-8 lg:pt-16 mt-6 lg:mt-10 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-gray-500 dark:text-gray-400 italic gap-4">
                <p>
                  P.S. Check out my other stuff on my{" "}
                  <a
                    href="https://github.com/JamesHusband"
                    className="text-red-600 dark:text-red-400 hover:underline"
                  >
                    Github
                  </a>
                  .
                </p>
                <div className="text-left sm:text-right">
                  <p>— James Husband</p>
                  <p className="text-sm">
                    The curious monkey behind this project
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* First branch: Get your bearings */}
          <DomainSection
            title="Thinking Models"
            description="Your first branch in the knowledge jungle. Learn to spot patterns, analyze paths, and develop the mental agility needed for the journey ahead."
            imageSrc="/assets/thinking-models.webp"
            imageAlt="Thinking Models Monkey"
            slug="thinking-models"
          />

          {/* Second branch: Map your surroundings */}
          <DomainSection
            title="Knowledge Organisation"
            description="Map the jungle of information around you. Master techniques to classify, structure, and navigate complex knowledge territories."
            imageSrc="/assets/knowledge-organisation.webp"
            imageAlt="Knowledge Organisation Monkey"
            slug="knowledge-organisation"
          />

          {/* Third branch: Share your discoveries */}
          <DomainSection
            title="Technical Communication"
            description="Call out to fellow explorers. Learn to share complex discoveries clearly, whether through writing, speaking, or teaching others."
            imageSrc="/assets/technical-communication.webp"
            imageAlt="Technical Communication Monkey"
            slug="technical-communication"
          />

          {/* Fourth branch: Draw your maps */}
          <DomainSection
            title="Visualisation"
            description="Paint pictures of your jungle paths. Transform abstract concepts into clear visual guides that others can follow."
            imageSrc="/assets/visualisation-modelling.webp"
            imageAlt="Visualisation and Modelling Monkey"
            slug="visualisation"
          />

          {/* Fifth branch: Chart the paths */}
          <DomainSection
            title="Process Documentation"
            description="Mark the safe routes through complex territories. Create clear paths that others can follow through the knowledge jungle."
            imageSrc="/assets/process-documentation.webp"
            imageAlt="Process Documentation Monkey"
            slug="process-documentation"
          />

          {/* Sixth branch: Craft your tools */}
          <DomainSection
            title="Tools & Automation"
            description="Craft tools for efficient jungle navigation. Build and master the implements that make your knowledge journey smoother."
            imageSrc="/assets/tools-automation.webp"
            imageAlt="Tools and Automation Monkey"
            slug="tools-and-automation"
          />
        </div>
      </div>
    </MainLayout>
  );
}
