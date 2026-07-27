import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy',
  timeout: 60000,
  maxRetries: 2
});

export interface GenerationOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  mock?: boolean;
}

export async function generateSection(
  section: any,
  context: Record<string, any>,
  options: GenerationOptions = {}
): Promise<string> {
  const {
    model = 'gpt-4-turbo-preview',
    temperature = 0.3,
    maxTokens = 3000,
    mock = false
  } = options;

  let prompt = section.prompt_template;

  // Replace placeholders with actual data
  for (const [key, value] of Object.entries(context)) {
    const placeholder = `{${key}}`;
    if (typeof value === 'string') {
      prompt = prompt.replace(new RegExp(placeholder, 'g'), value);
    } else if (Array.isArray(value)) {
      prompt = prompt.replace(new RegExp(placeholder, 'g'), value.join(', '));
    } else if (typeof value === 'object' && value !== null) {
      prompt = prompt.replace(new RegExp(placeholder, 'g'), JSON.stringify(value, null, 2));
    }
  }

  const systemPrompt = `You are a senior technical writer for BestAIAgent.in, an authoritative AI agent review site.
Your content is factual, balanced, and deeply researched. Never hallucinate. If uncertain, state it clearly.
Each section must be detailed and hit the minimum word count. Use markdown formatting with headers, lists, and emphasis.`;

  // Mock mode for testing without API key
  if (mock) {
    return generateMockContent(section, context);
  }

  try {
    let content = '';
    const response = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature,
      max_tokens: maxTokens
    });
    content = response.choices[0]?.message?.content || '';

    if (!content.trim()) {
      throw new Error('Empty response from AI');
    }

    return content.trim();
  } catch (error: any) {
    console.error(`Failed to generate section ${section.id}:`, error.message);
    throw error;
  }
}

function generateMockContent(section: any, context: Record<string, any>): string {
  const entityName = context.entity_name || 'AI Agent';
  const entity = context.entity || {};
  const sectionId = section.id;
  
  // Handle comparison entities that have itemA and itemB
  const itemA = (context.itemA || context.entity?.itemA) as any;
  const itemB = (context.itemB || context.entity?.itemB) as any;
  const isComparison = !!itemA && !!itemB;
  const nameA = itemA?.name || 'Agent A';
  const nameB = itemB?.name || 'Agent B';
  const entityNameForContent = isComparison ? `${nameA} vs ${nameB}` : entityName;

  const mockTemplates: Record<string, string> = {
    'overview': generateOverviewMock(entity, entityNameForContent, isComparison, nameA, nameB),
    'key-features': generateKeyFeaturesMock(entity, entityNameForContent),
    'pricing': generatePricingMock(entity, entityNameForContent),
    'pros-cons': generateProsConsMock(entity, entityNameForContent),
    'integrations': generateIntegrationsMock(entity, entityNameForContent),
    'use-cases': generateUseCasesMock(entity, entityNameForContent),
    'alternatives': generateAlternativesMock(entity, entityNameForContent),
    'faq': generateFaqMock(entity, entityNameForContent),
    'conclusion': generateConclusionMock(entity, entityNameForContent),
    'introduction': isComparison ? generateIntroComparisonMock(entity, entityNameForContent, nameA, nameB) : generateOverviewMock(entity, entityNameForContent, false, null, null),
    'overview-table': isComparison ? generateOverviewTableMock(entity, nameA, nameB) : generateOverviewMock(entity, entityNameForContent, false, null, null),
    'detailed-comparison': generateDetailedComparisonMock(entity, nameA, nameB),
    'head-to-head-scenarios': generateHeadToHeadMock(entity, nameA, nameB),
    'verdict': generateVerdictMock(entity, nameA, nameB),
    'comparison': generateComparisonMock(entity, entityNameForContent, nameA, nameB),
    'market-analysis': generateMarketAnalysisMock(entity, entityNameForContent)
  };

  // Use template if available, otherwise generate generic content
  let content = mockTemplates[sectionId];
  if (!content) {
    content = `## ${sectionId.replace(/-/g, ' ')}\n\nThis section covers ${sectionId} for ${entityName}. \n\n${section.prompt_template}\n\n(Mock content - replace with real AI generation when OPENAI_API_KEY is configured)`;
  }

  // Ensure minimum word count (approximate by repetition if needed)
  const words = content.split(/\s+/).length;
  const minWords = section.min_words || 500;
  if (words < minWords) {
    // Expand content by adding elaboration
    content += `\n\n${entityName} continues to demonstrate excellence in this area. The implementation is robust, well-documented, and supported by strong technical expertise. Users consistently report positive experiences, highlighting the reliability and effectiveness of the features described above.\n\nAdditional benefits include seamless integration with existing workflows, comprehensive training resources, and responsive customer support. These factors contribute to the overall value proposition that makes ${entityName} a standout choice in its category.`;
  }

  return content;
}

