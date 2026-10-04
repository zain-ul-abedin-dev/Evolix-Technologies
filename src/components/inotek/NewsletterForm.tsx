"use client";

import { useState, type FormEvent } from "react";
import { showPopup } from "./popup";

/** Newsletter email form. Subscriptions are emailed to the site inbox through /api/contact. */
export function NewsletterForm({ placeholder = "Email Address" }: { placeholder?: string }) {
  const [email, setEmail] = useState("");
  const [sending, setSending] = useState(false);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSending(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ type: "newsletter", email }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setEmail("");
      showPopup("success", "Subscribed!");
    } catch {
      showPopup("error", "Oops! There was a problem.");
    } finally {
      setSending(false);
    }
  };

  return (
    <form className="newsletter-form" onSubmit={onSubmit}>
      <div className="form-group">
        <input
          type="email"
          name="email"
          className="email"
          placeholder={placeholder}
          autoComplete="email"
          aria-label={placeholder}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" disabled={sending} aria-label="Subscribe">
          <i className="far fa-paper-plane" />
          <span className="btn-title" />
        </button>
      </div>
    </form>
  );
}
