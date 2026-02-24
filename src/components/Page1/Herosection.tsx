import { useState } from "react";

const slides = [
  {
    platform: "facebook",
    rating: "4.5",
    reviews: "234+",
    text: "Where quality construction meets complete client satisfaction",
  },
  {
    platform: "Google",
    rating: "4.9",
    reviews: "283+",
    text: "Exceptional service and attention to detail",
  },
  {
    platform: "twitter",
    rating: "4.8",
    reviews: "156+",
    text: "Reliable timelines and professional craftsmanship",
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((p) => (p + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((p) => (p - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full h-[85vh] flex items-center overflow-hidden font-sans">
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

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 py-20 pb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="max-w-xl">
          {/* Tag */}
          <div className="inline-flex items-center gap-2 mb-6">
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
            <span className="text-gray-700 text-sm font-semibold uppercase tracking-wider ml-1">
              Great Experience In Building
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-[58px] font-extrabold text-gray-900 leading-tight mb-6">
            General Contractor In Sacramento, CA
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg">
            From home renovations to large-scale construction, we deliver
            quality craftsmanship, reliable timelines, and results you can
            trust.
          </p>

          {/* CTA Button */}
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-9 py-3.5 rounded-lg transition duration-200 text-base">
            Get a Free Quote
          </button>
        </div>

        {/* Right Side - Review Card */}
        <div className="hidden lg:flex justify-end items-end self-end h-full pb-10">
          <div
            className="bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 border border-white/80 relative"
            style={{ width: "405px", minHeight: "202px" }}
          >
            {/* Social Icons */}
            <div className="flex items-center gap-2.5 mb-4">
              {/* Facebook */}
              <div className="w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              {/* Google */}
              <div className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </div>
              {/* Twitter */}
              <div className="w-9 h-9 rounded-full bg-[#1DA1F2] flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </div>
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

              {/* Arrows */}
              <div className="flex gap-2">
                <button
                  onClick={prevSlide}
                  className="w-9 h-9 rounded-lg border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition"
                >
                  <svg
                    className="w-4 h-4 text-gray-600"
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
                  onClick={nextSlide}
                  className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition"
                >
                  <svg
                    className="w-4 h-4 text-white"
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

      {/* White curved bottom with blue arc */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-[70px] block"
          preserveAspectRatio="none"
        >
          {/* White fill */}
          <path d="M0 80 L0 20 Q720 80 1440 20 L1440 80 Z" fill="white" />
          {/* Blue stroke on top edge */}
          <path
            d="M0 20 Q720 80 1440 20"
            fill="none"
            stroke="#2563EB"
            strokeWidth="3"
          />
        </svg>
      </div>
    </section>
  );
}
