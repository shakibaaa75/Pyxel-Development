import type { BlogPost } from "../types/blog";
import { calculateReadingTime } from "../utils/readingTime";

const postsData = [
  {
    id: "1",
    title: "Top 5 Home Renovation Ideas to Boost Property Value",
    slug: "top-5-home-renovation-ideas",
    excerpt: "Discover the best renovation projects that increase your home's market value...",
    content: `
      <p>Home renovation is one of the most effective ways to increase your property value. Whether you're planning to sell soon or just want to invest in your home's future, strategic improvements can yield significant returns.</p>
      <h2>1. Kitchen Remodeling</h2>
      <p>The kitchen is often considered the heart of the home. A modern, functional kitchen can recoup 70-80% of your investment. Focus on energy-efficient appliances, quality countertops, and ample storage space.</p>
      <h2>2. Bathroom Upgrades</h2>
      <p>Updated bathrooms are a major selling point. Consider replacing outdated fixtures, adding modern lighting, and installing water-efficient toilets and showers.</p>
      <h2>3. Deck Addition</h2>
      <p>Outdoor living spaces are increasingly popular. A well-built deck expands your usable living area and offers an excellent return on investment.</p>
      <h2>4. Energy-Efficient Windows</h2>
      <p>New windows not only improve curb appeal but also reduce energy costs. Buyers appreciate the long-term savings on utility bills.</p>
      <h2>5. Fresh Paint</h2>
      <p>Never underestimate the power of paint. A fresh coat in modern, neutral colors can transform spaces at minimal cost.</p>
      <p>Remember to choose projects that match your neighborhood's standards and appeal to your target buyer demographic.</p>
    `,
    image: "./image/image10.jpg",
    category: "Renovation",
    date: "Jan 15, 2024",
  },
  {
    id: "2",
    title: "How to Plan a Construction Project: A Step-by-Step Guide",
    slug: "how-to-plan-construction-project",
    excerpt: "Learn how to properly plan your next construction project from start to finish...",
    content: `
      <p>Planning a construction project requires careful coordination of multiple elements. From initial concept to final inspection, each phase demands attention to detail and strategic decision-making.</p>
      <h2>Define Your Goals</h2>
      <p>Start by clearly defining what you want to achieve. Establish your budget, timeline, and quality expectations. Be realistic about constraints and priorities.</p>
      <h2>Assemble Your Team</h2>
      <p>Select qualified professionals including architects, engineers, and contractors. Check references, verify licenses, and ensure proper insurance coverage.</p>
      <h2>Obtain Permits</h2>
      <p>Research local building codes and secure necessary permits before breaking ground. Failure to comply can result in costly delays and penalties.</p>
      <h2>Create a Detailed Schedule</h2>
      <p>Develop a comprehensive timeline with milestones and buffer periods for unexpected delays. Regular monitoring ensures projects stay on track.</p>
      <h2>Monitor Progress</h2>
      <p>Stay involved throughout construction. Regular site visits and communication with your contractor help identify issues early.</p>
    `,
    image: "./image/image11.jpg",
    category: "Planning",
    date: "Jan 12, 2024",
  },
  {
    id: "3",
    title: "The Benefits of Hiring a Licensed Contractor",
    slug: "benefits-hiring-licensed-contractor",
    excerpt: "Why working with a licensed professional protects your investment...",
    content: `
      <p>When it comes to construction and renovation projects, hiring a licensed contractor isn't just a recommendation—it's essential protection for your investment.</p>
      <h2>Legal Compliance</h2>
      <p>Licensed contractors understand building codes and permit requirements. They ensure your project meets all legal standards, avoiding costly violations.</p>
      <h2>Insurance Protection</h2>
      <p>Licensed professionals carry liability insurance and workers' compensation. This protects you from financial responsibility if accidents occur on your property.</p>
      <h2>Quality Assurance</h2>
      <p>Licensing boards require contractors to meet experience and competency standards. This vetting process helps ensure quality workmanship.</p>
      <h2>Contract Security</h2>
      <p>Licensed contractors typically provide detailed contracts with clear scopes of work, payment schedules, and warranty information.</p>
      <h2>Dispute Resolution</h2>
      <p>If problems arise, licensed contractors are accountable to state licensing boards. This provides recourse for unresolved disputes.</p>
      <p>Always verify licenses through your state's licensing board before hiring. The extra due diligence pays dividends in project success.</p>
    `,
    image: "./image/image12.jpg",
    category: "Hiring",
    date: "Jan 10, 2024",
  },
  {
    id: "4",
    title: "Kitchen Remodeling Trends to Watch in 2024",
    slug: "kitchen-remodeling-trends-2024",
    excerpt: "From smart appliances to sustainable materials, discover what's trending in kitchen design...",
    content: `
      <p>The kitchen continues to evolve as technology advances and sustainability becomes paramount. Here are the top trends shaping kitchen design this year.</p>
      <h2>Smart Technology Integration</h2>
      <p>From refrigerators with touchscreens to voice-controlled faucets, smart appliances are becoming standard. These innovations offer convenience and energy efficiency.</p>
      <h2>Sustainable Materials</h2>
      <p>Eco-conscious homeowners are choosing bamboo flooring, recycled glass countertops, and reclaimed wood accents. These materials reduce environmental impact while adding character.</p>
      <h2>Hidden Storage Solutions</h2>
      <p>Minimalist aesthetics drive demand for concealed storage. Appliance garages, pull-out pantries, and integrated cabinetry create clean, uncluttered spaces.</p>
      <h2>Bold Color Choices</h2>
      <p>While white kitchens remain popular, bold blues, greens, and even black are making statements. Two-tone cabinets add visual interest and depth.</p>
    `,
    image: "./image/image13.jpg",
    category: "Kitchen",
    date: "Jan 8, 2024",
  },
  {
    id: "5",
    title: "Bathroom Renovation: Maximizing Small Spaces",
    slug: "bathroom-renovation-small-spaces",
    excerpt: "Expert tips on making the most of compact bathrooms without compromising style...",
    content: `
      <p>Small bathrooms present unique challenges, but with smart design choices, you can create functional, stylish spaces that feel larger than their footprint.</p>
      <h2>Light Color Palettes</h2>
      <p>Light colors reflect natural light and create airy atmospheres. Consider soft whites, pale grays, or muted pastels for walls and fixtures.</p>
      <h2>Space-Saving Fixtures</h2>
      <p>Wall-mounted toilets and floating vanities free up floor space. Corner sinks and compact showers maximize usable area.</p>
      <h2>Strategic Storage</h2>
      <p>Recessed medicine cabinets, built-in niches, and over-toilet shelving provide storage without consuming precious space.</p>
      <h2>Large Mirrors</h2>
      <p>Oversized mirrors reflect light and visually double your space. Consider backlit options for added ambiance.</p>
      <h2>Glass Enclosures</h2>
      <p>Clear glass shower doors eliminate visual barriers, making bathrooms feel more open than opaque curtains or frosted doors.</p>
    `,
    image: "./image/image14.jpg",
    category: "Bathroom",
    date: "Jan 5, 2024",
  },
  {
    id: "6",
    title: "Understanding Building Permits: A Homeowner's Guide",
    slug: "understanding-building-permits",
    excerpt: "Everything you need to know about permits before starting your renovation project...",
    content: `
      <p>Building permits are official approvals issued by local government agencies that allow you to proceed with construction projects. Understanding when and why you need them is crucial for legal compliance.</p>
      <h2>When Permits Are Required</h2>
      <p>Most structural changes, electrical work, plumbing modifications, and additions require permits. Cosmetic updates like painting and flooring typically don't.</p>
      <h2>The Application Process</h2>
      <p>Submit detailed plans to your local building department. Include architectural drawings, engineering calculations, and project specifications. Fees vary by project scope.</p>
      <h2>Inspection Requirements</h2>
      <p>Permits include mandatory inspections at various project stages. These ensure work meets safety codes and approved plans.</p>
      <h2>Consequences of Non-Compliance</h2>
      <p>Unpermitted work can result in fines, mandatory removal, and complications when selling your home. Insurance may not cover damages from unpermitted work.</p>
      <h2>Working with Professionals</h2>
      <p>Licensed contractors typically handle permit applications as part of their services. This expertise streamlines the process and ensures compliance.</p>
    `,
    image: "./image/image15.jpg",
    category: "Permits",
    date: "Jan 3, 2024",
  },
  {
    id: "7",
    title: "Deck Design Ideas for Outdoor Living",
    slug: "deck-design-outdoor-living",
    excerpt: "Create the perfect outdoor space with these innovative deck design concepts...",
    content: `
      <p>A well-designed deck extends your living space outdoors, providing areas for relaxation, entertainment, and enjoying nature. Here are inspiring design concepts to consider.</p>
      <h2>Multi-Level Decks</h2>
      <p>Tiered designs create distinct zones for dining, lounging, and hot tubs. Levels add visual interest and solve slope challenges.</p>
      <h2>Built-In Features</h2>
      <p>Integrated benches, planters, and storage maximize functionality. Built-in lighting extends usability into evening hours.</p>
      <h2>Composite Materials</h2>
      <p>Synthetic decking resists fading, staining, and rotting. While initially more expensive, reduced maintenance costs provide long-term value.</p>
      <h2>Pergola Covers</h2>
      <p>Partial roofs provide shade while maintaining open-air feel. Add climbing plants for natural cooling and beauty.</p>
      <h2>Outdoor Kitchens</h2>
      <p>Built-in grills, refrigerators, and prep areas make outdoor entertaining effortless. Weather-resistant materials ensure longevity.</p>
    `,
    image: "./image/image16.jpg",
    category: "Outdoor",
    date: "Dec 28, 2023",
  },
  {
    id: "8",
    title: "How to Budget for Your Home Renovation",
    slug: "how-to-budget-home-renovation",
    excerpt: "Practical strategies for planning and sticking to your renovation budget...",
    content: `
      <p>Successful renovations require realistic budgeting that accounts for materials, labor, and unexpected challenges. Here's how to plan financially for your project.</p>
      <h2>Establish Total Budget</h2>
      <p>Determine what you can afford without overextending financially. Consider financing options and their long-term implications.</p>
      <h2>Get Multiple Quotes</h2>
      <p>Solicit detailed estimates from at least three contractors. Compare scope of work, materials, and timelines—not just bottom lines.</p>
      <h2>Allocate Contingency Funds</h2>
      <p>Set aside 10-20% of your budget for surprises. Hidden issues like water damage or outdated wiring often emerge during demolition.</p>
      <h2>Prioritize Spending</h2>
      <p>Invest in high-impact areas like kitchens and bathrooms. Save on cosmetic elements that are easily updated later.</p>
      <h2>Track Expenses</h2>
      <p>Use spreadsheets or apps to monitor spending throughout the project. Regular reviews prevent budget overruns.</p>
      <h2>Avoid Scope Creep</h2>
      <p>Changes mid-project are costly. Finalize designs before starting and resist adding "while we're at it" projects.</p>
    `,
    image: "./image/image17.jpg",
    category: "Budgeting",
    date: "Dec 25, 2023",
  },
  {
    id: "9",
    title: "Sustainable Building Materials for Eco-Friendly Homes",
    slug: "sustainable-building-materials",
    excerpt: "Explore environmentally conscious options for your next construction project...",
    content: `
      <p>Sustainable construction reduces environmental impact while often improving indoor air quality and long-term durability. Discover materials that make your build greener.</p>
      <h2>Bamboo Flooring</h2>
      <p>This rapidly renewable resource offers hardwood aesthetics with faster regrowth. It's durable, attractive, and carbon-negative.</p>
      <h2>Recycled Steel</h2>
      <p>Using recycled steel for framing reduces mining impacts. It's stronger than wood and resistant to pests and fire.</p>
      <h2>Reclaimed Wood</h2>
      <p>Salvaged timber from old barns and factories provides unique character while preventing deforestation. Each piece tells a story.</p>
      <h2>Cork Insulation</h2>
      <p>Renewable cork provides excellent thermal and acoustic insulation. It's naturally mold-resistant and biodegradable.</p>
      <h2>Low-VOC Paints</h2>
      <p>Traditional paints release harmful volatile organic compounds. Low-VOC alternatives improve indoor air quality without sacrificing performance.</p>
      <h2>Solar Panels</h2>
      <p>Photovoltaic systems reduce reliance on fossil fuels. Tax incentives and falling prices make solar increasingly accessible.</p>
    `,
    image: "./image/image18.jpg",
    category: "Sustainability",
    date: "Dec 22, 2023",
  },
];

// Calculate reading time for each post
export const SAMPLE_POSTS: BlogPost[] = postsData.map(post => ({
  ...post,
  readTime: calculateReadingTime(post.content),
}));