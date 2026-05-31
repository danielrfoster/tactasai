export const DEFAULT_SITE_URL = "https://tactasai.com";
export const DEFAULT_BRAND_EMAIL = "hello@tactasai.com";

function readEnv(key: string) {
  return import.meta.env[`PUBLIC_${key}`] || import.meta.env[`NEXT_PUBLIC_${key}`] || "";
}

export function getSiteUrl() {
  return (readEnv("SITE_URL") || DEFAULT_SITE_URL).replace(/\/+$/, "");
}

export function getBrandEmail() {
  return readEnv("BRAND_EMAIL") || DEFAULT_BRAND_EMAIL;
}

export function getBrandPhone() {
  return readEnv("BRAND_PHONE");
}

export function getBrandAddress() {
  return {
    locality: readEnv("BRAND_ADDRESS_LOCALITY"),
    region: readEnv("BRAND_ADDRESS_REGION"),
    postalCode: readEnv("BRAND_POSTAL_CODE"),
    country: readEnv("BRAND_ADDRESS_COUNTRY"),
  };
}

export function getSameAs() {
  return readEnv("BRAND_SAMEAS")
    .split(",")
    .map((url) => url.trim())
    .filter((url) => /^https?:\/\//.test(url));
}

export function getOrganization() {
  const siteUrl = getSiteUrl();
  const brandEmail = getBrandEmail();
  const brandPhone = getBrandPhone();
  const sameAs = getSameAs();
  const address = getBrandAddress();

  const organization: Record<string, unknown> = {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "TactasAI",
    url: siteUrl,
    description:
      "TactasAI deploys managed AI agents that learn company context, work with teams, and turn business knowledge into useful outputs and action.",
    email: brandEmail,
    areaServed: "Worldwide",
    logo: `${siteUrl}/android-icon-192x192.png`,
    knowsAbout: [
      "Managed agent systems",
      "Managed AI agents",
      "AI agents for business operations",
      "Business task automation",
      "Business operations automation",
      "Company knowledge automation",
      "AI operating layer",
      "Connected business tools",
      "Work performance support",
      "Automated business tasks",
      "Business context automation",
      "AI task automation",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: brandEmail,
        ...(brandPhone ? { telephone: brandPhone } : {}),
        areaServed: "Worldwide",
        availableLanguage: ["en", "vi"],
      },
    ],
  };

  if (sameAs.length > 0) {
    organization.sameAs = sameAs;
  }

  if (address.locality || address.region || address.postalCode || address.country) {
    organization.address = {
      "@type": "PostalAddress",
      addressLocality: address.locality,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.country,
    };
  }

  return organization;
}
