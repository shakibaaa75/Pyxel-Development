import React from "react";

// --- Types ---
interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

// --- Data ---
const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "01",
    number: "01",
    title: "Apply Online",
    description:
      "Discuss project goals, budget, and timeline with our expert team",
  },
  {
    id: "02",
    number: "02",
    title: "Quick Review",
    description:
      "Comprehensive plan, including design, materials, and schedules.",
  },
  {
    id: "03",
    number: "03",
    title: "Get Approved",
    description:
      "Implement the plan with skilled professionals ensuring quality",
  },
  {
    id: "04",
    number: "04",
    title: "Start Your Project",
    description: "We addressing any concerns before project completion",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 px-4 md:px-8 bg-white font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            The Journey of Your Project with Us
          </h2>
          <p className="text-slate-500 max-w-3xl mx-auto text-base leading-relaxed">
            Construction standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a
            type specimen book.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative px-4">
          {/* Desktop Dashed Line - Positioned behind the circles */}
          <div
            className="hidden md:block absolute top-[22px] left-[12.5%] right-[12.5%] h-[2px]"
            style={{
              background:
                "repeating-linear-gradient(to right, #2563eb 0, #2563eb 8px, transparent 8px, transparent 16px)",
            }}
          />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
            {PROCESS_STEPS.map((step, index) => (
              <div
                key={step.id}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Step Number Circle */}
                <div className="w-11 h-11 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg mb-6 shadow-md transition-transform duration-300 group-hover:scale-110">
                  {step.number}
                </div>

                {/* Content */}
                <div className="px-2">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-[220px] mx-auto">
                    {step.description}
                  </p>
                </div>

                {/* Mobile Connector Line (Vertical) */}
                {index !== PROCESS_STEPS.length - 1 && (
                  <div
                    className="md:hidden absolute left-1/2 -translate-x-1/2 bottom-[-20px] w-[2px] h-4"
                    style={{
                      background:
                        "repeating-linear-gradient(to bottom, #2563eb 0, #2563eb 4px, transparent 4px, transparent 8px)",
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
