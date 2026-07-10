export type ExpertContent = {
  slug: string;
  name: string;
  role: string;
  shortDescription: string;
  yearsExperience: string;
  heroImage: string;
  tags: string[];
  executiveSummary: string[];
  expertise: {
    title: string;
    description: string;
  }[];
  industries: string[];
  certifications: string[];
  engagements: string[];
  technologies: string[];
  quote: string;
  linkedin: string;
  email: string;
  callToAction: {
    title: string;
    text: string;
    buttonLabel: string;
  };
};
