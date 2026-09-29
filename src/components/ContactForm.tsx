"use client";

import { useState } from "react";
import { contact } from "@/lib/content";
import { honeypotProps, submitToWebhook } from "@/lib/submit";
import { Icon } from "./Icon";

type Fields = { naam: string; email: string; gsm: string; bericht: string };
const empty: Fields = { naam: "", email: "", gsm: "", bericht: "" };

export function ContactForm() {
  const [form, setForm] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields | "privacy", string>>>({});
  const [privacy, setPrivacy] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [honeypot, setHoneypot] = useState("");
  const [startedAt] = useState(() => Date.now());
  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err: typeof errors = {};
    if (!form.naam.trim()) err.naam = "Vul je naam in.";
    if (!/^\S+@\S+\.\S+$/.test(form.email))
      err.email = "Vul een geldig e-mailadres in, bv. naam@voorbeeld.be.";
    if (form.bericht.trim().length < 5) err.bericht = "Schrijf kort waarmee we je kunnen helpen.";
    if (!privacy) err.privacy = "Vink aan dat je akkoord gaat met het privacybeleid.";
    setErrors(err);
    if (Object.keys(err).length) return;
    setState("sending");
    const res = await submitToWebhook(
      process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL,
      { bron: "contact", ...form, verzonden: new Date().toISOString() },
      { honeypot, startedAt },
    );
    setState(res.ok || res.reason === "not-configured" || res.reason === "spam" ? "sent" : "error");
  };

  if (state === "sent") {
    return (
      <div className="flex animate-rise flex-col items-start gap-4 py-10" role="status">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-lime text-forest">
          <Icon name="check" className="h-8 w-8" />
        </span>
        <h2 className="text-[30px] font-bold text-forest">Bedankt, {form.naam.split(" ")[0]}!</h2>
        <p className="max-w-[44ch] leading-[1.7]">
          Je bericht is goed aangekomen. We nemen zo snel mogelijk contact met je op.
        </p>
        <button
          onClick={() => {
            setState("idle");
            setForm(empty);
            setPrivacy(false);
          }}
          className="btn-outline"
        >
          Nog een bericht sturen
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative space-y-5">
      <h2 className="text-[30px] font-semibold text-forest">Stuur ons een bericht</h2>
      <input {...honeypotProps} value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      {(
        [
          ["naam", "Naam", "text", "Voornaam en naam", "name", true],
          ["email", "E-mail", "email", "naam@voorbeeld.be", "email", true],
          ["gsm", "GSM", "tel", "0470 12 34 56", "tel", false],
        ] as const
      ).map(([k, label, type, ph, ac, req]) => (
        <div key={k}>
          <label
            htmlFor={`c-${k}`}
            className="mb-1.5 block font-display text-[15px] font-medium text-forest"
          >
            {label}{" "}
            {req ? (
              <span aria-hidden="true">*</span>
            ) : (
              <span className="font-body text-[13px] font-normal text-bark/70">(optioneel)</span>
            )}
          </label>
          <input
            id={`c-${k}`}
            type={type}
            autoComplete={ac}
            placeholder={ph}
            required={req}
            value={form[k]}
            onChange={set(k)}
            className="field"
            aria-invalid={!!errors[k]}
            aria-describedby={errors[k] ? `c-${k}-err` : undefined}
          />
          {errors[k] && (
            <p id={`c-${k}-err`} className="mt-1.5 text-[14px] font-medium text-[#9b2c1c]">
              {errors[k]}
            </p>
          )}
        </div>
      ))}
      <div>
        <label
          htmlFor="c-bericht"
          className="mb-1.5 block font-display text-[15px] font-medium text-forest"
        >
          Bericht <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="c-bericht"
          rows={5}
          required
          placeholder="Waarmee kunnen we helpen?"
          value={form.bericht}
          onChange={set("bericht")}
          className="field"
          aria-invalid={!!errors.bericht}
        />
        {errors.bericht && (
          <p className="mt-1.5 text-[14px] font-medium text-[#9b2c1c]">{errors.bericht}</p>
        )}
      </div>
      <label className="flex items-start gap-3 text-[15px]">
        <input
          type="checkbox"
          checked={privacy}
          onChange={(e) => setPrivacy(e.target.checked)}
          className="mt-1 h-5 w-5 accent-forest"
        />
        {/* TODO (OPENSTAAND): link naar de privacypagina */}
        <span>Ik ga akkoord met het privacybeleid.</span>
      </label>
      {errors.privacy && (
        <p className="-mt-3 text-[14px] font-medium text-[#9b2c1c]">{errors.privacy}</p>
      )}
      {state === "error" && (
        <p className="rounded-2xl bg-white p-4 text-[15px]" role="alert">
          Er ging iets mis bij het versturen. Probeer opnieuw of mail ons rechtstreeks op{" "}
          <span className="font-semibold text-forest select-all">{contact.email}</span>.
        </p>
      )}
      <button
        type="submit"
        disabled={state === "sending"}
        className="btn-lime w-full disabled:opacity-60 sm:w-auto"
      >
        {state === "sending" ? "Bezig met verzenden…" : "Verzenden"}{" "}
        <Icon name="arrowRight" className="h-4 w-4" />
      </button>
    </form>
  );
}
