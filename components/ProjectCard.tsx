"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import type { Project } from "@/lib/data";
// Jei turi "Save" mygtuką – palik. Jei neturi, tiesiog užkomentuok importą ir komponentą žemiau.
// import { SaveProjectButton } from "@/components/SaveProjectButton";

function cx(...classes: Array<string | false | undefined | null>) {
  return classes.filter(Boolean).join(" ");
}

function BudgetPill({ band }: { band: Project["budgetBand"] }) {
  const map: Record<Project["budgetBand"], string> = {
    Low: "bg-neutral-900/70 text-white border-white/15",
    Mid: "bg-white/10 text-white border-white/20",
    High: "bg-emerald-500/20 text-white border-emerald-300/25",
    Premium: "bg-amber-500/20 text-white border-amber-300/25",
  };

  return (
    <span
      className={cx(
        "inline-flex items-center rounded-full px-3 py-1 text-[11px] sm:text-xs border backdrop-blur",
        map[band]
      )}
    >
      {band}
    </span>
  );
}

/**
 * ULTRA EXPERIENCE:
 * - glow seka pelę (CSS variables)
 * - magnetic hover (motion values + spring)
 * - subtle light sweep + premium border
 */
export function ProjectCard({ project }: { project: Project }) {
  const cover = project.images?.[0] || "/media/img-001.jpg";

  // Magnetic hover (translate based on cursor)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();

    // Cursor position in element
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;

    // Set CSS vars for glow
    el.style.setProperty("--mx", `${px}px`);
    el.style.setProperty("--my", `${py}px`);

    // Magnetic: normalize -0.5..0.5 then scale
    const nx = (px / r.width - 0.5) * 2;
    const ny = (py / r.height - 0.5) * 2;

    mx.set(nx * 10); // magnet strength
    my.set(ny * 10);
  }

  function onLeave(e: React.MouseEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    // Center glow softly when leaving
    el.style.setProperty("--mx", `50%`);
    el.style.setProperty("--my", `50%`);

    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      style={{ x, y }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className={cx(
        "group relative overflow-hidden rounded-2xl",
        "bg-white/80 dark:bg-neutral-900/50 backdrop-blur",
        "border border-black/5 dark:border-white/10",
        "shadow-lg hover:shadow-2xl transition-shadow"
      )}
    >
      {/* Glow layer (follows mouse) */}
      <div
        className={cx(
          "pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        )}
        style={{
          background:
            "radial-gradient(650px circle at var(--mx, 50%) var(--my, 50%), rgba(255,255,255,0.12), transparent 45%)",
        }}
      />

      {/* Premium border highlight */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5 dark:ring-white/10" />

      {/* Light sweep */}
      <div
        className={cx(
          "pointer-events-none absolute -inset-x-24 -top-24 h-40 rotate-12",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        )}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)",
        }}
      />

      <Link href={`/projects/${project.slug}`} className="block">
        {/* Image */}
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={cover}
            alt={project.title}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.06]"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/70" />

          {/* Top row */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3">
            <span className="inline-flex rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] sm:text-xs text-white backdrop-blur">
              {project.style} • {project.type}
            </span>

            <div className="flex items-center gap-2">
              <BudgetPill band={project.budgetBand} />

              {/* SAVE BUTTON (optional) */}
              {/*
              <div className="ml-1">
                <SaveProjectButton projectId={project.slug} />
              </div>
              */}
            </div>
          </div>

          {/* Bottom title */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-end justify-between gap-3">
              <div>
                <h3 className="text-white text-lg font-semibold leading-tight drop-shadow">
                  {project.title}
                </h3>
                <p className="text-white/80 text-xs sm:text-sm">
                  {project.bedrooms} bd • {project.size} m² • {project.buildTime}
                </p>
              </div>

              <span className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90 backdrop-blur">
                View →
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-5">
          <p className="text-sm text-neutral-700 dark:text-neutral-300 line-clamp-2">
            {project.description}
          </p>

          {/* Must-haves */}
          <div className="mt-4 flex flex-wrap gap-2">
            {(project.mustHaves || []).slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50/80 dark:bg-neutral-950/30 px-3 py-1 text-[11px] text-neutral-700 dark:text-neutral-200 backdrop-blur"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* Subtle bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/5 to-transparent dark:from-white/5" />
    </motion.div>
  );
}
