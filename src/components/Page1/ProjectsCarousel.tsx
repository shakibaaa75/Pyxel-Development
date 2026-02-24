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

// Card component with typed props
const ProjectCard: React.FC<Project> = ({
  title,
  image,
  cost,
  client,
  year,
  location,
}) => (
  <div className="flex flex-col gap-3">
    {/* Image Container with Black Overlay */}
    <div className="relative rounded-2xl overflow-hidden shadow-lg">
      <img
        src={image}
        alt={title}
        className="w-full h-[250px] sm:h-[300px] md:h-[340px] lg:h-[378px] object-cover"
      />
      {/* Black Overlay */}
      <div className="absolute top-0 left-0 w-full h-1/5 bg-gradient-to-b from-black/60 to-transparent" />
      {/* Title overlay at top */}
      <h3 className="absolute top-4 left-4 text-white text-base sm:text-lg font-semibold drop-shadow-md z-10">
        {title}
      </h3>
    </div>

    {/* White Content Card - No separator line */}
    <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5">
      {/* Labels row */}
      <div className="grid grid-cols-3 mb-1">
        <p className="text-xs text-gray-400 text-left">Cost</p>
        <p className="text-xs text-gray-400 text-left">Client</p>
        <p className="text-xs text-gray-400 text-left">Project year</p>
      </div>

      {/* Values row */}
      <div className="grid grid-cols-3 mb-3">
        <p className="text-sm font-bold text-gray-900 text-left">{cost}</p>
        <p className="text-sm font-bold text-gray-900 text-left">{client}</p>
        <p className="text-sm font-bold text-gray-900 text-left">{year}</p>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 text-gray-600 text-sm">
        <svg
          className="w-4 h-4 text-gray-400 flex-shrink-0"
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
);

// Main wrapper exported as ProjectsCarousel
const ProjectsCarousel: React.FC = () => {
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

        {/* Grid - Responsive columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-12">
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 sm:px-12 py-3 sm:py-3.5 rounded-lg transition duration-200 text-sm sm:text-base">
            View all
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsCarousel;
