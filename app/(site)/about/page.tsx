import Image from "next/image";

const team = [
  {
    name: "Egle Petrauskiene",
    role: "Principal Architect",
    image: "/media/img-066.jpg",
    bio: "Egle leads our architecture studio with a passion for sustainable, context-driven design and a love for Lithuanian heritage.",
  },
  {
    name: "Domas Kazlauskas",
    role: "Interior Director",
    image: "/media/img-067.jpg",
    bio: "Domas crafts interiors that tell stories through materiality, light and bespoke details.",
  },
  {
    name: "Jurga Norkiene",
    role: "Project Manager",
    image: "/media/img-068.jpg",
    bio: "Jurga ensures each project runs smoothly, coordinating between clients, contractors and the design team.",
  },
  {
    name: "Mantas Jakubaitis",
    role: "Sustainability Lead",
    image: "/media/img-069.jpg",
    bio: "Mantas champions eco-friendly materials and energy-efficient systems across all our projects.",
  },
];

const timeline = [
  {
    year: "2015",
    title: "Studio Founded",
    description: "Atrium Studio opens its doors in Mazeikiai, bringing together architects and designers passionate about modern living.",
  },
  {
    year: "2017",
    title: "First Award",
    description: "Our Eco-Lux Home wins the Lithuanian Architecture Prize for Sustainable Design.",
  },
  {
    year: "2019",
    title: "International Expansion",
    description: "We begin working with clients across Europe, completing projects in Scandinavia and Germany.",
  },
  {
    year: "2023",
    title: "AI Property Finder",
    description: "We launch our AI-powered property finder to help clients discover their perfect home style.",
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-12">
      <h1 className="text-3xl font-semibold">About Us</h1>
      {/* Studio story */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-neutral-700 dark:text-neutral-300 mb-4">
          Atrium Studio is a collective of architects, interior designers and sustainability experts based in Mazeikiai, Lithuania. Since our founding in 2015, we have been dedicated to crafting spaces that are timeless, functional and deeply connected to their context. Our work blends modern aesthetics with respect for nature and local culture.
        </p>
        <p className="text-neutral-700 dark:text-neutral-300">
          We approach each project holistically – from urban analysis and architectural form to interior detailing and material selection. Our goal is to create homes and spaces that inspire, nurture and endure.
        </p>
      </section>
      {/* Timeline */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Journey</h2>
        <div className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-6 space-y-6">
          {timeline.map((item) => (
            <div key={item.year} className="relative">
              <span className="absolute -left-3 top-0 w-3 h-3 bg-accent-olive dark:bg-accent-copper rounded-full"></span>
              <h3 className="text-lg font-semibold">{item.year} – {item.title}</h3>
              <p className="text-neutral-700 dark:text-neutral-300">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Team */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {team.map((member) => (
            <div key={member.name} className="text-center bg-white dark:bg-neutral-700 p-6 rounded-lg shadow hover:shadow-lg transition">
              <Image
                src={member.image}
                alt={member.name}
                width={200}
                height={200}
                className="w-32 h-32 rounded-full object-cover mx-auto mb-4"
              />
              <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
              <p className="text-sm text-accent-olive dark:text-accent-copper mb-2">{member.role}</p>
              <p className="text-sm text-neutral-700 dark:text-neutral-300">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
