"use client";

import { useState } from "react";
import { matchProjects, FinderAnswers } from "@/lib/finder";
import { projects } from "@/lib/data";
import { ProjectCard } from "./ProjectCard";

const steps = [
  {
    key: "style",
    question: "What architectural style do you prefer?",
    options: ["Modern", "Scandinavian", "Industrial", "Classic", "Luxury", "Minimal", "Eco", "Tropical", "Rustic", "Coastal", "Urban"],
  },
  {
    key: "type",
    question: "What type of space are you looking for?",
    options: ["Apartment", "House", "Villa", "Loft", "Cabin"],
  },
  {
    key: "bedrooms",
    question: "How many bedrooms do you need?",
    options: ["1", "2", "3", "4", "5+"],
  },
  {
    key: "budgetBand",
    question: "What is your budget range?",
    options: ["Low", "Mid", "High", "Premium"],
  },
  {
    key: "mustHaves",
    question: "Select must-have features (choose up to 3)",
    options: [
      "Natural light",
      "Open plan",
      "Smart home",
      "Garden",
      "Garage",
      "Sustainability",
    ],
  },
];

export function FinderWizard() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<FinderAnswers>({});
  const [result, setResult] = useState<ReturnType<typeof matchProjects> | null>(null);

  const current = steps[step];

  function handleSelect(option: string) {
    const key = current.key as keyof FinderAnswers;
    setAnswers((prev) => {
      const updated: any = { ...prev };
      if (key === "mustHaves") {
        const currentList: string[] = prev.mustHaves || [];
        if (currentList.includes(option)) {
          updated.mustHaves = currentList.filter((x) => x !== option);
        } else {
          if (currentList.length < 3) {
            updated.mustHaves = [...currentList, option];
          }
        }
      } else if (key === "bedrooms") {
        updated.bedrooms = option === "5+" ? 5 : parseInt(option);
      } else {
        updated[key] = option;
      }
      return updated;
    });
  }

  function handleNext() {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      // Final step: compute results
      const matches = matchProjects(projects, answers);
      setResult(matches);
    }
  }

  function handleReset() {
    setStep(0);
    setAnswers({});
    setResult(null);
  }

  if (result) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Your Personalized Recommendations</h2>
        <p className="mb-4 text-neutral-600 dark:text-neutral-300">
          Based on your preferences, we suggest the following projects:
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {result.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
        <button
          onClick={handleReset}
          className="mt-6 px-4 py-2 bg-accent-olive dark:bg-accent-copper text-white rounded-md hover:opacity-90"
        >
          Start over
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{current.question}</h2>
        <span className="text-sm text-neutral-500 dark:text-neutral-400">
          Step {step + 1} of {steps.length}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {current.options.map((opt) => {
          const key = current.key as keyof FinderAnswers;
          const selected =
            key === "mustHaves"
              ? (answers.mustHaves || []).includes(opt)
              : answers[key] === opt || (key === "bedrooms" && answers[key] === (opt === "5+" ? 5 : parseInt(opt)));
          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              className={`px-3 py-2 rounded-md border text-sm ${selected
                ? "bg-accent-olive dark:bg-accent-copper text-white border-transparent"
                : "bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200"}
              `}
            >
              {opt}
            </button>
          );
        })}
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-accent-olive dark:bg-accent-copper text-white rounded-md hover:opacity-90 disabled:opacity-50"
          disabled={
            current.key === "mustHaves"
              ? (answers.mustHaves || []).length === 0
              : answers[current.key as keyof FinderAnswers] == null
          }
        >
          {step < steps.length - 1 ? "Next" : "See Results"}
        </button>
      </div>
    </div>
  );
}
