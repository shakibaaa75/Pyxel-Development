import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0a0a0a] text-white font-sans">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-bold mb-3">Let's Stay In Touch</h2>
          <div className="w-12 h-[3px] bg-blue-600 mb-4" />
          <p className="text-gray-400 text-sm">
            we'll send you A Nice letter once per week. No Spam.
          </p>
        </div>

        {/* Subscribe Input — Keep original design */}
        <div className="flex items-center rounded-lg overflow-hidden shadow-sm bg-[#0a0a0a] border border-[#333]">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-5 py-3.5 text-gray-300 text-sm bg-[#0a0a0a] outline-none w-64 placeholder-gray-500"
          />
          <button className="bg-blue-600 hover:bg-blue-700 transition-colors text-white font-semibold text-sm px-7 py-3.5 rounded-lg m-1">
            Subscribe
          </button>
        </div>
      </div>

      <div className="border-t border-[#222] max-w-7xl mx-auto" />

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10">
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <img
            src="/image/image 3.png"
            alt="Pyxel Construction Logo"
            className="w-[166px]  object-contain"
          />

          <p className="text-gray-400 text-sm leading-relaxed">
            At Pyxel Construction, We Bring Your Vision To Life With Precision,
            Passion, And Professionalism. With Years Of Experience Serving ,
          </p>

          <p className="font-semibold text-sm">Follow us :</p>
          <div className="flex gap-3">
            {[
              "Group 58.png",
              "Group 62.png",
              "Group 63.png",
              "Group 64.png",
            ].map((icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-full bg-[#1c1c1c] border border-[#333] flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition"
              >
                <img
                  src={`/svg/${icon}`}
                  alt=""
                  className="w-full h-full object-contain"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2.5">
          <h3 className="text-base font-bold">Quick Links</h3>
          <div className="w-10 h-[2.5px] bg-blue-600 mb-2" />
          <nav className="flex flex-col gap-2.5">
            {["Home", "About Us", "Services", "Blog", "Contact Us"].map(
              (link) => (
                <a
                  key={link}
                  href="#"
                  className="text-gray-300 text-sm hover:text-blue-500 transition"
                >
                  {link}
                </a>
              ),
            )}
          </nav>
        </div>

        {/* Services & Opening Hours */}
        <div className="flex flex-col gap-2.5">
          <h3 className="text-base font-bold">Services</h3>
          <div className="w-10 h-[2.5px] bg-blue-600 mb-2" />
          <nav className="flex flex-col gap-2.5 mb-4">
            {["General Contracting", "Remodeling", "Outdoor Living"].map(
              (s) => (
                <a
                  key={s}
                  href="#"
                  className="text-gray-300 text-sm hover:text-blue-500 transition"
                >
                  {s}
                </a>
              ),
            )}
          </nav>

          <h3 className="text-base font-bold">Opening Hours</h3>
          <div className="w-10 h-[2.5px] bg-blue-600 mb-2" />
          <p className="text-gray-300 text-sm mb-1">
            Monday - Saturday : 8:00am - 8:00pm
          </p>
          <p className="text-gray-300 text-sm">Sunday: Closed</p>
        </div>

        {/* Contact Info */}
        <div className="flex flex-col gap-2.5">
          <h3 className="text-base font-bold">Contact Info</h3>
          <div className="w-10 h-[2.5px] bg-blue-600 mb-2" />
          <div className="flex flex-col gap-2.5">
            <div className="flex items-start gap-2">
              <img src="/icons/location.png" alt="" className="w-5 h-5 mt-1" />
              <span className="text-gray-300 text-sm">Sacramento, CA</span>
            </div>

            <div className="flex items-start gap-2">
              <img src="/icons/phone.png" alt="" className="w-5 h-5 mt-1" />
              <span className="text-gray-300 text-sm">(916) 888-8281</span>
            </div>

            <div className="flex items-start gap-2">
              <img src="/icons/email.png" alt="" className="w-5 h-5 mt-1" />
              <span className="text-gray-300 text-sm">
                contact@pyxelconstruction.com
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-10 py-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-blue-100">
            ©2025 Pyxel Construction Inc. All Rights Reserved.
          </p>
          <div className="flex gap-6 flex-wrap">
            {["Terms of use", "Privacy", "Refunds & Returns"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-blue-100 hover:text-white text-sm transition"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
