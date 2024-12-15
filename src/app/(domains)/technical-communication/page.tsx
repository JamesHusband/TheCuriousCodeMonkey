"use client";

import { MainLayout } from "@/lib/components/layout/MainLayout";
import { blogPosts } from "@/lib/taxonomy";
import Link from "next/link";
import { getAssetPath } from "@/lib/utils";

export default function TechnicalCommunicationPage() {
  // Filter posts for technical communication domain
  const techCommPosts = Object.entries(blogPosts).filter(
    ([_, post]) => post.metadata.domain === "technical-communication"
  );

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-12">
          <div className="space-y-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700">
              Technical Communication
            </h1>
            <p className="text-xl text-gray-300">
              Explore the art of conveying complex technical concepts with
              clarity and precision. Learn how to create documentation that
              bridges the gap between technical expertise and practical
              understanding.
            </p>
          </div>

          {/* Blog Posts */}
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold text-white">
              Latest Articles
            </h2>
            <div className="grid gap-8">
              {techCommPosts.map(([slug, post]) => (
                <article
                  key={slug}
                  className="bg-gray-800/50 rounded-lg p-6 space-y-4"
                >
                  <div className="space-y-2">
                    <Link
                      href={getAssetPath(
                        `/technical-communication/blog/${slug}`
                      )}
                      className="group"
                    >
                      <h3 className="text-xl font-semibold text-white group-hover:text-red-400 transition-colors">
                        {post.metadata.title}
                      </h3>
                    </Link>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
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
                  </div>
                  <p className="text-gray-300">{post.metadata.excerpt}</p>
                  <div className="pt-4">
                    <Link
                      href={getAssetPath(
                        `/technical-communication/blog/${slug}`
                      )}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
