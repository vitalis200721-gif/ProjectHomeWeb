"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/lib/data";
import { SaveProjectButton } from "@/components/SaveProjectButton";

function BudgetPill({ band }: { band: Project["budgetBand"] }) {
  const map: Record<Project["budgetBand"], string> = {
    Low: "bg-neutral-900/70 text-white border-white/15",
    Mid: "bg-white/10 text-white border-white/20",
    High: "bg-emerald-500/20 text-white border-emerald-300/25",
    Premium: "bg-amber-500/20 text-white border-amber-300/25",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] sm:text-xs border backdrop-blur ${map[band]}`}
    >
      {band}
    </span>
  );
}

export function ProjectCard({ project }: { project: Project }) {
  const cover = project.images?.[0] || "/media/img-001.jpg";

  // ✅ IMPORTANT:
  // SavedProject.projectId yra String — mes naudosim project.slug kaip projectId
  const projectId = project.slug;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="group relative overflow-hidden rounded-xl bg-white dark:bg-neutral-800 shadow hover:shadow-xl transition-shadow"
    >
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/65 opacity-100" />

          {/* Top row */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3">
            <span className="inline-flex rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] sm:text-xs text-white backdrop-blur">
              {project.style} • {project.type}
            </span>

            <div className="flex items-center gap-2">
              <BudgetPill band={project.budgetBand} />
            </div>
          </div>

          {/* ✅ SAVE BUTTON (top-right corner, separate so it doesn't navigate) */}
          <div
            className="absolute top-4 right-4 z-20"
            onClick={(e) => e.preventDefault()}
            onMouseDown={(e) => e.preventDefault()}
          >
            <SaveProjectButton projectId={projectId} />
          </div>

          {/* Bottom title */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="flex items-end justify-between gap-3">
              <div>
                <h3 className="text-white text-lg font-semibold leading-tight">
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
                className="rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900/40 px-3 py-1 text-[11px] text-neutral-700 dark:text-neutral-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
