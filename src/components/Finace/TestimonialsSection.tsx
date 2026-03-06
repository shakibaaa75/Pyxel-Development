import React, { useEffect, useState } from "react";

// --- Types ---
interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

// --- Mock Data ---
const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Kathy Pacheco",
    role: "Product Manager",
    content:
      "Fusce volutpat lectus et nisl consectetur finibus. In vitae scelerisque augue, in varius eros. Nunc sapien diam, euismod et pretium id, volutpat et tortor.",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Senior Developer",
    content:
      "Fusce volutpat lectus et nisl consectetur finibus. In vitae scelerisque augue, in varius eros. Nunc sapien diam, euismod et pretium id, volutpat et tortor.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "UX Designer",
    content:
      "Fusce volutpat lectus et nisl consectetur finibus. In vitae scelerisque augue, in varius eros. Nunc sapien diam, euismod et pretium id, volutpat et tortor.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    id: 4,
    name: "David Kim",
    role: "CTO",
    content:
      "Fusce volutpat lectus et nisl consectetur finibus. In vitae scelerisque augue, in varius eros. Nunc sapien diam, euismod et pretium id, volutpat et tortor.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
];

// --- Star Rating Component with SVG ---
const StarRating = ({ count }: { count: number }) => {
  return (
    <div className="flex gap-1 justify-center">
      {[...Array(5)].map((_, i) => (
        <img
          key={i}
          src="/svg/star.svg"
          alt="star"
          className={`w-4 h-4 ${
            i < count ? "opacity-100" : "opacity-30 grayscale"
          }`}
          style={{
            filter:
              i < count
                ? "brightness(0) saturate(100%) invert(59%) sepia(96%) saturate(431%) hue-rotate(347deg) brightness(101%) contrast(96%)"
                : "none",
          }}
        />
      ))}
    </div>
  );
};

// --- Testimonial Card Component ---
const TestimonialCard = ({ data }: { data: Testimonial }) => {
  return (
    <div
      className="flex-shrink-0 bg-white p-4 sm:p-6 flex flex-col items-center text-center relative select-none mx-auto"
      style={{
        width: "min(515px, calc(100vw - 48px))",
        height: "auto",
        minHeight: "214px",
        borderRadius: "10px",
        boxShadow: "0px 0px 12px 0px #0252CF1A",
        marginTop: "clamp(30px, 5vw, 40px)",
      }}
    >
      {/* Avatar - Positioned to overlap top edge */}
      <div className="absolute -top-8 sm:-top-10 left-1/2 -translate-x-1/2">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gray-100">
          <img
            src={data.avatar}
            alt={data.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="mt-8 sm:mt-10 flex flex-col h-full justify-between">
        <p className="text-slate-600 leading-relaxed text-xs sm:text-sm line-clamp-3 px-2">
          {data.content}
        </p>

        <div className="mt-3 sm:mt-4">
          <h4 className="font-bold text-slate-900 text-sm sm:text-base mb-1">
            {data.name}
          </h4>
          <StarRating count={data.rating} />
        </div>
      </div>
    </div>
  );
};

// --- Main Component ---
export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const scrollPosition = container.scrollLeft;
    const cardWidth = isMobile ? window.innerWidth - 48 : 515 + 32; // Card width + gap
    const newIndex = Math.round(scrollPosition / cardWidth);
    setActiveIndex(Math.min(newIndex, TESTIMONIALS.length - 1));
  };

  const scrollToIndex = (index: number) => {
    const container = document.getElementById("testimonials-scroll");
    if (container) {
      const cardWidth = isMobile ? window.innerWidth - 48 : 515 + 32;
      container.scrollTo({
        left: index * cardWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-8 sm:py-12 px-4 bg-slate-50/50 font-sans flex flex-col items-center justify-center overflow-hidden">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12 max-w-3xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2 sm:mb-3 tracking-tight">
          What Our <span className="text-blue-600">Clients Say</span>
        </h2>
        <p className="text-sm sm:text-base text-slate-500 px-4">
          This project reflects our dedication to innovation, quality, and
          attention to detail.
        </p>
      </div>

      {/* Scrollable Container */}
      <div className="w-full max-w-[1200px] relative">
        {/* Fade effects */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-slate-50/50 to-transparent z-10 pointer-events-none hidden md:block" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-slate-50/50 to-transparent z-10 pointer-events-none hidden md:block" />

        <div
          id="testimonials-scroll"
          className="flex gap-4 sm:gap-8 overflow-x-auto pb-6 sm:pb-8 pt-8 sm:pt-10 px-4 sm:px-8 snap-x snap-mandatory scroll-smooth"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onScroll={handleScroll}
        >
          {/* Hide scrollbar for Chrome/Safari/Opera */}
          <style>{`
            #testimonials-scroll::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {TESTIMONIALS.map((item, index) => (
            <div
              key={item.id}
              className="snap-center first:snap-start last:snap-end"
            >
              <TestimonialCard data={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator - Dots */}
      <div className="flex gap-2 mt-6 sm:mt-8">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollToIndex(i)}
            className={`transition-all duration-300 cursor-pointer ${
              i === activeIndex
                ? "bg-blue-600 w-6 sm:w-8"
                : "bg-slate-300 hover:bg-slate-400 w-2"
            } h-2 rounded-full`}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </div>

      {/* Optional: Previous/Next buttons for larger screens */}
      <div className="flex gap-4 mt-4 sm:hidden">
        <button
          onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
          className="px-4 py-2 bg-white rounded-lg shadow-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          disabled={activeIndex === 0}
        >
          Previous
        </button>
        <button
          onClick={() =>
            scrollToIndex(Math.min(TESTIMONIALS.length - 1, activeIndex + 1))
          }
          className="px-4 py-2 bg-white rounded-lg shadow-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          disabled={activeIndex === TESTIMONIALS.length - 1}
        >
          Next
        </button>
      </div>
    </section>
  );
}
