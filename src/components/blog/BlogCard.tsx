import { Link } from "react-router-dom";
import type { BlogPost } from "../../types/blog";

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  const slug = post.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return (
    <Link to={`/blog/${slug}`} className="group block h-full cursor-pointer">
      <article className="h-full">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-2xl mb-5">
          <img
            src={post.image}
            alt={post.title}
            className="h-56 w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
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
