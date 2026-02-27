import { useEffect, useRef, useState } from "react";

interface StatItemProps {
  value: string;
  label: string;
  description: string;
  delay: number;
  isLast: boolean;
}

function AnimatedCounter({ value, delay }: { value: string; delay: number }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const numericValue = parseInt(value.replace(/\D/g, ""));
  const suffix = value.replace(/\d/g, "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = numericValue / steps;
      let current = 0;

      const interval = setInterval(() => {
        current += increment;
        if (current >= numericValue) {
          setCount(numericValue);
          clearInterval(interval);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [hasStarted, numericValue, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

function StatItem({ value, label, description, delay, isLast }: StatItemProps) {
  return (
    <div
      className={`grid grid-cols-2 gap-6 py-6 ${!isLast ? "border-b border-gray-800" : ""} opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Left Column - Icon and Stats */}
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white">
          <img src="./svg/Item1.svg" alt="" className="w-5 h-5" />
        </div>
        <div>
          <div className="text-3xl font-bold text-white mb-0.5">
            <AnimatedCounter value={value} delay={delay} />
          </div>
          <div className="text-gray-400 text-xs">{label}</div>
        </div>
      </div>

      {/* Right Column - Description with left border */}
      <div className="flex items-center">
        <div className="border-l border-gray-700 pl-6 h-full flex items-center">
          <p className="text-gray-500 text-xs leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function StatsSection() {
  const stats = [
    {
      value: "150+",
      label: "Projects Completed",
      description:
        "Quis nulla blandit vulputate morbi adipiscing sem vestibulum. Nulla turpis integer dui sed posuere sem. Id molestie mi arcu.",
    },
    {
      value: "25+",
      label: "Years of Experience",
      description:
        "Quis nulla blandit vulputate morbi adipiscing sem vestibulum. Nulla turpis integer dui sed posuere sem. Id molestie mi arcu.",
    },
    {
      value: "100%",
      label: "Client Satisfaction",
      description:
        "Quis nulla blandit vulputate morbi adipiscing sem vestibulum. Nulla turpis integer dui sed posuere sem. Id molestie mi arcu.",
    },
    {
      value: "50+",
      label: "Skilled Professionals",
      description:
        "Quis nulla blandit vulputate morbi adipiscing sem vestibulum. Nulla turpis integer dui sed posuere sem. Id molestie mi arcu.",
    },
  ];

  return (
    <section className="bg-[#1a1a1a] relative overflow-hidden">
      {/* Background Image - workerbg.png */}
      <div
        className="hidden lg:block absolute z-0 pointer-events-none"
        style={{
          width: "439px",
          height: "608px",
          right: "0px",
          bottom: "0px",
          backgroundImage: "url(./image/workerbg.png)",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right bottom",
          mixBlendMode: "luminosity",
        }}
      />

      {/* Worker Image - worker.png */}
      <div
        className="hidden lg:block absolute z-10 pointer-events-none"
        style={{
          width: "504px",
          height: "528px",
          right: "120px",
          bottom: "0px",
        }}
      >
        <img
          src="./image/worker.png"
          alt="Construction worker with blueprint"
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20 relative z-20">
        {/* Header Row - Title Left, Description Right (Full Width) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-10">
          {/* Left - Badge and Title */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-4 opacity-0 animate-[fadeIn_0.6s_ease-out_forwards]">
              <img
                src="./svg/Item1.svg"
                alt=""
                className="w-4 h-4 text-blue-600"
              />
              <span className="text-xs font-medium text-gray-400">
                Core Services Overview
              </span>
            </div>

            {/* Title */}
            <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight opacity-0 animate-[slideInLeft_0.6s_ease-out_0.2s_forwards]">
              Successfully Project
              <br />
              Finished.
            </h2>
          </div>

          {/* Right - Description with exact styling */}
          <div className="flex items-center">
            <p
              className="text-white opacity-0 animate-[fadeIn_0.6s_ease-out_0.4s_forwards]"
              style={{
                width: "70%",
                fontFamily: "Rethink Sans, sans-serif",
                fontWeight: 400,
                fontSize: "20px",
                lineHeight: "30px",
                letterSpacing: "0%",
              }}
            >
              We deliver quality projects on time, every time. Our completed
              work reflects our commitment to excellence and client satisfaction
              across
            </p>
          </div>
        </div>

        {/* Stats List - 855px Max Width */}
        <div className="max-w-[665px] w-full">
          {stats.map((stat, index) => (
            <StatItem
              key={stat.label}
              value={stat.value}
              label={stat.label}
              description={stat.description}
              delay={600 + index * 150}
              isLast={index === stats.length - 1}
            />
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
