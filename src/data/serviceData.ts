// data/serviceData.ts

export interface Service {
  id: string;
  slug: string;
  image: string;
  title: string;
  description: string;
  fullDescription: string;
  features: string[];
  benefits: string[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  gallery: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
  priceRange?: string;
  timeline?: string;
}

export const services: Service[] = [
  {
    id: "1",
    slug: "project-management",
    image: "/image/image10.jpg",
    title: "Project Management",
    description: "From scheduling to quality control, we oversee every stage",
    fullDescription:
      "Our comprehensive project management services ensure your construction project runs smoothly from start to finish. We coordinate all aspects including timeline management, budget oversight, quality control inspections, and contractor coordination.",
    features: [
      "Timeline & Schedule Management",
      "Budget Planning & Control",
      "Quality Assurance Inspections",
      "Contractor Coordination",
      "Risk Assessment & Mitigation",
      "Progress Reporting",
    ],
    benefits: [
      "On-time project delivery guaranteed",
      "Cost savings through efficient management",
      "Single point of contact for all needs",
    ],
    process: [
      {
        step: 1,
        title: "Initial Consultation",
        description: "We assess your project needs, goals, and establish clear objectives.",
      },
      {
        step: 2,
        title: "Strategic Planning",
        description: "Detailed roadmap creation with milestones and resource allocation.",
      },
      {
        step: 3,
        title: "Execution & Monitoring",
        description: "Active oversight with regular quality checks and progress updates.",
      },
      {
        step: 4,
        title: "Project Completion",
        description: "Final inspections, documentation, and successful handover.",
      },
    ],
    gallery: [
      "/image/image10.jpg",
      "/image/image11.jpg",
      "/image/image12.jpg",
    ],
    faqs: [
      {
        question: "How do you ensure projects stay on schedule?",
        answer: "We use advanced project management software with milestone tracking and proactive risk management.",
      },
      {
        question: "What reporting will I receive?",
        answer: "Weekly progress reports, monthly budget reviews, and immediate alerts for critical issues.",
      },
    ],
    priceRange: "$5,000 - $50,000",
    timeline: "2-8 weeks",
  },
  {
    id: "2",
    slug: "construction-planning",
    image: "./image/image11.jpg",
    title: "Construction Planning",
    description: "Comprehensive blueprints and strategic project roadmaps",
    fullDescription:
      "We provide detailed construction planning services that transform your vision into actionable blueprints. Our strategic approach ensures every phase of construction is meticulously planned and executed.",
    features: [
      "Architectural Blueprint Development",
      "Permit Acquisition Assistance",
      "Material Specification & Sourcing",
      "Structural Engineering Consultation",
      "Sustainability Planning",
      "Cost Estimation & Budgeting",
    ],
    benefits: [
      "Accurate cost projections from day one",
      "Streamlined permit approval process",
      "Sustainable design options available",
    ],
    process: [
      {
        step: 1,
        title: "Site Analysis",
        description: "Comprehensive evaluation of topography, soil, and zoning requirements.",
      },
      {
        step: 2,
        title: "Conceptual Design",
        description: "Initial design concepts based on your vision and budget.",
      },
      {
        step: 3,
        title: "Detailed Planning",
        description: "Complete architectural plans with material specifications.",
      },
      {
        step: 4,
        title: "Permit Approval",
        description: "Management of all required permits and regulatory approvals.",
      },
    ],
    gallery: [
      "./image/image11.jpg",
      "./image/image10.jpg",
      "./image/image12.jpg",
    ],
    faqs: [
      {
        question: "How long does planning take?",
        answer: "Typically 4-12 weeks for residential projects, depending on complexity.",
      },
      {
        question: "Do you handle permits?",
        answer: "Yes, we manage the entire permit process from preparation to approval.",
      },
    ],
    priceRange: "$3,000 - $25,000",
    timeline: "4-12 weeks",
  },
  {
    id: "3",
    slug: "building-renovation",
    image: "./image/image12.jpg",
    title: "Building Renovation",
    description: "Transform existing structures with modern upgrades",
    fullDescription:
      "Our renovation experts breathe new life into existing structures. Whether historic restoration or modern upgrade, we deliver transformations that enhance functionality and aesthetic appeal.",
    features: [
      "Structural Assessment & Analysis",
      "Design & Space Optimization",
      "Historic Preservation",
      "Energy Efficiency Upgrades",
      "Modern System Integration",
      "Interior & Exterior Refurbishment",
    ],
    benefits: [
      "Increased property value significantly",
      "Improved energy efficiency",
      "Enhanced functionality and comfort",
    ],
    process: [
      {
        step: 1,
        title: "Assessment",
        description: "Thorough evaluation of existing conditions and structural integrity.",
      },
      {
        step: 2,
        title: "Design",
        description: "Collaborative design respecting existing structure while meeting needs.",
      },
      {
        step: 3,
        title: "Renovation",
        description: "Skilled execution with minimal disruption to your daily life.",
      },
      {
        step: 4,
        title: "Completion",
        description: "Detail-oriented finishing and final inspections.",
      },
    ],
    gallery: [
      "./image/image12.jpg",
      "./image/image10.jpg",
      "./image/image11.jpg",
    ],
    faqs: [
      {
        question: "Can you work with historic buildings?",
        answer: "Yes, we have extensive historic preservation experience and compliance expertise.",
      },
      {
        question: "How do you minimize disruption?",
        answer: "Detailed phasing plans, clear work zones, and strict schedules.",
      },
    ],
    priceRange: "$10,000 - $100,000+",
    timeline: "4-16 weeks",
  },
];

export const getServiceBySlug = (slug: string): Service | undefined => {
  return services.find((service) => service.slug === slug);
};

export const getAllServices = (): Service[] => {
  return services;
};