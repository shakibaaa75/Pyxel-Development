// components/ProjectCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import type { Project } from "../../data/projectData"; // Type-only import

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
  const { id, title, image, cost, client, year, location, category } = project;

  // Different height classes based on variant
  const imageHeightClass =
    variant === "carousel"
      ? "h-[250px] sm:h-[300px] md:h-[340px] lg:h-[378px]"
      : "h-[250px] sm:h-[300px] md:h-[340px]";

  return (
    <Link to={`/projects/${id}`} className="group block">
      <div className="flex flex-col gap-3">
        {/* Image Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <img
            src={image}
            alt={title}
            className={`w-full ${imageHeightClass} object-cover transition-transform duration-500 group-hover:scale-105`}
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
          {/* Labels */}
          <div className="grid grid-cols-3 mb-1">
            <p className="text-xs text-gray-400 text-left">Cost</p>
            <p className="text-xs text-gray-400 text-left">Client</p>
            <p className="text-xs text-gray-400 text-left">
              {variant === "carousel" ? "Project year" : "Year"}
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-3 mb-3">
            <p className="text-sm font-bold text-gray-900 text-left">{cost}</p>
            <p className="text-sm font-bold text-gray-900 text-left truncate">
              {client}
            </p>
            <p className="text-sm font-bold text-gray-900 text-left">{year}</p>
          </div>

          {/* Location */}
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
