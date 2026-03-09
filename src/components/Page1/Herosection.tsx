import { useState, useEffect, useCallback } from "react";

const slides = [
  {
    platform: "facebook",
    rating: "5.0",
    reviews: "234+",
    text: "Where quality construction meets complete client satisfaction",
    socialImage: "./image/Facebook.png",
  },
  {
    platform: "Google",
    rating: "5.0",
    reviews: "283+",
    text: "Exceptional service and attention to detail",
    socialImage: "./image/Google.png",
  },
  {
    platform: "Angi",
    rating: "5.0",
    reviews: "198+",
    text: "Trusted professionals delivering quality work and dependable service",
    socialImage: "./image/Angi.png",
  },
  {
    platform: "Houzz",
    rating: "5.0",
    reviews: "312+",
    text: "Beautiful craftsmanship paired with outstanding customer experience",
    socialImage: "./image/Houzz.png",
  },
  {
    platform: "Yelp",
    rating: "5.0",
    reviews: "174+",
    text: "Highly recommended for quality, professionalism, and clear communication",
    socialImage: "./image/Yelp.png",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [clickedButton, setClickedButton] = useState<"prev" | "next" | null>(
    null,
  );
  const [isPaused, setIsPaused] = useState(false);

  // Auto scroll every 3 seconds
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = useCallback(() => {
    setClickedButton("prev");
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setClickedButton(null), 200);
  }, []);

  const handleNext = useCallback(() => {
    setClickedButton("next");
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setTimeout(() => setClickedButton(null), 200);
  }, []);

  return (
    <section className="relative w-full min-h-[85vh] lg:h-[85vh] flex items-center overflow-hidden font-sans">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('./image/image1.jpg')",
        }}
      />

      {/* Blue Overlay - 0.3 opacity */}
      <div className="absolute inset-0 bg-blue-600/30" />

      {/* Left white gradient for text readability */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to right, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.75) 35%, rgba(255,255,255,0.3) 60%, transparent 100%)",
        }}
      />

      {/* Diagonal blue shape bottom-left */}
      <div
        className="absolute bottom-0 left-0 w-[340px] h-[340px] z-[2]"
        style={{
          background:
            "linear-gradient(135deg, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0.08) 100%)",
          clipPath: "polygon(0 100%, 0 40%, 60% 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[220px] h-[220px] z-[3]"
        style={{
          background: "rgba(37,99,235,0.22)",
          clipPath: "polygon(0 100%, 0 55%, 45% 100%)",
        }}
      />

      {/* Main Content - Reduced padding on mobile */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-10 sm:py-14 lg:py-20 pb-20 sm:pb-28 lg:pb-40 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Content */}
        <div className="max-w-xl">
          {/* Tag */}
          <div className="inline-flex items-center  mb-4 sm:mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="28"
              viewBox="0 0 25 33"
              fill="none"
            >
              <mask id="mask1" fill="white">
                <path d="M0 0H25V33H0V0Z" />
              </mask>
              <path
                d="M0 0V-1H-1V0H0ZM0 33H-1V34H0V33ZM0 0V1H25V0V-1H0V0ZM25 33V32H0V33V34H25V33ZM0 33H1V0H0H-1V33H0Z"
                fill="#2563EB"
                mask="url(#mask1)"
              />
            </svg>
            <span className="text-gray-700 text-xs sm:text-sm font-semibold uppercase tracking-wider ml-[-6px]">
              Great Experience In Building
            </span>
          </div>

          {/* Heading - Smaller on mobile */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl ml-[-6px] lg:text-[58px] font-extrabold text-gray-900 leading-tight mb-4 sm:mb-6">
            General Contractor In Sacramento, CA
          </h1>

          {/* Description - Smaller on mobile */}
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-lg">
            From home renovations to large-scale construction, we deliver
            quality craftsmanship, reliable timelines, and results you can
            trust.
          </p>

          {/* CTA Button - Smaller padding on mobile */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 sm:px-9 py-3 sm:py-3.5 rounded-lg transition duration-200 text-sm sm:text-base">
            Get a Free Quote
          </button>

          {/* Mobile/Tablet Review Card - Left aligned, bigger than before */}
          <div
            className="mt-6 sm:mt-8 lg:hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            <div
              className="relative rounded-xl shadow-lg p-4 sm:p-5 border border-white/80 w-full max-w-[360px]"
              style={{
                background: "rgba(243, 248, 255, 0.78)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
              }}
            >
              {/* Dynamic Social Image */}
              <div className="mb-3">
                <img
                  src={slides[currentSlide].socialImage}
                  alt={slides[currentSlide].platform}
                  className="h-auto w-[80px] sm:w-[88px] object-contain rounded"
                />
              </div>

              {/* Stars + Rating */}
              <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-4 h-4 text-gray-900 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="font-bold text-sm sm:text-base text-gray-900">
                  {slides[currentSlide].rating}
                </span>
                <span className="text-gray-500 text-xs sm:text-sm">
                  ( {slides[currentSlide].reviews} reviews )
                </span>
              </div>

              {/* Tagline */}
              <p className="text-gray-700 text-xs sm:text-sm font-medium leading-snug mb-6 sm:mb-7 pr-20">
                {slides[currentSlide].text}
              </p>

              {/* Navigation */}
              <div className="absolute bottom-3 sm:bottom-4 left-4 sm:left-5 right-4 sm:right-5 flex items-center justify-between">
                {/* Dots */}
                <div className="flex gap-1 sm:gap-1.5 items-center">
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`h-1.5 sm:h-2 rounded-full transition-all duration-200 ${
                        i === currentSlide
                          ? "w-4 sm:w-5 bg-blue-600"
                          : "w-1.5 sm:w-2 bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>

                {/* Rectangle Buttons */}
                <div className="flex gap-1.5 sm:gap-2">
                  <button
                    onClick={handlePrev}
                    className={`w-10 sm:w-11 h-7 sm:h-8 rounded-md border flex items-center justify-center transition-all duration-200 ${
                      clickedButton === "prev"
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <svg
                      className="w-3.5 sm:w-4 h-3.5 sm:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={handleNext}
                    className={`w-10 sm:w-11 h-7 sm:h-8 rounded-md border flex items-center justify-center transition-all duration-200 ${
                      clickedButton === "next"
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <svg
                      className="w-3.5 sm:w-4 h-3.5 sm:h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Review Card - Desktop ONLY - Original absolute positioning preserved */}
        <div
          className="hidden lg:flex justify-end items-end self-end h-full pb-24"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div
            className="relative rounded-2xl shadow-xl p-6 border border-white/80"
            style={{
              position: "absolute",
              bottom: "90px",
              width: "405px",
              minHeight: "202px",
              background: "rgba(243, 248, 255, 0.78)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            {/* Dynamic Social Image based on current slide - 88px width */}
            <div className="mb-4">
              <img
                src={slides[currentSlide].socialImage}
                alt={slides[currentSlide].platform}
                className="h-auto w-[88px] object-contain rounded"
              />
            </div>

            {/* Stars + Rating */}
            <div className="flex items-center gap-2 mb-2.5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4.5 h-4.5 text-gray-900 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="font-bold text-base text-gray-900">
                {slides[currentSlide].rating}
              </span>
              <span className="text-gray-500 text-sm">
                ( {slides[currentSlide].reviews} reviews )
              </span>
            </div>

            {/* Tagline */}
            <p className="text-gray-700 text-sm font-medium leading-snug mb-8">
              {slides[currentSlide].text}
            </p>

            {/* Navigation */}
            <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
              {/* Dots */}
              <div className="flex gap-1.5 items-center">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className={`h-2 rounded-full transition-all duration-200 ${
                      i === currentSlide
                        ? "w-5 bg-blue-600"
                        : "w-2 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              {/* Rectangle Buttons - Both White, change color on click */}
              <div className="flex gap-2">
                <button
                  onClick={handlePrev}
                  className={`w-12 h-9 rounded-lg border flex items-center justify-center transition-all duration-200 ${
                    clickedButton === "prev"
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
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
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleNext}
                  className={`w-12 h-9 rounded-lg border flex items-center justify-center transition-all duration-200 ${
                    clickedButton === "next"
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
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
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* White curved bottom with blue arc - FIX: Added -bottom-[1px] to eliminate black line */}
      <div className="absolute -bottom-[1px] left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[50px] sm:h-[60px] lg:h-[70px] block"
          preserveAspectRatio="none"
        >
          {/* White fill - adjusted curve to compensate for -bottom-[1px] */}
          <path d="M0 80 L0 15 Q720 75 1440 15 L1440 80 Z" fill="white" />
          {/* Blue stroke on top edge */}
          <path
            d="M0 15 Q720 75 1440 15"
            fill="none"
            stroke="#2563EB"
            strokeWidth="3"
          />
        </svg>
      </div>
    </section>
  );
}
