// Types for PRAVAAH Intelligence Platform Backend

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
  systemRationale: string;
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

export interface PipelineStageEvent {
  stage: 'Discovery' | 'Evaluation' | 'Research & Memory' | 'Publishing';
  timestamp: string;
  message: string;
  data?: any;
}
