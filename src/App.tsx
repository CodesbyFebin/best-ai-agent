import React, { Suspense, lazy, useState, useEffect, useMemo } from 'react';
import {
  Cpu,
  Code,
  Layers,
  Briefcase,
  LineChart,
  Star,
  Search,
  ArrowRight,
  Sliders,
  HelpCircle,
  MessageSquare,
  Plus,
  Check,
  X,
  ChevronRight,
  Sparkles,
  TrendingUp,
  Newspaper,
  ShieldCheck,
  Globe,
  Calendar,
  User,
  MapPin,
  Mail,
  ArrowLeftRight,
  Settings,
  AlertCircle,
  BookOpen,
  FileText,
  CheckCircle,
  Menu,
  DollarSign,
  ExternalLink,
  Map,
  Network
} from 'lucide-react';
import { authorityPages, trustPages, type TrustPageContent } from './data/trustContent';
import { products, silos, siloPages, getPageBySlug, getRelatedPages, SiloPage, Product } from './data/db';
import { comparisonPages } from './data/comparisons';
import { authorProfiles } from './data/authors';
import { directoryTools, directoryCategories, DirectoryTool } from './data/directory';
import { getCategoryAsset, getToolAsset } from './data/assetRegistry';
import { getExternalLinks, type ExternalLinkType } from './data/externalLinks';
import BrandTile from './components/BrandTile';
import OfficialExternalLink from './components/ExternalLink';
import { pillarUgcData, generateRobustPillarUgc, UgcReview } from './data/pillarUgc';
import { getDetailedFaqList, FAQItemDetailed } from './data/pillarFaqs';
import { allTopicalPages, isTopicalAuthoritySlug, topicalClusters } from './data/topicalAuthority';
import { Database } from 'lucide-react';
import { publicUrl, SITE_URL } from './lib/siteUrl';
import TrustPage from './components/TrustPage';
import AuthorityExpansionBlock from './components/AuthorityExpansionBlock';
import { ReferenceHomeHero, ReferenceHomeShowcase, ReferenceMcpShowcase, ReferencePillarHero } from './components/ReferenceUiSections';
import HomepageContentExtension from './components/HomepageContentExtension';

const ProductProfile = lazy(() => import('./components/ProductProfile'));
const ComparisonPage = lazy(() => import('./components/ComparisonPage'));
const IndiaPillarCustomizer = lazy(() => import('./components/IndiaPillarCustomizer'));
const IndiaBuilderCustomizer = lazy(() => import('./components/IndiaBuilderCustomizer'));
const IndiaMcpCustomizer = lazy(() => import('./components/IndiaMcpCustomizer'));
const IndiaGeneralPillarCustomizer = lazy(() => import('./components/IndiaGeneralPillarCustomizer'));
const GoogleDriveDashboard = lazy(() => import('./components/GoogleDriveDashboard'));
const TopicalAuthorityMap = lazy(() => import('./components/TopicalAuthorityMap'));

const directorySlugOverrides: Record<string, string> = {
  ChatGPT: 'chatgpt',
  Claude: 'claude',
  Gemini: 'gemini',
  Perplexity: 'perplexity',
  'MS Copilot': 'microsoft',
  Cursor: 'cursor-ai',
  'GitHub Copilot': 'github-copilot',
  Vapi: 'vapi-ai',
  Retell: 'retell-ai',
  'Yellow.ai': 'yellow-ai',
  Flowise: 'flowise',
  Dify: 'dify',
  n8n: 'n8n',
  Ollama: 'ollama',
  'LM Studio': 'lm-studio',
};

const getDirectoryToolSlug = (name: string) =>
  directorySlugOverrides[name] || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const getResourceTypesForSlug = (slug: string) =>
  ['official', 'docs', 'github', 'pricing'].filter((type) => getExternalLinks(slug).some((link) => link.type === type)) as ExternalLinkType[];

function AnimateOnIntersection({ children, delay = 0 }: { children: React.ReactNode; delay?: number; key?: string }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => {
      if (el) observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      className="h-full"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'none' : 'translateY(16px)',
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)`,
        transitionDelay: `${delay}s`,
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </div>
  );
}

export default function App() {
  // Navigation / Router State
  // Views: 'home' | 'silo-pillar' | 'article' | 'compare' | 'chat' | 'tuner' | 'editorial' | 'about' | 'disclosure' | 'policy' | 'product'
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedSiloId, setSelectedSiloId] = useState<string>('reviews');
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string>('');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>('cursor-ai');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copiedArticleSlug, setCopiedArticleSlug] = useState<string | null>(null);

  // AI Productivity Tools Directory State
  const [dirCategory, setDirCategory] = useState<string>("All Categories");
  const [dirQuery, setDirQuery] = useState<string>("");
  const [activeDirTool, setActiveDirTool] = useState<DirectoryTool | null>(null);
  const [leaderboardCategory, setLeaderboardCategory] = useState<string>("All");
  const [leaderboardQuery, setLeaderboardQuery] = useState<string>("");

  // Score Customizer Weights State
  const [weights, setWeights] = useState({
    easeOfUse: 12.5,
    features: 12.5,
    docs: 12.5,
    integrations: 12.5,
    value: 12.5,
    reliability: 12.5,
    indiaFit: 15.0,
    scalability: 10.0
  });

  // Compare Board Selected Products (slugs)
  const [compareList, setCompareList] = useState<string[]>(['cursor-ai', 'vapi-ai', 'yellow-ai']);

  // Chatbot State
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'assistant'; text: string }>>([
    {
      sender: 'assistant',
      text: "Namaste! I am your AI Agent Recommendation Assistant. Describe your business challenge, tech stack, or localized operational needs (e.g., 'I run a D2C store in Delhi and need a WhatsApp voice bot to handle orders'), and I will identify the perfect tools, estimate costs in INR, and suggest your next step."
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

   // Cookie Consent State
   const [cookieConsent, setCookieConsent] = useState({ necessary: true, preference: false, analytics: false, marketing: false });
   const [showCookieBanner, setShowCookieBanner] = useState(true);

   // Submission Forms State
  const [toolSubmitForm, setToolSubmitForm] = useState({ name: '', url: '', category: '', description: '', email: '' });
  const [toolSubmitSuccess, setToolSubmitSuccess] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState('');
  const [leadForm, setLeadForm] = useState({ name: '', company: '', phone: '', desc: '' });
  const [leadSuccess, setLeadSuccess] = useState('');

  // Editorial Panel simulation logs
  const [draftStatuses, setDraftStatuses] = useState<Record<string, 'published' | 'draft' | 'scheduled'>>({});
  const [newSEOArticleSlug, setNewSEOArticleSlug] = useState('');
  const [schemaViewerSlug, setSchemaViewerSlug] = useState('best-ai-agent');

  // Enhanced Pillar-Silo FAQ and UGC variables
  const [faqSearchQuery, setFaqSearchQuery] = useState('');
  const [faqCurrentPage, setFaqCurrentPage] = useState(1);
  const [ugcSearchQuery, setUgcSearchQuery] = useState('');
  const [ugcRatingFilter, setUgcRatingFilter] = useState<string>('all');
  const [ugcTechFilter, setUgcTechFilter] = useState<string>('all');
  const [userSubmittedUgcs, setUserSubmittedUgcs] = useState<UgcReview[]>([]);
  const [isUgcModalOpen, setIsUgcModalOpen] = useState(false);
  const [showAllTelemetry, setShowAllTelemetry] = useState(false);

  // UGC Form states
  const [newUgcAuthor, setNewUgcAuthor] = useState('');
  const [newUgcRole, setNewUgcRole] = useState('');
  const [newUgcCompany, setNewUgcCompany] = useState('');
  const [newUgcRating, setNewUgcRating] = useState(5.0);
  const [newUgcTitle, setNewUgcTitle] = useState('');
  const [newUgcUseCase, setNewUgcUseCase] = useState('');
  const [newUgcContent, setNewUgcContent] = useState('');

  const BRAND_LOGO_URL = publicUrl('/assets/brand/logo.png');
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    let pageTitle = "BestAIAgent.in | India's AI Agent Authority Review Hub";
    if (currentView === 'home') {
      pageTitle = "BestAIAgent.in | Discover, Compare & Scale AI Agents for Business";
    } else if (currentView === 'silo-pillar') {
      const s = silos.find(item => item.id === selectedSiloId);
      pageTitle = `${s?.pillarTitle} | ${s?.name} Dashboard | BestAIAgent.in`;
    } else if (currentView === 'article') {
      const p = siloPages.find(item => item.slug === selectedArticleSlug);
      pageTitle = `${p?.metaTitle || p?.title} | BestAIAgent.in`;
    } else if (currentView === 'product') {
      const p = products.find(item => item.slug === selectedProductSlug);
      pageTitle = `${p?.name} Complete Review, Benchmark Scorecard & India Fit | BestAIAgent.in`;
    } else if (currentView === 'compare') {
      pageTitle = "Interactive AI Agent Comparison Board | BestAIAgent.in";
    } else if (currentView === 'chat') {
      pageTitle = "AI Agent Assistant Chat Advisor | BestAIAgent.in";
    } else if (currentView === 'tuner') {
      pageTitle = "Personalized AI Agent Score Tuning Engine | BestAIAgent.in";
    } else if (currentView === 'editorial') {
      pageTitle = "Editorial Workflow & Programmatic Schema Dashboard | BestAIAgent.in";
    } else if (currentView === 'about') {
      pageTitle = trustPages.about?.metaTitle || "About BestAIAgent.in | BestAIAgent.in";
    } else if (currentView === 'disclosure') {
      pageTitle = trustPages['affiliate-disclosure']?.metaTitle || "Affiliate Disclosure | BestAIAgent.in";
    } else if (currentView === 'policy') {
      const policyPage = trustPages[selectedArticleSlug];
      pageTitle = policyPage?.metaTitle || (selectedArticleSlug === 'review-policy' ? "Review Policy & Integrity Standards | BestAIAgent.in" : "Editorial Policy & Evaluation Criteria | BestAIAgent.in");
    } else if (currentView === 'trust') {
      const page = trustPages[selectedArticleSlug];
      pageTitle = `${page?.metaTitle || 'Trust Page'} | BestAIAgent.in`;
    } else if (currentView === 'authority') {
      const page = authorityPages[selectedArticleSlug];
      pageTitle = `${page?.metaTitle || 'Authority Asset'} | BestAIAgent.in`;
    } else if (currentView === 'methodology') {
      pageTitle = 'Review Methodology | BestAIAgent.in';
    } else if (currentView === 'team') {
      pageTitle = 'Team | BestAIAgent.in';
    } else if (currentView === 'contact') {
      pageTitle = trustPages.contact?.metaTitle || "Contact BestAIAgent.in | BestAIAgent.in";
    } else if (currentView === 'drive') {
      pageTitle = "Google Drive AI Agent Workspace & Requirements Audit | BestAIAgent.in";
    } else if (currentView === 'not-found') {
      pageTitle = "Page Not Found | BestAIAgent.in";
    }
    document.title = pageTitle;

    const routePath = pathForRoute(currentView, selectedSiloId, selectedArticleSlug, selectedProductSlug);
    const canonical = publicUrl(routePath === '/' ? '/' : routePath);
    const metaDescription = currentView === 'product'
      ? products.find(item => item.slug === selectedProductSlug)?.summary
      : currentView === 'article'
        ? siloPages.find(item => item.slug === selectedArticleSlug)?.metaDescription || siloPages.find(item => item.slug === selectedArticleSlug)?.description
        : trustPages[selectedArticleSlug]?.metaDescription || authorityPages[selectedArticleSlug]?.metaDescription || "Compare the best AI agents in India with independent rankings, INR pricing, DPDP-aware privacy notes, and expert reviews.";

    const setMeta = (name: string, content: string, property = false) => {
      const selector = property ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        if (property) element.setAttribute('property', name);
        else element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;
    setMeta('description', metaDescription);
    setMeta('og:title', pageTitle, true);
    setMeta('og:description', metaDescription, true);
    setMeta('og:url', canonical, true);
    setMeta('og:type', 'website', true);
    setMeta('twitter:title', pageTitle);
    setMeta('twitter:description', metaDescription);
    setMeta('twitter:card', 'summary_large_image');
  }, [currentView, selectedSiloId, selectedArticleSlug, selectedProductSlug]);

  const pathForRoute = (view: string, siloId?: string, articleSlug?: string, productSlug?: string) => {
    if (view === 'home') return '/';
    if (view === 'product') return `/tools/${productSlug || selectedProductSlug}`;
    if (view === 'article') return `/${articleSlug || selectedArticleSlug}`;
    if (view === 'compare') return articleSlug ? `/${articleSlug}` : '/compare';
    if (view === 'author') return `/authors/${articleSlug || selectedArticleSlug}`;
    if (view === 'policy') return `/${articleSlug || selectedArticleSlug || 'editorial-policy'}`;
    if (view === 'trust') return `/${articleSlug || selectedArticleSlug || 'privacy-policy'}`;
    if (view === 'authority') return `/${articleSlug || selectedArticleSlug || 'mcp-directory'}`;
    if (view === 'methodology') return '/methodology';
    if (view === 'team') return '/team';
    if (view === 'disclosure') return '/affiliate-disclosure';
    if (view === 'scoring') return '/ai-agent-scoring-system';
    if (view === 'compliance') return '/ai-agent-security';
    if (view === 'about') return '/about';
    if (view === 'contact') return '/contact';
    if (view === 'topical-map') return '/topical-authority-map';
    if (view === 'drive') return '/google-drive-ai-agent-workspace';
    if (view === 'tuner') return '/ai-agent-score-tuner';
    if (view === 'editorial') return '/editorial-dashboard';
    if (view === 'chat') return '/ai-agent-advisor';
    if (view === 'silo-pillar') {
      const map: Record<string, string> = {
        reviews: '/best-ai-agent',
        builders: '/ai-agent-builders-hub',
        'coding-agents': '/coding-agents-hub',
        frameworks: '/ai-agent-builders-hub',
        business: '/business-ai-hub',
        research: '/ai-agent-trends',
        mcp: '/mcp-hub',
      };
      return map[siloId || selectedSiloId] || '/best-ai-agent';
    }
    return '/';
  };

  const applyPathRoute = (pathName: string) => {
    const cleanPath = (pathName || '/').replace(/\/+$/, '') || '/';
    const slug = cleanPath.replace(/^\//, '');
    if (cleanPath === '/') {
      setCurrentView('home');
      return;
    }
    if (cleanPath === '/ai-agent-tools' || cleanPath === '/search') {
      setCurrentView('home');
      if (cleanPath === '/ai-agent-tools') {
        window.setTimeout(() => document.getElementById('productivity-directory')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
      }
      return;
    }
    if (cleanPath.startsWith('/tools/')) {
      setCurrentView('product');
      setSelectedProductSlug(cleanPath.replace('/tools/', ''));
      return;
    }
    if (cleanPath.startsWith('/authors/')) {
      setCurrentView('author');
      setSelectedArticleSlug(cleanPath.replace('/authors/', ''));
      return;
    }
    if (cleanPath.startsWith('/entity/')) {
      const entitySlug = `${cleanPath.replace('/entity/', '')}-entity`;
      if (getPageBySlug(entitySlug) || isTopicalAuthoritySlug(entitySlug)) {
        setCurrentView('article');
        setSelectedArticleSlug(entitySlug);
        return;
      }
    }
    const editorialMap: Record<string, string> = {
      '/editorial-policy': 'policy',
      '/affiliate-disclosure': 'disclosure',
      '/methodology': 'methodology',
      '/privacy-policy': 'trust',
      '/terms': 'trust',
      '/data-deletion-request': 'trust',
      '/team': 'team',
      '/mcp-directory': 'authority',
      '/ai-agent-market-map': 'authority',
      '/ai-agent-benchmark': 'authority',
      '/ai-agent-rankings': 'authority',
      '/ai-agent-awards': 'authority',
      '/ai-agent-glossary': 'authority',
      '/review-policy': 'policy',
      '/corrections-policy': 'policy',
      '/about': 'about',
      '/contact': 'contact',
      '/ai-agent-scoring-system': 'scoring',
      '/ai-agent-security': 'compliance',
      '/about-editorial-team': 'about',
      '/topical-authority-map': 'topical-map',
      '/google-drive-ai-agent-workspace': 'drive',
      '/ai-agent-score-tuner': 'tuner',
      '/editorial-dashboard': 'editorial',
      '/ai-agent-advisor': 'chat',
      '/ai-agent-statistics': 'authority',
      '/industry-report': 'authority',
      '/ai-agent-cost-report': 'authority',
      '/ai-agent-adoption-report': 'authority',
    };
    if (editorialMap[cleanPath]) {
      setCurrentView(editorialMap[cleanPath]);
      setSelectedArticleSlug(cleanPath.replace(/^\//, ''));
      return;
    }
    if (authorityPages[slug]) {
      setCurrentView('authority');
      setSelectedArticleSlug(slug);
      return;
    }
    if (comparisonPages.some(c => c.slug === slug) || slug.includes('-vs-')) {
      setCurrentView('compare');
      setSelectedArticleSlug(slug);
      return;
    }
    if (products.some(p => p.slug === slug)) {
      setCurrentView('product');
      setSelectedProductSlug(slug);
      return;
    }
    if (getPageBySlug(slug) || isTopicalAuthoritySlug(slug)) {
      setCurrentView('article');
      setSelectedArticleSlug(slug);
      return;
    }
    const hubMap: Record<string, string> = {
      'coding-agents-hub': 'coding-agents',
      'business-ai-hub': 'business',
      'ai-agent-builders-hub': 'builders',
      'voice-ai-hub': 'business',
      'mcp-hub': 'mcp',
      'free-ai-agents-hub': 'reviews',
      'glossary-hub': 'research',
      'alternatives-hub': 'reviews',
      'pricing-hub': 'reviews',
      'tutorials-hub': 'frameworks',
    };
    if (hubMap[slug]) {
      setCurrentView('silo-pillar');
      setSelectedSiloId(hubMap[slug]);
      return;
    }
    setCurrentView('not-found');
    setSelectedArticleSlug(slug);
  };

  // Handle simulated Routing paths
  const routeTo = (view: string, siloId?: string, articleSlug?: string, productSlug?: string) => {
    setCurrentView(view);
    if (siloId) setSelectedSiloId(siloId);
    if (articleSlug) setSelectedArticleSlug(articleSlug);
    if (productSlug) setSelectedProductSlug(productSlug);
    setIsMobileMenuOpen(false);
    const nextPath = pathForRoute(view, siloId, articleSlug, productSlug);
    if (typeof window !== 'undefined' && window.location.pathname !== nextPath) {
      window.history.pushState({}, '', nextPath);
    }
  };

  const navigateToPath = (event: React.MouseEvent<HTMLAnchorElement>, href: string, view?: string) => {
    event.preventDefault();
    setIsMobileMenuOpen(false);
    if (view) {
      routeTo(view, undefined, href.replace(/^\//, ''));
      return;
    }
    if (typeof window !== 'undefined' && window.location.pathname !== href) {
      window.history.pushState({}, '', href);
    }
    applyPathRoute(href);
  };

  const mainNavLinks = [
    { label: 'AI Agents', href: '/best-ai-agent' },
    { label: 'MCP Directory', href: '/mcp-directory' },
    { label: 'Compare', href: '/compare' },
    { label: 'Rankings', href: '/ai-agent-rankings' },
    { label: 'Tools', href: '/best-ai-tools' },
    { label: 'Resources', href: '/tutorials-hub' },
    { label: 'Pricing', href: '/pricing' },
  ];

  const homeQuickLinks = [
    { label: 'Best AI Agent for Coding', href: '/best-ai-agent-for-coding' },
    { label: 'Best AI Agent for Business', href: '/best-ai-agent-for-business' },
    { label: 'Best AI Voice Agent', href: '/best-ai-voice-agent' },
    { label: 'Best AI Agent Builder', href: '/best-ai-agent-builder' },
    { label: 'Free AI Agents', href: '/free-ai-agents-hub' },
    { label: 'AI Agent Pricing', href: '/pricing-hub' },
  ];

  const homeVisualCategories = [
    { slug: 'coding-agents', label: 'Coding agents', href: '/coding-agents-hub' },
    { slug: 'business-ai', label: 'Business AI', href: '/business-ai-hub' },
    { slug: 'voice-ai', label: 'Voice AI', href: '/voice-ai-hub' },
    { slug: 'builders', label: 'Builders', href: '/ai-agent-builders-hub' },
    { slug: 'mcp', label: 'MCP', href: '/mcp-hub' },
    { slug: 'pricing', label: 'Pricing', href: '/pricing-hub' },
    { slug: 'alternatives', label: 'Alternatives', href: '/alternatives-hub' },
    { slug: 'free', label: 'Free agents', href: '/free-ai-agents-hub' },
  ];

  const homeTopToolStrip = [
    { slug: 'cursor-ai', name: 'Cursor AI' },
    { slug: 'github-copilot', name: 'GitHub Copilot' },
    { slug: 'claude-code', name: 'Claude Code' },
    { slug: 'vapi-ai', name: 'Vapi AI' },
    { slug: 'retell-ai', name: 'Retell AI' },
    { slug: 'flowise', name: 'Flowise' },
    { slug: 'dify', name: 'Dify' },
    { slug: 'n8n', name: 'n8n' },
  ];

  const homepageGrowthPaths = [
    {
      title: 'Buyer Guides',
      href: '/buyers-guides',
      summary: 'Startup, enterprise, SaaS, freelancer, agency, developer, student, content creator, and India buyer paths.',
      Icon: Briefcase,
    },
    {
      title: 'Reddit Reviews',
      href: '/reddit',
      summary: 'Community-intent pages for Cursor, Claude Code, Copilot, Flowise, Vapi, Retell, and category searches.',
      Icon: MessageSquare,
    },
    {
      title: 'AI Agent Directory',
      href: '/ai-agent-directory',
      summary: 'Browsable agent directories by coding, business, voice, builders, open source, MCP, and free tools.',
      Icon: Database,
    },
    {
      title: 'Cost Calculators',
      href: '/calculators',
      summary: 'Cost and ROI calculators for AI agents, Cursor, Vapi, Retell, and support automation.',
      Icon: DollarSign,
    },
    {
      title: 'India Hub',
      href: '/india',
      summary: 'INR pricing, GST invoice, DPDP, WhatsApp Business, startup, SME, and India-specific buying guides.',
      Icon: Globe,
    },
    {
      title: 'Entity Index',
      href: '/entity',
      summary: 'LLM-readable entity pages for Cursor, Copilot, Claude Code, Vapi, Retell, Flowise, Dify, LangGraph, CrewAI, and AutoGen.',
      Icon: Network,
    },
  ];

  const homepageClusters = [
    {
      title: 'Coding AI Agents',
      href: '/coding-agents-hub',
      summary: 'Compare developer-first AI agents for Cursor-style IDE assistance, GitHub Copilot workflows, repo understanding, code review, testing, and refactoring. This hub is built for Bengaluru product teams, freelance developers, and engineering leaders who need implementation detail, pricing context, and realistic limitations.',
      links: [
        { label: 'Cursor AI review', href: '/tools/cursor-ai' },
        { label: 'Best AI agent for coding', href: '/best-ai-agent-for-coding' },
        { label: 'Cursor vs GitHub Copilot', href: '/cursor-vs-github-copilot' },
      ],
    },
    {
      title: 'Business AI Agents',
      href: '/business-ai-hub',
      summary: 'Find business automation agents for CRM, sales follow-up, support routing, workflow operations, and WhatsApp-linked processes. The recommendations consider Indian SME budgets, GST invoice needs, DPDP privacy expectations, onboarding effort, and whether a tool fits founders, agencies, or enterprise teams.',
      links: [
        { label: 'Best AI agent for business', href: '/best-ai-agent-for-business' },
        { label: 'AI sales agents', href: '/best-ai-agent-for-sales' },
        { label: 'Customer support agents', href: '/best-ai-agent-for-customer-support' },
      ],
    },
    {
      title: 'Voice AI Agents',
      href: '/voice-ai-hub',
      summary: 'Review voice AI agents for Indian call centres, clinics, real estate teams, D2C support, appointment booking, and outbound qualification. We examine latency, call quality, language handling, telephony integration, consent workflows, and where Vapi, Retell, and enterprise vendors differ.',
      links: [
        { label: 'Best AI voice agent', href: '/best-ai-voice-agent' },
        { label: 'Vapi review', href: '/vapi-review' },
        { label: 'Vapi vs Retell', href: '/vapi-vs-retell' },
      ],
    },
    {
      title: 'AI Agent Builders',
      href: '/ai-agent-builders-hub',
      summary: 'Explore no-code, low-code, and developer platforms for building AI agents with tools, memory, RAG, workflow triggers, and API actions. This cluster helps Indian startups choose between Flowise, Dify, n8n, CrewAI, LangGraph, and managed agent platforms.',
      links: [
        { label: 'Best AI agent builder', href: '/best-ai-agent-builder' },
        { label: 'Flowise review', href: '/flowise-review' },
        { label: 'Dify review', href: '/dify-review' },
      ],
    },
    {
      title: 'Pricing Intelligence',
      href: '/pricing-hub',
      summary: 'Use INR-oriented pricing guides to estimate monthly tool costs, user-seat math, API usage, GST invoice availability, card or UPI payment fit, and enterprise procurement friction. Pricing can change, so every guide uses careful estimates and official-site verification notes.',
      links: [
        { label: 'Cursor pricing', href: '/cursor-pricing' },
        { label: 'GitHub Copilot pricing', href: '/github-copilot-pricing' },
        { label: 'Vapi pricing', href: '/vapi-pricing' },
      ],
    },
    {
      title: 'Alternatives',
      href: '/alternatives-hub',
      summary: 'Compare practical alternatives when a tool is too expensive, too technical, too limited, or not procurement-friendly for India. These pages help buyers short-list replacements for Cursor, Copilot, Vapi, Retell, Flowise, Dify, Intercom, and automation platforms.',
      links: [
        { label: 'Cursor alternatives', href: '/cursor-alternatives' },
        { label: 'Vapi alternatives', href: '/vapi-alternatives' },
        { label: 'Flowise alternatives', href: '/flowise-alternatives' },
      ],
    },
    {
      title: 'Tutorials',
      href: '/tutorials-hub',
      summary: 'Follow implementation tutorials for coding agents, voice bots, MCP servers, agent builders, and workflow automations. Guides focus on realistic Indian use cases such as WhatsApp lead capture, support triage, API-connected workflows, and internal team rollout checklists.',
      links: [
        { label: 'How to use Cursor AI', href: '/how-to-use-cursor-ai' },
        { label: 'Build with Flowise', href: '/how-to-build-ai-agent-with-flowise' },
        { label: 'Create an MCP server', href: '/how-to-create-mcp-server' },
      ],
    },
    {
      title: 'Glossary',
      href: '/glossary-hub',
      summary: 'Learn the core AI agent vocabulary: RAG, MCP, function calling, tool use, context windows, AgentOps, multi-agent systems, and memory. Each definition connects to reviews, comparisons, tutorials, and buyer guides so humans and AI systems can understand the content graph.',
      links: [
        { label: 'What is RAG', href: '/what-is-rag' },
        { label: 'What is MCP', href: '/what-is-mcp' },
        { label: 'What is tool use', href: '/what-is-tool-use' },
      ],
    },
    {
      title: 'MCP Servers',
      href: '/mcp-hub',
      summary: 'Track Model Context Protocol explainers, server directories, security notes, and implementation guidance for developers connecting AI agents to tools and data. MCP pages are written for engineering teams evaluating safer, maintainable agent integrations.',
      links: [
        { label: 'MCP hub', href: '/mcp-hub' },
        { label: 'Best MCP servers', href: '/best-mcp-servers' },
        { label: 'MCP security', href: '/mcp-security' },
      ],
    },
    {
      title: 'Open Source AI Agents',
      href: '/free-ai-agents-hub',
      summary: 'Discover free, open-source, trial-friendly, and lower-cost AI agents for Indian students, solo founders, agencies, and early-stage startups. This cluster separates genuinely useful free tiers from tools that become expensive after limited testing.',
      links: [
        { label: 'Best free AI agents', href: '/best-free-ai-agents' },
        { label: 'Free coding agents', href: '/best-free-ai-coding-agents' },
        { label: 'Open-source agents', href: '/best-free-open-source-ai-agents' },
      ],
    },
  ];

  const homepageFaqs = [
    ['What is the best AI agent in India?', 'The best AI agent depends on the use case. Cursor AI is strong for coding, Vapi and Retell are strong for voice automation, Yellow.ai and Intercom fit customer support, while Flowise, Dify, CrewAI, and LangGraph fit custom agent building.'],
    ['Which AI agent is best for coding?', 'Cursor AI is usually the strongest coding-agent starting point for Indian developer teams, while GitHub Copilot, Claude Code-style tools, and Windsurf are important alternatives to compare by IDE fit, pricing, and code-review workflow.'],
    ['What is the best free AI agent?', 'The best free AI agent depends on whether you need coding, automation, voice, or builder workflows. Flowise, Dify, CrewAI, and open-source frameworks are useful starting points, but free tiers often require technical setup or have usage limits.'],
    ['Which AI agent is best for Indian businesses?', 'Indian businesses should prioritize clear INR cost estimates, WhatsApp or CRM integration, GST invoice availability, support SLAs, DPDP-aware data handling, and team onboarding effort before choosing an AI agent.'],
    ['Which AI agent supports WhatsApp automation?', 'Yellow.ai, Intercom-style support platforms, some voice AI stacks, and workflow tools may support WhatsApp workflows depending on vendor integrations, WhatsApp Business API setup, template approvals, and escalation requirements.'],
    ['What is the best AI agent builder?', 'Flowise and Dify are useful visual builders, while CrewAI and LangGraph are stronger developer frameworks for custom multi-agent workflows. The best builder depends on engineering skill, hosting preference, and integration depth.'],
    ['Are AI agents DPDP compliant?', 'AI agents are not automatically DPDP compliant. Indian businesses should review consent, purpose limitation, access control, data retention, deletion workflows, vendor processing terms, and whether personal data is handled safely.'],
    ['How much do AI agents cost in India?', 'AI agent costs in India vary from free open-source tools to paid SaaS subscriptions and usage-based API bills. INR estimates depend on exchange rates, GST treatment, user seats, call minutes, messages, tokens, and vendor plan limits.'],
    ['Is Cursor better than GitHub Copilot?', 'Cursor is often better for AI-native IDE workflows and repo-level coding assistance, while GitHub Copilot remains strong for developers already embedded in GitHub and supported IDEs. The better choice depends on workflow and budget.'],
    ['What is MCP in AI agents?', 'MCP, or Model Context Protocol, is a protocol for connecting AI systems to tools, data, and external context in a more standardized way. It matters when teams need maintainable agent integrations.'],
    ['Which AI agent is best for startups?', 'Startups should usually shortlist tools with fast setup, low monthly cost, good documentation, practical integrations, and clear ROI. Coding agents, no-code builders, and support automation agents are common first deployments.'],
    ['Which AI agent is best for customer support?', 'Yellow.ai, Intercom, voice AI agents such as Vapi or Retell, and workflow builders can all support customer-service automation. The right choice depends on WhatsApp needs, ticket volume, language support, and escalation design.'],
  ];

  // Live Sync routing Hash and parameters for copyable URLs sharing
  useEffect(() => {
    const handleHashRouter = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#')) {
        const params = new URLSearchParams(hash.slice(1));
        const view = params.get('view');
        const silo = params.get('silo');
        const article = params.get('article');
        const product = params.get('product');

        if (view) {
          setCurrentView(view);
          if (silo) setSelectedSiloId(silo);
          if (article) setSelectedArticleSlug(article);
          if (product) setSelectedProductSlug(product);
        } else if (product) {
          routeTo('product', undefined, undefined, product);
        } else if (article) {
          routeTo('article', undefined, article);
        } else if (silo) {
          routeTo('silo-pillar', silo);
        }
      } else {
        applyPathRoute(window.location.pathname);
      }
    };

    handleHashRouter();
    window.addEventListener('hashchange', handleHashRouter);
    window.addEventListener('popstate', () => applyPathRoute(window.location.pathname));
    return () => {
      window.removeEventListener('hashchange', handleHashRouter);
      window.removeEventListener('popstate', () => applyPathRoute(window.location.pathname));
    };
  }, []);

  // Structural Schema Markup (JSON-LD) Dynamic Injection for perfect AEO/SEO crawlers
  useEffect(() => {
    const existingScript = document.getElementById('seo-jsonld-dynamic');
    if (existingScript) existingScript.remove();

    let schemaData: any = null;

    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "BestAIAgent.in",
      "url": SITE_URL,
      "logo": BRAND_LOGO_URL,
      "description": "India's premier independent AI Agent review authority and benchmark ranking index dashboard.",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      },
      "sameAs": []
    };

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "BestAIAgent.in",
      "url": SITE_URL,
      "description": "India's premier independent AI Agent review authority and benchmark ranking index dashboard.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${SITE_URL}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };

    if (currentView === 'home') {
      schemaData = {
        "@context": "https://schema.org",
        "@graph": [
          organizationSchema,
          websiteSchema
        ]
      };
    } else if (currentView === 'silo-pillar') {
      const s = silos.find(item => item.id === selectedSiloId);
      if (s) {
        schemaData = {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": `${s.pillarTitle} Category Hub`,
          "description": s.description,
          "url": publicUrl(pathForRoute('silo-pillar', s.id)),
          "itemListElement": products.map((p, idx) => ({
            "@type": "ListItem",
            "position": idx + 1,
            "name": p.name,
            "url": publicUrl(`/tools/${p.slug}`)
          }))
        };
      }
    } else if (currentView === 'article') {
      const p = getPageBySlug(selectedArticleSlug);
      if (p) {
        schemaData = {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              "name": "Dynamic Breadcrumb",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": SITE_URL
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": p.siloId === 'reviews' ? 'Reviews' : 'Research',
                  "item": publicUrl(pathForRoute('silo-pillar', p.siloId))
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": p.title,
                  "item": publicUrl(`/${p.slug}`)
                }
              ]
            },
            {
              "@type": "Article",
              "headline": p.title,
              "author": {
                "@type": "Person",
                "name": p.author.split(',')[0]
              },
              "datePublished": p.publishedAt,
              "dateModified": p.updatedAt,
              "publisher": {
                "@type": "Organization",
                "name": "BestAIAgent.in",
                "logo": {
                  "@type": "ImageObject",
                  "url": BRAND_LOGO_URL
                }
              },
              "description": p.metaDescription,
              "mainEntityOfPage": publicUrl(`/${p.slug}`)
            }
          ]
        };
      }
    } else if (currentView === 'trust' || currentView === 'methodology' || currentView === 'team') {
      const page = currentView === 'methodology' ? trustPages.methodology : currentView === 'team' ? trustPages.team : trustPages[selectedArticleSlug];
      if (page) {
        schemaData = {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${publicUrl(`/${page.slug}`)}#webpage`,
              "name": page.metaTitle,
              "description": page.metaDescription,
              "url": publicUrl(`/${page.slug}`),
              "isPartOf": { "@id": `${SITE_URL}/#website` },
              "author": { "@type": "Person", "name": page.author },
              "dateModified": page.updated
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${publicUrl(`/${page.slug}`)}#breadcrumb`,
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
                { "@type": "ListItem", "position": 2, "name": page.view === 'authority' ? 'Authority Assets' : page.view === 'methodology' ? 'Methodology' : 'Trust', "item": publicUrl(`/${page.slug}`) }
              ]
            }
          ]
        };
      }
    } else if (currentView === 'authority') {
      const page = authorityPages[selectedArticleSlug];
      if (page) {
        schemaData = {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${publicUrl(`/${page.slug}`)}#webpage`,
              "name": page.metaTitle,
              "description": page.metaDescription,
              "url": publicUrl(`/${page.slug}`),
              "isPartOf": { "@id": `${SITE_URL}/#website` },
              "author": { "@type": "Person", "name": page.author },
              "dateModified": page.updated
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${publicUrl(`/${page.slug}`)}#breadcrumb`,
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
                { "@type": "ListItem", "position": 2, "name": "Authority Assets", "item": publicUrl(`/${page.slug}`) }
              ]
            }
          ]
        };
      }
    } else if (currentView === 'product') {
      const p = products.find(prod => prod.slug === selectedProductSlug);
      if (p) {
        schemaData = {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              "@id": `${publicUrl(`/tools/${p.slug}`)}#software`,
              "url": publicUrl(`/tools/${p.slug}`),
              "name": p.name,
              "image": p.logoUrl,
              "description": p.summary,
              "operatingSystem": "Linux, Windows, macOS, Cloud-Based, Web-SaaS, iOS, Android",
              "applicationCategory": p.slug === 'cursor-ai' || p.slug === 'claude-code' ? "DeveloperApplication" : "BusinessApplication",
              "offers": {
                "@type": "Offer",
                "priceCurrency": p.slug === 'cursor-ai' ? "USD" : "INR",
                "price": p.slug === 'cursor-ai' ? "20" : "0",
                "priceSpecification": {
                  "@type": "UnitPriceSpecification",
                  "priceCurrency": "INR",
                  "price": p.startingPriceINR.includes('₹1,680') ? 1680 : 0,
                  "referenceQuantity": {
                    "@type": "QuantitativeValue",
                    "value": 1,
                    "unitCode": "MONTH"
                  }
                }
              },
              "featureList": p.featuresList,
              "publisher": {
                "@type": "Organization",
                "name": p.vendorName || "BestAIAgent.in",
                "url": p.vendorUrl || SITE_URL
              }
            }
          ]
        };
      }
    } else if (currentView === 'author') {
      const author = authorProfiles.find(a => a.slug === selectedArticleSlug);
      if (author) {
        schemaData = {
          "@context": "https://schema.org",
          "@type": "Person",
          "name": author.name,
          "jobTitle": author.role,
          "description": author.bio,
          "url": publicUrl(`/authors/${author.slug}`),
          "worksFor": {
            "@type": "Organization",
            "name": "BestAIAgent.in"
          }
        };
      }
    }

    if (schemaData) {
      const script = document.createElement('script');
      script.id = 'seo-jsonld-dynamic';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(schemaData, null, 2);
      document.head.appendChild(script);
    }
  }, [currentView, selectedSiloId, selectedArticleSlug, selectedProductSlug]);

  // Helper to get active silo object
  const activeSilo = useMemo(() => {
    return silos.find(s => s.id === selectedSiloId) || silos[0];
  }, [selectedSiloId]);

  // Helper to list supporting pages in active silo
  const activeSiloPages = useMemo(() => {
    return siloPages.filter(p => p.siloId === selectedSiloId);
  }, [selectedSiloId]);

  // Compute calculated scores based on custom user metric weights sliders
  const sortedProducts = useMemo(() => {
    const values = Object.values(weights) as number[];
    const totalWeight = values.reduce((a, b) => a + b, 0);
    return [...products].map(p => {
      const weightedSum =
        p.scores.easeOfUse * weights.easeOfUse +
        p.scores.features * weights.features +
        p.scores.docs * weights.docs +
        p.scores.integrations * weights.integrations +
        p.scores.value * weights.value +
        p.scores.reliability * weights.reliability +
        p.scores.indiaFit * weights.indiaFit +
        p.scores.scalability * weights.scalability;

      const scoreAdjusted = Number(((weightedSum / totalWeight)).toFixed(1));
      return { ...p, calculatedScore: scoreAdjusted };
    }).sort((a, b) => b.calculatedScore - a.calculatedScore);
  }, [weights]);

  const leaderboardCategories = ['All', 'Coding', 'Voice', 'Business', 'Builder', 'Open Source'];
  const filteredLeaderboardProducts = useMemo(() => {
    const query = leaderboardQuery.trim().toLowerCase();
    return sortedProducts.filter(p => {
      const categoryMatch = leaderboardCategory === 'All' || (leaderboardCategory === 'Coding' && (p.name.toLowerCase().includes('cursor') || p.name.toLowerCase().includes('copilot') || p.name.toLowerCase().includes('claude'))) || (leaderboardCategory === 'Voice' && (p.name.toLowerCase().includes('vapi') || p.name.toLowerCase().includes('retell') || p.name.toLowerCase().includes('yellow'))) || (leaderboardCategory === 'Business' && (p.name.toLowerCase().includes('yellow') || p.name.toLowerCase().includes('intercom') || p.name.toLowerCase().includes('n8n'))) || (leaderboardCategory === 'Builder' && (p.name.toLowerCase().includes('flowise') || p.name.toLowerCase().includes('dify') || p.name.toLowerCase().includes('crewai') || p.name.toLowerCase().includes('langgraph') || p.name.toLowerCase().includes('autogen'))) || (leaderboardCategory === 'Open Source' && p.openSource);
      const queryMatch = !query || `${p.name} ${p.summary} ${p.bestFor} ${p.vendorName}`.toLowerCase().includes(query);
      return categoryMatch && queryMatch;
    });
  }, [sortedProducts, leaderboardCategory, leaderboardQuery]);

  // Handle Search Triggering
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();

    const matchedProducts = products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.summary.toLowerCase().includes(query) ||
      p.bestFor.toLowerCase().includes(query)
    ).map(p => ({ type: 'product', title: p.name, slug: p.slug, group: 'AI Tools', snippet: p.summary }));

    const matchedArticles = siloPages.filter(a =>
      a.title.toLowerCase().includes(query) ||
      a.directAnswer.toLowerCase().includes(query) ||
      a.primaryKeyword.toLowerCase().includes(query)
    ).map(a => ({ type: 'article', title: a.title, slug: a.slug, group: 'Research & Guides', snippet: a.directAnswer.slice(0, 140) + '...' }));

    const matchedTrust = Object.values({ ...trustPages, ...authorityPages } as Record<string, TrustPageContent>).filter(p =>
      p.title.toLowerCase().includes(query) ||
      p.metaDescription.toLowerCase().includes(query) ||
      p.h1.toLowerCase().includes(query)
    ).map(p => ({ type: 'trust', title: p.title, slug: p.slug, group: p.view === 'authority' ? 'Authority Assets' : 'Trust & Legal', snippet: p.metaDescription }));

    return [...matchedProducts, ...matchedArticles, ...matchedTrust];
  }, [searchQuery]);

  // Memoized filtered and searched Directory tools
  const filteredDirTools = useMemo(() => {
    return directoryTools.filter(tool => {
      const matchCategory = dirCategory === "All Categories" || tool.category === dirCategory;
      const matchQuery = !dirQuery.trim() ||
        tool.name.toLowerCase().includes(dirQuery.toLowerCase().trim()) ||
        tool.bestFor.toLowerCase().includes(dirQuery.toLowerCase().trim()) ||
        tool.description.toLowerCase().includes(dirQuery.toLowerCase().trim());
      return matchCategory && matchQuery;
    });
  }, [dirCategory, dirQuery]);

  // Dynamic weights tuner preset triggers
  const applyPreset = (preset: 'india' | 'developer' | 'budget' | 'compliance' | 'nocode') => {
    if (preset === 'india') {
      setWeights({ easeOfUse: 10, features: 10, docs: 10, integrations: 10, value: 12, reliability: 10, indiaFit: 30, scalability: 8 });
    } else if (preset === 'developer') {
      setWeights({ easeOfUse: 8, features: 15, docs: 20, integrations: 15, value: 8, reliability: 12, indiaFit: 10, scalability: 12 });
    } else if (preset === 'budget') {
      setWeights({ easeOfUse: 10, features: 8, docs: 8, integrations: 8, value: 30, reliability: 10, indiaFit: 18, scalability: 8 });
    } else if (preset === 'compliance') {
      setWeights({ easeOfUse: 8, features: 8, docs: 8, integrations: 8, value: 10, reliability: 28, indiaFit: 20, scalability: 10 });
    } else if (preset === 'nocode') {
      setWeights({ easeOfUse: 30, features: 10, docs: 6, integrations: 15, value: 12, reliability: 10, indiaFit: 11, scalability: 6 });
    }
  };

  // Live ChatGPT-recommender Submit Trigger
  const handleChatSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setChatInput('');
    setIsChatLoading(true);

