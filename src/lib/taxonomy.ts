// SKOS-inspired taxonomy structure
export type Concept = {
  id: string;
  prefLabel: string;
  altLabels?: string[];
  broader?: string[];
  narrower?: string[];
  related?: string[];
  inScheme: string;
};

// Dublin Core metadata structure
export type DublinCore = {
  title: string;
  creator: string;
  subject: string[];
  description: string;
  publisher: string;
  contributor?: string[];
  date: string;
  type: string;
  format: string;
  identifier: string;
  language: string;
  relation?: string[];
  coverage?: string;
  rights?: string;
};

// RDF-like relationships
export type Relationship = {
  subject: string;
  predicate: string;
  object: string;
};

// Main taxonomy scheme
export const taxonomy = {
  domains: [
    {
      title: "Technical Communication",
      slug: "technical-communication",
      color: "red",
      topics: [
        {
          title: "The Craft of Clarity",
          slug: "the-craft-of-clarity",
        },
      ],
    },
    {
      title: "System Architecture",
      slug: "system-architecture",
      color: "blue",
      topics: [],
    },
    {
      title: "Coding Patterns",
      slug: "coding-patterns",
      color: "green",
      topics: [],
    },
  ],
};

// Blog post metadata
export const blogPosts = {
  "the-craft-of-clarity": {
    metadata: {
      title: "The Craft of Clarity: Writing Clean Code in a Complex World",
      creator: "James Husband",
      subject: ["clean-code", "writing-style", "technical-communication"],
      description:
        "An exploration of writing clear, maintainable code through the lens of technical communication.",
      publisher: "The Curious Code Monkey",
      date: "2023-12-14",
      type: "BlogPosting",
      format: "text/html",
      identifier: "the-craft-of-clarity",
      language: "en",
      relation: ["readability", "maintainability", "clarity"],
    } as DublinCore,
    relationships: [
      {
        subject: "the-craft-of-clarity",
        predicate: "implements",
        object: "clean-code",
      },
      {
        subject: "the-craft-of-clarity",
        predicate: "discusses",
        object: "technical-communication",
      },
    ] as Relationship[],
  },
};
