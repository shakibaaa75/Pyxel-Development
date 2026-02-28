// pages/ProjectSinglePage.tsx
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { allProjects, getRelatedProjects } from "../../data/projectData";
import type { Project } from "../../data/projectData";

const ProjectSinglePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [mapError, setMapError] = useState(false);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  useEffect(() => {
    const foundProject = allProjects.find((p) => p.id === id);

    if (foundProject) {
      setProject(foundProject);
      setActiveImage(0);
      setImageErrors(new Set());
      setLoading(false);
    } else {
      navigate("/projects", { replace: true });
    }
  }, [id, navigate]);

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!project) return null;

  const relatedProjects = getRelatedProjects(project.id);
  const GOOGLE_MAPS_API_KEY = "AIzaSyB2U5VT_DtPDwKeKnwVRYxvjQ11Swug1O4";

  // REMOVED: Breadcrumb is now handled by App.tsx
  // Don't include <AutoBreadcrumb /> or <Breadcrumb /> here

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Gallery */}
      <div className="bg-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Main Image */}
          <div className="relative rounded-2xl overflow-hidden mb-6 aspect-[16/9] shadow-lg group">
            {imageErrors.has(activeImage) ? (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <div className="text-center text-gray-400">
                  <svg
                    className="w-16 h-16 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p>Image not available</p>
                </div>
              </div>
            ) : (
              <img
                src={project.gallery[activeImage]}
                alt={`${project.title} - Image ${activeImage + 1}`}
                className="w-full h-full object-cover transition-opacity duration-500"
                onError={() => handleImageError(activeImage)}
              />
            )}

            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full shadow-md">
                {project.category}
              </span>
            </div>

            {/* Image counter */}
            <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-black/50 backdrop-blur-sm text-white text-sm rounded-full">
              {activeImage + 1} / {project.gallery.length}
            </div>

            {/* Navigation arrows */}
            <button
              onClick={() => {
                const newIndex =
                  activeImage === 0
                    ? project.gallery.length - 1
                    : activeImage - 1;
                setActiveImage(newIndex);
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-black/70 transition"
              aria-label="Previous image"
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
              onClick={() => {
                const newIndex = (activeImage + 1) % project.gallery.length;
                setActiveImage(newIndex);
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 hover:bg-black/70 transition"
              aria-label="Next image"
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

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-4 gap-4">
            {project.gallery.map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`relative rounded-xl overflow-hidden aspect-video transition-all duration-300 ${
                  activeImage === index
                    ? "ring-2 ring-blue-600 ring-offset-2 shadow-md"
                    : "opacity-70 hover:opacity-100 hover:shadow-md"
                } ${imageErrors.has(index) ? "bg-gray-100" : ""}`}
              >
                {imageErrors.has(index) ? (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <svg
                      className="w-8 h-8"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                ) : (
                  <img
                    src={img}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(index)}
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              {project.title}
            </h1>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                  Project Cost
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {project.cost}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                  Client
                </p>
                <p className="text-lg font-bold text-gray-900 truncate">
                  {project.client}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                  Year
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {project.year}
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
                  Location
                </p>
                <p className="text-lg font-bold text-gray-900 truncate">
                  {project.location}
                </p>
              </div>
            </div>

            {/* Description */}
            <div
              className="prose prose-lg max-w-none mb-12
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
                prose-strong:text-gray-900"
              dangerouslySetInnerHTML={{ __html: project.fullDescription }}
            />

            {/* Features */}
            <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-100 mb-12">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Project Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial */}
            {project.testimonial && (
              <div className="bg-blue-50 rounded-2xl p-6 sm:p-8 border border-blue-100 mb-12">
                <svg
                  className="w-10 h-10 text-blue-400 mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-lg sm:text-xl leading-relaxed mb-6 italic text-gray-700">
                  "{project.testimonial.text}"
                </p>
                <div>
                  <p className="font-bold text-gray-900">
                    {project.testimonial.author}
                  </p>
                  <p className="text-blue-600 text-sm">
                    {project.testimonial.role}
                  </p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-lg hover:border-blue-600 hover:text-blue-600 transition"
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
                Back to Projects
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Start Similar Project
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Location Card */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Location</h3>
              <div className="aspect-video rounded-xl bg-gray-100 mb-4 overflow-hidden border border-gray-200">
                {!mapError ? (
                  <img
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(project.location)}&zoom=13&size=400x300&maptype=roadmap&markers=color:blue%7C${encodeURIComponent(project.location)}&key=${GOOGLE_MAPS_API_KEY}`}
                    alt={`Map showing location of ${project.location}`}
                    className="w-full h-full object-cover"
                    onError={() => setMapError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <div className="text-center p-4">
                      <svg
                        className="w-12 h-12 text-gray-400 mx-auto mb-2"
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
                      <p className="text-sm text-gray-600 font-medium">
                        {project.location}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Map temporarily unavailable
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-gray-600">{project.location}</span>
              </div>
            </div>

            {/* Share Project */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Share Project
              </h3>
              <div className="flex gap-3">
                {["facebook", "twitter", "linkedin", "email"].map((social) => (
                  <button
                    key={social}
                    className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition"
                    onClick={() => {
                      const url = window.location.href;
                      const text = `Check out ${project.title} project`;

                      let shareUrl = "";
                      switch (social) {
                        case "facebook":
                          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                          break;
                        case "twitter":
                          shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
                          break;
                        case "linkedin":
                          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
                          break;
                        case "email":
                          shareUrl = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`;
                          break;
                      }

                      window.open(shareUrl, "_blank");
                    }}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {social === "facebook" && (
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.797c0-2.506 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      )}
                      {social === "twitter" && (
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      )}
                      {social === "linkedin" && (
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      )}
                      {social === "email" && (
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                      )}
                    </svg>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="bg-gray-50 py-16 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
              Similar <span className="text-blue-600">Projects</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((related) => (
                <Link
                  key={related.id}
                  to={`/projects/${related.id}`}
                  className="group block bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                        {related.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                      {related.title}
                    </h3>
                    <p className="text-sm text-gray-500">{related.location}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProjectSinglePage;
