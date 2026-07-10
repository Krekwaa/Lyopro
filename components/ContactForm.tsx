"use client";

import { FormEvent, useState } from "react";
import { Icon } from "./Icons";
import { getLocale, Language } from "@/lib/content";

export function ContactForm({ lang }: { lang: Language }) {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const copy = getLocale(lang).pages.contact.form;

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    const subject = encodeURIComponent(`${copy.emailSubject} ${String(data.company || data.name)}`);
    const body = encodeURIComponent(
      [
        `${copy.emailFields[0]}: ${String(data.name || "")}`,
        `${copy.emailFields[1]}: ${String(data.company || "")}`,
        `${copy.emailFields[2]}: ${String(data.email || "")}`,
        `${copy.emailFields[3]}: ${String(data.phone || "")}`,
        `${copy.emailFields[4]}: ${String(data.projectType || "")}`,
        `${copy.emailFields[5]}: ${String(data.budget || "")}`,
        "",
        String(data.message || ""),
      ].join("\n"),
    );

    window.location.href = `mailto:hello@lyopro.com?subject=${subject}&body=${body}`;
    setState("success");
  }

  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="field-row">
        <label>{copy.name} *<input name="name" required autoComplete="name" placeholder={copy.namePlaceholder} /></label>
        <label>{copy.company}<input name="company" autoComplete="organization" placeholder={copy.companyPlaceholder} /></label>
      </div>
      <div className="field-row">
        <label>{copy.email} *<input type="email" name="email" required autoComplete="email" placeholder="you@company.com" /></label>
        <label>{copy.phone}<input name="phone" autoComplete="tel" placeholder="+49 ..." /></label>
      </div>
      <div className="field-row">
        <label>{copy.projectType}<select name="projectType" defaultValue=""><option value="" disabled>{copy.selectArea}</option>{copy.projectOptions.map(option => <option key={option}>{option}</option>)}</select></label>
        <label>{copy.budget}<select name="budget" defaultValue=""><option value="" disabled>{copy.selectBudget}</option>{copy.budgetOptions.map(option => <option key={option}>{option}</option>)}</select></label>
      </div>
      <label>{copy.message} *<textarea name="message" required rows={6} placeholder={copy.messagePlaceholder} /></label>
      <div className="form-submit">
        <button className="button button-dark" disabled={state === "loading"}>
          {state === "loading" ? copy.sending : copy.submit} <Icon name="arrow" />
        </button>
        <span>{copy.response}</span>
      </div>
      {state === "success" && <p className="form-message success">{copy.success}</p>}
      {state === "error" && <p className="form-message error">{copy.error}</p>}
    </form>
  );
}
