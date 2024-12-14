import { taxonomyScheme, type Concept } from "@/lib/taxonomy";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

function findConcept(id: string): Concept | undefined {
  return taxonomyScheme.concepts.find((c) => c.id === id);
}

function getBreadcrumbPath(conceptId: string): Concept[] {
  const path: Concept[] = [];
  let current = findConcept(conceptId);

  while (current) {
    path.unshift(current);
    if (current.broader && current.broader.length > 0) {
      current = findConcept(current.broader[0]);
    } else {
      break;
    }
  }

  return path;
}

export function Navigation() {
  const topLevelConcepts = taxonomyScheme.concepts.filter((c) => !c.broader);

  return (
    <nav className="space-y-4">
      <h2 className="text-lg font-semibold text-white mb-4">Knowledge Base</h2>
      {topLevelConcepts.map((concept) => (
        <NavigationItem key={concept.id} concept={concept} />
      ))}
    </nav>
  );
}

function NavigationItem({ concept }: { concept: Concept }) {
  const hasChildren = concept.narrower && concept.narrower.length > 0;
  const children = concept.narrower?.map((id) => findConcept(id)) ?? [];

  return (
    <div className="space-y-2">
      <Link
        href={`/topics/${concept.id}`}
        className="text-gray-300 hover:text-white transition-colors block"
      >
        {concept.prefLabel}
      </Link>
      {hasChildren && (
        <div className="pl-4 space-y-2">
          {children.map(
            (child) =>
              child && <NavigationItem key={child.id} concept={child} />
          )}
        </div>
      )}
    </div>
  );
}

export function Breadcrumbs({ currentId }: { currentId: string }) {
  const path = getBreadcrumbPath(currentId);

  return (
    <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
      <Link
        href="/"
        className="hover:text-red-600 dark:hover:text-red-400 transition-colors"
      >
        Home
      </Link>
      {path.map((concept, index) => (
        <div key={concept.id} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4" />
          <Link
            href={`/topics/${concept.id}`}
            className={`hover:text-red-600 dark:hover:text-red-400 transition-colors ${
              index === path.length - 1
                ? "text-gray-700 dark:text-gray-200"
                : ""
            }`}
          >
            {concept.prefLabel}
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
        const concept = findConcept(id);
        if (!concept) return null;

        return (
          <Link
            key={id}
            href={`/topics/${id}`}
            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-red-600/10 text-red-600 dark:bg-red-400/10 dark:text-red-400 hover:bg-red-600/20 dark:hover:bg-red-400/20 transition-colors"
          >
            {concept.prefLabel}
          </Link>
        );
      })}
    </div>
  );
}