// ============================================================
// Helper functions for generating mock content
// ============================================================

function generateOverviewMock(entity: any, entityName: string, isComparison: boolean, nameA: string, nameB: string): string {
  const sectionId = isComparison ? 'introduction' : 'overview';
  if (isComparison) {
    return `## ${sectionId}\n\n${entityName} represents a significant comparison between two prominent AI agents in the market. This comprehensive analysis examines the capabilities, strengths, and trade-offs of ${nameA} and ${nameB} to help users make informed decisions based on their specific requirements and workflow needs.\n\nBoth platforms have established themselves as leaders in their respective domains, offering sophisticated features that address diverse use cases from software development and content creation to complex research and automation tasks. The choice between them depends on factors such as specialized capabilities, pricing considerations, integration requirements, and target audience needs.\n\n${nameA} is known for its advanced reasoning capabilities and extensive tool integration, making it particularly well-suited for complex workflows and enterprise deployments. ${nameB}, on the other hand, excels in cost-effectiveness and streamlined user experience, making it a strong choice for startups and teams seeking value-driven solutions.\n\nThis comparison evaluates both platforms across critical dimensions including core capabilities, pricing models, integration ecosystems, performance metrics, and user experience to provide a comprehensive assessment of their relative strengths.`;
  }
  
  const company = entity.company || 'the company';
  return `## overview\n\n${entityName} is a powerful AI agent developed by ${company}. It represents a significant advancement in artificial intelligence technology, offering capabilities that span multiple domains including coding, research, and creative tasks.\n\nThe agent leverages state-of-the-art language models to understand and respond to user queries with high accuracy. Its architecture is designed for scalability and reliability, making it suitable for both individual users and enterprise deployments.\n\nWith a focus on user experience, ${entityName} provides an intuitive interface that allows users to harness the power of AI without requiring extensive technical knowledge. This democratization of AI technology is one of its core strengths.\n\n## key-features\n\n- Advanced natural language processing for accurate query understanding\n- Multi-modal capabilities supporting text, code, image, and data processing\n- Contextual understanding that maintains relevance across conversations\n- Real-time collaboration features for team workflows\n- Extensive integration options with popular development tools and platforms\n- Robust security measures including encryption and access controls\n- Scalable infrastructure that handles diverse workloads from personal to enterprise scale\n\nThese features combine to create a versatile AI agent that can adapt to various use cases and industries.`;
}

function generateKeyFeaturesMock(entity: any, entityName: string): string {
  return `## Key Features\n\n${entityName} boasts an impressive array of features that set it apart in the competitive AI landscape:\n\n### 1. Natural Language Understanding\nPowered by cutting-edge transformer models, ${entityName} excels at comprehending complex queries and providing accurate, context-aware responses. The system understands nuanced instructions and can handle multi-turn conversations with sophisticated context tracking.\n\n### 2. Multi-Modal Processing\nThe agent can process and generate text, images, code, and data, making it a truly versatile tool for creative and analytical tasks. This capability enables seamless workflow integration across diverse content types and formats.\n\n### 3. Agentic Capabilities\nPerhaps most notably, ${entityName} can act autonomously to complete multi-step workflows, reducing the need for constant human oversight. The agent can plan, execute, and validate complex operations with minimal supervision.\n\n### 4. Extensive Tool Ecosystem\nWith hundreds of integrations, ${entityName} connects seamlessly with popular platforms and services, enhancing its utility across different domains. Developers can extend capabilities through comprehensive APIs and plugin frameworks.\n\n### 5. Enterprise-Grade Security\nSecurity is a top priority, with features like end-to-end encryption, role-based access control, and compliance with major data protection regulations including GDPR and CCPA.\n\n### 6. Scalable Infrastructure\nThe platform handles workloads from personal to enterprise scale, with dynamic resource allocation and performance optimization that ensures consistent response times under varying load conditions.\n\nThese features make ${entityName} a comprehensive solution for organizations looking to leverage AI technology effectively.`;
}

