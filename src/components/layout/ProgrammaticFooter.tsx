import React from 'react';
import { programmaticFooterSections } from '../../data/footer-navigation';
import { ShieldCheck, ArrowRight } from 'lucide-react';

interface ProgrammaticFooterProps {
  onNavigate?: (path: string) => void;
  onOpenRss?: () => void;
  onOpenPseoRepo?: () => void;
}

export const ProgrammaticFooter: React.FC<ProgrammaticFooterProps> = ({
  onNavigate,
  onOpenRss,
  onOpenPseoRepo,
}) => {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (e.metaKey || e.ctrlKey) return;
    
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  const primaryLinks = [
    { label: 'AI Agents', href: '/agents/' },
    { label: 'Categories', href: '/categories/' },
    { label: 'Rankings', href: '/rankings/' },
    { label: 'Compare', href: '/compare/' },
    { label: 'Frameworks', href: '/frameworks/' },
    { label: 'MCP Servers', href: '/mcp-servers/' },
    { label: 'Research', href: '/research/' },
    { label: 'HTML Sitemap', href: '/sitemap/' },
  ];

  const trustLinks = [
    { label: 'Methodology', href: '/methodology/' },
    { label: 'Editorial Policy', href: '/editorial-policy/' },
    { label: 'Review Process', href: '/review-process/' },
    { label: 'Authors', href: '/authors/' },
    { label: 'Corrections', href: '/corrections/' },
  ];

  const legalLinks = [
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
    { label: 'Privacy', href: '/privacy-policy/' },
    { label: 'Terms', href: '/terms/' },
    { label: 'Affiliate Disclosure', href: '/affiliate-disclosure/' },
  ];

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 font-sans text-xs">
      {/* 1. Footer Call to Action (CTA) */}
      <section className="border-b border-slate-800/80 py-10 md:py-14 bg-gradient-to-b from-slate-900/40 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <p className="text-[11px] font-extrabold text-indigo-400 uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Independent AI agent intelligence
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Find the right AI agent for your work
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Compare capabilities, pricing, deployment options, benchmarks and real-world use cases.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href="/agents/"
              onClick={(e) => handleLinkClick(e, '/agents/')}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all inline-flex items-center gap-2"
            >
              <span>Find My Agent</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <a
              href="/compare/"
              onClick={(e) => handleLinkClick(e, '/compare/')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold text-xs transition-all"
            >
              Compare Agents
            </a>
          </div>
        </div>
      </section>

      {/* 2. Programmatic Directory Knowledge Map */}
      <section className="border-b border-slate-800/80 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 border-b border-slate-900 pb-6">
            <div className="space-y-1">
              <p className="text-[11px] font-extrabold text-indigo-400 uppercase tracking-widest">
                Programmatic authority index
              </p>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Explore the complete AI agent knowledge map
              </h2>
              <p className="text-slate-400 text-xs max-w-2xl leading-relaxed">
                Browse guides grouped by agent type, business function, development workflow, industry, research and MCP infrastructure.
              </p>
            </div>

            <a
              href="/sitemap/"
              onClick={(e) => handleLinkClick(e, '/sitemap/')}
              className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 font-bold text-xs group transition-colors shrink-0"
            >
              <span>View complete HTML sitemap</span>
              <span className="group-hover:translate-x-1 transition-transform" aria-hidden="true">→</span>
            </a>
          </div>

          {/* 9 Programmatic Directory Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {programmaticFooterSections.map((section, idx) => (
              <nav
                key={idx}
                className="space-y-3 pt-2 border-t border-slate-800/60"
                aria-label={section.title}
              >
                <h3 className="font-bold text-white text-xs tracking-tight flex items-center justify-between">
                  {section.href ? (
                    <a
                      href={section.href}
                      onClick={(e) => handleLinkClick(e, section.href!)}
                      className="hover:text-indigo-300 transition-colors"
                    >
                      {section.title}
                    </a>
                  ) : (
                    <span>{section.title}</span>
                  )}
                </h3>

                <ul className="space-y-1.5 text-[11px]">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <a
                        href={link.href}
                        onClick={(e) => handleLinkClick(e, link.href)}
                        className="text-slate-400 hover:text-indigo-300 transition-colors block py-0.5"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Core Authority & Platform Navigation */}
      <section className="py-12 md:py-16 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info Column */}
          <div className="lg:col-span-2 space-y-4 pr-0 md:pr-4">
            <a
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="inline-flex items-center gap-2.5 group"
              aria-label="BestAIAgent.in homepage"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 flex items-center justify-center font-black text-white text-xs shadow-md group-hover:scale-105 transition-transform">
                BA
              </div>
              <span className="font-extrabold text-lg text-white tracking-tight">
                BestAIAgent<span className="text-indigo-400">.in</span>
              </span>
            </a>

            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Independent research, comparisons, rankings and implementation guidance for AI agents, frameworks and MCP infrastructure.
            </p>

            <div className="flex flex-wrap gap-2 pt-1" aria-label="Editorial principles">
              <span className="px-2.5 py-1 rounded-full border border-slate-800 bg-slate-900/80 text-slate-300 text-[10px] font-semibold">
                Independent
              </span>
              <span className="px-2.5 py-1 rounded-full border border-slate-800 bg-slate-900/80 text-slate-300 text-[10px] font-semibold">
                Evidence-led
              </span>
              <span className="px-2.5 py-1 rounded-full border border-slate-800 bg-slate-900/80 text-slate-300 text-[10px] font-semibold">
                Human-reviewed
              </span>
              <span className="px-2.5 py-1 rounded-full border border-slate-800 bg-slate-900/80 text-slate-300 text-[10px] font-semibold">
                Updated regularly
              </span>
            </div>
          </div>

          {/* Platform Column */}
          <nav className="space-y-3" aria-label="Platform navigation">
            <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Platform</h3>
            <ul className="space-y-1.5 text-[11px]">
              {primaryLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Trust & Editorial Column */}
          <nav className="space-y-3" aria-label="Trust & Editorial navigation">
            <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Trust & Editorial</h3>
            <ul className="space-y-1.5 text-[11px]">
              {trustLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Company Column */}
          <nav className="space-y-3" aria-label="Company navigation">
            <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Company & Feeds</h3>
            <ul className="space-y-1.5 text-[11px]">
              {legalLinks.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {onOpenRss && (
                <li>
                  <button
                    onClick={onOpenRss}
                    className="text-amber-400 hover:underline transition-colors font-semibold"
                  >
                    RSS & XML Feeds
                  </button>
                </li>
              )}
              {onOpenPseoRepo && (
                <li>
                  <button
                    onClick={onOpenPseoRepo}
                    className="text-cyan-400 hover:underline transition-colors font-semibold"
                  >
                    PSEO Blueprint
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </section>

      {/* 4. Footer Bottom Bar */}
      <div className="border-t border-slate-800/80 bg-slate-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <p>© {currentYear} BestAIAgent.in. All rights reserved.</p>
          <p className="text-slate-500">
            Product names and trademarks belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ProgrammaticFooter;
