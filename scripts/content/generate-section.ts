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
  const sectionId = section.id;

  const mockTemplates: Record<string, string> = {
    'overview': `## Overview\n\n${entityName} is a powerful AI agent developed by ${context.entity?.company || 'its parent company'}. It represents a significant advancement in artificial intelligence technology, offering capabilities that span multiple domains including coding, research, and creative tasks.\n\nThe agent leverages state-of-the-art language models to understand and respond to user queries with high accuracy. Its architecture is designed for scalability and reliability, making it suitable for both individual users and enterprise deployments.\n\nWith a focus on user experience, ${entityName} provides an intuitive interface that allows users to harness the power of AI without requiring extensive technical knowledge. This democratization of AI technology is one of its core strengths.\n\n## Key Features\n\n- Advanced natural language processing\n- Multi-modal capabilities\n- Contextual understanding\n- Real-time collaboration\n- Extensive integration options\n- Robust security measures\n- Scalable infrastructure\n\nThese features combine to create a versatile AI agent that can adapt to various use cases and industries.`,
    
    'key-features': `## Key Features\n\n${entityName} boasts an impressive array of features that set it apart in the competitive AI landscape:\n\n### 1. Natural Language Understanding\nPowered by cutting-edge transformer models, ${entityName} excels at comprehending complex queries and providing accurate, context-aware responses.\n\n### 2. Multi-Modal Processing\nThe agent can process and generate text, images, and code, making it a truly versatile tool for creative and analytical tasks.\n\n### 3. Agentic Capabilities\nPerhaps most notably, ${entityName} can act autonomously to complete multi-step workflows, reducing the need for constant human oversight.\n\n### 4. Extensive Tool Ecosystem\nWith hundreds of integrations, ${entityName} connects seamlessly with popular platforms and services, enhancing its utility across different domains.\n\n### 5. Enterprise-Grade Security\nSecurity is a top priority, with features like end-to-end encryption, role-based access control, and compliance with major data protection regulations.\n\nThese features make ${entityName} a comprehensive solution for organizations looking to leverage AI technology.`,
    
    'pricing': `## Pricing\n\n${entityName} offers flexible pricing options to accommodate various needs and budgets:\n\n- **Free Tier**: Includes access to basic features with usage limits, perfect for individuals and small projects.\n- **Plus/Pro Tier**: At approximately $20/month, unlocks advanced capabilities including higher usage limits and priority support.\n- **Enterprise Tier**: Custom pricing based on specific requirements, offering dedicated support, custom integrations, and SLA guarantees.\n\nThe pricing structure is designed to scale with usage, ensuring that customers only pay for what they need while having clear upgrade paths as requirements grow.\n\nWhen compared to competitors, ${entityName}'s pricing is competitive given the breadth of features and quality of service. The freemium model allows organizations to test the platform before committing financially.\n\n## Value Proposition\n\nThe combination of powerful features and reasonable pricing makes ${entityName} an attractive option for both individual creators and enterprise customers.`,
    
    'pros-cons': `## Pros and Cons\n\n### **Pros:**\n\n1. **Extensive Feature Set** - Comprehensive AI capabilities covering text, code, and multi-modal inputs\n2. **User-Friendly Interface** - Intuitive design that requires minimal training\n3. **Strong Performance** - Consistently high accuracy and response times\n4. **Active Development** - Regular updates and feature improvements\n5. **Good Documentation** - Extensive resources for learning and troubleshooting\n6. **Scalable Architecture** - Handles workloads from personal to enterprise scale\n7. **Strong Ecosystem** - Rich marketplace of integrations and extensions\n\n### **Cons:**\n\n1. **Cost at Scale** - Can become expensive for high-volume usage\n2. **Learning Curve** - Advanced features require time to master\n3. **API Rate Limits** - Some tiers have restrictive limits that may impact heavy users\n4. **Data Privacy Concerns** - Some organizations may have reservations about cloud-based AI\n5. **Occasional Inconsistencies** - Like all AI systems, can produce varying quality outputs\n\nOverall, ${entityName} represents excellent value for most use cases, with its advantages significantly outweighing its limitations.`,
    
    'integrations': `## Integrations\n\n${entityName} seamlessly integrates with a wide range of tools and platforms:\n\n### **Development Tools**\n- GitHub, GitLab, Bitbucket\n- VS Code, JetBrains IDEs\n- Jira, Linear, Asana\n- Docker, Kubernetes\n\n### **Productivity Suites**\n- Slack, Microsoft Teams\n- Google Workspace, Office 365\n- Notion, Confluence\n- Zapier, Make\n\n### **Specialized AI Tools**\n- database and analytics platforms\n- Design tools like Figma\n- E-commerce platforms\n- CRM systems\n\nThe integration ecosystem is continuously expanding, with new connectors added regularly based on user feedback and market demand. This extensibility ensures ${entityName} can fit into virtually any existing workflow.\n\n## API Access\n\nFor custom integrations, ${entityName} provides a well-documented REST API and SDKs for popular programming languages, enabling developers to build tailored solutions.`,
    
    'use-cases': `## Use Cases\n\n${entityName} excels across numerous scenarios:\n\n### **Software Development**\n- Code generation and review\n- Bug detection and fixing\n- Documentation creation\n- Architecture design assistance\n\n### **Research & Analysis**\n- Literature review\n- Data analysis\n- Report generation\n- Market research\n\n### **Content Creation**\n- Article drafting\n- Marketing copy\n- Social media content\n- Video scriptwriting\n\n### **Customer Support**\n- Automated responses\n- Ticket triage\n- Knowledge base management\n- Multilingual support\n\n### **Business Operations**\n- Process automation\n- Meeting summarization\n- Decision support\n- Training material creation\n\nThe versatility of ${entityName} makes it suitable for organizations of all sizes and across all industries. Its ability to handle diverse tasks with high quality makes it a valuable addition to any AI toolkit.`,
    
    'alternatives': `## Alternatives\n\nWhile ${entityName} is a top-tier AI agent, several alternatives merit consideration:\n\n### **Claude (Anthropic)**\n- Strengths: Constitutional AI, excellent reasoning, long context\n- Best for: Safety-critical applications, long-form analysis\n- Pricing: Similar tiered structure\n\n### **Perplexity AI**\n- Strengths: Real-time web search, citation focus\n- Best for: Research-heavy tasks requiring current information\n- Pricing: Freemium with pro tiers\n\n### **Cursor**\n- Strengths: IDE-integrated, code-focused\n- Best for: Dedicated programming workflows\n- Pricing: Tiered based on usage\n\n### **Bard/Gemini (Google)**\n- Strengths: Google ecosystem integration\n- Best for: Workspace users, multimodal tasks\n- Pricing: Freemium with enterprise options\n\nChoosing the right AI agent depends on specific needs, existing toolchain, and budget. ${entityName} stands out for its balance of capabilities, making it an excellent general-purpose choice.`,
    
    'faq': `## Frequently Asked Questions\n\n### **Q: What are the system requirements for using ${entityName}?**\nA: ${entityName} is primarily cloud-based, requiring only a modern web browser or mobile app. For on-premise deployments, specific requirements depend on the chosen deployment model.\n\n### **Q: How does ${entityName} compare to ChatGPT?**\nA: While both are advanced AI systems, ${entityName} distinguishes itself through deeper agentic capabilities, broader tool integration, and more flexible deployment options.\n\n### **Q: Is my data secure?**\nA: Yes, ${entityName} employs industry-standard encryption, complies with GDPR and other regulations, and offers data processing agreements for enterprise customers.\n\n### **Q: Can I use ${entityName} offline?**\nA: Basic features may work offline, but full functionality requires internet connectivity for AI model inference.\n\n### **Q: What kind of support is available?**\nA: Support tiers range from community forums to 24/7 dedicated assistance depending on your subscription level.\n\n### **Q: How often are models updated?**\nA: ${entityName} receives regular updates, with major model improvements typically announced quarterly.\n\n### **Q: Can I fine-tune the AI for my specific needs?**\nA: Enterprise customers can access customization options including fine-tuning on proprietary data.\n\n### **Q: What's the refund policy?**\nA: Refund policies vary by subscription type; check the official terms for details.`,
    
    'conclusion': `## Conclusion\n\n${entityName} stands as a formidable contender in the AI agent landscape, offering a compelling blend of advanced capabilities, user-friendly design, and flexible deployment options. Its strong performance across coding, research, and creative tasks makes it a versatile tool suitable for a wide range of applications.\n\nThe agent's pricing structure provides options for individuals, small teams, and large enterprises, ensuring accessibility across different budget levels. While alternatives exist, few match ${entityName}'s balance of features and ease of use.\n\nFor organizations seeking to implement AI technology, ${entityName} represents a solid choice that can scale alongside growing needs. The combination of powerful AI capabilities, extensive integrations, and strong security practices makes it particularly attractive for enterprise deployments.\n\nWe recommend ${entityName} for anyone looking for a comprehensive, reliable AI agent that can truly augment human capabilities and drive productivity.`,
    
    'best-for': `## Best For\n\n${entityName} is particularly well-suited for:\n\n1. **Software Developers** - Code generation, debugging, and documentation\n2. **Researchers** - Literature review, data analysis, and report writing\n3. **Content Creators** - Drafting, editing, and ideation\n4. **Business Analysts** - Data processing and insight generation\n5. **Customer Support Teams** - Automated responses and knowledge management\n6. **Educators** - Lesson planning and personalized tutoring\n7. **Startups** - Rapid prototyping and MVP development\n8. **Enterprise Teams** - Workflow automation and decision support\n\nThe versatility of ${entityName} means it can provide value across virtually any domain that involves information processing or creative work.`,
    
    'comparison': `## Detailed Comparison\n\nWhen compared to competitors, ${entityName} holds its own across key metrics:\n\n| Feature | ${entityName} | Competitor A | Competitor B |\n|---------|--------------|--------------|--------------|\n| Accuracy | 9.5/10 | 9.2/10 | 9.0/10 |\n| Speed | 9.3/10 | 9.0/10 | 8.8/10 |\n| Integration | 9.7/10 | 8.9/10 | 8.5/10 |\n| Pricing | 9.0/10 | 8.5/10 | 9.2/10 |\n| Usability | 9.4/10 | 9.1/10 | 8.7/10 |\n\nThese scores reflect ${entityName}'s strong performance, particularly in integration and usability categories.`,
    
    'market-analysis': `## Market Analysis\n\nThe AI agent market is rapidly evolving, with ${entityName} establishing itself as a leading player. Current trends indicate growing adoption across industries, with particular growth in:\n\n- Enterprise AI deployments\n- Developer tool integration\n- Multimodal AI applications\n- Specialized industry solutions\n\n${entityName} is well-positioned to capitalize on these trends given its comprehensive feature set and strategic partnerships. The agent's ability to handle diverse tasks makes it attractive for organizations looking to consolidate their AI tools.\n\nCompetition remains fierce, but ${entityName}'s combination of capabilities, pricing, and ecosystem support gives it a sustainable competitive advantage.`
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
  return {
    entity: entity.data,
    entity_name: entity.data.name,
    entity_slug: entity.id.split('/')[1],
    entity_type: entity.type,
    ...enriched.enrichment
  };
}
