// Hero.tsx
import React from "react";

const Herosection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('./image/image1.jpg')",
        }}
      />

      {/* Gradient Overlay - Dark on left, transparent on right */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 70%, transparent 100%)",
        }}
      />

      {/* Bottom Left Image Overlay - Increased size */}
      <div
        className="absolute bottom-0 left-0 w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('./image/image2.png')",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl">
          {/* Tag with SVG */}
          <div className="inline-flex items-center  mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="33"
              viewBox="0 0 25 33"
              fill="none"
            >
              <mask id="path-1-inside-1_252_4610" fill="white">
                <path d="M0 0H25V33H0V0Z" />
              </mask>
              <path
                d="M0 0V-1H-1V0H0ZM0 33H-1V34H0V33ZM0 0V1H25V0V-1H0V0ZM25 33V32H0V33V34H25V33ZM0 33H1V0H0H-1V33H0Z"
                fill="#FF631B"
                mask="url(#path-1-inside-1_252_4610)"
              />
            </svg>
            <span className="text-orange-400 text-sm font-medium uppercase tracking-wider">
              Great Experience In Building
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            General Contractor In{" "}
            <span className="text-white">Sacramento, CA</span>
          </h1>

          {/* Description */}
          <p className="text-gray-200 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
            From home renovations to large-scale construction, we deliver
            quality craftsmanship, reliable timelines, and results you can
            trust.
          </p>

          {/* CTA Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-md transition duration-200 text-lg">
            Get a Free Quote
          </button>
        </div>
      </div>
    </section>
  );
};

export default Herosection;
