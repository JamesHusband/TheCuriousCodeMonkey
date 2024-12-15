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
export const taxonomyScheme = {
  id: "software-development",
  title: "Software Development Knowledge Base",
  concepts: [
    {
      id: "technical-communication",
      prefLabel: "Technical Communication",
      narrower: ["documentation", "writing-style", "knowledge-sharing"],
      inScheme: "software-development",
    },
    {
      id: "documentation",
      prefLabel: "Documentation",
      broader: ["technical-communication"],
      narrower: ["documentation-frameworks", "documentation-practices"],
      inScheme: "software-development",
    },
    {
      id: "writing-style",
      prefLabel: "Writing Style",
      broader: ["technical-communication"],
      narrower: ["clarity", "conciseness", "audience-focus"],
      inScheme: "software-development",
    },
    {
      id: "knowledge-sharing",
      prefLabel: "Knowledge Sharing",
      broader: ["technical-communication"],
      narrower: ["mentoring", "presentations", "code-reviews"],
      inScheme: "software-development",
    },
    {
      id: "system-architecture",
      prefLabel: "System Architecture",
      narrower: ["design-patterns", "scalability", "integration"],
      inScheme: "software-development",
    },
    {
      id: "design-patterns",
      prefLabel: "Design Patterns",
      broader: ["system-architecture"],
      narrower: ["microservices", "event-driven", "domain-driven"],
      inScheme: "software-development",
    },
    {
      id: "scalability",
      prefLabel: "Scalability",
      broader: ["system-architecture"],
      narrower: [
        "horizontal-scaling",
        "vertical-scaling",
        "distributed-systems",
      ],
      inScheme: "software-development",
    },
    {
      id: "integration",
      prefLabel: "Integration",
      broader: ["system-architecture"],
      narrower: ["apis", "messaging", "data-integration"],
      inScheme: "software-development",
    },
    {
      id: "coding-patterns",
      prefLabel: "Coding Patterns",
      narrower: ["clean-code", "refactoring", "testing"],
      inScheme: "software-development",
    },
    {
      id: "clean-code",
      prefLabel: "Clean Code",
      broader: ["coding-patterns"],
      narrower: ["readability", "maintainability", "solid-principles"],
      inScheme: "software-development",
    },
    {
      id: "refactoring",
      prefLabel: "Refactoring",
      broader: ["coding-patterns"],
      narrower: ["code-smells", "technical-debt", "modernization"],
      inScheme: "software-development",
    },
    {
      id: "testing",
      prefLabel: "Testing",
      broader: ["coding-patterns"],
      narrower: [
        "unit-testing",
        "integration-testing",
        "test-driven-development",
      ],
      inScheme: "software-development",
    },
  ] as Concept[],
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
