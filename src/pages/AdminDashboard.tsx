// import { useState, useEffect } from "react";

// const API = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

// // ─── Token Helper ─────────────────────────────────────────────────────────────

// function getToken(): string {
//   return localStorage.getItem("pyxel-admin-token") ?? "";
// }

// function authHeaders(): Record<string, string> {
//   return {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${getToken()}`,
//   };
// }

// // ─── Types ────────────────────────────────────────────────────────────────────

// interface Update {
//   id: string;
//   title: string;
//   description: string;
//   phase: string;
//   progress: number;
//   images: string[];
//   createdAt: string;
// }

// interface Project {
//   id: string;
//   accessCode: string;
//   clientName: string;
//   clientEmail: string;
//   title: string;
//   description: string;
//   status: "planning" | "in_progress" | "review" | "completed";
//   progress: number;
//   startDate: string;
//   endDate: string;
//   address: string;
//   budget: string;
//   updates: Update[];
//   createdAt: string;
//   updatedAt: string;
// }

// interface StatusStyle {
//   bg: string;
//   text: string;
//   dot: string;
//   border: string;
//   icon: string;
//   label: string;
//   // The value sent to the backend
//   backendValue: string;
// }

// // ─── Status Config ────────────────────────────────────────────────────────────
// // Frontend uses: planning | in_progress | review | completed
// // Backend uses:  planning | active      | on-hold | completed
// // We map at the API boundary using backendValue.

// const statusStyles: Record<string, StatusStyle> = {
//   planning: {
//     bg: "bg-amber-50",
//     text: "text-amber-700",
//     dot: "bg-amber-500",
//     border: "border-amber-200",
//     icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
//     label: "Planning",
//     backendValue: "planning",
//   },
//   in_progress: {
//     bg: "bg-blue-50",
//     text: "text-blue-700",
//     dot: "bg-blue-500",
//     border: "border-blue-200",
//     icon: "M13 10V3L4 14h7v7l9-11h-7z",
//     label: "In Progress",
//     backendValue: "active",
//   },
//   review: {
//     bg: "bg-purple-50",
//     text: "text-purple-700",
//     dot: "bg-purple-500",
//     border: "border-purple-200",
//     icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
//     label: "Review",
//     backendValue: "on-hold",
//   },
//   completed: {
//     bg: "bg-green-50",
//     text: "text-green-700",
//     dot: "bg-green-500",
//     border: "border-green-200",
//     icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
//     label: "Completed",
//     backendValue: "completed",
//   },
// };

// // Map a backend status value back to a frontend key
// function backendToFrontend(backendStatus: string): string {
//   const map: Record<string, string> = {
//     planning: "planning",
//     active: "in_progress",
//     "on-hold": "review",
//     completed: "completed",
//   };
//   return map[backendStatus] ?? "planning";
// }

// // Normalize a project coming from the backend so the frontend key is used
// function normalizeProject(p: Project): Project {
//   return { ...p, status: backendToFrontend(p.status) as Project["status"] };
// }

// // ─── Shared Components ────────────────────────────────────────────────────────

// const StatusBadge = ({ status }: { status: string }) => {
//   const s = statusStyles[status] ?? statusStyles.planning;
//   return (
//     <span
//       className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text} ring-1 ${s.border}`}
//     >
//       <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
//       {s.label}
//     </span>
//   );
// };

// const ProgressBar = ({
//   value,
//   size = "md",
// }: {
//   value: number;
//   size?: "sm" | "md";
// }) => (
//   <div
//     className={`w-full bg-gray-100 rounded-full ${size === "sm" ? "h-1.5" : "h-2.5"}`}
//   >
//     <div
//       className="bg-blue-600 h-full rounded-full transition-all duration-500"
//       style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
//     />
//   </div>
// );

// // ─── Login Page ───────────────────────────────────────────────────────────────

// const LoginPage = ({ onLogin }: { onLogin: (token: string) => void }) => {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const res = await fetch(`${API}/admin/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (res.ok) onLogin(data.token as string);
//       else setError((data.error as string) || "Login failed");
//     } catch {
//       setError(
//         "Cannot connect to server. Make sure the Go backend is running on port 8080.",
//       );
//     }
//     setLoading(false);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
//       <div className="w-full max-w-sm">
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-xl mb-5 shadow-lg shadow-blue-600/25">
//             <svg
//               className="w-7 h-7 text-white"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//               />
//             </svg>
//           </div>
//           <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
//             Pyxel Construction
//           </h1>
//           <p className="text-gray-500 text-sm mt-1">Admin Dashboard</p>
//         </div>

