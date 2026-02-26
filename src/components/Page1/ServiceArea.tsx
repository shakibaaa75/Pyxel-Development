import React, { useState, useEffect, useRef } from "react";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

// Animated counter component
const Counter: React.FC<CounterProps> = ({
  end,
  suffix = "",
  duration = 2000,
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

const ServiceArea: React.FC = () => {
  // Location data
  const locations = [
    "Dixon",
    "Dixon",
    "Dixon",
    "Dixon",
    "Dixon",
    "Dixon",
    "Antelope",
    "Antelope",
    "Antelope",
    "Dixon",
    "Dixon",
    "Dixon",
    "Dixon",
    "Dixon",
    "Dixon",
  ];

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid bg-[#F8F8F8] p-4 sm:p-6 rounded-2xl grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            {/* Tag */}
            <div className="inline-flex items-center gap-2">
              <img src="./svg/Item1.svg" alt="Icon" className="w-6 h-6" />
              <span className="text-[#0B4196] text-sm font-semibold uppercase tracking-wider">
                Our service area
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Serving the Greater
            </h2>

            {/* Description */}
            <p className="text-gray-600 text-base leading-relaxed max-w-lg">
              With years of industry experience, our team of skilled
              professionals brings in-depth knowledge to every project, ensuring
              precision.
            </p>

            {/* Locations Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 sm:gap-x-8 gap-y-3 pt-4">
              {locations.map((location, index) => (
                <div key={index} className="flex items-center gap-2">
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
                  <span className="text-gray-700 text-sm font-medium">
                    {location}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button className="bg-[#0B4196] text-white px-6 py-3 rounded-md hover:bg-[#1565c0] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 ease-out text-sm font-medium shadow-sm hover:shadow-md">
                Book Appointment
              </button>
            </div>
          </div>

          {/* Right Content - Image with Stats */}
          <div className="relative">
            {/* Main Image - Responsive height */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="./image/image10.jpg"
                alt="Construction site with crane"
                className="w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[550px] object-cover"
              />

              {/* Gradient Overlay at bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>

            {/* Stats Overlay - Responsive positioning */}
            <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-4 sm:left-6 md:left-8 right-4 sm:right-6 md:right-8 flex items-end justify-between gap-2">
              {/* 250+ - Large circle with #D2E3FF */}
              <div
                className="rounded-full w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 flex flex-col items-center justify-center shadow-lg flex-shrink-0"
                style={{ backgroundColor: "#D2E3FF" }}
              >
                <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
                  <Counter end={250} suffix="+" />
                </span>
                <span className="text-[10px] sm:text-xs text-gray-600 text-center mt-1 leading-tight">
                  Available serving
                  <br />
                  locations
                </span>
              </div>

              {/* Right side stats container */}
              <div className="flex gap-2 sm:gap-4">
                {/* 2k+ - Small circle with #E9FFF3 */}
                <div className="flex flex-col items-center gap-1 sm:gap-2">
                  <div
                    className="rounded-full w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center shadow-lg"
                    style={{ backgroundColor: "#E9FFF3" }}
                  >
                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                      <Counter end={2} suffix="k+" />
                    </span>
                  </div>
                  <span className="text-white text-xs sm:text-sm font-medium text-center">
                    Satisfied
                    <br className="sm:hidden" /> clients
                  </span>
                </div>

                {/* 25+ - Small circle white */}
                <div className="flex flex-col items-center gap-1 sm:gap-2">
                  <div className="bg-white rounded-full w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center shadow-lg">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
                      <Counter end={25} suffix="+" />
                    </span>
                  </div>
                  <span className="text-white text-xs sm:text-sm font-medium">
                    Services
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceArea;
