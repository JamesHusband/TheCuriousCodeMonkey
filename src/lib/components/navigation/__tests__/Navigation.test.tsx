import { render, screen, fireEvent } from "@/lib/utils/test-utils";
import { Navigation, Breadcrumbs, TopicTags } from "../Navigation";
import { taxonomy } from "@/lib/taxonomy";

// Mock the taxonomy data
jest.mock("@/lib/taxonomy", () => ({
  taxonomy: {
    domains: [
      {
        title: "Test Domain",
        slug: "test-domain",
        topics: [
          {
            title: "Test Topic",
            slug: "test-topic",
          },
        ],
      },
      {
        title: "Another Domain",
        slug: "another-domain",
        topics: [],
      },
    ],
  },
}));

describe("Navigation", () => {
  it("renders navigation with domains", () => {
    render(<Navigation />);

    expect(screen.getByText("Knowledge Domains")).toBeInTheDocument();
    expect(screen.getByText("Test Domain")).toBeInTheDocument();
    expect(screen.getByText("Another Domain")).toBeInTheDocument();
  });

  it("expands and collapses domain topics", () => {
    render(<Navigation />);

    // Topics are expanded by default
    expect(screen.getByText("Test Topic")).toBeInTheDocument();

    // Collapse topics
    const collapseButton = screen.getByLabelText("Collapse section");
    fireEvent.click(collapseButton);
    expect(screen.queryByText("Test Topic")).not.toBeInTheDocument();

    // Expand topics
    const expandButton = screen.getByLabelText("Expand section");
    fireEvent.click(expandButton);
    expect(screen.getByText("Test Topic")).toBeInTheDocument();
  });

  it("does not show expand/collapse button for domains without topics", () => {
    render(<Navigation />);

    const domainWithoutTopics = screen.getByText("Another Domain");
    const parentElement = domainWithoutTopics.parentElement;
    expect(parentElement?.querySelector("button")).not.toBeInTheDocument();
  });
});

describe("Breadcrumbs", () => {
  it("renders home link", () => {
    render(<Breadcrumbs currentPath="/" />);

    const homeLink = screen.getByText("Home");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  it("renders domain breadcrumb", () => {
    render(<Breadcrumbs currentPath="/test-domain" />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Test Domain")).toBeInTheDocument();
  });

  it("renders domain and topic breadcrumbs", () => {
    render(<Breadcrumbs currentPath="/test-domain/test-topic" />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Test Domain")).toBeInTheDocument();
    expect(screen.getByText("Test Topic")).toBeInTheDocument();
  });

  it("handles unknown paths gracefully", () => {
    render(<Breadcrumbs currentPath="/unknown/path" />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("unknown")).toBeInTheDocument();
    expect(screen.getByText("path")).toBeInTheDocument();
  });
});

describe("TopicTags", () => {
  it("renders domain tags", () => {
    render(<TopicTags conceptIds={["test-domain"]} />);

    const tag = screen.getByText("Test Domain");
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveAttribute("href", "/test-domain");
  });

  it("renders topic tags", () => {
    render(<TopicTags conceptIds={["test-topic"]} />);

    const tag = screen.getByText("Test Topic");
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveAttribute("href", "/test-domain/test-topic");
  });

  it("handles unknown concept IDs gracefully", () => {
    render(<TopicTags conceptIds={["unknown-id"]} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("renders multiple tags", () => {
    render(<TopicTags conceptIds={["test-domain", "test-topic"]} />);

    expect(screen.getByText("Test Domain")).toBeInTheDocument();
    expect(screen.getByText("Test Topic")).toBeInTheDocument();
  });
});