function generatePricingMock(entity: any, entityName: string): string {
  const pricing = entity.pricing || {};
  const startingPrice = pricing?.startingPriceUSD || '$20/mo';
  return `## Pricing\n\n${entityName} offers flexible pricing options to accommodate various needs and budgets:\n\n### **Free Tier**\nThe free tier provides access to basic features with usage limits, perfect for individuals, small projects, and experimentation with the platform's capabilities. Free users can explore core functionality and determine fit before committing to paid plans.\n\n### **Paid Tiers**\nStarting at ${startingPrice}, paid plans unlock advanced capabilities including higher usage limits, priority support, and access to premium features. The pricing structure is designed to scale with usage, ensuring that customers only pay for what they need.\n\n### **Enterprise Solutions**\nCustom pricing is available for enterprise deployments, offering dedicated support, custom integrations, and SLA guarantees. Enterprise plans typically include features like advanced analytics, role-based permissions, and compliance certifications.\n\n### **Volume Discounts**\nOrganizations with high usage patterns can benefit from volume discounts and custom pricing arrangements that optimize total cost of ownership.\n\nThe pricing flexibility ensures ${entityName} remains accessible across different organization sizes while providing clear upgrade paths as requirements grow.`;
}

function generateProsConsMock(entity: any, entityName: string): string {
  return `## Pros and Cons\n\n### **Pros:**\n\n1. **Comprehensive Feature Set** - ${entityName} offers a complete suite of AI capabilities covering text, code, and multi-modal inputs, making it a one-stop solution for diverse needs.\n\n2. **User-Friendly Interface** - The platform features an intuitive design that requires minimal training, enabling rapid onboarding for new users and teams.\n\n3. **Strong Performance** - Consistently high accuracy and fast response times deliver reliable results that users can depend on for mission-critical applications.\n\n4. **Active Development** - Regular updates and feature improvements demonstrate a commitment to staying ahead of market trends and user needs.\n\n5. **Extensive Documentation** - Comprehensive resources make it easy for users to learn, troubleshoot, and maximize the platform's potential.\n\n6. **Scalable Architecture** - Handles workloads from personal to enterprise scale, with infrastructure that grows alongside organizational needs.\n\n7. **Strong Ecosystem** - Rich marketplace of integrations and extensions extends capabilities beyond the core platform.\n\n### **Cons:**\n\n1. **Cost at Scale** - Advanced features and high-volume usage can become expensive, requiring careful cost management for intensive workloads.\n\n2. **Learning Curve** - Maximized capabilities require time to master, particularly for advanced features and customization options.\n\n3. **API Rate Limits** - Some tiers have restrictive limits that may impact heavy users or automated workflows.\n\n4. **Data Privacy Concerns** - Cloud-based operation requires trust in the provider's data handling and security practices.\n\n5. **Occasional Inconsistencies** - Like all AI systems, results can occasionally vary in quality depending on the complexity and context of the request.\n\nOverall, ${entityName} represents excellent value for most use cases, with its advantages significantly outweighing its limitations.`;
}

function generateIntegrationsMock(entity: any, entityName: string): string {
  return `## Integrations\n\n${entityName} seamlessly integrates with a wide range of tools and platforms:\n\n### **Development Tools**\n- GitHub, GitLab, Bitbucket for version control and collaboration\n- VS Code, JetBrains IDEs for integrated development experiences\n- Jira, Linear, Asana for project management workflows\n- Docker, Kubernetes for containerized deployment environments\n\n### **Productivity Suites**\n- Slack, Microsoft Teams for team communication\n- Google Workspace, Office 365 for document collaboration\n- Notion, Confluence for knowledge management\n- Zapier, Make for workflow automation\n\n### **Specialized AI Tools**\n- Database integration for data analysis and retrieval\n- Design tools like Figma for creative workflows\n- E-commerce platforms for business automation\n- CRM systems for customer relationship management\n\n### **API Capabilities**\nFor custom integrations, ${entityName} provides a well-documented REST API and SDKs for popular programming languages, enabling developers to build tailored solutions. The comprehensive API supports webhook configuration, custom tool creation, and deep platform integration.\n\nThe integration ecosystem is continuously expanding, with new connectors added regularly based on user feedback and market demand. This extensibility ensures ${entityName} can fit into virtually any existing workflow.`;
}

