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
      id: "documentation",
      prefLabel: "Documentation",
      narrower: ["documentation-frameworks", "documentation-practices"],
      inScheme: "software-development",
    },
    {
      id: "documentation-frameworks",
      prefLabel: "Documentation Frameworks",
      broader: ["documentation"],
      narrower: ["diataxis", "oda", "lean-docs"],
      inScheme: "software-development",
    },
    {
      id: "documentation-practices",
      prefLabel: "Documentation Practices",
      broader: ["documentation"],
      narrower: ["ddd", "agile-docs", "visualization"],
      inScheme: "software-development",
    },
    {
      id: "diataxis",
      prefLabel: "Diátaxis Framework",
      broader: ["documentation-frameworks"],
      related: ["tutorials", "how-to", "reference", "explanation"],
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
      subject: [
        "documentation",
        "documentation-frameworks",
        "documentation-practices",
      ],
      description:
        "An exploration of modern documentation frameworks and methodologies.",
      publisher: "The Curious Code Monkey",
      date: "2023-12-14",
      type: "BlogPosting",
      format: "text/html",
      identifier: "the-craft-of-clarity",
      language: "en",
      relation: ["diataxis", "oda", "lean-docs"],
    } as DublinCore,
    relationships: [
      {
        subject: "the-craft-of-clarity",
        predicate: "implements",
        object: "diataxis",
      },
      {
        subject: "the-craft-of-clarity",
        predicate: "discusses",
        object: "documentation-frameworks",
      },
    ] as Relationship[],
  },
};