//         <div className="bg-white rounded-2xl p-7 shadow-sm ring-1 ring-gray-900/5">
//           <h2 className="text-lg font-semibold text-gray-900 mb-5">Sign In</h2>
//           {error && (
//             <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-red-700 text-sm flex items-start gap-2">
//               <svg
//                 className="w-4 h-4 flex-shrink-0 mt-0.5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//                 />
//               </svg>
//               {error}
//             </div>
//           )}
//           <div className="space-y-4">
//             <div>
//               <label className="block text-sm text-gray-700 mb-1.5 font-medium">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 value={form.username}
//                 onChange={(e) => setForm({ ...form, username: e.target.value })}
//                 placeholder="admin"
//                 className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-sm"
//                 onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//               />
//             </div>
//             <div>
//               <label className="block text-sm text-gray-700 mb-1.5 font-medium">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 value={form.password}
//                 onChange={(e) => setForm({ ...form, password: e.target.value })}
//                 placeholder="••••••••"
//                 className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-sm"
//                 onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
//               />
//             </div>
//           </div>
//           <button
//             onClick={handleSubmit}
//             disabled={loading}
//             className="w-full mt-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition duration-200 shadow-sm shadow-blue-600/25"
//           >
//             {loading ? "Signing in..." : "Sign In"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── Add Update Modal ─────────────────────────────────────────────────────────

