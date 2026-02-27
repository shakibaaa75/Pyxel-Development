import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SAMPLE_POSTS } from "../../data/blogData";
import type { BlogPost } from "../../types/blog";

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [instagramPosts, setInstagramPosts] = useState<any[]>([]);

  // Fetch Instagram posts
  useEffect(() => {
    // This would be replaced with your actual Instagram API call
    // For now, we'll use a placeholder service that always works
    const fetchInstagramPosts = async () => {
      // Simulating Instagram API response with your actual post
      const mockInstagramData = [
        {
          id: "DL5JoPjBm-L",
          media_url:
            "https://images.unsplash.com/photo-1581094794329-c8112c4e5190?w=400&h=400&fit=crop",
          permalink: "https://www.instagram.com/p/DL5JoPjBm-L/",
          caption: "🏗️ 3 Duplexes. 3 Stages. All Underway in Citrus Heights!",
          timestamp: "2025-07-09T12:00:00Z",
        },
        // Add more posts as needed - using Unsplash as fallback images
        {
          id: "2",
          media_url:
            "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&h=400&fit=crop",
          permalink: "https://www.instagram.com/pyxelconstruction/",
          caption: "Construction progress update",
          timestamp: "2025-07-08T12:00:00Z",
        },
        {
          id: "3",
          media_url:
            "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=400&fit=crop",
          permalink: "https://www.instagram.com/pyxelconstruction/",
          caption: "Framing completed",
          timestamp: "2025-07-07T12:00:00Z",
        },
        {
          id: "4",
          media_url:
            "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=400&h=400&fit=crop",
          permalink: "https://www.instagram.com/pyxelconstruction/",
          caption: "Foundation work",
          timestamp: "2025-07-06T12:00:00Z",
        },
        {
          id: "5",
          media_url:
            "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop",
          permalink: "https://www.instagram.com/pyxelconstruction/",
          caption: "Site preparation",
          timestamp: "2025-07-05T12:00:00Z",
        },
        {
          id: "6",
          media_url:
            "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=400&h=400&fit=crop",
          permalink: "https://www.instagram.com/pyxelconstruction/",
          caption: "Final touches",
          timestamp: "2025-07-04T12:00:00Z",
        },
      ];

      setInstagramPosts(mockInstagramData);
    };

    fetchInstagramPosts();
  }, []);

  useEffect(() => {
    const foundPost = SAMPLE_POSTS.find((p) => {
      const postSlug = p.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      return postSlug === slug;
    });

    if (foundPost) {
      setPost(foundPost);

      // Set meta tags for the featured image
      updateMetaTags(foundPost);
    } else {
      navigate("/", { replace: true });
    }
    setLoading(false);
  }, [slug, navigate]);

  // Helper function to update meta tags
  const updateMetaTags = (post: BlogPost) => {
    // Remove any existing meta tags we might have added
    const existingMeta = document.querySelector('meta[property="og:image"]');
    const existingTwitterMeta = document.querySelector(
      'meta[name="twitter:image"]',
    );

    if (existingMeta) existingMeta.remove();
    if (existingTwitterMeta) existingTwitterMeta.remove();

    // Create new meta tags with absolute URL
    const baseUrl = window.location.origin;
    const imageUrl = post.image.startsWith("http")
      ? post.image
      : `${baseUrl}${post.image.startsWith("/") ? "" : "/"}${post.image}`;

    // Create og:image meta tag
    const ogImage = document.createElement("meta");
    ogImage.setAttribute("property", "og:image");
    ogImage.setAttribute("content", imageUrl);
    document.head.appendChild(ogImage);

    // Create twitter:image meta tag
    const twitterImage = document.createElement("meta");
    twitterImage.setAttribute("name", "twitter:image");
    twitterImage.setAttribute("content", imageUrl);
    document.head.appendChild(twitterImage);

    // Also update title and other meta if needed
    document.title = `${post.title} - Your Blog`;

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", post.title);
    }

    const ogDescription = document.querySelector(
      'meta[property="og:description"]',
    );
    if (ogDescription) {
      ogDescription.setAttribute(
        "content",
        post.excerpt || post.content.substring(0, 150).replace(/<[^>]*>/g, ""),
      );
    }
  };

  // Clean up meta tags when component unmounts
  useEffect(() => {
    return () => {
      const ogImage = document.querySelector('meta[property="og:image"]');
      const twitterImage = document.querySelector('meta[name="twitter:image"]');

      if (ogImage && ogImage.getAttribute("content")?.includes("blob:")) {
        ogImage.remove();
      }
      if (
        twitterImage &&
        twitterImage.getAttribute("content")?.includes("blob:")
      ) {
        twitterImage.remove();
      }
    };
  }, []);

  // Helper function to get correct image path
  const getImageUrl = (imagePath: string) => {
    if (imagePath.startsWith("http")) {
      return imagePath;
    }
    // Remove any leading './' or '../' and ensure it's absolute from root
    const cleanPath = imagePath.replace(/^\.\/|^\.\.\//g, "");
    // Make sure the path starts with a forward slash
    return cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  const readingTime = post.readTime || calculateReadingTime(post.content);
  const currentIndex = SAMPLE_POSTS.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? SAMPLE_POSTS[currentIndex - 1] : null;
  const nextPost =
    currentIndex < SAMPLE_POSTS.length - 1
      ? SAMPLE_POSTS[currentIndex + 1]
      : null;

  // Get unique categories
  const categories = [...new Set(SAMPLE_POSTS.map((p) => p.category))];

  // Get top posts (most recent)
  const topPosts = SAMPLE_POSTS.filter((p) => p.id !== post.id).slice(0, 5);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <span>/</span>
            <Link to="/" className="hover:text-blue-600 transition">
              Blog
            </Link>
            <span>/</span>
            <span className="text-gray-900 truncate max-w-xs">
              {post.title}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content - Left Side */}
          <div className="lg:col-span-2">
            {/* Featured Image */}
            <div className="relative rounded-2xl overflow-hidden mb-8 bg-gray-100">
              <img
                src={getImageUrl(post.image)}
                alt={post.title}
                className="w-full h-[400px] lg:h-[500px] object-cover"
                onError={(e) => {
                  // Fallback image if the main one fails to load
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1581094794329-c8112c4e5190?w=1200&h=600&fit=crop";
                }}
              />
            </div>

            {/* Title & Meta */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  By Admin
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {post.date}
                </span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span className="text-blue-600 font-medium">
                  {post.category}
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {post.title}
              </h1>

              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {readingTime} read
              </div>
            </div>

            {/* Content */}
            <div
              className="prose prose-lg max-w-none mb-12
              prose-headings:text-gray-900 prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:text-blue-700
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-ul:text-gray-600 prose-ul:mb-4
              prose-li:marker:text-blue-600
              prose-blockquote:border-l-4 prose-blockquote:border-blue-600 
              prose-blockquote:bg-blue-50 prose-blockquote:pl-6 prose-blockquote:py-4
              prose-blockquote:text-gray-700 prose-blockquote:italic prose-blockquote:rounded-r-lg
              prose-img:rounded-xl prose-img:my-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-3 mb-12 pt-8 border-t border-gray-100">
              <span className="text-gray-500 text-sm font-medium">Tags:</span>
              {[post.category, "Construction", "Tips", "Guide"].map(
                (tag, index) => (
                  <Link
                    key={index}
                    to={`/blog?tag=${tag.toLowerCase()}`}
                    className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-full hover:bg-blue-600 hover:text-white transition"
                  >
                    {tag}
                  </Link>
                ),
              )}
            </div>

            {/* Post Navigation */}
            <div className="grid grid-cols-2 gap-4 mb-12">
              {prevPost ? (
                <Link
                  to={`/blog/${prevPost.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "")}`}
                  className="group p-6 bg-white border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-md transition text-left"
                >
                  <span className="text-sm text-gray-400 mb-2 block">
                    ← Previous Post
                  </span>
                  <span className="text-gray-900 font-medium line-clamp-2 group-hover:text-blue-600 transition">
                    {prevPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
              {nextPost ? (
                <Link
                  to={`/blog/${nextPost.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "")}`}
                  className="group p-6 bg-white border border-gray-100 rounded-xl hover:border-blue-200 hover:shadow-md transition text-right"
                >
                  <span className="text-sm text-gray-400 mb-2 block">
                    Next Post →
                  </span>
                  <span className="text-gray-900 font-medium line-clamp-2 group-hover:text-blue-600 transition">
                    {nextPost.title}
                  </span>
                </Link>
              ) : (
                <div />
              )}
            </div>

            {/* Comment Form */}
            <div className="bg-white rounded-2xl p-8 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Leave a comment
              </h3>
              <form className="space-y-4">
                <textarea
                  placeholder="Your comment"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition resize-none"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                  />
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                  />
                  <input
                    type="url"
                    placeholder="Your website"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition"
                >
                  Submit Comment
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar - Right Side */}
          <div className="lg:col-span-1 space-y-8">
            {/* Categories */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Categories
              </h3>
              <ul className="space-y-3">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link
                      to={`/blog?category=${category.toLowerCase()}`}
                      className="flex items-center justify-between text-gray-600 hover:text-blue-600 transition group"
                    >
                      <span>{category}</span>
                      <span className="text-sm text-gray-400 group-hover:text-blue-600">
                        {
                          SAMPLE_POSTS.filter((p) => p.category === category)
                            .length
                        }
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Search */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Top Posts */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Top Posts
              </h3>
              <ul className="space-y-4">
                {topPosts.map((topPost, index) => (
                  <li key={topPost.id}>
                    <Link
                      to={`/blog/${topPost.title
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-|-$/g, "")}`}
                      className="flex gap-4 group"
                    >
                      <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-blue-600 transition">
                          {topPost.title}
                        </h4>
                        <span className="text-xs text-gray-400">
                          {topPost.date}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instagram Grid - FIXED VERSION */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center justify-between">
                <span>Instagram</span>
                <a
                  href="https://www.instagram.com/pyxelconstruction/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-700 font-normal"
                >
                  @pyxelconstruction
                </a>
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {instagramPosts.slice(0, 6).map((post) => (
                  <a
                    key={post.id}
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative aspect-square rounded-lg overflow-hidden group bg-gray-100"
                  >
                    <img
                      src={post.media_url}
                      alt={post.caption || "Instagram post"}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
              <div className="mt-4 text-center">
                <a
                  href="https://www.instagram.com/pyxelconstruction/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-gray-500 hover:text-blue-600 transition"
                >
                  Follow us on Instagram →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function for reading time
function calculateReadingTime(content: string): string {
  const text = content.replace(/<[^>]*>/g, "");
  const words = text
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0);
  const minutes = Math.ceil(words.length / 200);
  return `${minutes} min`;
}
