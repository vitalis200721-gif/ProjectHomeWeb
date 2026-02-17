import { Project } from "./data";

export interface FinderAnswers {
  style?: string;
  type?: string;
  bedrooms?: number;
  budgetBand?: "Low" | "Mid" | "High" | "Premium";
  mustHaves?: string[];
  location?: string;
  interiorVibe?: string;
}

/**
 * Simple scoring function that assigns a score to each project based on the provided answers.
 * It rewards matches on style, type, budget and must-have features.
 */
export function matchProjects(projects: Project[], answers: FinderAnswers): Project[] {
  return projects
    .map((project) => {
      let score = 0;
      if (answers.style && project.style.toLowerCase() === answers.style.toLowerCase()) {
        score += 3;
      }
      if (answers.type && project.type.toLowerCase() === answers.type.toLowerCase()) {
        score += 2;
      }
      if (answers.bedrooms) {
        // Deduct points if bedroom count differs significantly; closer is better
        const diff = Math.abs(project.bedrooms - answers.bedrooms);
        score += Math.max(0, 2 - diff);
      }
      if (answers.budgetBand && project.budgetBand === answers.budgetBand) {
        score += 2;
      }
      if (answers.mustHaves && answers.mustHaves.length > 0) {
        const matches = project.mustHaves.filter((mh) =>
          answers.mustHaves!.some((ans) => ans.toLowerCase() === mh.toLowerCase())
        ).length;
        score += matches;
      }
      return { project, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((entry) => entry.project);
}
