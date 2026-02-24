// ResidentialCommercialServices.tsx
import React, { useState } from "react";

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

const ResidentialCommercialServices: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const residentialServices: ServiceItem[] = [
    {
      icon: "./svg/Item4.svg",
      title: "Home Remodeling & Additions",
      description:
        "Transform your existing space with custom additions, room expansions, and complete home renovations tailored to your lifestyle.",
    },
    {
      icon: "./svg/Item5.svg",
      title: "Exterior Construction & Outdoor Living",
      description:
        "Create stunning outdoor spaces with decks, patios, pergolas, and exterior renovations that enhance your home's appeal.",
    },
    {
      icon: "./svg/Item6.svg",
      title: "Structural Repairs & Restoration",
      description:
        "Expert structural repairs and restoration services to ensure your home's safety, stability, and long-term value.",
    },
    {
      icon: "./svg/Item3.svg",
      title: "Roofing Services",
      description:
        "Complete roofing solutions including installation, repair, and maintenance using premium materials for lasting protection.",
    },
  ];

  const commercialServices = [
    "Tenant Improvements (TI)",
    "SB 721 Balcony Inspection & Repair",
    "SB 326 HOA Structural Compliance Repair",
    "Capital Improvements",
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-gray-50 py-16 md:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* First Section - Residential with FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          {/* Left Content - FAQ Style */}
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <img src="./svg/Item3.svg" alt="" className="w-5 h-5" />
              <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">
                Residential
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-gray-900 mb-6 leading-tight">
              Residential Construction Services
            </h2>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              From small upgrades to major transformations, we offer
              comprehensive{" "}
              <span className="text-blue-600 font-medium">
                residential construction services
              </span>{" "}
              designed to enhance durability, comfort, and long-term value.
            </p>

            {/* FAQ Style List - 4 Items */}
            <div className="flex flex-col gap-3">
              {residentialServices.map((service, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:border-blue-300 transition-colors duration-200"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <img src={service.icon} alt="" className="w-5 h-5" />
                      </div>
                      <span className="font-semibold text-gray-900 text-base">
                        {service.title}
                      </span>
                    </div>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        openIndex === index
                          ? "bg-blue-600 text-white rotate-45"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      <span className="text-lg">+</span>
                    </div>
                  </button>

                  {/* Expandable Content */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      openIndex === index
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5 pl-[76px]">
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="./image/image11.jpg"
                alt="Residential construction"
                className="w-full h-[350px] md:h-[450px] lg:h-[550px] object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-600 rounded-xl -z-10 hidden lg:block" />
          </div>
        </div>

        {/* Second Section - Commercial Simple List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="./image/image13.jpg"
                alt="Commercial construction"
                className="w-full h-[350px] md:h-[450px] lg:h-[550px] object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-600 rounded-xl -z-10 hidden lg:block" />
          </div>

          {/* Right Content - Simple List */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 mb-4">
              <img src="./svg/Item3.svg" alt="" className="w-5 h-5" />
              <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">
                Commercial
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-gray-900 mb-6 leading-tight">
              Commercial Construction Services
            </h2>

            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              Pyxel Construction specializes in code-compliant{" "}
              <span className="text-blue-600 font-medium">
                commercial construction
              </span>
              , building upgrades, and long-term property improvements.
            </p>

            {/* Simple List - No FAQ */}
            <div className="flex flex-col gap-3">
              {commercialServices.map((service, index) => (
                <a
                  key={index}
                  href="#"
                  className="flex items-center justify-between p-5 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:bg-gray-50 transition-all duration-200 group"
                >
                  <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition">
                    {service}
                  </span>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200"
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResidentialCommercialServices;
