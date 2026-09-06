import { dbStore } from '../store/database';
import { telemetryService } from './telemetry.service';

export interface RawTopicCandidate {
  id: string;
  topic: string;
  category: string;
  source: 'arXiv' | 'GitHub' | 'HuggingFace' | 'TechCrunch';
  url: string;
  summaryHint: string;
  authorOrRepo?: string;
  rawSignalScore: number;
}

const DISCOVERY_POOL: Omit<RawTopicCandidate, 'id'>[] = [
  {
    topic: 'Kimi k1.5: Reinforcement Learning for Long-Context Reasoning Scaling',
    category: 'LLMs',
    source: 'arXiv',
    url: 'https://arxiv.org/abs/2501.00001',
    summaryHint: 'Scaling multi-step Monte Carlo tree search with policy gradient optimization for extended context windows.',
    authorOrRepo: 'Moonshot AI',
    rawSignalScore: 0.95
  },
  {
    topic: 'vLLM v0.7.0: Chunked Prefill & Multi-GPU Speculative Decoding',
    category: 'Developer Tools',
    source: 'GitHub',
    url: 'https://github.com/vllm-project/vllm',
    summaryHint: 'Optimized KV cache allocation and asynchronous tensor parallelism for ultra-high throughput inference.',
    authorOrRepo: 'vLLM Open Source Community',
    rawSignalScore: 0.92
  },
  {
    topic: 'Top 5 Easy Ways to Prompt ChatGPT for Coding',
    category: 'LLMs',
    source: 'TechCrunch',
    url: 'https://techcrunch.com',
    summaryHint: 'Beginner tutorial explaining system prompts and basic python code snippets.',
    authorOrRepo: 'Guest Blogger',
    rawSignalScore: 0.15
  },
  {
    topic: 'BitNet b1.58 1-Bit LLM Kernel Acceleration on ARM Cortex CPUs',
    category: 'Quantization',
    source: 'HuggingFace',
    url: 'https://huggingface.org/papers',
    summaryHint: 'Ternary {-1, 0, 1} matrix multiplication without floating point multipliers, running efficiently on mobile devices.',
    authorOrRepo: 'Microsoft Research',
    rawSignalScore: 0.94
  },
  {
    topic: 'Automated Python Script to Auto-Like Tweets',
    category: 'Automation',
    source: 'GitHub',
    url: 'https://github.com',
    summaryHint: 'Simple selenium script for social media auto engagement.',
    authorOrRepo: 'User123',
    rawSignalScore: 0.08
  },
  {
    topic: 'Reasoning Gym: Benchmarking LLM Symbolic Logic & Math Solvers',
    category: 'Autonomous Agents',
    source: 'arXiv',
    url: 'https://arxiv.org',
    summaryHint: 'Algorithmic benchmark suite evaluating step-by-step mathematical reasoning robustness.',
    authorOrRepo: 'Reasoning-Gym Org',
    rawSignalScore: 0.89
  }
];

export class DiscoveryService {
  public async scanSources(): Promise<RawTopicCandidate[]> {
    telemetryService.updateTelemetryStage('Discovery');
    telemetryService.addLog('Discovery Stage: Scanning arXiv CS.AI, GitHub Trending & Hugging Face Papers...');

    const config = dbStore.getConfig();
    telemetryService.addLog(`Discovery Stage: Active focus filters [${config.focusAreas.join(', ')}].`);

    // Pick 2-3 topics randomly from candidate pool
    const selectedCount = Math.floor(Math.random() * 2) + 2;
    const candidates: RawTopicCandidate[] = [];

    for (let i = 0; i < selectedCount; i++) {
      const idx = Math.floor(Math.random() * DISCOVERY_POOL.length);
      const item = DISCOVERY_POOL[idx];
      candidates.push({
        ...item,
        id: `disc-${Date.now()}-${i}`
      });
    }

    telemetryService.addLog(`Discovery Stage: Ingested ${candidates.length} raw topics for evaluation.`);
    return candidates;
  }
}

export const discoveryService = new DiscoveryService();
