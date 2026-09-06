// Pravaah Antigravity Backend API Service Layer

export interface AgentSetupConfig {
  focusAreas: string[];
  threshold: number;
}

export interface IntelligenceFeedItem {
  id: string;
  title: string;
  category: string;
  source: 'arXiv' | 'GitHub' | 'HuggingFace' | 'TechCrunch';
  depthScore: number; // 0 to 100
  confidence: number; // 0 to 100
  summary: string;
  systemRationale: string; // "Why the AI selected this"
  fullAnalysis: string;
  tags: string[];
  timestamp: string;
  url: string;
  authorOrRepo?: string;
}

export interface AuditLogItem {
  id: string;
  topic: string;
  category: string;
  source: string;
  status: 'APPROVED' | 'REJECTED';
  noveltyScore: number; // 0.00 to 1.00
  signalToNoiseRatio: number; // 0.00 to 1.00
  threshold: number;
  rejectionReason?: string;
  timestamp: string;
}

export interface TelemetryStats {
  autonomousLoopStatus: 'ACTIVE' | 'RESEARCHING' | 'SYNTHESIZING' | 'IDLE';
  activeMemoryVectors: number;
  intelligenceVelocity: number; // topics per hour
  avgLatencyMs: number;
  totalDataNodes: number;
  currentStage: 'Discovery' | 'Evaluation' | 'Research & Memory' | 'Publishing';
  lastCycleTimestamp: string;
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  category: string;
  x: number;
  y: number;
  connections: string[];
  depthScore: number;
  details: string;
}

export interface KnowledgeGraphResponse {
  nodes: KnowledgeGraphNode[];
  totalVectors: number;
  dimension: string;
  latencyMs: number;
}

export interface FlowStatusResponse {
  loopStatus: string;
  currentStage: string;
  lastCycleTimestamp: string;
  recentLogs: string[];
}

const BACKEND_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:8000';

