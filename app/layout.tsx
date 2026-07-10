import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.lyopro.tech"),
  title: {
    default: "LyoPro — Senior Engineering & Technology Consulting",
    template: "%s — LyoPro",
  },
  description:
    "CTO-level software consulting, architecture, cloud, Salesforce and complex systems engineering for ambitious businesses.",
  openGraph: {
    type: "website",
    title: "LyoPro — Engineering complex software",
    description:
      "Senior architects and CTO-level engineers for mission-critical digital systems.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
