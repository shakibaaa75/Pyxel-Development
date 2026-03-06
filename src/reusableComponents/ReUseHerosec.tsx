// reusableComponents/HeroSection.tsx
import React from "react";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
  height?: string;
  overlayOpacity?: number;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle = "Great Experience In Building",
  backgroundImage,
  height = "400px",
  overlayOpacity = 0.5,
  className = "",
}) => {
  return (
    <section
      className={`relative flex items-center ${className}`}
      style={{
        height: height,
        backgroundImage: `url('${backgroundImage}')`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl">
          {/* Subtitle */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-0.5 bg-orange-500" />
            <span className="text-white text-sm font-medium uppercase tracking-wide">
              {subtitle}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            {title}
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