// Mock Data Store for Fallback Preview Mode
export const MOCK_FEED: IntelligenceFeedItem[] = [
  {
    id: 'feed-101',
    title: 'DeepSeek-V3 Technical Architecture: Multi-Head Latent Attention & Mixture of Experts',
    category: 'LLMs',
    source: 'arXiv',
    depthScore: 98,
    confidence: 96,
    summary: 'A groundbreaking open-weights model utilizing Multi-Head Latent Attention (MLA) and DeepSeekMoE architecture to dramatically reduce KV cache memory overhead during long-context inference.',
    systemRationale: 'Extremely high technical novelty (0.96) and signal-to-noise ratio. Solves KV cache memory bottleneck for large-scale open AI deployments.',
    fullAnalysis: 'DeepSeek-V3 introduces a novel Multi-Head Latent Attention (MLA) design that compresses Key-Value cache into low-rank latent vectors. Combined with DeepSeekMoE architecture featuring fine-grained experts and auxiliary loss-free load balancing, it achieves state-of-the-art inference efficiency on 671B parameters.',
    tags: ['MLA', 'MoE', 'KV-Cache', 'Transformer', 'Open-Weights'],
    timestamp: '12 mins ago',
    url: 'https://arxiv.org/abs/2412.19437',
    authorOrRepo: 'DeepSeek AI Research Team'
  },
  {
    id: 'feed-102',
    title: 'FlashAttention-3: Fast and Memory-Efficient Exact Attention with Asynchronous FP8 Exec',
    category: 'Autonomous Agents',
    source: 'GitHub',
    depthScore: 94,
    confidence: 92,
    summary: 'Optimized GPU kernel execution using warp-specialized instruction pipelines and FP8 low-precision tensor core operations to double throughput on Hopper architectures.',
    systemRationale: 'Direct hardware speedup breakthrough for LLM agent loops. Passes depth criteria with high hardware benchmark validation.',
    fullAnalysis: 'FlashAttention-3 leverages asynchronous data movement between GMEM and SMEM, overlapping GEMM and softmax calculations. On NVIDIA H100 GPUs, FP8 FlashAttention-3 reaches up to 1.2 PFLOPS, a 1.8x speedup over FlashAttention-2.',
    tags: ['CUDA', 'Hopper', 'FP8', 'GPU Kernels', 'Performance'],
    timestamp: '42 mins ago',
    url: 'https://github.com/Dao-AILab/flash-attention',
    authorOrRepo: 'Dao-AILab / Tri Dao'
  },
  {
    id: 'feed-103',
    title: 'Self-Evolving Agentic Memory: Dynamic Graph Structuring for Long-Horizon Reasoning',
    category: 'Autonomous Agents',
    source: 'HuggingFace',
    depthScore: 91,
    confidence: 89,
    summary: 'An autonomous memory decay and reinforcement paradigm using semantic vector graphs to eliminate context degradation in multi-step AI reasoning loops.',
    systemRationale: 'Directly addresses long-term memory loss in agentic workflows. Replaced static context windows with dynamic graph nodes.',
    fullAnalysis: 'This paper introduces dynamic temporal graph memory (DTGM) where nodes represent agent experience abstractions and edges model causal relationships. Forgotten nodes are compressed into hierarchical summaries, maintaining O(1) retrieval time.',
    tags: ['Memory Graphs', 'Agent Architecture', 'Semantic Search', 'Vector Index'],
    timestamp: '2 hours ago',
    url: 'https://huggingface.org/papers',
    authorOrRepo: 'Stanford AI & Pravaah Synthesis'
  },
  {
    id: 'feed-104',
    title: 'Quantum-Assisted Variational Circuit Optimization for Neural Network Quantization',
    category: 'Quantum Computing',
    source: 'arXiv',
    depthScore: 88,
    confidence: 87,
    summary: 'Applying noisy intermediate-scale quantum (NISQ) algorithms to search parameter space for optimal 2-bit weight quantization in edge neural networks.',
    systemRationale: 'High cross-disciplinary novelty connecting quantum optimization with edge AI quantization.',
    fullAnalysis: 'Presents a hybrid quantum-classical algorithm using parameterized quantum circuits (PQCs) to solve NP-hard integer optimization problems inherent in extreme 1-bit and 2-bit weight quantization.',
    tags: ['Quantum Circuits', 'NISQ', 'Edge AI', 'Quantization'],
    timestamp: '3 hours ago',
    url: 'https://arxiv.org',
    authorOrRepo: 'MIT Quantum & AI Lab'
  },
  {
    id: 'feed-105',
    title: 'Multimodal Spatial grounding via Real-time Video Token Compression',
    category: 'Multimodal AI',
    source: 'TechCrunch',
    depthScore: 85,
    confidence: 90,
    summary: 'Real-time spatial grounding model capable of processing 120 FPS video streams on edge hardware with 15ms latency.',
    systemRationale: 'High market relevance and validated real-time visual spatial reasoning application.',
    fullAnalysis: 'By compressing spatio-temporal video tokens using adaptive visual token pruning, the model maintains high object tracking precision while reducing compute payload by 75%.',
    tags: ['Computer Vision', 'Video Tokens', 'Spatial AI', 'Robotics'],
    timestamp: '5 hours ago',
    url: 'https://techcrunch.com',
    authorOrRepo: 'Vision-AI Labs'
  }
];

