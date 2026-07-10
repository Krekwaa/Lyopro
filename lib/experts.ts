import { readdir } from "node:fs/promises";
import path from "node:path";
import type { ExpertContent } from "@/content/experts/types";

const expertsDirectory = path.join(process.cwd(), "content", "experts");
const ignoredFiles = new Set(["types.ts", "types.tsx"]);

async function loadExpertFile(fileName: string): Promise<ExpertContent> {
  const moduleName = fileName.replace(/\.tsx?$/, "");
  const mod = await import(`../content/experts/${moduleName}`);
  return mod.expert as ExpertContent;
}

export async function getAllExperts() {
  const files = await readdir(expertsDirectory);
  const expertFiles = files
    .filter(file => /\.tsx?$/.test(file))
    .filter(file => !ignoredFiles.has(file))
    .sort();

  const experts = await Promise.all(expertFiles.map(loadExpertFile));
  return experts.sort((first, second) => first.name.localeCompare(second.name));
}

export async function getExpertSlugs() {
  const experts = await getAllExperts();
  return experts.map(expert => expert.slug);
}

export async function getExpertBySlug(slug: string) {
  const experts = await getAllExperts();
  return experts.find(expert => expert.slug === slug);
}
