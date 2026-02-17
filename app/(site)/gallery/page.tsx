"use client";

import { useState } from "react";
import { galleryImages } from "@/lib/data";
import { GalleryGrid } from "@/components/GalleryGrid";

const categories = [
  { label: "All", filter: () => true },
  { label: "Interiors", filter: (_: string, idx: number) => idx % 2 === 0 },
  { label: "Exteriors", filter: (_: string, idx: number) => idx % 2 === 1 },
  { label: "Bedrooms", filter: (_: string, idx: number) => idx % 3 === 0 },
  { label: "Living Rooms", filter: (_: string, idx: number) => idx % 3 === 1 },
  { label: "Kitchens", filter: (_: string, idx: number) => idx % 3 === 2 },
];

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const currentCategory = categories.find((c) => c.label === active)!;
  const filteredImages = galleryImages.filter(currentCategory.filter);
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Gallery</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => setActive(cat.label)}
            className={`px-3 py-1 rounded-full text-sm border ${active === cat.label
              ? "bg-accent-olive dark:bg-accent-copper text-white border-transparent"
              : "bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border-neutral-300 dark:border-neutral-600"}
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <GalleryGrid images={filteredImages} />
    </div>
  );
}
