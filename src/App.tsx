import React, {
  useEffect,
  useMemo,
  Suspense,
  lazy,
  type CSSProperties,
} from "react";
import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import Navebar from "./components/Page1/Navebar";
import Footer from "./components/Footer";
import {
  Breadcrumb,
  type BreadcrumbItem,
} from "./reusableComponents/Breadcrumb";

// Lazy load page components (only Home is eagerly loaded for fast initial paint)
import Home from "./pages/Home";
import ProjectTracker from "./pages/ProjectTracker";
import AdminDashboard from "./pages/AdminDashboard";

const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const ServiceSinglePage = lazy(
  () => import("./components/Page1/ServiceSinglePage"),
);
const Shop = lazy(() => import("./pages/Shop"));
const Contact = lazy(() => import("./pages/Contact"));
const BlogPostPage = lazy(() => import("./components/blog/BlogPostPage"));
const ProjectsArchive = lazy(
  () => import("./components/Projects/ProjectsArchive"),
);
const ProjectSinglePage = lazy(
  () => import("./components/Projects/ProjectSinglePage"),
);
const Faq = lazy(() => import("./pages/Faq"));
const Financing = lazy(() => import("./pages/Financing"));

// LinkedIn-style Skeleton Loader Components
interface SkeletonPulseProps {
  className?: string;
  style?: CSSProperties;
}

const SkeletonPulse: React.FC<SkeletonPulseProps> = ({
  className = "",
  style,
}) => (
  <div
    className={`skeleton-pulse ${className}`}
    style={{
      background:
        "linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s infinite",
      borderRadius: "4px",
      ...style,
    }}
  />
);

const SkeletonText: React.FC<{ lines?: number; width?: string }> = ({
  lines = 3,
  width = "100%",
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "12px", width }}>
    {Array.from({ length: lines }).map((_, i) => (
      <SkeletonPulse
        key={i}
        className="skeleton-text"
        style={{ height: "16px", width: i === lines - 1 ? "80%" : "100%" }}
      />
    ))}
  </div>
);

const SkeletonCard: React.FC = () => (
  <div
    style={{
      background: "#fff",
      borderRadius: "8px",
      padding: "20px",
      marginBottom: "16px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      border: "1px solid #e0e0e0",
    }}
  >
    <div
      style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
    >
      <SkeletonPulse
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          marginRight: "12px",
        }}
      />
      <div style={{ flex: 1 }}>
        <SkeletonPulse
          style={{ width: "60%", height: "16px", marginBottom: "8px" }}
        />
        <SkeletonPulse style={{ width: "40%", height: "12px" }} />
      </div>
    </div>
    <SkeletonText lines={4} />
  </div>
);

const SkeletonHero: React.FC = () => (
  <div
    style={{
      width: "100%",
      height: "400px",
      background: "#f5f5f5",
      position: "relative",
      overflow: "hidden",
      marginBottom: "40px",
    }}
  >
    <SkeletonPulse
      style={{ width: "100%", height: "100%", borderRadius: "0" }}
    />
    <div
      style={{
        position: "absolute",
        bottom: "40px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "60%",
        textAlign: "center",
      }}
    >
      <SkeletonPulse
        style={{ height: "32px", marginBottom: "16px", borderRadius: "4px" }}
      />
      <SkeletonPulse
        style={{
          height: "16px",
          width: "80%",
          margin: "0 auto",
          borderRadius: "4px",
        }}
      />
    </div>
  </div>
);

const SkeletonGrid: React.FC<{ items?: number }> = ({ items = 6 }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
      gap: "24px",
      padding: "20px",
    }}
  >
    {Array.from({ length: items }).map((_, i) => (
      <div
        key={i}
        style={{
          background: "#fff",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          border: "1px solid #e0e0e0",
        }}
      >
        <SkeletonPulse
          style={{ width: "100%", height: "200px", borderRadius: "0" }}
        />
        <div style={{ padding: "16px" }}>
          <SkeletonPulse
            style={{ height: "20px", marginBottom: "8px", width: "80%" }}
          />
          <SkeletonPulse style={{ height: "14px", width: "60%" }} />
        </div>
      </div>
    ))}
  </div>
);

// LinkedIn-style Page Loader that adapts to route type
const PageLoader: React.FC = () => {
  const location = useLocation();

  // Determine what type of skeleton to show based on current route
  const getSkeletonType = () => {
    const path = location.pathname;
    if (path.includes("/projects")) return "grid";
    if (path.includes("/blog")) return "article";
    if (path.includes("/shop")) return "grid";
    if (path.includes("/services/")) return "article";
    return "generic";
  };

  const skeletonType = getSkeletonType();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f3f2ef",
      }}
    >
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .skeleton-pulse {
          animation: shimmer 1.5s infinite;
        }
      `}</style>

      {/* Top spacing for navbar */}
      <div style={{ height: "80px" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        {skeletonType === "grid" && (
          <>
            <SkeletonPulse
              style={{ height: "40px", width: "300px", marginBottom: "24px" }}
            />
            <SkeletonGrid items={6} />
          </>
        )}

        {skeletonType === "article" && (
          <>
            <SkeletonHero />
            <div
              style={{
                maxWidth: "800px",
                margin: "0 auto",
                background: "#fff",
                padding: "40px",
                borderRadius: "8px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              <SkeletonPulse
                style={{ height: "32px", marginBottom: "24px", width: "90%" }}
              />
              <SkeletonText lines={8} />
              <div style={{ marginTop: "32px" }}>
                <SkeletonText lines={6} />
              </div>
            </div>
          </>
        )}

        {skeletonType === "generic" && (
          <>
            <SkeletonHero />
            <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
              <div style={{ flex: "1 1 300px" }}>
                <SkeletonCard />
                <SkeletonCard />
              </div>
              <div style={{ flex: "1 1 300px" }}>
                <SkeletonCard />
                <SkeletonCard />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

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
  {
    path: "/services/:slug",
    label: "Service Details",
    parent: "/services",
    showBreadcrumb: true,
    dynamicLabel: (params) =>
      params.slug
        ?.replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()) || "Service Details",
  },
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
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home faqs={faqData} />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceSinglePage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog/:slug" element={<BlogPostPage />} />
            <Route path="/projects" element={<ProjectsArchive />} />
            <Route path="/projects/:id" element={<ProjectSinglePage />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/financing" element={<Financing />} />
            // Make sure your route is EXACTLY this:
            <Route path="/track" element={<ProjectTracker />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Suspense>
      </ScrollToTopWrapper>

      {/* Footer - Always visible */}
      <Footer />
    </div>
  );
};

export default App;
