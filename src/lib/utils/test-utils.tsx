import React, { ReactElement } from "react";
import {
  render as rtlRender,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@/lib/providers/ThemeProvider";
import { DialogProvider } from "@/lib/providers/DialogProvider";

// Mock IntersectionObserver
window.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
  observe: jest.fn().mockImplementation(() => {
    callback([{ isIntersecting: true }], { unobserve: jest.fn() });
  }),
  disconnect: jest.fn(),
  unobserve: jest.fn(),
}));

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};
Object.defineProperty(window, "sessionStorage", { value: sessionStorageMock });

function AllTheProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <DialogProvider>{children}</DialogProvider>
    </ThemeProvider>
  );
}

function customRender(ui: ReactElement, options = {}) {
  return rtlRender(ui, { wrapper: AllTheProviders, ...options });
}

// Re-export everything
export * from "@testing-library/react";
export { userEvent, waitFor, fireEvent, screen };

// Override render method
export { customRender as render };
