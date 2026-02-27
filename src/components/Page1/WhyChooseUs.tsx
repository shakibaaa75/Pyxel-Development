import { useState } from "react";

interface Review {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  text: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

export default function WhyChooseUs() {
  const [currentReview, setCurrentReview] = useState(0);

  const reviews: Review[] = [
    {
      id: 1,
      name: "Recard milton",
      role: "CEO, MGT",
      avatar: "./image/user.png",
      rating: 5,
      text: "With years of industry experience, our team of skilled professionals brings in-depth knowledge to every project, ensuring precision.",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      role: "Director, ABC Corp",
      avatar: "./image/avatar2.jpg",
      rating: 5,
      text: "Exceptional service and quality workmanship. They delivered our project on time and exceeded all expectations.",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Manager, XYZ Ltd",
      avatar: "./image/avatar3.jpg",
      rating: 5,
      text: "Professional team with great attention to detail. Highly recommend their construction services.",
    },
    {
      id: 4,
      name: "Emily Davis",
      role: "Owner, Davis Homes",
      avatar: "./image/avatar4.jpg",
      rating: 5,
      text: "Best construction company we've worked with. Transparent communication and quality results.",
    },
  ];

  const features: Feature[] = [
    {
      icon: "./svg/Item1.svg",
      title: "Expertise and Experience",
      description:
        "With years of industry experience, our team of skilled professionals brings in-depth knowledge to every project, ensuring precision.",
    },
    {
      icon: "./svg/Item1.svg",
      title: "Customer-Centered Approach",
      description:
        "Your satisfaction is our top priority. From the initial consultation to project completion, we work closely with you",
    },
    {
      icon: "./svg/Item1.svg",
      title: "Innovative Solutions",
      description:
        "We stay ahead of industry trends by incorporating the latest technologies and modern construction techniques. it's sustainable building practices.",
    },
  ];

  const certifications = [
    { icon: "./svg/Item1.svg", label: "OSAA Certified" },
    { icon: "./svg/Item1.svg", label: "OSAA Certified" },
    { icon: "./svg/Item1.svg", label: "OSAA" },
  ];

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Row - Image and Reviews */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left - Image with Overlay Card */}
          <div className="relative rounded-3xl overflow-hidden h-[400px] lg:h-[450px]">
            <img
              src="./image/image10.jpg"
              alt="Beautiful house"
              className="w-full h-full object-cover"
            />
            {/* Overlay Card */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <div className="flex  items-center gap-2 mb-3">
                <img src="./svg/Item1.svg" alt="" className="w-5 h-5" />
                <span className="text-sm font-medium text-gray-700">
                  Why Choose Us
                </span>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Why Do You
                <br />
                <span className="text-gray-400">Choose Us?</span>
              </h3>
              <p className="text-gray-600 text-sm">
                Delivering quality, reliability, and value with every project we
                take on
              </p>
            </div>
          </div>

          {/* Right - Customer Reviews */}
          <div className="bg-gray-50 rounded-3xl p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-gray-900">
                Customer reviews
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Excellent</span>
                <div className="flex items-center gap-1">
                  <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    285 reviews
                  </span>
                </div>
              </div>
            </div>

            {/* Review Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img
                    src={reviews[currentReview].avatar}
                    alt={reviews[currentReview].name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">
                      {reviews[currentReview].name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {reviews[currentReview].role}
                    </p>
                  </div>
                </div>
                <img
                  src="./svg/Item1.svg"
                  alt=""
                  className="w-8 h-8 text-red-500"
                />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(reviews[currentReview].rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-blue-600 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center ml-1">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                {reviews[currentReview].text}
              </p>
            </div>

            {/* Certifications */}
            <div className="flex items-center justify-center gap-8 mb-6">
              {certifications.map((cert, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <img
                      src={cert.icon}
                      alt=""
                      className="w-6 h-6 text-red-500"
                    />
                  </div>
                  <span className="text-xs text-gray-600">{cert.label}</span>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between">
              {/* Dots */}
              <div className="flex items-center gap-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReview(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-colors ${
                      index === currentReview ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={prevReview}
                  className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition"
                >
                  <svg
                    className="w-5 h-5"
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
                  onClick={nextReview}
                  className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white hover:bg-blue-700 transition"
                >
                  <svg
                    className="w-5 h-5"
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

        {/* Bottom Row - Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {features.slice(0, 2).map((feature, index) => (
            <div
              key={index}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <img
                    src={feature.icon}
                    alt=""
                    className="w-6 h-6 text-white"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Center - Third Feature with Button */}
        <div className="flex justify-center">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition w-full md:max-w-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <img
                  src={features[2].icon}
                  alt=""
                  className="w-6 h-6 text-blue-600"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900 mb-2">
                  {features[2].title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {features[2].description}
                </p>
              </div>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-blue-700 transition whitespace-nowrap">
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
