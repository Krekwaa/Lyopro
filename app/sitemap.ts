import type { MetadataRoute } from "next";
import { caseStudies } from "@/content/case-studies";
import { languages, pages } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.lyopro.tech";
  return languages.flatMap((lang) => {
    const standardPages = ["", ...pages].map((page) => ({
      url: `${base}/${lang}${page ? `/${page}` : ""}`,
      lastModified: new Date(),
      changeFrequency: page === "insights" ? "weekly" : "monthly",
      priority: page === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          languages.map((locale) => [locale, `${base}/${locale}${page ? `/${page}` : ""}`]),
        ),
      },
    } satisfies MetadataRoute.Sitemap[number]));

    const caseStudyPages = caseStudies.map((caseStudy) => ({
      url: `${base}/${lang}/case-studies/${caseStudy.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          languages.map((locale) => [locale, `${base}/${locale}/case-studies/${caseStudy.slug}`]),
        ),
      },
    }));

    return [...standardPages, ...caseStudyPages];
  });
}
