export interface ToolAsset {
    slug: string;
    name: string;
    logo: string;
    logoAlt: string;
    brandColor?: string;
    screenshot?: string;
    screenshotAlt?: string;
    ogImage?: string;
}

export interface CategoryAsset {
    slug: string;
    name: string;
    icon: string;
    iconAlt: string;
    ogImage?: string;
}

const titleize = (slug: string) =>
    slug
        .replace(/-ai$/i, ' AI')
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (letter) => letter.toUpperCase());

const tool = (
    slug: string,
    name: string,
    logoSlug = slug,
    screenshotSlug = slug,
    brandColor = '#0f766e',
): ToolAsset => ({
    slug,
    name,
    logo: `/assets/tools/${logoSlug}.svg`,
    logoAlt: `${name} neutral brand tile for independent review on BestAIAgent.in`,
    brandColor,
    screenshot: `/assets/screenshots/${screenshotSlug}.png`,
    screenshotAlt: `${name} illustrative AI agent workspace preview on BestAIAgent.in`,
    ogImage: `/assets/og/${slug}.png`,
});

const toolList: ToolAsset[] = [
    tool('cursor-ai', 'Cursor AI', 'cursor-ai', 'cursor-ai-workspace', '#047857'),
    tool('github-copilot', 'GitHub Copilot', 'github-copilot', 'github-copilot-vscode', '#24292f'),
    tool('claude-code', 'Claude Code', 'claude-code', 'claude-code-terminal', '#7c3aed'),
    tool('windsurf', 'Windsurf', 'windsurf', 'windsurf-editor', '#2563eb'),
    tool('replit-agent', 'Replit Agent', 'replit-agent', 'replit-agent-workspace', '#f97316'),
    tool('replit-ai', 'Replit AI', 'replit-ai', 'replit-agent-workspace', '#f97316'),
    tool('codex', 'Codex', 'codex', 'placeholder-workflow', '#111827'),
    tool('openai-codex', 'OpenAI Codex', 'openai-codex', 'placeholder-workflow', '#111827'),
    tool('qodo', 'Qodo', 'qodo', 'placeholder-workflow', '#0891b2'),
    tool('yellow-ai', 'Yellow.ai', 'yellow-ai', 'yellow-ai-builder', '#ca8a04'),
    tool('intercom-ai', 'Intercom AI', 'intercom-ai', 'placeholder-workflow', '#2563eb'),
    tool('intercom', 'Intercom', 'intercom', 'placeholder-workflow', '#2563eb'),
    tool('zendesk-ai', 'Zendesk AI', 'zendesk-ai', 'placeholder-workflow', '#0f766e'),
    tool('zendesk', 'Zendesk', 'zendesk', 'placeholder-workflow', '#0f766e'),
    tool('freshdesk-ai', 'Freshdesk AI', 'freshdesk-ai', 'placeholder-workflow', '#0284c7'),
    tool('freshdesk', 'Freshdesk', 'freshdesk', 'placeholder-workflow', '#0284c7'),
    tool('clay', 'Clay', 'clay', 'placeholder-workflow', '#a16207'),
    tool('apollo', 'Apollo', 'apollo', 'placeholder-workflow', '#4f46e5'),
    tool('artisan', 'Artisan', 'artisan', 'placeholder-workflow', '#be123c'),
    tool('lindy', 'Lindy', 'lindy', 'placeholder-workflow', '#9333ea'),
    tool('flowise', 'Flowise', 'flowise', 'flowise-builder-canvas', '#059669'),
    tool('dify', 'Dify', 'dify', 'dify-agent-builder', '#4f46e5'),
    tool('n8n', 'n8n', 'n8n', 'n8n-workflow-builder', '#dc2626'),
    tool('langflow', 'Langflow', 'langflow', 'placeholder-workflow', '#7c3aed'),
    tool('crewai', 'CrewAI', 'crewai', 'crewai-workflow', '#0f766e'),
    tool('langgraph', 'LangGraph', 'langgraph', 'placeholder-workflow', '#1d4ed8'),
    tool('autogen', 'AutoGen', 'autogen', 'placeholder-workflow', '#0e7490'),
    tool('openai-agents-sdk', 'OpenAI Agents SDK', 'openai-agents-sdk', 'placeholder-workflow', '#111827'),
    tool('semantic-kernel', 'Semantic Kernel', 'semantic-kernel', 'placeholder-workflow', '#7c3aed'),
    tool('llamaindex', 'LlamaIndex', 'llamaindex', 'placeholder-workflow', '#4338ca'),
    tool('vapi', 'Vapi', 'vapi', 'vapi-dashboard', '#4f46e5'),
    tool('vapi-ai', 'Vapi AI', 'vapi', 'vapi-dashboard', '#4f46e5'),
    tool('retell', 'Retell', 'retell', 'retell-dashboard', '#0891b2'),
    tool('retell-ai', 'Retell AI', 'retell', 'retell-dashboard', '#0891b2'),
    tool('bland', 'Bland', 'bland', 'placeholder-workflow', '#475569'),
    tool('bland-ai', 'Bland.ai', 'bland-ai', 'placeholder-workflow', '#475569'),
    tool('elevenlabs', 'ElevenLabs', 'elevenlabs', 'placeholder-workflow', '#111827'),
    tool('agentops', 'AgentOps', 'agentops', 'placeholder-workflow', '#2563eb'),
    tool('open-interpreter', 'Open Interpreter', 'open-interpreter', 'placeholder-workflow', '#0f172a'),
    tool('superagent', 'Superagent', 'superagent', 'placeholder-workflow', '#7c2d12'),
];

