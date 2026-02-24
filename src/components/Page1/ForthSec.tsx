// FourthSection.tsx
import React from "react";

const FourthSection: React.FC = () => {
  const features = [
    {
      icon: "./svg/Item4.svg",
      title: "Quality Craftsmanship",
      description:
        "Every project is built with precision, using only the best materials and skilled professionals to ensure your home stands the test of time.",
    },
    {
      icon: "./svg/Item5.svg",
      title: "Transparent Process",
      description:
        "From the first consultation to the final handover, we keep you informed at every step, so you always know exactly what's happening with your build.",
    },
    {
      icon: "./svg/Item6.svg",
      title: "Personalized Design",
      description:
        "We listen closely to your ideas and bring them to life, creating spaces that reflect your lifestyle, personality, and vision of home.",
    },
  ];

  return (
    <section className="w-full bg-white py-16 md:py-24 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Content Section */}
          <div className="flex flex-col gap-4 order-1 md:order-2">
            <span className="text-blue-600 text-sm font-medium">
              building homes you can rely on
            </span>

            <h2 className="text-2xl md:text-3xl lg:text-[40px] font-bold text-gray-900 leading-tight">
              Turning Your Vision Into a Home You Can Trust.
            </h2>

            <p className="text-gray-600 text-base leading-relaxed">
              From planning to completion, we deliver quality craftsmanship,
              transparent communication, and a building experience that puts
              your peace of mind first.
            </p>

            <div className="flex flex-col gap-6 mt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <img
                    src={feature.icon}
                    alt=""
                    className="w-10 h-10 flex-shrink-0"
                  />
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition duration-200 w-fit mt-4">
              Learn More About Our Work
            </button>
          </div>

          {/* Image Section */}
          <div className="order-2 md:order-1 flex justify-center">
            <img
              src="./image/image7.png"
              alt="Construction"
              className="w-full max-w-[420px] md:max-w-[480px] 
                         h-auto md:h-[520px] 
                         rounded-lg object-cover 
                         transition-all duration-300 ease-in-out"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FourthSection;
