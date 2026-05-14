import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const API = import.meta.env.VITE_API_URL;

type StatusKey = "planning" | "in_progress" | "review" | "completed";

interface StatusConfig {
  label: string;
  color: string;
  bg: string;
  border: string;
  icon: string;
  step: number;
}

const statusConfig: Record<StatusKey, StatusConfig> = {
  planning: {
    label: "Planning",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    step: 1,
  },
  in_progress: {
    label: "In Progress",
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    step: 2,
  },
  review: {
    label: "Under Review",
    color: "text-purple-600",
    bg: "bg-purple-50",
    border: "border-purple-200",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    step: 3,
  },
  completed: {
    label: "Completed",
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    step: 4,
  },
};

interface Update {
  id?: string;
  title: string;
  description: string;
  progress?: number;
  phase?: string;
  createdAt: string;
}

interface Project {
  id: string;
  title: string;
  address: string;
  status: StatusKey;
  progress: number;
  startDate?: string;
  endDate?: string;
  budget?: string;
  updates?: Update[];
}

// ─── Loading Screen ────────────────────────────────────────────────────────────

const LoadingScreen = () => (
  <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
    <div className="relative">
      <div className="w-14 h-14 border-[3px] border-gray-200 rounded-full" />
      <div className="w-14 h-14 border-[3px] border-blue-600 border-t-transparent rounded-full animate-spin absolute inset-0" />
    </div>
    <p className="text-gray-500 text-sm mt-5 font-medium">
      Loading your project...
    </p>
  </div>
);

// ─── Error Screen ───────────────────────────────────────────────────────────────

const ErrorScreen = ({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div className="text-center max-w-sm">
      <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-5">
        <svg
          className="w-8 h-8 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
      <h2 className="text-gray-900 text-xl font-bold mb-2">
        Something went wrong
      </h2>
      <p className="text-gray-500 text-sm mb-6 leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition shadow-sm shadow-blue-600/20"
        >
          Try Again
        </button>
      )}
    </div>
  </div>
);

// ─── Code Entry ─────────────────────────────────────────────────────────────────

