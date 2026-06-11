export interface DirectoryTool {
  name: string;
  category: string;
  pricing: 'Free' | 'Freemium' | 'Paid' | 'Open Source' | 'Closed Beta';
  score: number;
  bestFor: string;
  websiteUrl: string;
  iconChar: string;
  description: string;
}

export const directoryCategories = [
  "AI Chatbots",
  "AI Image Generation",
  "AI Presentation",
  "AI Coding Assistance",
  "AI Email Assistance",
  "AI Spreadsheet",
  "AI Meeting Notes / Video Gen",
  "AI Scheduling",
  "AI Writing Generation",
  "Design & Visual Platforms",
  "AI Data Visualization",
  "AI Knowledge Management"
];

export const directoryTools: DirectoryTool[] = [
  // 1. AI CHATBOTS
  {
    name: "ChatGPT",
    category: "AI Chatbots",
    pricing: "Freemium",
    score: 9.5,
    bestFor: "General-purpose conversation, writing, logic exploration, and custom GPT bots.",
    websiteUrl: "https://chatgpt.com",
    iconChar: "C",
    description: "The global benchmark for conversational AI, powered by advanced OpenAI flagship models."
  },
  {
    name: "Claude",
    category: "AI Chatbots",
    pricing: "Freemium",
    score: 9.6,
    bestFor: "Deep technical analysis, coding assistance, high-fidelity writing, and structural logic.",
    websiteUrl: "https://claude.ai",
    iconChar: "C",
    description: "Anthropic's premier assistant, highly regarded for safe, nuance-conscious, and articulate reasoning."
  },
  {
    name: "DeepSeek",
    category: "AI Chatbots",
    pricing: "Freemium",
    score: 9.4,
    bestFor: "Cost-efficient reasoning, mathematics, high-speed programming outputs, and open weight hosting.",
    websiteUrl: "https://deepseek.com",
    iconChar: "D",
    description: "Sensationally efficient reasoning model showcasing state-of-the-art parameters for math and logic workflows."
  },
  {
    name: "Gemini",
    category: "AI Chatbots",
    pricing: "Freemium",
    score: 9.3,
    bestFor: "Multi-million token context window, Google search grounding, and deep multimodal reasoning.",
    websiteUrl: "https://gemini.google.com",
    iconChar: "G",
    description: "Google's direct native assistant, seamlessly integrated with workspace tools and live search data."
  },
  {
    name: "Grok",
    category: "AI Chatbots",
    pricing: "Paid",
    score: 8.8,
    bestFor: "Real-time updates, social media intelligence analysis, and filter-free discussions.",
    websiteUrl: "https://x.com",
    iconChar: "G",
    description: "xAI's flagship bot, built with direct backend access to real-time public conversations and data."
  },
  {
    name: "Meta AI",
    category: "AI Chatbots",
    pricing: "Free",
    score: 8.5,
    bestFor: "Quick messaging prompts, inline social chat, and multi-platform questions.",
    websiteUrl: "https://meta.ai",
    iconChar: "M",
    description: "Smart conversational assistant built directly into Facebook, WhatsApp, Instagram, and web portals."
  },
  {
    name: "MS Copilot",
    category: "AI Chatbots",
    pricing: "Freemium",
    score: 8.9,
    bestFor: "Microsoft Office integration, corporate file drafting, and Bing-powered research.",
    websiteUrl: "https://copilot.microsoft.com",
    iconChar: "M",
    description: "Microsoft's productivity companion, bridging standard enterprise documents to AI reasoning."
  },
  {
    name: "Perplexity",
    category: "AI Chatbots",
    pricing: "Freemium",
    score: 9.4,
    bestFor: "Citation-based academic/market research, dynamic searching, and structured reports.",
    websiteUrl: "https://perplexity.ai",
    iconChar: "P",
    description: "The leading AI search engine that returns comprehensive answers with explicit webpage citations."
  },

  // 2. AI IMAGE GENERATION
  {
    name: "Adobe Firefly",
    category: "AI Image Generation",
    pricing: "Freemium",
    score: 9.0,
    bestFor: "Commercial-safe stock imagery, AI vector rendering, and direct Photoshop integration.",
    websiteUrl: "https://firefly.adobe.com",
    iconChar: "A",
    description: "Adobe's legally vetted visual generator trained exclusively on licensed images and public domain content."
  },
  {
    name: "DALL-E",
    category: "AI Image Generation",
    pricing: "Paid",
    score: 8.9,
    bestFor: "High-compliance prompt adherence, playful graphic designs, and digital art layouts.",
    websiteUrl: "https://openai.com/dall-e-3",
    iconChar: "D",
    description: "OpenAI's legendary visual synthesizer, integrated cleanly into ChatGPT Plus tiers."
  },
  {
    name: "FLUX.1",
    category: "AI Image Generation",
    pricing: "Open Source",
    score: 9.5,
    bestFor: "Exceptional photorealism, readable text generation, and detailed hand structure renderings.",
    websiteUrl: "https://blackforestlabs.ai",
    iconChar: "F",
    description: "A state-of-the-art open-weights image generator created by the original pioneers of Stable Diffusion."
  },
  {
    name: "Ideogram",
    category: "AI Image Generation",
    pricing: "Freemium",
    score: 9.2,
    bestFor: "Typography rendering, logo designs, typographic posters, and clear vector layout layouts.",
    websiteUrl: "https://ideogram.ai",
    iconChar: "I",
    description: "Highly specialized image synthesizer world-renowned for its perfect rendering of text on images."
  },
  {
    name: "Midjourney",
    category: "AI Image Generation",
    pricing: "Paid",
    score: 9.4,
    bestFor: "Exquisite artistic concepts, hyper-detailed illustrations, and cinematic visual design.",
    websiteUrl: "https://midjourney.com",
    iconChar: "M",
    description: "The gold standard for artistic, high-concept, highly aesthetic synthetic design graphics."
  },
  {
    name: "Recraft",
    category: "AI Image Generation",
    pricing: "Freemium",
    score: 9.1,
    bestFor: "Brand kit vectors, consistent industrial icons, and flat style graphic illustrations.",
    websiteUrl: "https://recraft.ai",
    iconChar: "R",
    description: "A designer-first layout canvas facilitating fast generation and edit of high-resolution vector assets."
  },
  {
    name: "StableDiffusion",
    category: "AI Image Generation",
    pricing: "Open Source",
    score: 9.0,
    bestFor: "Local offline execution, custom control networks, image-to-image pipeline tuning.",
    websiteUrl: "https://stability.ai",
    iconChar: "S",
    description: "The pioneer of open-source diffusion models, offering deep fine-tuning control via external software."
  },
  {
    name: "AutoDraw",
    category: "AI Image Generation",
    pricing: "Free",
    score: 8.0,
    bestFor: "Quick visual sketches, turning hand drawings into beautiful pre-styled clip arts instantly.",
    websiteUrl: "https://autodraw.com",
    iconChar: "A",
    description: "Google's smart web drawing board that utilizes quick handwriting patterns to map vector layouts."
  },

  // 3. AI PRESENTATION
  {
    name: "Beautiful.Ai",
    category: "AI Presentation",
    pricing: "Paid",
    score: 8.8,
    bestFor: "Corporate-standard slides, intelligent spacing constraints, and professional graphics.",
    websiteUrl: "https://beautiful.ai",
    iconChar: "B",
    description: "Smart, layout-conscious presentation assistant that rescales designs automatically as you type."
  },
  {
    name: "Gamma",
    category: "AI Presentation",
    pricing: "Freemium",
    score: 9.4,
    bestFor: "Turning text papers, outlines, or raw docs into stunning presentation slides instantly.",
    websiteUrl: "https://gamma.app",
    iconChar: "G",
    description: "An innovative, beautifully designed slide workspace that formats markdown logs to decks."
  },
  {
    name: "Pitch",
    category: "AI Presentation",
    pricing: "Freemium",
    score: 9.0,
    bestFor: "Real-time collaborative B2B pitching, corporate funding layouts, and fluid charts.",
    websiteUrl: "https://pitch.com",
    iconChar: "P",
    description: "Modern, high-fidelity presentation platform for collaborative teams to design and track decks."
  },
  {
    name: "Tome",
    category: "AI Presentation",
    pricing: "Freemium",
    score: 8.6,
    bestFor: "Interactive, scrollable landing pages, product storytelling, and embedded canvas frames.",
    websiteUrl: "https://tome.app",
    iconChar: "T",
    description: "Dynamic layout builder blending generative text, adaptive cards, and sleek presentation blocks."
  },
  {
    name: "Plus",
    category: "AI Presentation",
    pricing: "Freemium",
    score: 8.7,
    bestFor: "Live snapshot widgets, automatic market dashboard slides compilation, and reports.",
    websiteUrl: "https://plusdocs.com",
    iconChar: "P",
    description: "Innovative AI extension that clips live dashboards and updates presentation decks with real stats."
  },
  {
    name: "PopAI",
    category: "AI Presentation",
    pricing: "Freemium",
    score: 8.5,
    bestFor: "Summarizing research briefs instantly into template deck slides for webinars.",
    websiteUrl: "https://popai.pro",
    iconChar: "P",
    description: "An AI search and presentation helper that turns PDF uploads into logical slide summaries."
  },
  {
    name: "Presentation Ai",
    category: "AI Presentation",
    pricing: "Freemium",
    score: 8.4,
    bestFor: "Template-driven enterprise deck drafting, charts, and basic team summaries.",
    websiteUrl: "https://presentation.ai",
    iconChar: "P",
    description: "A specialized presentation application designed for fast, AI-templated slide outlines."
  },
  {
    name: "Slidesgo",
    category: "AI Presentation",
    pricing: "Freemium",
    score: 8.3,
    bestFor: "Vast catalogs of classical pre-designed templates editable inside Google Slides.",
    websiteUrl: "https://slidesgo.com",
    iconChar: "S",
    description: "Traditional presentation templates platform optimized with integrated AI slide-deck generator rules."
  },

  // 4. AI CODING ASSISTANCE
  {
    name: "Askcodi",
    category: "AI Coding Assistance",
    pricing: "Freemium",
    score: 8.3,
    bestFor: "Quick code snippet conversions, syntax translation, and simple shell query answers.",
    websiteUrl: "https://askcodi.com",
    iconChar: "A",
    description: "A fast, multi-language coding reference utility aiding syntax lookup across diverse platforms."
  },
  {
    name: "Codiga",
    category: "AI Coding Assistance",
    pricing: "Freemium",
    score: 8.2,
    bestFor: "Real-time security auditing, secure static code checks, and pipeline code standardization.",
    websiteUrl: "https://codiga.io",
    iconChar: "C",
    description: "An automated static code review service identifying vulnerabilities before production deployment."
  },
  {
    name: "Cursor",
    category: "AI Coding Assistance",
    pricing: "Freemium",
    score: 9.8,
    bestFor: "Advanced codebase context, multi-file editing composer, and elite terminal debugging.",
    websiteUrl: "https://cursor.com",
    iconChar: "C",
    description: "An elite VS Code hard fork that indexes your entire repository to execute intelligent edits."
  },
  {
    name: "GitHub Copilot",
    category: "AI Coding Assistance",
    pricing: "Paid",
    score: 9.2,
    bestFor: "Instant inline autocomplete suggestions, comments-to-code, and standard IDE setups.",
    websiteUrl: "https://github.com/features/copilot",
    iconChar: "G",
    description: "The pioneer of inline code completions, integrated seamlessly with all popular Microsoft development tools."
  },
  {
    name: "Qodo",
    category: "AI Coding Assistance",
    pricing: "Freemium",
    score: 8.7,
    bestFor: "Automated unit test writing, complex logic tracing, and codebase edge-case testing.",
    websiteUrl: "https://qodo.ai",
    iconChar: "Q",
    description: "An intelligent model wrapper designed specifically for testing, checking, and validating code paths."
  },
  {
    name: "Replit",
    category: "AI Coding Assistance",
    pricing: "Freemium",
    score: 9.1,
    bestFor: "Instant online sandboxing, real-time node hosting, workspace sharing, and mobile coding.",
    websiteUrl: "https://replit.com",
    iconChar: "R",
    description: "An immersive cloud development platform integrated with fine-tuned workspace agents."
  },
  {
    name: "Tabnine",
    category: "AI Coding Assistance",
    pricing: "Freemium",
    score: 8.6,
    bestFor: "Secure offline/on-premise completions, local model training, and privacy compliance.",
    websiteUrl: "https://tabnine.com",
    iconChar: "T",
    description: "A privacy-focussed developer companion specializing in local, zero-telemetry code predictions."
  },

  // 5. AI EMAIL ASSISTANCE
  {
    name: "Clippit.Ai",
    category: "AI Email Assistance",
    pricing: "Freemium",
    score: 8.2,
    bestFor: "Super fast paragraph summaries, quick notes, and high-speed dispatch suggestions.",
    websiteUrl: "https://clippit.ai",
    iconChar: "C",
    description: "A sleek content assistant focused on rapid summarizing and quick notification replies."
  },
  {
    name: "Friday",
    category: "AI Email Assistance",
    pricing: "Freemium",
    score: 8.1,
    bestFor: "B2B sales templates, client greeting drafts, and simple email sequencing structures.",
    websiteUrl: "https://friday.app",
    iconChar: "F",
    description: "An automated helper structured around templated responses and basic lead messaging blocks."
  },
  {
    name: "Mailmaestro",
    category: "AI Email Assistance",
    pricing: "Freemium",
    score: 8.4,
    bestFor: "Corporate compliance communications, Outlook integration, and professional translations.",
    websiteUrl: "https://maestro.ai",
    iconChar: "M",
    description: "Enterprise-grade Outlook and Gmail plugin that drafts formal communications in various brand voices."
  },
  {
    name: "Shortwave",
    category: "AI Email Assistance",
    pricing: "Freemium",
    score: 9.0,
    bestFor: "Ultra-fast search across massive threads, instant summaries, and smart inbox prioritization.",
    websiteUrl: "https://shortwave.com",
    iconChar: "S",
    description: "A beautifully designed AI-first email inbox wrapper replacing standard Gmail client interfaces."
  },
  {
    name: "Superhuman",
    category: "AI Email Assistance",
    pricing: "Paid",
    score: 9.3,
    bestFor: "Professional executive efficiency, hotkey navigation, and offline drafting loops.",
    websiteUrl: "https://superhuman.com",
    iconChar: "S",
    description: "Premium elite email client featuring instant autocomplete, AI drafts, and rapid triage rules."
  },

  // 6. AI SPREADSHEET
  {
    name: "Bricks",
    category: "AI Spreadsheet",
    pricing: "Freemium",
    score: 8.9,
    bestFor: "Converting complex spreadsheet databases into gorgeous presentation decks.",
    websiteUrl: "https://bricks.co",
    iconChar: "B",
    description: "An intelligent spreadsheet editor that auto-generates slides and dashboard visual elements."
  },
  {
    name: "Formula Bot",
    category: "AI Spreadsheet",
    pricing: "Freemium",
    score: 8.8,
    bestFor: "Explaining compound spreadsheets, translating prompts to Excel formulas, and VBA code.",
    websiteUrl: "https://formulabot.com",
    iconChar: "F",
    description: "A developer tool that writes spreadsheet cell equations and macros based on natural text instructions."
  },
  {
    name: "Gigasheet",
    category: "AI Spreadsheet",
    pricing: "Freemium",
    score: 9.1,
    bestFor: "Parsing massive CSV logs with up to 1 billion rows without database coding.",
    websiteUrl: "https://gigasheet.com",
    iconChar: "G",
    description: "An enterprise-grade cloud sheet viewer optimized for big data analysis, filtering, and summaries."
  },
  {
    name: "Rows AI",
    category: "AI Spreadsheet",
    pricing: "Freemium",
    score: 9.2,
    bestFor: "Direct API connectors (Crunchbase, Stripe), online dashboards, and automated charts.",
    websiteUrl: "https://rows.com",
    iconChar: "R",
    description: "A modern spreadsheet interface pulling live company metrics natively inside dynamic equations."
  },
  {
    name: "SheetAI",
    category: "AI Spreadsheet",
    pricing: "Freemium",
    score: 8.7,
    bestFor: "Running batch AI prompt evaluations across rows inside Google Sheets equations.",
    websiteUrl: "https://sheetai.app",
    iconChar: "S",
    description: "A powerful Google Sheets add-on introducing custom `=SHEETAI()` functions for bulk text processing."
  },

  // 7. AI MEETING NOTES / VIDEO GEN
  {
    name: "Descript",
    category: "AI Meeting Notes / Video Gen",
    pricing: "Freemium",
    score: 9.4,
    bestFor: "Podcast and video editing via text script transcript, filler-word removal, and voice cloning.",
    websiteUrl: "https://descript.com",
    iconChar: "D",
    description: "A revolutionary text-based media editor that automatically transcribes audio and cuts video sequences with script edits."
  },
  {
    name: "Haiper AI",
    category: "AI Meeting Notes / Video Gen",
    pricing: "Freemium",
    score: 8.9,
    bestFor: "High-fidelity physical cinematic footage, video generation from text, and style painting.",
    websiteUrl: "https://haiper.ai",
    iconChar: "H",
    description: "An advanced visual generation system aligning hyper-realistic animations with physics constraints."
  },
  {
    name: "Invideo AI",
    category: "AI Meeting Notes / Video Gen",
    pricing: "Freemium",
    score: 9.0,
    bestFor: "Converting complete text scripts into fully articulated social videos with AI voices.",
    websiteUrl: "https://invideo.io",
    iconChar: "I",
    description: "Comprehensive marketing video maker with built-in stock asset matching and script-driven voiceovers."
  },
  {
    name: "Kling",
    category: "AI Meeting Notes / Video Gen",
    pricing: "Freemium",
    score: 9.3,
    bestFor: "Hyper-realistic fluid human motion video, temporal video coherence, and long prompt adherence.",
    websiteUrl: "https://klingai.com",
    iconChar: "K",
    description: "Advanced model synthesizing high-standard cinematic films from simple descriptive prompts."
  },
  {
    name: "Krea AI",
    category: "AI Meeting Notes / Video Gen",
    pricing: "Freemium",
    score: 9.2,
    bestFor: "Real-time canvas drawing to paint enhancement, HD vector upscaling, and product rendering.",
    websiteUrl: "https://krea.ai",
    iconChar: "K",
    description: "Designer-focused live painting suite applying real-time generation overlays on standard drawings."
  },
  {
    name: "Taskade",
    category: "AI Meeting Notes / Video Gen",
    pricing: "Freemium",
    score: 9.1,
    bestFor: "Setting up multi-agent task boards, notes taking, and automated business agendas.",
    websiteUrl: "https://taskade.com",
    iconChar: "T",
    description: "An executive workflow workspace where autonomous agents coordinate project boards and mind maps."
  },
  {
    name: "LTX Studio",
    category: "AI Meeting Notes / Video Gen",
    pricing: "Paid",
    score: 9.0,
    bestFor: "Coordinated storyboard rendering, script editing, consistent character face videos, and film prep.",
    websiteUrl: "https://ltxstudio.com",
    iconChar: "L",
    description: "A production-level generative studio orchestrating complete visual narratives and scene controls."
  },
  {
    name: "Quarkle",
    category: "AI Meeting Notes / Video Gen",
    pricing: "Freemium",
    score: 8.6,
    bestFor: "Detailed creative writing, novel drafting, formatting chapters, and editing story pacing.",
    websiteUrl: "https://quarkle.ai",
    iconChar: "Q",
    description: "Smart creative editor serving as a constant brainstorming partner for novelists and screenwriters."
  },
  {
    name: "Quillbot",
    category: "AI Meeting Notes / Video Gen",
    pricing: "Freemium",
    score: 9.0,
    bestFor: "Paraphrasing articles, checking active/passive voice, citations rendering, and summarizing.",
    websiteUrl: "https://quillbot.com",
    iconChar: "Q",
    description: "The internet's leading paraphrasing and grammar assistant, offering diverse writing tone shifts."
  },

  // 8. AI SCHEDULING
  {
    name: "Calendly",
    category: "AI Scheduling",
    pricing: "Freemium",
    score: 9.1,
    bestFor: "Standard calendar slots sharing, group polls, and straightforward client booking.",
    websiteUrl: "https://calendly.com",
    iconChar: "C",
    description: "The global benchmark for timezone-safe calendar availability coordination and scheduling."
  },
  {
    name: "Clockwise",
    category: "AI Scheduling",
    pricing: "Freemium",
    score: 8.9,
    bestFor: "Corporate team calendar defragmentation, smart focus blocks, and meeting timing optimizer.",
    websiteUrl: "https://getclockwise.com",
    iconChar: "C",
    description: "Smart enterprise calendar assistant that reschedules loose meetings to create continuous focus chunks."
  },
  {
    name: "Motion",
    category: "AI Scheduling",
    pricing: "Paid",
    score: 9.2,
    bestFor: "Automatically structuring and rearranging daily project task times based on deadlines.",
    websiteUrl: "https://usemotion.com",
    iconChar: "M",
    description: "A comprehensive team planner that rebuilds daily calendars depending on priorities and workloads."
  },
  {
    name: "Reclaim AI",
    category: "AI Scheduling",
    pricing: "Freemium",
    score: 9.3,
    bestFor: "Habits scheduling, family multi-calendar syncing, and automated buffer time guards.",
    websiteUrl: "https://reclaim.ai",
    iconChar: "R",
    description: "A beautifully polished calendar coordinator designed for balanced team productivity and habits."
  },
  {
    name: "Trevor AI",
    category: "AI Scheduling",
    pricing: "Freemium",
    score: 8.5,
    bestFor: "Manual daily task time-blocking with drag-and-drop slots on Google/MS calendars.",
    websiteUrl: "https://trevorai.com",
    iconChar: "T",
    description: "A lightweight, clear scheduler visually aiding time-blocking strategies for task-completion."
  },

  // 9. AI WRITING GENERATION
  {
    name: "Copy Ai",
    category: "AI Writing Generation",
    pricing: "Freemium",
    score: 9.1,
    bestFor: "High-volume ad scripts copies, automated social media posts, and brand consistency.",
    websiteUrl: "https://copy.ai",
    iconChar: "C",
    description: "The primary workspace for copywriters automating standard promotional assets at scale."
  },
  {
    name: "Grammarly",
    category: "AI Writing Generation",
    pricing: "Freemium",
    score: 9.4,
    bestFor: "Real-time spelling, corporate communication tone adjustment, and essays structure.",
    websiteUrl: "https://grammarly.com",
    iconChar: "G",
    description: "The world's leading editorial corrector ensuring accurate, professional and properly styled writing."
  },
  {
    name: "Jasper",
    category: "AI Writing Generation",
    pricing: "Paid",
    score: 9.0,
    bestFor: "Coordinating multi-pillar enterprise blog campaigns under custom style directives.",
    websiteUrl: "https://jasper.ai",
    iconChar: "J",
    description: "A deep commercial drafting environment with customized database guidelines mimicking brand voice."
  },
  {
    name: "JotBot",
    category: "AI Writing Generation",
    pricing: "Freemium",
    score: 8.7,
    bestFor: "Analyzing student drafts to replicate individual writing rhythms and structures.",
    websiteUrl: "https://jotbot.com",
    iconChar: "J",
    description: "An innovative, personalized drafting bot learning style characteristics to draft matching notes."
  },
  {
    name: "Rytr",
    category: "AI Writing Generation",
    pricing: "Freemium",
    score: 8.5,
    bestFor: "Affordable, quick short outlines, newsletters pitches, and templates copy.",
    websiteUrl: "https://rytr.me",
    iconChar: "R",
    description: "A simple, cost-efficient content composer optimized for rapid blog post drafts."
  },
  {
    name: "Sudowrite",
    category: "AI Writing Generation",
    pricing: "Paid",
    score: 9.2,
    bestFor: "Fiction authors, fantasy storyboards plotting, character development, and sensory logs.",
    websiteUrl: "https://sudowrite.com",
    iconChar: "S",
    description: "The ultimate creative playground for fiction writers introducing rich vocabulary and sensory generators."
  },
  {
    name: "Writesonic",
    category: "AI Writing Generation",
    pricing: "Freemium",
    score: 9.0,
    bestFor: "Search engine optimized articles, live citations web search, and landing pages.",
    websiteUrl: "https://writesonic.com",
    iconChar: "W",
    description: "A flexible content processor generating readable blog layouts grounded in real-time search data."
  },

  // 10. DESIGN & VISUAL PLATFORMS
  {
    name: "Canva",
    category: "Design & Visual Platforms",
    pricing: "Freemium",
    score: 9.3,
    bestFor: "Visual social graphics templates, rapid layout editing, and smart asset removal.",
    websiteUrl: "https://canva.com",
    iconChar: "C",
    description: "Universal design studio packing visual assets libraries and smart AI editor brushes."
  },
  {
    name: "Design.Com",
    category: "Design & Visual Platforms",
    pricing: "Freemium",
    score: 8.4,
    bestFor: "Generating brand logo options and drafting basic visual brand assets.",
    websiteUrl: "https://design.com",
    iconChar: "D",
    description: "A graphical generator system guiding startups through logo variations and typography sheets."
  },
  {
    name: "Framer",
    category: "Design & Visual Platforms",
    pricing: "Freemium",
    score: 9.5,
    bestFor: "Absolute design layouts precision and instantly launching gorgeous web code products.",
    websiteUrl: "https://framer.com",
    iconChar: "F",
    description: "No-code website visual builder directly scaling design frames to responsive clean HTML code."
  },
  {
    name: "Microsoft Designer",
    category: "Design & Visual Platforms",
    pricing: "Free",
    score: 8.7,
    bestFor: "Quick invitations, greeting cards, and automated banners generation instantly.",
    websiteUrl: "https://designer.microsoft.com",
    iconChar: "M",
    description: "A lightweight visual composer aiding standard greeting layouts with instant prompt overlays."
  },
  {
    name: "Uizard",
    category: "Design & Visual Platforms",
    pricing: "Freemium",
    score: 9.0,
    bestFor: "Replicating screenshots or hand sketches into clean, modern UI wireframes.",
    websiteUrl: "https://uizard.io",
    iconChar: "U",
    description: "Advanced UI/UX visual helper mapping standard user requirements to digital mockups."
  },
  {
    name: "Luma AI",
    category: "Design & Visual Platforms",
    pricing: "Freemium",
    score: 9.4,
    bestFor: "Hyper-realistic 3D scene captures, interactive NeRFs, and cinematic animations.",
    websiteUrl: "https://lumalabs.ai",
    iconChar: "L",
    description: "Advanced spatial modeling application delivering photorealistic 3D rendering from video frames."
  },
  {
    name: "Pika AI",
    category: "Design & Visual Platforms",
    pricing: "Freemium",
    score: 9.2,
    bestFor: "High-level physics-aligned cinematic video generation, and sound effect synchronization.",
    websiteUrl: "https://pika.art",
    iconChar: "P",
    description: "Creator video synthesizer allowing users to animate specific items within images precisely."
  },
  {
    name: "Runway",
    category: "Design & Visual Platforms",
    pricing: "Freemium",
    score: 9.4,
    bestFor: "State-of-the-art cinematic landscapes, frame interpolation, and advanced visual editing.",
    websiteUrl: "https://runwayml.com",
    iconChar: "R",
    description: "A creative research suite leading visual storytelling through legendary Gen-2 and Gen-3 models."
  },
  {
    name: "Sora",
    category: "Design & Visual Platforms",
    pricing: "Closed Beta",
    score: 9.7,
    bestFor: "Unmatched photorealistic 60-second video simulations under complex environmental parameters.",
    websiteUrl: "https://openai.com/sora",
    iconChar: "S",
    description: "OpenAI's high-tier physical simulation engine resolving complex real-world optics and motion."
  },

  // 11. AI DATA VISUALIZATION
  {
    name: "Flourish",
    category: "AI Data Visualization",
    pricing: "Freemium",
    score: 9.0,
    bestFor: "Interactive race bar charts, scrollable analytical logs, and map visualizations.",
    websiteUrl: "https://flourish.studio",
    iconChar: "F",
    description: "A beautiful browser graphics pipeline turning heavy datasets into immersive slideshow stories."
  },
  {
    name: "Julius",
    category: "AI Data Visualization",
    pricing: "Freemium",
    score: 9.3,
    bestFor: "Python code execution, statistical parsing, and quick advanced graphs rendering.",
    websiteUrl: "https://julius.ai",
    iconChar: "J",
    description: "An outstanding AI sandboxed environment that writes script code to plot maps and charts."
  },
  {
    name: "Visme",
    category: "AI Data Visualization",
    pricing: "Freemium",
    score: 8.8,
    bestFor: "Corporate dashboard reports, custom infographics, and vector charts illustrations.",
    websiteUrl: "https://visme.co",
    iconChar: "V",
    description: "A versatile drag-and-drop designer specifically focused on visual reports and metrics slides."
  },
  {
    name: "Zing Data",
    category: "AI Data Visualization",
    pricing: "Freemium",
    score: 9.1,
    bestFor: "Real-time SQL querying, team collaboration on data, and geo charts.",
    websiteUrl: "https://getzingdata.com",
    iconChar: "Z",
    description: "Mobile-first analytical canvas simplifying complex PostgreSQL or BigQuery analytics into charts."
  },

  // 12. AI KNOWLEDGE MANAGEMENT
  {
    name: "Mem",
    category: "AI Knowledge Management",
    pricing: "Freemium",
    score: 8.8,
    bestFor: "Self-organizing daily loose thoughts, rapid journaling connections, and timeline searches.",
    websiteUrl: "https://mem.ai",
    iconChar: "M",
    description: "A clean notes workspace that automatically suggests links between separate journal items."
  },
  {
    name: "Notion",
    category: "AI Knowledge Management",
    pricing: "Freemium",
    score: 9.4,
    bestFor: "Deep hierarchical project databases, modular wiki libraries, and automated task logs.",
    websiteUrl: "https://notion.so",
    iconChar: "N",
    description: "The global gold-standard workspace integrating modular databases with rich document formats."
  },
  {
    name: "Tettra",
    category: "AI Knowledge Management",
    pricing: "Freemium",
    score: 8.7,
    bestFor: "Corporate wiki hubs, smart Slack Q&A answers, and verified team answers.",
    websiteUrl: "https://tettra.com",
    iconChar: "T",
    description: "A centralized team knowledge base designed specifically for quick Slack onboarding integrations."
  }
];
