"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./Icons";
import { getLocale, Language, languageNames } from "@/lib/content";

const slugs = ["services", "case-studies", "about", "experts", "certifications", "insights"];

export function Header({ lang, nav, consult }: { lang: Language; nav: string[]; consult: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const copy = getLocale(lang);
  const localizedPath = (code: string) =>
    pathname.replace(/^\/(en|ua)(?=\/|$)/, `/${code}`) || `/${code}`;

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link href={`/${lang}`} className="logo" aria-label={copy.accessibility.home}>
          <span className="logo-mark"><span /></span>
          <span>LyoPro</span>
        </Link>
        <nav className={open ? "nav-links open" : "nav-links"} aria-label={copy.accessibility.navigation}>
          {nav.map((label, i) => (
            <Link key={slugs[i]} href={`/${lang}/${slugs[i]}`} onClick={() => setOpen(false)}>
              {label}
            </Link>
          ))}
          <div className="mobile-actions">
            <Link href={`/${lang}/contact`} className="button button-dark">{consult}<Icon name="arrow" /></Link>
          </div>
        </nav>
        <div className="nav-actions">
          <div className="language-switcher" aria-label={copy.accessibility.language}>
            <button type="button">{languageNames[lang]} <span>⌄</span></button>
            <div className="language-menu">
              {Object.entries(languageNames).map(([code, label]) => (
                <Link key={code} href={localizedPath(code)}>{label}</Link>
              ))}
            </div>
          </div>
          <Link href={`/${lang}/contact`} className="header-cta">{consult}<Icon name="arrow" /></Link>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={copy.accessibility.menu}>
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}
