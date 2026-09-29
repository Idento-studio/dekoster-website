import { contact, site } from "@/lib/content";

/** LocalBusiness-structured data (zie launch-checklist §2). */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LandscapingBusiness",
    name: site.legalName,
    url: site.url,
    image: `${site.url}/images/duo-tuin-1200.webp`,
    logo: `${site.url}/icon.svg`,
    description: site.description,
    telephone: contact.tel,
    email: contact.email,
    sameAs: [site.instagram],
    areaServed: site.areas.map((name) => ({ "@type": "City", name })),
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.street,
      postalCode: contact.postalCode,
      addressLocality: contact.city,
      addressCountry: "BE",
    },
    // Geen winkel: we werken op de werf en zijn telefonisch bereikbaar, dus ContactPoint i.p.v. openingsuren.
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: contact.tel,
      email: contact.email,
      availableLanguage: "nl",
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "17:00",
      },
    },
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
