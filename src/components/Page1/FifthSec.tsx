import React from "react";

interface Service {
  number: string;
  image: string;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    number: "01",
    image: "./image/image10.jpg",
    title: "Project Management",
    description: "From scheduling to quality control, we oversee every stage",
  },
  {
    number: "02",
    image: "./image/image11.jpg",
    title: "Project Management",
    description: "From scheduling to quality control, we oversee every stage",
  },
  {
    number: "03",
    image: "./image/image12.jpg",
    title: "Project Management",
    description: "From scheduling to quality control, we oversee every stage",
  },
];

const ServiceCard: React.FC<Service> = ({
  number,
  image,
  title,
  description,
}) => (
  <div className="relative">
    {/* Image Container with Number */}
    <div className="relative rounded-2xl overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-[280px] sm:h-[320px] object-cover"
      />
      {/* Number Overlay */}
      <span className="absolute top-4 left-4 text-5xl sm:text-6xl font-bold text-black/80">
        {number}
      </span>
    </div>

    {/* White Card - Overlapping bottom of image */}
    <div className="relative mx-4 sm:mx-6 -mt-16 bg-white rounded-xl shadow-lg p-5 sm:p-6 z-10">
      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-4">
        {description}
      </p>
      <a
        href="#"
        className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm hover:gap-3 transition-all duration-200"
      >
        Read More
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
);

const ExpertServices: React.FC = () => {
  return (
    <section className="bg-white py-16 sm:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          {/* Tag with Icon */}
          <div className="inline-flex items-center gap-2 mb-4">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
            <span className="text-blue-600 text-sm font-medium">
              Protection That Lasts a Lifetime
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
            <span className="text-gray-900">Our Expert </span>
            <span className="text-blue-600">Construction</span>
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-400 leading-tight">
            Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-8 py-3 rounded-lg transition duration-200 text-base">
            See all services
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExpertServices;