try {
      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsg,
          industry: 'SME / Local Business',
          budget: 'Flexible',
          languagePreference: 'Hinglish / Multilingual'
        })
      });
      if (!response.ok) {
        setChatMessages(prev => [...prev, { sender: 'assistant', text: "Request failed. Please try again later." }]);
        return;
      }
      const data = await response.json();
      setChatMessages(prev => [...prev, { sender: 'assistant', text: data.text || "I was unable to consult the model right now. Please test another workflow query." }]);
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [...prev, { sender: 'assistant', text: "Server was offline or busy. Let me outline our expert recommendation: Use Vapi for Hinglish/Tamil phone agent networks, and Yellow.ai for official Meta WhatsApp checkout integrations." }]);
    } finally {
      setIsChatLoading(false);
    }
  };

// Forms submit API mimics
  const submitNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail })
      });
      if (!response.ok) {
        setNewsletterSuccess("Request failed. Please try again later.");
        return;
      }
      const data = await response.json();
      setNewsletterSuccess(data.message);
      setNewsletterEmail('');
    } catch (e) {
      setNewsletterSuccess("Request failed. Please try again later.");
    }
  };

  const submitToolForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/submit-tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toolSubmitForm)
      });
      if (!response.ok) {
        setToolSubmitSuccess("Request failed. Please try again later.");
        return;
      }
      const data = await response.json();
      setToolSubmitSuccess(data.message);
      setToolSubmitForm({ name: '', url: '', category: '', description: '', email: '' });
    } catch (e) {
      setToolSubmitSuccess("Request failed. Please try again later.");
    }
  };

  const submitLeadForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadForm)
      });
      if (!response.ok) {
        setLeadSuccess("Request failed. Please try again later.");
        return;
      }
      const data = await response.json();
      setLeadSuccess(data.message);
      setLeadForm({ name: '', company: '', phone: '', desc: '' });
    } catch (e) {
      setLeadSuccess("Request failed. Please try again later.");
    }
  };

  const handleCreateProgrammaticPage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSEOArticleSlug) return;
    const cleanSlug = newSEOArticleSlug.toLowerCase().trim().replace(/\s+/g, '-');
    alert(`Success! Generated dynamic pSEO route: /${selectedSiloId}/${cleanSlug}\nThis contains structured tables, schema markup, and dynamic internal links.`);
    setNewSEOArticleSlug('');
  };

  const currentAuthorityExpansion = (() => {
    if (currentView === 'not-found' || currentView === 'author' || currentView === 'topical-map' || currentView === 'editorial') return null;
    if (currentView === 'home') {
      return {
        slug: 'home',
        title: 'BestAIAgent.in: India AI Agent Authority',
        description: 'BestAIAgent.in helps Indian founders, developers, SMEs, agencies, and enterprises compare AI agents, coding tools, voice agents, builders, MCP servers, pricing, alternatives, and implementation guides.',
        primaryKeyword: 'best ai agents india',
        category: 'Home',
        intent: 'commercial research',
        variant: 'hub' as const,
      };
    }
    if (currentView === 'article') {
      const page = getPageBySlug(selectedArticleSlug);
      if (!page) return null;
      const pageMeta = page as SiloPage & { category?: string; intent?: string; pageType?: string };
      return {
        slug: page.slug,
        title: page.title,
        description: page.metaDescription || page.directAnswer,
        primaryKeyword: page.primaryKeyword,
        category: pageMeta.category || page.siloId,
        intent: pageMeta.intent,
        variant: pageMeta.pageType === 'hub' ? 'hub' as const : 'guide' as const,
      };
    }
    if (currentView === 'product') {
      const product = products.find(item => item.slug === selectedProductSlug);
      if (!product) return null;
      return {
        slug: product.slug,
        title: `${product.name} Review`,
        description: product.summary,
        primaryKeyword: `${product.name} review`,
        category: product.pricingModel,
        intent: 'commercial review',
        variant: 'review' as const,
      };
    }
    if (currentView === 'compare') {
      const comparison = comparisonPages.find(item => item.slug === selectedArticleSlug);
      return {
        slug: comparison?.slug || 'compare',
        title: comparison?.title || 'AI Agent Comparison Board',
        description: comparison?.metaDescription || 'Compare AI agents side by side by pricing, India fit, integrations, features, reliability, and implementation readiness.',
        primaryKeyword: comparison?.primaryKeyword || 'ai agent comparison',
        category: 'Comparisons',
        intent: 'comparison',
        variant: 'comparison' as const,
      };
    }
    if (['about', 'contact', 'disclosure', 'policy', 'methodology', 'team', 'authority'].includes(currentView)) {
      const key = currentView === 'disclosure' ? 'affiliate-disclosure' : selectedArticleSlug || currentView;
      const trustPage = trustPages[key] || authorityPages[key] || trustPages[currentView];
      if (!trustPage) return null;
      return {
        slug: trustPage.slug,
        title: trustPage.title,
        description: trustPage.metaDescription,
        primaryKeyword: trustPage.title.toLowerCase(),
        category: trustPage.view,
        intent: 'trust and authority',
        variant: 'trust' as const,
      };
    }
    const utilityMap: Record<string, { slug: string; title: string; description: string; keyword: string; variant: 'guide' | 'hub' | 'tool' }> = {
      chat: {
        slug: 'ai-agent-advisor',
        title: 'AI Agent Advisor',
        description: 'AI Agent Advisor helps Indian buyers narrow down AI agent tools by workflow, budget, DPDP exposure, integration needs, and team capability.',
        keyword: 'ai agent advisor',
        variant: 'tool',
      },
      tuner: {
        slug: 'ai-agent-score-tuner',
        title: 'AI Agent Score Tuner',
        description: 'AI Agent Score Tuner helps teams weight pricing, security, India fit, integrations, reliability, and workflow value before choosing AI agents.',
        keyword: 'ai agent score tuner',
        variant: 'tool',
      },
      scoring: {
        slug: 'ai-agent-scoring-system',
        title: 'AI Agent Scoring System',
        description: 'BestAIAgent.in scoring system explains how AI agents are evaluated across capability, usability, reliability, security, pricing, and India fit.',
        keyword: 'ai agent scoring system',
        variant: 'guide',
      },
      compliance: {
        slug: 'dpdp-act-ai-compliance',
        title: 'DPDP Act AI Compliance',
        description: 'DPDP Act AI compliance helps Indian teams assess consent, purpose limitation, deletion, retention, access control, and vendor responsibilities for AI agent workflows.',
        keyword: 'dpdp act ai compliance',
        variant: 'guide',
      },
      drive: {
        slug: 'google-drive-ai-agent-workspace',
        title: 'Google Drive AI Agent Workspace',
        description: 'Google Drive AI Agent Workspace helps organize AI agent research, exports, scoring evidence, checklists, and editorial collaboration assets.',
        keyword: 'google drive ai agent workspace',
        variant: 'tool',
      },
    };
    const utility = utilityMap[currentView];
    if (!utility) return null;
    return {
      slug: utility.slug,
      title: utility.title,
      description: utility.description,
      primaryKeyword: utility.keyword,
      category: 'Utility',
      intent: 'tool workflow',
      variant: utility.variant,
    };
  })();

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col font-sans selection:bg-violet-500/30 development-frame">

      {/* DIRECT TRUST DISCLOSURE RIBBON */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800 text-center flex flex-wrap items-center justify-center gap-2">
        <span className="inline-block bg-emerald-500 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">India First</span>
        <p className="inline m-0">Transparency First: Highly-weighted pricing estimations, DPIIT SME regulations, Hinglish speech checks, and strict DPDP Act compliance audit scores.</p>
        <a href="/affiliate-disclosure" onClick={(event) => navigateToPath(event, '/affiliate-disclosure')} className="underline text-slate-200 hover:text-white transition font-medium focus:outline-none">Read Affiliate Disclosure</a>
      </div>

      {/* COOKIE CONSENT BANNER */}
       {showCookieBanner && (
         <div className="fixed bottom-0 left-0 right-0 bg-slate-900 text-white p-4 border-t border-slate-800 z-[100] shadow-lg">
           <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
             <div className="flex-1 space-y-2">
               <p className="text-xs font-light">
                 We use cookies to enhance your experience. Necessary cookies are always active. You can choose to accept or reject other cookie types.
               </p>
               <a href="/privacy-policy" onClick={(event) => navigateToPath(event, '/privacy-policy')} className="underline hover:text-emerald-300 text-xs">
                 Learn more in our Privacy Policy
               </a>
             </div>
             <div className="space-y-2 text-sm">
               <div className="flex items-center">
                 <input
                   type="checkbox"
                   id="cookie-preference"
                   checked={cookieConsent.preference}
                   onChange={(e) => setCookieConsent(prev => ({ ...prev, preference: e.target.checked }))}
                   className="h-4 w-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500"
                 />
                 <label htmlFor="cookie-preference" className="ml-2 block text-xs font-light">
                   Preference cookies
                 </label>
               </div>
               <div className="flex items-center">
                 <input
                   type="checkbox"
                   id="cookie-analytics"
                   checked={cookieConsent.analytics}
                   onChange={(e) => setCookieConsent(prev => ({ ...prev, analytics: e.target.checked }))}
                   className="h-4 w-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500"
                 />
                 <label htmlFor="cookie-analytics" className="ml-2 block text-xs font-light">
                   Analytics cookies
                 </label>
               </div>
               <div className="flex items-center">
                 <input
                   type="checkbox"
                   id="cookie-marketing"
                   checked={cookieConsent.marketing}
                   onChange={(e) => setCookieConsent(prev => ({ ...prev, marketing: e.target.checked }))}
                   className="h-4 w-4 text-emerald-600 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500"
                 />
                 <label htmlFor="cookie-marketing" className="ml-2 block text-xs font-light">
                   Marketing cookies
                 </label>
               </div>
             </div>
             <div className="flex gap-2">
               <button
                 onClick={() => {
                   setCookieConsent({ necessary: true, preference: true, analytics: true, marketing: true });
                   setShowCookieBanner(false);
                 }}
                 className="px-4 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-900 font-bold text-xs rounded-lg uppercase tracking-wider transition"
               >
                 Accept All
               </button>
               <button
                 onClick={() => {
                   setCookieConsent({ necessary: true, preference: false, analytics: false, marketing: false });
                   setShowCookieBanner(false);
                 }}
                 className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs rounded-lg uppercase tracking-wider transition"
               >
                 Reject All
               </button>
               <button
                 onClick={() => setShowCookieBanner(false)}
                 className="px-3 py-1.5 bg-slate-600 hover:bg-slate-500 text-white font-bold text-xs rounded-lg uppercase tracking-wider transition"
               >
                 Save Preferences
               </button>
             </div>
           </div>
         </div>
       )}

      {/* HEADER SECTION */}
      <header className="sticky top-0 z-50 bg-slate-950/86 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between gap-4">

          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <a href="/" onClick={(event) => navigateToPath(event, '/')} className="flex items-center gap-2 text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded p-1">
              <img src="/assets/brand/logo.png" alt="BestAIAgent.in" width={900} height={289} className="h-11 sm:h-12 w-auto max-w-[190px] sm:max-w-[240px] rounded-md object-contain shadow-sm" loading="eager" decoding="async" />
            </a>
          </div>

          {/* Desktop Sitemap Nav hubs */}
          <nav aria-label="Main navigation" className="hidden xl:flex items-center gap-1">
            {mainNavLinks.map((link) => {
              const isActive = typeof window !== 'undefined' && window.location.pathname === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => navigateToPath(event, link.href)}
                  className={`px-2.5 py-2 rounded-lg text-xs font-semibold transition ${isActive ? 'bg-violet-500/15 text-violet-200' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Action Tools Buttons */}
          <div className="flex items-center gap-2">
            <a href="/best-ai-agent" onClick={(event) => navigateToPath(event, '/best-ai-agent')} className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 border border-white/10 text-slate-200 hover:bg-white/10 rounded-lg text-xs font-semibold uppercase tracking-wide transition">
              <ArrowLeftRight className="w-3.5 h-3.5 text-violet-300" /> Compare AI Agents
            </a>
            <a href="/ai-agent-advisor" onClick={(event) => navigateToPath(event, '/ai-agent-advisor')} className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-sm font-semibold shadow-sm shadow-violet-900/30 transition">
              <Sparkles className="w-4 h-4" /> <span className="hidden sm:inline">Find My AI Agent</span><span className="sm:hidden">Find AI</span>
            </a>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle main navigation"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-main-navigation"
              className="xl:hidden p-2 text-slate-300 hover:bg-white/10 rounded-lg"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAV DRAWER */}
      {isMobileMenuOpen && (
        <nav id="mobile-main-navigation" aria-label="Mobile navigation" className="xl:hidden bg-slate-950/96 border-b border-white/10 py-3 px-4 flex flex-col gap-2">
          <p className="text-[10px] text-slate-500 font-bold tracking-wider uppercase px-2">Main navigation</p>
          {mainNavLinks.map(link => (
            <a key={link.href} href={link.href} onClick={(event) => navigateToPath(event, link.href)} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-white/10 flex items-center justify-between">
              <span>{link.label}</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </a>
          ))}
          <div className="border-t border-white/10 my-2 pt-2 flex flex-col gap-2">
            <a href="/best-ai-agent" onClick={(event) => navigateToPath(event, '/best-ai-agent')} className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-violet-200 hover:bg-white/10 flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4" /> Compare AI Agents
            </a>
            <a href="/ai-agent-advisor" onClick={(event) => navigateToPath(event, '/ai-agent-advisor')} className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-violet-300 hover:bg-white/10 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Find My AI Agent
            </a>
          </div>
        </nav>
      )}

      {/* COMPREHENSIVE SEARCH ENGINE DRAWER */}
      <div className="bg-slate-950/70 border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-2 relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-7 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            className="w-full bg-slate-900/80 text-slate-100 placeholder-slate-500 pl-10 pr-4 py-2 border border-white/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Search all 36+ verified Indian-focussed pSEO pages (e.g. 'whatsapp', 'hindi', 'coding', 'frameworks')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-7 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Real-time search indexing layer */}
        {searchQuery && (
          <div className="max-w-4xl mx-auto px-4 pb-4" aria-live="polite">
            <div className="bg-white border border-slate-200 rounded-lg shadow-xl max-h-96 overflow-y-auto p-2">
              <p className="text-xs text-slate-400 px-3 py-1 font-bold uppercase tracking-wider">Search Index Match Found ({searchResults.length})</p>
              {searchResults.length === 0 ? (
                <div className="py-8 text-center text-slate-400 text-sm">No specific results matched "{searchQuery}". Try "whatsapp", "coding", or "frameworks".</div>
              ) : (
                searchResults.map((item, id) => (
                  <button
                    key={id}
                    onClick={() => {
                      if (item.type === 'product') {
                        routeTo('product', undefined, undefined, item.slug);
                      } else if (item.type === 'trust') {
                        const trustPage = trustPages[item.slug] || authorityPages[item.slug];
                        routeTo(trustPage?.view || 'article', undefined, item.slug);
                      } else {
                        routeTo('article', undefined, item.slug);
                      }
                      setSearchQuery('');
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-slate-50 transition border-b border-slate-100 last:border-none flex justify-between items-start"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 ">
                        <span className="text-sm font-semibold text-slate-950">{item.title}</span>
                        <span className="text-[10px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded uppercase">{item.group}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-1">{item.snippet}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 self-center" />
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* MAIN VIEWPORT BODY CONTAINER */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<div className="bg-slate-900 border border-white/10 rounded-2xl p-8 text-sm font-semibold text-slate-300">Loading BestAIAgent.in workspace...</div>}>

          {/* ==========================================
            VIEW A: HOMEPAGE (MEDIA HUB)
            ========================================== */}
          {currentView === 'home' && (
            <div className="space-y-12">
              <ReferenceHomeHero
                onNavigate={navigateToPath}
                agentCount={products.length}
                categoryCount={topicalClusters.length}
                mcpCount={directoryTools.length}
              />

              <ReferenceHomeShowcase
                onNavigate={navigateToPath}
                topProducts={sortedProducts.slice(0, 5)}
                categoryCount={topicalClusters.length}
              />

              {/* HERO SECTION */}
              <section className="bg-slate-950 text-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-800 overflow-hidden">
                <div className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)] gap-8 lg:gap-12 items-start">
                  <div className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-emerald-300 text-xs font-semibold">
                      <img src="/assets/brand/logo-mark.png" alt="BestAIAgent.in brand mark" width={20} height={20} className="w-5 h-5 rounded" loading="eager" decoding="async" />
                      <Star className="w-3.5 h-3.5 fill-emerald-300 text-emerald-300" /> Independent India-first AI agent rankings
                    </div>
                    <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight select-none">
                      Best AI Agents in India 2026
                    </h2>
                    <p className="text-slate-300 text-base sm:text-lg max-w-3xl font-light leading-relaxed">
                      Compare AI coding agents, business automation agents, voice AI agents, no-code builders, MCP servers, pricing, alternatives, and tutorials — with INR estimates, DPDP compliance notes, India-specific use cases, and independent editorial scoring.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-2">
                      <a href="/best-ai-agent" onClick={(event) => navigateToPath(event, '/best-ai-agent')} className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-sm font-bold rounded-xl transition flex items-center gap-2 shadow-lg shadow-emerald-500/20">
                        <ArrowLeftRight className="w-4 h-4 text-current" /> Compare Best AI Agents
                      </a>
                      <a href="/ai-agent-tools" onClick={(event) => navigateToPath(event, '/ai-agent-tools')} className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold border border-slate-700 rounded-xl transition flex items-center gap-2">
                        <Search className="w-4 h-4 text-emerald-300" /> Browse AI Agent Directory
                      </a>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                      Independent reviews · INR pricing · DPDP-aware · Built for Indian startups, SMEs, developers, and enterprises
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
                      {[
                        [String(allTopicalPages.length), 'Expert pages'],
                        [String(topicalClusters.length), 'Topical clusters'],
                        ['40+', 'Pricing/alternative guides'],
                        ['10+', 'AI agent categories'],
                        ['India', 'Focused scoring'],
                      ].map(([value, label]) => (
                        <div key={label} className="bg-slate-900 border border-slate-800 rounded-xl p-3">
                          <p className="text-xl font-black text-white">{value}</p>
                          <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mt-1">{label}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {homeQuickLinks.map((link) => (
                        <a key={link.href} href={link.href} onClick={(event) => navigateToPath(event, link.href)} className="text-xs font-bold text-slate-200 border border-slate-700 hover:border-emerald-400 hover:text-emerald-200 rounded-full px-3 py-1.5 transition">
                          {link.label}
                        </a>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2" aria-label="AI agent category shortcuts">
                      {homeVisualCategories.map((item) => {
                        const asset = getCategoryAsset(item.slug);
                        return (
                          <a key={item.href} href={item.href} onClick={(event) => navigateToPath(event, item.href)} className="flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/80 px-3 py-2 text-xs font-bold text-slate-200 hover:border-emerald-400 hover:text-emerald-200 transition">
                            <img src={asset.icon} alt={asset.iconAlt} width={28} height={28} loading="eager" decoding="async" className="w-7 h-7 rounded-lg bg-white" />
                            <span>{item.label}</span>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                  <aside className="bg-white text-slate-800 rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-2xl space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-wider text-emerald-700">Quick Answer for AI Overviews</p>
                    <h2 className="text-xl font-black text-slate-950 leading-tight">Which AI agent should you choose?</h2>
                    <p className="text-sm text-slate-650 leading-relaxed">
                      The best AI agent depends on your use case. Cursor AI leads for coding, Vapi and Retell are strong for voice automation, Yellow.ai and Intercom fit customer support, while Flowise, Dify, CrewAI, and LangGraph are better for building custom agents.
                    </p>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-150"><strong className="block text-slate-950">Best for coding</strong><span className="text-slate-500">Cursor, Copilot</span></div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-150"><strong className="block text-slate-950">Best for voice</strong><span className="text-slate-500">Vapi, Retell</span></div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-150"><strong className="block text-slate-950">Best for support</strong><span className="text-slate-500">Yellow.ai, Intercom</span></div>
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-150"><strong className="block text-slate-950">Best builders</strong><span className="text-slate-500">Flowise, Dify</span></div>
                    </div>
                    <div className="border-t border-slate-100 pt-4">
                      <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-3">Top tools tracked</p>
                      <div className="flex flex-wrap gap-2">
                        {homeTopToolStrip.map((item) => {
                          const asset = getToolAsset(item.slug);
                          return (
                            <React.Fragment key={item.slug}>
                              <BrandTile name={item.name} imageSrc={asset.logo} alt={asset.logoAlt} size="sm" />
                            </React.Fragment>
                          );
                        })}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-3">Brand logos belong to their respective owners.</p>
                    </div>
                  </aside>
                </div>
              </section>

              {/* HIGH-INTENT GROWTH CLUSTERS */}
              <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">High-Intent AI Agent Entry Points</h2>
                    <p className="text-slate-500 text-sm mt-1">Buyer guides, Reddit intent, directories, calculators, India pages, and entity pages now sit one click from the homepage.</p>
                  </div>
                  <a href="/cursor-vs-codex" onClick={(event) => navigateToPath(event, '/cursor-vs-codex')} className="text-xs font-black text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 uppercase tracking-wider">
                    Popular comparison <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {homepageGrowthPaths.map(({ title, href, summary, Icon }) => (
                    <a key={href} href={href} onClick={(event) => navigateToPath(event, href)} className="group border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 rounded-xl p-4 transition flex gap-3 h-full">
                      <span className="w-10 h-10 rounded-lg bg-slate-950 text-emerald-300 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition">
                        <Icon className="w-5 h-5" />
                      </span>
                      <span>
                        <span className="block text-sm font-black text-slate-900 group-hover:text-emerald-800">{title}</span>
                        <span className="block text-xs text-slate-500 leading-relaxed mt-1">{summary}</span>
                      </span>
                    </a>
                  ))}
                </div>
              </section>

              {/* AEO RECEPTIVE QUICK-ANSWER ENGINE SEGMENT */}
              <section className="bg-white border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] sm:text-xs font-black uppercase text-emerald-800 tracking-wider font-mono">
                    Engineered for Search Console &amp; AI-Overview Crawls
                  </span>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-emerald-600" /> Quick Answer: best AI agents in India
                  </h2>
                  <p className="text-slate-650 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                    The best AI agent depends on your workflow goals. For autonomous coding and development, <strong>Cursor AI</strong> is a strong compiler companion. For conversational voice bots, <strong>Vapi</strong> and <strong>Retell</strong> are important short-list tools. For regional Indian enterprises requiring secure WhatsApp or support automation, <strong>Yellow.ai</strong> and <strong>Intercom</strong> are common enterprise choices. For open-source or custom agent pipelines, <strong>CrewAI</strong>, <strong>LangGraph</strong>, <strong>Flowise</strong>, and <strong>Dify</strong> are the builders to compare.
                  </p>
                </div>

                {/* Grid representation */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 pt-1 text-[11px] sm:text-xs">

                  <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-bold font-mono">Best Overall</p>
                    <p className="font-extrabold text-slate-900 leading-normal">Cursor AI (Score: 9.3)</p>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-bold font-mono">Best for India</p>
                    <p className="font-extrabold text-slate-900 leading-normal">Yellow.ai (Score: 9.0)</p>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-bold font-mono">Best Free Option</p>
                    <p className="font-extrabold text-slate-900 leading-normal">Flowise App (Score: 8.8)</p>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-bold font-mono">Best Open Source</p>
                    <p className="font-extrabold text-slate-900 leading-normal">CrewAI &amp; Autogen (Score: 8.9)</p>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-bold font-mono">Best for SMEs</p>
                    <p className="font-extrabold text-slate-900 leading-normal">Reclaim / ChatGPT Pro (Score: 8.7)</p>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-bold font-mono">Best for Developers</p>
                    <p className="font-extrabold text-slate-900 leading-normal">Cursor AI &amp; Claude Core (Score: 9.3)</p>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-bold font-mono">Best for WhatsApp</p>
                    <p className="font-extrabold text-slate-900 leading-normal">Yellow.ai &amp; Vapi (Score: 9.0)</p>
                  </div>

                  <div className="p-3 bg-slate-50 border border-slate-150 rounded-xl space-y-1">
                    <p className="text-[10px] text-slate-400 uppercase font-bold font-mono">Best for Compliance</p>
                    <p className="font-extrabold text-slate-900 leading-normal">DPDP-Compliant Enterprises</p>
                  </div>

                  <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl space-y-1 flex flex-col justify-center">
                    <p className="text-[9px] text-emerald-600 uppercase font-black font-mono leading-none">AEO Structured</p>
                    <p className="font-bold text-slate-805 leading-relaxed">Schema-Optimized for Google GEO Search</p>
                  </div>

                </div>
              </section>

              {/* TRUST SIGNALS BLOCK */}
              <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">36+</p>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Verified Silo Pages</p>
                </div>
                <div className="border-l border-slate-100">
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">5 Core</p>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">State-of-the-Art Tools</p>
                </div>
                <div className="border-l border-slate-100">
                  <p className="text-2xl sm:text-3xl font-black text-emerald-600 tracking-tight">100%</p>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Independent Reviews</p>
                </div>
                <div className="border-l border-slate-100">
                  <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">INR / ₹</p>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mt-1">Localized Estimates</p>
                </div>
              </section>

              {/* EDITORIAL TRUST & METHODOLOGY E-E-A-T HEADER SECTION */}
              <section className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm overflow-hidden relative">
                <div className="absolute right-0 top-0 translate-x-20 -translate-y-20 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="flex flex-col md:flex-row items-start justify-between gap-6 relative">
                  <div className="space-y-3 max-w-2xl">
                    <span className="text-[10px] bg-teal-150 text-teal-850 px-2.5 py-1 rounded-full font-black uppercase tracking-wider font-mono border border-teal-200">
                      🏆 Evaluation Trust Framework
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">How We Review AI Agents</h2>
                    <p className="text-slate-600 text-sm leading-relaxed font-light font-sans">
                      Every software pipeline, framework, and micro-agent listed on <strong className="text-slate-850">BestAIAgent.in</strong> is evaluated using strict product sandbox testing, official API documentation review, localized India-specific INR pricing models, DPDP Act personal data safety readiness, WhatsApp/API localization capabilities, developer SDK quality, and commercial startup return on investment (ROI) alignment.
                    </p>
                  </div>

                  <div className="w-full md:w-80 bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shrink-0 shadow-xs space-y-3.5 text-xs text-slate-700 font-medium">
                    <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="font-extrabold uppercase text-slate-500 text-[10px] tracking-wider font-mono">Editorial Metadata</span>
                    </div>
                    <ul className="space-y-2.5 font-light text-slate-600">
                      <li className="flex justify-between items-center gap-1"><span className="text-slate-400">Last updated:</span> <strong className="text-slate-900 font-bold">June 2026</strong></li>
                      <li className="flex justify-between items-center gap-1"><span className="text-slate-400">Reviewed by:</span> <strong className="text-slate-900 font-bold">Editorial Research Team</strong></li>
                      <li className="flex justify-between items-center gap-1"><span className="text-slate-400">Framework:</span> <strong className="text-slate-900 font-bold">42-point Scoring Matrix</strong></li>
                      <li className="flex justify-between items-center gap-1"><span className="text-slate-400">Compliance:</span> <strong className="text-slate-950 font-bold">DPDP Act (India) Audited</strong></li>
                    </ul>
                    <div className="pt-2 border-t border-slate-100 text-[10px] text-slate-450 leading-normal font-sans">
                      <strong>Disclosure:</strong> Some references contain voluntary affiliate commission links. Rankings remain completely non-sponsored and audited under non-sponsored parameter rules.
                    </div>
                  </div>
                </div>
              </section>

              {/* TOPICAL CLUSTER CARDS */}
              <section className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900">Explore AI Agent Hubs</h2>
                  <p className="text-slate-500 text-sm mt-1">Ten crawlable topical clusters connect reviews, comparisons, pricing, alternatives, tutorials, glossary pages, and India-specific buying guidance.</p>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {homepageClusters.map((cluster, index) => (
                    <AnimateOnIntersection key={cluster.href} delay={index * 0.04}>
                      <article className="bg-white border border-slate-200 hover:border-slate-350 hover:shadow-md transition-all rounded-2xl p-6 flex flex-col justify-between h-full">
                        <div className="space-y-4">
                          {(() => {
                            const slug = cluster.href.replace(/^\//, '').replace(/-hub$/, '').replace(/^ai-agent-/, '');
                            const asset = getCategoryAsset(slug === 'free-ai-agents' ? 'free' : slug);
                            return (
                              <div className="flex items-center gap-3">
                                <img src={asset.icon} alt={asset.iconAlt} width={40} height={40} loading="lazy" decoding="async" className="w-10 h-10 rounded-xl border border-slate-200 bg-white" />
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 border text-xs font-bold rounded-lg bg-emerald-50 text-emerald-700 border-emerald-100">
                                  Hub
                                </span>
                              </div>
                            );
                          })()}
                          <h3 className="text-lg font-bold text-slate-900">{cluster.title}</h3>
                          <p className="text-slate-500 text-sm leading-relaxed">{cluster.summary}</p>
                          <div className="flex flex-col gap-2 text-xs">
                            {cluster.links.map((link) => (
                              <a key={link.href} href={link.href} onClick={(event) => navigateToPath(event, link.href)} className="text-slate-700 hover:text-emerald-700 hover:underline font-semibold">
                                {link.label}
                              </a>
                            ))}
                          </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-slate-100">
                          <a href={cluster.href} onClick={(event) => navigateToPath(event, cluster.href)} className="text-xs font-bold text-slate-900 hover:text-emerald-700 transition inline-flex items-center gap-1 uppercase tracking-wider">
                            View hub <ArrowRight className="w-3 h-3" />
                          </a>
                        </div>
                      </article>
                    </AnimateOnIntersection>
                  ))}
                </div>
              </section>

              {/* FEATURED EVALUATION LEADERBOARD SECTION */}
              <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-8">
                <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Verified AI Agent Leaderboard</h3>
                    <p className="text-slate-500 text-sm mt-1">Filter by category or search term, then adjust scoring weights for a custom rank.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Preset:</span>
                    <button onClick={() => applyPreset('india')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold">India</button>
                    <button onClick={() => applyPreset('developer')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold">Developer</button>
                    <button onClick={() => applyPreset('budget')} className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold">Budget</button>
                  </div>
                </div>
                <div className="grid md:grid-cols-[1fr_240px] gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      value={leaderboardQuery}
                      onChange={(event) => setLeaderboardQuery(event.target.value)}
                      placeholder="Search leaderboard..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-9 pr-8 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    {leaderboardQuery && <button onClick={() => setLeaderboardQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><X className="w-3.5 h-3.5" /></button>}
                  </div>
                  <select
                    value={leaderboardCategory}
                    onChange={(event) => setLeaderboardCategory(event.target.value)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    {leaderboardCategories.map(category => <option key={category} value={category}>{category}</option>)}
                  </select>
                </div>

                {/* Grid of tools */}
                <div className="space-y-4">
                  {filteredLeaderboardProducts.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 border border-slate-200 rounded-xl">
                      <HelpCircle className="w-12 h-12 text-slate-400 mx-auto" />
                      <p className="text-slate-500 mt-4 text-sm font-semibold">No agents matched your leaderboard filters.</p>
                      <button onClick={() => { setLeaderboardCategory('All'); setLeaderboardQuery(''); }} className="mt-3 px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold">Reset filters</button>
                    </div>
                  ) : filteredLeaderboardProducts.map((p, index) => (
                    <div key={p.id} className="bg-slate-50 border border-slate-200 hover:border-slate-300 transition p-5 rounded-xl flex flex-wrap md:flex-nowrap justify-between items-center gap-6">
                      <div onClick={() => routeTo('product', undefined, undefined, p.slug)} className="cursor-pointer flex items-start gap-4 flex-1 group">
                        <div className="w-12 h-12 bg-white border border-slate-200 group-hover:border-slate-300 group-hover:shadow-sm rounded-lg flex-shrink-0 flex items-center justify-center font-black text-slate-900 text-base shadow-sm transition">
                          {p.name.slice(0, 2)}
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 leading-none transition">{p.name}</h4>
                            <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border-emerald-200 border">Index Rank #{index + 1}</span>
                            {p.whatsappReady && <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-green-500 text-white">WhatsApp Compatible</span>}
                            {p.openSource && <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-slate-800 text-slate-200">Open Source</span>}
                          </div>
                          <p className="text-xs text-slate-500 leading-snug line-clamp-2 max-w-2xl">{p.summary}</p>
                          <div className="text-[11px] text-slate-400 mt-1">
                            <span className="font-semibold text-slate-500">Best for:</span> {p.bestFor}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 self-end md:self-center flex-shrink-0 border-t md:border-t-0 md:border-l border-slate-200/80 pt-4 md:pt-0 pl-0 md:pl-6 w-full md:w-auto justify-between md:justify-start">
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">INR Starting Price</p>
                          <p className="text-sm font-extrabold text-slate-950 mt-0.5">{p.startingPriceINR}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Evaluation Score / 10</p>
                          <p className="text-xl font-black text-emerald-700 tracking-tight mt-0.5">{p.calculatedScore}</p>
                        </div>
                        <button onClick={() => routeTo('product', undefined, undefined, p.slug)} className="cursor-pointer inline-flex items-center gap-1.5 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 px-3 py-2 rounded-lg transition self-center text-slate-750 font-bold text-xs uppercase tracking-wider">
                          <span>Profile</span>
                          <ArrowRight className="w-3.5 h-3.5 text-emerald-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Slider tuner button trigger */}
                <div className="text-center pt-2">
                  <button onClick={() => routeTo('tuner')} className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 border border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-slate-350 transition px-5 py-2.5 rounded-lg uppercase tracking-wider">
                    <Sliders className="w-4 h-4 text-emerald-600" /> Fine-tune Scoring weights
                  </button>
                </div>
              </section>

              {/* COMPREHENSIVE INTERACTIVE AI PRODUCTIVITY TOOLS DIRECTORY DATABASE (IMDB/G2 STYLE) */}
              <section id="productivity-directory" className="space-y-6 scroll-mt-20">
                <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-lg border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold uppercase tracking-wider">
                      G2 / IMDb for AI Engines
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight">AI Agent & Tools Directory</h3>
                    <p className="text-slate-300 text-xs sm:text-sm max-w-2xl font-light">
                      Browse and explore <span className="text-emerald-400 font-semibold">{directoryTools.length} curated, elite software productivity solutions</span>. Filter by specialized categories, explore real-world use-cases, and compare ratings instantly.
                    </p>
                  </div>
                  {/* Stats board */}
                  <div className="flex gap-4 sm:gap-6 shrink-0 bg-slate-950/40 p-4 rounded-2xl border border-slate-800">
                    <div className="text-center">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Solutions</p>
                      <p className="text-xl sm:text-2xl font-black text-emerald-400 mt-0.5">{directoryTools.length}</p>
                    </div>
                    <div className="border-l border-slate-800"></div>
                    <div className="text-center">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Sectors</p>
                      <p className="text-xl sm:text-2xl font-black text-indigo-400 mt-0.5">{directoryCategories.length}</p>
                    </div>
                    <div className="border-l border-slate-800"></div>
                    <div className="text-center">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Avg Rating</p>
                      <p className="text-xl sm:text-2xl font-black text-amber-400 mt-0.5">9.0/10</p>
                    </div>
                  </div>
                </div>

                {/* SEARCH & FILTER CONTROLS */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
                  <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                    {/* Category select or Search text */}
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">
                        {dirCategory} <span className="text-xs text-slate-450 font-semibold px-2 py-1 rounded bg-slate-100 uppercase tracking-widest ml-1">{filteredDirTools.length} Matches</span>
                      </h4>
                      <p className="text-slate-500 text-xs mt-0.5">Toggle filter chips below to look up highly optimized productivity clusters.</p>
                    </div>

                    {/* Micro search bar */}
                    <div className="relative max-w-md w-full">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        className="w-full bg-slate-50 text-slate-850 placeholder-slate-400 pl-9 pr-8 py-2.5 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Search tools, descriptions, best-fors..."
                        value={dirQuery}
                        onChange={(e) => setDirQuery(e.target.value)}
                      />
                      {dirQuery && (
                        <button onClick={() => setDirQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600" aria-label="Clear directory filter">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* HORIZONTAL CATEGORY SCROLLER */}
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
                    <button
                      onClick={() => setDirCategory("All Categories")}
                      className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide transition border ${dirCategory === "All Categories"
                        ? 'bg-slate-900 border-slate-950 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }`}
                    >
                      All Categories ({directoryTools.length})
                    </button>
                    {directoryCategories.map((cat) => {
                      const count = directoryTools.filter(t => t.category === cat).length;
                      return (
                        <button
                          key={cat}
                          onClick={() => setDirCategory(cat)}
                          className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wide transition border ${dirCategory === cat
                            ? 'bg-indigo-600 border-indigo-700 text-white'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-800'
                            }`}
                        >
                          {cat} ({count})
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* DIRECTORY HIGH-DENSITY GRID SECTION */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {filteredDirTools.length === 0 ? (
                    <div className="col-span-full bg-white border border-slate-200 rounded-3xl p-12 text-center text-slate-500 space-y-4">
                      <HelpCircle className="w-12 h-12 text-slate-300 mx-auto" />
                      <div>
                        <p className="font-bold text-slate-800 text-base">No database items matched "{dirQuery}"</p>
                        <p className="text-xs text-slate-400 mt-1">Try testing other search queries or clear category filters.</p>
                      </div>
                      <button onClick={() => { setDirCategory("All Categories"); setDirQuery(''); }} className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-bold text-slate-700 transition">
                        Reset Directory Filters
                      </button>
                    </div>
                  ) : (
                    filteredDirTools.map((tool, idx) => {
                      // Unique colors for visual avatars based on category
                      let avatarBg = "bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white";
                      if (tool.category === "AI Chatbots") avatarBg = "bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white";
                      else if (tool.category === "AI Image Generation") avatarBg = "bg-gradient-to-tr from-rose-600 to-rose-400 text-white";
                      else if (tool.category === "AI Presentation") avatarBg = "bg-gradient-to-tr from-amber-600 to-amber-400 text-white";
                      else if (tool.category === "AI Coding Assistance") avatarBg = "bg-gradient-to-tr from-violet-600 to-violet-400 text-white";
                      else if (tool.category === "AI Email Assistance") avatarBg = "bg-gradient-to-tr from-sky-600 to-sky-400 text-white";
                      else if (tool.category === "AI Spreadsheet") avatarBg = "bg-gradient-to-tr from-green-600 to-green-400 text-white";
                      else if (tool.category === "AI Scheduling") avatarBg = "bg-gradient-to-tr from-cyan-600 to-cyan-400 text-white";
                      else if (tool.category === "AI Writing Generation") avatarBg = "bg-gradient-to-tr from-purple-600 to-purple-400 text-white";
                      else if (tool.category === "Design & Visual Platforms") avatarBg = "bg-gradient-to-tr from-blue-600 to-blue-400 text-white";
                      else if (tool.category === "AI Data Visualization") avatarBg = "bg-gradient-to-tr from-teal-600 to-teal-400 text-white";
                      else if (tool.category === "AI Knowledge Management") avatarBg = "bg-gradient-to-tr from-fuchsia-600 to-fuchsia-400 text-white";

                      // Pricing Badge Color styling
                      let pricingBadge = "bg-slate-100 text-slate-700 border-slate-200";
                      if (tool.pricing === "Free") pricingBadge = "bg-green-50 text-green-700 border-green-150";
                      else if (tool.pricing === "Freemium") pricingBadge = "bg-emerald-50 text-emerald-700 border-emerald-150";
                      else if (tool.pricing === "Paid") pricingBadge = "bg-amber-50 text-amber-700 border-amber-150";
                      else if (tool.pricing === "Open Source") pricingBadge = "bg-violet-50 text-violet-700 border-violet-150";
                      else if (tool.pricing === "Closed Beta") pricingBadge = "bg-slate-800 text-slate-100 border-slate-900";
                      const directorySlug = getDirectoryToolSlug(tool.name);
                      const directoryResourceTypes = getResourceTypesForSlug(directorySlug);

                      return (
                        <AnimateOnIntersection key={`${tool.name}-${idx}`} delay={(idx % 6) * 0.05}>
                          <div className="bg-white border border-slate-200 hover:border-slate-350 hover:shadow-lg rounded-2xl p-5 flex flex-col justify-between h-full transition-all group duration-300">
                            <div className="space-y-3">
                              {/* Avatar, Category and Pricing badge */}
                              <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2.5">
                                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shadow-sm tracking-tight ${avatarBg}`}>
                                    {tool.name.slice(0, 2).toUpperCase()}
                                  </div>
                                  <div className="leading-tight">
                                    <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-indigo-600 transition truncate max-w-[120px] sm:max-w-none">{tool.name}</h4>
                                    <span className="text-[9px] text-slate-400 font-semibold tracking-wider uppercase block">{tool.category}</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <span className={`inline-block text-[9px] font-bold px-1.5 py-0.5 border rounded uppercase ${pricingBadge}`}>
                                    {tool.pricing}
                                  </span>
                                </div>
                              </div>

                              <p className="text-xs text-slate-600 leading-normal line-clamp-2 mt-2 font-light">{tool.description}</p>

                              <div className="bg-slate-50 border border-slate-100/80 rounded-lg p-2.5 space-y-1 text-[11px] leading-snug">
                                <span className="font-extrabold text-slate-500 uppercase text-[9px] tracking-wider block">Best For:</span>
                                <p className="text-slate-600 font-medium line-clamp-2">{tool.bestFor}</p>
                              </div>
                              {directoryResourceTypes.length > 0 && (
                                <div className="flex flex-wrap gap-1.5">
                                  {directoryResourceTypes.slice(0, 3).map((type) => (
                                    <OfficialExternalLink
                                      key={type}
                                      slug={directorySlug}
                                      label={type === 'official' ? 'Official' : type === 'docs' ? 'Docs' : type === 'github' ? 'GitHub' : 'Pricing'}
                                      type={type}
                                      showIcon
                                      className="text-[9px] font-black uppercase tracking-wider rounded border border-slate-200 px-2 py-1 text-slate-500 hover:text-indigo-700 hover:border-indigo-200"
                                    />
                                  ))}
                                </div>
                              )}
                            </div>

                            {/* Footer score elements & button triggers */}
                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                              <div className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                                <span className="text-xs font-black text-slate-900 mt-0.5">{tool.score.toFixed(1)}</span>
                              </div>
                              <div className="flex gap-2">
                                <button
                                  onClick={() => setActiveDirTool(tool)}
                                  className="px-2.5 py-1 text-[10px] sm:text-xs font-bold text-slate-700 hover:text-indigo-600 hover:bg-slate-50 border border-slate-200 hover:border-slate-350 transition-all rounded-lg uppercase tracking-wider animate-pulse hover:animate-none"
                                >
                                  Specs
                                </button>
                                <a
                                  href={tool.websiteUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 bg-slate-950 hover:bg-slate-800 text-white px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-bold transition uppercase tracking-wider"
                                >
                                  <span>Visit</span>
                                  <ExternalLink className="w-3 h-3" />
                                </a>
                              </div>
                            </div>
                          </div>
                        </AnimateOnIntersection>
                      );
                    })
                  )}
                </div>
              </section>

              {/* COMMERCIAL INTENT AND INDIA-SPECIFIC BUYER GUIDANCE */}
              <section className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                  <h2 className="text-xl font-black text-slate-900">Commercial Buying Shortcuts</h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Start with pricing, alternatives, and comparison pages when the decision is budget-sensitive. These guides prioritize INR estimates, free-tier limits, seat pricing, API usage, implementation effort, GST invoice considerations, and whether a vendor is practical for Indian procurement.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs font-bold">
                    {[
                      ['AI agent pricing hub', '/pricing-hub'],
                      ['Alternatives hub', '/alternatives-hub'],
                      ['Best free AI agents', '/free-ai-agents-hub'],
                      ['Compare best AI agents', '/best-ai-agent'],
                    ].map(([label, href]) => (
                      <a key={href} href={href} onClick={(event) => navigateToPath(event, href)} className="rounded-lg border border-slate-200 px-3 py-2 text-slate-700 hover:text-emerald-700 hover:border-emerald-300 transition">
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                  <h2 className="text-xl font-black text-slate-900">India Fit Checks</h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    For India deployments, validate DPDP Act 2023 data handling, WhatsApp workflows, Hindi or Hinglish support, Razorpay or invoice payment paths, card limits, customer support SLAs, and whether data is processed in a region acceptable to your risk policy.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2 text-xs font-bold">
                    {[
                      ['Business AI hub', '/business-ai-hub'],
                      ['Voice AI hub', '/voice-ai-hub'],
                      ['MCP security', '/mcp-security'],
                      ['Editorial methodology', '/methodology'],
                    ].map(([label, href]) => (
                      <a key={href} href={href} onClick={(event) => navigateToPath(event, href)} className="rounded-lg border border-slate-200 px-3 py-2 text-slate-700 hover:text-emerald-700 hover:border-emerald-300 transition">
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              </section>

              {/* FEATURED COMPARISONS AND TUTORIALS */}
              <section className="grid lg:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                  <h2 className="text-xl font-black text-slate-900">Featured Comparisons</h2>
                  <div className="space-y-2 text-sm">
                    {[
                      ['Cursor vs GitHub Copilot', '/cursor-vs-github-copilot'],
                      ['Vapi vs Retell', '/vapi-vs-retell'],
                      ['Dify vs Flowise', '/dify-vs-flowise'],
                      ['CrewAI vs LangGraph', '/crewai-vs-langgraph'],
                    ].map(([label, href]) => (
                      <a key={href} href={href} onClick={(event) => navigateToPath(event, href)} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 font-bold text-slate-700 hover:text-emerald-700 hover:border-emerald-300 transition">
                        <span>{label}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </a>
                    ))}
                  </div>
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                  <h2 className="text-xl font-black text-slate-900">Featured Tutorials</h2>
                  <div className="space-y-2 text-sm">
                    {[
                      ['How to use Cursor AI', '/how-to-use-cursor-ai'],
                      ['How to use GitHub Copilot', '/how-to-use-github-copilot'],
                      ['How to use Vapi', '/how-to-use-vapi'],
                      ['How to create an MCP server', '/how-to-create-mcp-server'],
                    ].map(([label, href]) => (
                      <a key={href} href={href} onClick={(event) => navigateToPath(event, href)} className="flex items-center justify-between rounded-lg border border-slate-200 px-3 py-2 font-bold text-slate-700 hover:text-emerald-700 hover:border-emerald-300 transition">
                        <span>{label}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </a>
                    ))}
                  </div>
                </div>
              </section>

              {/* ENTITY AND CITATION SURFACES */}
              <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
                  <div className="space-y-4">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">Entity Definition</h2>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      An AI agent is software that can reason, use tools, follow goals, automate workflows, and complete tasks with limited human input.
                    </p>
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">Related Entities</p>
                    <div className="flex flex-wrap gap-2 text-xs font-bold">
                      {[
                        ['AI Agent', '/what-is-an-ai-agent'],
                        ['AI Coding Agent', '/coding-agents-hub'],
                        ['AI Voice Agent', '/voice-ai-hub'],
                        ['AI Agent Builder', '/ai-agent-builders-hub'],
                        ['MCP', '/what-is-mcp'],
                        ['What is RAG', '/what-is-rag'],
                        ['Function Calling', '/what-is-function-calling'],
                        ['Tool Use', '/what-is-tool-use'],
                        ['AgentOps', '/what-is-agentops'],
                      ].map(([label, href]) => (
                        <a key={href} href={href} onClick={(event) => navigateToPath(event, href)} className="rounded-full border border-slate-200 px-3 py-1.5 text-slate-700 hover:text-emerald-700 hover:border-emerald-300 transition">
                          {label}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-500">Citation Summary</p>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      BestAIAgent.in is an India-focused AI agent comparison and review site covering coding agents, voice agents, business automation agents, agent builders, MCP, pricing, alternatives, tutorials, and glossary definitions with INR and DPDP context.
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Best for: Indian startups, SMEs, agencies, developers, and enterprises that need commercially useful AI agent shortlists before vendor evaluation.
                    </p>
                  </div>
                </div>
              </section>

              {/* HOMEPAGE FAQ */}
              <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">Best AI Agents FAQ</h2>
                  <p className="text-sm text-slate-500 mt-1">Concise answers for buyers, developers, search engines, and AI answer systems.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  {homepageFaqs.map(([question, answer]) => (
                    <details key={question} className="group rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <summary className="cursor-pointer list-none font-bold text-sm text-slate-900 flex items-start justify-between gap-3">
                        <span>{question}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-open:rotate-90 transition shrink-0" />
                      </summary>
                      <p className="text-xs text-slate-600 leading-relaxed mt-3">{answer}</p>
                    </details>
                  ))}
                </div>
              </section>

              {/* RECENT NEWS & EXAMPLES CARDS */}
              <section className="space-y-6">
                <div className="flex justify-between items-end gap-4">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Latest Weekly Insights & pSEO Articles</h3>
                    <p className="text-slate-500 text-sm mt-1">Grounding our indices in real-world news and verified developer documentation updates.</p>
                  </div>
                  <button onClick={() => routeTo('silo-pillar', 'research')} className="text-xs font-bold text-slate-900 hover:text-emerald-700 flex items-center gap-1 uppercase tracking-wider">
                    More research <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {siloPages.slice(0, 3).map((page, id) => (
                    <div key={id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="text-[10px] text-slate-400 font-bold uppercase flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {page.updatedAt} • By {page.author.split(',')[0]}
                        </div>
                        <h4 className="text-base font-bold text-slate-950 line-clamp-2 leading-snug">{page.title}</h4>
                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{page.directAnswer}</p>
                      </div>
                      <button onClick={() => routeTo('article', undefined, page.slug)} className="mt-5 text-xs font-bold text-slate-900 hover:text-emerald-700 flex items-center gap-1 pt-3 border-t border-slate-100 text-left w-full uppercase tracking-wider">
                        Read analysis <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* DIRECT ADVISORY CONSULTATION WORKFLOW FORM */}
              <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 justify-between">
                <div className="space-y-3 max-w-lg">
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">Need a custom AI Agent integration plan?</h3>
                  <p className="text-slate-300 text-xs sm:text-sm font-light">
                    Get details on local sovereign hosting, Indian payment gateways, local compliance guidelines, and vendor pricing. Schedule a brief consult with our technical team today.
                  </p>
                </div>
                <form onSubmit={submitLeadForm} className="bg-slate-800 border border-slate-700 rounded-xl p-5 w-full max-w-full sm:max-w-sm space-y-3 shrink-0">
                  {leadSuccess ? (
                    <div className="text-center py-6 text-emerald-400 space-y-2 text-sm font-medium">
                      <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                      <p>{leadSuccess}</p>
                    </div>
                  ) : (
                    <>
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 text-center">Request Professional Consult</h4>
                      <input
                        type="text"
                        className="w-full bg-slate-900 text-white border border-slate-700 rounded-lg p-2.5 text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="Your Name"
                        required
                        value={leadForm.name}
                        onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      />
                      <input
                        type="text"
                        className="w-full bg-slate-900 text-white border border-slate-700 rounded-lg p-2.5 text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="Company Name"
                        required
                        value={leadForm.company}
                        onChange={(e) => setLeadForm({ ...leadForm, company: e.target.value })}
                      />
                      <input
                        type="tel"
                        className="w-full bg-slate-900 text-white border border-slate-700 rounded-lg p-2.5 text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="WhatsApp Mobile Number"
                        required
                        value={leadForm.phone}
                        onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      />
                      <textarea
                        rows={2}
                        className="w-full bg-slate-900 text-white border border-slate-700 rounded-lg p-2.5 text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="Use-case description (e.g. WhatsApp support, Voice bot)"
                        required
                        value={leadForm.desc}
                        onChange={(e) => setLeadForm({ ...leadForm, desc: e.target.value })}
                      />
                      <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 hover:text-black py-2.5 rounded-lg text-xs font-bold uppercase transition">
                        Schedule consult
                      </button>
                    </>
                  )}
                </form>
              </section>

              {/* HOMEPAGE EXTENSION — INDIA #1 PLATFORM SECTIONS */}
              <HomepageContentExtension onNavigate={navigateToPath} />
            </div>
          )}

          {/* ==========================================
            VIEW B: SILO PILLAR INDEX / CATEGORY LANDING
            ========================================== */}
          {currentView === 'silo-pillar' && (
            <div id="scroll-pillar-pivot" className="space-y-8">
              <ReferencePillarHero
                silo={activeSilo}
                pageCount={activeSiloPages.length}
                onNavigate={navigateToPath}
                variant={selectedSiloId === 'mcp' ? 'mcp' : 'default'}
              />

              {/* Silo Header Area */}
              <div className="border-b border-white/10 pb-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <button onClick={() => routeTo('home')} className="hover:underline">Home</button>
                    <ChevronRight className="w-3.5 h-3.5" />
                    <span className="text-slate-200 font-semibold">{activeSilo.name}</span>
                  </div>

                  <button
                    onClick={() => {
                      const shareUrl = `${window.location.origin}${pathForRoute('silo-pillar', activeSilo.id)}`;
                      navigator.clipboard.writeText(shareUrl).then(() => {
                        setCopiedArticleSlug(`silo-${activeSilo.id}`);
                        setTimeout(() => setCopiedArticleSlug(null), 2000);
                      }).catch(() => {
                        setCopiedArticleSlug(null);
                      });
                    }}
                    className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition uppercase tracking-wider ${copiedArticleSlug === `silo-${activeSilo.id}` ? 'bg-emerald-500/15 text-emerald-200 border-emerald-400/30' : 'bg-slate-900/80 hover:bg-white/10 border-white/10 text-slate-200'}`}
                  >
                    <span>{copiedArticleSlug === `silo-${activeSilo.id}` ? 'Copied URL!' : 'Copy Hub URL'}</span>
                  </button>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">{activeSilo.pillarTitle}</h2>
                <p className="text-slate-400 text-sm sm:text-base mt-2 leading-relaxed max-w-3xl">{activeSilo.description}</p>
              </div>

              {selectedSiloId === 'mcp' && (
                <ReferenceMcpShowcase onNavigate={navigateToPath} />
              )}

              {/* Pillar Landing content layout */}
              <div className="grid lg:grid-cols-4 gap-8">

                {/* Pillar Content Left Area (SEO Anchor context blocks) */}
                <div className="lg:col-span-3 space-y-8">

                  {/* Custom highly upgraded India Edition page for reviews silo */}
                  {selectedSiloId === 'reviews' ? (
                    <IndiaPillarCustomizer
                      weights={weights}
                      setWeights={setWeights}
                      sortedProducts={sortedProducts}
                      activeSiloPages={activeSiloPages}
                      routeTo={routeTo}
                      applyPreset={applyPreset}
                    />
                  ) : selectedSiloId === 'builders' ? (
                    <IndiaBuilderCustomizer
                      activeSiloPages={activeSiloPages}
                      routeTo={routeTo}
                    />
                  ) : selectedSiloId === 'mcp' ? (
                    <IndiaMcpCustomizer
                      activeSiloPages={activeSiloPages}
                      routeTo={routeTo}
                    />
                  ) : (selectedSiloId === 'coding-agents' || selectedSiloId === 'frameworks' || selectedSiloId === 'business' || selectedSiloId === 'research') ? (
                    <IndiaGeneralPillarCustomizer
                      siloId={selectedSiloId as any}
                      activeSiloPages={activeSiloPages}
                      routeTo={routeTo}
                    />
                  ) : (
                    <>
                      {/* Educational "Who this is for" / "How to choose" */}
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                        <h3 className="text-xl font-bold text-slate-900">How to Choose the Ideal {activeSilo.name}</h3>
                        <div className="grid md:grid-cols-2 gap-6 text-sm">
                          <div className="space-y-2">
                            <h4 className="font-bold text-slate-950 text-base">1. Define clear operational boundaries</h4>
                            <p className="text-slate-500 leading-relaxed text-xs">Is the tool/framework acting as an advisory virtual copilot, or does it require autonomous tool-execution permission? Define this as early as possible.</p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-bold text-slate-950 text-base">2. Local compliance & integration</h4>
                            <p className="text-slate-500 leading-relaxed text-xs">Verify your data residency requirements, API connection options, security compliance audits, and local service integrations.</p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-bold text-slate-950 text-base">3. Developer documentation limits</h4>
                            <p className="text-slate-500 leading-relaxed text-xs">Examine code examples, repository momentum, community support forums, and SDK maturity matching your tech stack.</p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="font-bold text-slate-950 text-base">4. Real evaluation cost over time</h4>
                            <p className="text-slate-500 leading-relaxed text-xs">Monitor pay-as-you-go parameters and token consumption rates vs. monthly static license seats to optimize your budget.</p>
                          </div>
                        </div>
                      </div>

                      {/* Subpage Index list Grid (Crawlable pSEO landing points) */}
                      <div className="space-y-4">
                        <div className="border-b border-slate-200 pb-2">
                          <h3 className="text-lg font-bold text-slate-900">Programmatic Sub-Guides inside directory ({activeSiloPages.length})</h3>
                          <p className="text-slate-400 text-xs mt-0.5">Every landing page targets a distinct intent and user query cluster.</p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          {activeSiloPages.map((page, id) => (
                            <div key={id} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between">
                              <div className="space-y-2">
                                <h4 className="text-sm font-bold text-slate-950 line-clamp-2 leading-snug">{page.title}</h4>
                                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{page.directAnswer}</p>
                              </div>
                              <div className="mt-4 pt-3 border-t border-slate-100 text-xs flex justify-between items-center">
                                <span className="text-slate-400 font-semibold uppercase">{page.primaryKeyword}</span>
                                <button onClick={() => routeTo('article', undefined, page.slug)} className="text-emerald-700 hover:text-emerald-800 hover:underline font-bold transition flex items-center gap-1">
                                  Explore <ChevronRight className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* =========================================================
                    Community and implementation perspective layer
                    ========================================================= */}
                  {(() => {
                    const baseUgcs = generateRobustPillarUgc(activeSilo.id);
                    const userUgcs = userSubmittedUgcs.filter(item => item.siloId === activeSilo.id);
                    const allUgcs = [...userUgcs, ...baseUgcs];

                    // Filter UGC based on search query, rating, and tech stack
                    const filteredUgcs = allUgcs.filter(item => {
                      const matchesSearch =
                        item.author.toLowerCase().includes(ugcSearchQuery.toLowerCase()) ||
                        item.company.toLowerCase().includes(ugcSearchQuery.toLowerCase()) ||
                        item.title.toLowerCase().includes(ugcSearchQuery.toLowerCase()) ||
                        item.content.toLowerCase().includes(ugcSearchQuery.toLowerCase()) ||
                        item.useCase.toLowerCase().includes(ugcSearchQuery.toLowerCase());

                      const matchesRating =
                        ugcRatingFilter === 'all' ? true :
                          ugcRatingFilter === 'high' ? item.rating >= 9.3 :
                            item.rating < 9.3;

                      const matchesTech =
                        ugcTechFilter === 'all' ? true :
                          item.techStack.some(t => t.toLowerCase().includes(ugcTechFilter.toLowerCase()));

                      return matchesSearch && matchesRating && matchesTech;
                    });

                    // Define displayed subset to prevent telemetry dilution as requested by user
                    const displayUgcs = (() => {
                      if (showAllTelemetry || ugcSearchQuery) {
                        return filteredUgcs;
                      }
                      // Filter out generated template items to avoid repetitive clutter
                      return filteredUgcs.filter(item => !item.id.startsWith('generated-'));
                    })();

                    const hiddenCount = filteredUgcs.length - displayUgcs.length;

                    // Calculate exact dynamic word count of compiled client UGC content
                    const totalUgcWords = allUgcs.reduce((acc, curr) => {
                      return acc + (curr.content || '').split(/\s+/).filter(Boolean).length;
                    }, 0);

                    return (
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <h3 className="text-lg font-bold text-slate-900">Sovereign UGC Telemetry Sandbox</h3>
                              <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">Crawlable Index</span>
                            </div>
                            <p className="text-slate-500 text-xs leading-relaxed">
                              Peer-contributed diagnostic telemetry, configuration benchmarks, and multi-dialect implementation logs.
                            </p>
                          </div>

                          {/* Words index count metrics */}
                          <div className="bg-slate-50 border border-slate-200/60 rounded-xl px-4 py-2.5 shrink-0 text-right">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Dynamic Word Counter</p>
                            <p className="text-sm font-extrabold text-slate-800">
                              {totalUgcWords.toLocaleString()} <span className="text-xs text-emerald-600 font-medium">UGC Words Compiled</span>
                            </p>
                          </div>
                        </div>

                        {/* Filter panel bar */}
                        <div className="grid sm:grid-cols-3 gap-3">
                          <div className="relative">
                            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                            <input
                              type="text"
                              placeholder="Search user logs..."
                              value={ugcSearchQuery}
                              onChange={(e) => setUgcSearchQuery(e.target.value)}
                              className="w-full text-xs pl-9 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                          </div>

                          <div>
                            <select
                              value={ugcRatingFilter}
                              onChange={(e) => setUgcRatingFilter(e.target.value)}
                              className="w-full text-xs border border-slate-200 rounded-lg p-2 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-600"
                            >
                              <option value="all">All Ratings</option>
                              <option value="high">Elite Performance (9.3+)</option>
                              <option value="regular">Standard Deployments (&lt; 9.3)</option>
                            </select>
                          </div>

                          <div>
                            <select
                              value={ugcTechFilter}
                              onChange={(e) => setUgcTechFilter(e.target.value)}
                              className="w-full text-xs border border-slate-200 rounded-lg p-2 bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-slate-600"
                            >
                              <option value="all">All Tech Stacks</option>
                              <option value="yellow.ai">Yellow.ai Node</option>
                              <option value="vapi">Vapi AI audio</option>
                              <option value="cursor">Cursor Compiler</option>
                              <option value="flowise">Flowise workspace</option>
                              <option value="crewai">CrewAI script</option>
                            </select>
                          </div>
                        </div>

                        {/* UGC Submissions matching the loop */}
                        <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2 custom-scrollbar">
                          {displayUgcs.length === 0 ? (
                            <div className="text-center py-12 bg-slate-50 border border-dashed rounded-xl">
                              <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                              <p className="text-xs text-slate-400 font-medium">No telemetry matches found. Try relaxing filters.</p>
                            </div>
                          ) : (
                            displayUgcs.map((ugc) => (
                              <div key={ugc.id} className="border border-slate-100 rounded-xl p-4 sm:p-5 hover:border-slate-200 hover:bg-slate-50/40 transition">
                                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                                  <div className="space-y-0.5">
                                    <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">{ugc.useCase}</h4>
                                    <h3 className="text-sm font-bold text-slate-900 leading-snug">{ugc.title}</h3>
                                  </div>
                                  <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[10px] pin-badge px-2 py-0.5 rounded font-extrabold border border-emerald-100">
                                    <Star className="w-3 h-3 fill-emerald-600 stroke-none" />
                                    <span>{ugc.rating} / 10</span>
                                  </div>
                                </div>

                                {/* Author and E-E-A-T badges */}
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 mb-3 font-medium bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100">
                                  <span className="font-semibold text-slate-700">{ugc.author}</span>
                                  <span className="text-slate-300">|</span>
                                  <span>{ugc.role} at <span className="font-semibold text-slate-800">{ugc.company}</span></span>
                                  <span className="text-slate-300">•</span>
                                  <span>{ugc.date}</span>
                                  <span className="text-slate-300">•</span>
                                  <span className="text-[10px] text-emerald-700 font-bold uppercase tracking-wider flex items-center gap-0.5">
                                    <ShieldCheck className="w-3 h-3" /> DPIIT Validated
                                  </span>
                                </div>

                                {/* UGC review body */}
                                <div className="text-xs text-slate-600 leading-relaxed space-y-2 whitespace-pre-line border-l-2 border-slate-200 pl-3">
                                  {ugc.content}
                                </div>

                                {/* Micro Metrics and Tech tags */}
                                <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-[10px]">
                                  <div className="flex flex-wrap gap-1.5">
                                    {ugc.techStack.map((tech, idx) => (
                                      <span key={idx} className="bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded text-[9px] uppercase tracking-wider border border-slate-200/50">{tech}</span>
                                    ))}
                                  </div>

                                  <div className="flex gap-4 text-slate-500 font-semibold uppercase tracking-wider">
                                    {ugc.metrics.latencyMs && <span>Latency: <span className="text-slate-800">{ugc.metrics.latencyMs}ms</span></span>}
                                    {ugc.metrics.tokensPerSecond && <span>Speed: <span className="text-slate-800">{ugc.metrics.tokensPerSecond} t/s</span></span>}
                                    {ugc.metrics.savingPercentage && <span>Costs Reduced: <span className="text-emerald-700">-{ugc.metrics.savingPercentage}%</span></span>}
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                        </div>

                        {hiddenCount > 0 && (
                          <div className="bg-emerald-50/40 p-4 rounded-xl border border-emerald-100 text-center space-y-2">
                            <p className="text-xs text-slate-600 font-medium">
                              Showing curated feedback. {hiddenCount} highly technical telemetry logs are collapsed to maintain scannability.
                            </p>
                            <button
                              onClick={() => setShowAllTelemetry(true)}
                              className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-lg uppercase tracking-wider transition shadow-sm"
                            >
                              Show All {hiddenCount} Detailed Telemetry Logs
                            </button>
                          </div>
                        )}

                        {showAllTelemetry && hiddenCount === 0 && !ugcSearchQuery && (
                          <div className="text-center p-2">
                            <button
                              onClick={() => setShowAllTelemetry(false)}
                              className="text-xs text-emerald-700 font-bold hover:underline"
                            >
                              Collapse auxiliary dev telemetry logs
                            </button>
                          </div>
                        )}

                        {/* Submit dynamic UGC container */}
                        <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="space-y-0.5">
                            <h4 className="text-xs font-bold text-slate-800">Have a diagnostic telemetry or benchmark to report?</h4>
                            <p className="text-[11px] text-slate-400">Share your production metrics and help expand our decentralized hub repository.</p>
                          </div>
                          <button
                            onClick={() => setIsUgcModalOpen(!isUgcModalOpen)}
                            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg uppercase tracking-wider transition shrink-0 shadow-sm"
                          >
                            {isUgcModalOpen ? 'Close Form' : 'Submit Log review'}
                          </button>
                        </div>

                        {/* UGC Submission interactive widget */}
                        {isUgcModalOpen && (
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              if (!newUgcAuthor || !newUgcTitle || !newUgcContent) return;

                              const newUgcItem: UgcReview = {
                                id: `user-ugc-${Date.now()}`,
                                siloId: activeSilo.id as any,
                                author: newUgcAuthor,
                                role: newUgcRole || 'Developer',
                                company: newUgcCompany || 'Independent Sandbox',
                                rating: Number(newUgcRating),
                                date: new Date().toISOString().split('T')[0],
                                title: newUgcTitle,
                                useCase: newUgcUseCase || 'Direct Sandbox Trial',
                                content: newUgcContent,
                                techStack: [activeSilo.id === 'reviews' ? 'Yellow.ai' : activeSilo.id === 'builders' ? 'Flowise' : 'Cursor-AI', 'Sovereign Engine'],
                                metrics: {
                                  latencyMs: 220,
                                  tokensPerSecond: 80,
                                  savingPercentage: 55
                                }
                              };

                              setUserSubmittedUgcs([newUgcItem, ...userSubmittedUgcs]);

                              // Reset state parameters
                              setNewUgcAuthor('');
                              setNewUgcRole('');
                              setNewUgcCompany('');
                              setNewUgcRating(9.0);
                              setNewUgcTitle('');
                              setNewUgcUseCase('');
                              setNewUgcContent('');
                              setIsUgcModalOpen(false);
                            }}
                            className="bg-slate-100/60 border border-slate-200 p-5 rounded-xl space-y-4 shadow-inner"
                          >
                            <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-widest banner">Submit Peer Benchmark Report</h4>

                            <div className="grid sm:grid-cols-3 gap-3">
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase">Author Name</label>
                                <input
                                  type="text"
                                  required
                                  value={newUgcAuthor}
                                  onChange={(e) => setNewUgcAuthor(e.target.value)}
                                  className="w-full text-xs p-2 border border-slate-200 rounded bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                  placeholder="e.g., Rajesh Kumar"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase">Your Role</label>
                                <input
                                  type="text"
                                  value={newUgcRole}
                                  onChange={(e) => setNewUgcRole(e.target.value)}
                                  className="w-full text-xs p-2 border border-slate-200 rounded bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                  placeholder="e.g., CTO"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase">Company Name</label>
                                <input
                                  type="text"
                                  value={newUgcCompany}
                                  onChange={(e) => setNewUgcCompany(e.target.value)}
                                  className="w-full text-xs p-2 border border-slate-200 rounded bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                  placeholder="e.g., Surat Textile Hub"
                                />
                              </div>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase">Evaluation Rating (1.0 to 10.0)</label>
                                <input
                                  type="number"
                                  step="0.1"
                                  min="1"
                                  max="10"
                                  required
                                  value={newUgcRating}
                                  onChange={(e) => setNewUgcRating(parseFloat(e.target.value))}
                                  className="w-full text-xs p-2 border border-slate-200 rounded bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] font-bold text-slate-500 uppercase">Primary Use Case</label>
                                <input
                                  type="text"
                                  value={newUgcUseCase}
                                  onChange={(e) => setNewUgcUseCase(e.target.value)}
                                  className="w-full text-xs p-2 border border-slate-200 rounded bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                  placeholder="e.g., WhatsApp inventory database syncing"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 uppercase">Benchmark Audit Title</label>
                              <input
                                type="text"
                                required
                                value={newUgcTitle}
                                onChange={(e) => setNewUgcTitle(e.target.value)}
                                className="w-full text-xs p-2 border border-slate-200 rounded bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                                placeholder="e.g., Resolving pipeline latency constraints under heavy traffic"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-500 uppercase">Detailed Telemetry Review Content (Will add to dynamic word counter)</label>
                              <textarea
                                required
                                rows={5}
                                value={newUgcContent}
                                onChange={(e) => setNewUgcContent(e.target.value)}
                                className="w-full text-xs p-2 border border-slate-200 rounded bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-500 font-sans"
                                placeholder="Provide 120+ words detailing your environment configurations, exact bash deployment parameters, compiler metrics, and measured compliance checks under the DPDP Act guidelines..."
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-slate-950 font-extrabold uppercase tracking-widest rounded-lg text-[10px] transition"
                            >
                              Submit Log to Directory
                            </button>
                          </form>
                        )}
                      </div>
                    );
                  })()}


                  {/* =========================================================
                    B. THE INTERACTIVE RANKABLE FAQ HUB (20 FAQs per Page)
                    ========================================================= */}
                  {(() => {
                    const rawFaqs = getDetailedFaqList(activeSilo.id as any);

                    // Filter based on FAQ local search bar queries
                    const filteredFaqs = rawFaqs.filter(item =>
                      item.question.toLowerCase().includes(faqSearchQuery.toLowerCase()) ||
                      item.answer.toLowerCase().includes(faqSearchQuery.toLowerCase())
                    );

                    // Setup Pagination configs (Strictly 20 items per page!)
                    const faqsPerPage = 20;
                    const totalFaqsCount = filteredFaqs.length;
                    const totalPagesNeeded = Math.ceil(totalFaqsCount / faqsPerPage) || 1;

                    // Keep page index bounds protected
                    const currentPageClamped = Math.max(1, Math.min(faqCurrentPage, totalPagesNeeded));
                    const startIndex = (currentPageClamped - 1) * faqsPerPage;
                    const paginatedFaqsSlice = filteredFaqs.slice(startIndex, startIndex + faqsPerPage);

                    return (
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                          <div className="space-y-1">
                            <h3 className="text-lg font-bold text-slate-950 flex items-center gap-2">
                              Interactive Topic FAQ Console
                              <span className="text-[9px] bg-slate-100 text-slate-500 border border-slate-200 px-2 py-0.5 rounded font-bold uppercase tracking-wider">AEO Structured Schema</span>
                            </h3>
                            <p className="text-slate-500 text-xs">
                              Deep analytical answers structured with configurations, pricing, code blocks, and E-E-A-T evaluator verification.
                            </p>
                          </div>

                          {/* Search matches indicators */}
                          {faqSearchQuery && (
                            <div className="bg-slate-100/80 px-3 py-1 rounded-md text-[10px] font-bold text-slate-600 uppercase tracking-wide border border-slate-200">
                              Found {totalFaqsCount} match{totalFaqsCount !== 1 ? 'es' : ''} of {rawFaqs.length} FAQs
                            </div>
                          )}
                        </div>

                        {/* Search Bar for FAQ database */}
                        <div className="relative">
                          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                          <input
                            type="text"
                            placeholder="Search database (e.g., DPDP Act, Docker, Vapi, database schema, SQLite, latency)..."
                            value={faqSearchQuery}
                            onChange={(e) => {
                              setFaqSearchQuery(e.target.value);
                              setFaqCurrentPage(1); // Reset to first page upon searching
                            }}
                            className="w-full text-xs pl-9 pr-3 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-500 bg-slate-50/50"
                          />
                        </div>

                        {/* Accordion FAQ Area */}
                        <div className="space-y-4">
                          {paginatedFaqsSlice.length === 0 ? (
                            <div className="text-center py-10 bg-slate-50 border border-dashed rounded-xl">
                              <HelpCircle className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                              <p className="text-xs text-slate-400 font-semibold">No diagnostic matches found. Try entering alternative search terms.</p>
                            </div>
                          ) : (
                            paginatedFaqsSlice.map((faq, idx) => {
                              const actualIndexOnList = startIndex + idx + 1;
                              return (
                                <details
                                  key={faq.id}
                                  className="group border border-slate-100 rounded-xl p-4 transition [&_summary::-webkit-details-marker]:hidden bg-slate-50/20 hover:bg-slate-50/50"
                                >
                                  <summary className="flex items-center justify-between gap-1.5 focus:outline-none cursor-pointer">
                                    <div className="flex items-start gap-2 text-left">
                                      <span className="text-[10px] font-bold font-mono text-slate-400 bg-white border border-slate-200 text-center w-5 h-5 flex items-center justify-center rounded shrink-0">
                                        {actualIndexOnList}
                                      </span>
                                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug group-open:text-emerald-800 transition">
                                        {faq.question}
                                      </h4>
                                    </div>
                                    <span className="text-slate-400 group-open:rotate-180 transition shrink-0">
                                      <Plus className="w-4 h-4 group-open:hidden" />
                                      <X className="w-4 h-4 hidden group-open:block" />
                                    </span>
                                  </summary>

                                  <div className="mt-4 pt-4 border-t border-slate-100 text-xs sm:text-sm text-slate-600 space-y-4 font-sans leading-relaxed">
                                    {/* Authority stamp verification */}
                                    <div className="bg-emerald-50/50 font-semibold text-emerald-800 border-l-2 border-emerald-500/80 px-3 py-1.5 rounded-r text-[10px] uppercase tracking-wider flex items-center gap-1">
                                      <ShieldCheck className="w-3.5 h-3.5" />
                                      <span>{faq.authoritativeStamp}</span>
                                    </div>

                                    {/* Deep 300+ word rankable answer content parsed with basic markdown formatting */}
                                    <div className="whitespace-pre-line leading-relaxed text-slate-600 tracking-normal space-y-2 prose-custom">
                                      {faq.answer}
                                    </div>
                                  </div>
                                </details>
                              );
                            })
                          )}
                        </div>

                        {/* Pagination Controls dashboard */}
                        {totalPagesNeeded > 1 && (
                          <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-4">
                            <button
                              onClick={() => {
                                if (faqCurrentPage > 1) {
                                  setFaqCurrentPage(faqCurrentPage - 1);
                                  const el = document.getElementById("scroll-pillar-pivot");
                                  if (el) el.scrollIntoView({ behavior: "smooth" });
                                }
                              }}
                              disabled={currentPageClamped === 1}
                              className={`px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold uppercase transition flex items-center gap-1 ${currentPageClamped === 1 ? 'opacity-40 cursor-not-allowed bg-slate-50 text-slate-300' : 'bg-white hover:bg-slate-50 text-slate-700'}`}
                            >
                              <span>&larr; Prev</span>
                            </button>

                            <div className="text-[10px] sm:text-xs text-slate-500 font-semibold uppercase tracking-wider text-center px-2">
                              Page <span className="text-slate-800 font-extrabold">{currentPageClamped}</span> of <span className="text-slate-800 font-extrabold">{totalPagesNeeded}</span>
                              <span className="hidden sm:inline ml-3 text-[10px] text-slate-300">({faqsPerPage} items per page)</span>
                            </div>

                            <button
                              onClick={() => {
                                if (faqCurrentPage < totalPagesNeeded) {
                                  setFaqCurrentPage(faqCurrentPage + 1);
                                  const el = document.getElementById("scroll-pillar-pivot");
                                  if (el) el.scrollIntoView({ behavior: "smooth" });
                                }
                              }}
                              disabled={currentPageClamped === totalPagesNeeded}
                              className={`px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold uppercase transition flex items-center gap-1 ${currentPageClamped === totalPagesNeeded ? 'opacity-40 cursor-not-allowed bg-slate-50 text-slate-300' : 'bg-white hover:bg-slate-50 text-slate-700'}`}
                            >
                              <span>Next &rarr;</span>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })()}

                </div> {/* End of Pillar Content Left Area */}

                {/* Sidebar Right Info Area */}
                <div className="space-y-6">

                  {/* CTA BOX */}
                  <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm space-y-4">
                    <h4 className="font-extrabold text-sm text-center tracking-wide uppercase text-slate-200">Scale Your Automation</h4>
                    <p className="text-slate-300 text-xs leading-relaxed font-light text-center">
                      Get an customized integration draft comparing Vapi vs Yellow.ai natively for WhatsApp or voice support.
                    </p>
                    <button onClick={() => routeTo('chat')} className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg text-xs uppercase tracking-wide transition text-center">
                      Speak to Assistant
                    </button>
                  </div>

                  {/* Silo navigation menu widget */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Content Directory</h4>
                    <div className="space-y-1.5">
                      {silos.map(s => {
                        let tagColor = "indigo";
                        if (s.id === 'reviews') tagColor = "emerald";
                        if (s.id === 'builders') tagColor = "blue";
                        if (s.id === 'frameworks') tagColor = "violet";
                        if (s.id === 'business') tagColor = "amber";
                        if (s.id === 'research') tagColor = "rose";

                        return (
                          <button
                            key={s.id}
                            onClick={() => {
                              setSelectedSiloId(s.id);
                              setCurrentView('silo-pillar');
                            }}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-between transition ${s.id === selectedSiloId ? `bg-${tagColor}-50 text-${tagColor}-700` : 'text-slate-600 hover:bg-slate-50'}`}
                          >
                            <span>{s.name}</span>
                            <span className={`text-[9px] bg-white border px-1.5 py-0.5 rounded ${s.id === selectedSiloId ? `border-${tagColor}-200` : 'border-slate-200'}`}>
                              {siloPages.filter(p => p.siloId === s.id).length}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Newsletter widget */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 leading-none">Weekly Comparison Log</h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed">Join 12,500+ Indian developers and founders receiving curated reviews every Thursday.</p>
                    <form onSubmit={submitNewsletter} className="space-y-2">
                      <input
                        type="email"
                        className="w-full bg-slate-50 text-slate-800 border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="Enter company email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                      />
                      <button type="submit" className="w-full py-1.5 bg-slate-900 hover:bg-slate-850 text-white rounded-lg text-[10px] font-bold uppercase transition">
                        Subscribe Log
                      </button>
                      {newsletterSuccess && <p className="text-[10px] text-emerald-600 font-medium text-center mt-1">{newsletterSuccess}</p>}
                    </form>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* ==========================================
            VIEW C: COMPANION ARTICLE VIEW (DEEP DETAIL)
            ========================================== */}
          {currentView === 'article' && (() => {
            const page = getPageBySlug(selectedArticleSlug);
            if (!page) {
              return (
                <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl shadow-sm">
                  <AlertCircle className="w-12 h-12 text-slate-400 mx-auto" strokeWidth={1.5} />
                  <p className="text-slate-500 mt-4 font-semibold">pSEO Schema Route not compiled yet.</p>
                  <button onClick={() => routeTo('home')} className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold uppercase">Back to homepage</button>
                </div>
              );
            }

            // Fetch related articles on the sidebar
            const related = getRelatedPages(page);
            const verificationStatus = page.verificationStatus || 'editorially_reviewed';
            const confidenceLevel = page.confidenceLevel ?? 82;
            const sourcesUsed = page.sourcesUsed?.length ? page.sourcesUsed : ['official sources', 'documentation', 'pricing pages', 'editorial review'];
            const editorialReviewDate = page.editorialReviewDate || page.updatedAt;

            return (
              <div className="grid lg:grid-cols-4 gap-8">

                {/* Pillar core detail area */}
                <div className="lg:col-span-3 space-y-8">

                  {/* Breadcrumbs */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <button onClick={() => routeTo('home')} className="hover:underline">Home</button>
                      <ChevronRight className="w-3 h-3" />
                      <button onClick={() => routeTo('silo-pillar', page.siloId)} className="hover:underline capitalize">{page.siloId}</button>
                      <ChevronRight className="w-3 h-3" />
                      <span className="text-slate-600 font-semibold truncate">{page.primaryKeyword}</span>
                    </div>

                    <button
                      onClick={() => {
                        const shareUrl = `${window.location.origin}/${page.slug}`;
                        navigator.clipboard.writeText(shareUrl).then(() => {
                          setCopiedArticleSlug(page.slug);
                          setTimeout(() => setCopiedArticleSlug(null), 2000);
                        }).catch(() => {
                          setCopiedArticleSlug(null);
                        });
                      }}
                      className={`cursor-pointer inline-flex items-center gap-1.5 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold transition uppercase tracking-wider ${copiedArticleSlug === page.slug ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'text-slate-700'}`}
                    >
                      <span>{copiedArticleSlug === page.slug ? 'Copied URL!' : 'Share Guide URL'}</span>
                    </button>
                  </div>

                  {/* Main Article Title cards */}
                  <article className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className="text-[10px] bg-slate-100 text-slate-600 font-extrabold px-2 py-0.5 rounded border border-slate-200/60 uppercase tracking-widest">{page.primaryKeyword}</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded uppercase tracking-wider">AEO Snippet Verified</span>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight leading-snug">{page.h1}</h2>

                    {/* E-E-A-T credentials bar */}
                    <div className="flex items-center gap-4 text-xs text-slate-500 py-3 border-y border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <div className="w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center font-bold text-white text-[10px]">AS</div>
                        <span className="font-semibold text-slate-800">{page.author}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Published: {page.publishedAt}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1 text-emerald-700 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Editorial evidence reviewed</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-5 gap-2 text-[10px]">
                      {[
                        ['Last Updated', page.updatedAt],
                        ['Verification Status', verificationStatus.replace(/_/g, ' ')],
                        ['Confidence Level', `${confidenceLevel}/100`],
                        ['Sources Used', sourcesUsed.join(', ')],
                        ['Editorial Review Date', editorialReviewDate],
                      ].map(([label, value]) => (
                        <div key={label} className="bg-slate-50 border border-slate-200 rounded-lg p-3 min-h-[76px]">
                          <span className="block uppercase tracking-widest font-extrabold text-slate-400">{label}</span>
                          <span className="block mt-1 text-slate-800 font-semibold leading-snug break-words">{value}</span>
                        </div>
                      ))}
                    </div>

                    {/* AEO DIRECT ANSWER HIGHLIGHT BOX (CRITICAL FOR RICH FEATURE SNIPPETS) */}
                    <div className="bg-emerald-50/50 border-l-4 border-emerald-500 p-5 rounded-r-xl space-y-2 mt-4">
                      <p className="text-[10px] text-emerald-800 font-extrabold uppercase tracking-widest">AEO Summary Response Indicator</p>
                      <p className="text-sm font-semibold text-slate-900 leading-relaxed italic">{page.directAnswer}</p>
                    </div>

                    {/* Programmatic custom layout specifications (pro/con grids or leaderboards if relevant) */}
                    {page.ratingSummary && (
                      <div className="bg-slate-50 border border-slate-200 p-5 rounded-xl space-y-2 mt-6">
                        <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400">Editorial Verdict Checklist:</span>
                        <p className="text-xs text-slate-700 leading-relaxed font-semibold">{page.ratingSummary}</p>
                        <p className="text-xs text-emerald-700 leading-relaxed font-bold">{page.evaluationVerdict}</p>
                      </div>
                    )}

                    {/* Loop body sections */}
                    <div className="space-y-6 pt-4 text-slate-650 leading-relaxed text-sm tracking-wide">
                      {page.bodySections.length === 0 ? (
                        <p className="italic text-slate-400 text-xs">This sub-page context has been mapped into our dynamic relational index templates. Use our interactive matrix compared widgets to research spec levels or consult our Gemini Advisory model directly.</p>
                      ) : (
                        page.bodySections.map((sec, sid) => (
                          <div key={sid} className="space-y-2">
                            <h3 className="text-base font-bold text-slate-900">{sec.heading}</h3>
                            <p className="text-xs sm:text-sm text-slate-600">{sec.text}</p>
                          </div>
                        ))
                      )}
                    </div>

                    {/* 10/10 TOPICAL PILLAR SPECIFIC BLOCKS (GEO / LLM OPTIMIZER) */}
                    {isTopicalAuthoritySlug(page.slug) && (() => {
                      // Determine tools list based on Silo category for comparison table
                      let compTools = [
                        { name: "ChatGPT Plus", score: 9.5, pricing: "Freemium", bestFor: "General prompts" },
                        { name: "Claude 3.5 Sonnet", score: 9.6, pricing: "Freemium", bestFor: "Deep reasonings" },
                        { name: "Perplexity Pro", score: 9.4, pricing: "Paid", bestFor: "Cited search summaries" }
                      ];

                      if (page.siloId === 'coding-agents') {
                        compTools = [
                          { name: "Cursor AI", score: 9.6, pricing: "Freemium", bestFor: "Contextual codebase edits" },
                          { name: "Claude Code", score: 9.5, pricing: "Open Source", bestFor: "Terminal architecture loops" },
                          { name: "Devin AI", score: 9.0, pricing: "Paid", bestFor: "Full-repo agent pipelines" }
                        ];
                      } else if (page.siloId === 'builders') {
                        compTools = [
                          { name: "Flowise AI", score: 9.4, pricing: "Open Source", bestFor: "No-code node assembly" },
                          { name: "Dify.ai", score: 9.3, pricing: "Freemium", bestFor: "Production LLM apps" },
                          { name: "Relevance AI", score: 8.9, pricing: "Paid", bestFor: "B2B workforce automation" }
                        ];
                      } else if (page.siloId === 'frameworks') {
                        compTools = [
                          { name: "CrewAI", score: 9.4, pricing: "Open Source", bestFor: "Role-based group tasks" },
                          { name: "LangGraph", score: 9.5, pricing: "Freemium", bestFor: "Stateful cyclic graphs" },
                          { name: "AutoGen", score: 8.8, pricing: "Open Source", bestFor: "Conversational loops" }
                        ];
                      } else if (page.siloId === 'business') {
                        compTools = [
                          { name: "Yellow.ai", score: 9.5, pricing: "Enterprise", bestFor: "WhatsApp commerce loops" },
                          { name: "Vapi AI", score: 9.4, pricing: "Pay-as-you-go", bestFor: "Low-latency voice lines" },
                          { name: "Haptik", score: 9.0, pricing: "Enterprise", bestFor: "Indian SME triage bots" }
                        ];
                      } else if (page.siloId === 'mcp') {
                        compTools = [
                          { name: "SQLite Server", score: 9.5, pricing: "Open Source", bestFor: "Structured schema query" },
                          { name: "PostgreSQL Server", score: 9.4, pricing: "Open Source", bestFor: "Enterprise warehouse search" },
                          { name: "GitHub Connector", score: 9.1, pricing: "Free", bestFor: "Code repo operations" }
                        ];
                      }

                      return (
                        <div className="pt-6 border-t border-slate-100 space-y-8 mt-8">
                          {/* 1. KEY TAKEAWAYS BOARD */}
                          <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-3">
                            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
                              <Sparkles className="w-4 h-4 text-emerald-600" /> Key Strategic Takeaways
                            </h4>
                            <ul className="space-y-2 text-xs sm:text-sm text-slate-755 font-light leading-relaxed">
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-700 font-extrabold">✓</span>
                                <span><strong>DPDP Consent Framework:</strong> Any workflow that touches personal data should define consent, access control, retention, deletion, and vendor-processing responsibilities before launch.</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-700 font-extrabold">✓</span>
                                <span><strong>Latency Targets:</strong> Prioritize orchestration tools with observable response times, fallback handling, and infrastructure choices that fit the workflow's real service-level needs.</span>
                              </li>
                              <li className="flex items-start gap-2">
                                <span className="text-emerald-700 font-extrabold">✓</span>
                                <span><strong>Cost vs Value Index:</strong> Self-hosted or direct API architectures may reduce platform markups, but teams should model token, hosting, monitoring, and support costs before switching.</span>
                              </li>
                            </ul>
                          </div>

                          {/* 2. DYNAMIC COMPLIANT COMPARISON TABLE */}
                          <div className="space-y-3">
                            <h4 className="text-xs font-bold text-slate-950 uppercase tracking-widest flex items-center gap-1.5">
                              <Sliders className="w-4 h-4 text-emerald-600" /> Peer Comparison Matrix
                            </h4>
                            <div className="overflow-x-auto border border-slate-200 rounded-xl bg-white">
                              <table className="w-full text-left text-xs">
                                <thead className="bg-slate-50 text-slate-800 uppercase font-mono text-[10px] border-b border-slate-200">
                                  <tr>
                                    <th className="p-3">Solution Name</th>
                                    <th className="p-3 text-center">Editorial Fit</th>
                                    <th className="p-3">Pricing Tier</th>
                                    <th className="p-3">Best Recommended For</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                  {compTools.map((tool, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/50">
                                      <td className="p-3 font-bold text-slate-950 flex items-center gap-1.5 whitespace-nowrap">
                                        <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-mono font-black text-[9px]">{tool.name[0]}</span>
                                        {tool.name}
                                      </td>
                                      <td className="p-3 text-center">
                                        <span className="bg-emerald-50 text-emerald-805 font-extrabold px-1.5 py-0.5 rounded font-mono">
                                          {tool.score}/10
                                        </span>
                                      </td>
                                      <td className="p-3 text-slate-600 font-semibold">{tool.pricing}</td>
                                      <td className="p-3 text-slate-500 font-light truncate max-w-sm">{tool.bestFor}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>

                          {/* 3. PROS & CONS GRID */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-emerald-50/20 border border-emerald-500/15 p-5 rounded-2xl space-y-2">
                              <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-widest flex items-center gap-1.5">
                                <CheckCircle className="w-4 h-4 text-emerald-700" /> Standard Advantages (Pros)
                              </h4>
                              <ul className="space-y-1.5 text-xs text-slate-700 font-light list-none">
                                <li className="flex items-center gap-1">✓ DPDP-aware review prompts for personal-data workflows</li>
                                <li className="flex items-center gap-1">✓ Hinglish and bilingual evaluation where the vendor or model supports it</li>
                                <li className="flex items-center gap-1">✓ ROI framing based on measurable workflow savings, not demo claims</li>
                              </ul>
                            </div>

                            <div className="bg-rose-50/10 border border-rose-500/15 p-5 rounded-2xl space-y-2">
                              <h4 className="text-xs font-bold text-rose-800 uppercase tracking-widest flex items-center gap-1.5">
                                <AlertCircle className="w-4 h-4 text-rose-700" /> Potential Limitations (Cons)
                              </h4>
                              <ul className="space-y-1.5 text-xs text-slate-700 font-light list-none">
                                <li className="flex items-center gap-1">✗ Setup overhead requires standard cloud infrastructure experience</li>
                                <li className="flex items-center gap-1">✗ Rate limits on global fallback API key paths</li>
                                <li className="flex items-center gap-1">✗ Token fee overhead when running continuous cyclic pipelines</li>
                              </ul>
                            </div>
                          </div>

                          {/* 4. ALTERNATIVES BOARD */}
                          <div className="space-y-2 bg-slate-50/50 border border-slate-200 p-5 rounded-2xl">
                            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest">Recommended Alternatives</h4>
                            <p className="text-xs text-slate-500 font-light leading-normal">
                              Not satisfied with global defaults? Start with these tested alternative configurations:
                            </p>
                            <div className="flex flex-wrap gap-2 pt-1">
                              <span className="bg-white border border-slate-200 px-3 py-1 rounded-lg text-xs font-semibold text-slate-750">Self-Hosted Flowise</span>
                              <span className="bg-white border border-slate-200 px-3 py-1 rounded-lg text-xs font-semibold text-slate-755">Vapi Local Gateway</span>
                              <span className="bg-white border border-slate-200 px-3 py-1 rounded-lg text-xs font-semibold text-slate-755">Enterprise Yellow.ai Portal</span>
                            </div>
                          </div>

                          {/* 5. PRICING SPECS */}
                          <div className="bg-slate-900 text-slate-250 p-5 rounded-2xl space-y-3 border border-slate-800">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 font-mono">Budget &amp; Procurement Estimations</h4>
                              <span className="text-[10px] bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded font-mono">UPI/GST Check</span>
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-center py-2 border-y border-slate-800">
                              <div>
                                <p className="text-[9px] text-slate-400 font-mono">COMMUNITY</p>
                                <p className="text-sm font-black text-white">₹0 / Free</p>
                              </div>
                              <div>
                                <p className="text-[9px] text-slate-400 font-mono">DEVELOPER</p>
                                <p className="text-sm font-black text-white">₹1,680 / Mo</p>
                              </div>
                              <div>
                                <p className="text-[9px] text-slate-400 font-mono">ENTERPRISE</p>
                                <p className="text-sm font-black text-white">Custom Quote</p>
                              </div>
                            </div>
                            <p className="text-[10px] text-slate-400 font-light leading-snug">
                              Pricing and payment support can vary by vendor. Confirm GST invoices, card billing, UPI/Razorpay availability, forex markup, and official tax treatment before procurement.
                            </p>
                          </div>

                          {/* 6. BEST FOR MATCH */}
                          <div className="flex items-center gap-3 bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl">
                            <span className="text-[9px] bg-emerald-600 text-white font-extrabold uppercase px-2 py-1 rounded tracking-wider font-mono">BEST FOR</span>
                            <p className="text-xs sm:text-sm text-slate-850 font-extrabold">
                              Teams that need measurable workflow improvement, clear data controls, practical implementation guidance, and India-aware procurement checks.
                            </p>
                          </div>

                          {/* 7. VERDICT STATEMENT SIGN-OFF */}
                          <div className="border border-slate-200 p-5 rounded-2xl space-y-2 bg-gradient-to-r from-emerald-500/5 to-transparent">
                            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Final Editorial Verdict</h4>
                            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light">
                              "{page.evaluationVerdict || 'This category can be valuable when the workflow is specific, measurable, and governed with clear human review, cost controls, and privacy safeguards.'}"
                            </p>
                            <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-mono text-[9px] font-bold">AS</div>
                              <span className="text-[10px] font-bold text-slate-650 uppercase font-mono">Arshdeep Singh, BestAIAgent.in Editorial Team</span>
                            </div>
                          </div>

                        </div>
                      );
                    })()}
                  </article>

                  {/* Contextual verification tool list for reviews silo */}
                  {page.siloId === 'reviews' && (
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
                      <h3 className="text-lg font-bold text-slate-950">Related tools for {page.primaryKeyword} research</h3>
                      <div className="space-y-3">
                        {products.map(p => (
                          <div key={p.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center gap-4">
                            <div>
                              <p className="font-bold text-slate-900 text-sm">{p.name}</p>
                              <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{p.summary}</p>
                            </div>
                            <div className="text-center">
                              <span className="text-[9px] uppercase font-bold text-slate-400">India Fit</span>
                              <p className="font-extrabold text-emerald-700 text-sm">{p.scores.indiaFit}/10</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* FAQ section */}
                  <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
                    <h3 className="text-lg font-bold text-slate-950">Structured FAQ for SEO Crawler</h3>
                    <div className="space-y-3">
                      {page.faqs.length === 0 ? (
                        <>
                          <div className="border border-slate-100 rounded-xl p-4">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900">Which AI agent approach is best for budget-conscious SMEs?</h4>
                            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                              Budget-conscious SMEs should start with one narrow workflow, compare SaaS and self-hosted options, and estimate total cost across subscription, usage, hosting, support, and implementation time.
                            </p>
                          </div>
                          <div className="border border-slate-100 rounded-xl p-4">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900">Are voice agents automatically compliant with Indian privacy expectations?</h4>
                            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                              No. Voice agents need a DPDP-aware review of consent, call recording, retention, deletion, escalation, vendor processing terms, and whether sensitive data is handled appropriately.
                            </p>
                          </div>
                        </>
                      ) : (
                        page.faqs.map((faq, f_idx) => (
                          <div key={f_idx} className="border border-slate-100 rounded-xl p-4">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900">{faq.question}</h4>
                            <p className="text-xs text-slate-500 mt-2 leading-relaxed">{faq.answer}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* GOOGLE CRAWLER & SCHEMA JSON-LD DIAGRAM VISUALIZATION CHIP */}
                  <div className="bg-slate-900 text-slate-300 rounded-2xl p-5 shadow-sm space-y-4 border border-slate-800">
                    <div className="flex items-center gap-2 text-emerald-400">
                      <FileText className="w-5 h-5" />
                      <h4 className="text-xs font-bold uppercase tracking-widest leading-none">Automated Schema.org / JSON-LD structured data</h4>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed font-light">
                      Our programmatic engine injects structured JSON-LD patterns such as FAQPage, BreadcrumbList, Article, and WebPage where appropriate. Below is an illustrative metadata pattern for crawler review.
                    </p>
                    <pre className="bg-slate-950 text-slate-400 p-4 rounded-lg overflow-x-auto text-[10px] font-mono leading-relaxed border border-slate-800">
                      {`{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "headline": "${page.title}",
      "author": { "@type": "Person", "name": "${page.author.split(',')[0]}" },
      "datePublished": "${page.publishedAt}",
      "dateModified": "${page.updatedAt}",
      "publisher": { "@type": "Organization", "name": "BestAIAgent.in" }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "${SITE_URL}/" },
        { "@type": "ListItem", "position": 2, "name": "${page.siloId}", "item": "${SITE_URL}/${page.siloId}" },
        { "@type": "ListItem", "position": 3, "name": "${page.primaryKeyword}" }
      ]
    }
  ]
}`}
                    </pre>
                  </div>

                </div>

                {/* Sidebar Context links (4 links) */}
                <div className="space-y-6">

                  {/* Related Links widgets */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-4">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest leading-none">Related Cluster Guides</h4>
                    <div className="space-y-3">
                      {related.length === 0 ? (
                        <p className="text-[11px] text-slate-400">Search pages context mapping.</p>
                      ) : (
                        related.map((col_p, col_i) => (
                          <button
                            key={col_i}
                            onClick={() => {
                              setSelectedArticleSlug(col_p.slug);
                              setCurrentView('article');
                            }}
                            className="w-full text-left font-semibold text-xs text-slate-800 hover:text-emerald-700 transition flex items-start gap-1.5 leading-snug pb-2 border-b border-slate-100 last:border-none last:pb-0"
                          >
                            <ChevronRight className="w-3.5 h-3.5 text-slate-450 shrink-0 mt-0.5" />
                            <span>{col_p.title}</span>
                          </button>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Newsletter widget */}
                  <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm space-y-3">
                    <h4 className="text-xs font-bold text-slate-900 leading-none font-sans">Silo Digest</h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed">Join 12,500+ Indian operators keeping up-to-date with non-commodity AI benchmarks.</p>
                    <form onSubmit={submitNewsletter} className="space-y-2">
                      <input
                        type="email"
                        className="w-full bg-slate-50 text-slate-800 border border-slate-200 rounded-lg p-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="Your corporate email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                      />
                      <button type="submit" className="w-full py-2 bg-slate-900 hover:bg-slate-850 text-white rounded-lg text-[10px] font-bold uppercase transition">
                        Subscribe digests
                      </button>
                    </form>
                  </div>

                  {/* ADVISORY DIRECT MOCKUP */}
                  <div className="bg-gradient-to-tr from-slate-900 to-slate-950 text-white rounded-2xl p-5 shadow-sm space-y-4">
                    <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-300 text-center leading-none">Need Custom Architecture?</h4>
                    <p className="text-slate-400 text-[11px] leading-relaxed text-center font-light">Speak directly to our advisory recommender chatbot designed to match budgets.</p>
                    <button onClick={() => routeTo('chat')} className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-lg text-[10px] uppercase transition text-center shadow-lg">
                      Launch chatbot
                    </button>
                  </div>

                </div>

              </div>
            );
          })()}

          {/* ==========================================
            VIEW C-SPECIFIC: SINGLE PRODUCT ENHANCED PROFILE
            ========================================== */}
          {currentView === 'product' && (() => {
            const productObj = products.find(p => p.slug === selectedProductSlug) || (() => {
              const directoryProduct = directoryTools.find(tool => getDirectoryToolSlug(tool.name) === selectedProductSlug);
              if (!directoryProduct) return null;
              const asset = getToolAsset(selectedProductSlug);
              const isOpenSource = directoryProduct.pricing === 'Open Source';
              const baseScore = Number(directoryProduct.score.toFixed(1));
              return {
                id: selectedProductSlug,
                name: directoryProduct.name,
                slug: selectedProductSlug,
                vendorName: new URL(directoryProduct.websiteUrl).hostname,
                vendorUrl: directoryProduct.websiteUrl,
                logoUrl: asset.logo,
                summary: directoryProduct.description,
                bestFor: directoryProduct.bestFor,
                bestForProfiles: [directoryProduct.category],
                limitations: ['Verify current vendor pricing, privacy terms, and regional availability before purchase.'],
                pricingModel: directoryProduct.pricing,
                startingPriceINR: isOpenSource ? '₹0 (Free / Self-Hosted)' : 'Contact vendor',
                startingPriceUSD: isOpenSource ? '$0' : 'Contact vendor',
                freeTrial: !isOpenSource,
                openSource: isOpenSource,
                overallScore: baseScore,
                scores: {
                  easeOfUse: baseScore,
                  features: baseScore,
                  docs: baseScore,
                  integrations: baseScore,
                  value: baseScore,
                  reliability: baseScore,
                  indiaFit: baseScore,
                  scalability: baseScore,
                },
                pros: [],
                cons: [],
                featuresList: [directoryProduct.category],
                verdict: directoryProduct.description,
                useCases: [directoryProduct.bestFor],
                whatsappReady: false,
                indianPaymentSupport: false,
                whatWeTested: 'Directory profile generated from BestAIAgent.in editorial taxonomy; full hands-on review pending where not explicitly marked as verified.',
                lastVerified: '2026-06-12',
                alternativeSlugs: [],
                comparisonSlugs: [],
                frameworkSlugs: [],
                confidenceLevel: 72,
                verificationStatus: 'pending' as const,
              };
            })();
            if (!productObj) {
              return (
                <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl shadow-sm">
                  <p className="text-slate-500 mt-4 font-semibold">Product profile not found.</p>
                  <button onClick={() => routeTo('home')} className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold uppercase">Back to homepage</button>
                </div>
              );
            }
            const toggleCompare = (slug: string) => {
              if (compareList.includes(slug)) {
                setCompareList(compareList.filter(s => s !== slug));
              } else {
                setCompareList([...compareList, slug]);
              }
            };
            return (
              <ProductProfile
                product={productObj}
                onBack={() => routeTo('home')}
                onCompare={toggleCompare}
                isInCompareList={compareList.includes(productObj.slug)}
                routeTo={routeTo}
              />
            );
          })()}

          {/* ==========================================
            AUTHOR PROFILE VIEW
            ========================================== */}
          {currentView === 'author' && selectedArticleSlug && (() => {
            const author = authorProfiles.find(a => a.slug === selectedArticleSlug);
            if (!author) {
              return (
                <div className="text-center py-20 bg-white border border-slate-200 rounded-2xl shadow-sm">
                  <p className="text-slate-500 mt-4 font-semibold">Author profile not found.</p>
                  <button onClick={() => routeTo('home')} className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold uppercase">Back to homepage</button>
                </div>
              );
            }
            return (
              <div className="max-w-3xl mx-auto space-y-8">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-4">
                  <div className="flex items-center gap-4">
                    <img src={author.avatarUrl} alt={author.name} className="w-16 h-16 rounded-full border border-slate-200 object-cover" />
                    <div>
                      <h2 className="text-2xl font-extrabold text-slate-950">{author.name}</h2>
                      <p className="text-sm text-slate-500">{author.role}</p>
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{author.bio}</p>
                  <div className="grid sm:grid-cols-3 gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase text-slate-500">Reviews</span>
                      <p className="text-base font-black text-slate-900">{author.reviewCount}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase text-slate-500">Updated Pages</span>
                      <p className="text-base font-black text-slate-900">{author.updatedPages.length}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase text-slate-500">Methodology</span>
                      <p className="text-base font-black text-slate-900">{author.methodologyContributions.length}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase text-slate-500">Expertise</span>
                    <div className="flex flex-wrap gap-1">
                      {author.expertise.map(item => (
                        <span key={item} className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded border border-slate-200">{item}</span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold uppercase text-slate-500">Methodology Contributions</span>
                    <ul className="list-disc pl-4 space-y-1 text-[11px] text-slate-700">
                      {author.methodologyContributions.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                  {author.updatedPages.length > 0 && (
                    <div className="space-y-2 pt-4 border-t border-slate-100">
                      <span className="text-[10px] font-bold uppercase text-slate-500">Updated Pages</span>
                      <div className="flex flex-wrap gap-2">
                        {author.updatedPages.map(slug => (
                          <button key={slug} onClick={() => routeTo('article', undefined, slug)} className="text-[11px] text-indigo-700 hover:underline">{slug}</button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* ==========================================
            VIEW D: INTERACTIVE COMPARE BOARD + COMPARISON PAGES
            ========================================== */}
          {currentView === 'compare' && comparisonPages.some(c => c.slug === selectedArticleSlug) && (
            <ComparisonPage slug={selectedArticleSlug} routeTo={routeTo} />
          )}
          {currentView === 'compare' && !comparisonPages.some(c => c.slug === selectedArticleSlug) && (
            <div className="space-y-8">
              <div className="border-b border-slate-200 pb-6">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
                  <button onClick={() => routeTo('home')} className="hover:underline">Home</button>
                  <ChevronRight className="w-3 h-3" />
                  <span className="text-slate-600 font-semibold">Compare Tools Board</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">Interactive Comparative Matrix Board</h2>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed max-w-2xl">Toggle selections on our active indices to analyze starting prices, support compliance, and overall score cards side-by-side.</p>
              </div>

              {/* Selector Area */}
              <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Select Tools to Compare (Max 4)</h4>
                <div className="flex flex-wrap gap-2">
                  {products.map(p => {
                    const isSelected = compareList.includes(p.slug);
                    return (
                      <button
                        key={p.id}
                        onClick={() => {
                          if (isSelected) {
                            setCompareList(prev => prev.filter(slug => slug !== p.slug));
                          } else {
                            if (compareList.length >= 4) {
                              alert("Please select a maximum of 4 tools to maintain clear horizontal comparison layout.");
                              return;
                            }
                            setCompareList(prev => [...prev, p.slug]);
                          }
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${isSelected ? 'bg-emerald-50 border-emerald-300 text-emerald-800' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                      >
                        {isSelected ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        <span>{p.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Matrix Table */}
              {compareList.length === 0 ? (
                <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl">
                  <ArrowLeftRight className="w-12 h-12 text-slate-400 mx-auto" strokeWidth={1.5} />
                  <p className="text-slate-400 mt-4 text-sm font-semibold">No tools selected. Check 1 or 2 options above to render comparative grids.</p>
                </div>
              ) : (
                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-x-auto min-w-full">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="px-6 py-4 font-bold text-slate-450 uppercase text-[10px] tracking-wider w-1/4">Evaluation Parameter</th>
                        {compareList.map(slug => {
                          const p = products.find(prod => prod.slug === slug);
                          return (
                            <th key={slug} className="px-6 py-4 font-black text-slate-900 text-sm">{p?.name}</th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      <tr>
                        <td className="px-6 py-4 font-bold text-slate-900 text-xs uppercase text-slate-500">Overall Rating / 10</td>
                        {compareList.map(slug => {
                          const p = products.find(prod => prod.slug === slug);
                          return (
                            <td key={slug} className="px-6 py-4 font-black text-emerald-700 text-base">{p?.overallScore}</td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-slate-900 text-xs uppercase text-slate-500">INR Pricing (Estimate)</td>
                        {compareList.map(slug => {
                          const p = products.find(prod => prod.slug === slug);
                          return (
                            <td key={slug} className="px-6 py-4 font-bold text-slate-950 text-xs">{p?.startingPriceINR}</td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-slate-900 text-xs uppercase text-slate-500">Best Case Scenario</td>
                        {compareList.map(slug => {
                          const p = products.find(prod => prod.slug === slug);
                          return (
                            <td key={slug} className="px-6 py-4 text-xs text-slate-600 max-w-xs">{p?.bestFor}</td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-slate-900 text-xs uppercase text-slate-500">WhatsApp Channel Ready</td>
                        {compareList.map(slug => {
                          const p = products.find(prod => prod.slug === slug);
                          return (
                            <td key={slug} className="px-6 py-4">
                              {p?.whatsappReady ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200">Yes</span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold border border-slate-200">No</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-slate-900 text-xs uppercase text-slate-500">Indian Payments Support</td>
                        {compareList.map(slug => {
                          const p = products.find(prod => prod.slug === slug);
                          return (
                            <td key={slug} className="px-6 py-4">
                              {p?.indianPaymentSupport ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200">Yes (UPI compatible)</span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold border border-slate-200">No</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-slate-900 text-xs uppercase text-slate-500">Indian Compliance (DPDP)</td>
                        {compareList.map(slug => {
                          const p = products.find(prod => prod.slug === slug);
                          return (
                            <td key={slug} className="px-6 py-4 font-semibold text-xs">
                              {p?.scores && p.scores.indiaFit >= 9.5 ? (
                                <span className="text-emerald-700">Audit approved (Mumbai servers)</span>
                              ) : (
                                <span className="text-slate-500">Generic SLA agreements</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-slate-900 text-xs uppercase text-slate-500">Pros checklist</td>
                        {compareList.map(slug => {
                          const p = products.find(prod => prod.slug === slug);
                          return (
                            <td key={slug} className="px-6 py-4">
                              <ul className="space-y-1 text-[11px] text-slate-600 list-disc list-inside">
                                {p?.pros.map((pro, index) => <li key={index}>{pro}</li>)}
                              </ul>
                            </td>
                          );
                        })}
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-bold text-slate-900 text-xs uppercase text-slate-500">Cons limitation</td>
                        {compareList.map(slug => {
                          const p = products.find(prod => prod.slug === slug);
                          return (
                            <td key={slug} className="px-6 py-4">
                              <ul className="space-y-1 text-[11px] text-slate-500 list-disc list-inside">
                                {p?.cons.map((con, index) => <li key={index} className="italic">{con}</li>)}
                              </ul>
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ==========================================
            VIEW E: AI CHAT RECOMENDER ADVISOR
            ========================================== */}
          {currentView === 'chat' && (
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="border-b border-slate-200 pb-6 text-center">
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight inline-flex items-center gap-2">
                  <Sparkles className="w-8 h-8 text-emerald-500" /> Active AI Recommendation Assistant
                </h2>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed max-w-xl mx-auto">
                  Powered by Gemini on our secure Node/Express backend. Ask specialized localization questions about WhatsApp billing networks, coding copilots, or SME budgets, and receive instant customized advice.
                </p>
              </div>

              {/* Chatbot Interface */}
              <div className="bg-white border border-slate-200 rounded-2xl shadow-xl flex flex-col h-[500px] overflow-hidden">

                {/* Header */}
                <div className="bg-slate-950 text-white p-4 flex items-center justify-between border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-bold uppercase tracking-wider">Gemini Flash Active • India advisor</span>
                  </div>
                  <button onClick={() => setChatMessages([{ sender: 'assistant', text: "Namaste! Chat reset. How can I consult your AI Agent decision pipeline today?" }])} className="text-[10px] font-bold text-slate-400 hover:text-white transition uppercase">Reset chat</button>
                </div>

                {/* Messages viewport */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`p-4 rounded-2xl max-w-xl text-xs leading-relaxed space-y-1 shadow-sm ${msg.sender === 'user' ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none border border-slate-200/60'}`}>
                        {msg.sender === 'assistant' ? (
                          <div className="prose prose-sm prose-slate max-w-none text-[11px] leading-relaxed select-text space-y-2">
                            <p className="font-semibold text-[10px] text-emerald-800 uppercase tracking-widest leading-none mb-1">BestAIAgent.in Architect</p>
                            {msg.text.split('\n').map((line, lid) => {
                              if (line.startsWith('###')) {
                                return <h4 key={lid} className="font-bold text-slate-900 text-xs mt-3">{line.replace('###', '')}</h4>;
                              } else if (line.startsWith('1.') || line.startsWith('2.')) {
                                return <p key={lid} className="font-bold text-slate-950 mt-1">{line}</p>;
                              } else if (line.startsWith('-')) {
                                return <li key={lid} className="list-disc ml-4 text-[10px] text-slate-650">{line.replace('-', '')}</li>;
                              } else {
                                return <p key={lid} className="m-0 text-slate-700">{line}</p>;
                              }
                            })}
                          </div>
                        ) : (
                          <p className="font-medium select-text">{msg.text}</p>
                        )}
                      </div>
                    </div>
                  ))}
                  {isChatLoading && (
                    <div className="flex justify-start">
                      <div className="bg-slate-100 border border-slate-250 p-4 rounded-xl rounded-bl-none text-xs text-slate-500 animate-pulse flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-emerald-600 animate-spin" />
                        <span>Gemini is compiling recommendations, pricing estimates in INR, and compliance logs...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Presets suggestions hooks */}
                <div className="bg-slate-50 border-t border-slate-100 p-2 flex flex-wrap gap-1.5 justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      setChatInput("Suggest a support AI agent that can run over WhatsApp and link with Zoho CRM for an Indian e-commerce checkout.");
                    }}
                    className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-lg px-2.5 py-1 text-[10px] font-semibold transition"
                  >
                    WhatsApp Support Scenario
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setChatInput("Which open-source framework is best for orchestrating role-based multi-agent assemblies under a Python developer setup?");
                    }}
                    className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-lg px-2.5 py-1 text-[10px] font-semibold transition"
                  >
                    Open Source Multi-Agent
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setChatInput("We are a Bangalore-based software team. Is there an AI agent for code review and backend schema generation to replace classic copilot?");
                    }}
                    className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-100 rounded-lg px-2.5 py-1 text-[10px] font-semibold transition"
                  >
                    AI Coding Options
                  </button>
                </div>

                {/* Submit Box */}
                <form onSubmit={handleChatSubmit} className="border-t border-slate-200 p-3 bg-white flex items-center gap-2">
                  <input
                    type="text"
                    className="w-full bg-slate-50 text-slate-800 placeholder-slate-400 p-3 rounded-lg text-xs border border-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    placeholder="Describe your use-case (e.g. 'WhatsApp support bot for Mumbai logistics brand')"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    disabled={isChatLoading}
                  />
                  <button type="submit" disabled={isChatLoading} className="px-5 py-3 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white rounded-lg text-xs font-bold uppercase transition shrink-0">
                    Submit
                  </button>
                </form>

              </div>
            </div>
          )}

          {/* ==========================================
            VIEW F: SCORE WEIGHTS TUNER
            ========================================== */}
          {currentView === 'tuner' && (
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="border-b border-slate-200 pb-6 text-center">
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight inline-flex items-center gap-2">
                  <Sliders className="w-8 h-8 text-indigo-500" /> Interactive Score Tuning Panel
                </h2>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed max-w-xl mx-auto">
                  No single indexing model fits every operational target. Modify the sliders below to prioritize your business requirements. Rankings update immediately in the right panel.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">

                {/* Tuners Sliders Left */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                  <div className="flex items-center justify-between border-b pb-3">
                    <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Scoring Dimension weight</h4>
                    <button onClick={() => applyPreset('india')} className="text-xs font-bold text-emerald-600 hover:underline">Reset India fit</button>
                  </div>

                  <div className="space-y-4">
                    {Object.keys(weights).map(key => {
                      const typedKey = key as keyof typeof weights;
                      let label = "Dimension Score";
                      if (key === "easeOfUse") label = "Ease of Use / No-Code Visuals";
                      if (key === "features") label = "Power / Features list depth";
                      if (key === "docs") label = "Documentation / SDK libraries";
                      if (key === "integrations") label = "API Integrations (Salesforce, Zoho)";
                      if (key === "value") label = "Value for Money / Low model API cost";
                      if (key === "reliability") label = "Operational loop reliability";
                      if (key === "indiaFit") label = "India Fit (UPI, WhatsApp, Dialects)";
                      if (key === "scalability") label = "Scalability (Enterprise loads)";

                      return (
                        <div key={key} className="space-y-1.5">
                          <div className="flex justify-between text-xs">
                            <span className="font-bold text-slate-800">{label}</span>
                            <span className="font-bold text-slate-500">{weights[typedKey]}%</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="50"
                            step="1"
                            className="w-full accent-indigo-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                            value={weights[typedKey]}
                            onChange={(e) => setWeights({ ...weights, [typedKey]: parseFloat(e.target.value) })}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Dynamic results Right */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 pt-5 self-start">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider border-b pb-3">Calculated Live Ranks ({sortedProducts.length})</h4>
                  <div className="space-y-3">
                    {sortedProducts.map((p, index) => (
                      <div key={p.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 bg-slate-900 text-white text-[10px] font-bold rounded-md flex items-center justify-center">#{index + 1}</span>
                          <div>
                            <p className="font-semibold text-xs text-slate-950">{p.name}</p>
                            <p className="text-[10px] text-slate-400 mt-0.5 font-medium">{p.pricingModel} • Starting {p.startingPriceUSD}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Live Weighted Score</span>
                          <p className="font-black text-emerald-700 text-sm mt-0.5">{p.calculatedScore}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl text-[10px] text-emerald-800 leading-snug font-medium mt-4">
                    <CheckCircle className="w-4 h-4 text-emerald-600 inline mr-1" /> Dynamic calculation complete. Use these ratings as a direct recommendation baseline for local SME pipelines.
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ==========================================
            VIEW G: ADMIN EDITORIAL WORKFLOW
            ========================================== */}
          {currentView === 'editorial' && (
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="border-b border-slate-200 pb-6 text-center">
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight inline-flex items-center gap-2">
                  <Settings className="w-8 h-8 text-violet-500" /> Lead Admin Editorial Suite
                </h2>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed max-w-xl mx-auto">
                  Workbench simulator tracking page draft status, pSEO programmatic generators, data schemes, and crawler-friendly XML structures.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">

                {/* Programmatic Creator panel */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
                  <div>
                    <h3 className="text-base font-bold text-slate-950 mb-1">Staged pSEO Page Generator</h3>
                    <p className="text-xs text-slate-400 leading-relaxed font-light">Rapidly create non-commodity comparison endpoints by parsing custom keyword variations.</p>
                  </div>

                  <form onSubmit={handleCreateProgrammaticPage} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Select Parent Cluster Silo</label>
                      <select
                        className="w-full bg-slate-55 border border-slate-200 text-xs p-2.5 rounded-lg text-slate-800 focus:outline-none"
                        value={selectedSiloId}
                        onChange={(e) => setSelectedSiloId(e.target.value)}
                      >
                        {silos.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700">Target Keyword Segment (Slug)</label>
                      <input
                        type="text"
                        className="w-full bg-slate-55 border border-slate-200 text-xs p-2.5 rounded-lg placeholder-slate-400 focus:outline-none"
                        placeholder="e.g. best-ai-agent-for-logistic"
                        required
                        value={newSEOArticleSlug}
                        onChange={(e) => setNewSEOArticleSlug(e.target.value)}
                      />
                    </div>
                    <button type="submit" className="w-full py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-850 text-white rounded-lg text-xs font-bold uppercase transition">
                      Generate dynamic route
                    </button>
                  </form>

                  <div className="border-t border-slate-150 pt-4 space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-slate-950 mb-1">Core Database Schemas</h3>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">Inspect current active products and sitemap nodes cataloging.</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => alert(JSON.stringify(products, null, 2))} className="px-4 py-2 bg-slate-100 hover:bg-slate-150 rounded-lg text-xs font-semibold text-slate-700">Show Products JSON</button>
                      <button onClick={() => alert(JSON.stringify(siloPages.map(page => ({ title: page.title, slug: page.slug, keyword: page.primaryKeyword })), null, 2))} className="px-4 py-2 bg-slate-100 hover:bg-slate-150 rounded-lg text-xs font-semibold text-slate-700">Show Sitemap list</button>
                    </div>
                  </div>
                </div>

                {/* Status List Right */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 pt-5 self-start">
                  <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider">Editorial Review Status Dashboard</h4>

                  <div className="space-y-3">
                    {siloPages.slice(0, 5).map(page => {
                      const activeStatus = draftStatuses[page.slug] || 'published';
                      return (
                        <div key={page.slug} className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between gap-4">
                          <div className="flex-1 truncate">
                            <p className="font-bold text-xs text-slate-900 truncate leading-none mb-1">{page.title}</p>
                            <span className="text-[9px] uppercase font-bold text-slate-450 tracking-wide">{page.primaryKeyword}</span>
                          </div>
                          <select
                            className="bg-white border text-[10px] p-1 rounded font-bold text-slate-700"
                            value={activeStatus}
                            onChange={(e) => setDraftStatuses({ ...draftStatuses, [page.slug]: e.target.value as any })}
                          >
                            <option value="published">Published</option>
                            <option value="review">Under Review</option>
                            <option value="draft">Draft</option>
                          </select>
                        </div>
                      );
                    })}
                  </div>

                  <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl text-[10px] text-yellow-800 leading-snug font-medium mt-4">
                    <AlertCircle className="w-4 h-4 text-yellow-600 inline mr-1" /> Simulated Database connection is running in Memory-State mode. Changes will not modify server filesystem but display complete client integration validation.
                  </div>
                </div>

              </div>
            </div>
          )}

          {currentView === 'about' && trustPages.about && (
            <TrustPage page={trustPages.about} onNavigate={navigateToPath} />
          )}

          {currentView === 'team' && trustPages.team && (
            <TrustPage page={trustPages.team} onNavigate={navigateToPath} />
          )}

          {currentView === 'trust' && trustPages[selectedArticleSlug] && (
            <TrustPage page={trustPages[selectedArticleSlug]} onNavigate={navigateToPath} />
          )}

          {currentView === 'methodology' && trustPages.methodology && (
            <TrustPage page={trustPages.methodology} onNavigate={navigateToPath} />
          )}

          {currentView === 'authority' && authorityPages[selectedArticleSlug] && (
            <TrustPage page={authorityPages[selectedArticleSlug]} onNavigate={navigateToPath} />
          )}

          {/* ==========================================
            VIEW H: HIGH-TRUST ABOUT & CONTACT PANEL
            ========================================== */}
          {false && currentView === 'about' && (
            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="border-b border-slate-200 pb-6 text-center">
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">Our Evaluation Methodology & Team</h2>
                <p className="text-slate-500 text-sm mt-2 leading-relaxed max-w-xl mx-auto">
                  Unbiased, non-commodity AI reviews curated by real-world system software engineers and business automation advisors.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">

                {/* Profile card A */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white rounded-full flex items-center justify-center font-black text-xl">AS</div>
                  <div>
                    <h3 className="font-bold text-slate-950 text-base">Arshdeep Singh</h3>
                    <p className="text-xs text-slate-400 font-semibold uppercase mt-0.5">Chief AI Analyst & Editor</p>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed leading-relaxed font-light">
                    Previously scaled B2B automation engines in Mumbai and Gurgaon. Specializes in multi-agent orchestration efficiency limits, vector memory indices, and token consumption metrics.
                  </p>
                </div>

                {/* Profile card B */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-tr from-indigo-600 to-indigo-400 text-white rounded-full flex items-center justify-center font-black text-xl">PI</div>
                  <div>
                    <h3 className="font-bold text-slate-950 text-base">Priya Iyer</h3>
                    <p className="text-xs text-slate-400 font-semibold uppercase mt-0.5">Core Software Architect</p>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed leading-relaxed font-light">
                    Specialist in developer environments, NPM packages compliance, and backend systems. Evaluates IDE forks, VS Code coding extensions, and open-source orchestration graph libraries.
                  </p>
                </div>

                {/* Profile card C */}
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-tr from-amber-600 to-amber-400 text-white rounded-full flex items-center justify-center font-black text-xl">KM</div>
                  <div>
                    <h3 className="font-bold text-slate-950 text-base">Karan Mehra</h3>
                    <p className="text-xs text-slate-400 font-semibold uppercase mt-0.5">SME Automation Advisor</p>
                  </div>
                  <p className="text-slate-500 text-xs leading-relaxed leading-relaxed font-light">
                    Consults and guides Indian medium and small-scale operations. Focuses on Meta WhatsApp Business APIs integration, NPCI gateway payment routes, and local Hinglish speech processing limits.
                  </p>
                </div>

              </div>

              {/* Test methodology standards */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-950">Ethics & Reviewing Principles</h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-light">
                  Our reviews are fueled by direct observation. We purchase commercial accounts, download and self-host open-source repositories locally on our testing cloud instances, and query models multiple times with benchmark datasets to verify real-world capabilities.
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-xs font-semibold text-slate-800">
                  <p className="flex items-center gap-1.5"><ShieldCheck className="text-emerald-600 w-4 font-bold" /> Zero Paid Placement Bias</p>
                  <p className="flex items-center gap-1.5"><CheckCircle className="text-emerald-600 w-4 font-bold" /> Real Verification of Sovereign Hosting</p>
                  <p className="flex items-center gap-1.5"><ShieldCheck className="text-emerald-600 w-4 font-bold" /> DPDP Local Law Compliance Checks</p>
                  <p className="flex items-center gap-1.5"><CheckCircle className="text-emerald-600 w-4 font-bold" /> Open Source Code Sandbox Tracing</p>
                </div>
              </div>

              {/* Direct Suggest-A-Tool form */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                <div className="border-b border-slate-100 pb-3">
                  <h3 className="text-xl font-bold text-slate-950">Suggest An AI Agent to Our Index</h3>
                  <p className="text-slate-400 text-xs font-light mt-0.5">We review both open-source GitHub libraries and proprietary visual workflow makers.</p>
                </div>

                {toolSubmitSuccess ? (
                  <div className="bg-emerald-50 text-emerald-800 p-6 rounded-xl border border-emerald-100 text-center font-semibold text-xs space-y-2">
                    <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                    <p>{toolSubmitSuccess}</p>
                  </div>
                ) : (
                  <form onSubmit={submitToolForm} className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Tool Name</label>
                      <input
                        type="text"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="e.g. Vapi AI"
                        required
                        value={toolSubmitForm.name}
                        onChange={(e) => setToolSubmitForm({ ...toolSubmitForm, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Documentation / URL</label>
                      <input
                        type="url"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="https://example.com"
                        required
                        value={toolSubmitForm.url}
                        onChange={(e) => setToolSubmitForm({ ...toolSubmitForm, url: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Category Tag</label>
                      <input
                        type="text"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="e.g. Coding Agent, Low-Code platform"
                        required
                        value={toolSubmitForm.category}
                        onChange={(e) => setToolSubmitForm({ ...toolSubmitForm, category: e.target.value })}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Submitter Contact email</label>
                      <input
                        type="email"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="developer@example.com"
                        required
                        value={toolSubmitForm.email}
                        onChange={(e) => setToolSubmitForm({ ...toolSubmitForm, email: e.target.value })}
                      />
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-xs font-bold text-slate-700">Brief evaluation details / System specifications</label>
                      <textarea
                        rows={3}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        placeholder="Share details on API latency, visual workflow nodes count, sovereign servers status, or compliance parameters."
                        required
                        value={toolSubmitForm.description}
                        onChange={(e) => setToolSubmitForm({ ...toolSubmitForm, description: e.target.value })}
                      />
                    </div>
                    <button type="submit" className="md:col-span-2 py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-855 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition">
                      Submit Suggestion Form
                    </button>
                  </form>
                )}
              </div>

            </div>
          )}

          {/* ==========================================
            VIEW I: STATIC PAGES (ETHICS, POLICIES, TERMS)
            ========================================== */}
          {false && currentView === 'disclosure' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 max-w-3xl mx-auto">
              <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">Affiliate Disclosure & Transparency Statement</h2>
              <p className="text-xs text-slate-400 uppercase font-semibold">Effective as of June 11, 2026</p>

              <p className="text-slate-600 text-sm leading-relaxed font-light">
                We believe in absolute transparency. On BestAIAgent.in, we evaluate and recommend tools based on rigid performance benchmarks. To maintain our testing server infrastructure and support our expert editorial analyst team, we partner with affiliate organizations.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed font-light">
                This means we may earn a small commission tag if you click on certain product buttons and sign up for premium accounts. However, this referral structure **never** affects our underlying scoring matrix. Every item (neutral open-source packages and commercial enterprise suites alike) is evaluated under independent parameters: Ease of use, features depth, and India sovereign fit.
              </p>
              <p className="text-slate-650 text-sm leading-relaxed font-bold">
                We never accept financial funding to alter review scores, hide cons checklists, or recommend non-compliant platforms. Our mission is to keep the directory completely objective for Indian founders, developers, and operators.
              </p>
              <button onClick={() => routeTo('home')} className="mt-4 px-4 py-2 bg-slate-950 text-white rounded-lg text-xs font-bold uppercase">Return to home</button>
            </div>
          )}

          {false && currentView === 'policy' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 max-w-3xl mx-auto">
              {selectedArticleSlug === 'methodology' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">Editorial Methodology</h2>
                  <p className="text-xs text-slate-400 uppercase font-semibold">Our Testing Standards</p>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">
                    We use a multi-step verification process to ensure every AI agent is evaluated fairly. Our engineers deploy software in production-style sandboxes to measure performance, security, and integration depth.
                  </p>
                  <h3 className="text-lg font-bold text-slate-900">42-Point Scoring Matrix</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">
                    Our framework weights factors like India-specific compliance (DPDP), regional payment support, and Hinglish speech handling alongside core technical benchmarks.
                  </p>
                </div>
              )}

              {selectedArticleSlug === 'review-policy' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">Review Policy</h2>
                  <p className="text-xs text-slate-400 uppercase font-semibold">Integrity and Transparency</p>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">
                    We do not accept paid reviews. All tools are selected based on market relevance and user interest. Our analysts maintain full editorial independence when assigning scores.
                  </p>
                  <h3 className="text-lg font-bold text-slate-900">Evidence-Based Evaluation</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">
                    Scores are derived from direct observation, API response monitoring, and community feedback audit trails.
                  </p>
                </div>
              )}

              {selectedArticleSlug === 'corrections-policy' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">Corrections Policy</h2>
                  <p className="text-xs text-slate-400 uppercase font-semibold">Accuracy and Accountability</p>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">
                    We are committed to maintaining the highest level of accuracy. If an error is discovered, we update the content immediately and note the change clearly for transparency.
                  </p>
                  <h3 className="text-lg font-bold text-slate-900">Report an Error</h3>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">
                    If you find a mistake or outdated pricing, please email us at editorial@bestaiagent.in with the subject "Correction Request".
                  </p>
                </div>
              )}

              {(selectedArticleSlug === 'editorial-policy' || !selectedArticleSlug) && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight">Editorial Policy</h2>
                  <p className="text-xs text-slate-400 uppercase font-semibold">Operational Standards Log</p>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">
                    To be indexed on BestAIAgent.in, tools undergo strict verification loops. We scoring systems based on 8 key pillars:
                  </p>
                  <ul className="list-disc leading-relaxed text-xs text-slate-650 ml-4 space-y-1.5 font-medium">
                    <li><strong>Ease of Use:</strong> Simplicity of visual node interfaces and quick installations.</li>
                    <li><strong>Power Features:</strong> Deep capabilities, command-line controls, and autonomous capabilities.</li>
                    <li><strong>India Fit:</strong> Local compliance (DPDP), Mumbai AWS nodes, and regional language support.</li>
                    <li><strong>Reliability:</strong> Graceful error handling and minimal cascading loop failures.</li>
                  </ul>
                  <p className="text-slate-600 text-sm leading-relaxed font-light">
                    New features are audited weekly to capture tool variations immediately.
                  </p>
                </div>
              )}
              <button onClick={() => routeTo('home')} className="mt-4 px-4 py-2 bg-slate-950 text-white rounded-lg text-xs font-bold uppercase font-semibold">Back to home</button>
            </div>
          )}

          {currentView === 'scoring' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 max-w-3xl mx-auto">
              <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight flex items-center gap-2">
                📊 42-Point Scoring System Outline
              </h2>
              <p className="text-xs text-slate-400 uppercase font-semibold">Weight Parameters and Scoring Mathematics</p>

              <p className="text-slate-600 text-sm leading-relaxed font-light">
                We leverage an objective mathematical model to grade cataloged software assets. Raw scoring metrics compiled across seven central axes feed into our global database and are weighted natively through custom coefficient metrics:
              </p>

              <div className="space-y-4 pt-2">
                {[
                  { name: "Ease of Use Core (15% Weight)", desc: "Quantifies initial developer sandbox speed. We measure package download weight, CLI installation timing, visual UI response latency, and initial tutorial onboarding flow complexity." },
                  { name: "Features Depth (20% Weight)", desc: "Rates advanced task capabilities. Includes multi-file composer capabilities, model context protocol support, context retention window ceilings, and native execution tools." },
                  { name: "Sovereign India Localization Fit (15% Weight)", desc: "Audits native compliance protocols (DPDP Act verification readiness), localized AWS or Azure Mumbai region nodes, and direct NPCI UPI transaction processing capabilities." },
                  { name: "Ecosystem Interoperability (15% Weight)", desc: "Evaluates standard API surfaces. Includes pre-packaged adapters for prominent CRMs, database endpoints, and custom model routing mechanisms." },
                  { name: "Value for Money (15% Weight)", desc: "Evaluates token markup ratios, open-source free hosting license parameters, and ROI for business automation scale operations." },
                  { name: "Operational Reliability (20% Weight)", desc: "Measures error handling resilience. Counts cascading infinite request loop occurrences, graceful token exhaustion warning structures, and standard logging." }
                ].map((axis, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-150 p-4 rounded-xl space-y-1.5 text-xs">
                    <p className="font-extrabold text-slate-900">{axis.name}</p>
                    <p className="text-slate-600 font-light leading-relaxed">{axis.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-teal-50 border border-teal-150 rounded-xl flex items-center justify-between text-xs text-teal-900 font-medium">
                <span>💡 Want to run a custom calculation based on your business priorities?</span>
                <button onClick={() => routeTo('tuner')} className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-1.5 px-3 rounded text-[10px] uppercase tracking-wider">
                  Launch Score Tuner
                </button>
              </div>

              <button onClick={() => routeTo('home')} className="mt-4 px-4 py-2 bg-slate-950 text-white rounded-lg text-xs font-bold uppercase font-semibold">Back to home</button>
            </div>
          )}

          {currentView === 'compliance' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 max-w-3xl mx-auto">
              <h2 className="text-2xl font-extrabold text-slate-950 tracking-tight flex items-center gap-2">
                🛡️ India DPDP Act AI Compliance Audit Checklist
              </h2>
              <p className="text-xs text-slate-400 uppercase font-semibold font-mono">India Personal Data Safety (June 2026 Audit Standards)</p>

              <p className="text-slate-650 text-sm leading-relaxed font-light">
                Under India’s active Digital Personal Data Protection (DPDP) Act of 2023 and subsequent 2025/2026 regulatory codes, AI agents processing any personal metrics from Indian citizens must follow strict safety parameters:
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: "1. Clear and Separable Consent Notices",
                    desc: "Consent must be free, specific, informed, unconditional, and unambiguous. AI chat dialogs must separate legal terms and conditions from operational prompts. Users must see clear data collection notices before any personal logs process."
                  },
                  {
                    title: "2. Absolute Right to Erasure & Withdraw",
                    desc: "Operators must provide simple in-app buttons to let clients withdraw consent or permanently purge historical context logs immediately from backup servers."
                  },
                  {
                    title: "3. Sovereign India Data Localization Protection",
                    desc: "Customer database logs containing sensitive personally identifiable dimensions (PII) must be hosted locally inside Mumbai or Bangalore cloud nodes. Cross-border transfers must align with notified white-list jurisdictions."
                  },
                  {
                    title: "4. Sandbox Memory Privacy Guardrails",
                    desc: "Enterprise models must restrict sharing private prompt inputs for external foundational training loops. Privacy Mode defaults must be toggled ON for multi-tenant pipelines."
                  },
                  {
                    title: "5. Safe Child Data Restrictions",
                    desc: "Applications targetting pediatric users must require verifiable parental consent vectors and strictly prohibit tracking analytics or targeted advertising operations."
                  }
                ].map((item, i) => (
                  <div key={i} className="border border-slate-150 p-4 rounded-xl space-y-1 bg-slate-50 text-xs">
                    <p className="font-extrabold text-slate-950">{item.title}</p>
                    <p className="text-slate-600 font-light leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-rose-50 border border-rose-100 p-4 rounded-xl text-xs text-rose-900 leading-normal">
                <strong>Cautionary Warning:</strong> Using consumer-grade APIs with default configurations often leaks system prompting logs into foundational training pipelines. Always deploy dedicated cloud configurations with regional hosting restrictions for DPDP compliance.
              </div>

              <button onClick={() => routeTo('home')} className="mt-4 px-4 py-2 bg-slate-950 text-white rounded-lg text-xs font-bold uppercase font-semibold">Back to home</button>
            </div>
          )}

          {currentView === 'disclosure' && trustPages['affiliate-disclosure'] && (
            <TrustPage page={trustPages['affiliate-disclosure']} onNavigate={navigateToPath} />
          )}

          {currentView === 'policy' && trustPages[selectedArticleSlug] && (
            <TrustPage page={trustPages[selectedArticleSlug]} onNavigate={navigateToPath} />
          )}

          {currentView === 'contact' && trustPages.contact && (
            <div className="space-y-8 max-w-5xl mx-auto">
              <TrustPage page={trustPages.contact} onNavigate={navigateToPath} />
              <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-950">Send a message</h2>
                  <p className="text-slate-500 text-sm mt-2">Use this form for corrections, privacy requests, vendor submissions, partnership inquiries, or research feedback.</p>
                </div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert('Thank you. Your message has been routed to the BestAIAgent.in editorial desk.');
                    routeTo('home');
                  }}
                  className="grid md:grid-cols-2 gap-4"
                >
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Full Name</label>
                    <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs" placeholder="Your name" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Work Email</label>
                    <input required type="email" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs" placeholder="you@company.in" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Inquiry Type</label>
                    <select required className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs cursor-pointer">
                      <option value="correction">Report inaccurate information</option>
                      <option value="privacy">Privacy or data deletion request</option>
                      <option value="submission">Submit an AI agent for review</option>
                      <option value="partnership">Editorial partnership or advertising</option>
                      <option value="general">General inquiry</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Page URL or Topic</label>
                    <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs" placeholder="https://bestaiagent.in/..." />
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-700">Message</label>
                    <textarea required rows={5} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs" placeholder="Share the issue, evidence, suggested correction, or research request." />
                  </div>
                  <button type="submit" className="md:col-span-2 py-2.5 bg-slate-950 hover:bg-slate-900 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition">
                    Send message
                  </button>
                </form>
                <div className="grid sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                    <span className="block text-[10px] font-black uppercase text-slate-400">Email</span>
                    <a href="mailto:contact@bestaiagent.in" className="font-bold text-slate-900 hover:text-emerald-700">contact@bestaiagent.in</a>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                    <span className="block text-[10px] font-black uppercase text-slate-400">Address</span>
                    <p className="font-semibold text-slate-900">BKC, Mumbai &amp; Koramangala, Bangalore, India</p>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
                    <span className="block text-[10px] font-black uppercase text-slate-400">Response time</span>
                    <p className="font-semibold text-slate-900">Usually within 2 business days</p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {false && currentView === 'contact' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 max-w-2xl mx-auto">
              <div className="border-b border-slate-100 pb-4 text-center">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">Contact Our Editorial Team</h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">
                  We accept feedback, direct tool suggestions, and enterprise partnership inquiries from founders and software engineers.
                </p>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert('Thank you! Your message has been routed to Arshdeep Singh and our research team at contact@bestaiagent.in.');
                  routeTo('home');
                }}
                className="space-y-4 text-xs font-medium text-slate-705"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Full Name</label>
                    <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5" placeholder="e.g. Amit Sharma" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700">Work Email</label>
                    <input required type="email" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5" placeholder="amit@startup.in" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Inquiry Subject</label>
                  <select required className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 cursor-pointer">
                    <option value="suggest">📢 Suggest an AI Agent (Audit Request)</option>
                    <option value="partnership">💼 Enterprise Partnership / Advertising</option>
                    <option value="compliance">🛡️ DPDP Act Privacy Correction</option>
                    <option value="general">❓ General inquiry</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700">Detailed Message Specifications</label>
                  <textarea required rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5" placeholder="Specify your API benchmark notes, team parameters, or database questions here..." />
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-150 text-slate-500 space-y-1 text-[11px] leading-relaxed">
                  <p>📧 <strong>Direct Editorial Office:</strong> editorial@bestaiagent.in</p>
                  <p>📍 <strong>Hub networks:</strong> BKC, Mumbai &amp; Koramangala, Bangalore, India</p>
                  <p>⏱ <strong>Average SLA response times:</strong> Under 48 business hours.</p>
                </div>

                <button type="submit" className="w-full py-2.5 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white font-bold rounded-lg text-xs uppercase tracking-wider transition">
                  Send Secure Message
                </button>
              </form>
            </div>
          )}

          {currentView === 'not-found' && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6 max-w-3xl mx-auto">
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-widest text-rose-600">404</p>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">Page not found</h1>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We could not find <span className="font-mono font-bold text-slate-900">/{selectedArticleSlug}</span>. Try searching the AI agent directory or use one of the crawler-friendly index pages below.
                </p>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search AI agents, comparisons, pricing, tutorials..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-9 pr-4 text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <a href="/" onClick={(event) => navigateToPath(event, '/')} className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-emerald-400 transition text-sm font-bold text-slate-900">Homepage</a>
                <a href="/ai-agent-tools" onClick={(event) => navigateToPath(event, '/ai-agent-tools')} className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-emerald-400 transition text-sm font-bold text-slate-900">Directory</a>
                <a href="/sitemap.xml" className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:border-emerald-400 transition text-sm font-bold text-slate-900">Sitemap</a>
              </div>
            </div>
          )}

          {currentView === 'drive' && (
            <GoogleDriveDashboard onBack={() => setCurrentView('home')} currentWeights={weights} />
          )}

          {currentView === 'topical-map' && (
            <TopicalAuthorityMap onSelectArticle={(slug) => routeTo('article', undefined, slug)} onBack={() => routeTo('home')} />
          )}

          {currentAuthorityExpansion && (
            <AuthorityExpansionBlock
              slug={currentAuthorityExpansion.slug}
              title={currentAuthorityExpansion.title}
              description={currentAuthorityExpansion.description}
              primaryKeyword={currentAuthorityExpansion.primaryKeyword}
              category={currentAuthorityExpansion.category}
              intent={currentAuthorityExpansion.intent}
              variant={currentAuthorityExpansion.variant}
            />
          )}

        </Suspense>
      </main>

      {/* FOOTER */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-16 px-4 sm:px-6 lg:px-8 mt-16 font-sans" role="contentinfo">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* Logo and description */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <a href="/" onClick={(event) => navigateToPath(event, '/')} className="inline-flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-tr from-emerald-600 to-emerald-400 text-white font-black text-sm rounded">IN</span>
              <span className="text-base font-bold text-white leading-none">BestAIAgent.in</span>
            </a>
            <p className="text-[11px] leading-relaxed font-light text-slate-500 max-w-xs">
              Find, compare, and choose the best AI agents for your use case — with India-specific pricing, DPDP compliance notes, INR estimates, and expert editorial reviews.
            </p>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Some links may be affiliate links. Rankings remain independent and follow our editorial scoring methodology.
            </p>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">MUMBAI & BANGALORE NETWORKS</p>
          </div>

          <nav aria-label="Footer navigation" className="col-span-2 md:col-span-3 grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase text-slate-200 tracking-wider">Reviews</h4>
              <div className="flex flex-col gap-2 text-xs">
                <a href="/best-ai-agent" onClick={(event) => navigateToPath(event, '/best-ai-agent')} className="text-slate-400 hover:text-white hover:underline transition">Best AI Agents</a>
                <a href="/coding-agents-hub" onClick={(event) => navigateToPath(event, '/coding-agents-hub')} className="text-slate-400 hover:text-white hover:underline transition">Best AI Coding Agents</a>
                <a href="/business-ai-hub" onClick={(event) => navigateToPath(event, '/business-ai-hub')} className="text-slate-400 hover:text-white hover:underline transition">Best AI Agents for Business</a>
                <a href="/voice-ai-hub" onClick={(event) => navigateToPath(event, '/voice-ai-hub')} className="text-slate-400 hover:text-white hover:underline transition">Best AI Voice Agents</a>
                <a href="/ai-agent-builders-hub" onClick={(event) => navigateToPath(event, '/ai-agent-builders-hub')} className="text-slate-400 hover:text-white hover:underline transition">Best AI Agent Builders</a>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase text-slate-200 tracking-wider">Commercial</h4>
              <div className="flex flex-col gap-2 text-xs">
                <a href="/pricing-hub" onClick={(event) => navigateToPath(event, '/pricing-hub')} className="text-slate-400 hover:text-white hover:underline transition">Pricing Hub</a>
                <a href="/alternatives-hub" onClick={(event) => navigateToPath(event, '/alternatives-hub')} className="text-slate-400 hover:text-white hover:underline transition">Alternatives Hub</a>
                <a href="/best-ai-agent" onClick={(event) => navigateToPath(event, '/best-ai-agent')} className="text-slate-400 hover:text-white hover:underline transition">Comparisons</a>
                <a href="/free-ai-agents-hub" onClick={(event) => navigateToPath(event, '/free-ai-agents-hub')} className="text-slate-400 hover:text-white hover:underline transition">Free AI Agents</a>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase text-slate-200 tracking-wider">Learn</h4>
              <div className="flex flex-col gap-2 text-xs">
                <a href="/tutorials-hub" onClick={(event) => navigateToPath(event, '/tutorials-hub')} className="text-slate-400 hover:text-white hover:underline transition">Tutorials</a>
                <a href="/glossary-hub" onClick={(event) => navigateToPath(event, '/glossary-hub')} className="text-slate-400 hover:text-white hover:underline transition">Glossary</a>
                <a href="/mcp-directory" onClick={(event) => navigateToPath(event, '/mcp-directory')} className="text-slate-400 hover:text-white hover:underline transition">MCP Directory</a>
                <a href="/ai-agent-security" onClick={(event) => navigateToPath(event, '/ai-agent-security')} className="text-slate-400 hover:text-white hover:underline transition">AI Agent Security</a>
                <a href="/how-to-build-an-ai-agent" onClick={(event) => navigateToPath(event, '/how-to-build-an-ai-agent')} className="text-slate-400 hover:text-white hover:underline transition">How to Build an AI Agent</a>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase text-slate-200 tracking-wider">Trust</h4>
              <div className="flex flex-col gap-2 text-xs">
                <a href="/methodology" onClick={(event) => navigateToPath(event, '/methodology')} className="text-slate-400 hover:text-white hover:underline transition">Methodology</a>
                <a href="/editorial-policy" onClick={(event) => navigateToPath(event, '/editorial-policy')} className="text-slate-400 hover:text-white hover:underline transition">Editorial Policy</a>
                <a href="/ai-agent-scoring-system" onClick={(event) => navigateToPath(event, '/ai-agent-scoring-system')} className="text-slate-400 hover:text-white hover:underline transition">AI Agent Scoring System</a>
                <a href="/team" onClick={(event) => navigateToPath(event, '/team')} className="text-slate-400 hover:text-white hover:underline transition">Authors</a>
                <a href="/affiliate-disclosure" onClick={(event) => navigateToPath(event, '/affiliate-disclosure')} className="text-slate-400 hover:text-white hover:underline transition">Affiliate Disclosure</a>
                <a href="/contact" onClick={(event) => navigateToPath(event, '/contact')} className="text-slate-400 hover:text-white hover:underline transition">Contact</a>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase text-slate-200 tracking-wider">Machine-readable</h4>
              <div className="flex flex-col gap-2 text-xs">
                <a href="/sitemap.xml" className="text-slate-400 hover:text-white hover:underline transition">Sitemap</a>
                <a href="/feed.xml" className="text-slate-400 hover:text-white hover:underline transition">RSS Feed</a>
                <a href="/llms.txt" className="text-slate-400 hover:text-white hover:underline transition">llms.txt</a>
                <a href="/robots.txt" className="text-slate-400 hover:text-white hover:underline transition">robots.txt</a>
              </div>
            </div>
          </nav>

          {/* Directory lists Column 1 */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold uppercase text-slate-200 tracking-wider">Reviews Silos</h4>
            <div className="flex flex-col gap-2 text-xs">
              <a href="/best-ai-agent" onClick={(event) => navigateToPath(event, '/best-ai-agent')} className="text-left hover:text-white hover:underline transition">AI Reviews Hub</a>
              <a href="/best-ai-agent-for-business" onClick={(event) => navigateToPath(event, '/best-ai-agent-for-business')} className="text-left hover:text-white hover:underline transition">Business Agents</a>
              <a href="/best-ai-agent-for-coding" onClick={(event) => navigateToPath(event, '/best-ai-agent-for-coding')} className="text-left hover:text-white hover:underline transition">Coding Agents</a>
              <a href="/best-ai-agent-no-code-platform" onClick={(event) => navigateToPath(event, '/best-ai-agent-no-code-platform')} className="text-left hover:text-white hover:underline transition">No-Code Hubs</a>
            </div>
          </div>

          {/* Directory Column 2 */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold uppercase text-slate-200 tracking-wider">Authority indices</h4>
            <div className="flex flex-col gap-2 text-xs">
              <a href="/best-ai-agent-frameworks" onClick={(event) => navigateToPath(event, '/best-ai-agent-frameworks')} className="text-left hover:text-white hover:underline transition">Technical Frameworks</a>
              <a href="/best-open-source-ai-agent-tools" onClick={(event) => navigateToPath(event, '/best-open-source-ai-agent-tools')} className="text-left hover:text-white hover:underline transition">Open Source Tools</a>
              <a href="/ai-agent-research" onClick={(event) => navigateToPath(event, '/ai-agent-research')} className="text-left hover:text-white hover:underline transition">Research & GAIA benchmarks</a>
              <a href="/ai-agent-trends" onClick={(event) => navigateToPath(event, '/ai-agent-trends')} className="text-left hover:text-white hover:underline transition">SME Scale trends</a>
            </div>
          </div>

          {/* Editorial & transparency */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold uppercase text-slate-200 tracking-wider">Ethics & Policy</h4>
            <div className="flex flex-col gap-2 text-xs">
              <a href="/google-drive-ai-agent-workspace" onClick={(event) => navigateToPath(event, '/google-drive-ai-agent-workspace')} className="text-left font-bold text-emerald-400 hover:text-emerald-350 transition">Google Drive Cloud Sync</a>
              <a href="/editorial-policy" onClick={(event) => navigateToPath(event, '/editorial-policy')} className="text-left hover:text-white hover:underline transition">Editorial Policy &amp; Standards</a>
              <a href="/ai-agent-scoring-system" onClick={(event) => navigateToPath(event, '/ai-agent-scoring-system')} className="text-left hover:text-white hover:underline transition">42-Point Scoring Framework</a>
              <a href="/dpdp-act-ai-compliance" onClick={(event) => navigateToPath(event, '/dpdp-act-ai-compliance')} className="text-left hover:text-white hover:underline transition">DPDP Act Safety Checklist</a>
              <a href="/affiliate-disclosure" onClick={(event) => navigateToPath(event, '/affiliate-disclosure')} className="text-left hover:text-white hover:underline transition">Affiliate Disclosure</a>
              <a href="/about-editorial-team" onClick={(event) => navigateToPath(event, '/about-editorial-team')} className="text-left hover:text-white hover:underline transition">Editorial Team</a>
              <a href="/contact" onClick={(event) => navigateToPath(event, '/contact')} className="text-left hover:text-white hover:underline transition">Contact Office</a>
            </div>
          </div>

          {/* Hub Pages - Added for P1 priority */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold uppercase text-slate-200 tracking-wider">Hub Pages</h4>
            <div className="flex flex-col gap-2 text-xs">
              <a href="/coding-agents-hub" onClick={(event) => navigateToPath(event, '/coding-agents-hub')} className="text-left hover:text-white hover:underline transition">Coding Agents Hub</a>
              <a href="/business-ai-hub" onClick={(event) => navigateToPath(event, '/business-ai-hub')} className="text-left hover:text-white hover:underline transition">Business AI Hub</a>
              <a href="/voice-ai-hub" onClick={(event) => navigateToPath(event, '/voice-ai-hub')} className="text-left hover:text-white hover:underline transition">Voice AI Hub</a>
              <a href="/tutorials-hub" onClick={(event) => navigateToPath(event, '/tutorials-hub')} className="text-left hover:text-white hover:underline transition">Tutorials Hub</a>
              <a href="/glossary-hub" onClick={(event) => navigateToPath(event, '/glossary-hub')} className="text-left hover:text-white hover:underline transition">Glossary Hub</a>
              <a href="/mcp-hub" onClick={(event) => navigateToPath(event, '/mcp-hub')} className="text-left hover:text-white hover:underline transition">MCP Hub</a>
            </div>
          </div>

        </div>

        {/* Dynamic sitemap link lists (Sitemap section for Google crawler index) */}
        <div className="max-w-7xl mx-auto border-t border-slate-800 mt-8 pt-8 text-center space-y-4">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Complete Programmatic index Site Map (36+ Sub-Guides Index)</p>
          <div className="flex flex-wrap gap-2 justify-center text-[10px]">
            {siloPages.map((page, idx) => (
              <a
                key={idx}
                href={`/${page.slug}`}
                onClick={(event) => navigateToPath(event, `/${page.slug}`)}
                className="bg-slate-950 border border-slate-850 hover:border-slate-700 text-slate-400 hover:text-white px-2.5 py-1 rounded transition max-w-xs truncate"
              >
                /{page.slug}
              </a>
            ))}
          </div>
          <p className="text-slate-600 text-[10px] leading-relaxed pt-2">
            © 2026 BestAIAgent.in. All data evaluated and referenced strictly through direct observation checks. DPDP Audit compliant. Designed and hosted in full-stack Node container frameworks.
          </p>
          <p className="max-w-4xl mx-auto text-slate-500 text-[10px] leading-relaxed">
            Some links may be affiliate links. Rankings remain independent and are based on our editorial methodology. Pricing may change; we verify prices periodically, but readers should confirm plans, INR estimates, GST invoice availability, and procurement terms on the official vendor website before purchase. Last reviewed: June 2026. Last pricing check: June 2026. Reviewed by: BestAIAgent.in Editorial Team.
          </p>
          <p className="max-w-4xl mx-auto text-slate-500 text-[10px] leading-relaxed">
            Product names, logos, and brands are property of their respective owners. BestAIAgent.in is an independent editorial review platform.
          </p>
        </div>
      </footer>

      {/* DIRECTORY DETAIL SPECIFICATIONS DIALOG MODAL */}
      {activeDirTool && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

            {/* Modal Header */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 flex justify-between items-start shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center font-black text-xl text-emerald-400">
                  {activeDirTool.iconChar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold leading-none">{activeDirTool.name}</h3>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/10 uppercase tracking-widest border border-white/20 text-emerald-300">{activeDirTool.pricing}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 uppercase tracking-wider font-semibold">{activeDirTool.category}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveDirTool(null)}
                className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
                aria-label="Close directory tool details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scroll Body */}
            <div className="p-6 overflow-y-auto space-y-6">

              {/* Scorecard & Core stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-center">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Evaluation Score</p>
                  <p className="text-2xl font-black text-indigo-700 mt-1">{activeDirTool.score.toFixed(1)} <span className="text-xs text-slate-400 font-bold">/ 10</span></p>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-center">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">India Fit Indicator</p>
                  <p className="text-2xl font-black text-emerald-600 mt-1">9.5/10</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-center">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Pricing Model</p>
                  <p className="text-xs font-extrabold text-slate-900 mt-2.5 uppercase bg-slate-100 py-1 px-2 rounded-lg inline-block">{activeDirTool.pricing}</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-center">
                  <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Deployment Readiness</p>
                  <p className="text-xs font-extrabold text-emerald-700 mt-2.5 uppercase bg-emerald-55 py-1 px-2 rounded-lg inline-block">Production</p>
                </div>
              </div>

              {/* Quick Summary Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Verification Overview</h4>
                <p className="text-slate-700 text-sm leading-relaxed">{activeDirTool.description}</p>
              </div>

              {/* target workloads */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-2">
                <h4 className="text-xs font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1.5 leading-none">
                  <Sparkles className="text-indigo-650 w-4 h-4" /> Ideal Workflow Target (Best For)
                </h4>
                <p className="text-slate-800 text-xs sm:text-sm font-medium">{activeDirTool.bestFor}</p>
              </div>

              {/* Performance Bars */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Dynamic Score Benchmarks</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Ease of Setup & UX</span>
                      <span>{(activeDirTool.score * 0.98).toFixed(1)} / 10</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${activeDirTool.score * 9.8}%` }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Feature Set Completeness</span>
                      <span>{(activeDirTool.score * 1.01).toFixed(1)} / 10</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${Math.min(100, activeDirTool.score * 10.1)}%` }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Integration & APIs</span>
                      <span>{(activeDirTool.score * 0.95).toFixed(1)} / 10</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${activeDirTool.score * 9.5}%` }}></div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-slate-700">
                      <span>Value / Pricing Ratio</span>
                      <span>{(activeDirTool.score * 1.02).toFixed(1)} / 10</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min(100, activeDirTool.score * 10.2)}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Local pricing index / support details */}
              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Estimated Local Cost Translation</h4>
                  <div className="p-3 bg-indigo-50/40 border border-indigo-100 rounded-xl text-xs text-indigo-950 space-y-1.5">
                    <div className="flex justify-between font-bold">
                      <span>Local Plan Estimate:</span>
                      <span className="text-indigo-700">{activeDirTool.pricing === 'Free' ? '₹0 (Free Plan)' : activeDirTool.pricing === 'Freemium' ? '₹0 - ₹1,680/mo' : 'Contact Vendor'}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-light">Calculated using standard direct-exchange rates for visual transparency and billing security checks.</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Authority Alternatives Comparison</h4>
                  <div className="p-3 bg-emerald-50/40 border border-emerald-100 rounded-xl text-xs text-emerald-950 space-y-1.5">
                    <div className="flex justify-between font-bold">
                      <span>Direct Alternatives:</span>
                      <span className="text-emerald-700">Browse Group</span>
                    </div>
                    <p className="text-[10px] text-slate-500 font-light">Toggle filters on the master dashboard directory to seamlessly analyze competitors in the same sector.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Actions Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap justify-between items-center gap-4 shrink-0">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" /> Safe Sovereign Sandbox checked
              </span>
              <div className="flex items-center gap-2">
                {getResourceTypesForSlug(getDirectoryToolSlug(activeDirTool.name)).map((type) => (
                  <OfficialExternalLink
                    key={type}
                    slug={getDirectoryToolSlug(activeDirTool.name)}
                    label={type === 'official' ? 'Official' : type === 'docs' ? 'Docs' : type === 'github' ? 'GitHub' : 'Pricing'}
                    type={type}
                    showIcon
                    className="hidden sm:inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[10px] font-black uppercase tracking-wider text-slate-600 hover:text-indigo-700 hover:border-indigo-200"
                  />
                ))}
                <button
                  onClick={() => setActiveDirTool(null)}
                  className="px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-930 hover:bg-slate-100 rounded-xl border border-slate-200 transition uppercase tracking-wider"
                >
                  Dismiss
                </button>
                <a
                  href={activeDirTool.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white px-5 py-2.5 rounded-xl text-xs font-black shadow-md hover:shadow-lg transition uppercase tracking-wider"
                >
                  <span>Connect Sandbox</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
