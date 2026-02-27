export function calculateReadingTime(content: string): string {
  // Remove HTML tags if content is HTML
  const text = content.replace(/<[^>]*>/g, '');
  
  // Count words (split by whitespace and filter empty strings)
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  
  // Average reading speed: 200 words per minute
  const wordsPerMinute = 200;
  
  // Calculate minutes
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  // Return formatted string
  return `${minutes} min read`;
}

// Alternative: For plain text content
export function calculateReadingTimeFromText(text: string): string {
  const words = text.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  const wordsPerMinute = 200;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  return `${minutes} min read`;
}