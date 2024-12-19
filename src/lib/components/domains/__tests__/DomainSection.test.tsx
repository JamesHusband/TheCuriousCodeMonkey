import { render, screen } from "@/lib/utils/test-utils";
import { DomainSection } from "../DomainSection";

describe("DomainSection", () => {
  const mockProps = {
    title: "Test Domain",
    description: "Test Description",
    imageSrc: "/test-image.png",
    imageAlt: "Test Image",
  };

  it("renders the domain section with title and description", () => {
    render(<DomainSection {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
  });

  it("renders the image with correct alt text", () => {
    render(<DomainSection {...mockProps} />);

    const image = screen.getByAltText(mockProps.imageAlt);
    expect(image).toBeInTheDocument();
  });

  it("creates a link with the correct path", () => {
    render(<DomainSection {...mockProps} />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/test_domain");
  });
});
