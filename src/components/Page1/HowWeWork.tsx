// components/HowWeWork.tsx
import React from "react";

interface WorkStep {
  title: string;
  role: string;
  image: string;
}

const workSteps: WorkStep[] = [
  {
    title: "Experience & Quality",
    role: "We has a reputation for delivering quality products and services. That's because our employees work together.",
    image: "/we/img1.png",
  },
  {
    title: "Remodel",
    role: "Breathe new life into your space with our expert remodeling services, designed to enhance style, function, and value.",
    image: "/we/img2.png",
  },
  {
    title: "Post-Construction Support",
    role: "We has a reputation for delivering quality products and services. That's because our employees work together.",
    image: "/we/img3.png",
  },
];

const HowWeWork: React.FC = () => {
  return (
    <section className="py-12 md:py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* Background Image - Shows full image without cropping */}
      <style>{`
        .bg-image {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 280px;
          height: 293px;
          opacity: 0.6;
          mix-blend-mode: luminosity;
          background-image: url('/we/img4.png');
          background-position: left bottom;
          background-repeat: no-repeat;
          background-size: contain;
          pointer-events: none;
        }
        
        @media (min-width: 768px) {
          .bg-image {
            width: 400px;
            height: 419px;
          }
        }
        
        @media (min-width: 1024px) {
          .bg-image {
            width: 530px;
            height: 555px;
          }
        }
      `}</style>
      <div className="bg-image" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section - Reduced gap on mobile/tablet */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-8 md:mb-10 lg:mb-16 gap-4 md:gap-5 lg:gap-6">
          <div className="max-w-xl">
            {/* Section Label */}
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <img
                src="/svg/Item1.svg"
                alt="how we work icon"
                className="w-5 h-5"
              />
              <span className="text-blue-600 font-medium text-sm">
                How We Work
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl lg:text-[42px] font-bold text-gray-900 leading-tight">
              From Vision to Completion
            </h2>
          </div>

          {/* Right Side Description - Smaller text on mobile */}
          <div className="max-w-md lg:pt-8">
            <p className="text-gray-600 text-sm md:text-base lg:text-lg leading-relaxed">
              Our process is designed to keep your project on track while
              ensuring quality and clear communication at every stage
            </p>
          </div>
        </div>

        {/* Work Steps Grid - 3 columns until 700px, then 1 column */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 max-[700px]:grid-cols-1 justify-items-center">
          {workSteps.map((step, index) => (
            <div key={index} className="group w-full max-w-[370px]">
              {/* Image Container - Smaller on mobile */}
              <div
                className="relative overflow-hidden mb-4 md:mb-6 w-full rounded-[16px] md:rounded-[20px]"
                style={{
                  maxWidth: "370px",
                  aspectRatio: "370 / 356",
                }}
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Content - Smaller text on mobile */}
              <div>
                {/* Title with Underline */}
                <div className="mb-3 md:mb-4">
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-900 mb-1 md:mb-2">
                    {step.title}
                  </h3>
                  <div className="w-14 md:w-16 h-1 bg-blue-600 rounded-full" />
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  {step.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
