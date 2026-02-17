"use client";

import { useMemo, useState } from "react";
import { projects, Project } from "@/lib/data";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectFilters, FilterState } from "@/components/ProjectFilters";

export default function ProjectsPage() {
  const [filters, setFilters] = useState<FilterState>({});

  const filteredProjects = useMemo(() => {
    return projects
      .filter((p) => {
        if (filters.style && p.style !== filters.style) return false;
        if (filters.type && p.type !== filters.type) return false;
        if (filters.bedrooms && p.bedrooms !== filters.bedrooms) return false;
        if (filters.budgetBand && p.budgetBand !== filters.budgetBand) return false;
        if (filters.mustHaves && filters.mustHaves.length > 0) {
          const matches = filters.mustHaves.every((mh) => p.mustHaves.includes(mh));
          if (!matches) return false;
        }
        if (filters.search) {
          const query = filters.search.toLowerCase();
          if (!p.title.toLowerCase().includes(query) && !p.description.toLowerCase().includes(query)) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (!filters.sort || filters.sort === "") return 0;
        if (filters.sort === "newest") {
          return 0; // no date field; keep current order
        }
        if (filters.sort === "budget-low-high") {
          const order = { Low: 0, Mid: 1, High: 2, Premium: 3 } as any;
          return order[a.budgetBand] - order[b.budgetBand];
        }
        if (filters.sort === "budget-high-low") {
          const order = { Low: 0, Mid: 1, High: 2, Premium: 3 } as any;
          return order[b.budgetBand] - order[a.budgetBand];
        }
        return 0;
      });
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-semibold mb-6">Projects</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters sidebar */}
        <aside className="md:w-1/4">
          <ProjectFilters onChange={(state) => setFilters(state)} />
        </aside>
        {/* Results */}
        <div className="md:w-3/4 flex flex-col">
          <p className="mb-4 text-neutral-600 dark:text-neutral-400">
            {filteredProjects.length} project{filteredProjects.length !== 1 && "s"} found
          </p>
          {filteredProjects.length === 0 ? (
            <p className="text-neutral-600 dark:text-neutral-400">
              No projects match your criteria. Try adjusting your filters.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((p: Project) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
