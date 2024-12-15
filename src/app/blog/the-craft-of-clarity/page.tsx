"use client";

import { MainLayout } from "@/lib/components/MainLayout";
import { Breadcrumbs, TopicTags } from "@/components/Navigation";
import { blogPosts } from "@/lib/taxonomy";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { getAssetPath } from "@/lib/utils";

export default function TheCraftOfClarityPage() {
  const post = blogPosts["the-craft-of-clarity"];

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="space-y-6">
          <div className="flex flex-col space-y-4">
            <Link
              href={getAssetPath("/home")}
              className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <Breadcrumbs currentPath="/technical-communication/the-craft-of-clarity" />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={post.metadata.date}>
                {new Date(post.metadata.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span>•</span>
              <span>10 min read</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              {post.metadata.title}
            </h1>
            <div className="flex items-center space-x-4">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-kPKtHawIQ4HnJREMS9NfnjEqidHyqh.png"
                alt="Author"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {post.metadata.creator}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Software Engineer
                </p>
              </div>
            </div>
            <TopicTags conceptIds={post.metadata.subject} />
          </div>
        </div>

        <article className="prose prose-lg dark:prose-invert mt-12">
          <p>
            In the ever-evolving landscape of software development, one
            principle stands as a timeless beacon: clarity. As our systems grow
            more complex and our teams more distributed, the ability to write
            clear, understandable code becomes not just a virtue, but a
            necessity.
          </p>

          <h2>The Cost of Complexity</h2>
          <p>
            Every line of code we write today is a message to future developers
            - often, to our future selves. When that message is unclear, we pay
            the price in:
          </p>
          <ul>
            <li>Extended onboarding times for new team members</li>
            <li>Increased cognitive load during maintenance</li>
            <li>Higher risk of bugs and regressions</li>
            <li>Slower development cycles</li>
          </ul>

          <h2>The Path to Clarity</h2>
          <p>
            Achieving clarity in code is a craft that combines technical skill
            with effective communication. Here are some key principles:
          </p>

          <h3>1. Meaningful Names</h3>
          <p>
            Names are the first level of documentation. Choose names that reveal
            intent and context:
          </p>
          <pre>
            <code>
              {`// Instead of:
const x = users.f(u => u.a > 7);

// Write:
const activeUsers = users.filter(user => user.loginCount > 7);`}
            </code>
          </pre>

          <h3>2. Single Responsibility</h3>
          <p>
            Each function and class should do one thing and do it well. This
            makes code easier to understand, test, and modify:
          </p>
          <pre>
            <code>
              {`// Instead of:
function processUser(user) {
  validateUser(user);
  updateDatabase(user);
  sendEmail(user);
}

// Split into:
function processUser(user) {
  const validUser = validateUser(user);
  const savedUser = saveToDatabase(validUser);
  notifyUser(savedUser);
}`}
            </code>
          </pre>

          <h3>3. Consistent Abstractions</h3>
          <p>
            Maintain consistent levels of abstraction within the same function
            or module. Mixing high-level and low-level operations makes code
            harder to follow.
          </p>

          <h2>The Role of Documentation</h2>
          <p>
            While clear code is self-documenting to a degree, good documentation
            serves different purposes:
          </p>
          <ul>
            <li>Explaining the why behind architectural decisions</li>
            <li>Providing context for business rules</li>
            <li>Guiding users of your API or library</li>
            <li>Documenting non-obvious edge cases</li>
          </ul>

          <h2>Conclusion</h2>
          <p>
            Writing clear code is an investment in the future of your project.
            It requires discipline, empathy for future readers, and a commitment
            to continuous improvement. The time spent making code clearer is
            always less than the time saved not having to decipher unclear code
            later.
          </p>
        </article>
      </div>
    </MainLayout>
  );
}
