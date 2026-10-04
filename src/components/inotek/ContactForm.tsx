"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { ServiceSelect } from "./ServiceSelect";
import { ArrowRight } from "./ThemeButton";
import { showPopup } from "./popup";

type Fields = { name: string; email: string; phone: string; service: string; message: string; terms: boolean };
type Errors = Partial<Record<keyof Fields, string>>;

const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

/** Same rules and messages as the template's jquery.validate setup (formValidation()). */
function validate(f: Fields, full: boolean): Errors {
  const errors: Errors = {};
  if (!f.name.trim()) errors.name = "Please enter your name";
  if (!f.email.trim()) errors.email = "Please enter your email address";
  else if (!EMAIL_RE.test(f.email.trim())) errors.email = "Please enter a valid email address";
  if (!f.message.trim()) errors.message = "Please enter a message";
  if (full && !f.terms) errors.terms = "Please accept the terms and conditions";
  return errors;
}

const EMPTY: Fields = { name: "", email: "", phone: "", service: "", message: "", terms: false };

type ContactFormProps = {
  services: { value: string; label: string }[];
  /**
   * `callback` = "Request for a call back" form (home, contact-form style-5).
   * `full` = contact page form (template contact.html) with icons, phone and terms.
   */
  variant?: "callback" | "full";
};

/** Contact form; sends to /api/contact, which emails the lead to the site inbox. */
export function ContactForm({ services, variant = "callback" }: ContactFormProps) {
  const full = variant === "full";
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const update = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    const next = { ...fields, [key]: value };
    setFields(next);
    // Like jquery.validate: re-check live only after the first submit attempt.
    if (submitted) setErrors(validate(next, full));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const found = validate(fields, full);
    setErrors(found);
    if (Object.keys(found).length) return;

    setSending(true);
    try {
      const { name, email, phone, service, message } = fields;
      const payload = { name, email, phone, service, message };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      setFields(EMPTY);
      setSubmitted(false);
      showPopup("success", "Contact submitted!");
    } catch {
      showPopup("error", "Oops! There was a problem.");
    } finally {
      setSending(false);
    }
  };

  const errorLabel = (key: keyof Fields, id: string) =>
    errors[key] ? (
      <label id={`${id}-error`} className="error" htmlFor={id}>
        {errors[key]}
      </label>
    ) : null;

  const icon = (cls: string): ReactNode => (full ? <span className="icon"><i className={cls} /></span> : null);

  return (
    <form id="contact_form" className="contact_form" onSubmit={onSubmit} noValidate>
      <div className="form-grid">
        <div className="form-group">
          {icon("fa-slab-press fa-regular fa-user")}
          <input
            type="text"
            id="fullName"
            name="name"
            placeholder="Your Name"
            autoComplete="name"
            required
            className={errors.name ? "error" : undefined}
            aria-invalid={!!errors.name}
            value={fields.name}
            onChange={(e) => update("name", e.target.value)}
          />
          {errorLabel("name", "fullName")}
        </div>
        <div className="form-group">
          {icon("fa-regular fa-envelope")}
          <input
            type="email"
            id="userEmail"
            name="email"
            placeholder={full ? "Email Address" : "E-Mail"}
            autoComplete="email"
            required
            className={errors.email ? "error" : undefined}
            aria-invalid={!!errors.email}
            value={fields.email}
            onChange={(e) => update("email", e.target.value)}
          />
          {errorLabel("email", "userEmail")}
        </div>
      </div>
      <div className="form-grid">
        {full && (
          <div className="form-group">
            {icon("fa-solid fa-phone")}
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone No."
              autoComplete="tel"
              value={fields.phone}
              onChange={(e) => update("phone", e.target.value)}
            />
          </div>
        )}
        <div className="form-group">
          <ServiceSelect
            name="service"
            placeholder={full ? "What do you need?" : "Select Service"}
            options={services}
            value={fields.service}
            onChange={(v) => update("service", v)}
          />
        </div>
      </div>
      <div className="form-group">
        <textarea
          id="msg"
          name="message"
          placeholder="Write Message"
          required
          className={errors.message ? "error" : undefined}
          aria-invalid={!!errors.message}
          value={fields.message}
          onChange={(e) => update("message", e.target.value)}
        />
        {errorLabel("message", "msg")}
      </div>
      {full && (
        <div className="form-group terms">
          <input type="checkbox" id="terms" required checked={fields.terms} onChange={(e) => update("terms", e.target.checked)} />
          <label htmlFor="terms">I agree to all terms and conditions.</label>
          {errorLabel("terms", "terms")}
        </div>
      )}
      {full ? (
        <button type="submit" className="theme-btn  mt-30" disabled={sending}>
          <span className="link-effect">
            <span className="effect-1">{sending ? "Please wait..." : "Submit Now"}</span>
            <span className="effect-1" aria-hidden="true">
              {sending ? "Please wait..." : "Submit Now"}
            </span>
          </span>
          <span className="arrow-all">
            <i>
              <ArrowRight />
              <ArrowRight />
            </i>
          </span>
        </button>
      ) : (
        <button type="submit" className="theme-btn" disabled={sending}>
          <span className="btn-title mr-10">{sending ? "Please wait..." : "Send Message"}</span>
          <i className="fa-solid fa-arrow-right" />
        </button>
      )}
    </form>
  );
}
