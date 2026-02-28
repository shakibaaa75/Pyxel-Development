import { useState, useRef, useEffect } from "react";
import { SAMPLE_POSTS } from "../../data/blogData";
import BlogCard from "./BlogCard";

export default function BlogSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Show different number of cards based on screen size
  const visibleCount = isMobile ? 1 : 3;
  const maxIndex = SAMPLE_POSTS.length - visibleCount;

  const goToPrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.min(maxIndex, index));
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && currentIndex < maxIndex) {
      goToNext();
    }

    if (isRightSwipe && currentIndex > 0) {
      goToPrev();
    }

    // Reset touch values
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
        <div>
          {/* Blog Post Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-3 sm:mb-4 transition-all duration-300 hover:bg-blue-100">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <span className="text-xs sm:text-sm font-medium text-blue-600">
              Blog Post
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 ml-[16px] leading-tight">
            Latest news
            <br />
            <span className="text-gray-400 font-normal">insight</span>
          </h2>
        </div>

        {/* Navigation Arrows - Hidden on mobile, use swipe instead */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 transition-all duration-300 ease-out hover:border-blue-600 hover:text-blue-600 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
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
            onClick={goToNext}
            disabled={currentIndex === maxIndex}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 transition-all duration-300 ease-out hover:border-blue-600 hover:text-blue-600 hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
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

      {/* Carousel Container with Touch Handlers */}
      <div className="relative overflow-hidden">
        <div
          ref={containerRef}
          className="flex transition-transform duration-300 sm:duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCount)}%)`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {SAMPLE_POSTS.map((post) => (
            <div
              key={post.id}
              className={`w-full flex-shrink-0 px-2 sm:px-4 ${
                isMobile ? "w-full" : "md:w-1/3"
              }`}
            >
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-1.5 sm:gap-2 mt-8 sm:mt-12">
        {Array.from({ length: SAMPLE_POSTS.length - visibleCount + 1 }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ease-out ${
                index === currentIndex
                  ? "w-6 sm:w-8 bg-gray-900"
                  : "w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ),
        )}
      </div>

      {/* Mobile swipe hint */}
      {isMobile && (
        <p className="text-center text-xs text-gray-400 mt-4 sm:hidden">
          ← Swipe to see more posts →
        </p>
      )}
    </section>
  );
}
