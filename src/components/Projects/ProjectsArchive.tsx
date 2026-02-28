// pages/ProjectsArchive.tsx
import React, { useState } from "react";
import { allProjects, getUniqueCategories } from "../../data/projectData"; // Regular import for values
import type { Project } from "../../data/projectData"; // Type-only import for types
import ProjectCard from "../Page1/ProjectCard";

const ProjectsArchive: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("Show All Work");
  const categories = getUniqueCategories();

  const filteredProjects = allProjects.filter((project) => {
    if (activeCategory === "Show All Work") return true;
    return project.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div
        className="relative py-20 sm:py-28 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(./image/projects-hero-bg.jpg)" }}
      >
        <div className="absolute inset-0 bg-[#1a1a1a]/85" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-left">
            <span className="text-blue-500 text-sm font-medium uppercase tracking-wider mb-4 block">
              Great Experience In Building
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
              Our Projects
            </h1>
          </div>
        </div>
      </div>

      {/* Filter Tabs Section */}
      <div className="bg-white py-6 sm:py-8 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Let's See Our{" "}
              <span className="text-blue-600">Latest Projects</span>
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="relative">
            {/* Mobile Tabs */}
            <div className="flex sm:hidden overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory">
              <div className="flex gap-2 min-w-max">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2.5 text-sm font-medium rounded-lg whitespace-nowrap snap-start transition-all duration-300 ${
                      activeCategory === category
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Tabs */}
            <div className="hidden sm:flex flex-wrap justify-center gap-2 md:gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 md:px-6 py-2 text-sm font-medium transition-all duration-300 border-b-2 ${
                    activeCategory === category
                      ? "text-blue-600 border-blue-600"
                      : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  showCategory={true}
                  variant="default"
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No projects found
              </h3>
              <p className="text-gray-500">
                Try selecting a different category
              </p>
            </div>
          )}

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8 sm:mt-12">
            <button className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-600" />
            <button className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gray-300 hover:bg-gray-400 transition" />
            <button className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gray-300 hover:bg-gray-400 transition" />
            <button className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-gray-300 hover:bg-gray-400 transition" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsArchive;