// const AddUpdateModal = ({
//   project,
//   onClose,
//   onSave,
// }: {
//   project: Project;
//   onClose: () => void;
//   onSave: (updated: Project) => void;
// }) => {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     phase: "",
//     progress: project.progress,
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleSave = async () => {
//     if (!form.title || !form.description) {
//       setError("Title and description are required.");
//       return;
//     }
//     setLoading(true);
//     setError("");
//     try {
//       const res = await fetch(`${API}/admin/projects/${project.id}/updates`, {
//         method: "POST",
//         headers: authHeaders(),
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         onSave(normalizeProject(data as Project));
//         onClose();
//       } else {
//         setError(data.error || "Failed to save update.");
//       }
//     } catch {
//       setError("Network error. Please try again.");
//     }
//     setLoading(false);
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl ring-1 ring-gray-900/5"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex items-center justify-between mb-5">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
//               <svg
//                 className="w-4 h-4 text-blue-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 4v16m8-8H4"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900">
//               Add Progress Update
//             </h3>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition p-1 hover:bg-gray-100 rounded-lg"
//           >
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>

//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-red-700 text-sm">
//             {error}
//           </div>
//         )}

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm text-gray-700 mb-1.5 font-medium">
//               Update Title *
//             </label>
//             <input
//               value={form.title}
//               onChange={(e) => setForm({ ...form, title: e.target.value })}
//               placeholder="e.g. Foundation Complete"
//               className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-sm"
//               type="text"
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1.5 font-medium">
//               Phase
//             </label>
//             <select
//               value={form.phase}
//               onChange={(e) => setForm({ ...form, phase: e.target.value })}
//               className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-sm appearance-none"
//             >
//               <option value="">Select phase...</option>
//               {[
//                 "Planning",
//                 "Demolition",
//                 "Foundation",
//                 "Framing",
//                 "Rough-In",
//                 "Insulation",
//                 "Drywall",
//                 "Installation",
//                 "Finishing",
//                 "Final Inspection",
//               ].map((p) => (
//                 <option key={p} value={p}>
//                   {p}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1.5 font-medium">
//               Description *
//             </label>
//             <textarea
//               value={form.description}
//               onChange={(e) =>
//                 setForm({ ...form, description: e.target.value })
//               }
//               rows={3}
//               placeholder="Describe the work completed..."
//               className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-sm resize-none"
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1.5 font-medium">
//               Overall Progress:{" "}
//               <span className="text-blue-600 font-semibold">
//                 {form.progress}%
//               </span>
//             </label>
//             <input
//               type="range"
//               min="0"
//               max="100"
//               value={form.progress}
//               onChange={(e) =>
//                 setForm({ ...form, progress: parseInt(e.target.value) })
//               }
//               className="w-full accent-blue-600"
//             />
//           </div>
//         </div>
//         <div className="flex gap-3 mt-6">
//           <button
//             onClick={onClose}
//             className="flex-1 bg-white hover:bg-gray-50 text-gray-700 py-2.5 rounded-xl transition text-sm font-medium ring-1 ring-gray-300"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             disabled={loading}
//             className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-2.5 rounded-xl transition text-sm font-semibold shadow-sm shadow-blue-600/25"
//           >
//             {loading ? "Saving..." : "Post Update"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── Create Project Modal ─────────────────────────────────────────────────────

// interface ProjectForm {
//   clientName: string;
//   clientEmail: string;
//   title: string;
//   description: string;
//   address: string;
//   budget: string;
//   startDate: string;
//   endDate: string;
//   status: string;
//   progress: number;
// }

// const CreateProjectModal = ({
//   onClose,
//   onCreate,
// }: {
//   onClose: () => void;
//   onCreate: (project: Project) => void;
// }) => {
//   const [form, setForm] = useState<ProjectForm>({
//     clientName: "",
//     clientEmail: "",
//     title: "",
//     description: "",
//     address: "",
//     budget: "",
//     startDate: "",
//     endDate: "",
//     status: "planning",
//     progress: 0,
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [createdProject, setCreatedProject] = useState<Project | null>(null);
//   const [magicLink, setMagicLink] = useState("");
//   const [emailSent, setEmailSent] = useState(false);
//   const [copied, setCopied] = useState(false);

//   const handleCreate = async () => {
//     if (!form.clientName.trim() || !form.title.trim()) {
//       setError("Client name and project title are required.");
//       return;
//     }
//     setLoading(true);
//     setError("");
//     try {
//       // Map frontend status to backend status before sending
//       const payload = {
//         ...form,
//         status: statusStyles[form.status]?.backendValue ?? "planning",
//       };
//       const res = await fetch(`${API}/admin/projects`, {
//         method: "POST",
//         headers: authHeaders(),
//         body: JSON.stringify(payload),
//       });
//       const data = await res.json();
//       if (res.ok) {
//         const project = normalizeProject(data.project as Project);
//         setCreatedProject(project);
//         setMagicLink(data.magicLink as string);
//         setEmailSent(data.emailSent as boolean);
//         onCreate(project);
//       } else {
//         setError(data.error || "Failed to create project.");
//       }
//     } catch {
//       setError("Network error. Is the backend running?");
//     }
//     setLoading(false);
//   };

//   const copyLink = () => {
//     navigator.clipboard.writeText(magicLink);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // Success State
//   if (createdProject) {
//     return (
//       <div
//         className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4"
//         onClick={onClose}
//       >
//         <div
//           className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl ring-1 ring-gray-900/5"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="text-center mb-6">
//             <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
//               <svg
//                 className="w-7 h-7 text-green-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2.5}
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-1">
//               Project Created!
//             </h3>
//             <p className="text-gray-500 text-sm">{createdProject.title}</p>
//           </div>
//           <div className="space-y-3">
//             <div className="bg-blue-50 rounded-xl p-4 ring-1 ring-blue-100">
//               <p className="text-blue-700 text-sm font-semibold mb-2">
//                 Magic Link
//               </p>
//               <div className="flex gap-2">
//                 <input
//                   value={magicLink}
//                   readOnly
//                   className="flex-1 bg-white border border-blue-200 rounded-lg px-3 py-2 text-gray-900 text-sm font-mono"
//                 />
//                 <button
//                   onClick={copyLink}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-2 rounded-lg text-sm font-medium transition"
//                 >
//                   {copied ? "Copied!" : "Copy"}
//                 </button>
//               </div>
//               <p className="text-blue-600/70 text-xs mt-2">
//                 Share this with your client for instant access.
//               </p>
//             </div>
//             <div className="bg-gray-50 rounded-xl p-4 ring-1 ring-gray-900/5">
//               <div className="flex items-center gap-2 mb-1">
//                 <p className="text-gray-700 text-sm font-medium">
//                   Welcome Email
//                 </p>
//                 <span
//                   className={`text-xs px-2 py-0.5 rounded-full font-medium ${emailSent ? "text-green-600 bg-green-50 ring-1 ring-green-200" : "text-amber-600 bg-amber-50 ring-1 ring-amber-200"}`}
//                 >
//                   {emailSent ? "Sent" : "Not Sent"}
//                 </span>
//               </div>
//               <p className="text-gray-400 text-xs">
//                 {emailSent
//                   ? `Sent to ${createdProject.clientEmail}`
//                   : createdProject.clientEmail
//                     ? "Failed to send. Check SMTP settings."
//                     : "No email provided."}
//               </p>
//             </div>
//             <div className="bg-gray-50 rounded-xl p-4 ring-1 ring-gray-900/5">
//               <p className="text-gray-700 text-sm font-medium mb-1">
//                 Access Code
//               </p>
//               <p className="text-blue-600 font-mono text-xl font-bold">
//                 {createdProject.accessCode}
//               </p>
//               <p className="text-gray-400 text-xs mt-0.5">
//                 Backup entry method
//               </p>
//             </div>
//           </div>
//           <button
//             onClick={onClose}
//             className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition shadow-sm shadow-blue-600/25"
//           >
//             Done
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // Form State
//   return (
//     <div
//       className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start justify-center z-50 px-4 py-8 overflow-y-auto"
//       onClick={onClose}
//     >
//       <div
//         className="bg-white rounded-2xl p-6 w-full max-w-2xl shadow-2xl ring-1 ring-gray-900/5 my-auto"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
//               <svg
//                 className="w-4 h-4 text-blue-600"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 4v16m8-8H4"
//                 />
//               </svg>
//             </div>
//             <h3 className="text-lg font-semibold text-gray-900">
//               Create New Project
//             </h3>
//           </div>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-gray-600 transition p-1 hover:bg-gray-100 rounded-lg"
//           >
//             <svg
//               className="w-5 h-5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>

//         {error && (
//           <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-red-700 text-sm flex items-start gap-2">
//             <svg
//               className="w-4 h-4 flex-shrink-0 mt-0.5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//             {error}
//           </div>
//         )}

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm text-gray-700 mb-1.5 font-medium">
//               Client Name *
//             </label>
//             <input
//               type="text"
//               value={form.clientName}
//               onChange={(e) => setForm({ ...form, clientName: e.target.value })}
//               placeholder="John Smith"
//               className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1.5 font-medium">
//               Client Email
//             </label>
//             <input
//               type="email"
//               value={form.clientEmail}
//               onChange={(e) =>
//                 setForm({ ...form, clientEmail: e.target.value })
//               }
//               placeholder="john@example.com"
//               className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1.5 font-medium">
//               Project Title *
//             </label>
//             <input
//               type="text"
//               value={form.title}
//               onChange={(e) => setForm({ ...form, title: e.target.value })}
//               placeholder="Kitchen Remodel"
//               className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1.5 font-medium">
//               Status
//             </label>
//             <select
//               value={form.status}
//               onChange={(e) => setForm({ ...form, status: e.target.value })}
//               className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-sm appearance-none"
//             >
//               <option value="planning">Planning</option>
//               <option value="in_progress">In Progress</option>
//               <option value="review">Review</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>
//           <div className="sm:col-span-2">
//             <label className="block text-sm text-gray-700 mb-1.5 font-medium">
//               Description
//             </label>
//             <textarea
//               value={form.description}
//               onChange={(e) =>
//                 setForm({ ...form, description: e.target.value })
//               }
//               rows={3}
//               placeholder="Brief project description..."
//               className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-sm resize-none"
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1.5 font-medium">
//               Address
//             </label>
//             <input
//               type="text"
//               value={form.address}
//               onChange={(e) => setForm({ ...form, address: e.target.value })}
//               placeholder="1234 Oak St, Sacramento, CA"
//               className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1.5 font-medium">
//               Budget
//             </label>
//             <input
//               type="text"
//               value={form.budget}
//               onChange={(e) => setForm({ ...form, budget: e.target.value })}
//               placeholder="$45,000"
//               className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1.5 font-medium">
//               Start Date
//             </label>
//             <input
//               type="date"
//               value={form.startDate}
//               onChange={(e) => setForm({ ...form, startDate: e.target.value })}
//               className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-sm"
//             />
//           </div>
//           <div>
//             <label className="block text-sm text-gray-700 mb-1.5 font-medium">
//               End Date
//             </label>
//             <input
//               type="date"
//               value={form.endDate}
//               onChange={(e) => setForm({ ...form, endDate: e.target.value })}
//               className="w-full bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-sm"
//             />
//           </div>
//         </div>

//         <div className="bg-blue-50 rounded-xl p-3.5 mt-5 ring-1 ring-blue-100">
//           <p className="text-blue-700 text-xs flex items-start gap-2 font-medium">
//             <svg
//               className="w-4 h-4 flex-shrink-0 mt-0.5"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//               />
//             </svg>
//             A unique access code and magic link will be auto-generated. If you
//             provide a client email, a welcome email will be sent automatically.
//           </p>
//         </div>

//         <div className="flex gap-3 mt-5">
//           <button
//             onClick={onClose}
//             className="flex-1 bg-white hover:bg-gray-50 text-gray-700 py-2.5 rounded-xl transition text-sm font-medium ring-1 ring-gray-300"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleCreate}
//             disabled={loading}
//             className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white py-2.5 rounded-xl transition text-sm font-semibold shadow-sm shadow-blue-600/25"
//           >
//             {loading ? "Creating..." : "Create Project"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ─── Project Detail Panel ─────────────────────────────────────────────────────

// const ProjectDetail = ({
//   project,
//   onBack,
//   onProjectUpdate,
// }: {
//   project: Project;
//   onBack: () => void;
//   onProjectUpdate: (updated: Project) => void;
// }) => {
//   const [showUpdateModal, setShowUpdateModal] = useState(false);
//   const [copied, setCopied] = useState(false);

//   const copyCode = () => {
//     navigator.clipboard.writeText(project.accessCode);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleStatusChange = async (frontendKey: string) => {
//     const backendValue = statusStyles[frontendKey]?.backendValue ?? frontendKey;
//     try {
//       const res = await fetch(`${API}/admin/projects/${project.id}`, {
//         method: "PUT",
//         headers: authHeaders(),
//         body: JSON.stringify({ status: backendValue }),
//       });
//       const data = await res.json();
//       if (res.ok) onProjectUpdate(normalizeProject(data as Project));
//     } catch {
//       /* silent */
//     }
//   };

//   const s = statusStyles[project.status] ?? statusStyles.planning;

//   return (
//     <div>
//       {showUpdateModal && (
//         <AddUpdateModal
//           project={project}
//           onClose={() => setShowUpdateModal(false)}
//           onSave={(updated) => onProjectUpdate(updated)}
//         />
//       )}

//       <div className="flex items-center gap-2 mb-6">
//         <button
//           onClick={onBack}
//           className="flex items-center gap-1.5 text-gray-500 hover:text-blue-600 transition text-sm font-medium group"
//         >
//           <svg
//             className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M15 19l-7-7 7-7"
//             />
//           </svg>
//           Projects
//         </button>
//         <svg
//           className="w-4 h-4 text-gray-300"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M9 5l7 7-7 7"
//           />
//         </svg>
//         <span className="text-gray-900 text-sm font-semibold">
//           {project.title}
//         </span>
//       </div>

//       <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 mb-5">
//         <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
//         <div className="relative p-6">
//           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
//             <div className="flex-1">
//               <div className="flex items-center gap-3 mb-2">
//                 <h2 className="text-xl sm:text-2xl font-bold text-white">
//                   {project.title}
//                 </h2>
//                 <span
//                   className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/15 border border-white/20 text-white`}
//                 >
//                   <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
//                   {s.label}
//                 </span>
//               </div>
//               <p className="text-blue-200 text-sm">
//                 {project.clientName} &middot; {project.address}
//               </p>
//               {project.description && (
//                 <p className="text-blue-200/70 text-sm mt-1">
//                   {project.description}
//                 </p>
//               )}
//               {project.clientEmail && (
//                 <p className="text-blue-200/70 text-sm mt-1 flex items-center gap-1.5">
//                   <svg
//                     className="w-3.5 h-3.5"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                     />
//                   </svg>
//                   {project.clientEmail}
//                 </p>
//               )}
//             </div>
//             <div className="flex items-center gap-3 flex-wrap">
//               <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2.5">
//                 <p className="text-blue-200 text-xs mb-0.5 font-medium">
//                   Access Code
//                 </p>
//                 <div className="flex items-center gap-2">
//                   <span className="font-mono font-bold text-white text-lg">
//                     {project.accessCode}
//                   </span>
//                   <button
//                     onClick={copyCode}
//                     className="text-blue-200 hover:text-white transition"
//                   >
//                     {copied ? (
//                       <svg
//                         className="w-4 h-4 text-green-300"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M5 13l4 4L19 7"
//                         />
//                       </svg>
//                     ) : (
//                       <svg
//                         className="w-4 h-4"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
//                         />
//                       </svg>
//                     )}
//                   </button>
//                 </div>
//               </div>
//               <button
//                 onClick={() => setShowUpdateModal(true)}
//                 className="bg-white text-blue-700 font-semibold px-4 py-2.5 rounded-xl transition text-sm flex items-center gap-2 shadow-sm hover:bg-blue-50"
//               >
//                 <svg
//                   className="w-4 h-4"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M12 4v16m8-8H4"
//                   />
//                 </svg>
//                 Add Update
//               </button>
//             </div>
//           </div>
//           <div className="mt-5">
//             <div className="flex justify-between items-center mb-2">
//               <span className="text-blue-200 text-sm font-medium">
//                 Progress
//               </span>
//               <span className="text-white font-bold text-lg">
//                 {project.progress}%
//               </span>
//             </div>
//             <div className="w-full bg-white/15 rounded-full h-2.5">
//               <div
//                 className="bg-white h-full rounded-full transition-all duration-500"
//                 style={{ width: `${project.progress}%` }}
//               />
//             </div>
//           </div>
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-white/10">
//             {[
//               { label: "Budget", value: project.budget || "—" },
//               { label: "Start", value: project.startDate || "—" },
//               { label: "End", value: project.endDate || "—" },
//               { label: "Updates", value: project.updates?.length ?? 0 },
//             ].map((m, i) => (
//               <div key={i}>
//                 <p className="text-blue-200/60 text-xs font-medium">
//                   {m.label}
//                 </p>
//                 <p className="text-white text-sm font-semibold mt-0.5">
//                   {m.value}
//                 </p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl p-5 ring-1 ring-gray-900/5 mb-5">
//         <p className="text-gray-700 text-sm font-semibold mb-3">
//           Change Status
//         </p>
//         <div className="flex flex-wrap gap-2">
//           {Object.entries(statusStyles).map(([key, val]) => (
//             <button
//               key={key}
//               onClick={() => handleStatusChange(key)}
//               className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold transition ${
//                 project.status === key
//                   ? `${val.bg} ${val.text} ring-1 ${val.border} shadow-sm`
//                   : "bg-gray-50 text-gray-400 ring-1 ring-gray-200 hover:ring-gray-300 hover:text-gray-600"
//               }`}
//             >
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d={val.icon}
//                 />
//               </svg>
//               {val.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       <div className="bg-white rounded-2xl p-6 ring-1 ring-gray-900/5">
//         <div className="flex items-center gap-2 mb-6">
//           <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
//             <svg
//               className="w-4 h-4 text-blue-600"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//               />
//             </svg>
//           </div>
//           <div className="text-gray-900 font-bold">Progress Updates</div>
//           <span className="text-gray-400 text-sm font-normal ml-1">
//             ({project.updates?.length ?? 0})
//           </span>
//         </div>

//         {!project.updates || project.updates.length === 0 ? (
//           <div className="text-center py-12">
//             <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
//               <svg
//                 className="w-7 h-7 text-gray-300"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
//                 />
//               </svg>
//             </div>
//             <p className="text-gray-500 text-sm font-medium">No updates yet</p>
//             <p className="text-gray-400 text-xs mt-1">
//               Click "Add Update" to post the first one
//             </p>
//           </div>
//         ) : (
//           <div className="space-y-0">
//             {[...project.updates].reverse().map((u, i) => (
//               <div key={u.id || i} className="flex gap-4">
//                 <div className="flex flex-col items-center">
//                   <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 shadow-sm shadow-blue-600/25 text-white text-xs font-bold">
//                     {project.updates.length - i}
//                   </div>
//                   {i < project.updates.length - 1 && (
//                     <div className="w-0.5 flex-1 bg-gray-100 my-2" />
//                   )}
//                 </div>
//                 <div className="bg-gray-50 rounded-xl p-4 flex-1 mb-3 ring-1 ring-gray-900/5 hover:ring-blue-200 transition">
//                   <div className="flex items-start justify-between gap-3 mb-2">
//                     <div>
//                       <h4 className="text-gray-900 font-semibold text-sm">
//                         {u.title}
//                       </h4>
//                       {u.phase && (
//                         <span className="inline-flex items-center text-xs text-blue-600 bg-blue-50 ring-1 ring-blue-100 px-2 py-0.5 rounded-full mt-1.5 font-medium">
//                           {u.phase}
//                         </span>
//                       )}
//                     </div>
//                     <div className="text-right flex-shrink-0">
//                       <span className="text-xs text-gray-400 font-medium">
//                         {new Date(u.createdAt).toLocaleDateString()}
//                       </span>
//                       {u.progress > 0 && (
//                         <div className="flex items-center gap-1 mt-1 justify-end">
//                           <div className="w-10 bg-gray-200 rounded-full h-1">
//                             <div
//                               className="bg-blue-600 h-full rounded-full"
//                               style={{ width: `${u.progress}%` }}
//                             />
//                           </div>
//                           <span className="text-blue-600 text-xs font-bold">
//                             {u.progress}%
//                           </span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                   <p className="text-gray-600 text-sm leading-relaxed">
//                     {u.description}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // ─── Dashboard ────────────────────────────────────────────────────────────────

// const Dashboard = ({ onLogout }: { onLogout: () => void }) => {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedProject, setSelectedProject] = useState<Project | null>(null);
//   const [showCreateModal, setShowCreateModal] = useState(false);
//   const [search, setSearch] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");

//   const fetchProjects = async () => {
//     try {
//       const res = await fetch(`${API}/admin/projects`, {
//         headers: authHeaders(),
//       });
//       if (res.status === 401) {
//         onLogout();
//         return;
//       }
//       const data: Project[] = await res.json();
//       setProjects(Array.isArray(data) ? data.map(normalizeProject) : []);
//     } catch {
//       /* silent */
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   const handleDelete = async (id: string, e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (!confirm("Delete this project?")) return;
//     const res = await fetch(`${API}/admin/projects/${id}`, {
//       method: "DELETE",
//       headers: authHeaders(),
//     });
//     if (res.ok) setProjects((prev) => prev.filter((p) => p.id !== id));
//   };

//   const filtered = projects.filter((p) => {
//     const matchSearch =
//       !search ||
//       p.title?.toLowerCase().includes(search.toLowerCase()) ||
//       p.clientName?.toLowerCase().includes(search.toLowerCase());
//     const matchStatus = filterStatus === "all" || p.status === filterStatus;
//     return matchSearch && matchStatus;
//   });

//   const stats = {
//     total: projects.length,
//     active: projects.filter((p) => p.status === "in_progress").length,
//     completed: projects.filter((p) => p.status === "completed").length,
//     planning: projects.filter((p) => p.status === "planning").length,
//   };

//   if (selectedProject) {
//     const current =
//       projects.find((p) => p.id === selectedProject.id) ?? selectedProject;
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <nav className="bg-white border-b border-gray-100 sticky top-0 z-30">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm shadow-blue-600/25">
//                 <svg
//                   className="w-5 h-5 text-white"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//                   />
//                 </svg>
//               </div>
//               <span className="text-gray-900 font-semibold text-sm">
//                 Admin Dashboard
//               </span>
//             </div>
//             <button
//               onClick={onLogout}
//               className="text-gray-500 hover:text-gray-900 text-sm transition flex items-center gap-1.5 font-medium bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg"
//             >
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                 />
//               </svg>
//               Sign Out
//             </button>
//           </div>
//         </nav>
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
//           <ProjectDetail
//             project={current}
//             onBack={() => setSelectedProject(null)}
//             onProjectUpdate={(updated) => {
//               setProjects((prev) =>
//                 prev.map((p) => (p.id === updated.id ? updated : p)),
//               );
//               setSelectedProject(updated);
//             }}
//           />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {showCreateModal && (
//         <CreateProjectModal
//           onClose={() => setShowCreateModal(false)}
//           onCreate={(p) => setProjects((prev) => [...prev, p])}
//         />
//       )}
//       <nav className="bg-white border-b border-gray-100 sticky top-0 z-30">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
//           <div className="flex items-center gap-3">
//             <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm shadow-blue-600/25">
//               <svg
//                 className="w-5 h-5 text-white"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
//                 />
//               </svg>
//             </div>
//             <div>
//               <span className="text-gray-900 font-semibold text-sm block leading-tight">
//                 Admin Dashboard
//               </span>
//               <span className="text-gray-400 text-xs">Pyxel Construction</span>
//             </div>
//           </div>
//           <button
//             onClick={onLogout}
//             className="text-gray-500 hover:text-gray-900 text-sm transition flex items-center gap-1.5 font-medium bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-lg"
//           >
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//               />
//             </svg>
//             Sign Out
//           </button>
//         </div>
//       </nav>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
//           {(
//             [
//               {
//                 label: "Total Projects",
//                 value: stats.total,
//                 color: "text-blue-600",
//                 bg: "bg-blue-50",
//                 ring: "ring-blue-100",
//                 icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
//               },
//               {
//                 label: "In Progress",
//                 value: stats.active,
//                 color: "text-sky-600",
//                 bg: "bg-sky-50",
//                 ring: "ring-sky-100",
//                 icon: "M13 10V3L4 14h7v7l9-11h-7z",
//               },
//               {
//                 label: "Completed",
//                 value: stats.completed,
//                 color: "text-green-600",
//                 bg: "bg-green-50",
//                 ring: "ring-green-100",
//                 icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
//               },
//               {
//                 label: "Planning",
//                 value: stats.planning,
//                 color: "text-amber-600",
//                 bg: "bg-amber-50",
//                 ring: "ring-amber-100",
//                 icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
//               },
//             ] as const
//           ).map((s, i) => (
//             <div
//               key={i}
//               className="bg-white rounded-2xl p-5 ring-1 ring-gray-900/5 hover:shadow-md transition-shadow"
//             >
//               <div className="flex items-center justify-between mb-4">
//                 <span className="text-gray-500 text-sm font-medium">
//                   {s.label}
//                 </span>
//                 <div
//                   className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center ring-1 ${s.ring}`}
//                 >
//                   <svg
//                     className={`w-5 h-5 ${s.color}`}
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d={s.icon}
//                     />
//                   </svg>
//                 </div>
//               </div>
//               <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
//             </div>
//           ))}
//         </div>

//         <div className="flex flex-col sm:flex-row gap-3 mb-5">
//           <div className="relative flex-1">
//             <svg
//               className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//               />
//             </svg>
//             <input
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               placeholder="Search projects or clients..."
//               className="w-full bg-white border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-sm"
//             />
//           </div>
//           <div className="flex gap-3">
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="bg-white border border-gray-300 rounded-xl px-4 py-2.5 text-gray-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition text-sm font-medium appearance-none min-w-[140px]"
//             >
//               <option value="all">All Status</option>
//               <option value="planning">Planning</option>
//               <option value="in_progress">In Progress</option>
//               <option value="review">Review</option>
//               <option value="completed">Completed</option>
//             </select>
//             <button
//               onClick={() => setShowCreateModal(true)}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition text-sm flex items-center gap-2 shadow-sm shadow-blue-600/25 whitespace-nowrap"
//             >
//               <svg
//                 className="w-4 h-4"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 4v16m8-8H4"
//                 />
//               </svg>
//               New Project
//             </button>
//           </div>
//         </div>

//         {loading ? (
//           <div className="text-center py-16">
//             <div className="relative inline-block mb-4">
//               <div className="w-10 h-10 border-[3px] border-gray-200 rounded-full" />
//               <div className="w-10 h-10 border-[3px] border-blue-600 border-t-transparent rounded-full animate-spin absolute inset-0" />
//             </div>
//             <p className="text-gray-400 text-sm font-medium">
//               Loading projects...
//             </p>
//           </div>
//         ) : filtered.length === 0 ? (
//           <div className="text-center py-16 bg-white rounded-2xl ring-1 ring-gray-900/5">
//             <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
//               <svg
//                 className="w-7 h-7 text-gray-300"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
//                 />
//               </svg>
//             </div>
//             <p className="text-gray-500 text-sm font-medium">
//               No projects found
//             </p>
//             <button
//               onClick={() => setShowCreateModal(true)}
//               className="mt-3 text-blue-600 hover:text-blue-700 text-sm transition font-semibold"
//             >
//               Create your first project &rarr;
//             </button>
//           </div>
//         ) : (
//           <div className="space-y-3">
//             {filtered.map((p) => {
//               const ps = statusStyles[p.status] ?? statusStyles.planning;
//               return (
//                 <div
//                   key={p.id}
//                   onClick={() => setSelectedProject(p)}
//                   className="bg-white rounded-2xl p-5 ring-1 ring-gray-900/5 hover:ring-blue-200 hover:shadow-md transition-all cursor-pointer group"
//                 >
//                   <div className="flex flex-wrap items-center gap-4">
//                     <div className="flex-1 min-w-0">
//                       <div className="flex items-center gap-3 mb-1.5">
//                         <div
//                           className={`w-9 h-9 ${ps.bg} rounded-lg flex items-center justify-center ring-1 ${ps.border} flex-shrink-0`}
//                         >
//                           <svg
//                             className={`w-4 h-4 ${ps.text}`}
//                             fill="none"
//                             stroke="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d={ps.icon}
//                             />
//                           </svg>
//                         </div>
//                         <h3 className="text-gray-900 font-semibold text-sm group-hover:text-blue-600 transition truncate">
//                           {p.title}
//                         </h3>
//                         <StatusBadge status={p.status} />
//                       </div>
//                       <p className="text-gray-500 text-xs truncate ml-12">
//                         {p.clientName} &middot; {p.address || "No address"}
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-5 flex-shrink-0">
//                       <div className="w-28 hidden sm:block">
//                         <div className="flex justify-between text-xs text-gray-400 mb-1 font-medium">
//                           <span>Progress</span>
//                           <span className="text-gray-700 font-semibold">
//                             {p.progress}%
//                           </span>
//                         </div>
//                         <ProgressBar value={p.progress} size="sm" />
//                       </div>
//                       <div className="text-center hidden md:block">
//                         <p className="text-gray-900 font-mono text-xs font-semibold bg-gray-50 px-2.5 py-1 rounded-lg ring-1 ring-gray-200">
//                           {p.accessCode}
//                         </p>
//                       </div>
//                       <div className="text-center hidden lg:block">
//                         <p className="text-gray-900 text-sm font-semibold">
//                           {p.updates?.length ?? 0}
//                         </p>
//                         <p className="text-xs text-gray-400 font-medium">
//                           Updates
//                         </p>
//                       </div>
//                       <button
//                         onClick={(e) => handleDelete(p.id, e)}
//                         className="text-gray-300 hover:text-red-500 transition p-1.5 hover:bg-red-50 rounded-lg"
//                       >
//                         <svg
//                           className="w-4 h-4"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                           />
//                         </svg>
//                       </button>
//                       <svg
//                         className="w-4 h-4 text-gray-300 group-hover:text-blue-600 transition"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M9 5l7 7-7 7"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // ─── App Root ─────────────────────────────────────────────────────────────────

// export default function AdminApp() {
//   const [token, setToken] = useState<string>(
//     localStorage.getItem("pyxel-admin-token") ?? "",
//   );

//   const handleLogin = (t: string) => {
//     localStorage.setItem("pyxel-admin-token", t);
//     setToken(t);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("pyxel-admin-token");
//     setToken("");
//   };

//   if (!token) return <LoginPage onLogin={handleLogin} />;
//   return <Dashboard onLogout={handleLogout} />;
// }
