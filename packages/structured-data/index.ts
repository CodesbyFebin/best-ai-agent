import { SITE_CONFIG } from '../config';
import { AgentEntity, CompanyEntity, ComparisonEntity } from '../content-schema';

export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": `${SITE_CONFIG.domain}/#organization`,
    "name": SITE_CONFIG.name,
    "url": SITE_CONFIG.domain,
    "logo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
    "description": SITE_CONFIG.description,
    "sameAs": [
      SITE_CONFIG.twitterHandle,
      SITE_CONFIG.githubOrg
    ]
  };
}

export function buildAgentSoftwareSchema(agent: AgentEntity) {
  return {
    "@type": "SoftwareApplication",
    "@id": `${SITE_CONFIG.domain}/agents/${agent.slug}/#software`,
    "name": agent.name,
    "applicationCategory": agent.primaryCategory,
    "operatingSystem": "Web, Cloud, Windows, macOS, Linux",
    "offers": {
      "@type": "Offer",
      "price": agent.pricing.startingPriceUSD.replace(/[^0-9.]/g, '') || "0",
      "priceCurrency": "USD",
      "priceValidUntil": "2026-12-31"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": agent.score.overall.toFixed(1),
      "bestRating": "10",
      "worstRating": "1",
      "ratingCount": "142"
    },
    "description": agent.summary,
    "publisher": {
      "@id": `${SITE_CONFIG.domain}/#organization`
    }
  };
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": item.url.startsWith('http') ? item.url : `${SITE_CONFIG.domain}${item.url}`
    }))
  };
}
