// pages/ProjectsCarousel.tsx
import React from "react";
import { Link } from "react-router-dom";
import { getFeaturedProjects } from "../../data/projectData";
import ProjectCard from "./ProjectCard";

const ProjectsCarousel: React.FC = () => {
  const featuredProjects = getFeaturedProjects(6);

  return (
    <section className="bg-[#f9fafb] py-12 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="24"
              viewBox="0 0 25 33"
              fill="none"
            >
              <mask id="mask-cw" fill="white">
                <path d="M0 0H25V33H0V0Z" />
              </mask>
              <path
                d="M0 0V-1H-1V0H0ZM0 33H-1V34H0V33ZM0 0V1H25V0V-1H0V0ZM25 33V32H0V33V34H25V33ZM0 33H1V0H0H-1V33H0Z"
                fill="#2563EB"
                mask="url(#mask-cw)"
              />
            </svg>
            <span className="text-blue-600 text-xs sm:text-sm font-semibold uppercase tracking-wider">
              Protection That Lasts a Lifetime
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Our Completed
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mt-1">
            <span className="text-blue-600">Construction</span>{" "}
            <span className="text-gray-400">Works</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              showCategory={false} // Hide category badge in carousel
              variant="carousel"
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Link
            to="/projects"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 sm:px-12 py-3 sm:py-3.5 rounded-lg transition duration-200 text-sm sm:text-base"
          >
            View all
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsCarousel;
