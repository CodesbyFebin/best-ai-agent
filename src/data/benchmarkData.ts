export interface Benchmark {
  agentId: string;
  metric: 'cost_per_1k_tokens' | 'latency_ms' | 'accuracy_percent' | 'uptime_percent';
  value: number;
  sourceCitationId: string;
  timestamp: string;
}

export const benchmarkData: Benchmark[] = [
  {
    agentId: 'cursor-ai',
    metric: 'latency_ms',
    value: 120,
    sourceCitationId: 'authority-pricing',
    timestamp: '2026-06-12'
  },
  {
    agentId: 'gpt-4o',
    metric: 'cost_per_1k_tokens',
    value: 15,
    sourceCitationId: 'authority-pricing',
    timestamp: '2026-06-12'
  },
  {
    agentId: 'claude-3-5-sonnet',
    metric: 'accuracy_percent',
    value: 92,
    sourceCitationId: 'performance-latency',
    timestamp: '2026-06-12'
  },
  {
    agentId: 'vapi-ai',
    metric: 'uptime_percent',
    value: 99.5,
    sourceCitationId: 'performance-latency',
    timestamp: '2026-06-12'
  },
  {
    agentId: 'retell-ai',
    metric: 'latency_ms',
    value: 85,
    sourceCitationId: 'performance-latency',
    timestamp: '2026-06-12'
  },
  {
    agentId: 'yellow-ai',
    metric: 'cost_per_1k_tokens',
    value: 25,
    sourceCitationId: 'authority-pricing',
    timestamp: '2026-06-12'
  },
  {
    agentId: 'flowise',
    metric: 'uptime_percent',
    value: 98.2,
    sourceCitationId: 'performance-latency',
    timestamp: '2026-06-12'
  },
  {
    agentId: 'dify',
    metric: 'accuracy_percent',
    value: 89,
    sourceCitationId: 'performance-latency',
    timestamp: '2026-06-12'
  },
  {
    agentId: 'github-copilot',
    metric: 'cost_per_1k_tokens',
    value: 10,
    sourceCitationId: 'authority-pricing',
    timestamp: '2026-06-12'
  },
  {
    agentId: 'claude-code',
    metric: 'latency_ms',
    value: 95,
    sourceCitationId: 'performance-latency',
    timestamp: '2026-06-12'
  }
];