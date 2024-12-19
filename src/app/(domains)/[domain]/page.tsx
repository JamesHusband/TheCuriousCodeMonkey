import { taxonomy } from "@/lib/taxonomy";
import { Breadcrumbs } from "@/lib/components/navigation/Navigation";
import Link from "next/link";
import { getAssetPath } from "@/lib/utils";

// Generate static params for all domains
export function generateStaticParams() {
  return taxonomy.domains.map((domain) => ({
    domain: domain.slug,
  }));
}

export default function DomainPage({ params }: { params: { domain: string } }) {
  const domain = taxonomy.domains.find((d) => d.slug === params.domain);

  if (!domain) {
    return <div>Domain not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <div className="mb-8">
        <Breadcrumbs currentPath={`/${params.domain}`} />
      </div>

      {/* Domain Header */}
      <header className="mb-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          {domain.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {domain.description}
        </p>
      </header>

      {/* Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {domain.topics.map((topic) => (
          <Link
            key={topic.slug}
            href={getAssetPath(`/${domain.slug}/${topic.slug}`)}
            className="block p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
              {topic.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {topic.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
