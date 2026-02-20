// ThardsecTionPage1.tsx
import React from "react";

const ThardsecTionPage1: React.FC = () => {
  return (
    <section
      className="
        w-full
        py-16 md:py-24 lg:py-32
        bg-[url('/image/image6.png')]
        bg-cover
        bg-center
        bg-no-repeat
      "
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content (First on Mobile) */}
          <div className="flex flex-col gap-5 order-1 lg:order-2">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">
              Solutions & clients
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Start Your ADU Project Today &{" "}
              <span className="text-blue-600">Save $5,000</span> with IMKAT Home
            </h2>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              We plainly comprehend that you need not to lose, but rather to
              gain more cash over your time of work with us.
            </p>

            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-4 rounded-lg transition duration-200 w-fit mt-2">
              Get Started
            </button>
          </div>

          {/* Image (Bottom on Mobile) */}
          <div className="relative order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden">
              <img
                src="/image/image5.png"
                alt="Modern ADU Home"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThardsecTionPage1;
