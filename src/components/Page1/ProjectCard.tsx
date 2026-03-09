// components/ProjectCard.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import type { Project } from "../../data/projectData";

interface ProjectCardProps {
  project: Project;
  showCategory?: boolean;
  variant?: "default" | "carousel";
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  showCategory = true,
  variant = "default",
}) => {
  const {
    id,
    title,
    image,
    imageWebp,
    cost,
    client,
    year,
    location,
    category,
  } = project;
  const [imageError, setImageError] = useState(false);

  // Extract filename for fallback (if needed)
  const filename = image
    .replace("/image/", "")
    .replace(/\.(jpg|jpeg|png)$/, "");

  // Different height classes based on variant
  const imageHeightClass =
    variant === "carousel"
      ? "h-[250px] sm:h-[300px] md:h-[340px] lg:h-[378px]"
      : "h-[250px] sm:h-[300px] md:h-[340px]";

  // First 4 projects are critical (above the fold)
  const isCritical = parseInt(id) <= 4;

  // Determine image source based on error state
  const imageSrc = imageError
    ? image // Fallback to original JPG if WebP failed
    : imageWebp || `/image/${filename}-960.webp`; // Try WebP first (either from data or constructed)

  return (
    <Link to={`/projects/${id}`} className="group block">
      {/* Preload for critical projects only */}
      {isCritical && !imageError && imageWebp && (
        <link rel="preload" as="image" href={imageWebp} type="image/webp" />
      )}

      <div className="flex flex-col gap-3">
        {/* Image Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          {/* Optimized Image with WebP and JPG fallback */}
          <img
            key={id} // Use id as key to prevent re-render loops
            src={imageSrc}
            alt={title}
            className={`w-full ${imageHeightClass} object-cover transition-transform duration-500 group-hover:scale-105`}
            loading={isCritical ? "eager" : "lazy"}
            decoding={isCritical ? "sync" : "async"}
            fetchPriority={isCritical ? "high" : "auto"}
            onError={() => {
              // Only try fallback once to prevent infinite loops
              if (!imageError) {
                console.log(
                  `WebP failed for project ${id}, using JPG fallback`,
                );
                setImageError(true);
              }
            }}
          />

          {/* Gradient Overlay */}
          <div className="absolute top-0 left-0 w-full h-1/5 bg-gradient-to-b from-black/60 to-transparent" />

          {/* Category Badge - Optional */}
          {showCategory && (
            <span className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
              {category}
            </span>
          )}

          {/* Title */}
          <h3 className="absolute top-4 left-4 text-white text-base sm:text-lg font-semibold drop-shadow-md z-10">
            {title}
          </h3>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 group-hover:shadow-lg transition border border-gray-100">
          <div className="grid grid-cols-3 mb-1">
            <p className="text-xs text-gray-400 text-left">Cost</p>
            <p className="text-xs text-gray-400 text-left">Client</p>
            <p className="text-xs text-gray-400 text-left">
              {variant === "carousel" ? "Project year" : "Year"}
            </p>
          </div>

          <div className="grid grid-cols-3 mb-3">
            <p className="text-sm font-bold text-gray-900 text-left">{cost}</p>
            <p className="text-sm font-bold text-gray-900 text-left truncate">
              {client}
            </p>
            <p className="text-sm font-bold text-gray-900 text-left">{year}</p>
          </div>

          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <svg
              className="w-4 h-4 text-blue-600 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="truncate">{location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
