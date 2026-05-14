import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export interface BlogPost {
  id: string;
  siteId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  readTime: number;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  date?: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

/**
 * Axios client (API only)
 */
const apiClient = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

/**
 * FIX: Always resolve backend image URLs correctly
 */
const getImageUrl = (path: string): string => {
  if (!path) return '';

  // already absolute URL
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // ensure leading slash consistency
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;

  return `${API_URL}${normalizedPath}`;
};

/**
 * Helper: format date
 */
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
};

/**
 * Transform post (IMPORTANT FIX HERE)
 */
const transformPost = (post: BlogPost): BlogPost => {
  return {
    ...post,
    image: getImageUrl(post.image), // ✅ FIXED HERE
    date: formatDate(post.createdAt),
  };
};

/* =========================================================
   PUBLIC BLOG HOOKS
========================================================= */

export function useBlogPosts(siteId: string) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!siteId) {
      setLoading(false);
      return;
    }

    const fetchPosts = async () => {
      try {
        setLoading(true);

        const response = await apiClient.get(
          `/api/blogs?siteId=${siteId}`
        );

        const transformedPosts = response.data.map(transformPost);

        setPosts(transformedPosts);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching blog posts:', err);
        setError(err.response?.data?.error || 'Failed to load blog posts');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [siteId]);

  return { posts, loading, error };
}

/* =========================================================
   SINGLE BLOG
========================================================= */

export function useBlogPost(siteId: string, slug: string | undefined) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!siteId || !slug) {
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);

        const response = await apiClient.get(
          `/api/blogs/${slug}?siteId=${siteId}`
        );

        setPost(transformPost(response.data));
        setError(null);
      } catch (err: any) {
        console.error('Error fetching blog post:', err);

        if (err.response?.status === 404) {
          setError('Post not found');
        } else {
          setError(err.response?.data?.error || 'Failed to load blog post');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [siteId, slug]);

  return { post, loading, error };
}

/* =========================================================
   ADMIN HOOKS
========================================================= */

export function useAdminBlogs(siteId: string) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async () => {
    if (!siteId) {
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('admin_token');

    if (!token) {
      setError('Not authenticated');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const response = await apiClient.get(
        `/api/admin/blogs?siteId=${siteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const transformedPosts = response.data.map(transformPost);

      setPosts(transformedPosts);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching admin blogs:', err);
      setError(err.response?.data?.error || 'Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  }, [siteId]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const createPost = useCallback(
    async (postData: Partial<BlogPost>) => {
      const token = localStorage.getItem('admin_token');
      if (!token) throw new Error('Not authenticated');

      const response = await apiClient.post('/api/admin/blogs', postData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await fetchPosts();
      return transformPost(response.data);
    },
    [fetchPosts]
  );

  const updatePost = useCallback(
    async (id: string, postData: Partial<BlogPost>) => {
      const token = localStorage.getItem('admin_token');
      if (!token) throw new Error('Not authenticated');

      const response = await apiClient.put(
        `/api/admin/blogs/${id}`,
        postData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      await fetchPosts();
      return transformPost(response.data);
    },
    [fetchPosts]
  );

  const deletePost = useCallback(
    async (id: string) => {
      const token = localStorage.getItem('admin_token');
      if (!token) throw new Error('Not authenticated');

      await apiClient.delete(`/api/admin/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await fetchPosts();
    },
    [fetchPosts]
  );

  const togglePublish = useCallback(
    async (id: string, published: boolean) => {
      return updatePost(id, { published });
    },
    [updatePost]
  );

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    togglePublish,
    refetch: fetchPosts,
  };
}