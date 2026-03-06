// components/TeamMembers.tsx
import React from "react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Paula Mora",
    role: "Civil Engineer",
    image: "/team/image-1.png",
  },
  {
    name: "Lorri Warf",
    role: "Civil Engineer",
    image: "/team/image-3.png",
  },
  {
    name: "Katie Sims",
    role: "Civil Engineer",
    image: "/team/image-4.jpg",
  },
];

const TeamMembers: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[#F5F5F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            {/* Team Icon */}
            <div className="flex items-center gap-2 mb-4">
              <img src="/svg/Item1.svg" alt="team icon" className="w-5 h-5" />
              <span className="text-blue-600 font-medium text-sm">
                Team Members
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-gray-900 leading-tight">
              Our Team Member
            </h2>
            <p className="text-gray-600 text-base md:text-lg mt-4 leading-relaxed max-w-xl">
              We are a real estate firm with over 20 years of expertise, We
              provide amazing locations to our partners and clients.
            </p>
          </div>

          {/* View More Button - Keep like PC */}
          <button className="inline-flex items-center justify-center px-8 py-3.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 w-auto">
            View more
          </button>
        </div>

        {/* Team Grid - Vertical until 645px, then 3 cols */}
        <div className="flex flex-col items-center gap-8 pb-10 min-[645px]:grid min-[645px]:grid-cols-3 min-[645px]:gap-4 lg:gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center w-full max-w-[374px] min-[645px]:max-w-none"
            >
              {/* Image Container */}
              <div
                className="relative overflow-hidden w-full"
                style={{
                  aspectRatio: "374 / 423",
                  borderRadius: "10px",
                }}
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                />
              </div>

              {/* Bottom Dark Card - Half outside image */}
              <div
                className="relative bg-[#1a1f2e] flex flex-col justify-center z-10 w-[83.7%]"
                style={{
                  height: "72px",
                  borderRadius: "10px",
                  padding: "0 20px",
                  marginTop: "-36px",
                }}
              >
                <h3
                  className="text-white font-semibold truncate"
                  style={{ fontSize: "18px", lineHeight: "24px" }}
                >
                  {member.name}
                </h3>
                <p
                  className="text-gray-400 truncate"
                  style={{ fontSize: "14px", lineHeight: "20px" }}
                >
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamMembers;
