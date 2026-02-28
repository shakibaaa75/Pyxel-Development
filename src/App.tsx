// App.tsx
import React, { useEffect, useMemo } from "react";
import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import Navebar from "./components/Page1/Navebar";
import Footer from "./components/Footer";
import {
  Breadcrumb,
  type BreadcrumbItem,
} from "./reusableComponents/Breadcrumb";

// Import page components
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Shop from "./pages/Shop";
import Contact from "./pages/Contact";
import BlogPostPage from "./components/blog/BlogPostPage";
import ProjectsArchive from "./components/Projects/ProjectsArchive";
import ProjectSinglePage from "./components/Projects/ProjectSinglePage";

// Create a wrapper component that handles scrolling
function ScrollToTopWrapper({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
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
      "Absolutely. we are fully licensed and insured to protect you and your investment.",
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

// Route configuration with breadcrumb definitions
interface RouteConfig {
  path: string;
  label: string;
  parent?: string;
  dynamicLabel?: (params: Record<string, string | undefined>) => string;
  showBreadcrumb?: boolean;
}

const routeConfigs: RouteConfig[] = [
  { path: "/", label: "Home", showBreadcrumb: false },
  { path: "/about", label: "About Us", parent: "/", showBreadcrumb: false },
  { path: "/services", label: "Services", parent: "/", showBreadcrumb: false },
  { path: "/shop", label: "Shop", parent: "/", showBreadcrumb: false },
  { path: "/contact", label: "Contact", parent: "/", showBreadcrumb: false },
  { path: "/projects", label: "Projects", parent: "/", showBreadcrumb: false },
  {
    path: "/projects/:id",
    label: "Project Details",
    parent: "/projects",
    showBreadcrumb: true,
    dynamicLabel: (params) => params.id || "Project Details",
  },
  { path: "/blog", label: "Blog", parent: "/", showBreadcrumb: false },
  {
    path: "/blog/:slug",
    label: "Article",
    parent: "/blog",
    showBreadcrumb: true,
    dynamicLabel: (params) =>
      params.slug
        ?.replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()) || "Article",
  },
];

// Breadcrumb generator hook - only for single pages
const useBreadcrumbs = () => {
  const location = useLocation();

  const breadcrumbs = useMemo(() => {
    const pathname = location.pathname;

    // Find matching route config
    const matchedConfig = routeConfigs.find((config) =>
      matchPath(config.path, pathname),
    );

    // Don't show breadcrumbs if route is configured to hide them
    if (!matchedConfig || matchedConfig.showBreadcrumb === false) {
      return null;
    }

    // Build breadcrumb chain
    const items: BreadcrumbItem[] = [];

    // Always start with Home
    items.push({ label: "Home", path: "/" });

    // Helper to add parent chain
    const addParents = (config: RouteConfig) => {
      if (config.parent && config.parent !== "/") {
        // Don't add Home again
        const parentConfig = routeConfigs.find((c) => c.path === config.parent);
        if (parentConfig) {
          // Add parent's parents first
          addParents(parentConfig);
          // Add parent
          items.push({
            label: parentConfig.label,
            path: parentConfig.path,
          });
        }
      }
    };

    // Add parent chain (this will add Projects or Blog)
    addParents(matchedConfig);

    // Add current page
    const match = matchPath(matchedConfig.path, pathname);
    const params = match?.params || {};

    const label = matchedConfig.dynamicLabel
      ? matchedConfig.dynamicLabel(params)
      : matchedConfig.label;

    items.push({ label });

    return items;
  }, [location.pathname]);

  return breadcrumbs;
};

// App component
const App: React.FC = () => {
  const breadcrumbs = useBreadcrumbs();

  return (
    <div>
      {/* Navigation - Always visible */}
      <Navebar />

      {/* Breadcrumb - Only shown on single pages */}
      {breadcrumbs && <Breadcrumb items={breadcrumbs} />}

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
          <Route path="/projects" element={<ProjectsArchive />} />
          <Route path="/projects/:id" element={<ProjectSinglePage />} />
        </Routes>
      </ScrollToTopWrapper>

      {/* Footer - Always visible */}
      <Footer />
    </div>
  );
};

export default App;