function generateUseCasesMock(entity: any, entityName: string): string {
  return `## Use Cases\n\n${entityName} excels across numerous scenarios:\n\n### **Software Development**\n- Code generation and review across multiple programming languages\n- Bug detection and automated fixing suggestions\n- Documentation creation from code and specifications\n- Architecture design assistance and best practice recommendations\n\n### **Research & Analysis**\n- Literature review and academic paper summarization\n- Data analysis and pattern identification in large datasets\n- Report generation with citations and evidence synthesis\n- Market research and competitive intelligence gathering\n\n### **Content Creation**\n- Article drafting with SEO optimization\n- Marketing copywriting adapted to different channels\n- Social media content generation with engagement optimization\n- Video scriptwriting for educational and promotional content\n\n### **Customer Support**\n- Automated responses with context-aware personalization\n- Ticket triage and prioritization based on urgency\n- Knowledge base management and FAQ generation\n- Multilingual support for global customer bases\n\n### **Business Operations**\n- Process automation for repetitive tasks\n- Meeting summarization and action item extraction\n- Decision support through data-driven recommendations\n- Training material creation for team onboarding\n\nThe versatility of ${entityName} makes it suitable for organizations of all sizes and across all industries. Its ability to handle diverse tasks with high quality makes it a valuable addition to any AI toolkit.`;
}

function generateAlternativesMock(entity: any, entityName: string): string {
  return `## Alternatives\n\nWhile ${entityName} is a top-tier AI agent, several alternatives merit consideration:\n\n### **Claude (Anthropic)**\n- **Strengths:** Constitutional AI principles, excellent reasoning capabilities, long context windows\n- **Best for:** Safety-critical applications, long-form analysis, complex reasoning tasks\n- **Pricing:** Similar tiered structure with competitive pricing\n\n### **Perplexity AI**\n- **Strengths:** Real-time web search, citation-focused responses, research-oriented features\n- **Best for:** Research-heavy tasks requiring current information verification\n- **Pricing:** Freemium model with pro tiers for advanced users\n\n### **Cursor**\n- **Strengths:** IDE-integrated workflow, code-focused capabilities, rapid prototyping\n- **Best for:** Dedicated programming workflows and development teams\n- **Pricing:** Tiered based on usage with free tier for individual developers\n\n### **Gemini (Google)**\n- **Strengths:** Google ecosystem integration, multimodal capabilities, powerful search features\n- **Best for:** Workspace users, organizations already in Google ecosystem\n- **Pricing:** Freemium with enterprise options for large-scale deployments\n\n### **Bard**\n- **Strengths:** Integration with Google services, creative assistance, multilingual support\n- **Best for:** Content creation and communication enhancement\n- **Pricing:** Free tier with optional premium features\n\nChoosing the right AI agent depends on specific needs, existing toolchain, and budget. ${entityName} stands out for its balance of capabilities and ease of use, making it an excellent general-purpose choice.`;
}

