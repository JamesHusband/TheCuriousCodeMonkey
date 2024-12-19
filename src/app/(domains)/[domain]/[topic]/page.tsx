import { taxonomy, blogPosts } from "@/lib/taxonomy";
import { Breadcrumbs } from "@/lib/components/navigation/Navigation";

// Generate static params for all topics
export function generateStaticParams() {
  return taxonomy.domains.flatMap((domain) =>
    domain.topics.map((topic) => ({
      domain: domain.slug,
      topic: topic.slug,
    }))
  );
}

export default function TopicPage({
  params,
}: {
  params: { domain: string; topic: string };
}) {
  const domain = taxonomy.domains.find((d) => d.slug === params.domain);
  const topic = domain?.topics.find((t) => t.slug === params.topic);
  const post = blogPosts[params.topic];

  if (!domain || !topic) {
    return <div>Topic not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Breadcrumbs */}
      <div className="mb-8">
        <Breadcrumbs currentPath={`/${params.domain}/${params.topic}`} />
      </div>

      {/* Topic Header */}
      <header className="mb-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
          {topic.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          {topic.description}
        </p>
      </header>

      {/* Topic Content */}
      <div className="prose prose-lg dark:prose-invert max-w-none">
        {post ? (
          <>
            <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
              Published on {new Date(post.metadata.date).toLocaleDateString()}
            </div>
            <p className="text-xl mb-8">{post.metadata.excerpt}</p>
            <p className="italic text-gray-600 dark:text-gray-300">
              Full content coming soon...
            </p>
          </>
        ) : (
          <p className="italic text-gray-600 dark:text-gray-300">
            Content for this topic is currently under development. Check back
            soon!
          </p>
        )}
      </div>
    </div>
  );
}
