// CTASection.tsx
import React from "react";

const EleventhSec: React.FC = () => {
  return (
    <section className="w-full relative">
      {/* Dark Background with Curved Bottom */}
      <div className="relative bg-gray-900 pb-32 md:pb-48 lg:pb-56">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: "url('./image/image11.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-black/60" />

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24 lg:pt-32 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Bring Your Project to Life?
          </h2>
          <p className="text-gray-300 text-base md:text-lg mb-8 max-w-2xl mx-auto">
            Let's turn your vision into reality with expert craftsmanship,
            reliable timelines, and unmatched quality.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition duration-200">
            Get a Free Quote
          </button>
        </div>

        {/* Curved Bottom Edge */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <path
              d="M0 120L1440 120L1440 0C1440 0 1140 120 720 120C300 120 0 0 0 0L0 120Z"
              fill="white"
            />
          </svg>
        </div>
      </div>

      {/* Video Thumbnail - Overlapping */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 md:-mt-32 lg:-mt-40">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="./image/image12.jpg"
            alt="Video thumbnail"
            className="w-full h-auto object-cover"
          />
          {/* Play Button */}
          <button className="absolute inset-0 flex items-center justify-center group">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-orange-500 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-200">
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default EleventhSec;