function generateFaqMock(entity: any, entityName: string): string {
  return `## Frequently Asked Questions\n\n### **Q: What are the system requirements for using ${entityName}?**\nA: ${entityName} is primarily cloud-based, requiring only a modern web browser or mobile app for most features. For on-premise deployments, specific technical requirements depend on the chosen deployment model and scale of usage.\n\n### **Q: How does ${entityName} compare to ChatGPT and other AI assistants?**\nA: ${entityName} distinguishes itself through deeper agentic capabilities, broader tool integration, and more flexible deployment options compared to general-purpose assistants. The platform is optimized for specialized workflows and enterprise use cases.\n\n### **Q: Is my data secure on ${entityName}?**\nA: Yes, ${entityName} employs industry-standard encryption, complies with GDPR and other major data protection regulations, and offers data processing agreements for enterprise customers. Data privacy and security are core design principles.\n\n### **Q: Can I use ${entityName} offline?**\nA: Basic features may work offline depending on deployment, but full functionality requires internet connectivity for AI model inference and cloud-based services.\n\n### **Q: What kind of support is available?**\nA: Support tiers range from community forums and knowledge base to 24/7 dedicated assistance for enterprise deployments. The support team provides documentation, tutorials, and direct help for critical issues.\n\n### **Q: How often are models and features updated?**\nA: ${entityName} receives regular updates, with significant model improvements typically announced quarterly. Feature enhancements and capability additions are released continuously based on user feedback and technological advances.\n\n### **Q: Can I customize the AI for my specific needs?**\nA: Enterprise customers can access customization options including fine-tuning on proprietary data, custom workflows, and domain-specific configurations tailored to organizational requirements.\n\n### **Q: What's the refund policy for paid plans?**\n*A: Refund policies vary by subscription type and geographic region. Check the official terms for details specific to your account and location.*`;
}

function generateConclusionMock(entity: any, entityName: string): string {
  return `## Conclusion\n\n${entityName} stands as a formidable contender in the AI agent landscape, offering a compelling blend of advanced capabilities, user-friendly design, and flexible deployment options. Its strong performance across coding, research, and creative tasks makes it a versatile tool suitable for a wide range of applications.\n\nThe agent's pricing structure provides options for individuals, small teams, and large enterprises, ensuring accessibility across different budget levels. While alternatives exist, few match ${entityName}'s balance of features and ease of use.\n\nFor organizations seeking to implement AI technology, ${entityName} represents a solid choice that can scale alongside growing needs. The combination of powerful AI capabilities, extensive integrations, and strong security practices makes it particularly attractive for enterprise deployments.\n\nWe recommend ${entityName} for anyone looking for a comprehensive, reliable AI agent that can truly augment human capabilities and drive productivity. The platform's commitment to continuous improvement ensures users benefit from the latest advances in AI technology.`;
}

// ============================================================
// Comparison-specific mock functions
// ============================================================

function generateIntroComparisonMock(entity: any, entityName: string, nameA: string, nameB: string): string {
  return `## Introduction\n\nIn the competitive landscape of AI agents, choosing between ${nameA} and ${nameB} can be a critical decision for teams and organizations. Both platforms have established themselves as leading solutions, each excelling in different areas that make direct comparison essential for informed decision-making.\n\nThis comprehensive comparison examines ${entityName}, providing an in-depth analysis of their capabilities, pricing, integrations, and ideal use cases. Our evaluation is based on extensive hands-on testing, user feedback analysis, and technical benchmarking conducted across multiple real-world scenarios and industry contexts.\n\nWhether you're a developer seeking the best coding assistant, a business looking for workflow automation, or an enterprise evaluating platform scalability, this comparison will help you understand which agent aligns best with your specific requirements and organizational constraints.`;
}

function generateOverviewTableMock(entity: any, nameA: string, nameB: string): string {
  return `## Feature Comparison Table\n\n| Feature | ${nameA} | ${nameB} | Winner |\n|---------|---------|---------|--------|\n| Overall Score | 9.5/10 | 9.6/10 | ${nameA === 'ChatGPT' ? 'Claude' : nameB} |\n| Pricing | $20/mo | $20/mo | Tie |\n| Code Generation | Excellent | Excellent | ${nameB.includes('Claude') ? 'Claude (specialized)' : nameA} |\n| Multi-modal | Strong | Good | ${nameA} |\n| Integration | 300+ apps | 200+ apps | ${nameA} |\n| Context Window | 1M tokens | 200K tokens | ${nameA} |\n\nThis table provides a quick overview of key dimensions. Detailed analysis in following sections reveals nuanced trade-offs that may favor one platform over the other depending on your specific use case.`;
}

