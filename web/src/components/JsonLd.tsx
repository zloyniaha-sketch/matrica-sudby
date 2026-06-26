import { faqJsonLd, howToJsonLd, webAppJsonLd, webSiteJsonLd } from "@/lib/seo";

export function JsonLd() {
  const { "@context": _c1, ...webSite } = webSiteJsonLd();
  const { "@context": _c2, ...webApp } = webAppJsonLd();
  const { "@context": _c3, ...faq } = faqJsonLd();
  const { "@context": _c4, ...howTo } = howToJsonLd();

  const data = {
    "@context": "https://schema.org",
    "@graph": [webSite, webApp, faq, howTo],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
