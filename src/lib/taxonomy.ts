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
      title: "Thinking Models",
      slug: "thinking_models",
      description:
        "Learn to spot patterns, analyze paths, and develop the mental agility needed for the journey ahead.",
      topics: [
        {
          title: "Pattern Recognition",
          slug: "pattern_recognition",
          description:
            "Understanding and identifying recurring patterns in complex systems.",
        },
        {
          title: "Mental Models",
          slug: "mental_models",
          description: "Frameworks for understanding and solving problems.",
        },
      ],
    },
    {
      title: "Knowledge Organisation",
      slug: "knowledge_organisation",
      description:
        "Master techniques to classify, structure, and navigate complex knowledge territories.",
      topics: [
        {
          title: "Information Architecture",
          slug: "information_architecture",
          description: "Structuring and organizing information effectively.",
        },
        {
          title: "Knowledge Mapping",
          slug: "knowledge_mapping",
          description: "Creating visual representations of knowledge domains.",
        },
      ],
    },
    {
      title: "Technical Communication",
      slug: "technical_communication",
      description:
        "Share complex discoveries clearly, whether through writing, speaking, or teaching others.",
      topics: [
        {
          title: "Documentation Writing",
          slug: "documentation_writing",
          description: "Creating clear and effective technical documentation.",
        },
        {
          title: "Knowledge Sharing",
          slug: "knowledge_sharing",
          description:
            "Techniques for effectively sharing technical knowledge.",
        },
      ],
    },
    {
      title: "Visualisation",
      slug: "visualisation",
      description:
        "Transform abstract concepts into clear visual guides that others can follow.",
      topics: [
        {
          title: "Data Visualization",
          slug: "data_visualization",
          description: "Representing data in visual formats.",
        },
        {
          title: "Process Mapping",
          slug: "process_mapping",
          description:
            "Creating visual representations of workflows and processes.",
        },
      ],
    },
    {
      title: "Process Documentation",
      slug: "process_documentation",
      description:
        "Create clear paths that others can follow through the knowledge jungle.",
      topics: [
        {
          title: "Workflow Design",
          slug: "workflow_design",
          description: "Designing and documenting efficient workflows.",
        },
        {
          title: "Standard Operating Procedures",
          slug: "standard_operating_procedures",
          description: "Creating and maintaining SOPs.",
        },
      ],
    },
    {
      title: "Tools & Automation",
      slug: "tools_and_automation",
      description:
        "Build and master the implements that make your knowledge journey smoother.",
      topics: [
        {
          title: "Documentation Tools",
          slug: "documentation_tools",
          description:
            "Tools and platforms for creating and managing documentation.",
        },
        {
          title: "Automation Techniques",
          slug: "automation_techniques",
          description:
            "Automating documentation and knowledge management tasks.",
        },
      ],
    },
  ],
};

export type DomainSlug = (typeof taxonomy.domains)[number]["slug"];

export interface BlogPost {
  metadata: {
    title: string;
    date: string;
    creator: string;
    subject: string[];
    domain: DomainSlug;
    excerpt: string;
  };
}

export const blogPosts: Record<string, BlogPost> = {
  documentation_writing: {
    metadata: {
      title: "The Art of Technical Documentation",
      date: "2024-01-15",
      creator: "James Husband",
      subject: ["technical-writing", "documentation", "best-practices"],
      domain: "technical_communication",
      excerpt:
        "In the ever-evolving landscape of software development, one principle stands as a timeless beacon: clarity. As our systems grow more complex and our teams more distributed, the ability to write clear, understandable documentation becomes not just a virtue, but a necessity.",
    },
  },
};