function generateDetailedComparisonMock(entity: any, nameA: string, nameB: string): string {
  return `## Detailed Feature-by-Feature Comparison\n\n### **Core Reasoning Capabilities**\nBoth ${nameA} and ${nameB} excel in complex reasoning tasks, but they approach problems differently. ${nameA} uses a sophisticated transformer architecture optimized for multi-step reasoning, while ${nameB} employs constitutional AI principles that emphasize safety and alignment.\n\nFor coding tasks, ${nameA} generally outperforms with its repository-aware context and real-time execution capabilities. ${nameB} shines in document analysis with longer, more coherent responses and better handling of ambiguous queries.\n\n### **Tool Use and API Integration**\n${nameA} offers extensive API integrations with hundreds of pre-built connectors, making it ideal for enterprise workflows with existing toolchains. ${nameB} provides robust API access but with a focus on developer-friendly documentation and simpler integration patterns.\n\n### **Context Window and Memory**\n${nameA} leverages a 1 million token context window for document analysis, significantly exceeding competitors. ${nameB} offers a 200K token context with excellent memory persistence across sessions.\n\n### **Ease of Use and Developer Experience**\n${nameA} provides a polished web interface and desktop apps with minimal setup required. ${nameB} offers command-line tools and API-first approach that developers often prefer for integration.\n\n### **Pricing and Value**\nBoth platforms offer similar pricing tiers, but ${nameB}'s pay-as-you-go API offers better value for sporadic usage, while ${nameA}'s structured plans suit consistent heavy usage.\n\nEach platform has distinct advantages depending on your workflow priorities and technical requirements.`;
}

function generateHeadToHeadMock(entity: any, nameA: string, nameB: string): string {
  return `## Head-to-Head Scenario Analysis\n\n### **Scenario 1: Software Development Workflow**\n**Winner: ${nameA.includes('ChatGPT') || nameA.includes('Code') ? nameA : nameB}**\nFor software development involving code generation, debugging, and repository navigation, both platforms excel. ${nameA} has superior repository indexing and can execute code in a sandboxed environment. ${nameB} offers excellent reasoning for complex algorithmic problems and has specialized models for coding tasks.\n\n### **Scenario 2: Research Assistant**\n**Winner: ${nameB.includes('Claude') ? nameB : nameA}**\nWhen conducting literature reviews or analyzing long documents, ${nameB} demonstrates superior comprehension of lengthy texts and better citation handling. ${nameA} excels at synthesizing information from diverse sources but may struggle with very long context processing.\n\n### **Scenario 3: Customer Support Automation**\n**Winner: ${nameA}**\nFor customer support workflows requiring integration with CRM systems and knowledge bases, ${nameA}'s extensive tool ecosystem and web capabilities provide better out-of-the-box solutions. ${nameB} works well for simpler support tasks but may require more custom configuration.\n\n### **Scenario 4: Content Creation**\n**Winner: Tie (context-dependent)**\n${nameA} excels at multi-modal content creation including images and documents. ${nameB} produces more consistent long-form content with better structural coherence. The choice depends on whether you prioritize creativity (nameA) or consistency (nameB).\n\n### **Scenario 5: Data Analysis**\n**Winner: ${nameA.includes('ChatGPT') ? nameA : nameB}**\nFor data analysis workflows, ${nameA} offers superior data visualization capabilities and integration with analytics platforms. ${nameB} provides excellent reasoning for statistical interpretation but may lack some visualization features.\n\nEach scenario presents unique requirements that make the comparison informative for different user personas.`;
}

function generateVerdictMock(entity: any, nameA: string, nameB: string): string {
  return `## Final Verdict and Recommendation Matrix\n\n### **When to Choose ${nameA}**\nChoose ${nameA} if your primary requirements include:\n- Extensive tool integration with existing workflows\n- Multi-modal capabilities for diverse content types\n- Enterprise-grade security features and compliance\n- Repository-aware coding assistance with execution\n- Larger context window for document analysis\n\n### **When to Choose ${nameB}**\nChoose ${nameB} if your needs emphasize:\n- Cost-effective API usage with pay-as-you-go model\n- Superior reasoning and safety for critical applications\n- Excellent long-context document processing\n- Strong performance in coding and technical tasks\n- Developer-friendly tooling and documentation\n\n### **Recommendation Matrix**\n| Use Case | Recommended Platform | Reason |\n|----------|---------------------|--------|\n| Enterprise Development | ${nameA.includes('ChatGPT') ? 'ChatGPT' : nameA} | Tool ecosystem |\n| Developer Coding | ${nameB.includes('Claude') ? 'Claude' : nameB} | Code accuracy |\n| Research Analysis | ${nameB.includes('Claude') ? 'Claude' : nameB} | Long context |\n| Customer Support | ${nameA.includes('ChatGPT') ? 'ChatGPT' : nameA} | Integration |\n\nThe final choice should align with your specific workflow patterns, team expertise, and organizational constraints.`;
}

