'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Network, Search, Cpu, Database, Sparkles, Layers, CheckCircle2 } from 'lucide-react';

interface GraphNode {
  id: string;
  label: string;
  category: string;
  x: number;
  y: number;
  connections: string[];
  depthScore: number;
  details: string;
}

const NODES: GraphNode[] = [
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

interface KnowledgeGraphViewerProps {
  nodes?: GraphNode[];
}

export default function KnowledgeGraphViewer({ nodes = NODES }: KnowledgeGraphViewerProps) {
  const activeNodes = nodes.length > 0 ? nodes : NODES;
  const [selectedNode, setSelectedNode] = useState<GraphNode>(activeNodes[0]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (activeNodes.length > 0) {
      setSelectedNode(activeNodes[0]);
    }
  }, [nodes]);

  const filteredNodes = activeNodes.filter(
    (n) => n.label.toLowerCase().includes(searchTerm.toLowerCase()) || n.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full surface-card rounded-2xl p-4 md:p-6 border border-pravaah-outline/40 flex flex-col gap-6 relative overflow-hidden">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="font-sans text-xl font-bold text-pravaah-text flex items-center gap-2">
            <Network className="w-5 h-5 text-pravaah-cyan" />
            <span>Agent Memory Knowledge Graph</span>
          </h3>
          <p className="font-mono text-xs text-pravaah-muted/70 mt-1">
            Real-time visual node map of synthesized AI concepts & entity relationships.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-pravaah-muted/60" />
          <input
            type="text"
            placeholder="Search concepts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-pravaah-lowest border border-pravaah-outline/40 rounded-lg pl-9 pr-3 py-1.5 font-mono text-xs text-pravaah-text focus:border-pravaah-cyan focus:outline-none"
          />
        </div>
      </div>

      {/* Main Canvas & Detail Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Interactive SVG Canvas */}
        <div className="lg:col-span-2 bg-pravaah-bg border border-pravaah-outline/40 rounded-xl h-[420px] relative overflow-hidden flex items-center justify-center">
          <svg className="w-full h-full absolute inset-0">
            {/* Draw Connecting Lines */}
            {activeNodes.map((node) =>
              node.connections.map((targetId) => {
                const targetNode = activeNodes.find((n) => n.id === targetId);
                if (!targetNode) return null;
                const isHighlighted =
                  selectedNode && (selectedNode.id === node.id || selectedNode.id === targetNode.id);
                return (
                  <line
                    key={`${node.id}-${targetId}`}
                    x1={node.x}
                    y1={node.y}
                    x2={targetNode.x}
                    y2={targetNode.y}
                    stroke={isHighlighted ? '#D4AF37' : '#E5E7EB'}
                    strokeWidth={isHighlighted ? 2.5 : 1}
                    strokeOpacity={isHighlighted ? 0.8 : 0.4}
                    strokeDasharray={isHighlighted ? '4 2' : undefined}
                  />
                );
              })
            )}
          </svg>

          {/* Render Nodes */}
          {filteredNodes.map((node) => {
            const isSelected = selectedNode.id === node.id;
            return (
              <motion.div
                key={node.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.15 }}
                onClick={() => setSelectedNode(node)}
                style={{ left: `${node.x - 50}px`, top: `${node.y - 25}px` }}
                className={`absolute cursor-pointer p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                  isSelected
                    ? 'bg-pravaah-teal/20 border-pravaah-cyan shadow-[0_0_20px_rgba(92,225,230,0.4)] z-20 scale-105'
                    : 'bg-pravaah-surface/90 border-pravaah-outline/60 hover:border-pravaah-teal z-10'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isSelected ? 'bg-pravaah-cyan animate-ping' : 'bg-pravaah-teal'
                    }`}
                  />
                  <span className="font-mono text-xs font-bold text-pravaah-text whitespace-nowrap">
                    {node.label}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-pravaah-muted/70 mt-0.5">
                  {node.category}
                </span>
              </motion.div>
            );
          })}

          <div className="absolute bottom-3 left-3 bg-pravaah-lowest/80 backdrop-blur-md px-3 py-1.5 rounded border border-pravaah-outline/40 font-mono text-[11px] text-pravaah-muted flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pravaah-teal" />
            <span>Interactive Node Canvas (Click node to inspect)</span>
          </div>
        </div>

        {/* Selected Node Inspector Sidebar */}
        <div className="bg-pravaah-lowest border border-pravaah-outline/40 rounded-xl p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-pravaah-outline/30 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-pravaah-teal" />
              <span className="font-mono text-xs font-bold text-pravaah-cyan uppercase">Node Inspector</span>
            </div>
            <span className="px-2 py-0.5 rounded bg-pravaah-teal/10 text-pravaah-primary font-mono text-[10px] border border-pravaah-teal/30">
              Depth: {selectedNode.depthScore}
            </span>
          </div>

          <div>
            <h4 className="font-sans text-xl font-bold text-pravaah-text">{selectedNode.label}</h4>
            <span className="font-mono text-xs text-pravaah-muted">{selectedNode.category}</span>
          </div>

          <p className="font-sans text-xs text-pravaah-text/90 leading-relaxed bg-pravaah-surface p-3 rounded-lg border border-pravaah-outline/40">
            {selectedNode.details}
          </p>

          <div className="flex flex-col gap-2 font-mono text-xs">
            <span className="text-pravaah-muted/70 font-semibold">Interconnected Entities:</span>
            <div className="flex flex-wrap gap-1.5">
              {selectedNode.connections.map((connId) => {
                const target = NODES.find((n) => n.id === connId);
                return (
                  <button
                    key={connId}
                    onClick={() => target && setSelectedNode(target)}
                    className="px-2.5 py-1 rounded bg-pravaah-card text-pravaah-cyan border border-pravaah-outline/40 hover:border-pravaah-teal transition-colors"
                  >
                    → {target?.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
