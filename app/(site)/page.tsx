"use client";

import { projects, galleryImages, testimonials, blogPosts } from "@/lib/data";
import { ProjectCard } from "@/components/ProjectCard";
import { FinderWizard } from "@/components/FinderWizard";
import { GalleryGrid } from "@/components/GalleryGrid";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Reveal } from "@/components/Reveal";
import { HeroUltra } from "@/components/HeroUltra";


function pickLocalFallback(i: number) {
  // iš tavo /public/media turėtų būti img-001.jpg ... img-090.jpg
  const n = ((i % 90) + 1).toString().padStart(3, "0");
  return `/media/img-${n}.jpg`;
}

function normalizeImg(src: string | undefined, idx: number) {
  // Jei data.ts dar turi https://... – neleidžiam Next/Image sprogt.
  if (!src) return pickLocalFallback(idx);
  if (src.startsWith("http")) return pickLocalFallback(idx);
  return src;
}

export default function HomePage() {
  // ✅ garantuojam, kad galerija visada turi 10 elementų (be skylučių)
  const desiredGallery = 12;
  const baseGallery = (galleryImages || [])
    .filter(Boolean)
    .map((s, i) => normalizeImg(s, i));
  const filledGallery = baseGallery.slice(0, desiredGallery);

  while (filledGallery.length < desiredGallery) {
    filledGallery.push(pickLocalFallback(filledGallery.length));
  }

  // ✅ “Signature Styles” kortoms – stabilūs paveiksliukai
  const styles = [
    "Modern",
    "Scandinavian",
    "Industrial",
    "Classic",
    "Luxury",
    "Minimal",
    "Eco",
    "Tropical",
  ];

  return (
    <div className="space-y-24">
      {/* HERO (FULL PRO CINEMATIC) */}
      <HeroUltra />


      {/* SIGNATURE STYLES */}
      <section className="max-w-7xl mx-auto px-4">
        <Reveal>
          <h2 className="text-3xl font-semibold mb-2">Signature Styles</h2>
        </Reveal>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6">
          Explore curated aesthetics—each one designed to feel timeless,
          premium, and lived-in.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {styles.map((style, idx) => {
            const p = projects.find((x) => x.style === style);
            const cover = normalizeImg(p?.images?.[0], idx);

            return (
              <Link
                key={style}
                href={`/projects?style=${encodeURIComponent(style)}`}
                className="group relative overflow-hidden rounded-2xl shadow hover:shadow-xl transition"
              >
                <Image
                  src={cover}
                  alt={style}
                  width={700}
                  height={520}
                  className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-90" />
                <div className="absolute inset-0 flex items-end justify-between p-4">
                  <span className="text-white text-lg font-semibold drop-shadow">
                    {style}
                  </span>
                  <span className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    View →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* TRUSTED */}
      <section className="bg-neutral-100 dark:bg-neutral-800 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <Reveal>
            <h2 className="text-2xl font-semibold mb-3">
              Trusted by Innovators
            </h2>
          </Reveal>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8">
            We collaborate with forward-thinking partners to bring your vision
            to life.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-3">
            {["Airbnb", "Google", "Apple", "Tesla", "Nike", "Adobe"].map(
              (brand) => (
                <span
                  key={brand}
                  className="px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 text-sm
                text-neutral-700 dark:text-neutral-200 bg-white/80 dark:bg-neutral-950/30 backdrop-blur shadow-sm"
                >
                  {brand}
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between gap-6 mb-6">
          <div>
            <Reveal>
              <h2 className="text-3xl font-semibold">Featured Projects</h2>
            </Reveal>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">
              A selection of homes that balance architecture, comfort, and mood.
            </p>
          </div>
          <Link
            href="/projects"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-200 hover:opacity-80"
          >
            View all <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.slice(0, 6).map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.04 }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* STORY / PROCESS */}
      <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <h2 className="text-3xl font-semibold mb-3">
              From Concept to Keys
            </h2>
          </Reveal>
          <p className="text-neutral-600 dark:text-neutral-400 mb-10 max-w-3xl">
            A clear, premium process—from first ideas to final delivery—so you
            feel confident at every step.
          </p>

          <div className="space-y-12">
            {[
              {
                title: "Consultation",
                text: "We listen to your dreams and define a clear brief, exploring styles, budgets and functionality.",
                image: "/media/img-062.jpg",
              },
              {
                title: "Design & Develop",
                text: "Our architects and interior designers craft detailed concepts, 3D models and material palettes.",
                image: "/media/img-063.jpg",
              },
              {
                title: "Build & Deliver",
                text: "We oversee construction and installation, ensuring quality and precision at every stage.",
                image: "/media/img-064.jpg",
              },
            ].map((step, idx) => (
              <div
                key={step.title}
                className={`flex flex-col ${idx % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-8`}
              >
                <motion.div
                  className="w-full md:w-1/2"
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={900}
                      height={650}
                      className="w-full h-auto object-cover"
                    />
                    <div className="absolute inset-0 ring-1 ring-black/10 dark:ring-white/10 rounded-2xl" />
                  </div>
                </motion.div>

                <motion.div
                  className="w-full md:w-1/2"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: idx * 0.1 + 0.15 }}
                >
                  <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-neutral-700 dark:text-neutral-300">
                    {step.text}
                  </p>

                  <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 dark:text-neutral-200">
                    Learn more <span aria-hidden>→</span>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4">
        <Reveal>
          <h2 className="text-3xl font-semibold mb-3">Interior Inspiration</h2>
        </Reveal>
        <p className="text-neutral-600 dark:text-neutral-400 mb-6 max-w-3xl">
          Materials, light and composition—browse a curated gallery to spark
          your next project.
        </p>

        {/* ✅ FIX: niekada neliks “2 paveiksliukai neuždėti” */}
        <GalleryGrid images={filledGallery} />

        <div className="mt-6 text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center justify-center px-5 py-2.5 bg-accent-olive dark:bg-accent-copper !text-white font-semibold rounded-md hover:opacity-90 relative"
          >
            <span className="relative z-10">View full gallery</span>
          </Link>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-12 bg-neutral-100 dark:bg-neutral-800">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <h2 className="text-3xl font-semibold mb-3">Our Services</h2>
          </Reveal>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-3xl">
            End-to-end design—from architecture to interiors—with premium
            supervision and detail-first execution.
          </p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Architecture",
                text: "From concept to construction, we design bespoke spaces tailored to your lifestyle.",
                icon: "🏛️",
              },
              {
                title: "Interior Design",
                text: "Thoughtful interiors that balance form, function and emotion.",
                icon: "🛋️",
              },
              {
                title: "Renovation",
                text: "Transform existing spaces with modern finishes and improved layouts.",
                icon: "🔨",
              },
              {
                title: "Consultation",
                text: "Expert advice on materials, sustainability and design trends.",
                icon: "💡",
              },
            ].map((svc, i) => (
              <motion.div
                key={svc.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.05 }}
                className="bg-white/90 dark:bg-neutral-700 p-6 rounded-2xl shadow hover:shadow-xl transition border border-black/5 dark:border-white/10"
              >
                <div className="text-3xl mb-4">{svc.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{svc.title}</h3>
                <p className="text-sm text-neutral-700 dark:text-neutral-300">
                  {svc.text}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-accent-olive dark:bg-accent-copper !text-white font-semibold rounded-md hover:opacity-90 relative"
            >
              <span className="relative z-10">View all services</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="max-w-7xl mx-auto px-4">
        <Reveal>
          <h2 className="text-3xl font-semibold mb-3">Our Packages</h2>
        </Reveal>
        <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-3xl">
          Choose a level of involvement—quick concept, full management, or elite
          end-to-end.
        </p>

        <div className="grid gap-6 sm:grid-cols-3">
          {[
            {
              name: "Essential",
              price: "€3k+",
              features: [
                "Initial consultation",
                "Concept sketches",
                "Material moodboard",
              ],
            },
            {
              name: "Signature",
              price: "€10k+",
              features: [
                "Detailed 3D model",
                "Full project management",
                "Custom furniture design",
              ],
              popular: true,
            },
            {
              name: "Elite",
              price: "€20k+",
              features: [
                "Unlimited revisions",
                "On-site supervision",
                "Post-completion styling",
              ],
            },
          ].map((pkg, i) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className={`relative bg-white dark:bg-neutral-700 p-6 rounded-2xl shadow-lg flex flex-col border ${
                pkg.popular
                  ? "border-accent-olive dark:border-accent-copper"
                  : "border-black/5 dark:border-white/10"
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent-olive dark:bg-accent-copper text-white text-xs px-3 py-1 rounded-full">
                  Most popular
                </span>
              )}

              <h3 className="text-2xl font-semibold mb-2 text-center">
                {pkg.name}
              </h3>
              <p className="text-center text-3xl font-bold mb-4">{pkg.price}</p>

              <ul className="space-y-2 flex-grow">
                {pkg.features.map((feat) => (
                  <li
                    key={feat}
                    className="text-sm text-neutral-700 dark:text-neutral-300 flex items-center gap-2"
                  >
                    <span aria-hidden>✔️</span> {feat}
                  </li>
                ))}
              </ul>

              <div className="mt-5 text-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-4 py-2 bg-accent-olive dark:bg-accent-copper !text-white font-semibold rounded-md hover:opacity-90 relative"
                >
                  <span className="relative z-10">Choose package</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINDER */}
      <section className="py-12 bg-neutral-100 dark:bg-neutral-800">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="md:w-1/2">
            <Reveal>
              <h2 className="text-3xl font-semibold mb-3">
                Find Your Ideal Home
              </h2>
            </Reveal>
            <p className="mb-5 text-neutral-700 dark:text-neutral-300">
              Try our AI-powered property finder to receive personalized
              suggestions based on your style, budget, and must-haves.
            </p>

            <Link
              href="/finder"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-accent-olive dark:bg-accent-copper !text-white font-semibold rounded-md hover:opacity-90 relative"
            >
              <span className="relative z-10">Start the wizard</span>
            </Link>
          </div>

          <div className="md:w-1/2 w-full">
            <div className="rounded-2xl border border-black/5 dark:border-white/10 bg-white/80 dark:bg-neutral-950/20 backdrop-blur shadow-lg p-4">
              <FinderWizard />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4">
        <Reveal>
          <h2 className="text-3xl font-semibold mb-6">What Our Clients Say</h2>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: idx * 0.04 }}
              className="bg-white dark:bg-neutral-700 p-6 rounded-2xl shadow border border-black/5 dark:border-white/10 flex flex-col"
            >
              <p className="italic flex-grow text-neutral-700 dark:text-neutral-300">
                “{t.text}”
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-semibold">{t.name}</span>
                <span className="text-accent-olive dark:text-accent-copper">
                  {Array.from({ length: Math.round(t.rating) }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BLOG */}
      <section className="py-12 bg-neutral-100 dark:bg-neutral-800">
        <div className="max-w-6xl mx-auto px-4">
          <Reveal>
            <h2 className="text-3xl font-semibold mb-3">
              Insights & Inspiration
            </h2>
          </Reveal>
          <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-3xl">
            Short reads on design, materials, sustainability and the future of
            living.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {blogPosts.slice(0, 3).map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.05 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="bg-white dark:bg-neutral-700 rounded-2xl overflow-hidden shadow hover:shadow-xl transition flex flex-col border border-black/5 dark:border-white/10"
                >
                  <Image
                    src={normalizeImg(post.image, i + 30)}
                    alt={post.title}
                    width={800}
                    height={520}
                    className="h-44 w-full object-cover"
                  />
                  <div className="p-5 flex flex-col flex-grow">
                    <span className="text-xs uppercase text-accent-olive dark:text-accent-copper mb-2">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-semibold mb-2 flex-grow">
                      {post.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                      {post.excerpt}
                    </p>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-auto">
                      {post.readingTime}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center justify-center px-5 py-2.5 bg-accent-olive dark:bg-accent-copper !text-white font-semibold rounded-md hover:opacity-90 relative"
            >
              <span className="relative z-10">Read more articles</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-24 overflow-hidden">
        <Image
          src="/media/img-065.jpg"
          alt="Final CTA background"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/70" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <Reveal>
            <h2 className="text-4xl font-bold font-serif mb-4 text-white">
              Ready to Craft Your Dream Home?
            </h2>
          </Reveal>

          <p className="mb-8 text-lg text-white/85">
            Let us help you transform your vision into reality. Reach out to
            start your journey.
          </p>

          {/* ✅ FIX: button tekstas visada matomas */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="px-5 py-3 rounded-md hover:opacity-90 bg-accent-olive dark:bg-accent-copper !text-white font-semibold relative"
            >
              <span className="relative z-10">Request a Consultation</span>
            </Link>

            <Link
              href="/lookbook"
              className="px-5 py-3 rounded-md hover:bg-white/20 border border-white/25 bg-white/10 !text-white font-semibold backdrop-blur relative"
            >
              <span className="relative z-10">Download Lookbook</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
