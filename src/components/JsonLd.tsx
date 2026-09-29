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
    telephone: contact.phone,
    email: contact.email,
    areaServed: site.region,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.street,
      postalCode: contact.postalCode,
      addressLocality: contact.city,
      addressCountry: "BE",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "12:00",
      },
    ],
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
