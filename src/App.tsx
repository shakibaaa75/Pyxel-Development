// App.tsx
import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navebar from "./components/Page1/Navebar";
import Footer from "./components/Footer";

// Import page components
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import BlogPostPage from "./components/blog/BlogPostPage";

// Create a wrapper component that handles scrolling
function ScrollToTopWrapper({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top whenever the route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Use "instant" for no animation, or "smooth" for smooth scrolling
    });
  }, [pathname]);

  return <>{children}</>;
}

// Data for services
const services = [
  {
    title: "Pre-Construction Planning",
    description:
      "We set your project up for success with detailed planning, accurate budgeting, and clear timelines...",
    icon: "./svg/Item7.svg",
  },
  {
    title: "Project Management",
    description:
      "From scheduling to quality control, we oversee every stage of your build to ensure it's completed...",
    icon: "./svg/Item8.svg",
  },
  {
    title: "Kitchen Remodeling",
    description: "Transform your kitchen into a beautiful, functional space...",
    icon: "./svg/kitchen.svg",
  },
  {
    title: "Bathroom Remodeling",
    description: "Upgrade your bathroom with modern designs...",
    icon: "./svg/bathroom.svg",
  },
  {
    title: "Deck Construction & Repair",
    description: "Build a stunning, durable deck...",
    icon: "./svg/deck.svg",
  },
  {
    title: "Patio Construction & Repair",
    description: "Create the perfect outdoor living space...",
    icon: "./svg/patio.svg",
  },
  {
    title: "Balcony Construction & Repair",
    description: "Create the perfect balcony...",
    icon: "./svg/balcony.svg",
  },
  {
    title: "Fencing & Gates",
    description: "Secure and beautify your property...",
    icon: "./svg/fence.svg",
  },
];

// Data for FAQ
const faqData = [
  {
    question: "How long will my construction project take?",
    answer:
      "Project timelines vary based on size and complexity, but we provide a detailed schedule before starting and keep you updated every step of the way.",
  },
  {
    question: "Do you offer free estimates?",
    answer:
      "Yes, we offer free estimates for all projects. Contact us to schedule a consultation.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Absolutely. We are fully licensed and insured to protect you and your investment.",
  },
  {
    question: "Can you help with design ideas?",
    answer:
      "Yes, our team includes design professionals who can help bring your vision to life.",
  },
  {
    question: "Can you help with design ideas?",
    answer:
      "Yes, our team includes design professionals who can help bring your vision to life.",
  },
];

const App: React.FC = () => {
  return (
    <div>
      {/* Navigation - Always visible */}
      <Navebar />

      {/* ScrollToTopWrapper ensures every new page starts from the top */}
      <ScrollToTopWrapper>
        <Routes>
          <Route
            path="/"
            element={<Home services={services} faqs={faqData} />}
          />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
      </ScrollToTopWrapper>

      {/* Footer - Always visible */}
      <Footer />
    </div>
  );
};

export default App;
