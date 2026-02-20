// AboutCompany.tsx
import React from "react";

const AfterHeroSec: React.FC = () => {
  return (
    <section className="w-full bg-white py-[70px] pb-[50px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-[30px] lg:gap-16 items-center">
          {/* Content Section */}
          <div className="flex flex-col gap-[10px] lg:gap-[15px]">
            <div className="inline-flex items-center gap-2">
              <img src="./svg/Item1.svg" alt="" className="w-6 h-6" />
              <span className="text-blue-600 text-sm font-semibold uppercase tracking-wider">
                About Company
              </span>
            </div>

            <h2 className="text-2xl lg:text-[42px] font-bold text-gray-900 leading-tight">
              Your Trusted Partner in{" "}
              <span className="text-gray-900">Construction & Renovation</span>
            </h2>

            <p className="text-base text-gray-600 leading-relaxed">
              At Pyxel Construction, we bring your vision to life with
              precision, passion, and professionalism...
            </p>

            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-[10px] lg:gap-[15px]">
              <div className="flex items-start gap-3">
                <img
                  src="./svg/Item3.svg"
                  alt=""
                  className="w-8 h-8 flex-shrink-0 mt-1"
                />
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                  Licensed, Insured & Certified Professionals
                </h3>
              </div>

              <div className="flex items-start gap-3">
                <img
                  src="./svg/Item2.svg"
                  alt=""
                  className="w-8 h-8 flex-shrink-0 mt-1"
                />
                <h3 className="font-semibold text-gray-900 text-sm md:text-base">
                  On-Time & On-Budget Delivery
                </h3>
              </div>
            </div>

            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-md transition duration-200 w-fit mt-2">
              Learn More
            </button>
          </div>

          {/* Image Section */}
          <div className="w-full">
            <div className="hidden md:block relative pb-12">
              <img
                src="./image/image4.png"
                alt="Construction"
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute bottom-12 left-10 grid grid-cols-8 gap-2">
                {[...Array(32)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-orange-400 rounded-full" />
                ))}
              </div>
            </div>

            <div className="md:hidden relative pb-8">
              <img
                src="./image/image4.png"
                alt="Construction"
                className="w-full h-auto rounded-lg"
              />
              <div className="-mt-8 ml-4 grid grid-cols-6 gap-1.5 w-fit">
                {[...Array(18)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 bg-orange-400 rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AfterHeroSec;
