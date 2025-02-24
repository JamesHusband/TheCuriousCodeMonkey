import "@testing-library/jest-dom";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
    };
  },
  usePathname() {
    return "";
  },
}));

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: function Image({ src, alt, fill, priority, ...props }: any) {
    // Convert boolean props to strings
    const imgProps = {
      ...props,
      src,
      alt,
      "data-fill": fill ? "true" : undefined,
      "data-priority": priority ? "true" : undefined,
    };
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...imgProps} />;
  },
}));

// Mock getAssetPath utility
jest.mock("@/lib/utils", () => ({
  ...jest.requireActual("@/lib/utils"),
  getAssetPath: (path: string) => path,
}));
