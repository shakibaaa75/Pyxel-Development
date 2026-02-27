export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML or plain text content
  image: string;
  category: string;
  date: string;
  readTime?: string; // Optional - will be calculated if not provided
}