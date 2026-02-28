// reusableComponents/Breadcrumb.tsx
import React, { useMemo } from "react";
import { Link, useLocation, matchPath, type Params } from "react-router-dom";

export interface BreadcrumbItem {
  label: string;
  path?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  separator?: React.ReactNode;
  showHomeIcon?: boolean;
}

// Route configuration type
interface RouteConfig {
  path: string;
  label: string;
  parent?: string;
  dynamicLabel?: (params: Params<string>) => string;
}

// Route configs - duplicated here for AutoBreadcrumb to work independently
const routeConfigs: RouteConfig[] = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About Us", parent: "/" },
  { path: "/services", label: "Services", parent: "/" },
  { path: "/shop", label: "Shop", parent: "/" },
  { path: "/contact", label: "Contact", parent: "/" },
  { path: "/projects", label: "Projects", parent: "/" },
  {
    path: "/projects/:id",
    label: "Project Details",
    parent: "/projects",
    dynamicLabel: (params) => params.id || "Project Details",
  },
  { path: "/blog", label: "Blog", parent: "/" },
  {
    path: "/blog/:slug",
    label: "Article",
    parent: "/blog",
    dynamicLabel: (params) =>
      params.slug
        ?.replace(/-/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()) || "Article",
  },
];

// Manual Breadcrumb Component
export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  className = "",
  separator,
  showHomeIcon = true,
}) => {
  const defaultSeparator = (
    <svg
      className="w-4 h-4 text-gray-400"
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
  );

  if (items.length === 0) return null;

  return (
    <nav
      className={`bg-gray-50 border-b border-gray-100 ${className}`}
      aria-label="Breadcrumb"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <ol className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isFirst = index === 0;

            return (
              <li key={index} className="flex items-center gap-2">
                {index > 0 && (separator || defaultSeparator)}

                {item.path && !isLast ? (
                  <Link
                    to={item.path}
                    className="hover:text-blue-600 transition-colors duration-200 flex items-center gap-1 font-medium"
                  >
                    {isFirst && showHomeIcon && (
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
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                    )}
                    <span className={isFirst ? "hidden sm:inline" : ""}>
                      {item.label}
                    </span>
                  </Link>
                ) : (
                  <span
                    className={`${
                      isLast ? "text-gray-900 font-semibold" : "text-gray-500"
                    } 
                      ${
                        isFirst && showHomeIcon ? "flex items-center gap-1" : ""
                      }
                      truncate max-w-[200px] sm:max-w-xs`}
                    title={item.label}
                  >
                    {isFirst && showHomeIcon && (
                      <svg
                        className="w-4 h-4 inline"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                    )}
                    <span className={isFirst ? "hidden sm:inline" : ""}>
                      {item.label}
                    </span>
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

// Automatic Breadcrumb - Works with routeConfigs
export const AutoBreadcrumb: React.FC<{
  className?: string;
  customCrumbs?: BreadcrumbItem[];
}> = ({ className, customCrumbs }) => {
  const location = useLocation();

  const breadcrumbs = useMemo(() => {
    // If custom crumbs provided, use those
    if (customCrumbs && customCrumbs.length > 0) {
      return customCrumbs;
    }

    const pathname = location.pathname;

    // Find matching route config
    const matchedConfig = routeConfigs.find((config) =>
      matchPath(config.path, pathname),
    );

    if (!matchedConfig) {
      return [{ label: "Home", path: "/" }];
    }

    // Build breadcrumb chain
    const items: BreadcrumbItem[] = [];
    const visited = new Set<string>();

    // Helper to add parent chain
    const addParents = (config: RouteConfig) => {
      if (config.parent && !visited.has(config.parent)) {
        visited.add(config.parent);
        const parentConfig = routeConfigs.find((c) => c.path === config.parent);
        if (parentConfig) {
          addParents(parentConfig);
          items.push({
            label: parentConfig.label,
            path: parentConfig.path,
          });
        }
      }
    };

    // Add home first if not already the current page
    if (pathname !== "/") {
      items.push({ label: "Home", path: "/" });
    }

    // Add parent chain
    addParents(matchedConfig);

    // Get path parameters
    const match = matchPath(matchedConfig.path, pathname);
    const params = match?.params;

    // Determine label (dynamic or static)
    let label = matchedConfig.label;
    if (matchedConfig.dynamicLabel && params) {
      label = matchedConfig.dynamicLabel(params);
    }

    // Add current page (no path = not clickable)
    items.push({ label });

    return items;
  }, [location.pathname, customCrumbs]);

  return <Breadcrumb items={breadcrumbs} className={className} />;
};

// Hook for manual breadcrumb generation
export const useManualBreadcrumb = () => {
  const generateItems = (
    pages: Array<{ label: string; path?: string }>,
  ): BreadcrumbItem[] => {
    return [{ label: "Home", path: "/" }, ...pages];
  };

  return { generateItems };
};

export default Breadcrumb;
