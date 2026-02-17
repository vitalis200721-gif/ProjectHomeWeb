"use client";

import Image from "next/image";
import React, { useMemo, useState } from "react";

type GalleryGridProps = {
  images: string[];
  /** "masonry" = skirtingi aukščiai (columns), "uniform" = vienodas aukštis visiems */
  variant?: "masonry" | "uniform";
  /** tik uniform režimui. pvz: "16/10", "4/3", "1/1" */
  ratio?: string;
  /** jei nori mažesnių / didesnių tarpų */
  gapClassName?: string;
};

function isRemote(src: string) {
  return /^https?:\/\//i.test(src);
}

function Lightbox({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative w-full max-w-6xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 rounded-full bg-white/10 hover:bg-white/20 text-white px-4 py-2 text-sm border border-white/20"
        >
          Close ✕
        </button>

        <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
          {/* 16:9 lightbox */}
          <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
            <Image
              src={src}
              alt="Gallery image"
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function GalleryGrid({
  images,
  variant = "uniform",
  ratio = "16/10",
  gapClassName = "gap-4",
}: GalleryGridProps) {
  const [active, setActive] = useState<string | null>(null);

  // šiek tiek random “masonry” efektui (jei pasirinksi masonry)
  const masonryRatios = useMemo(
    () => ["16/10", "4/3", "3/4", "1/1", "21/9", "5/4"],
    []
  );

  return (
    <>
      {/* === LAYOUT === */}
      {variant === "masonry" ? (
        // Masonry (kaip tavo screenshot’e): columns
        <div className={`columns-1 sm:columns-2 lg:columns-3 ${gapClassName} space-y-4`}>
          {images.map((src, i) => {
            const r = masonryRatios[i % masonryRatios.length];
            return (
              <button
                key={`${src}-${i}`}
                type="button"
                onClick={() => setActive(src)}
                className="group relative w-full overflow-hidden rounded-2xl cursor-pointer break-inside-avoid mb-4 text-left"
              >
                <div
                  className="relative w-full bg-neutral-900/10"
                  style={{ aspectRatio: r }}
                >
                  <Image
                    src={src}
                    alt={`Gallery image ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    // jei remote — Next kartais lėčiau; local - OK
                    priority={!isRemote(src) && i < 3}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition" />
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        // Uniform (TAVO norimas): visi vienodo aukščio
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${gapClassName}`}>
          {images.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              onClick={() => setActive(src)}
              className="group relative w-full overflow-hidden rounded-2xl cursor-pointer text-left"
            >
              <div
                className="relative w-full bg-neutral-900/10"
                style={{ aspectRatio: ratio }}
              >
                <Image
                  src={src}
                  alt={`Gallery image ${i + 1}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  priority={!isRemote(src) && i < 3}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition" />
              </div>

              {/* mini label (optional) */}
              <div className="pointer-events-none absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition">
                <span className="rounded-full bg-white/10 text-white text-xs px-3 py-1 border border-white/15 backdrop-blur">
                  View →
                </span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* === LIGHTBOX === */}
      {active && <Lightbox src={active} onClose={() => setActive(null)} />}
    </>
  );
}
