// 

// data/blogData.ts
// Replaces the old static SAMPLE_POSTS export.
// Components that previously imported SAMPLE_POSTS should use the
// useBlogPosts() hook instead. The SAMPLE_POSTS export is kept as an
// empty fallback so TypeScript doesn't break during migration.

import { useState, useEffect } from "react";
import type { BlogPost } from "../types/blog";

const SITE_ID = "construction-site";
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080";

// ✅ FIX: image URL resolver
function getImageUrl(path: string): string {
  if (!path) return "";

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${API_BASE}${path.startsWith("/") ? path : "/" + path}`;
}

// ─── Hook: all published posts ────────────────────────────────────────────────

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetch(`${API_BASE}/api/blogs?siteId=${SITE_ID}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: BlogPost[]) => {
        if (!cancelled) {
          const normalized = (Array.isArray(data) ? data : []).map(normalizPost);
          setPosts(normalized);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("Failed to fetch blog posts:", err);
          setError(err.message);
          setPosts([]);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { posts, loading, error };
}

// ─── Hook: single post by slug ────────────────────────────────────────────────

export function useBlogPost(slug: string | undefined) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetch(`${API_BASE}/api/blogs/${encodeURIComponent(slug)}?siteId=${SITE_ID}`)
      .then((r) => {
        if (r.status === 404) return null;
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: BlogPost | null) => {
        if (!cancelled) {
          setPost(data ? normalizPost(data) : null);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          console.error("Failed to fetch blog post:", err);
          setError(err.message);
          setPost(null);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { post, loading, error };
}

// ─── Normalizer ───────────────────────────────────────────────────────────────

function normalizPost(raw: any): BlogPost {
  return {
    id: raw.id || raw._id || "",
    siteId: raw.siteId || SITE_ID,
    title: raw.title || "",
    slug: raw.slug || slugify(raw.title || ""),
    excerpt: raw.excerpt || "",
    content: raw.content || "",

    // ✅ FIXED IMAGE PATH
    image: getImageUrl(raw.image || ""),

    category: raw.category || "",
    tags: Array.isArray(raw.tags) ? raw.tags : [],
    readTime: raw.readTime || 0,
    published: raw.published ?? true,
    publishedAt: raw.publishedAt,

    date: raw.date || formatDate(raw.publishedAt || raw.createdAt),
    createdAt: raw.createdAt || "",
    updatedAt: raw.updatedAt || "",
  };
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function formatDate(dateStr?: string): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

// ─── Legacy export ────────────────────────────────────────────────────────────

export const SAMPLE_POSTS: BlogPost[] = [];