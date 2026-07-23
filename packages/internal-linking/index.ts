import { SITE_CONFIG } from '../config';

export interface InternalLinkRule {
  text: string;
  url: string;
  targetCategory?: string;
  entitySlug?: string;
}

export const MANDATORY_INTERNAL_LINKS: InternalLinkRule[] = [
  { text: "AI Agents Directory", url: "/agents/" },
  { text: "Coding AI Agents", url: "/categories/coding-agents/" },
  { text: "Head-to-Head Comparisons", url: "/compare/" },
  { text: "Testing Methodology", url: "/methodology/" },
  { text: "India AI Pricing Index", url: "/pricing/" },
  { text: "MCP Servers Directory", url: "/mcp-servers/" },
];

export function getRecommendedInternalLinks(entitySlug: string, category?: string): InternalLinkRule[] {
  const links: InternalLinkRule[] = [
    { text: "See evaluation methodology", url: "/methodology/" },
    { text: "Compare with alternatives", url: `/alternatives/${entitySlug}-alternatives/` },
    { text: "View pricing details", url: `/pricing/${entitySlug}-pricing/` },
  ];

  if (category) {
    links.unshift({ text: `Top ${category} rankings`, url: `/categories/${category}/` });
  }

  return links;
}
