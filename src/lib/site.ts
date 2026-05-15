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
    name: "Tactas AI",
    url: siteUrl,
    description:
      "Tactas AI helps businesses deploy AI agents that complete internal workflows across tools, data, SOPs, and approvals with action logs, decision explanations, monitoring, and implementation support.",
    email: brandEmail,
    areaServed: "Worldwide",
    logo: `${siteUrl}/android-icon-192x192.png`,
    knowsAbout: [
      "AI workflow automation",
      "agentic workflow automation",
      "AI agents for business operations",
      "AI agents that complete workflows",
      "business system integration",
      "AI agent monitoring",
      "AI agent control layer",
      "agent decision explanations",
      "operations automation",
      "business process automation",
      "AI workflow implementation",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
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
