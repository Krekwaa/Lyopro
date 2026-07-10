import Link from "next/link";
import { getLocale, Language } from "@/lib/content";
import { Icon } from "./Icons";

export function Footer({ lang }: { lang: Language }) {
  const copy = getLocale(lang).footer;
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-brand">
          <Link href={`/${lang}`} className="logo logo-light"><span className="logo-mark"><span /></span><span>LyoPro</span></Link>
          <p>{copy.statement}</p>
          <a href="mailto:hello@lyopro.com" className="footer-email">hello@lyopro.com <Icon name="arrow" /></a>
        </div>
        <div className="footer-links">
          <div><span>{copy.expertise}</span><Link href={`/${lang}/services`}>{copy.services}</Link><Link href={`/${lang}/case-studies`}>{copy.cases}</Link><Link href={`/${lang}/certifications`}>{copy.certifications}</Link></div>
          <div><span>{copy.company}</span><Link href={`/${lang}/about`}>{copy.about}</Link><Link href={`/${lang}/experts`}>{copy.experts}</Link><Link href={`/${lang}/insights`}>{copy.insights}</Link></div>
          <div><span>{copy.connect}</span><Link href={`/${lang}/contact`}>{copy.contact}</Link><a href="mailto:hello@lyopro.com">{copy.email}</a><a href="#" aria-label="LinkedIn">LinkedIn</a></div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} LyoPro. {copy.region}</span>
        <div><Link href={`/${lang}/privacy`}>{copy.privacy}</Link><Link href={`/${lang}/imprint`}>{copy.imprint}</Link></div>
      </div>
    </footer>
  );
}