export const MOCK_AUDIT_LOG: AuditLogItem[] = [
  {
    id: 'audit-001',
    topic: 'DeepSeek-V3 Multi-Head Latent Attention Architecture',
    category: 'LLMs',
    source: 'arXiv:2412.19437',
    status: 'APPROVED',
    noveltyScore: 0.96,
    signalToNoiseRatio: 0.94,
    threshold: 0.75,
    timestamp: '2026-08-08 20:15:00 UTC'
  },
  {
    id: 'audit-002',
    topic: '10 General Tips for Prompting ChatGPT in 2026',
    category: 'LLMs',
    source: 'Medium / TechBlog',
    status: 'REJECTED',
    noveltyScore: 0.12,
    signalToNoiseRatio: 0.18,
    threshold: 0.75,
    rejectionReason: 'High Noise / Repetitive content (0.18 < 0.75 threshold). Lacks technical depth or architectural novelty.',
    timestamp: '2026-08-08 19:48:12 UTC'
  },
  {
    id: 'audit-003',
    topic: 'FlashAttention-3 Hopper FP8 Execution Benchmarks',
    category: 'Autonomous Agents',
    source: 'GitHub:Dao-AILab/flash-attention',
    status: 'APPROVED',
    noveltyScore: 0.92,
    signalToNoiseRatio: 0.91,
    threshold: 0.75,
    timestamp: '2026-08-08 19:12:44 UTC'
  },
  {
    id: 'audit-004',
    topic: 'Basic Python Script to Query OpenAI API',
    category: 'Developer Tools',
    source: 'GitHub Trending',
    status: 'REJECTED',
    noveltyScore: 0.05,
    signalToNoiseRatio: 0.10,
    threshold: 0.75,
    rejectionReason: 'Trivial tutorial code with 0 architectural impact. Filtered by noise discriminator.',
    timestamp: '2026-08-08 18:30:00 UTC'
  },
  {
    id: 'audit-005',
    topic: 'Self-Evolving Agentic Memory Dynamic Graph Structuring',
    category: 'Autonomous Agents',
    source: 'HuggingFace Papers',
    status: 'APPROVED',
    noveltyScore: 0.91,
    signalToNoiseRatio: 0.88,
    threshold: 0.75,
    timestamp: '2026-08-08 17:55:10 UTC'
  },
  {
    id: 'audit-006',
    topic: 'AI Generated Image of Cyberpunk City #4920',
    category: 'Generative Art',
    source: 'Reddit r/ArtificialIntelligence',
    status: 'REJECTED',
    noveltyScore: 0.22,
    signalToNoiseRatio: 0.14,
    threshold: 0.75,
    rejectionReason: 'Non-technical visual art content without algorithmic contribution.',
    timestamp: '2026-08-08 17:10:05 UTC'
  }
];

export const MOCK_TELEMETRY: TelemetryStats = {
  autonomousLoopStatus: 'ACTIVE',
  activeMemoryVectors: 84920,
  intelligenceVelocity: 14.2,
  avgLatencyMs: 320,
  totalDataNodes: 1402,
  currentStage: 'Research & Memory',
  lastCycleTimestamp: 'Just now'
};

export const MOCK_GRAPH_NODES: KnowledgeGraphNode[] = [
  {
    id: 'n1',
    label: 'DeepSeek-V3',
    category: 'LLM Architecture',
    x: 400,
    y: 250,
    connections: ['n2', 'n3', 'n5'],
    depthScore: 98,
    details: 'Open-weights 671B MoE model featuring Multi-Head Latent Attention (MLA) to optimize KV cache footprint.'
  },
  {
    id: 'n2',
    label: 'FlashAttention-3',
    category: 'GPU Kernels',
    x: 220,
    y: 150,
    connections: ['n1', 'n4'],
    depthScore: 94,
    details: 'Asynchronous FP8 matrix multiplication kernel for NVIDIA Hopper H100 architecture.'
  },
  {
    id: 'n3',
    label: 'Agentic Memory Graphs',
    category: 'Agent Memory',
    x: 600,
    y: 180,
    connections: ['n1', 'n5', 'n6'],
    depthScore: 91,
    details: 'Dynamic temporal graph memory structure preserving O(1) multi-turn retrieval efficiency.'
  },
  {
    id: 'n4',
    label: 'FP8 Quantization',
    category: 'Precision',
    x: 150,
    y: 340,
    connections: ['n2'],
    depthScore: 88,
    details: 'Low-precision 8-bit floating point matrix formats accelerating GPU tensor throughput.'
  },
  {
    id: 'n5',
    label: 'Sparse MoE Routing',
    category: 'Model Scaling',
    x: 520,
    y: 380,
    connections: ['n1', 'n3'],
    depthScore: 95,
    details: 'Auxiliary-loss-free expert selection routing 37B active parameters per token.'
  },
  {
    id: 'n6',
    label: 'HNSW Vector Index',
    category: 'Database',
    x: 720,
    y: 320,
    connections: ['n3'],
    depthScore: 90,
    details: 'Hierarchical Navigable Small World graph index managing 84.9k embedding vectors in real time.'
  }
];

/**
 * Sends one-time setup initialization to Antigravity Backend (POST /init)
 */
