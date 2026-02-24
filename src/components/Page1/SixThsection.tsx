// BuildingExcellence.tsx
import React from "react";

const SixThsection: React.FC = () => {
  return (
    <section className="w-full bg-white py-16 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background Image - Bottom Left (Desktop only) */}
      <img
        src="./image/image9.png"
        alt=""
        className="hidden lg:block absolute bottom-0 left-0 w-64 h-64 lg:w-96 lg:h-96 object-contain object-left-bottom pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 pb-8 border-b border-gray-200">
          <div>
            {/* Tag */}
            <div className="inline-flex items-center gap-2 mb-4">
              <img src="./svg/Item3.svg" alt="" className="w-6 h-6" />
              <span className="text-blue-600 text-sm font-medium">
                Core Services Overview
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 leading-tight">
              Building Excellence with
              <br />
              Every Project
            </h2>
          </div>

          {/* CTA Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition duration-200 w-fit">
            Book Now!
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Main Image */}
          <div className="relative">
            <img
              src="./image/image8.png"
              alt="Construction site"
              className="w-full h-auto rounded-2xl shadow-xl object-cover"
            />
          </div>

          {/* Right - Content */}
          <div className="flex flex-col gap-8">
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              From small renovations to large-scale commercial builds, our team
              is committed to quality and customer satisfaction at every step.
              We understand that every project is unique, which is why we tailor
              our services to meet your specific needs and vision. Our
              experienced professionals manage everything from initial design
              consultation and permitting to construction and final walkthrough,
              ensuring transparency and communication throughout the process.
            </p>

            <div className="border-t border-gray-200 pt-8">
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Our goal is not just to build structures but to create lasting
                relationships with our clients by delivering excellence on time
                and on budget.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SixThsection;
