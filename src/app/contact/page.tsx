import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { CopyLine } from "@/components/CopyLine";
import { Icon } from "@/components/Icon";
import { PageHero } from "@/components/PageParts";
import { contact, OFFERTE } from "@/lib/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact tuinaannemer Gent en Eeklo",
  description:
    "Contact met Tuinaanneming De Koster voor tuinaanleg, grondwerken en infra in Gent en omstreken. Bel, mail of vraag een vrijblijvend plaatsbezoek aan.",
  keywords: [
    "tuinaannemer Gent contact",
    "tuinaannemer Eeklo",
    "tuinaanleg offerte Gent",
    "Tuinaanneming De Koster",
  ],
  path: "/contact/",
  image: "totaal",
});

export default function Page() {
  return (
    <>
      <PageHero
        image="totaal"
        alt="Twee collega's met een heggenschaar voor een beukenhaag"
        eyebrow="Contact"
        title="Neem contact met ons op."
        lead="Heeft u een vraag of wilt u een vrijblijvende offerte? We helpen u graag verder."
        actions={false}
      />

      <section className="bg-linen pt-4 pb-24">
        <div className="wrap grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.15fr]">
          <div data-reveal className="space-y-4">
            <h2 className="text-[30px] font-semibold text-forest">Contactgegevens</h2>
            <p className="max-w-[46ch] leading-[1.7]">
              Bel, mail of kom langs. We plannen graag een moment ter plaatse in.
            </p>
            <CopyLine
              icon="phone"
              label="Telefoon"
              value={contact.phone}
              href={`tel:${contact.tel}`}
            />
            <CopyLine
              icon="mail"
              label="E-mail"
              value={contact.email}
              href={`mailto:${contact.email}`}
            />
            <CopyLine icon="pin" label="Adres" value={contact.address} />
            <div className="rounded-2xl bg-forest p-6 text-sand">
              <p className="flex items-center gap-2 font-mono text-[11px] tracking-[3px] text-lime uppercase">
                <Icon name="clock" className="h-4 w-4" />
                Telefonisch bereikbaar
              </p>
              <div className="mt-4 space-y-2">
                {contact.hours.map(([d, h]) => (
                  <p
                    key={d}
                    className="flex justify-between border-b border-white/10 pb-2 tabular-nums last:border-0"
                  >
                    <span>{d}</span>
                    <span className="text-white">{h}</span>
                  </p>
                ))}
              </div>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contact.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-display font-medium text-forest underline decoration-lime decoration-2 underline-offset-4"
            >
              Routebeschrijving in Google Maps <Icon name="arrow" className="h-4 w-4" />
            </a>
          </div>

          <div data-reveal="1" className="rounded-card bg-sand p-7 sm:p-10">
            <ContactForm />
          </div>
        </div>

        <div className="wrap mt-10">
          <Link
            href={OFFERTE}
            data-reveal
            className="group flex flex-col gap-4 rounded-card bg-forest p-8 text-sand transition hover:bg-[#434f25] sm:flex-row sm:items-center sm:justify-between sm:p-10"
          >
            <span>
              <span className="font-mono text-[11px] tracking-[3px] text-lime uppercase">
                Liever meteen een offerte?
              </span>
              <span className="mt-2 block font-display text-[28px] leading-tight font-bold text-white">
                Klik uw project bij elkaar in 2 minuten.
              </span>
            </span>
            <span className="btn-lime shrink-0">
              Gratis offerte{" "}
              <Icon name="arrowRight" className="h-4 w-4 transition group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
