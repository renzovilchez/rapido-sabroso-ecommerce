/**
 * Normalizes a string by converting to lowercase, removing accents (diacritics),
 * and replacing spaces/special characters with hyphens.
 * Useful for creating URL slugs.
 *
 * @param {string} str - The string to normalize
 * @returns {string} The normalized string
 */
export function normalizeString(str) {
  if (typeof str !== "string") return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}
