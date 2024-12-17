"use client";

import { taxonomy } from "@/lib/taxonomy";
import { getAssetPath } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

export function Navigation() {
  return (
    <nav className="space-y-8">
      <h2 className="text-lg font-semibold text-white mb-6">
        Knowledge Domains
      </h2>
      {taxonomy.domains.map((domain) => (
        <NavigationItem key={domain.slug} domain={domain} />
      ))}
    </nav>
  );
}

function NavigationItem({
  domain,
}: {
  domain: (typeof taxonomy.domains)[number];
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = domain.topics && domain.topics.length > 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between group">
        <Link
          href={getAssetPath(`/${domain.slug}`)}
          className="text-gray-300 hover:text-white transition-colors flex-grow py-2"
        >
          {domain.title}
        </Link>
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 text-gray-400 hover:text-white transition-colors"
            aria-label={isExpanded ? "Collapse section" : "Expand section"}
          >
            {isExpanded ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {hasChildren && isExpanded && (
        <div className="pl-4 space-y-3 border-l border-gray-700">
          {domain.topics.map((topic) => (
            <Link
              key={topic.slug}
              href={getAssetPath(`/${domain.slug}/${topic.slug}`)}
              className="block text-sm text-gray-400 hover:text-white transition-colors py-2"
            >
              {topic.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Breadcrumbs({ currentPath }: { currentPath: string }) {
  const pathParts = currentPath.split("/").filter(Boolean);
  const breadcrumbs = pathParts.map((part, index) => {
    const domain = taxonomy.domains.find((d) => d.slug === part);
    if (domain) {
      return {
        title: domain.title,
        href: getAssetPath(`/${part}`),
      };
    }

    const parentDomain = taxonomy.domains.find((d) =>
      d.topics?.some((t) => t.slug === part)
    );
    if (parentDomain) {
      const topic = parentDomain.topics?.find((t) => t.slug === part);
      return {
        title: topic?.title || part,
        href: getAssetPath(`/${parentDomain.slug}/${part}`),
      };
    }

    return {
      title: part,
      href: getAssetPath(`/${pathParts.slice(0, index + 1).join("/")}`),
    };
  });

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
      <Link
        href={getAssetPath("/home")}
        className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
      >
        Home
      </Link>
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.href} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4" />
          <Link
            href={crumb.href}
            className={`hover:text-red-600 dark:hover:text-red-400 transition-colors ${
              index === breadcrumbs.length - 1
                ? "text-gray-700 dark:text-gray-200"
                : ""
            }`}
          >
            {crumb.title}
          </Link>
        </div>
      ))}
    </div>
  );
}

export function TopicTags({ conceptIds }: { conceptIds: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {conceptIds.map((id) => {
        const domain = taxonomy.domains.find((d) => d.slug === id);
        if (domain) {
          return (
            <Link
              key={id}
              href={getAssetPath(`/${id}`)}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-600/10 text-red-600 dark:bg-red-400/10 dark:text-red-400 hover:bg-red-600/20 dark:hover:bg-red-400/20 transition-colors"
            >
              {domain.title}
            </Link>
          );
        }

        const parentDomain = taxonomy.domains.find((d) =>
          d.topics?.some((t) => t.slug === id)
        );
        if (parentDomain) {
          const topic = parentDomain.topics?.find((t) => t.slug === id);
          if (topic) {
            return (
              <Link
                key={id}
                href={getAssetPath(`/${parentDomain.slug}/${id}`)}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-600/10 text-red-600 dark:bg-red-400/10 dark:text-red-400 hover:bg-red-600/20 dark:hover:bg-red-400/20 transition-colors"
              >
                {topic.title}
              </Link>
            );
          }
        }

        return null;
      })}
    </div>
  );
}