export const toolAssets: Record<string, ToolAsset> = Object.fromEntries(
    toolList.map((asset) => [asset.slug, asset]),
);

const category = (slug: string, name: string, iconSlug = slug, ogSlug = slug): CategoryAsset => ({
    slug,
    name,
    icon: `/assets/categories/${iconSlug}.svg`,
    iconAlt: `${name} category icon for BestAIAgent.in hub pages`,
    ogImage: `/assets/og/${ogSlug}.png`,
});

export const categoryAssets: Record<string, CategoryAsset> = {
    'coding-agents': category('coding-agents', 'Coding AI Agents', 'coding-agents', 'coding-agents-hub'),
    'business-ai': category('business-ai', 'Business AI Agents', 'business-ai', 'business-ai-hub'),
    business: category('business', 'Business AI Agents', 'business-ai', 'business-ai-hub'),
    'voice-ai': category('voice-ai', 'Voice AI Agents', 'voice-ai', 'voice-ai-hub'),
    builders: category('builders', 'AI Agent Builders', 'agent-builders', 'ai-agent-builders-hub'),
    frameworks: category('frameworks', 'Open Source Agent Frameworks', 'open-source', 'ai-agent-builders-hub'),
    mcp: category('mcp', 'Model Context Protocol', 'mcp', 'mcp-hub'),
    pricing: category('pricing', 'AI Agent Pricing', 'pricing', 'pricing-hub'),
    alternatives: category('alternatives', 'AI Agent Alternatives', 'alternatives', 'alternatives-hub'),
    tutorials: category('tutorials', 'AI Agent Tutorials', 'tutorials', 'tutorials-hub'),
    glossary: category('glossary', 'AI Agent Glossary', 'glossary', 'glossary-hub'),
    security: category('security', 'AI Agent Security', 'security', 'mcp-hub'),
    free: category('free', 'Free AI Agents', 'free-ai', 'free-ai-agents-hub'),
    reviews: category('reviews', 'Best AI Agent Reviews', 'pricing', 'best-ai-agent'),
    'open-source': category('open-source', 'Open Source AI Agents', 'open-source', 'ai-agent-builders-hub'),
};

export const defaultAsset = {
    logo: '/assets/brand/logo-mark.svg',
    logoAlt: 'BestAIAgent.in neutral brand mark',
    ogImage: '/assets/brand/og-default.png',
    ogImageAlt: 'BestAIAgent.in independent AI agent authority preview image',
    screenshot: '/assets/screenshots/placeholder-workflow.png',
    screenshotAlt: 'Illustrative AI agent workflow preview on BestAIAgent.in',
};

export function getToolAsset(slug: string): ToolAsset {
    const asset = toolAssets[slug];
    if (asset) return asset;

    const name = titleize(slug);
    return {
        slug,
        name,
        logo: `/assets/tools/${slug}.svg`,
        logoAlt: `${name} neutral brand tile on BestAIAgent.in`,
        screenshot: defaultAsset.screenshot,
        screenshotAlt: defaultAsset.screenshotAlt,
        ogImage: defaultAsset.ogImage,
    };
}

export function getCategoryAsset(slug: string): CategoryAsset {
    const asset = categoryAssets[slug];
    if (asset) return asset;

    const name = titleize(slug);
    return {
        slug,
        name,
        icon: `/assets/categories/${slug}.svg`,
        iconAlt: `${name} category icon on BestAIAgent.in`,
        ogImage: defaultAsset.ogImage,
    };
}

export function getPageOgImage(slug: string, type: 'tool' | 'category' | 'comparison' | 'home' = 'home'): { url: string; alt: string } {
    if (type === 'tool') {
        const asset = getToolAsset(slug);
        return { url: asset.ogImage || defaultAsset.ogImage, alt: `${asset.name} review preview image on BestAIAgent.in` };
    }
    if (type === 'category') {
        const asset = getCategoryAsset(slug);
        return { url: asset.ogImage || defaultAsset.ogImage, alt: asset.iconAlt };
    }
    if (type === 'comparison') {
        return {
            url: `/assets/comparisons/${slug}.png`,
            alt: `${slug.replace(/-vs-/g, ' vs ').replace(/-/g, ' ')} comparison preview on BestAIAgent.in`,
        };
    }
    return { url: '/assets/og/home.png', alt: "BestAIAgent.in AI agent category dashboard preview" };
}
