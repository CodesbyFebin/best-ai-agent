import { AgentEntity } from '../content-schema';

export interface ScoreWeights {
  easeOfUse: number;
  features: number;
  docs: number;
  integrations: number;
  value: number;
  reliability: number;
  indiaFit: number;
  scalability: number;
}

export const DEFAULT_SCORE_WEIGHTS: ScoreWeights = {
  easeOfUse: 12.5,
  features: 12.5,
  docs: 12.5,
  integrations: 12.5,
  value: 12.5,
  reliability: 12.5,
  indiaFit: 15.0,
  scalability: 10.0,
};

export function calculateWeightedScore(agent: AgentEntity, weights: ScoreWeights = DEFAULT_SCORE_WEIGHTS): number {
  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  if (totalWeight === 0) return agent.score.overall;

  const scoreSum =
    agent.score.reasoning * weights.easeOfUse +
    agent.score.toolUse * weights.features +
    agent.score.speed * weights.docs +
    agent.score.value * weights.value +
    agent.score.reliability * weights.reliability +
    agent.score.indiaFit * weights.indiaFit;

  return Number((scoreSum / totalWeight).toFixed(1));
}
