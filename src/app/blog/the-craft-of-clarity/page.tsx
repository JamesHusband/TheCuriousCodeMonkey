"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs, TopicTags } from "@/components/Navigation";
import { blogPosts } from "@/lib/taxonomy";
import { Sidebar } from "@/lib/components/Sidebar";

export default function BlogPost() {
  const post = blogPosts["the-craft-of-clarity"];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="flex">
        <Sidebar FooterComponent={FooterPlaceholder} />

        {/* Main Content */}
        <main className="flex-1">
          {/* Header */}
          <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="max-w-4xl mx-auto px-4 py-6">
              <div className="space-y-6">
                <div className="flex flex-col space-y-4">
                  <Link
                    href="/#main-content"
                    className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back to Home</span>
                  </Link>
                  <Breadcrumbs currentId={post.metadata.subject[0]} />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <time dateTime={post.metadata.date}>
                      {new Date(post.metadata.date).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
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
            </div>
          </header>

          {/* Article Content */}
          <div className="max-w-4xl mx-auto px-4 py-12">
            <article className="prose prose-lg dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-red-600 hover:prose-a:text-red-500 prose-p:text-gray-600 dark:prose-p:text-gray-300 max-w-none">
              <div className="relative">
                <div className="absolute -top-8 -left-8 text-8xl text-gray-900/10 dark:text-white/10 font-serif">
                  "
                </div>
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-8 relative z-10 pl-4">
                  In the realm of software development, effective documentation
                  is not just about writing—it&apos;s about structuring
                  knowledge in ways that serve different needs and audiences.
                  This exploration delves into modern frameworks and
                  methodologies that shape how we approach technical
                  documentation.
                </p>
              </div>

              <h2>Frameworks for Effective Documentation</h2>

              <h3>Divio&apos;s Diátaxis Framework</h3>
              <p>
                The Diátaxis framework, developed by Divio, provides a
                systematic approach to documentation by dividing it into four
                distinct categories, each serving a specific purpose:
              </p>
              <ul>
                <li>
                  <strong>Tutorials:</strong> Learning-oriented content that
                  guides beginners through practical exercises
                </li>
                <li>
                  <strong>How-To Guides:</strong> Problem-oriented guides that
                  address specific tasks or challenges
                </li>
                <li>
                  <strong>Reference:</strong> Information-oriented technical
                  descriptions of the system
                </li>
                <li>
                  <strong>Explanations:</strong> Understanding-oriented
                  discussions that provide context and insight
                </li>
              </ul>
              <p>
                This categorization helps both writers and readers by providing
                clear expectations and purposes for each type of documentation.
              </p>

              <h3>Object Documentation Analysis (ODA)</h3>
              <p>
                ODA represents a more granular approach to documentation,
                treating documentation components as reusable objects that can
                be:
              </p>
              <ul>
                <li>Modularized for different contexts</li>
                <li>Versioned alongside code</li>
                <li>Referenced across multiple documents</li>
                <li>Maintained independently</li>
              </ul>
              <p>
                This approach is particularly valuable in large systems where
                consistency and maintainability are crucial.
              </p>

              <h3>Lean Documentation</h3>
              <p>
                The Lean Documentation approach emphasizes efficiency and value,
                focusing on:
              </p>
              <ul>
                <li>Creating only necessary documentation</li>
                <li>
                  Maintaining living documents that evolve with the project
                </li>
                <li>Eliminating redundancy and outdated information</li>
                <li>Integrating documentation into the development workflow</li>
              </ul>

              <h2>Modern Methodologies and Patterns</h2>

              <h3>Semantic Web and Metadata Standards</h3>
              <p>
                Modern documentation benefits from semantic web technologies and
                standards:
              </p>
              <ul>
                <li>
                  <strong>SKOS:</strong> For organizing knowledge and taxonomies
                </li>
                <li>
                  <strong>Dublin Core:</strong> For standardized metadata
                </li>
                <li>
                  <strong>RDF:</strong> For creating meaningful relationships
                  between documents
                </li>
              </ul>

              <h3>Agile Documentation Practices</h3>
              <p>
                Documentation-Driven Development (DDD) represents a shift in how
                we think about documentation:
              </p>
              <ul>
                <li>Writing documentation before implementation</li>
                <li>Using documentation as a design tool</li>
                <li>Validating assumptions through documentation</li>
                <li>Iterating based on feedback</li>
              </ul>

              <h3>Visualization in Documentation</h3>
              <p>
                Modern documentation increasingly relies on visual tools to
                convey complex information:
              </p>
              <ul>
                <li>
                  <strong>UML:</strong> For system architecture and class
                  relationships
                </li>
                <li>
                  <strong>BPMN:</strong> For business processes and workflows
                </li>
                <li>Interactive diagrams and flowcharts</li>
                <li>Annotated screenshots and videos</li>
              </ul>

              <h2>Conclusion</h2>
              <p>
                The landscape of technical documentation continues to evolve,
                embracing new frameworks and methodologies that make
                documentation more effective, maintainable, and valuable to its
                users. By understanding and applying these modern approaches, we
                can create documentation that truly serves its purpose—enabling
                understanding and facilitating action.
              </p>

              <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Key Takeaways</h3>
                <ul>
                  <li>
                    Documentation frameworks provide structure and purpose
                  </li>
                  <li>Modular approaches enhance maintainability</li>
                  <li>Lean practices ensure documentation remains relevant</li>
                  <li>Visual tools enhance understanding</li>
                  <li>Modern standards improve documentation accessibility</li>
                </ul>
              </div>
            </article>
          </div>

          {/* Footer */}
          <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
            <div className="max-w-4xl mx-auto px-4 py-12">
              <div className="flex flex-col items-center text-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-kPKtHawIQ4HnJREMS9NfnjEqidHyqh.png"
                  alt="Author"
                  className="w-20 h-20 rounded-full mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  James Husband
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
                  Software Engineer passionate about clean code, clear
                  communication, and continuous learning.
                </p>
                <div className="flex space-x-4">
                  <Button variant="outline">Follow</Button>
                  <Button className="bg-red-600 hover:bg-red-700 text-white">
                    More Posts
                  </Button>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
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
