// ProjectsCarousel.tsx
import React, { useRef, useState, useEffect, useCallback } from "react";

interface Project {
  id: number;
  title: string;
  subtitle: string;
  location: string;
  price: string;
  client: string;
  projectYear: string;
  duration: string;
  image: string;
}

const ProjectsCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const projects: Project[] = [
    {
      id: 1,
      title: "Serenity Community",
      subtitle: "Luxury Residences, Modern Homes",
      location: "Australia",
      price: "From $590k",
      client: "RC Builders",
      projectYear: "15 Oct 2019",
      duration: "5Y, 3M",
      image: "./image/image8.png",
    },
    {
      id: 2,
      title: "Renewable Living",
      subtitle: "Luxury Residences, Modern Homes",
      location: "Australia",
      price: "From $590k",
      client: "RC Builders",
      projectYear: "15 Oct 2019",
      duration: "5Y, 3M",
      image: "./image/image11.jpg",
    },
    {
      id: 3,
      title: "Horizon Heights",
      subtitle: "Luxury Residences, Modern Homes",
      location: "Australia",
      price: "From $750k",
      client: "RC Builders",
      projectYear: "22 Mar 2020",
      duration: "4Y, 6M",
      image: "./image/image13.jpg",
    },
    {
      id: 4,
      title: "Azure Towers",
      subtitle: "Luxury Residences, Modern Homes",
      location: "Australia",
      price: "From $890k",
      client: "RC Builders",
      projectYear: "10 Jan 2021",
      duration: "3Y, 2M",
      image: "./image/image10.jpg",
    },
    {
      id: 5,
      title: "Golden Valley",
      subtitle: "Luxury Residences, Modern Homes",
      location: "Australia",
      price: "From $620k",
      client: "RC Builders",
      projectYear: "05 Jun 2020",
      duration: "4Y, 8M",
      image: "./image/image4.png",
    },
    {
      id: 6,
      title: "Crystal Bay",
      subtitle: "Luxury Residences, Modern Homes",
      location: "Australia",
      price: "From $1.2M",
      client: "RC Builders",
      projectYear: "18 Sep 2021",
      duration: "2Y, 9M",
      image: "./image/image5.png",
    },
  ];

  const getCardsPerView = () => {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const updateActiveIndex = useCallback(() => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth / getCardsPerView();
      const newIndex = Math.round(scrollRef.current.scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, projects.length - getCardsPerView()));
    }
  }, [projects.length]);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(updateActiveIndex);
    };

    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll, {
        passive: true,
      });
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [updateActiveIndex]);

  const scrollToIndex = (index: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.clientWidth / getCardsPerView();
      const maxIndex = projects.length - getCardsPerView();
      const targetIndex = Math.max(0, Math.min(index, maxIndex));

      scrollRef.current.scrollTo({
        left: targetIndex * cardWidth,
        behavior: "smooth",
      });
    }
  };

  const handlePrev = () => scrollToIndex(activeIndex - 1);
  const handleNext = () => scrollToIndex(activeIndex + 1);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    scrollRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    if (scrollRef.current) {
      setIsDragging(false);
      scrollRef.current.style.cursor = "grab";
      updateActiveIndex();
      setTimeout(() => {
        scrollToIndex(activeIndex);
      }, 50);
    }
  };

  const canScrollPrev = activeIndex > 0;
  const canScrollNext = activeIndex < projects.length - getCardsPerView();

  return (
    <section className="w-full bg-gray-50 py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-4 animate-fade-in-up">
              <img src="./svg/Item3.svg" alt="" className="w-6 h-6" />
              <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">
                Our Projects
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 leading-tight animate-fade-in-up animation-delay-100">
              Featured Construction Projects
            </h2>
          </div>

          {/* Navigation Arrows - Desktop */}
          <div className="hidden md:flex items-center gap-3 animate-fade-in-up animation-delay-200">
            <button
              onClick={handlePrev}
              disabled={!canScrollPrev}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                canScrollPrev
                  ? "border-gray-300 text-gray-700 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                  : "border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
              aria-label="Previous projects"
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={handleNext}
              disabled={!canScrollNext}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                canScrollNext
                  ? "border-gray-300 text-gray-700 hover:border-blue-600 hover:bg-blue-600 hover:text-white"
                  : "border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
              aria-label="Next projects"
            >
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Subtle Gradient Overlays - Desktop Only, Reduced */}
          <div
            className={`hidden md:block absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollPrev ? "opacity-30" : "opacity-0"}`}
          />
          <div
            className={`hidden md:block absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollNext ? "opacity-30" : "opacity-0"}`}
          />

          {/* Scrollable Container */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-8 cursor-grab select-none"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-500 ease-out hover:-translate-y-1">
                  {/* Image Container - NO SCALE to prevent crop */}
                  <div className="relative h-64 md:h-72 overflow-hidden bg-gray-100">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: "center center" }}
                      draggable="false"
                    />

                    {/* Lighter Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500" />

                    {/* Content Overlay */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      {/* Top Content */}
                      <div className="transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-500">
                        <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">
                          {project.title}
                        </h3>
                        <p className="text-gray-200 text-sm font-medium drop-shadow-sm">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Location Badge */}
                      <div className="self-start transform translate-y-2 opacity-90 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2">
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="text-white text-sm font-medium">
                            {project.location}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Hover View Button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold transform scale-90 group-hover:scale-100 transition-transform duration-500 hover:bg-blue-600 hover:text-white shadow-lg">
                        View Project
                      </button>
                    </div>
                  </div>

                  {/* Details Grid - EXACT design from my version you liked */}
                  <div className="p-5">
                    {/* Title & Subtitle */}
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Project Info - Modern Card Grid with icons */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Price */}
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                        <div className="flex items-center gap-1.5 mb-1">
                          <svg
                            className="w-3.5 h-3.5 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide">
                            Price
                          </span>
                        </div>
                        <p className="text-gray-900 font-bold text-sm">
                          {project.price}
                        </p>
                      </div>

                      {/* Client */}
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                        <div className="flex items-center gap-1.5 mb-1">
                          <svg
                            className="w-3.5 h-3.5 text-blue-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                            />
                          </svg>
                          <span className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide">
                            Client
                          </span>
                        </div>
                        <p className="text-gray-900 font-bold text-sm">
                          {project.client}
                        </p>
                      </div>

                      {/* Project Year */}
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                        <div className="flex items-center gap-1.5 mb-1">
                          <svg
                            className="w-3.5 h-3.5 text-blue-600"
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
                          <span className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide">
                            Year
                          </span>
                        </div>
                        <p className="text-gray-900 font-bold text-sm">
                          {project.projectYear}
                        </p>
                      </div>

                      {/* Duration */}
                      <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                        <div className="flex items-center gap-1.5 mb-1">
                          <svg
                            className="w-3.5 h-3.5 text-blue-600"
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
                          <span className="text-gray-400 text-[10px] font-semibold uppercase tracking-wide">
                            Duration
                          </span>
                        </div>
                        <p className="text-gray-900 font-bold text-sm">
                          {project.duration}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Navigation - Dots Only */}
          <div className="flex md:hidden items-center justify-center gap-6 mt-6">
            <button
              onClick={handlePrev}
              disabled={!canScrollPrev}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollPrev
                  ? "border-gray-300 text-gray-700 active:bg-gray-100"
                  : "border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
            >
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {Array.from({
                length: Math.ceil(projects.length / getCardsPerView()),
              }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToIndex(i * getCardsPerView())}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === Math.floor(activeIndex / getCardsPerView())
                      ? "w-6 bg-blue-600"
                      : "w-2 bg-gray-300"
                  }`}
                  aria-label={`Go to page ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={!canScrollNext}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollNext
                  ? "border-gray-300 text-gray-700 active:bg-gray-100"
                  : "border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
            >
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition duration-200">
            View All Projects
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.5s ease-out both;
        }
        .animation-delay-100 {
          animation-delay: 0.1s;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </section>
  );
};

export default ProjectsCarousel;
