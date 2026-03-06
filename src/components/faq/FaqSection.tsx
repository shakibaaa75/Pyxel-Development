import { useState } from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "How to process your site for construction?",
    answer:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
  },
  {
    id: 2,
    question: "What are the charges of renovation?",
    answer:
      "Renovation charges vary based on project scope, materials, and timeline. We provide detailed quotes after initial consultation and site assessment.",
  },
  {
    id: 3,
    question: "Benefits of choosing our services?",
    answer:
      "We offer experienced professionals, quality materials, on-time delivery, transparent pricing, and dedicated project management throughout your construction journey.",
  },
  {
    id: 4,
    question: "How to contact with our support team?",
    answer:
      "You can reach our support team via phone, email, or through our website's contact form. We're available Monday through Friday, 9 AM to 6 PM.",
  },
  {
    id: 5,
    question: "How we start working on construction projects?",
    answer:
      "We begin with an initial consultation, followed by site assessment, detailed planning, quote approval, and then commence construction with regular progress updates.",
  },
  {
    id: 6,
    question: "Can we cancel the project anytime?",
    answer:
      "Project cancellation terms are outlined in our contract. We have flexible policies with fair termination clauses to protect both parties.",
  },
];

export default function FaqSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-[1110px] mx-auto px-4">
        {/* Header Section - Added exactly as requested */}
        <div className="text-center mb-12">
          <h1
            className="text-[42px] font-bold text-gray-900 mb-4"
            style={{
              fontFamily: "Rethink Sans, sans-serif",
              fontWeight: 700,
              lineHeight: "52px",
              letterSpacing: "0px",
            }}
          >
            Frequently <span className="text-blue-600">Asked Questions</span>
          </h1>
          <p
            className="text-gray-600 text-lg max-w-2xl mx-auto"
            style={{
              fontFamily: "Rethink Sans, sans-serif",
            }}
          >
            We've compiled answers to the most common questions to help you
            quickly find the information you need.
          </p>
        </div>

        {/* FAQ Items Container - Exact design from your code */}
        <div className="space-y-3 bg-[#0252CF08] p-6 rounded-lg">
          {faqData.map((item) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className={`overflow-hidden border transition-all duration-300 ease-in-out ${
                  isOpen ? "border-blue-600" : "border-gray-200"
                }`}
                style={{
                  borderRadius: isOpen ? "5px" : "5px",
                  fontFamily: "Rethink Sans, sans-serif",
                }}
              >
                {/* Question Button - exactly 52px height */}
                <button
                  onClick={() => toggleFAQ(item.id)}
                  className={`w-full flex items-center justify-between px-5 py-8 transition-all duration-300 ${
                    isOpen
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-900 hover:bg-gray-50"
                  }`}
                  style={{
                    height: "52px",
                    fontWeight: 600,
                    fontSize: "18px",
                    lineHeight: "52px",
                    letterSpacing: "0px",
                    fontFamily: "Rethink Sans, sans-serif",
                  }}
                >
                  <span className="truncate">{item.question}</span>
                  <span
                    className={`text-3xl font-light leading-none transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* Answer Section with smooth height transition */}
                <div
                  className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-[140px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div
                    className="bg-white p-5"
                    style={{
                      height: "auto",
                      fontWeight: 400,
                      fontSize: "16px",
                      lineHeight: "25px",
                      letterSpacing: "0px",
                      fontFamily: "Rethink Sans, sans-serif",
                    }}
                  >
                    <p className="text-gray-700 line-clamp-4">{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
