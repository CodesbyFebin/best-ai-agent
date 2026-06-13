export type ExternalLinkType =
  | "official"
  | "docs"
  | "github"
  | "pricing"
  | "changelog"
  | "research"
  | "company"
  | "marketplace"
  | "community";

export interface ExternalLink {
  label: string;
  url: string;
  type: ExternalLinkType;
  rel?: string;
  verified?: boolean;
  lastChecked?: string;
  sponsored?: boolean;
  note?: string;
}

// External link registry - authoritative sources for all tools mentioned
export const externalLinks: Record<string, ExternalLink[]> = {
  // Official products/sites
  "cursor": [
    { label: "Cursor", url: "https://cursor.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Cursor Documentation", url: "https://docs.cursor.com", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "cursor-ai": [
    { label: "Cursor", url: "https://cursor.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Cursor Documentation", url: "https://docs.cursor.com", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "github-copilot": [
    { label: "GitHub Copilot", url: "https://github.com/features/copilot", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Copilot Documentation", url: "https://docs.github.com/en/codespaces/setting-your-user-preferences-for-github-copilot", type: "docs", verified: true, lastChecked: "2026-06-12" },
    { label: "Copilot GitHub", url: "https://github.com/marketplace/github-copilot", type: "github", verified: true, lastChecked: "2026-06-12" },
  ],
  "claude": [
    { label: "Claude", url: "https://claude.ai", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Anthropic", url: "https://www.anthropic.com", type: "company", verified: true, lastChecked: "2026-06-12" },
  ],
  "claude-code": [
    { label: "Claude Code", url: "https://github.com/anthropics/claude-code", type: "github", verified: true, lastChecked: "2026-06-12" },
    { label: "Claude Code Documentation", url: "https://docs.anthropic.com/en/docs/claude-code", type: "docs", verified: true, lastChecked: "2026-06-12" },
    { label: "Anthropic", url: "https://www.anthropic.com", type: "company", verified: true, lastChecked: "2026-06-12" },
  ],
  "openai": [
    { label: "OpenAI", url: "https://openai.com", type: "company", verified: true, lastChecked: "2026-06-12" },
    { label: "ChatGPT", url: "https://chat.openai.com", type: "official", verified: true, lastChecked: "2026-06-12" },
  ],
  "chatgpt": [
    { label: "ChatGPT", url: "https://chatgpt.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "OpenAI", url: "https://openai.com", type: "company", verified: true, lastChecked: "2026-06-12" },
  ],
  "anthropic": [
    { label: "Anthropic", url: "https://www.anthropic.com", type: "company", verified: true, lastChecked: "2026-06-12" },
    { label: "Anthropic Documentation", url: "https://docs.anthropic.com", type: "docs", verified: true, lastChecked: "2026-06-12" },
    { label: "Claude", url: "https://claude.ai", type: "official", verified: true, lastChecked: "2026-06-12" },
  ],
  "google": [
    { label: "Google AI", url: "https://ai.google", type: "company", verified: true, lastChecked: "2026-06-12" },
    { label: "Google Gemini", url: "https://gemini.google.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Google AI Studio", url: "https://aistudio.google.com", type: "official", verified: true, lastChecked: "2026-06-12" },
  ],
  "microsoft": [
    { label: "Microsoft AI", url: "https://www.microsoft.com/ai", type: "company", verified: true, lastChecked: "2026-06-12" },
    { label: "GitHub Copilot", url: "https://github.com/features/copilot", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Microsoft AutoGen", url: "https://microsoft.github.io/autogen", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "microsoft-copilot-studio": [
    { label: "Microsoft Copilot Studio", url: "https://www.microsoft.com/microsoft-copilot/microsoft-copilot-studio", type: "official", verified: false, lastChecked: "2026-06-12", note: "verify before publishing" },
    { label: "Copilot Studio Documentation", url: "https://learn.microsoft.com/microsoft-copilot-studio", type: "docs", verified: false, lastChecked: "2026-06-12", note: "verify before publishing" },
  ],
  "openai-agents-sdk": [
    { label: "OpenAI Agents SDK", url: "https://github.com/openai/openai-agents-python", type: "github", verified: true, lastChecked: "2026-06-12" },
    { label: "OpenAI Agents Documentation", url: "https://platform.openai.com/docs/guides/agents", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "gemini": [
    { label: "Google Gemini", url: "https://gemini.google.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Google AI Studio", url: "https://aistudio.google.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Google AI", url: "https://ai.google", type: "company", verified: true, lastChecked: "2026-06-12" },
  ],
  "vapi": [
    { label: "Vapi", url: "https://vapi.ai", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Vapi Documentation", url: "https://docs.vapi.ai", type: "docs", verified: true, lastChecked: "2026-06-12" },
    { label: "Vapi GitHub", url: "https://github.com/VapiAI", type: "github", verified: true, lastChecked: "2026-06-12" },
    { label: "Vapi Pricing", url: "https://vapi.ai/pricing", type: "pricing", verified: true, lastChecked: "2026-06-12" },
  ],
  "vapi-ai": [
    { label: "Vapi", url: "https://vapi.ai", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Vapi Documentation", url: "https://docs.vapi.ai", type: "docs", verified: true, lastChecked: "2026-06-12" },
    { label: "Vapi Pricing", url: "https://vapi.ai/pricing", type: "pricing", verified: true, lastChecked: "2026-06-12" },
  ],
  "retell": [
    { label: "Retell AI", url: "https://retell.ai", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Retell Documentation", url: "https://docs.retell.ai", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "retell-ai": [
    { label: "Retell AI", url: "https://retell.ai", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Retell Documentation", url: "https://docs.retell.ai", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "elevenlabs": [
    { label: "ElevenLabs", url: "https://elevenlabs.io", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "ElevenLabs Documentation", url: "https://elevenlabs.io/docs", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "yellow-ai": [
    { label: "Yellow.ai", url: "https://yellow.ai", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Yellow.ai Documentation", url: "https://docs.yellow.ai", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "intercom": [
    { label: "Intercom", url: "https://intercom.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Intercom Help Center", url: "https://www.intercom.com/help", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "intercom-fin": [
    { label: "Intercom Fin", url: "https://intercom.com/fin", type: "official", verified: true, lastChecked: "2026-06-12" },
  ],
  "voiceflow": [
    { label: "Voiceflow", url: "https://voiceflow.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Voiceflow Documentation", url: "https://docs.voiceflow.com", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "botpress": [
    { label: "Botpress", url: "https://botpress.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Botpress Documentation", url: "https://botpress.com/docs", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "rasa": [
    { label: "Rasa", url: "https://rasa.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Rasa GitHub", url: "https://github.com/RasaHQ/rasa", type: "github", verified: true, lastChecked: "2026-06-12" },
    { label: "Rasa Documentation", url: "https://rasa.com/docs", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "zendesk-ai": [
    { label: "Zendesk AI", url: "https://zendesk.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Zendesk Documentation", url: "https://support.zendesk.com", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "freshdesk": [
    { label: "Freshdesk", url: "https://freshdesk.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Freshdesk Documentation", url: "https://support.freshdesk.com", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "crewai": [
    { label: "CrewAI", url: "https://crewai.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "CrewAI GitHub", url: "https://github.com/crewAIInc/crewAI", type: "github", verified: true, lastChecked: "2026-06-12" },
    { label: "CrewAI Documentation", url: "https://docs.crewai.com", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "langgraph": [
    { label: "LangGraph", url: "https://langgraph.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "LangGraph GitHub", url: "https://github.com/langchain-ai/langgraph", type: "github", verified: true, lastChecked: "2026-06-12" },
    { label: "LangGraph Documentation", url: "https://langchain-ai.github.io/langgraph", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "autogen": [
    { label: "AutoGen", url: "https://microsoft.github.io/autogen", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "AutoGen GitHub", url: "https://github.com/microsoft/autogen", type: "github", verified: true, lastChecked: "2026-06-12" },
  ],
  "semantic-kernel": [
    { label: "Semantic Kernel", url: "https://aka.ms/skdiscord", type: "community", verified: true, lastChecked: "2026-06-12" },
    { label: "Semantic Kernel GitHub", url: "https://github.com/microsoft/semantic-kernel", type: "github", verified: true, lastChecked: "2026-06-12" },
    { label: "Semantic Kernel Documentation", url: "https://learn.microsoft.com/semantic-kernel", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "llamaindex": [
    { label: "LlamaIndex", url: "https://llamaindex.ai", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "LlamaIndex GitHub", url: "https://github.com/run-llama/llama_index", type: "github", verified: true, lastChecked: "2026-06-12" },
    { label: "LlamaIndex Documentation", url: "https://docs.llamaindex.ai", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "flowise": [
    { label: "Flowise", url: "https://flowiseai.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Flowise GitHub", url: "https://github.com/FlowiseAI/Flowise", type: "github", verified: true, lastChecked: "2026-06-12" },
    { label: "Flowise Documentation", url: "https://docs.flowiseai.com", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "dify": [
    { label: "Dify", url: "https://dify.ai", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Dify GitHub", url: "https://github.com/langgenius/dify", type: "github", verified: true, lastChecked: "2026-06-12" },
    { label: "Dify Documentation", url: "https://docs.dify.ai", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "n8n": [
    { label: "n8n", url: "https://n8n.io", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "n8n GitHub", url: "https://github.com/n8n-io/n8n", type: "github", verified: true, lastChecked: "2026-06-12" },
    { label: "n8n Documentation", url: "https://docs.n8n.io", type: "docs", verified: true, lastChecked: "2026-06-12" },
    { label: "n8n Pricing", url: "https://n8n.io/pricing", type: "pricing", verified: true, lastChecked: "2026-06-12" },
  ],
  "langchain": [
    { label: "LangChain", url: "https://langchain.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "LangChain GitHub", url: "https://github.com/langchain-ai/langchain", type: "github", verified: true, lastChecked: "2026-06-12" },
    { label: "LangChain Documentation", url: "https://python.langchain.com", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "pydantic-ai": [
    { label: "Pydantic AI", url: "https://ai.pydantic.dev", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Pydantic AI GitHub", url: "https://github.com/pydantic/pydantic-ai", type: "github", verified: true, lastChecked: "2026-06-12" },
  ],
  "pinecone": [
    { label: "Pinecone", url: "https://pinecone.io", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Pinecone Documentation", url: "https://docs.pinecone.io", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "weaviate": [
    { label: "Weaviate", url: "https://weaviate.io", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Weaviate GitHub", url: "https://github.com/semi-technologies/weaviate", type: "github", verified: true, lastChecked: "2026-06-12" },
  ],
  "qdrant": [
    { label: "Qdrant", url: "https://qdrant.tech", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Qdrant GitHub", url: "https://github.com/qdrant/qdrant", type: "github", verified: true, lastChecked: "2026-06-12" },
    { label: "Qdrant Documentation", url: "https://qdrant.tech/documentation", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "chroma": [
    { label: "Chroma", url: "https://trychroma.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Chroma GitHub", url: "https://github.com/chroma-core/chroma", type: "github", verified: true, lastChecked: "2026-06-12" },
    { label: "Chroma Documentation", url: "https://docs.trychroma.com", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "supabase": [
    { label: "Supabase", url: "https://supabase.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Supabase GitHub", url: "https://github.com/supabase/supabase", type: "github", verified: true, lastChecked: "2026-06-12" },
  ],
  "redis": [
    { label: "Redis", url: "https://redis.io", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Redis GitHub", url: "https://github.com/redis/redis", type: "github", verified: true, lastChecked: "2026-06-12" },
  ],
  "postgres": [
    { label: "PostgreSQL", url: "https://www.postgresql.org", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "PostgreSQL Documentation", url: "https://www.postgresql.org/docs", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "docker": [
    { label: "Docker", url: "https://docker.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Docker Documentation", url: "https://docs.docker.com", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "kubernetes": [
    { label: "Kubernetes", url: "https://kubernetes.io", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Kubernetes GitHub", url: "https://github.com/kubernetes/kubernetes", type: "github", verified: true, lastChecked: "2026-06-12" },
  ],
  "vscode": [
    { label: "Visual Studio Code", url: "https://code.visualstudio.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "VS Code GitHub", url: "https://github.com/microsoft/vscode", type: "github", verified: true, lastChecked: "2026-06-12" },
  ],
  "jetbrains": [
    { label: "JetBrains", url: "https://www.jetbrains.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "JetBrains AI", url: "https://www.jetbrains.com/ai", type: "official", verified: false, lastChecked: "2026-06-12", note: "verify before publishing" },
  ],
  "xcode": [
    { label: "Xcode", url: "https://developer.apple.com/xcode", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Xcode Documentation", url: "https://developer.apple.com/documentation/xcode", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "zed": [
    { label: "Zed", url: "https://zed.dev", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Zed GitHub", url: "https://github.com/zed-industries/zed", type: "github", verified: true, lastChecked: "2026-06-12" },
  ],
  "neovim": [
    { label: "Neovim", url: "https://neovim.io", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Neovim GitHub", url: "https://github.com/neovim/neovim", type: "github", verified: true, lastChecked: "2026-06-12" },
  ],
  "github": [
    { label: "GitHub", url: "https://github.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "GitHub Docs", url: "https://docs.github.com", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "perplexity": [
    { label: "Perplexity", url: "https://perplexity.ai", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Perplexity Research", url: "https://www.perplexity.ai/research", type: "research", verified: true, lastChecked: "2026-06-12" },
  ],
  "huggingface": [
    { label: "Hugging Face", url: "https://huggingface.co", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Hugging Face Models", url: "https://huggingface.co/models", type: "marketplace", verified: true, lastChecked: "2026-06-12" },
  ],
  "replit": [
    { label: "Replit", url: "https://replit.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Replit Agent", url: "https://replit.com/agent", type: "official", verified: true, lastChecked: "2026-06-12" },
  ],
  "replit-agent": [
    { label: "Replit Agent", url: "https://replit.com/agent", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Replit", url: "https://replit.com", type: "company", verified: true, lastChecked: "2026-06-12" },
  ],
  "manus": [
    { label: "Manus", url: "https://manus.ai", type: "official", verified: false, lastChecked: "2026-06-12", note: "verify before publishing" },
  ],
  "devin": [
    { label: "Devin AI", url: "https://cognition-labs.com", type: "company", verified: false, lastChecked: "2026-06-12", note: "verify before publishing" },
  ],
  "openclaw": [
    { label: "OpenClaw", url: "https://github.com/biax-ai/openclaw", type: "github", verified: false, lastChecked: "2026-06-12", note: "verify before publishing" },
  ],
  "zapier-agents": [
    { label: "Zapier Agents", url: "https://zapier.com/agents", type: "official", verified: false, lastChecked: "2026-06-12", note: "verify before publishing" },
    { label: "Zapier", url: "https://zapier.com", type: "company", verified: true, lastChecked: "2026-06-12" },
  ],
  "lindy": [
    { label: "Lindy", url: "https://lindy.ai", type: "official", verified: false, lastChecked: "2026-06-12", note: "verify before publishing" },
  ],
  "openrouter": [
    { label: "OpenRouter", url: "https://openrouter.ai", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "OpenRouter Documentation", url: "https://openrouter.ai/docs", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "open-interpreter": [
    { label: "Open Interpreter", url: "https://openinterpreter.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Open Interpreter GitHub", url: "https://github.com/OpenInterpreter/open-interpreter", type: "github", verified: true, lastChecked: "2026-06-12" },
  ],
  "groq": [
    { label: "Groq", url: "https://groq.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Groq Documentation", url: "https://console.groq.com/docs", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "together-ai": [
    { label: "Together AI", url: "https://together.ai", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Together AI Documentation", url: "https://docs.together.ai", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "firecrawl": [
    { label: "Firecrawl", url: "https://firecrawl.dev", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Firecrawl GitHub", url: "https://github.com/mendableai/firecrawl", type: "github", verified: false, lastChecked: "2026-06-12", note: "verify before publishing" },
  ],
  "exa": [
    { label: "Exa", url: "https://exa.ai", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Exa Documentation", url: "https://docs.exa.ai", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "tavily": [
    { label: "Tavily", url: "https://tavily.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Tavily Documentation", url: "https://docs.tavily.com", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "composio": [
    { label: "Composio", url: "https://composio.dev", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Composio Documentation", url: "https://docs.composio.dev", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "browserbase": [
    { label: "Browserbase", url: "https://browserbase.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Browserbase Documentation", url: "https://docs.browserbase.com", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "playwright": [
    { label: "Playwright", url: "https://playwright.dev", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Playwright GitHub", url: "https://github.com/microsoft/playwright", type: "github", verified: true, lastChecked: "2026-06-12" },
    { label: "Playwright Documentation", url: "https://playwright.dev/docs/intro", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "ollama": [
    { label: "Ollama", url: "https://ollama.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Ollama GitHub", url: "https://github.com/ollama/ollama", type: "github", verified: true, lastChecked: "2026-06-12" },
  ],
  "lm-studio": [
    { label: "LM Studio", url: "https://lmstudio.ai", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "LM Studio GitHub", url: "https://github.com/LMStudioAI/lm-studio", type: "github", verified: true, lastChecked: "2026-06-12" },
  ],
  "razorpay": [
    { label: "Razorpay", url: "https://razorpay.com", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "Razorpay API Docs", url: "https://razorpay.com/docs", type: "docs", verified: true, lastChecked: "2026-06-12" },
  ],
  "upi": [
    { label: "UPI", url: "https://npci.org.in", type: "official", verified: true, lastChecked: "2026-06-12" },
    { label: "NPCI", url: "https://npci.org.in", type: "company", verified: true, lastChecked: "2026-06-12" },
  ],
};

// Helper function to get links by slug
export function getExternalLinks(slug: string): ExternalLink[] {
  const normalizedSlug = slug.toLowerCase().replace(/-/g, ' ').replace(/\s+/g, '-');
  return externalLinks[normalizedSlug] || externalLinks[slug] || [];
}

// Get specific type of link
export function getLinkByType(slug: string, type: ExternalLinkType): ExternalLink | undefined {
  const links = getExternalLinks(slug);
  return links.find(link => link.type === type);
}
