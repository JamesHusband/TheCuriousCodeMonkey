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
      title: "Technical Documentation",
      slug: "technical-documentation",
      color: "blue",
      topics: [],
    },
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
      title: "Process Documentation and Workflows",
      slug: "process-documentation",
      color: "green",
      topics: [],
    },
    {
      title: "Knowledge Organisation and Representation",
      slug: "knowledge-organisation",
      color: "purple",
      topics: [],
    },
    {
      title: "Visualisation and Modelling",
      slug: "visualisation-modelling",
      color: "orange",
      topics: [],
    },
    {
      title: "Tools and Automation",
      slug: "tools-automation",
      color: "yellow",
      topics: [],
    },
  ],
};

export interface BlogPost {
  metadata: {
    title: string;
    date: string;
    creator: string;
    subject: string[];
    domain:
      | "technical-documentation"
      | "technical-communication"
      | "process-documentation"
      | "knowledge-organisation"
      | "visualisation-modelling"
      | "tools-automation";
    excerpt: string;
  };
}

export const blogPosts: Record<string, BlogPost> = {
  "the-craft-of-clarity": {
    metadata: {
      title: "The Craft of Clarity",
      date: "2024-01-15",
      creator: "James Husband",
      subject: ["technical-writing", "documentation", "best-practices"],
      domain: "technical-communication",
      excerpt:
        "In the ever-evolving landscape of software development, one principle stands as a timeless beacon: clarity. As our systems grow more complex and our teams more distributed, the ability to write clear, understandable code becomes not just a virtue, but a necessity.",
    },
  },
};
