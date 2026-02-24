import React from "react";

// Type for a single project
interface Project {
  title: string;
  image: string;
  cost: string;
  client: string;
  year: string;
  location: string;
}

const projects: Project[] = [
  {
    title: "Serenity community",
    image: "./image/image10.jpg",
    cost: "$234k",
    client: "ABS nexus",
    year: "15 may 2026",
    location: "Dixon road-12, Australia",
  },
  {
    title: "Serenity community",
    image: "./image/image11.jpg",
    cost: "$234k",
    client: "ABS nexus",
    year: "15 may 2026",
    location: "Dixon road-12, Australia",
  },
  {
    title: "Serenity community",
    image: "./image/image12.jpg",
    cost: "$234k",
    client: "ABS nexus",
    year: "15 may 2026",
    location: "Dixon road-12, Australia",
  },
  {
    title: "Serenity community",
    image: "./image/image10.jpg",
    cost: "$234k",
    client: "ABS nexus",
    year: "15 may 2026",
    location: "Dixon road-12, Australia",
  },
  {
    title: "Serenity community",
    image: "./image/image11.jpg",
    cost: "$234k",
    client: "ABS nexus",
    year: "15 may 2026",
    location: "Dixon road-12, Australia",
  },
  {
    title: "Serenity community",
    image: "./image/image12.jpg",
    cost: "$234k",
    client: "ABS nexus",
    year: "15 may 2026",
    location: "Dixon road-12, Australia",
  },
];

// Card component with typed props - Exact match to reference
const ProjectCard: React.FC<Project> = ({
  title,
  image,
  cost,
  client,
  year,
  location,
}) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
    {/* Image Container with rounded corners */}
    <div className="relative m-3 rounded-xl overflow-hidden">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      {/* Title overlay at top */}
      <h3 className="absolute top-3 left-3 text-white text-lg font-semibold drop-shadow-md">
        {title}
      </h3>
    </div>

    {/* Content - no padding on sides, just bottom */}
    <div className="px-4 pb-4">
      {/* Three columns - Cost, Client, Project year */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-xs text-gray-400 mb-1">Cost</p>
          <p className="text-sm font-bold text-gray-900">{cost}</p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-xs text-gray-400 mb-1">Client</p>
          <p className="text-sm font-bold text-gray-900">{client}</p>
        </div>
        <div className="flex-1 text-right">
          <p className="text-xs text-gray-400 mb-1">Project year</p>
          <p className="text-sm font-bold text-gray-900">{year}</p>
        </div>
      </div>

      {/* Location with pin icon */}
      <div className="flex items-center gap-2 text-gray-700 text-sm">
        <svg
          className="w-4 h-4 text-gray-500 flex-shrink-0"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-medium">{location}</span>
      </div>
    </div>
  </div>
);

// Main wrapper exported as ProjectsCarousel
const ProjectsCarousel: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
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
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">
              Protection That Lasts a Lifetime
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Our Completed
          </h2>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-blue-600">Construction</span>{" "}
            <span className="text-gray-400">Works</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-12 py-3.5 rounded-lg transition duration-200 text-base">
            View all
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsCarousel;
