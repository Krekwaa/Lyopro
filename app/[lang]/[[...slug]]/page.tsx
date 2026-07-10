import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArchitectureVisual } from "@/components/ArchitectureVisual";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Icon } from "@/components/Icons";
import { expertsPageContent } from "@/content/experts-page";
import { getLocale, languages, pages, type Language, type PageSlug } from "@/lib/content";
import { getAllExperts, getExpertBySlug, getExpertSlugs } from "@/lib/experts";
import type { ExpertContent } from "@/content/experts/types";

type RouteProps = { params: Promise<{ lang: string; slug?: string[] }> };

export const dynamicParams = false;

export async function generateMetadata({ params }: RouteProps): Promise<Metadata> {
  const { lang: rawLang, slug } = await params;
  const lang = languages.includes(rawLang as Language) ? rawLang as Language : "en";
  const page = slug?.[0] as PageSlug | undefined;
  const expert = slug?.[0] === "experts" && slug?.[1] ? await getExpertBySlug(slug[1]) : undefined;
  const copy = getLocale(lang);
  const title = expert ? `${expert.name} | ${expert.role}` : page ? copy.metadata.pageTitles[page] : copy.metadata.homeTitle;
  const canonical = `/${lang}${slug?.length ? `/${slug.join("/")}` : ""}`;

  return {
    title,
    description: expert?.shortDescription ?? (page === "services" ? copy.metadata.servicesDescription : copy.metadata.description),
    alternates: {
      canonical,
      languages: Object.fromEntries(languages.map(code => [code, `/${code}${slug?.length ? `/${slug.join("/")}` : ""}`])),
    },
  };
}

export async function generateStaticParams() {
  const expertSlugs = await getExpertSlugs();
  return languages.flatMap(lang => [
    { lang, slug: undefined },
    ...pages.map(page => ({ lang, slug: [page] })),
    ...expertSlugs.map(slug => ({ lang, slug: ["experts", slug] })),
  ]);
}

export default async function LocalizedPage({ params }: RouteProps) {
  const { lang: rawLang, slug } = await params;
  const validPage = slug?.length ? pages.includes(slug[0] as PageSlug) : true;
  const expert = slug?.length === 2 && slug[0] === "experts" ? await getExpertBySlug(slug[1]) : undefined;
  const validNestedExpert = Boolean(expert);
  if (!languages.includes(rawLang as Language) || !validPage || (slug && slug.length > 1 && !validNestedExpert)) {
    notFound();
  }

  const lang = rawLang as Language;
  const page = slug?.[0] as PageSlug | undefined;
  const copy = getLocale(lang);
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "LyoPro",
    description: copy.metadata.description,
    areaServed: "Europe",
    email: "hello@lyopro.com",
    knowsLanguage: ["English", "Ukrainian"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header lang={lang} nav={[...copy.nav]} consult={copy.consult} />
      <main>{expert ? <ExpertProfilePage lang={lang} expert={expert} /> : page ? <InnerPage page={page} lang={lang} /> : <Home lang={lang} />}</main>
      <Footer lang={lang} />
    </>
  );
}