const CodeEntry = ({ onFound }: { onFound: (project: Project) => void }) => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLookup = async () => {
    const trimmed = code.trim().toUpperCase();
    if (!trimmed) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${API}/project?code=${encodeURIComponent(trimmed)}`,
      );
      const data = await res.json();
      if (res.ok) onFound(data as Project);
      else setError(data.error || "Project not found");
    } catch {
      setError("Cannot connect to server. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-xl mb-5 shadow-lg shadow-blue-600/25">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Track Your Project
          </h1>
          <p className="text-gray-500 mt-2 text-sm">Client Portal</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-8 shadow-sm ring-1 ring-gray-900/5">
          <h2 className="text-gray-900 font-semibold text-lg mb-1">
            Enter Your Access Code
          </h2>
          <p className="text-gray-500 text-sm mb-6 leading-relaxed">
            Your unique project access code was provided by your Pyxel
            Construction project manager.
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3.5 mb-5 text-red-700 text-sm flex items-start gap-2.5">
              <svg
                className="w-4 h-4 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <div className="mb-5">
            <label className="block text-sm text-gray-700 mb-2 font-medium">
              Project Access Code
            </label>
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="PXL-XXXXXX"
              className="w-full bg-white border border-gray-300 rounded-xl px-4 py-3.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition font-mono text-lg tracking-widest text-center"
              onKeyDown={(e) => e.key === "Enter" && handleLookup()}
              maxLength={10}
              type="text"
              autoComplete="off"
            />
          </div>

          <button
            onClick={handleLookup}
            disabled={loading || !code.trim()}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition duration-200 flex items-center justify-center gap-2 shadow-sm shadow-blue-600/25"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Looking up...
              </>
            ) : (
              <>
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                View My Project
              </>
            )}
          </button>

          <div className="mt-5 p-3 bg-gray-50 rounded-xl border border-gray-100">
            <p className="text-xs text-gray-500 text-center">
              Demo code:{" "}
              <button
                onClick={() => setCode("PXL-DEMO01")}
                className="text-blue-600 hover:text-blue-700 font-mono font-semibold transition"
              >
                PXL-DEMO01
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-gray-400 text-xs mt-5">
          Don't have a code? Contact us at{" "}
          <a
            href="mailto:contact@pyxelconstruction.com"
            className="text-blue-600 hover:text-blue-700 transition font-medium"
          >
            contact@pyxelconstruction.com
          </a>
        </p>
      </div>
    </div>
  );
};

// ─── Project View ───────────────────────────────────────────────────────────────

const ProjectView = ({
  project,
  onBack,
}: {
  project: Project;
  onBack: () => void;
}) => {
  const status = statusConfig[project.status] || statusConfig.planning;
  const currentStep = status.step;

  const details = [
    {
      label: "Start Date",
      value: project.startDate || "—",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    },
    {
      label: "Est. Completion",
      value: project.endDate || "—",
      icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      label: "Budget",
      value: project.budget || "—",
      icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
      label: "Updates",
      value: project.updates?.length || 0,
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-full h-auto rounded-lg flex items-center justify-center ">
              {/* <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg> */}
              <span className="text-gray-900 font-semibold text-sm block leading-tight">
                Client Portal
              </span>
            </div>
            <div></div>
          </div>
          <button
            onClick={onBack}
            className="text-gray-500 hover:text-gray-900 text-sm transition flex items-center gap-1.5 font-medium bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg"
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Exit
          </button>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {/* Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-blue-200 text-xs font-semibold uppercase tracking-wider">
                    Your Project
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {project.title}
                </h1>
                <div className="flex items-center gap-1.5 text-blue-200 text-sm">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {project.address}
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold bg-white/15 border border-white/20 text-white backdrop-blur-sm self-start">
                <span
                  className={`w-2 h-2 rounded-full ${status.bg.replace("50", "400")}`}
                  style={{ backgroundColor: "white", opacity: 0.8 }}
                />
                {status.label}
              </span>
            </div>

            {/* Progress */}
            <div className="mt-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-blue-200 text-sm font-medium">
                  Overall Completion
                </span>
                <span className="text-white font-bold text-xl">
                  {project.progress}%
                </span>
              </div>
              <div className="w-full bg-white/15 rounded-full h-2.5">
                <div
                  className="bg-white h-full rounded-full transition-all duration-1000 relative overflow-hidden"
                  style={{ width: `${project.progress}%` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Cards Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {details.map((d, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-4 ring-1 ring-gray-900/5"
            >
              <div className="w-9 h-9 bg-blue-50 rounded-lg flex items-center justify-center mb-3">
                <svg
                  className="w-4.5 h-4.5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={d.icon}
                  />
                </svg>
              </div>
              <p className="text-gray-900 font-bold text-sm">{d.value}</p>
              <p className="text-gray-400 text-xs mt-0.5">{d.label}</p>
            </div>
          ))}
        </div>

        {/* Project Stages - Horizontal Stepper */}
        <div className="bg-white rounded-2xl p-6 ring-1 ring-gray-900/5">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h2 className="text-gray-900 font-bold">Project Stages</h2>
          </div>

          {/* Stepper */}
          <div className="flex items-start">
            {statusConfig &&
              Object.entries(statusConfig).map(([key, cfg], i) => {
                const stepNum = i + 1;
                const isComplete = currentStep > stepNum;
                const isCurrent = currentStep === stepNum;
                const isFuture = !isComplete && !isCurrent;

                return (
                  <div key={key} className="flex-1 relative">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          isComplete
                            ? "bg-blue-600 shadow-md shadow-blue-600/25"
                            : isCurrent
                              ? "bg-blue-50 ring-2 ring-blue-600"
                              : "bg-gray-50 ring-1 ring-gray-200"
                        }`}
                      >
                        {isComplete ? (
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2.5}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        ) : (
                          <svg
                            className={`w-5 h-5 ${isCurrent ? "text-blue-600" : "text-gray-400"}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d={cfg.icon}
                            />
                          </svg>
                        )}
                      </div>
                      <span
                        className={`text-xs mt-2.5 font-semibold text-center ${
                          isCurrent
                            ? "text-blue-600"
                            : isComplete
                              ? "text-gray-900"
                              : "text-gray-400"
                        }`}
                      >
                        {cfg.label}
                      </span>
                    </div>
                    {/* Connector line */}
                    {i < 3 && (
                      <div
                        className={`absolute top-6 left-[calc(50%+24px)] right-[calc(-50%+24px)] h-0.5 rounded-full ${
                          isComplete ? "bg-blue-600" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
          </div>
        </div>

        {/* Updates Timeline */}
        <div className="bg-white rounded-2xl p-6 ring-1 ring-gray-900/5">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h2 className="text-gray-900 font-bold">Progress Log</h2>
            <span className="text-gray-400 text-sm font-normal ml-1">
              ({project.updates?.length || 0} updates)
            </span>
          </div>

          {!project.updates || project.updates.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-7 h-7 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-sm font-medium">
                No updates yet
              </p>
              <p className="text-gray-400 text-xs mt-1">
                Check back soon for progress updates!
              </p>
            </div>
          ) : (
            <div className="space-y-0">
              {[...project.updates].reverse().map((u, i) => (
                <div key={u.id || i} className="flex gap-4 relative">
                  {/* Timeline line */}
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-600/25 text-white text-xs font-bold">
                      {(project.updates?.length || 0) - i}
                    </div>
                    {i < (project.updates?.length || 0) - 1 && (
                      <div className="w-0.5 flex-1 bg-gray-100 my-2" />
                    )}
                  </div>
                  {/* Content card */}
                  <div
                    className={`bg-gray-50 rounded-xl p-4 flex-1 mb-3 ring-1 ring-gray-900/5 hover:ring-blue-200 transition`}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h3 className="text-gray-900 font-semibold text-sm">
                          {u.title}
                        </h3>
                        {u.phase && (
                          <span className="inline-flex items-center gap-1 text-xs text-blue-600 bg-blue-50 ring-1 ring-blue-100 px-2 py-0.5 rounded-full mt-1.5 font-medium">
                            {u.phase}
                          </span>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-gray-400 text-xs font-medium">
                          {new Date(u.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                        {u.progress && u.progress > 0 && (
                          <div className="flex items-center gap-1 mt-1 justify-end">
                            <div className="w-12 bg-gray-200 rounded-full h-1">
                              <div
                                className="bg-blue-600 h-full rounded-full"
                                style={{ width: `${u.progress}%` }}
                              />
                            </div>
                            <span className="text-blue-600 text-xs font-bold">
                              {u.progress}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {u.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center py-6 border-t border-gray-100">
          <div className="flex items-center justify-center gap-4 text-sm">
            <a
              href="tel:9168888281"
              className="text-gray-500 hover:text-blue-600 transition font-medium flex items-center gap-1.5"
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
            <span className="text-gray-300">&middot;</span>
            <a
              href="mailto:contact@pyxelconstruction.com"
              className="text-gray-500 hover:text-blue-600 transition font-medium flex items-center gap-1.5"
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email Us
            </a>
          </div>
          <p className="text-gray-300 text-xs mt-2">
            &copy; 2025 Pyxel Construction Inc.
          </p>
        </div>
      </div>
    </div>
  );
};

// ─── Main Component ────────────────────────────────────────────────────────────

export default function ProjectTracker() {
  const [searchParams] = useSearchParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = searchParams.get("t");
    if (token) {
      fetch(`${API}/project?t=${token}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.id) setProject(data);
          else setError(data.error || "Project not found");
        })
        .catch(() =>
          setError(
            "Cannot connect to server. Make sure it's running on port 8080",
          ),
        )
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  if (loading) return <LoadingScreen />;
  if (error)
    return (
      <ErrorScreen message={error} onRetry={() => window.location.reload()} />
    );
  if (project)
    return (
      <ProjectView
        project={project}
        onBack={() => {
          setProject(null);
          window.history.replaceState({}, "", "/track");
        }}
      />
    );
  return <CodeEntry onFound={setProject} />;
}
