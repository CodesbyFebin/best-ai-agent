import { canonicalRoutes, legacyRedirects, RouteRecord } from './routeRegistry.js';

export type RouteResolution =
  | { kind: 'valid'; route: RouteRecord }
  | { kind: 'redirect'; destination: string }
  | { kind: 'not-found'; path: string };

export function resolveRoute(pathName: string): RouteResolution {
  if (!pathName) {
    return { kind: 'valid', route: canonicalRoutes['/'] };
  }

  // Normalize: lowercase, remove trailing slash unless root
  let norm = pathName.toLowerCase().trim();
  if (norm.length > 1 && norm.endsWith('/')) {
    norm = norm.slice(0, -1);
  }

  // 1. Check legacy redirects registry
  if (legacyRedirects[norm]) {
    return { kind: 'redirect', destination: legacyRedirects[norm] };
  }

  // 2. Check exact canonical routes
  if (canonicalRoutes[norm]) {
    return { kind: 'valid', route: canonicalRoutes[norm] };
  }

  // 3. Dynamic Pattern Resolutions
  // /agents/:slug
  if (norm.startsWith('/agents/')) {
    const slug = norm.replace('/agents/', '');
    if (slug) {
      const formattedName = slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
      return {
        kind: 'valid',
        route: {
          path: norm,
          type: 'agent',
          status: 'published',
          indexable: true,
          canonicalPath: norm,
          title: `${formattedName} AI Review, Benchmarks & India Pricing (2026) - BestAIAgent.in`,
          description: `Empirical technical audit and benchmark evaluation of ${formattedName}. Performance, latency, tool execution, and INR subscription costs.`,
          sitemapGroup: 'agents',
          updatedAt: '2026-07-23'
        }
      };
    }
  }

  // /categories/:slug
  if (norm.startsWith('/categories/')) {
    const slug = norm.replace('/categories/', '');
    if (slug) {
      const formattedName = slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
      return {
        kind: 'valid',
        route: {
          path: norm,
          type: 'category',
          status: 'published',
          indexable: true,
          canonicalPath: norm,
          title: `${formattedName} AI Agents Directory & Benchmarks - BestAIAgent.in`,
          description: `Comprehensive directory of ${formattedName} AI agents. Evaluate latency, tool accuracy, and India market fit.`,
          sitemapGroup: 'categories',
          updatedAt: '2026-07-23'
        }
      };
    }
  }

  // /compare/:slug
  if (norm.startsWith('/compare/')) {
    const slug = norm.replace('/compare/', '');
    if (slug) {
      const pair = slug.split('-vs-').map(s => s.split('-').map(x => x.charAt(0).toUpperCase() + x.slice(1)).join(' ')).join(' vs ');
      return {
        kind: 'valid',
        route: {
          path: norm,
          type: 'comparison',
          status: 'published',
          indexable: true,
          canonicalPath: norm,
          title: `${pair} Comparison & Benchmarks (2026) - BestAIAgent.in`,
          description: `Head-to-head comparison of ${pair}. Compare speed, reasoning, tool execution, and INR subscription costs.`,
          sitemapGroup: 'comparisons',
          updatedAt: '2026-07-23'
        }
      };
    }
  }

  // /mcp/servers/:slug
  if (norm.startsWith('/mcp/servers/')) {
    const slug = norm.replace('/mcp/servers/', '');
    if (slug) {
      const formattedName = slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
      return {
        kind: 'valid',
        route: {
          path: norm,
          type: 'mcp-server',
          status: 'published',
          indexable: true,
          canonicalPath: norm,
          title: `${formattedName} MCP Server Setup & Integration - BestAIAgent.in`,
          description: `Configuration guide for ${formattedName} Model Context Protocol server. Connect Claude and Cursor to ${formattedName}.`,
          sitemapGroup: 'mcp',
          updatedAt: '2026-07-23'
        }
      };
    }
  }

  // /research/:slug
  if (norm.startsWith('/research/')) {
    const slug = norm.replace('/research/', '');
    if (slug) {
      const formattedName = slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
      return {
        kind: 'valid',
        route: {
          path: norm,
          type: 'research',
          status: 'published',
          indexable: true,
          canonicalPath: norm,
          title: `${formattedName} Industry Research Report - BestAIAgent.in`,
          description: `Market intelligence and research report on ${formattedName}. Latency benchmarks, enterprise adoption statistics, and ROI.`,
          sitemapGroup: 'research',
          updatedAt: '2026-07-23'
        }
      };
    }
  }

  // /authors/:slug
  if (norm.startsWith('/authors/')) {
    const slug = norm.replace('/authors/', '');
    if (slug) {
      const formattedName = slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
      return {
        kind: 'valid',
        route: {
          path: norm,
          type: 'governance',
          status: 'published',
          indexable: true,
          canonicalPath: norm,
          title: `${formattedName} - Author Profile & Evaluated Benchmarks - BestAIAgent.in`,
          description: `Technical profile and evaluated benchmarks by ${formattedName}, AI evaluator at BestAIAgent.in.`,
          sitemapGroup: 'pages',
          updatedAt: '2026-07-23'
        }
      };
    }
  }

  // 4. Default: Not Found (404)
  return { kind: 'not-found', path: norm };
}

export function getSitemapRoutes(group: 'agents' | 'categories' | 'comparisons' | 'mcp' | 'research' | 'pages'): RouteRecord[] {
  return Object.values(canonicalRoutes).filter(
    route => route.status === 'published' && route.indexable && route.sitemapGroup === group
  );
}
