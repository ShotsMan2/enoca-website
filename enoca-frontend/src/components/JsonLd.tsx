import Script from 'next/script';

export default function JsonLd() {
  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Enoca",
    "url": "https://www.enoca.com",
    "logo": "https://www.enoca.com/logo.png",
    "sameAs": [
      "https://linkedin.com/company/enoca",
      "https://twitter.com/enoca_"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+90-850-221-73-54",
      "contactType": "customer service",
      "email": "contact@enoca.com",
      "areaServed": "TR",
      "availableLanguage": ["Turkish", "English"]
    },
    "description": "Enoca provides enterprise software development, SAP CX Hybris solutions, and system monitoring architectures.",
    "foundingDate": "2010"
  };

  return (
    <Script
      id="organization-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
    />
  );
}
