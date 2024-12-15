"use client";

import { DomainSection } from "@/lib/components/domains/DomainSection";
import { MainLayout } from "@/lib/components/layout/MainLayout";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

export default function HomePage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-24">
        {/* Welcome Section */}
        <section className="relative max-w-5xl animate-in fade-in duration-1000">
          <div className="mb-16">
            <div className="float-left w-[38.2%] mr-16 animate-in fade-in duration-1000 delay-200">
              <div className="relative aspect-square">
                <Image
                  src={getAssetPath("/assets/hello-world.png")}
                  alt="Hello World Monkey"
                  fill
                  className="object-contain"
                  sizes="500px"
                  priority
                />
              </div>
            </div>

            <div className="pt-[9.5%] animate-in fade-in duration-1000 delay-300">
              <h1 className="text-7xl font-bold text-gray-800 dark:text-gray-100">
                Hello, world!
              </h1>
              <p className="text-2xl text-gray-700 dark:text-gray-200 mt-10 leading-relaxed">
                <span className="font-semibold">The Curious Code Monkey</span>{" "}
                makes it easy for you to discover everything you need to know
                about technical documentation, communication, and knowledge
                management.
              </p>
            </div>
          </div>

          <div className="clear-both space-y-10 animate-in fade-in duration-1000 delay-500">
            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              This site shows you the big picture, how all these subjects
              intersect, work together, and remain relevant. We explore the
              connections between technical writing, documentation patterns, and
              communication principles that often remain unexplored. This is the
              journey we embark on together.
            </p>

            <div className="pt-16 mt-10 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between text-gray-500 dark:text-gray-400 italic">
                <p>
                  P.S. While I update the project constantly, you can track the
                  progress via{" "}
                  <a
                    href="https://twitter.com/jameshusband"
                    className="text-red-600 dark:text-red-400 hover:underline"
                  >
                    Twwitter
                  </a>
                  .
                </p>
                <div className="text-right">
                  <p>— James Husband</p>
                  <p className="text-sm">
                    The curious monkey behind this project
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <DomainSection
          title="Technical Documentation"
          description="Master the art of creating comprehensive technical documentation that serves as a reliable reference for users, developers, and stakeholders alike."
          imageSrc="/assets/technical-documentation.webp"
          imageAlt="Technical Documentation Monkey"
          color="blue"
        />

        <DomainSection
          title="Technical Communication"
          description="Explore the art of conveying complex technical concepts with clarity and precision. Learn how to create documentation that bridges the gap between technical expertise and practical understanding."
          imageSrc="/assets/technical-communication.webp"
          imageAlt="Technical Communication Monkey"
          color="red"
          reversed
        />

        <DomainSection
          title="Process Documentation and Workflows"
          description="Document complex workflows and processes with clarity and precision, making them accessible and actionable for all team members."
          imageSrc="/assets/process-documentation.webp"
          imageAlt="Process Documentation Monkey"
          color="green"
        />

        <DomainSection
          title="Knowledge Organisation and Representation"
          description="Learn effective strategies for organizing and representing knowledge in ways that enhance understanding and accessibility."
          imageSrc="/assets/knowledge-organisation.webp"
          imageAlt="Knowledge Organisation Monkey"
          color="purple"
          reversed
        />

        <DomainSection
          title="Visualisation and Modelling"
          description="Discover techniques for creating effective visual representations and models that communicate complex ideas clearly and intuitively."
          imageSrc="/assets/visualisation-modelling.webp"
          imageAlt="Visualisation and Modelling Monkey"
          color="orange"
        />

        <DomainSection
          title="Tools and Automation"
          description="Explore tools and automation techniques that streamline documentation processes and enhance productivity in technical writing workflows."
          imageSrc="/assets/tools-automation.webp"
          imageAlt="Tools and Automation Monkey"
          color="yellow"
          reversed
        />
      </div>
    </MainLayout>
  );
}
