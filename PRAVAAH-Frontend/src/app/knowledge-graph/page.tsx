'use client';

import React, { useState, useEffect } from 'react';
import KnowledgeGraphViewer from '@/components/KnowledgeGraphViewer';
import { fetchKnowledgeGraph, KnowledgeGraphNode } from '@/services/api';
import { Database, Network, Cpu, ShieldCheck, Search, Sparkles } from 'lucide-react';

export default function KnowledgeGraphPage() {
  const [nodes, setNodes] = useState<KnowledgeGraphNode[]>([]);
  const [totalVectors, setTotalVectors] = useState<number>(84920);
  const [dimension, setDimension] = useState<string>('1,536-d');
  const [latencyMs, setLatencyMs] = useState<number>(320);

  useEffect(() => {
    const loadGraph = async () => {
      const data = await fetchKnowledgeGraph();
      setNodes(data.nodes);
      setTotalVectors(data.totalVectors);
      setDimension(data.dimension);
      setLatencyMs(data.latencyMs);
    };
    loadGraph();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-pravaah-outline/30 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pravaah-teal/10 border border-pravaah-teal/30 text-pravaah-primary font-mono text-xs mb-2 font-semibold">
            <Network className="w-3.5 h-3.5 text-pravaah-cyan" />
            PERSISTENT SEMANTIC MEMORY
          </div>
          <h1 className="font-sans text-3xl font-bold text-pravaah-text">
            Agent Memory Knowledge Graph (/knowledge-graph)
          </h1>
          <p className="font-mono text-xs text-pravaah-muted/70 mt-1">
            Visual vector graph memory structure allowing O(1) semantic context matching across research papers.
          </p>
        </div>

        {/* Telemetry pill */}
        <div className="flex items-center gap-3 bg-pravaah-lowest border border-pravaah-outline/40 px-4 py-2.5 rounded-xl font-mono text-xs text-pravaah-cyan">
          <Database className="w-4 h-4 text-pravaah-teal" />
          <span>{totalVectors.toLocaleString()} Vectors Indexed</span>
        </div>
      </div>

      {/* Vector DB Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="surface-card p-5 rounded-xl border border-pravaah-outline/40 flex flex-col gap-2">
          <span className="font-mono text-xs text-pravaah-muted uppercase">Embedding Dimension</span>
          <span className="font-sans text-2xl font-bold text-pravaah-text">{dimension} (Dense Vector)</span>
          <span className="font-mono text-[11px] text-pravaah-primary">Normalized Cosine Metric</span>
        </div>

        <div className="surface-card p-5 rounded-xl border border-pravaah-outline/40 flex flex-col gap-2">
          <span className="font-mono text-xs text-pravaah-muted uppercase">Search Query Latency</span>
          <span className="font-sans text-2xl font-bold text-pravaah-text">{latencyMs} ms</span>
          <span className="font-mono text-[11px] text-pravaah-cyan">HNSW Graph Traversal</span>
        </div>

        <div className="surface-card p-5 rounded-xl border border-pravaah-outline/40 flex flex-col gap-2">
          <span className="font-mono text-xs text-pravaah-muted uppercase">Memory Nodes Connected</span>
          <span className="font-sans text-2xl font-bold text-pravaah-text">{nodes.length} Entities</span>
          <span className="font-mono text-[11px] text-pravaah-amber">Temporal Graph Structure</span>
        </div>
      </div>

      {/* Interactive Node Graph Canvas Component */}
      <KnowledgeGraphViewer nodes={nodes} />
    </div>
  );
}

