"use client";

import { useState, type FormEvent } from "react";
import { SITE } from "@/lib/site";

const field =
  "block w-full rounded-[10px] bg-[rgba(187,187,187,0.15)] p-3 font-inter text-[14px] leading-[16px] text-ink-2 outline-none placeholder:text-[#999] focus:ring-2 focus:ring-brand/40";
const label = "font-inter text-[14px] leading-[16.8px] font-medium text-ink-2";

/**
 * Sends submissions by email through Web3Forms (free: 250/month).
 * Without an access key it falls back to opening the visitor's mail app.
 */
export function ContactForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("botcheck")) return; // honeypot

    if (!SITE.web3formsKey) {
      const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`;
      window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("Appointment request – prodontics.in")}&body=${encodeURIComponent(body)}`;
      return;
    }

    setState("sending");
    data.append("access_key", SITE.web3formsKey);
    data.append("subject", "New appointment request – prodontics.in");
    data.append("from_name", "Prodontics website");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (json.success) {
        setState("sent");
        form.reset();
      } else setState("error");
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-5 p-5">
      <label className="flex flex-col gap-[10px]">
        <span className={label}>Name</span>
        <input name="name" required placeholder="Ravi Kumar" className={`${field} h-10`} autoComplete="name" />
      </label>
      <label className="flex flex-col gap-[10px]">
        <span className={label}>Email</span>
        <input name="email" type="email" required placeholder="ravi@gmail.com" className={`${field} h-10`} autoComplete="email" />
      </label>
      <label className="flex flex-col gap-[10px]">
        <span className={label}>Message</span>
        <textarea name="message" required placeholder="Type your message here" className={`${field} h-[100px] resize-y`} />
      </label>
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <button
        type="submit"
        disabled={state === "sending"}
        className="h-10 w-full rounded-[8px] bg-brand font-inter text-[14px] leading-[16.8px] font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-70"
      >
        {state === "sending" ? "Sending…" : state === "sent" ? "Thank you! We'll be in touch." : "Submit"}
      </button>
      {state === "error" && (
        <p className="font-inter text-[14px] text-red-700">
          Something went wrong. Please call us on {SITE.phoneDisplay} or WhatsApp us.
        </p>
      )}
    </form>
  );
}
