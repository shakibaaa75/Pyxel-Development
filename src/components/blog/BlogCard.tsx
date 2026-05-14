import { Link } from "react-router-dom";
import type { BlogPost } from "../../types/blog";

interface BlogCardProps {
  post: BlogPost;
}

const getImageUrl = (imagePath: string) => {
  if (!imagePath)
    return "https://images.unsplash.com/photo-1581094794329-c8112c4e5190?w=800&h=400&fit=crop";
  if (imagePath.startsWith("http")) return imagePath;
  const API_BASE = import.meta.env.VITE_API_URL;
  const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
  return `${API_BASE}${cleanPath}`;
};

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block h-full cursor-pointer"
    >
      <article className="h-full">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-2xl mb-5">
          <img
            src={getImageUrl(post.image)}
            alt={post.title}
            className="h-56 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "https://images.unsplash.com/photo-1581094794329-c8112c4e5190?w=800&h=400&fit=crop";
            }}
          />
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-4 leading-snug line-clamp-2 min-h-[3.5rem] transition-colors duration-300 group-hover:text-blue-600">
          {post.title}
        </h3>

        {/* Read More Link */}
        <div className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
          <span>Read More</span>
          <svg
            className="w-4 h-4 text-blue-600 transition-transform duration-300 ease-out group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </article>
    </Link>
  );
}
