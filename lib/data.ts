export interface Project {
  slug: string;
  title: string;
  style: string;
  type: string;
  bedrooms: number;
  budgetBand: "Low" | "Mid" | "High" | "Premium";
  mustHaves: string[];
  size: number; // in square meters
  buildTime: string;
  images: string[];
  description: string;
  materials: string[];
  designIntent: string;
}

export interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  readingTime: string;
  image: string;
  excerpt: string;
}

export const projects: Project[] = [
  {
    slug: "modern-eco-villa",
    title: "Modern Eco Villa",
    style: "Modern",
    type: "Villa",
    bedrooms: 4,
    budgetBand: "High",
    mustHaves: ["Natural light", "Open plan", "Smart home", "Sustainability"],
    size: 320,
    buildTime: "12 months",
    images: [
      "/media/img-001.jpg",
      "/media/img-002.jpg",
    ],
    description:
      "This contemporary villa blends sustainable materials with smart technology, maximizing natural light and blurring boundaries between indoors and outdoors.",
    materials: ["Bamboo", "Recycled steel", "Glass", "Stone"],
    designIntent:
      "Create a seamless connection to nature while maintaining a minimalist aesthetic and advanced energy efficiency.",
  },
  {
    slug: "scandinavian-cabin",
    title: "Scandinavian Cabin",
    style: "Scandinavian",
    type: "House",
    bedrooms: 3,
    budgetBand: "Mid",
    mustHaves: ["Natural light", "Warm minimal", "Sustainability"],
    size: 180,
    buildTime: "8 months",
    images: [
      "/media/img-003.jpg",
      "/media/img-004.jpg",
    ],
    description:
      "A cozy cabin inspired by Nordic design principles, featuring natural wood interiors, clean lines and expansive windows to capture the northern light.",
    materials: ["Pine", "Wool", "Stone"],
    designIntent:
      "Embrace hygge: comfort and simplicity, with tactile materials and a connection to the forest landscape.",
  },
  {
    slug: "industrial-loft",
    title: "Industrial Loft",
    style: "Industrial",
    type: "Loft",
    bedrooms: 2,
    budgetBand: "Low",
    mustHaves: ["Exposed brick", "Open plan", "High ceilings"],
    size: 150,
    buildTime: "6 months",
    images: [
      "/media/img-005.jpg",
      "/media/img-006.jpg",
    ],
    description:
      "A chic urban loft with exposed brick walls, steel beams and an open floor plan, balancing raw textures with modern comforts.",
    materials: ["Brick", "Steel", "Concrete", "Leather"],
    designIntent:
      "Celebrate the building's industrial heritage while introducing modern fixtures and warm accents.",
  },
  {
    slug: "classic-country-house",
    title: "Classic Country House",
    style: "Classic",
    type: "House",
    bedrooms: 5,
    budgetBand: "High",
    mustHaves: ["Garden", "Fireplace", "Traditional craftsmanship"],
    size: 400,
    buildTime: "14 months",
    images: [
      "/media/img-007.jpg",
      "/media/img-008.jpg",
    ],
    description:
      "A timeless residence that pays homage to countryside estates, featuring pitched roofs, stone facades and handcrafted woodwork.",
    materials: ["Oak", "Stone", "Lime plaster"],
    designIntent:
      "Marry traditional architectural forms with modern amenities for comfortable family living.",
  },
  {
    slug: "luxury-penthouse",
    title: "Luxury Penthouse",
    style: "Luxury",
    type: "Apartment",
    bedrooms: 3,
    budgetBand: "Premium",
    mustHaves: ["Panoramic views", "Smart home", "Terrace", "Private lift"],
    size: 260,
    buildTime: "10 months",
    images: [
      "/media/img-009.jpg",
      "/media/img-010.jpg",
    ],
    description:
      "A penthouse that redefines urban luxury with floor-to-ceiling glass, bespoke finishes and seamless indoor/outdoor living.",
    materials: ["Marble", "Glass", "Brass", "Walnut"],
    designIntent:
      "Maximize city views and sunlight while offering ultimate privacy and indulgence.",
  },
  {
    slug: "minimalist-apartment",
    title: "Minimalist Apartment",
    style: "Minimal",
    type: "Apartment",
    bedrooms: 1,
    budgetBand: "Low",
    mustHaves: ["Clean lines", "Multi-functional furniture", "Neutral palette"],
    size: 80,
    buildTime: "5 months",
    images: [
      "/media/img-011.jpg",
      "/media/img-012.jpg",
    ],
    description:
      "A compact yet airy apartment that embraces minimalism through clutter-free design, smart storage and a harmonious color scheme.",
    materials: ["Birch plywood", "Concrete", "Linen"],
    designIntent:
      "Prove that small spaces can still feel luxurious and expansive with thoughtful design.",
  },
  {
    slug: "eco-lux-home",
    title: "Eco-Lux Home",
    style: "Eco",
    type: "House",
    bedrooms: 4,
    budgetBand: "High",
    mustHaves: [
      "Sustainability",
      "Solar panels",
      "Green roof",
      "Natural materials",
    ],
    size: 300,
    buildTime: "11 months",
    images: [
      "/media/img-013.jpg",
      "/media/img-014.jpg",
    ],
    description:
      "A sustainable haven that combines eco-conscious materials with luxury finishes and state-of-the-art technology.",
    materials: ["Reclaimed wood", "Stone", "Recycled glass"],
    designIntent:
      "Prove that eco-conscious design can coexist with high-end aesthetics and comfort.",
  },
  {
    slug: "urban-loft",
    title: "Urban Loft",
    style: "Industrial",
    type: "Loft",
    bedrooms: 2,
    budgetBand: "Mid",
    mustHaves: ["High ceilings", "City views", "Polished concrete"],
    size: 140,
    buildTime: "7 months",
    images: [
      "/media/img-015.jpg",
      "/media/img-016.jpg",
    ],
    description:
      "A trendy loft in the heart of the city, blending industrial elements with chic decor and expansive windows.",
    materials: ["Concrete", "Steel", "Glass", "Leather"],
    designIntent:
      "Capture the energy of urban living while offering a serene retreat above the bustle.",
  },
  {
    slug: "tropical-villa",
    title: "Tropical Villa",
    style: "Tropical",
    type: "Villa",
    bedrooms: 3,
    budgetBand: "High",
    mustHaves: ["Outdoor pool", "Lush garden", "Open-air living"],
    size: 250,
    buildTime: "10 months",
    images: [
      "/media/img-017.jpg",
      "/media/img-018.jpg",
    ],
    description:
      "A resort-style villa that blurs indoor and outdoor spaces with sliding walls and overhanging roofs amidst tropical flora.",
    materials: ["Teak", "Bamboo", "Stone", "Cotton"],
    designIntent:
      "Create a sanctuary that celebrates tropical climates and encourages year-round outdoor living.",
  },
  {
    slug: "mountain-retreat",
    title: "Mountain Retreat",
    style: "Rustic",
    type: "Cabin",
    bedrooms: 4,
    budgetBand: "Mid",
    mustHaves: ["Fireplace", "Panoramic windows", "Natural materials"],
    size: 220,
    buildTime: "9 months",
    images: [
      "/media/img-019.jpg",
      "/media/img-020.jpg",
    ],
    description:
      "A cozy retreat perched in the mountains, featuring exposed beams, stone fireplaces and panoramic views of the landscape.",
    materials: ["Cedar", "Stone", "Wool", "Iron"],
    designIntent:
      "Provide a warm, rustic escape that connects its occupants to the surrounding wilderness.",
  },
  {
    slug: "coastal-cottage",
    title: "Coastal Cottage",
    style: "Coastal",
    type: "House",
    bedrooms: 3,
    budgetBand: "Mid",
    mustHaves: ["Sea views", "Wraparound porch", "Light palette"],
    size: 190,
    buildTime: "8 months",
    images: [
      "/media/img-021.jpg",
      "/media/img-022.jpg",
    ],
    description:
      "A charming seaside cottage with bright interiors, natural textures and a breezy, relaxed vibe.",
    materials: ["Shiplap", "Rattan", "Cotton", "Linen"],
    designIntent:
      "Invoke the serenity of coastal living with abundant light and ocean-inspired hues.",
  },
  {
    slug: "city-townhouse",
    title: "City Townhouse",
    style: "Urban",
    type: "House",
    bedrooms: 3,
    budgetBand: "High",
    mustHaves: ["Terrace", "Home office", "Smart home"],
    size: 200,
    buildTime: "9 months",
    images: [
      "/media/img-023.jpg",
      "/media/img-024.jpg",
    ],
    description:
      "A contemporary townhouse offering flexible living across multiple levels, with a rooftop terrace and integrated smart technologies.",
    materials: ["Brick", "Glass", "Concrete", "Steel"],
    designIntent:
      "Accommodate the modern urban lifestyle with private outdoor spaces and adaptable interiors.",
  },
  {
    slug: "modern-farmhouse",
    title: "Modern Farmhouse",
    style: "Classic",
    type: "House",
    bedrooms: 4,
    budgetBand: "High",
    mustHaves: ["Barn doors", "Patio", "Garden", "Shiplap walls"],
    size: 280,
    buildTime: "11 months",
    images: [
      "/media/img-025.jpg",
      "/media/img-026.jpg",
    ],
    description:
      "A fresh take on farmhouse style with a mix of rustic charm and modern conveniences.",
    materials: ["Reclaimed wood", "Metal", "Stone"],
    designIntent:
      "Blend tradition and contemporary living, with open interiors and pastoral touches.",
  },
];