function Home({ lang }: { lang: Language }) {
  const copy = getLocale(lang);
  const home = copy.home;
  const icons = ["layers", "code", "architecture", "compass", "cloud", "shield"];

  return (
    <>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow"><span />{home.eyebrow}</p>
            <h1>{home.headline}</h1>
            <p className="hero-intro">{home.intro}</p>
            <div className="button-row">
              <Link href={`/${lang}/contact`} className="button button-dark">{copy.consult}<Icon name="arrow" /></Link>
              <Link href={`/${lang}/services`} className="button button-light">{copy.explore}</Link>
            </div>
            <p className="trust-line">{home.trust}</p>
          </div>
          <ArchitectureVisual
            labels={home.visual.labels}
            statusLabel={home.visual.statusLabel}
            status={home.visual.status}
            aria={home.visual.aria}
          />
        </div>
      </section>

      <section className="metrics">
        <div className="metrics-intro"><span>{home.metricsIntro.kicker}</span><p>{home.metricsIntro.text}</p></div>
        {home.metrics.map(([value, label]) => (
          <div className="metric" key={label}><strong>{value}</strong><span>{label}</span></div>
        ))}
      </section>

      <section className="section problems-section">
        <SectionHead kicker={home.problemsKicker} title={home.problemsTitle} />
        <div className="problem-grid">
          {home.problems.map(([title, text], index) => (
            <article className="problem-card" key={title}>
              <div className="problem-icon"><Icon name={icons[index]} /></div>
              <span>0{index + 1}</span><h3>{title}</h3><p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section services-section">
        <SectionHead kicker={home.servicesKicker} title={home.servicesTitle} light />
        <div className="service-list">
          {home.services.map(service => (
            <Link className="service-row" href={`/${lang}/services`} key={service.id}>
              <span className="service-number">{service.id}</span>
              <div><h3>{service.title}</h3><p>{service.summary}</p></div>
              <div className="service-tags">{service.items.map(item => <span key={item}>{item}</span>)}</div>
              <span className="round-arrow"><Icon name="arrow" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section why-section">
        <div className="why-layout">
          <div className="sticky-copy">
            <SectionHead kicker={home.whyKicker} title={home.whyTitle} />
            <p>{home.whyIntro}</p>
            <Link href={`/${lang}/about`} className="text-link">{home.whyLink} <Icon name="arrow" /></Link>
          </div>
          <div className="principles">
            {home.principles.map(([number, title, text]) => (
              <article className="principle" key={number}>
                <span>{number}</span><div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section experts-preview">
        <div className="experts-home-compact">
          <div>
            <p className="eyebrow"><span />{expertsPageContent.homeKicker}</p>
            <h2>{expertsPageContent.homeTitle}</h2>
            <p>{expertsPageContent.homeText}</p>
          </div>
          <Link href={`/${lang}/experts`} className="button button-dark">{expertsPageContent.homeButton} <Icon name="arrow" /></Link>
        </div>
      </section>

      <section className="section cases-section">
        <SectionHead kicker={home.casesKicker} title={home.casesTitle} light />
        <div className="case-grid">
          {home.cases.map(item => (
            <article className="case-card" key={item.number}>
              <div className="case-top"><span>{item.industry}</span><span>{item.number} / 03</span></div>
              <div className="case-diagram"><i /><i /><i /><span /></div>
              <h3>{item.title}</h3><p>{item.text}</p>
              <div className="tag-row">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              <Link href={`/${lang}/case-studies`} className="case-link">{home.caseLink} <Icon name="arrow" /></Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section process-section">
        <SectionHead kicker={home.processKicker} title={home.processTitle} />
        <div className="process">
          {home.process.map(([title, text], index) => (
            <article key={title}><span>0{index + 1}</span><div className="process-dot" /><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <FinalCta lang={lang} title={home.finalTitle} text={home.finalText} />
    </>
  );
}

function InnerPage({ page, lang }: { page: PageSlug; lang: Language }) {
  if (page === "services") return <ServicesPage lang={lang} />;
  if (page === "case-studies") return <CasesPage lang={lang} />;
  if (page === "about") return <AboutPage lang={lang} />;
  if (page === "experts") return <ExpertsPage lang={lang} />;
  if (page === "certifications") return <CertificationsPage lang={lang} />;
  if (page === "insights") return <InsightsPage lang={lang} />;
  if (page === "contact") return <ContactPage lang={lang} />;
  return <LegalPage page={page} lang={lang} />;
}

function PageHero({ kicker, title, text }: { kicker: string; title: string; text: string }) {
  return <section className="page-hero"><p className="eyebrow"><span />{kicker}</p><h1>{title}</h1><p>{text}</p></section>;
}

function ServicesPage({ lang }: { lang: Language }) {
  const copy = getLocale(lang);
  const page = copy.pages.services;
  const icons = ["compass", "architecture", "code", "layers", "cloud", "data"];

  return <>
    <PageHero kicker={page.kicker} title={page.title} text={page.text} />
    <section className="section detail-list">
      {copy.home.services.map((service, index) => (
        <article key={service.id}>
          <div className="detail-title">
            <span>{service.id}</span><div className="problem-icon"><Icon name={icons[index]} /></div>
            <h2>{service.title}</h2><p>{service.summary}</p>
          </div>
          <div className="detail-columns">
            <div><h3>{page.problemsLabel}</h3><ul>{page.problems.map(item => <li key={item}>{item}</li>)}</ul></div>
            <div><h3>{page.deliverablesLabel}</h3><ul>{[...service.items, ...page.extraDeliverables].map(item => <li key={item}>{item}</li>)}</ul></div>
          </div>
        </article>
      ))}
    </section>
    <FinalCta lang={lang} title={page.ctaTitle} text={page.ctaText} />
  </>;
}

function CasesPage({ lang }: { lang: Language }) {
  const copy = getLocale(lang);
  const page = copy.pages.cases;
  const cases = [...copy.home.cases, page.fourth];

  return <>
    <PageHero kicker={page.kicker} title={page.title} text={page.text} />
    <section className="section case-listing">
      {cases.map(item => (
        <article key={item.number}>
          <div className="case-index">{item.number}</div>
          <div><span className="mini-label">{item.industry}</span><h2>{item.title}</h2><p>{item.text}</p><div className="tag-row">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
          <span className="round-arrow"><Icon name="arrow" /></span>
        </article>
      ))}
    </section>
    <FinalCta lang={lang} title={page.ctaTitle} text={page.ctaText} />
  </>;
}

function AboutPage({ lang }: { lang: Language }) {
  const page = getLocale(lang).pages.about;
  return <>
    <PageHero kicker={page.kicker} title={page.title} text={page.text} />
    <section className="section manifesto">
      <blockquote>{page.quote}</blockquote><div>{page.paragraphs.map(text => <p key={text}>{text}</p>)}</div>
    </section>
    <section className="section value-grid">
      {page.values.map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}
    </section>
    <FinalCta lang={lang} title={page.ctaTitle} text={page.ctaText} />
  </>;
}

async function ExpertsPage({ lang }: { lang: Language }) {
  const experts = await getAllExperts();
  return <>
    <PageHero kicker={expertsPageContent.pageKicker} title={expertsPageContent.pageTitle} text={expertsPageContent.pageText} />
    <section className="section experts-grid-section">
      <div className="experts-grid">
      {experts.map(expert => (
        <Link
          href={`/${lang}/experts/${expert.slug}`}
          className="expert-card"
          key={expert.slug}
          aria-label={`View ${expert.name}'s expert profile`}
        >
          <div className="expert-card-photo">
            <img src={expert.heroImage} alt={`Portrait of ${expert.name}`} />
          </div>
          <div className="expert-card-body">
            <span>{expert.yearsExperience}</span>
            <h2>{expert.name}</h2>
            <strong>{expert.role}</strong>
            <p>{expert.shortDescription}</p>
            <div className="expert-card-tags">{expert.tags.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}</div>
            <span className="expert-card-link">{expertsPageContent.cardCta} <Icon name="arrow" /></span>
          </div>
        </Link>
      ))}
      </div>
    </section>
    <FinalCta lang={lang} title={expertsPageContent.homeTitle} text={expertsPageContent.homeText} />
  </>;
}

function ExpertProfilePage({ lang, expert }: { lang: Language; expert: ExpertContent }) {
  return <>
    <section className="expert-hero">
      <div className="expert-hero-visual">
        <div className="expert-card-grid" />
        <img src={expert.heroImage} alt={`Portrait of ${expert.name}`} />
      </div>
      <div className="expert-hero-copy">
        <p className="eyebrow"><span />{expertsPageContent.profileHeroKicker} · {expert.yearsExperience}</p>
        <h1>{expert.name}</h1>
        <strong>{expert.role}</strong>
        <p>{expert.shortDescription}</p>
        <div className="button-row">
          <a href={`mailto:${expert.email}`} className="button button-dark">{expert.callToAction.buttonLabel} <Icon name="arrow" /></a>
          <a href={expert.linkedin} className="button button-light" target="_blank" rel="noreferrer">{expertsPageContent.linkedinButton}</a>
        </div>
      </div>
    </section>

    <section className="section expert-intro">
      <blockquote>{expert.quote}</blockquote>
      <div>
        <span className="mini-label">{expertsPageContent.sections.executiveSummary}</span>
        {expert.executiveSummary.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </div>
    </section>

    <section className="section expert-capabilities">
      <SectionHead kicker={expertsPageContent.sections.expertise} title={expertsPageContent.sections.expertiseTitle} />
      <div className="expert-capability-grid">
        {expert.expertise.map(item => <article key={item.title}><h2>{item.title}</h2><p>{item.description}</p></article>)}
      </div>
    </section>

    <section className="section expert-split">
      <div>
        <span className="mini-label">{expertsPageContent.sections.industries}</span>
        <ul>{expert.industries.map(item => <li key={item}>{item}</li>)}</ul>
      </div>
      <div>
        <span className="mini-label">{expertsPageContent.sections.engagements}</span>
        <ul>{expert.engagements.map(item => <li key={item}>{item}</li>)}</ul>
      </div>
    </section>

    <section className="section expert-certifications">
      <SectionHead kicker={expertsPageContent.sections.certifications} title={expertsPageContent.sections.certificationsTitle} />
      <div>{expert.certifications.map(item => <span key={item}><Icon name="check" />{item}</span>)}</div>
    </section>

    <section className="section expert-technology">
      <SectionHead kicker={expertsPageContent.sections.technologies} title={expertsPageContent.sections.technologiesTitle} />
      <div className="expert-technology-tags">
        {expert.technologies.map(item => <span key={item}>{item}</span>)}
      </div>
    </section>

    <FinalCta lang={lang} title={expert.callToAction.title} text={expert.callToAction.text} />
  </>;
}

function CertificationsPage({ lang }: { lang: Language }) {
  const page = getLocale(lang).pages.certifications;
  return <>
    <PageHero kicker={page.kicker} title={page.title} text={page.text} />
    <section className="section certification-groups">
      {page.groups.map(([group, items], index) => (
        <article key={group}>
          <div><span>0{index + 1}</span><h2>{group}</h2></div>
          <ul>{items.map(item => <li key={item}><Icon name="check" />{item}</li>)}</ul>
        </article>
      ))}
    </section>
    <FinalCta lang={lang} title={page.ctaTitle} text={page.ctaText} />
  </>;
}

function InsightsPage({ lang }: { lang: Language }) {
  const page = getLocale(lang).pages.insights;
  return <>
    <PageHero kicker={page.kicker} title={page.title} text={page.text} />
    <section className="section insight-grid">
      {page.posts.map(([category, title, duration], index) => (
        <article key={title}>
          <div className="insight-art"><span>0{index + 1}</span><i /></div>
          <span className="mini-label">{category} · {duration} {page.read}</span>
          <h2>{title}</h2>
          <a href={`mailto:hello@lyopro.com?subject=${encodeURIComponent(title)}`} className="text-link">{page.request} <Icon name="arrow" /></a>
        </article>
      ))}
    </section>
    <FinalCta lang={lang} title={page.ctaTitle} text={page.ctaText} />
  </>;
}

function ContactPage({ lang }: { lang: Language }) {
  const page = getLocale(lang).pages.contact;
  return <>
    <PageHero kicker={page.kicker} title={page.title} text={page.text} />
    <section className="section contact-layout">
      <ContactForm lang={lang} />
      <aside>
        <div><span>Email</span><a href="mailto:hello@lyopro.com">hello@lyopro.com</a></div>
        <div><span>{page.regionLabel}</span><p>{page.region}</p></div>
        <div><span>{page.languagesLabel}</span><p>{page.languages}</p></div>
        <div className="contact-note"><Icon name="shield" /><p>{page.note}</p></div>
      </aside>
    </section>
  </>;
}

function LegalPage({ page, lang }: { page: "privacy" | "imprint"; lang: Language }) {
  const copy = getLocale(lang).pages.legal;
  const privacy = page === "privacy";
  return <>
    <PageHero kicker={copy.kicker} title={privacy ? copy.privacyTitle : copy.imprintTitle} text={copy.heroText} />
    <section className="section legal-copy">
      <h2>{privacy ? copy.privacyHeading : copy.imprintHeading}</h2><p>{copy.placeholder}</p>
      <h3>{copy.contactHeading}</h3><p>{copy.contactText}</p>
      <h3>{copy.enquiriesHeading}</h3><p>{copy.enquiriesText}</p>
    </section>
  </>;
}

function SectionHead({ kicker, title, light = false }: { kicker: string; title: string; light?: boolean }) {
  return <div className={`section-head ${light ? "light" : ""}`}><p><span />{kicker}</p><h2>{title}</h2></div>;
}

function FinalCta({ lang, title, text }: { lang: Language; title: string; text: string }) {
  const copy = getLocale(lang).finalCta;
  return (
    <section className="final-cta">
      <div className="cta-orbit"><i /><i /><i /></div>
      <div>
        <span>{copy.kicker}</span><h2>{title}</h2><p>{text}</p>
        <div className="button-row">
          <Link href={`/${lang}/contact`} className="button button-white">{copy.consult} <Icon name="arrow" /></Link>
          <a href="mailto:hello@lyopro.com" className="button button-outline">{copy.email}</a>
        </div>
      </div>
    </section>
  );
}
