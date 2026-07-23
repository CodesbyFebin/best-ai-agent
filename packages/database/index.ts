import { featuredAgents, Agent } from '../../src/data/agents';
import { featuredCategories, Category } from '../../src/data/categories';
import { featuredComparisons, Comparison } from '../../src/data/comparisons';
import { researchReports, ResearchReport } from '../../src/data/research';

export function getAllAgentsFromDb(): Agent[] {
  return featuredAgents;
}

export function getAgentBySlugFromDb(slug: string): Agent | undefined {
  return featuredAgents.find(a => a.slug === slug || a.id === slug);
}

export function getAllCategoriesFromDb(): Category[] {
  return featuredCategories;
}

export function getCategoryBySlugFromDb(slug: string): Category | undefined {
  return featuredCategories.find(c => c.slug === slug || c.id === slug);
}

export function getAllComparisonsFromDb(): Comparison[] {
  return featuredComparisons;
}

export function getComparisonBySlugFromDb(pairSlug: string): Comparison | undefined {
  return featuredComparisons.find(c => c.pairSlug === pairSlug || c.itemA.slug + '-vs-' + c.itemB.slug === pairSlug);
}

export function getAllResearchReportsFromDb(): ResearchReport[] {
  return researchReports;
}
