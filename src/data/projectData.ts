// types/projectData.ts

export interface Project {
  id: string;
  title: string;
  image: string;
  gallery: string[];
  cost: string;
  client: string;
  year: string;
  location: string;
  category: string;
  description: string;
  fullDescription: string;
  features: string[];
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
}

export const categories = [
  "Show All Work",
  "Building Construction",
  "Industrial Design",
  "Architect Design",
  "Residential Design",
  "Contemporary Villa",
  "Interior",
  "Architecture",
  "Road & Bridge Construction",
];

export const allProjects: Project[] = [
  {
    id: "serenity-community-1",
    title: "Serenity Community",
    image: "/image/image10.jpg",
    gallery: [
      "/image/image10.jpg",
      "/image/image11.jpg",
      "/image/image12.jpg",
      "/image/image13.jpg",
    ],
    cost: "$234,000",
    client: "ABS Nexus",
    year: "2026",
    location: "Dixon Road-12, Australia",
    category: "Residential Design",
    description: "A modern residential community featuring sustainable design and premium amenities.",
    fullDescription: `
      <p>The Serenity Community project represents our commitment to creating living spaces that harmonize with nature while providing modern comforts. This ambitious development spans 12 acres of carefully planned landscape.</p>
      
      <h3>Project Overview</h3>
      <p>Our team worked closely with ABS Nexus to bring their vision of sustainable luxury living to life. The project incorporates cutting-edge green building technologies, including solar panel integration, rainwater harvesting systems, and energy-efficient insulation.</p>
      
      <h3>Key Features</h3>
      <p>Each residence within the community features spacious open-plan living areas, floor-to-ceiling windows for natural light, and private outdoor spaces. The development also includes shared amenities such as a community center, walking trails, and organic gardens.</p>
    `,
    features: [
      "12 acres of developed land",
      "45 luxury residences",
      "Solar power integration",
      "Rainwater harvesting system",
      "Community center & gardens",
      "LEED Gold certification",
    ],
    testimonial: {
      text: "Working with this team was an exceptional experience. They delivered beyond our expectations and maintained the highest standards throughout the project.",
      author: "Sarah Mitchell",
      role: "Director, ABS Nexus",
    },
  },
  {
    id: "urban-heights",
    title: "Urban Heights",
    image: "/image/image11.jpg",
    gallery: [
      "/image/image11.jpg",
      "/image/image12.jpg",
      "/image/image13.jpg",
      "/image/image14.jpg",
    ],
    cost: "$450,000",
    client: "Metro Developments",
    year: "2025",
    location: "Sydney CBD, Australia",
    category: "Industrial Design",
    description: "High-rise commercial complex with state-of-the-art facilities.",
    fullDescription: `
      <p>Urban Heights stands as a testament to modern commercial architecture in the heart of Sydney's central business district. This 25-story tower redefines workplace environments.</p>
      
      <h3>Architectural Excellence</h3>
      <p>The building features a distinctive glass facade that maximizes natural light while minimizing heat gain. The design incorporates flexible floor plates to accommodate various tenant requirements.</p>
      
      <h3>Sustainable Features</h3>
      <p>The tower achieves a 5-star Green Star rating through its energy-efficient systems, including smart lighting, high-performance glazing, and a rainwater harvesting system that reduces potable water consumption by 40%.</p>
    `,
    features: [
      "25-story commercial tower",
      "45,000 sqm of office space",
      "LEED Platinum certification",
      "Rooftop terrace with city views",
      "Underground parking for 200 vehicles",
      "Smart building technology",
    ],
  },
  {
    id: "green-valley",
    title: "Green Valley Estate",
    image: "/image/image12.jpg",
    gallery: [
      "/image/image12.jpg",
      "/image/image13.jpg",
      "/image/image14.jpg",
      "/image/image15.jpg",
    ],
    cost: "$890,000",
    client: "Green Living Co",
    year: "2026",
    location: "Melbourne Suburbs, Australia",
    category: "Architect Design",
    description: "Eco-friendly housing development with solar integration and green spaces.",
    fullDescription: `
      <p>Green Valley Estate represents the future of sustainable residential development. This project demonstrates how environmental responsibility and modern living can coexist beautifully.</p>
      
      <h3>Community Design</h3>
      <p>The development features 120 homes arranged around communal green spaces, promoting social interaction while maintaining privacy. Each home is oriented to maximize solar gain in winter and minimize it in summer.</p>
      
      <h3>Environmental Impact</h3>
      <p>The estate includes a community solar farm that provides renewable energy to all homes, electric vehicle charging stations, and extensive native landscaping that requires minimal irrigation.</p>
    `,
    features: [
      "Net-zero energy design",
      "Community solar farm",
      "Electric vehicle charging",
      "Native landscaping",
      "Recycled water systems",
      "Bike sharing program",
    ],
  },
  {
    id: "harbor-bridge",
    title: "Harbor Bridge Plaza",
    image: "/image/image13.jpg",
    gallery: [
      "/image/image13.jpg",
      "/image/image14.jpg",
      "/image/image15.jpg",
      "/image/image16.jpg",
    ],
    cost: "$1,200,000",
    client: "Harbor Group",
    year: "2025",
    location: "Perth Waterfront, Australia",
    category: "Residential Design",
    description: "Waterfront commercial plaza with retail and office spaces.",
    fullDescription: `
      <p>Harbor Bridge Plaza transforms the Perth waterfront with its innovative mixed-use design. This landmark development combines premium retail spaces with Class A office accommodations.</p>
      
      <h3>Waterfront Integration</h3>
      <p>The design maximizes its waterfront location with extensive glazing offering panoramic ocean views. Public promenades and outdoor dining areas activate the ground level, creating a vibrant destination.</p>
    `,
    features: [
      "Waterfront location",
      "30 retail spaces",
      "15,000 sqm office space",
      "Public promenade",
      "Underground parking",
      "Rooftop gardens",
    ],
  },
  {
    id: "sunset-villas",
    title: "Sunset Villas",
    image: "/image/image14.jpg",
    gallery: [
      "/image/image14.jpg",
      "/image/image15.jpg",
      "/image/image16.jpg",
      "/image/image17.jpg",
    ],
    cost: "$670,000",
    client: "Luxury Homes Inc",
    year: "2026",
    location: "Gold Coast, Australia",
    category: "Contemporary Villa",
    description: "Premium beachfront villas with private pools and ocean views.",
    fullDescription: `
      <p>Sunset Villas redefines luxury coastal living with its collection of 15 exclusive beachfront properties. Each villa is meticulously designed to capture the essence of its stunning location.</p>
      
      <h3>Architectural Design</h3>
      <p>The contemporary architecture features clean lines, extensive use of glass, and natural materials that complement the coastal setting. Floor-to-ceiling sliding glass walls blur the boundary between indoor and outdoor living.</p>
    `,
    features: [
      "Private infinity pools",
      "Direct beach access",
      "Smart home automation",
      "Rooftop terraces",
      "Private elevators",
      "Wine cellars",
    ],
    testimonial: {
      text: "Our villa exceeded all expectations. The attention to detail and quality of finishes is outstanding.",
      author: "James Patterson",
      role: "Homeowner",
    },
  },
  {
    id: "tech-hub",
    title: "Innovation Tech Hub",
    image: "/image/image15.jpg",
    gallery: [
      "/image/image15.jpg",
      "/image/image16.jpg",
      "/image/image17.jpg",
      "/image/image18.jpg",
    ],
    cost: "$2,100,000",
    client: "Innovation Labs",
    year: "2025",
    location: "Brisbane, Australia",
    category: "Building Construction",
    description: "Modern technology center with research facilities and co-working spaces.",
    fullDescription: `
      <p>The Innovation Tech Hub creates a dynamic environment for technology companies and startups. The building features flexible spaces that adapt to the changing needs of modern businesses.</p>
      
      <h3>Collaborative Design</h3>
      <p>The layout encourages collaboration with open-plan areas, meeting pods, and communal lounges on every floor. State-of-the-art conference facilities and a rooftop event space host industry events.</p>
    `,
    features: [
      "12-story tech center",
      "Co-working spaces",
      "Research laboratories",
      "Event space",
      "Cafeteria & gym",
      "Bike storage",
    ],
  },
  {
    id: "mountain-retreat",
    title: "Mountain Escape Retreat",
    image: "/image/image16.jpg",
    gallery: [
      "/image/image16.jpg",
      "/image/image17.jpg",
      "/image/image18.jpg",
      "/image/image10.jpg",
    ],
    cost: "$340,000",
    client: "Nature Escapes",
    year: "2026",
    location: "Blue Mountains, Australia",
    category: "Industrial Design",
    description: "Secluded mountain cabins with sustainable materials and panoramic views.",
    fullDescription: `
      <p>Mountain Escape Retreat offers an immersive nature experience through its collection of eco-luxury cabins. Each structure is carefully sited to minimize environmental impact while maximizing views.</p>
      
      <h3>Sustainable Construction</h3>
      <p>Cabins are constructed using locally sourced timber and feature green roofs that blend with the landscape. Passive design principles maintain comfortable temperatures year-round with minimal energy use.</p>
    `,
    features: [
      "8 eco-cabins",
      "Panoramic mountain views",
      "Wood-fired hot tubs",
      "Solar power",
      "Rainwater collection",
      "Nature trails",
    ],
  },
  {
    id: "central-mall",
    title: "Central Shopping Mall",
    image: "/image/image17.jpg",
    gallery: [
      "/image/image17.jpg",
      "/image/image18.jpg",
      "/image/image10.jpg",
      "/image/image11.jpg",
    ],
    cost: "$3,500,000",
    client: "Retail Giants",
    year: "2025",
    location: "Adelaide, Australia",
    category: "Residential Design",
    description: "Large-scale shopping complex with entertainment and dining options.",
    fullDescription: `
      <p>Central Mall redefines the retail experience in Adelaide with its innovative mix of shopping, dining, and entertainment. The multi-level complex creates a vibrant destination for the community.</p>
      
      <h3>Retail Innovation</h3>
      <p>The design incorporates digital experiences, pop-up spaces, and flexible retail configurations that adapt to changing tenant needs. A dedicated events space hosts community gatherings and performances.</p>
    `,
    features: [
      "150+ retail stores",
      "Food court with 20 vendors",
      "Cinema complex",
      "Kids play area",
      "Rooftop garden",
      "EV charging stations",
    ],
  },
  {
    id: "industrial-park",
    title: "Advanced Industrial Park",
    image: "/image/image18.jpg",
    gallery: [
      "/image/image18.jpg",
      "/image/image10.jpg",
      "/image/image11.jpg",
      "/image/image12.jpg",
    ],
    cost: "$1,800,000",
    client: "Manufacturing Co",
    year: "2026",
    location: "Darwin, Australia",
    category: "Contemporary Villa",
    description: "Modern industrial facility with warehouse and distribution center.",
    fullDescription: `
      <p>The Advanced Industrial Park sets new standards for industrial facilities with its focus on efficiency, sustainability, and worker wellbeing. The development includes warehouse space, manufacturing facilities, and office accommodations.</p>
      
      <h3>Efficient Design</h3>
      <p>High-bay warehouses maximize storage capacity while automated systems streamline logistics. The office areas feature abundant natural light and modern amenities that attract top talent.</p>
    `,
    features: [
      "50,000 sqm warehouse",
      "Manufacturing facilities",
      "Office space",
      "Truck loading bays",
      "Solar array",
      "Employee amenities",
    ],
  },
];

// Helper function to get projects by category
export const getProjectsByCategory = (category: string): Project[] => {
  if (category === "Show All Work" || category === "All") return allProjects;
  return allProjects.filter(project => project.category === category);
};

// Helper function to get related projects
export const getRelatedProjects = (projectId: string, limit: number = 3): Project[] => {
  const project = allProjects.find(p => p.id === projectId);
  if (!project) return [];
  
  return allProjects
    .filter(p => p.category === project.category && p.id !== projectId)
    .slice(0, limit);
};

// Helper function to get unique categories from projects
export const getUniqueCategories = (): string[] => {
  const categories = allProjects.map(p => p.category);
  return ["Show All Work", ...Array.from(new Set(categories))];
};

// Helper function to get projects for carousel/featured display
export const getFeaturedProjects = (count: number = 6): Project[] => {
  return allProjects.slice(0, count);
};