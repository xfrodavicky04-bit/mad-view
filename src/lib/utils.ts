export function calculateReadingTime(htmlContent: string): number {
  const wordsPerMinute = 220;
  // Strip HTML tags to get pure text
  const cleanText = htmlContent.replace(/<\/?[^>]+(>|$)/g, "");
  const words = cleanText.trim().split(/\s+/).filter((w) => w.length > 0).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return Math.max(1, readingTime);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start
    .replace(/-+$/, ""); // Trim - from end
}

export function generateExcerpt(htmlContent: string, maxLength: number = 160): string {
  const cleanText = htmlContent.replace(/<\/?[^>]+(>|$)/g, "");
  if (cleanText.length <= maxLength) return cleanText;
  return cleanText.substring(0, maxLength).trim() + "...";
}

export function formatDate(date: Date | string | null): string {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
