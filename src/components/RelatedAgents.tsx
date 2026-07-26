/**
 * RelatedAgents Widget
 *
 * Displays a grid of agents similar to the current agent, based on:
 * - Shared categories (BELONGS_TO edges)
 * - Graph connectivity (SIMILAR_TO edges)
 *
 * Uses the `/api/graph/similar/agent/:slug` endpoint.
 */

import React, { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface RelatedAgent {
  slug: string;
  name: string;
  company: string;
  logo: string;
  score: number;
  similarityScore?: number;
}

interface RelatedAgentsProps {
  agentSlug: string;
  // Optional props for future use
}

export function RelatedAgents({ agentSlug }: RelatedAgentsProps) {
  const [agents, setAgents] = useState<RelatedAgent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!agentSlug) {
      setLoading(false);
      return;
    }

    async function fetchSimilar() {
      try {
        setLoading(true);
        const response = await fetch(`/api/graph/similar/agent/${agentSlug}?limit=5`);
        
        if (!response.ok) {
          if (response.status === 404) {
            setAgents([]);
            return;
          }
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        
        const mapped: RelatedAgent[] = data.similar.map((item: any) => ({
          slug: item.node.data.slug,
          name: item.node.data.name,
          company: item.node.data.company,
          logo: item.node.data.logo,
          score: item.node.data.score?.overall || 0,
          similarityScore: item.similarityScore
        }));

        setAgents(mapped);
      } catch (err: any) {
        console.error('Failed to fetch similar agents:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSimilar();
  }, [agentSlug]);

  if (loading) {
    return (
      <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 shadow-md space-y-4">
        <h3 className="text-base font-bold flex items-center gap-2 text-violet-400 border-b border-slate-800 pb-3">
          <Sparkles className="w-5 h-5" /> Similar Agents
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse flex items-center gap-3 p-3 bg-slate-800 rounded-xl">
              <div className="w-10 h-10 bg-slate-700 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-700 rounded w-3/4" />
                <div className="h-3 bg-slate-600 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    console.warn('RelatedAgents: Could not load similar agents -', error);
    return null; // Silent fail - not critical to page rendering
  }

  if (agents.length === 0) {
    return null; // No similar agents found
  }

  return (
    <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 shadow-md space-y-4">
      <h3 className="text-base font-bold flex items-center gap-2 text-violet-400 border-b border-slate-800 pb-3">
        <Sparkles className="w-5 h-5" /> Similar Agents
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <a
            key={agent.slug}
            href={`/agents/${agent.slug}/`}
            className="flex items-center gap-3 p-3 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors group"
          >
            <img
              src={agent.logo}
              alt={`${agent.company} logo`}
              className="w-10 h-10 rounded-full object-cover border-2 border-slate-700 group-hover:border-violet-500 transition-colors"
              loading="lazy"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-slate-100 truncate group-hover:text-violet-300 transition-colors">
                {agent.name}
              </h4>
              <p className="text-xs text-slate-400 truncate">{agent.company}</p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-400">{agent.score.toFixed(1)}</span>
                {agent.similarityScore && (
                  <span className="text-[10px] text-slate-500 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-700">
                    {agent.similarityScore} shared
                  </span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default RelatedAgents;