export async function initializeAgent(config: AgentSetupConfig): Promise<{ success: boolean; message: string; data?: any }> {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/init`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config)
    });
    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }
    const data = await res.json();
    return { success: true, message: 'Agent initialized successfully on backend', data };
  } catch (err) {
    console.warn('Antigravity backend API offline or unreachable. Using active mock initialization session.', err);
    return {
      success: true,
      message: `PRAVAAH Agent Initialized! Focus Areas: [${config.focusAreas.join(', ')}], Signal Threshold: ${config.threshold}`
    };
  }
}

/**
 * Fetches Live Intelligence Feed (GET /feed)
 */
export async function fetchIntelligenceFeed(): Promise<IntelligenceFeedItem[]> {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/feed`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.log('Using simulated intelligence feed telemetry stream.');
  }
  return MOCK_FEED;
}

/**
 * Triggers manual feed discovery scan on backend (POST /feed/trigger)
 */
export async function triggerFeedScan(): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/feed/trigger`, { method: 'POST' });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend trigger endpoint unreachable', err);
  }
  return { success: true, message: 'Discovery scan triggered locally (mock mode).' };
}

/**
 * Fetches Editorial Audit Log (GET /audit)
 */
export async function fetchEditorialAuditLog(): Promise<AuditLogItem[]> {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/audit`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.log('Using simulated audit log telemetry stream.');
  }
  return MOCK_AUDIT_LOG;
}

/**
 * Fetches Live Telemetry Stats (GET /telemetry)
 */
export async function fetchTelemetryStats(): Promise<TelemetryStats> {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/telemetry`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.log('Using simulated telemetry status.');
  }
  return MOCK_TELEMETRY;
}

/**
 * Fetches Knowledge Graph Nodes & Vector Stats (GET /knowledge-graph)
 */
export async function fetchKnowledgeGraph(): Promise<KnowledgeGraphResponse> {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/knowledge-graph`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.log('Using simulated knowledge graph.');
  }
  return {
    nodes: MOCK_GRAPH_NODES,
    totalVectors: MOCK_TELEMETRY.activeMemoryVectors,
    dimension: '1,536-d',
    latencyMs: MOCK_TELEMETRY.avgLatencyMs
  };
}

/**
 * Fetches 4-Stage AI Pipeline execution status and logs (GET /flow/status)
 */
export async function fetchFlowStatus(): Promise<FlowStatusResponse> {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/flow/status`);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.log('Using simulated flow status.');
  }
  return {
    loopStatus: 'ACTIVE',
    currentStage: 'Research & Memory',
    lastCycleTimestamp: new Date().toISOString(),
    recentLogs: [
      `[${new Date().toISOString()}] Discovery Stage: Scanned arXiv repository stream.`,
      `[${new Date().toISOString()}] Evaluation Stage: Signal-to-noise ratio evaluated.`,
      `[${new Date().toISOString()}] Memory Stage: Vector embeddings mapped to HNSW graph.`
    ]
  };
}

/**
 * Triggers full 4-stage AI pipeline cycle on demand (POST /flow/run)
 */
export async function runFlowCycle(): Promise<{ success: boolean; message: string; telemetry?: TelemetryStats }> {
  try {
    const res = await fetch(`${BACKEND_BASE_URL}/flow/run`, { method: 'POST' });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend run flow endpoint unreachable', err);
  }
  return { success: true, message: '4-Stage AI Pipeline cycle completed locally (mock mode).' };
}

/**
 * Subscribes to Server-Sent Events (SSE) telemetry stream (GET /telemetry/stream)
 */
export function subscribeTelemetryStream(
  onData: (data: { telemetry: TelemetryStats; logs: string[] }) => void,
  onError?: (err: any) => void
): () => void {
  if (typeof window === 'undefined') return () => {};
  try {
    const eventSource = new EventSource(`${BACKEND_BASE_URL}/telemetry/stream`);
    eventSource.onmessage = (event) => {
      try {
        const parsed = JSON.parse(event.data);
        onData(parsed);
      } catch (e) {
        console.error('Failed to parse SSE payload', e);
      }
    };
    eventSource.onerror = (err) => {
      if (onError) onError(err);
      eventSource.close();
    };
    return () => eventSource.close();
  } catch (err) {
    console.warn('SSE EventSource failed to initialize', err);
    return () => {};
  }
}

