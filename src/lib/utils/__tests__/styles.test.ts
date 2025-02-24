import { cn } from "../styles";

describe("cn (className utility)", () => {
  it("combines multiple class names", () => {
    expect(cn("class1", "class2")).toBe("class1 class2");
  });

  it("handles conditional classes", () => {
    expect(cn("base", { conditional: true })).toBe("base conditional");
    expect(cn("base", { conditional: false })).toBe("base");
  });

  it("merges tailwind classes", () => {
    expect(cn("p-4 bg-red-500", "p-6")).toBe("bg-red-500 p-6");
  });

  it("handles array of classes", () => {
    expect(cn(["class1", "class2"])).toBe("class1 class2");
  });

  it("handles undefined and null values", () => {
    expect(cn("class1", undefined, null, "class2")).toBe("class1 class2");
  });

  it("handles empty strings", () => {
    expect(cn("", "class1", "", "class2", "")).toBe("class1 class2");
  });

  it("merges complex tailwind utilities", () => {
    const result = cn(
      "text-gray-500 dark:text-gray-400",
      "hover:text-gray-700 dark:hover:text-gray-300"
    );

    // Check that all classes are present, regardless of order
    expect(result).toContain("text-gray-500");
    expect(result).toContain("hover:text-gray-700");
    expect(result).toContain("dark:text-gray-400");
    expect(result).toContain("dark:hover:text-gray-300");
  });

  it("handles complex conditional classes", () => {
    const isActive = true;
    const isDisabled = false;

    expect(
      cn("base-class", {
        "is-active": isActive,
        "is-disabled": isDisabled,
      })
    ).toBe("base-class is-active");
  });
});
