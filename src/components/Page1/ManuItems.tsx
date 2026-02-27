import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const ManuItems: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Shop", path: "/shop" },
    { name: "Contact Us", path: "/contact" },
  ];

  // Handle scroll for sticky effect (smooth, no flicker)
  useEffect(() => {
    const handleScroll = () => {
      const topNavHeight = window.innerWidth >= 768 ? 48 : 72;
      const scrollY = window.scrollY;

      const shouldStick = scrollY >= topNavHeight;

      setIsSticky(shouldStick);
      setScrolled(scrollY > topNavHeight + 10);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* 🔑 Spacer to prevent layout jump when nav becomes fixed */}
      {isSticky && <div className="h-16 md:h-20" />}

      {/* Navigation */}
      <nav
        ref={navRef}
        className={`left-0 right-0 z-50 bg-[#1E1E20] transition-all duration-300 ${
          isSticky ? "fixed top-0 shadow-lg" : "relative"
        } ${scrolled && isSticky ? "shadow-lg" : ""}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" aria-label="Go to home">
              <img
                src="/image/image 3.png"
                alt="Pyxel Construction Logo"
                className="h-10 md:h-12 lg:h-14 w-auto object-contain cursor-pointer"
                style={{ maxWidth: "160px" }}
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="relative text-gray-300 hover:text-white transition-colors duration-200 text-sm xl:text-base whitespace-nowrap group py-2"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 ease-out group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop Button */}
          <div className="hidden lg:block flex-shrink-0">
            <Link
              to="/contact"
              className="bg-[#0B4196] text-white px-5 py-2 rounded-md 
    hover:bg-white hover:text-[#0B4196] 
    transition duration-500 ease-in-out transform hover:scale-105 text-sm font-medium inline-block text-center"
            >
              Free Estimate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden text-gray-300 hover:text-white text-2xl relative z-[60] w-10 h-10 flex items-center justify-center transition-opacity duration-200 ${
              isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>

        {/* Mobile Full Screen Menu */}
        <div
          className={`fixed inset-0 bg-[#1E1E20] transform transition-transform duration-300 ease-in-out lg:hidden z-[55] ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full pt-20 px-6 pb-8 overflow-y-auto">
            {/* Close Button */}
            <button
              className="absolute top-20 right-4 text-gray-300 hover:text-white text-2xl w-10 h-10 flex items-center justify-center z-[70]"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>

            {/* Links */}
            <div className="flex flex-col gap-6">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="text-gray-300 hover:text-white transition text-xl font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Contact */}
            <div className="mt-10 flex flex-col gap-4">
              <a
                href="tel:9168888281"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition"
              >
                <span className="text-lg">(916) 888-8281</span>
              </a>
              <a
                href="mailto:contact@pyxelconstruction.com"
                className="flex items-center gap-3 text-gray-300 hover:text-white transition"
              >
                <span className="text-lg">contact@pyxelconstruction.com</span>
              </a>
            </div>

            {/* CTA */}
            <div className="mt-8">
              <button
                className="w-full border border-white/30 text-white py-4 rounded hover:bg-white/10 transition text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                Free Estimate
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default ManuItems;
