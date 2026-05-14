export interface BlogPost {
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  tags: string[];
  siteId: string;
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime?: string;
}