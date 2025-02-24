import { toSnakeCase } from "../string";

describe("toSnakeCase", () => {
  it("converts spaces to underscores", () => {
    expect(toSnakeCase("Hello World")).toBe("hello_world");
  });

  it("converts to lowercase", () => {
    expect(toSnakeCase("HELLO WORLD")).toBe("hello_world");
  });

  it("removes special characters", () => {
    expect(toSnakeCase("Hello! @World#")).toBe("hello_world");
  });

  it("replaces hyphens with underscores", () => {
    expect(toSnakeCase("hello-world")).toBe("hello_world");
  });

  it("replaces multiple spaces with single underscore", () => {
    expect(toSnakeCase("hello   world")).toBe("hello_world");
  });

  it("replaces multiple underscores with single underscore", () => {
    expect(toSnakeCase("hello___world")).toBe("hello_world");
  });

  it("trims leading and trailing spaces", () => {
    expect(toSnakeCase("  hello world  ")).toBe("hello_world");
  });

  it("handles empty string", () => {
    expect(toSnakeCase("")).toBe("");
  });

  it("handles string with only special characters", () => {
    expect(toSnakeCase("!@#$%^&*()")).toBe("");
  });
});
