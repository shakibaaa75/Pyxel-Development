// ServicesCards.tsx
import React from "react";

interface ServiceCard {
  image: string;
  title: string;
  description: string;
}

const FifthSec: React.FC = () => {
  const services: ServiceCard[] = [
    {
      image: "./image/image8.png",
      title: "Kitchen Remodeling",
      description:
        "Transform your kitchen into a warm, functional space with modern designs and premium materials.",
    },
    {
      image: "./image/image13.jpg",
      title: "Bath Remodeling",
      description:
        "Create a spa-like retreat with custom bathrooms featuring elegant fixtures and finishes.",
    },
    {
      image: "./image/image10.jpg",
      title: "Siding & Windows",
      description:
        "Enhance curb appeal with durable siding options and energy-efficient window installations.",
    },
    {
      image: "./image/image11.jpg",
      title: "Roofing & Decking",
      description:
        "Protect your home with quality roofing and expand your living space with custom decks.",
    },
  ];

  return (
    <section className="w-full bg-gray-50 py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <img src="./svg/Item3.svg" alt="" className="w-6 h-6" />
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">
              Our Services
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900">
            Expert Construction Solutions
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700"
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

                {/* Title slide up on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition duration-300">
                  <h3 className="text-lg font-bold text-white">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-blue-600 font-medium text-sm hover:gap-3 transition-all"
                >
                  Learn More
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition duration-200">
            View All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default FifthSec;
