import React from "react";

interface Service {
  image: string;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    image: "./image/image10.jpg",
    title: "Project Management",
    description: "From scheduling to quality control, we oversee every stage",
  },
  {
    image: "./image/image11.jpg",
    title: "Construction Planning",
    description: "Comprehensive blueprints and strategic project roadmaps",
  },
  {
    image: "./image/image12.jpg",
    title: "Building Renovation",
    description: "Transform existing structures with modern upgrades",
  },
];

const ServiceCard: React.FC<Service> = ({ image, title, description }) => (
  <div className="relative w-full max-w-[341px] mx-auto lg:w-[341px] lg:h-[308px]">
    {/* PC Version - Exact design preserved */}
    <div className="hidden lg:block">
      {/* Image Container */}
      <div
        className="relative w-[341px] h-[227px] overflow-hidden border-[0.87px] border-gray-200"
        style={{ borderRadius: "13.98px" }}
      >
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {/* Number Overlay */}\
      </div>

      {/* White Card - Exact specifications */}
      <div
        className="absolute bg-white shadow-lg flex flex-col"
        style={{
          width: "247px",
          height: "121px",
          top: "187px",
          left: "94px",
          borderTopLeftRadius: "14px",
          borderBottomRightRadius: "14px",
          borderBottomLeftRadius: "14px",
          gap: "12px",
          borderWidth: "2px",
          borderStyle: "solid",
          borderColor: "#f3f4f6",
          paddingTop: "12px",
          paddingRight: "12px",
          paddingBottom: "12px",
          paddingLeft: "20px",
        }}
      >
        <h3
          className="font-bold text-gray-900 leading-tight"
          style={{ fontSize: "16px", lineHeight: "1.3" }}
        >
          {title}
        </h3>
        <p
          className="text-gray-500 leading-relaxed"
          style={{ fontSize: "13px", lineHeight: "1.5" }}
        >
          {description}
        </p>
        <a
          href="#"
          className="inline-flex items-center text-blue-600 font-semibold hover:gap-3 transition-all duration-200 mt-auto"
          style={{ fontSize: "13px", gap: "8px" }}
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

    {/* Tablet & Mobile Version - Stacked layout */}
    <div className="lg:hidden">
      {/* Image Container - Full width on mobile, centered on tablet */}
      <div className="relative w-full h-[200px] sm:h-[250px] md:h-[280px] overflow-hidden border-[0.87px] border-gray-200 rounded-2xl mb-4">
        <img src={image} alt={title} className="w-full h-full object-cover" />
        {/* Number Overlay - Smaller on mobile */}
      </div>

      {/* Content Card - Stacked below image */}
      <div className="bg-white rounded-xl shadow-md border border-gray-100 p-4 sm:p-5">
        <h3 className="font-bold text-gray-900 text-lg mb-2">{title}</h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-3">
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
  </div>
);

const ExpertServices: React.FC = () => {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
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
                strokeWidth={1.5}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
            <span className="text-blue-600 text-sm font-medium">
              Protection That Lasts a Lifetime
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
            <span className="text-gray-900">Our Expert </span>
            <span className="text-blue-600">Construction</span>
          </h2>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-400 leading-tight">
            Services
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-8 mb-10 lg:mb-12">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-medium px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg transition duration-200 text-sm sm:text-base">
            See all services
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExpertServices;
