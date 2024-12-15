import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAssetPath(path: string): string {
  // Check if we're in development or production
  const isDevelopment = process.env.NODE_ENV === "development";

  // In development, use paths as is
  if (isDevelopment) {
    return path;
  }

  // In production (GitHub Pages), add the repository name as base path
  const basePath = "/TheCuriousCodeMonkey";
  return `${basePath}${path}`;
}