// Gallery images – 30 local placeholders (homes/interiors).
export const galleryImages: string[] = Array.from({ length: 30 }, (_, i) =>
  `/media/img-${String(i + 1).padStart(3, "0")}.jpg`
);

export const testimonials: Testimonial[] = [
  {
    name: "Julija M.",
    text: "Atrium Studio transformed our home into a sanctuary. Their attention to detail and commitment to sustainability is unparalleled.",
    rating: 5,
  },
  {
    name: "Andrius K.",
    text: "The team captured exactly what we wanted – a modern, airy space that feels warm and welcoming.",
    rating: 4.5,
  },
  {
    name: "Dovile S.",
    text: "From the first sketches to the final finishes, their process was transparent and inspiring.",
    rating: 5,
  },
  {
    name: "Marius L.",
    text: "Our loft now reflects our personality perfectly – industrial chic with all the modern comforts.",
    rating: 4,
  },
  {
    name: "Renata G.",
    text: "We loved the AI finder! It suggested projects that matched our style and needs flawlessly.",
    rating: 4.8,
  },
  {
    name: "Justinas P.",
    text: "The team was professional, creative and truly passionate about architecture.",
    rating: 5,
  },
];

export const blogPosts: BlogPost[] = [
  {
    slug: "embracing-nordic-design",
    title: "Embracing Nordic Design: Warm Minimalism",
    category: "Design",
    readingTime: "6 min read",
    image: "/media/img-027.jpg",
    excerpt:
      "Discover how Nordic design principles can bring tranquility and warmth into your living spaces with simple lines and natural materials.",
  },
  {
    slug: "sustainable-luxury-homes",
    title: "Sustainable Luxury: Eco-Friendly Materials in High-End Homes",
    category: "Sustainability",
    readingTime: "5 min read",
    image: "/media/img-028.jpg",
    excerpt:
      "How to achieve luxury without compromising the planet: materials and design strategies for a greener home.",
  },
  {
    slug: "open-plan-living",
    title: "Open Plan Living: Maximizing Space and Light",
    category: "Architecture",
    readingTime: "7 min read",
    image: "/media/img-029.jpg",
    excerpt:
      "Tips and tricks for designing open-plan spaces that feel cohesive, cozy and functional.",
  },
  {
    slug: "smart-home-trends",
    title: "Smart Home Trends for 2025",
    category: "Technology",
    readingTime: "4 min read",
    image: "/media/img-030.jpg",
    excerpt:
      "Explore the latest innovations in smart home technology and how they can enhance your daily life.",
  },
  {
    slug: "designing-for-wellness",
    title: "Designing for Wellness: Spaces That Heal",
    category: "Wellness",
    readingTime: "6 min read",
    image: "/media/img-031.jpg",
    excerpt:
      "Learn how to incorporate biophilic design and mindful layouts to promote well-being at home.",
  },
  {
    slug: "timeless-vs-trendy",
    title: "Timeless vs. Trendy: Finding Your Design Balance",
    category: "Lifestyle",
    readingTime: "5 min read",
    image: "/media/img-032.jpg",
    excerpt:
      "A guide to blending timeless design elements with current trends to create a home that feels both fresh and enduring.",
  },
];
