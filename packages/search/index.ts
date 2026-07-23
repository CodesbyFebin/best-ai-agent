import { featuredAgents, Agent } from '../../src/data/agents';

export interface SearchResult {
  item: Agent;
  matchType: 'name' | 'category' | 'capability' | 'tag';
  relevanceScore: number;
}

export function searchAgents(query: string): SearchResult[] {
  if (!query || query.trim() === '') return [];

  const q = query.toLowerCase().trim();
  const results: SearchResult[] = [];

  featuredAgents.forEach(agent => {
    let score = 0;
    let matchType: 'name' | 'category' | 'capability' | 'tag' = 'tag';

    if (agent.name.toLowerCase().includes(q)) {
      score += 10;
      matchType = 'name';
    } else if (agent.categories.some(c => c.toLowerCase().includes(q))) {
      score += 7;
      matchType = 'category';
    } else if (agent.integrations.some(cap => cap.toLowerCase().includes(q))) {
      score += 5;
      matchType = 'capability';
    } else if (agent.bestFor.some(b => b.toLowerCase().includes(q))) {
      score += 3;
      matchType = 'tag';
    }

    if (score > 0) {
      results.push({
        item: agent,
        matchType,
        relevanceScore: score + agent.score.overall,
      });
    }
  });

  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}
