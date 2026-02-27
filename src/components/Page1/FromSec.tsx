// ContactSection.tsx
import React, { useState } from "react";

const FromSec: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    lookingFor: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing again
    if (submitError) {
      setSubmitError(null);
    }
    // Reset submitted state when user starts typing
    if (isSubmitted) {
      setIsSubmitted(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // Basic validation
    if (!formData.fullName || !formData.phoneNumber || !formData.emailAddress) {
      setSubmitError("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.emailAddress)) {
      setSubmitError("Please enter a valid email address");
      setIsSubmitting(false);
      return;
    }

    try {
      // Using FormSubmit.co (Free, no backend required)
      const formEndpoint = "https://formsubmit.co/ajax/shakib875c@gmail.com";

      const response = await fetch(formEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          phone: formData.phoneNumber,
          email: formData.emailAddress,
          lookingFor: formData.lookingFor,
          message: formData.message,
          _subject: "New Contact Form Submission from Pyxel Construction",
        }),
      });

      const result = await response.json();

      if (response.ok) {
        // Set submitted state to true to change button text
        setIsSubmitted(true);
        // Clear form
        setFormData({
          fullName: "",
          phoneNumber: "",
          emailAddress: "",
          lookingFor: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError(
        "Failed to send message. Please try again or call us directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="w-full py-16 md:py-24 lg:py-32 relative">
      {/* Dot pattern background */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: "url('./image/Background.png')",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Image */}
          <div className="relative rounded-2xl overflow-hidden flex justify-center">
            <img
              src="./image/image13.jpg"
              alt="Modern luxury home"
              className="w-full h-auto lg:max-w-[518px] lg:h-[642px] object-cover rounded-2xl"
            />
          </div>

          {/* Right - Form */}
          <div>
            {/* Tag */}
            <div className="inline-flex items-center gap-2 mb-4">
              <img
                src="./svg/Item1.svg"
                alt=""
                className="w-6 h-6 fill-amber-50"
              />
              <span className="text-white text-sm font-medium">Contact Us</span>
            </div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8">
              Schedule Free Consultation
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Error Message - Only shown when there's an error */}
              {submitError && (
                <div className="p-4 rounded-lg bg-red-600 text-white">
                  {submitError}
                </div>
              )}

              <input
                type="text"
                name="fullName"
                placeholder="Full Name *"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Phone Number *"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="email"
                name="emailAddress"
                placeholder="Email Address *"
                value={formData.emailAddress}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <input
                type="text"
                name="lookingFor"
                placeholder="What are you Looking For?"
                value={formData.lookingFor}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <textarea
                name="message"
                placeholder="How we can help you today"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
              />

              <button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 rounded-lg transition duration-200 mt-2 ${
                  isSubmitting || isSubmitted
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isSubmitting
                  ? "Submitting..."
                  : isSubmitted
                    ? "Submitted!"
                    : "Submit Message"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Contact Info - Made interactive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-8 border-t border-gray-800">
          {/* Phone */}
          <a
            href="tel:9168888281"
            className="flex items-center gap-4 group cursor-pointer hover:bg-gray-800/50 p-4 rounded-lg transition-all duration-200"
          >
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-700 transition-colors">
              <svg
                className="w-5 h-5 text-white"
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
            </div>
            <div>
              <p className="text-gray-400 text-sm">Have Any Questions?</p>
              <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                (916) 888-8281
              </p>
            </div>
          </a>

          {/* Email */}
          <a
            href="mailto:contact@pyxelconstruction.com"
            className="flex items-center gap-4 group cursor-pointer hover:bg-gray-800/50 p-4 rounded-lg transition-all duration-200"
          >
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-700 transition-colors">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Call Support Center 24/7</p>
              <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                contact@pyxelconstruction.com
              </p>
            </div>
          </a>

          {/* Location */}
          <div className="flex items-center gap-4 group p-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-gray-400 text-sm">Office Location</p>
              <p className="text-white font-medium">Sacramento, CA</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FromSec;
