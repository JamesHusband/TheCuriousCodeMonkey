/**
 * Converts a string to snake_case format.
 * Example: "Hello World" -> "hello_world"
 */
export function toSnakeCase(str: string): string {
  return str
    .trim() // Remove leading/trailing spaces first
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "_") // Replace spaces with underscores
    .replace(/-/g, "_") // Replace hyphens with underscores
    .replace(/_+/g, "_"); // Replace multiple underscores with single underscore
}
