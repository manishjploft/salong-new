export function generateSlug(productName: string) {
  return productName
    .toLowerCase() // Convert to lower case
    .replace(/[^a-z0-9 -]/g, "") // Remove invalid chars
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/-+/g, "-"); // Collapse duplicate -
}
