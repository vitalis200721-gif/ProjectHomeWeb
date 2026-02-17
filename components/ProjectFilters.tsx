"use client";

import { useState, useEffect } from "react";
import { projects } from "@/lib/data";

export interface FilterState {
  style?: string;
  type?: string;
  bedrooms?: number;
  budgetBand?: string;
  mustHaves?: string[];
  search?: string;
  sort?: string;
}

interface Props {
  onChange: (state: FilterState) => void;
}

import type { Project } from "@/lib/data";

const uniqueValues = (key: keyof Project) => {
  const values = new Set<string>();
  projects.forEach((p) => values.add((p as any)[key]));
  return Array.from(values) as string[];
};

export function ProjectFilters({ onChange }: Props) {
  const [state, setState] = useState<FilterState>({});
  // call onChange whenever state updates
  useEffect(() => {
    onChange(state);
  }, [state, onChange]);

  function update(key: keyof FilterState, value: any) {
    setState((prev) => ({ ...prev, [key]: value }));
  }

  // Derive unique lists
  const styles = uniqueValues("style");
  const types = uniqueValues("type");
  const budgetBands = uniqueValues("budgetBand");
  const mustHaveOptions = Array.from(new Set(projects.flatMap((p) => p.mustHaves)));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Style */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="style">
            Style
          </label>
          <select
            id="style"
            value={state.style || ""}
            onChange={(e) => update("style", e.target.value || undefined)}
            className="w-full px-3 py-2 border dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
          >
            <option value="">Any</option>
            {styles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>
        {/* Type */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="type">
            Type
          </label>
          <select
            id="type"
            value={state.type || ""}
            onChange={(e) => update("type", e.target.value || undefined)}
            className="w-full px-3 py-2 border dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
          >
            <option value="">Any</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        {/* Bedrooms */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="bedrooms">
            Bedrooms
          </label>
          <select
            id="bedrooms"
            value={state.bedrooms ?? ""}
            onChange={(e) => update("bedrooms", e.target.value ? parseInt(e.target.value) : undefined)}
            className="w-full px-3 py-2 border dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
          >
            <option value="">Any</option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        {/* Budget */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="budgetBand">
            Budget
          </label>
          <select
            id="budgetBand"
            value={state.budgetBand || ""}
            onChange={(e) => update("budgetBand", e.target.value || undefined)}
            className="w-full px-3 py-2 border dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
          >
            <option value="">Any</option>
            {budgetBands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
        {/* Must Haves */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Must-haves</label>
          <div className="flex flex-wrap gap-2">
            {mustHaveOptions.map((opt) => {
              const selected = (state.mustHaves || []).includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    setState((prev) => {
                      const list = prev.mustHaves || [];
                      if (list.includes(opt)) {
                        return { ...prev, mustHaves: list.filter((v) => v !== opt) };
                      }
                      return { ...prev, mustHaves: [...list, opt] };
                    });
                  }}
                  className={`text-xs px-3 py-1 rounded-full border ${selected
                    ? "bg-accent-olive dark:bg-accent-copper text-white border-transparent"
                    : "bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-neutral-800 dark:text-neutral-200"}
                  `}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>
        {/* Search */}
        <div className="md:col-span-3">
          <label className="block text-sm font-medium mb-1" htmlFor="search">
            Search
          </label>
          <input
            type="text"
            id="search"
            value={state.search || ""}
            onChange={(e) => update("search", e.target.value || undefined)}
            placeholder="Search by name or keyword"
            className="w-full px-3 py-2 border dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
          />
        </div>
        {/* Sort */}
        <div className="md:col-span-3">
          <label className="block text-sm font-medium mb-1" htmlFor="sort">
            Sort by
          </label>
          <select
            id="sort"
            value={state.sort || ""}
            onChange={(e) => update("sort", e.target.value || undefined)}
            className="w-full px-3 py-2 border dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200"
          >
            <option value="">Default (Recommended)</option>
            <option value="newest">Newest</option>
            <option value="budget-low-high">Budget: Low to High</option>
            <option value="budget-high-low">Budget: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}
