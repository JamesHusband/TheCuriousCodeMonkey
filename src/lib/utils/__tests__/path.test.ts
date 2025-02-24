import { getAssetPath } from "../path";

describe("getAssetPath", () => {
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = originalNodeEnv;
  });

  it("returns path as is in development environment", () => {
    process.env.NODE_ENV = "development";
    expect(getAssetPath("/test/path")).toBe("/test/path");
  });

  it("prepends base path in production environment", () => {
    process.env.NODE_ENV = "production";
    expect(getAssetPath("/test/path")).toBe("/TheCuriousCodeMonkey/test/path");
  });

  it("handles empty path", () => {
    process.env.NODE_ENV = "production";
    expect(getAssetPath("")).toBe("/TheCuriousCodeMonkey");
  });

  it("handles path without leading slash", () => {
    process.env.NODE_ENV = "production";
    expect(getAssetPath("test/path")).toBe("/TheCuriousCodeMonkey/test/path");
  });

  it("handles root path", () => {
    process.env.NODE_ENV = "production";
    expect(getAssetPath("/")).toBe("/TheCuriousCodeMonkey/");
  });
});
