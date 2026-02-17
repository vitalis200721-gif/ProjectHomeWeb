import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { projects } from "@/lib/data";
import { GalleryGrid } from "@/components/GalleryGrid";
import { ProjectCard } from "@/components/ProjectCard";

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) notFound();

  const related = projects
    .filter((p) => p.style === project.style && p.slug !== project.slug)
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      {/* Hero */}
      <div className="relative h-[40vh] rounded-lg overflow-hidden">
        <Image
          src={project.images?.[0] || "/media/img-001.jpg"}
          alt={project.title}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
        <div className="absolute bottom-4 left-4 z-10">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div>
          <h4 className="font-semibold">Style</h4>
          <p>{project.style}</p>
        </div>
        <div>
          <h4 className="font-semibold">Type</h4>
          <p>{project.type}</p>
        </div>
        <div>
          <h4 className="font-semibold">Bedrooms</h4>
          <p>{project.bedrooms}</p>
        </div>
        <div>
          <h4 className="font-semibold">Budget</h4>
          <p>{project.budgetBand}</p>
        </div>
      </div>

      {/* Description */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Overview</h2>
        <p className="text-neutral-700 dark:text-neutral-300 mb-4">
          {project.description}
        </p>

        {project.designIntent && (
          <>
            <h3 className="text-xl font-semibold mb-2">Design Intent</h3>
            <p className="text-neutral-700 dark:text-neutral-300">
              {project.designIntent}
            </p>
          </>
        )}
      </div>

      {/* Materials */}
      {project.materials?.length ? (
        <div>
          <h2 className="text-2xl font-semibold mb-2">Materials Palette</h2>
          <div className="flex flex-wrap gap-2">
            {project.materials.map((mat) => (
              <span
                key={mat}
                className="px-3 py-1 bg-neutral-200 dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 rounded-full text-sm"
              >
                {mat}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {/* Full gallery */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
        <GalleryGrid images={project.images || ["/media/img-001.jpg"]} />
      </div>

      {/* CTA */}
      <div className="bg-neutral-100 dark:bg-neutral-800 p-6 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold mb-2">Love this style?</h3>
          <p className="text-neutral-700 dark:text-neutral-300">
            Contact us for a consultation or try the property finder to discover
            similar projects.
          </p>
        </div>
        <div className="flex gap-3 mt-4 sm:mt-0">
          <Link
            href="/contact"
            className="px-4 py-2 bg-accent-olive dark:bg-accent-copper text-white rounded-md hover:opacity-90"
          >
            Request this style
          </Link>
          <Link
            href="/finder"
            className="px-4 py-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-md hover:bg-neutral-300 dark:hover:bg-neutral-600"
          >
            Try Finder
          </Link>
        </div>
      </div>

      {/* Related projects */}
      {related.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">
            Related {project.style} Projects
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