function generateComparisonMock(entity: any, entityName: string, nameA: string, nameB: string): string {
  return `## Detailed Comparison: ${nameA} vs ${nameB}\n\nWhen evaluating these two AI agents, the decision matrix becomes clear when considering specific requirements:\n\n### **Technical Capabilities Comparison**\n| Capability | ${nameA} | ${nameB} | Notes |\n|----------|---------|---------|-------|\n| Reasoning Depth | 9.5/10 | 9.6/10 | Claude leads in safety |\n| Coding Features | 9.4/10 | 9.2/10 | ChatGPT excels in execution |\n| Context Window | 1M tokens | 200K tokens | Significant advantage |\n| Multi-modal | Strong | Good | Images, code, docs |\n| API Integration | 300+ apps | 200+ apps | ChatGPT broader |\n\n### **Business Considerations**\n- **Pricing**: Both similar at $20/mo tier, but Claude's API is cheaper per token\n- **Enterprise**: ChatGPT has more established enterprise features\n- **Support**: Both offer dedicated enterprise channels\n- **Compliance**: ChatGPT has more established compliance certifications\n\n${nameA} tends to win for integration-heavy workflows, while ${nameB} excels in safety-critical and coding scenarios.`;
}

function generateMarketAnalysisMock(entity: any, entityName: string): string {
  return `## Market Analysis and Industry Trends\n\nThe AI agent market is experiencing unprecedented growth, with ${entityName} positioned at the forefront of this transformation. Current market trends indicate several key developments:\n\n### **Key Market Drivers**\n- **Enterprise AI Adoption:** Organizations are increasingly deploying AI agents for workflow automation, customer service, and decision support.\n- **Developer Integration:** The rise of agentic workflows and LLM-native applications is driving demand for extensible AI platforms.\n- **Multimodal Evolution:** Users expect AI systems that can reason across text, code, images, and data seamlessly.\n\n### **Competitive Landscape**\nThe market remains highly competitive, with major players investing heavily in agent capabilities. ${entityName} has established differentiation through its comprehensive feature set, extensive integration network, and enterprise-grade infrastructure.\n\n### **Growth Projections**\nIndustry analysts project significant growth in AI agent adoption, with estimates suggesting exponential increases in commercial deployments over the next 2-3 years. Key growth areas include:\n- Enterprise automation platforms\n- Code assistance and development workflows\n- Research and analysis tools\n- Customer service automation\n\n${entityName} is well-positioned to capitalize on these trends given its comprehensive capabilities, established ecosystem, and proven track record in enterprise deployments.`;
}

// ============================================================
// End of mock functions
// ============================================================

export async function generateAllSections(
  manifest: any,
  entity: any,
  enriched: any,
  options: GenerationOptions = {}
): Promise<Record<string, string>> {
  const context = buildContext(entity, enriched);
  const results: Record<string, string> = {};

  for (const section of manifest.sections) {
    console.log(`  → Generating section: ${section.id}...`);
    try {
      results[section.id] = await generateSection(section, context, options);
    } catch (err) {
      console.error(`Section ${section.id} failed:`, err);
      results[section.id] = `<p>Error generating this section: ${(err as Error).message}</p>`;
    }
  }

  return results;
}

function buildContext(entity: any, enriched: any): Record<string, any> {
  // Handle both direct entity and comparison with itemA/itemB
  const data = entity.data || {};
  const context: Record<string, any> = {
    entity: data,
    entity_name: data?.title || data?.name || entity.id.split('/')[1],
    entity_slug: entity.id.split('/')[1],
    entity_type: entity.type,
    ...enriched?.enrichment
  };
  
  // For comparison entities, pass the full entity data
  if (data?.itemA && data?.itemB) {
    context.itemA = data.itemA;
    context.itemB = data.itemB;
  }
  
  return context;
}