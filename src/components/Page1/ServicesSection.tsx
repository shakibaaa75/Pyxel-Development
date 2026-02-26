import React from "react";

const ServicesSection: React.FC = () => {
  const residentialServices = [
    "Kitchen Remodeling",
    "Bathroom Remodeling",
    "Deck Construction",
    "Patio Construction",
    "Balcony Construction",
    "Fencing & Gates",
  ];

  const commercialServices = [
    "Office Renovation",
    "Retail Build-Outs",
    "Warehouse Construction",
    "Restaurant Remodeling",
    "Medical Facilities",
    "Industrial Projects",
  ];

  return (
    <section className="relative w-full overflow-hidden">
      {/* Dark Background Section */}
      <div className="bg-[#1a1a1a] pt-12 sm:pt-16 pb-48 sm:pb-56 md:pb-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
            <img
              src="./svg/Item1.svg"
              alt=""
              className="w-5 h-5 sm:w-6 sm:h-6 brightness-0 invert"
            />
            <span className="text-white text-xs sm:text-sm font-semibold uppercase tracking-wider">
              About Company
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-3xl mx-auto px-2">
            Turning Your <span className="text-[#0B4196]">Vision</span> Into a
            Home <span className="text-[#0B4196]">You Can Trust.</span>
          </h2>
        </div>
      </div>

      {/* Cards Section - Overlapping */}
      <div className="max-w-[1191px] mx-auto px-4 sm:px-6 lg:px-8 -mt-40 sm:-mt-44 md:-mt-48 relative z-10 pb-12 sm:pb-16 space-y-6 sm:space-y-8">
        {/* Residential Services Card */}
        <div
          className="bg-[#F8F8F8] rounded-xl sm:rounded-[16px] shadow-xl mx-auto"
          style={{
            maxWidth: "1191px",
            padding: "16px",
          }}
        >
          <div
            className="flex flex-col lg:flex-row items-center"
            style={{ gap: "40px" }}
          >
            {/* Image - Full width on mobile/tablet */}
            <div
              className="flex-shrink-0 overflow-hidden w-full lg:w-[418px]"
              style={{
                borderRadius: "16px",
              }}
            >
              <img
                src="./image/image12.jpg"
                alt="Residential construction"
                className="w-full h-full object-cover"
                style={{
                  aspectRatio: "418/284",
                }}
              />
            </div>

            {/* Content */}
            <div className="flex-1 w-full py-4">
              <h3 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-gray-900 mb-4 leading-tight text-center lg:text-left">
                <span className="text-[#0B4196]">Residential</span> construction
                services
              </h3>

              <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed text-center lg:text-left">
                With years of industry experience, our team of skilled
                professionals brings in-depth knowledge to every project,
                ensuring precision.
              </p>

              {/* Services Grid */}
              <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-4">
                {residentialServices.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 sm:gap-3 group"
                  >
                    <img
                      src="./svg/Item1.svg"
                      alt=""
                      className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                      style={{
                        filter:
                          "brightness(0) saturate(100%) invert(19%) sepia(94%) saturate(1992%) hue-rotate(209deg) brightness(92%) contrast(96%)",
                      }}
                    />
                    <span className="text-xs sm:text-sm text-gray-700 font-medium group-hover:text-[#0B4196] transition-colors duration-200">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Commercial Services Card */}
        <div
          className="bg-[#F8F8F8] rounded-xl sm:rounded-[16px] shadow-xl mx-auto"
          style={{
            maxWidth: "1191px",
            padding: "16px",
          }}
        >
          <div
            className="flex flex-col lg:flex-row-reverse items-center"
            style={{ gap: "40px" }}
          >
            {/* Image - Full width on mobile/tablet */}
            <div
              className="flex-shrink-0 overflow-hidden w-full lg:w-[418px]"
              style={{
                borderRadius: "16px",
              }}
            >
              <img
                src="./image/image11.jpg"
                alt="Commercial construction"
                className="w-full h-full object-cover"
                style={{
                  aspectRatio: "418/284",
                }}
              />
            </div>

            {/* Content */}
            <div className="flex-1 w-full py-4">
              <h3 className="text-xl sm:text-2xl lg:text-[28px] font-bold text-gray-900 mb-4 leading-tight text-center lg:text-left">
                <span className="text-[#0B4196]">Commercial</span> construction
                services
              </h3>

              <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed text-center lg:text-left">
                With years of industry experience, our team of skilled
                professionals brings in-depth knowledge to every project,
                ensuring precision.
              </p>

              {/* Services Grid */}
              <div className="grid grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-4">
                {commercialServices.map((service, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 sm:gap-3 group"
                  >
                    <img
                      src="./svg/Item1.svg"
                      alt=""
                      className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0"
                      style={{
                        filter:
                          "brightness(0) saturate(100%) invert(19%) sepia(94%) saturate(1992%) hue-rotate(209deg) brightness(92%) contrast(96%)",
                      }}
                    />
                    <span className="text-xs sm:text-sm text-gray-700 font-medium group-hover:text-[#0B4196] transition-colors duration-200">
                      {service}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
