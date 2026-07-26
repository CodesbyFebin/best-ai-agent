export type Comparison = FeaturedComparison;

export interface FeaturedComparison {
  pairSlug: string;
  title: string;
  itemA: {
    name: string;
    slug: string;
    logo: string;
    score: number;
  };
  itemB: {
    name: string;
    slug: string;
    logo: string;
    score: number;
  };
  winnerByUseCase: {
    useCase: string;
    winnerName: string;
    reason: string;
  };
  pricingDifference: string;
  verdict: string;
  lastUpdated: string;
  urlPath: string;
}

export const featuredComparisons: FeaturedComparison[] = [
  {
    pairSlug: "chatgpt-vs-claude",
    title: "ChatGPT-4o vs Claude 3.5 Sonnet",
    itemA: {
      name: "ChatGPT",
      slug: "chatgpt",
      logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
      score: 9.5
    },
    itemB: {
      name: "Claude",
      slug: "claude",
      logo: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=120&q=80",
      score: 9.6
    },
    winnerByUseCase: {
      useCase: "Coding & Document Analysis",
      winnerName: "Claude 3.5 Sonnet",
      reason: "Superior code accuracy and artifact generation with native Computer Use mode."
    },
    pricingDifference: "Both $20/mo ($1,999/mo in India); Claude has lower API output token costs.",
    verdict: "Claude 3.5 wins for deep software engineering and document parsing; ChatGPT wins for custom GPT web tools and multi-modal voice.",
    lastUpdated: "2026-07-22",
    urlPath: "/compare/chatgpt-vs-claude/"
  },
  {
    pairSlug: "cursor-vs-copilot",
    title: "Cursor AI vs GitHub Copilot Workspace",
    itemA: {
      name: "Cursor AI",
      slug: "cursor-ai",
      logo: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=120&q=80",
      score: 9.7
    },
    itemB: {
      name: "GitHub Copilot",
      slug: "copilot",
      logo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80",
      score: 8.9
    },
    winnerByUseCase: {
      useCase: "Multi-file Codebase Editing",
      winnerName: "Cursor AI",
      reason: "Agent Mode auto-indexes full workspace AST and runs terminal error loops."
    },
    pricingDifference: "Cursor Pro $20/mo; Copilot Individual $10/mo.",
    verdict: "Cursor AI offers far superior multi-file reasoning and terminal execution for professional developers.",
    lastUpdated: "2026-07-21",
    urlPath: "/compare/cursor-vs-copilot/"
  },
  {
    pairSlug: "crewai-vs-autogen",
    title: "CrewAI vs Microsoft AutoGen",
    itemA: {
      name: "CrewAI",
      slug: "crewai",
      logo: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=120&q=80",
      score: 9.4
    },
    itemB: {
      name: "AutoGen",
      slug: "autogen",
      logo: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=120&q=80",
      score: 9.1
    },
    winnerByUseCase: {
      useCase: "Ease of Role-based Agent Setup",
      winnerName: "CrewAI",
      reason: "Cleaner Python decorator syntax and intuitive task delegation abstractions."
    },
    pricingDifference: "Both 100% open-source libraries.",
    verdict: "CrewAI is faster to prototype role-based agent teams; AutoGen offers deeper conversational matrix customization.",
    lastUpdated: "2026-07-20",
    urlPath: "/compare/crewai-vs-autogen/"
  },
  {
    pairSlug: "claude-vs-gemini",
    title: "Claude 3.5 vs Google Gemini 1.5 Pro",
    itemA: {
      name: "Claude 3.5",
      slug: "claude",
      logo: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=120&q=80",
      score: 9.6
    },
    itemB: {
      name: "Gemini 1.5",
      slug: "gemini",
      logo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80",
      score: 9.3
    },
    winnerByUseCase: {
      useCase: "2 Million Token Long-Context Search",
      winnerName: "Gemini 1.5 Pro",
      reason: "Unmatched 2M token context window and native Google Workspace grounding."
    },
    pricingDifference: "Both offer $20/mo premium subscriptions.",
    verdict: "Gemini excels for massive video/audio/PDF context analysis; Claude wins for code generation and logic precision.",
    lastUpdated: "2026-07-19",
    urlPath: "/compare/claude-vs-gemini/"
  }
];
