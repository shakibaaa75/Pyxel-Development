// Hero.tsx
import React from "react";

const Herosection: React.FC = () => {
  return (
    <section className="relative w-full min-h-[600px] md:min-h-[700px] lg:min-h-[750px] flex items-end overflow-hidden pb-20">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('./image/image1.jpg')",
        }}
      />

      {/* Blue Overlay - 0.3 opacity */}
      <div className="absolute inset-0 bg-blue-600/30" />

      {/* Gradient Overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.4) 70%, transparent 100%)",
        }}
      />

      {/* Curved Bottom with Border */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        {/* Border/Shadow line above curve */}
        <div className="absolute bottom-[49px] md:bottom-[79px] left-0 right-0 h-px bg-blue-200/50" />

        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[50px] md:h-[80px]"
          preserveAspectRatio="none"
        >
          <path
            d="M0 80L1440 80L1440 40C1440 40 1140 80 720 80C300 80 0 40 0 40L0 80Z"
            fill="white"
          />
        </svg>
        {/* Border line below curve */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          {/* Left Content */}
          <div className="max-w-xl pb-8">
            {/* Tag with Blue Border */}
            <div className="inline-flex items-center gap-2 mb-6 border-l-4 border-blue-600 pl-3">
              <span className="text-gray-700 text-sm font-medium uppercase tracking-wider">
                Great Experience In Building
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold text-gray-900 leading-tight mb-6">
              General Contractor In Sacramento, CA
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg">
              From home renovations to large-scale construction, we deliver
              quality craftsmanship, reliable timelines, and results you can
              trust.
            </p>

            {/* Blue Button */}
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-md transition duration-200 text-base">
              Get a Free Quote
            </button>
          </div>

          {/* Right Side - Review Card - Fixed Size 405x202 */}
          <div className="hidden lg:flex justify-end items-end pb-8">
            <div
              className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-gray-100"
              style={{ width: "405px", height: "202px" }}
            >
              {/* Avatars */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex -space-x-3">
                  <img
                    src="./image/avatar1.jpg"
                    alt="Client"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover bg-gray-300"
                  />
                  <img
                    src="./image/avatar2.jpg"
                    alt="Client"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover bg-gray-300"
                  />
                  <img
                    src="./image/avatar3.jpg"
                    alt="Client"
                    className="w-10 h-10 rounded-full border-2 border-white object-cover bg-gray-300"
                  />
                </div>
              </div>

              {/* Star Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-gray-800 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-900 font-bold text-lg">4.5</span>
                <span className="text-gray-500 text-sm">( 234+ reviews )</span>
              </div>

              {/* Tagline */}
              <p className="text-gray-700 text-base font-medium leading-snug">
                Where quality construction meets complete client satisfaction
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Herosection;
