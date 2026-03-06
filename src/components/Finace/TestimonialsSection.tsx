import React from "react";
import { Star } from "lucide-react";

// --- Types ---
interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

// --- Mock Data ---
// Using images that look good without borders (close-up portraits)
const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Kathy Pacheco",
    role: "Product Manager",
    content:
      "Fusce volutpat lectus et nisl consectetur finibus. In vitae scelerisque augue, in varius eros. Nunc sapien diam, euismod et pretium id, volutpat et tortor.",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Senior Developer",
    content:
      "Fusce volutpat lectus et nisl consectetur finibus. In vitae scelerisque augue, in varius eros. Nunc sapien diam, euismod et pretium id, volutpat et tortor.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    id: 3,
    name: "Sarah Johnson",
    role: "UX Designer",
    content:
      "Fusce volutpat lectus et nisl consectetur finibus. In vitae scelerisque augue, in varius eros. Nunc sapien diam, euismod et pretium id, volutpat et tortor.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
  {
    id: 4,
    name: "David Kim",
    role: "CTO",
    content:
      "Fusce volutpat lectus et nisl consectetur finibus. In vitae scelerisque augue, in varius eros. Nunc sapien diam, euismod et pretium id, volutpat et tortor.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    rating: 5,
  },
];

// --- Components ---

const StarRating = ({ count }: { count: number }) => {
  return (
    <div className="flex gap-1 justify-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={`${
            i < count
              ? "fill-orange-400 text-orange-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
};

const TestimonialCard = ({ data }: { data: Testimonial }) => {
  return (
    <div
      className="flex-shrink-0 bg-white p-6 flex flex-col items-center text-center relative select-none"
      style={{
        width: "515px",
        height: "214px",
        borderRadius: "10px",
        boxShadow: "0px 0px 12px 0px #0252CF1A",
        marginTop: "40px", // Space for the floating avatar
      }}
    >
      {/* Avatar - Positioned to overlap top edge */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2">
        <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-100">
          <img
            src={data.avatar}
            alt={data.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Content */}
      <div className="mt-8 flex flex-col h-full justify-between">
        <p className="text-slate-600 leading-relaxed text-sm line-clamp-3">
          {data.content}
        </p>

        <div className="mt-4">
          <h4 className="font-bold text-slate-900 text-base mb-1">
            {data.name}
          </h4>
          <StarRating count={data.rating} />
        </div>
      </div>
    </div>
  );
};

export default function TestimonialsSection() {
  return (
    <section className="py-12 px-4 bg-slate-50/50 font-sans  flex flex-col items-center justify-center">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">
          What Our <span className="text-blue-600">Clients Say</span>
        </h2>
        <p className="text-slate-500 text-lg">
          This project reflects our dedication to innovation, quality, and
          attention to detail.
        </p>
      </div>

      {/* Scrollable Container */}
      <div className="w-full max-w-[1200px] relative">
        {/* Fade effect on right side to indicate scroll */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-50/50 to-transparent z-10 pointer-events-none hidden md:block" />

        <div
          className="flex gap-8 overflow-x-auto pb-8 pt-4 px-4 snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none", // Firefox
            msOverflowStyle: "none", // IE/Edge
          }}
        >
          {/* Hide scrollbar for Chrome/Safari/Opera via inline style injection or CSS class */}
          <style>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>

          {TESTIMONIALS.map((item) => (
            <div key={item.id} className="snap-center">
              <TestimonialCard data={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="flex gap-2 mt-8">
        {TESTIMONIALS.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${i === 0 ? "bg-blue-600 w-6" : "bg-slate-300"}`}
          />
        ))}
      </div>
    </section>
  );
}
