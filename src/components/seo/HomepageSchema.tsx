import React from 'react';
import { siteConfig } from '../../data/site';
import { featuredAgents } from '../../data/agents';

export const HomepageSchema: React.FC = () => {
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.domain}/#organization`,
        "name": siteConfig.name,
        "url": siteConfig.domain,
        "logo": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
        "description": siteConfig.tagline,
        "sameAs": [
          "https://twitter.com/BestAIAgentIn",
          "https://github.com/bestaiagent"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.domain}/#website`,
        "url": siteConfig.domain,
        "name": siteConfig.name,
        "description": siteConfig.tagline,
        "publisher": {
          "@id": `${siteConfig.domain}/#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${siteConfig.domain}/search/?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebPage",
        "@id": `${siteConfig.domain}/#webpage`,
        "url": siteConfig.canonicalHome,
        "name": "Best AI Agents: Reviews, Comparisons and Benchmarks | BestAIAgent.in",
        "description": "Discover and compare leading AI agents using independent reviews, transparent benchmark scores, pricing, integrations, deployment options, and known limitations.",
        "isPartOf": {
          "@id": `${siteConfig.domain}/#website`
        },
        "about": {
          "@id": `${siteConfig.domain}/#organization`
        }
      },
      {
        "@type": "ItemList",
        "@id": `${siteConfig.domain}/#featured-agents`,
        "name": "Featured AI Agents Leaderboard",
        "itemListElement": featuredAgents.slice(0, 6).map((agent, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": agent.name,
          "url": `${siteConfig.domain}${agent.reviewUrl}`
        }))
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
    />
  );
};

export default HomepageSchema;
