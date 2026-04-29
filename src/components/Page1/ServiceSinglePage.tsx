// components/Services/ServiceSinglePage.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getServiceBySlug,
  getAllServices,
  type Service,
} from "../../data/serviceData";

const ServiceSinglePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"features" | "process" | "faq">(
    "features",
  );

  useEffect(() => {
    if (slug) {
      const foundService = getServiceBySlug(slug);
      if (foundService) {
        setService(foundService);
        setActiveImage(0);
      } else {
        navigate("/services", { replace: true });
      }
    }
  }, [slug, navigate]);

  const handleContact = () => {
    navigate("/contact");
  };

  const handleGetQuote = () => {
    navigate("/contact");
  };

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const otherServices = getAllServices().filter((s) => s.id !== service.id);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Back Navigation - No sticky */}

      {/* Gallery Section - Fixed image coverage */}
      <section className="bg-white pt-6 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main Large Image */}
            <div className="lg:col-span-2 relative rounded-2xl overflow-hidden group h-[500px]">
              <img
                src={service.gallery[activeImage]}
                alt={service.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-gray-700">
                  <svg
                    className="w-4 h-4 inline mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {activeImage + 1} / {service.gallery.length}
                </span>
              </div>
            </div>

            {/* Side Images */}
            <div className="hidden lg:flex flex-col gap-4 h-[500px]">
              {service.gallery.slice(0, 2).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx === 0 ? 1 : 2)}
                  className="relative rounded-2xl overflow-hidden flex-1 group"
                >
                  <img
                    src={img}
                    alt={`View ${idx + 2}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition" />
                </button>
              ))}
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
            {service.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all ${
                  activeImage === idx
                    ? "ring-2 ring-blue-600 ring-offset-2"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Content - 2/3 */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title Section */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                      {service.title}
                    </h1>
                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-600 rounded-md font-medium">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        5.0
                      </span>
                      <span>•</span>
                      <span>150+ Projects Completed</span>
                      <span>•</span>
                      <span>Sacramento, CA</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    P
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      Pyxel Construction
                    </p>
                    <p className="text-gray-500 text-xs">
                      Licensed & Insured Contractor
                    </p>
                  </div>
                  <button className="ml-auto text-blue-600 text-sm font-medium hover:underline">
                    View Profile
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  About This Service
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {service.fullDescription}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  With over 25 years of experience in the construction industry,
                  our team brings unparalleled expertise to every project. We
                  pride ourselves on delivering quality workmanship, transparent
                  communication, and results that exceed expectations.
                </p>
              </div>

              {/* Tabs Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Tab Headers */}
                <div className="flex border-b border-gray-100">
                  {[
                    {
                      id: "features",
                      label: "Features",
                      icon: "M5 13l4 4L19 7",
                    },
                    {
                      id: "process",
                      label: "Process",
                      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
                    },
                    {
                      id: "faq",
                      label: "FAQ",
                      icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                    },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition ${
                        activeTab === tab.id
                          ? "text-blue-600 border-b-2 border-blue-600 bg-blue-50/50"
                          : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
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
                          d={tab.icon}
                        />
                      </svg>
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="p-6 sm:p-8">
                  {activeTab === "features" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.features.map((feature, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 p-3 rounded-xl bg-gray-50"
                        >
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg
                              className="w-4 h-4 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span className="text-gray-700 text-sm font-medium">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "process" && (
                    <div className="space-y-6">
                      {service.process.map((step, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {step.step}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">
                              {step.title}
                            </h4>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "faq" && (
                    <div className="space-y-4">
                      {service.faqs.map((faq, idx) => (
                        <div
                          key={idx}
                          className="border border-gray-200 rounded-xl overflow-hidden"
                        >
                          <details className="group">
                            <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition">
                              <span className="font-medium text-gray-900 text-sm pr-4">
                                {faq.question}
                              </span>
                              <svg
                                className="w-5 h-5 text-gray-400 transition-transform group-open:rotate-180"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </summary>
                            <div className="px-4 pb-4">
                              <p className="text-gray-600 text-sm leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </details>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Benefits */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Why Choose This Service
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="text-center">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <svg
                          className="w-6 h-6 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-700 text-sm font-medium leading-tight">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar - 1/3 */}
            <div className="lg:col-span-1">
              <div className="space-y-4">
                {/* Pricing Card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-bold text-gray-900">
                      Custom
                    </span>
                    <span className="text-gray-500">Quote</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Starting Price</span>
                      <span className="font-medium text-gray-900">$5,000</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Timeline</span>
                      <span className="font-medium text-gray-900">
                        2-8 weeks
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Warranty</span>
                      <span className="font-medium text-gray-900">5 Years</span>
                    </div>
                  </div>

                  <button
                    onClick={handleGetQuote}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition duration-200 mb-3 flex items-center justify-center gap-2"
                  >
                    Get Free Quote
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
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={handleContact}
                    className="w-full bg-white border-2 border-gray-200 hover:border-blue-600 text-gray-900 hover:text-blue-600 font-semibold py-3.5 rounded-xl transition duration-200"
                  >
                    Contact Us
                  </button>

                  <div className="mt-4 pt-4 border-t border-gray-100 text-center">
                    <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                      <svg
                        className="w-4 h-4 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      Licensed, Bonded & Insured
                    </p>
                  </div>
                </div>

                {/* Contact Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full overflow-hidden">
                      <img
                        src="./image/image3.png"
                        alt="Pyxel"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        Pyxel Construction
                      </p>
                      <p className="text-gray-500 text-xs">
                        Typically responds in 2 hours
                      </p>
                    </div>
                  </div>
                  <a
                    href="tel:9168888281"
                    className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition text-sm font-medium"
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
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    (916) 888-8281
                  </a>
                </div>

                {/* Other Services */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-4 text-sm">
                    Other Services
                  </h3>
                  <div className="space-y-3">
                    {otherServices.map((other) => (
                      <Link
                        key={other.id}
                        to={`/services/${other.slug}`}
                        className="flex items-center gap-3 group"
                      >
                        <img
                          src={other.image}
                          alt={other.title}
                          className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition truncate">
                            {other.title}
                          </p>
                          <p className="text-gray-500 text-xs truncate">
                            {other.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services CTA */}
      <section className="bg-white border-t border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need a Different Service?
          </h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Explore our full range of construction services tailored to your
            needs.
          </p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all"
          >
            View All Services
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServiceSinglePage;
