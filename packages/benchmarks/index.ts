export interface BenchmarkTask {
  id: string;
  name: string;
  category: string;
  description: string;
  maxScore: number;
}

export interface BenchmarkResult {
  agentSlug: string;
  taskId: string;
  score: number;
  evaluatedAt: string;
  notes: string;
}

export const BENCHMARK_TASKS: BenchmarkTask[] = [
  { id: 'code-gen-01', name: 'Multi-File TypeScript Refactor', category: 'coding', description: 'Refactors a 15-file repository without introducing type errors.', maxScore: 10 },
  { id: 'reasoning-01', name: 'Complex Multi-Constraint Legal Summarization', category: 'reasoning', description: 'Summarizes a 40-page contract identifying liability risk factors.', maxScore: 10 },
  { id: 'tool-use-01', name: 'REST API & Database Query Tool Call Execution', category: 'tool-use', description: 'Queries an external API and formats SQL upserts accurately.', maxScore: 10 },
  { id: 'voice-01', name: 'Sub-400ms Audio Latency Dialect Handling', category: 'voice', description: 'Sustains smooth speech in Indian English and Hinglish.', maxScore: 10 },
];
