/**
 * Gets the correct asset path based on the environment.
 */
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
