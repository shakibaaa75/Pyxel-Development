// FAQSection.tsx
import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface TwelvethsecProps {
  faqs: FAQItem[];
}

const Twelvethsec: React.FC<TwelvethsecProps> = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-white pt-28 pb-20 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - FAQ Content */}
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <img src="./svg/Item3.svg" alt="" className="w-6 h-6" />
              <span className="text-blue-600 text-sm font-medium">FAQ</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 leading-tight mb-8">
              Simply the best approach
              <br />
              for your company we Ask
              <br />
              and questions
            </h2>

            <div className="flex flex-col gap-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition"
                  >
                    <span className="font-medium text-gray-900">
                      {faq.question}
                    </span>
                    <span className="text-gray-400 text-xl transition-transform duration-300">
                      {openIndex === index ? "−" : "+"}
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      openIndex === index
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-4 pb-4">
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Image with Black Box Behind */}
          <div className="relative flex justify-center">
            {/* Black Box Behind Image - Desktop Only */}
            <div className="hidden lg:block absolute top-0 right-0 w-36 h-36 bg-black rounded-[40px] z-0 translate-x-1/4 -translate-y-1/4"></div>

            {/* Image */}
            <img
              src="./image/image10.jpg"
              alt="Construction site"
              className="relative z-10 w-full h-auto lg:w-[523px] lg:h-[623px] object-cover rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Twelvethsec;
