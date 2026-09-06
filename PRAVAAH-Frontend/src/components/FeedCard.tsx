'use client';

import React from 'react';
import { IntelligenceFeedItem } from '@/services/api';
import { Sparkles, ExternalLink, ArrowRight, ShieldCheck, Cpu, Database, Flame } from 'lucide-react';

interface FeedCardProps {
  item: IntelligenceFeedItem;
  onSelect: (item: IntelligenceFeedItem) => void;
}

export default function FeedCard({ item, onSelect }: FeedCardProps) {
  const getSourceBadgeColor = (source: string) => {
    switch (source) {
      case 'arXiv':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'GitHub':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'HuggingFace':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'TechCrunch':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      default:
        return 'bg-teal-500/10 text-teal-400 border-teal-500/30';
    }
  };

  return (
    <div className="surface-card rounded-xl p-5 md:p-6 flex flex-col justify-between gap-4 group relative overflow-hidden transition-all duration-300 hover:border-pravaah-cyan/40">
      {/* Top Bar: Source & Metrics */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded text-[11px] font-mono font-medium border ${getSourceBadgeColor(item.source)} flex items-center gap-1.5`}>
              <Database className="w-3 h-3" />
              {item.source}
            </span>
            <span className="text-xs font-mono text-pravaah-muted/70">
              {item.timestamp}
            </span>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs">
            <div className="flex items-center gap-1 text-pravaah-primary">
              <Flame className="w-3.5 h-3.5 text-pravaah-teal" />
              <span>Depth: <strong className="text-white">{item.depthScore}/100</strong></span>
            </div>
            <div className="h-3 w-[1px] bg-pravaah-outline/40"></div>
            <div className="flex items-center gap-1 text-pravaah-cyan">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Confidence: <strong className="text-white">{item.confidence}%</strong></span>
            </div>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-sans text-lg md:text-xl font-bold text-pravaah-text group-hover:text-pravaah-cyan transition-colors line-clamp-2 leading-snug mb-2">
          {item.title}
        </h3>

        {/* Author / Repo if present */}
        {item.authorOrRepo && (
          <div className="font-mono text-xs text-pravaah-muted/70 mb-3 flex items-center gap-1">
            <Cpu className="w-3 h-3 text-pravaah-teal" />
            <span>{item.authorOrRepo}</span>
          </div>
        )}

        {/* Summary */}
        <p className="font-sans text-sm text-pravaah-muted line-clamp-3 leading-relaxed mb-4">
          {item.summary}
        </p>

        {/* SYSTEM RATIONALE BLOCK (Requirement 4) */}
        <div className="bg-pravaah-lowest border border-pravaah-teal/30 p-3 rounded-lg mb-4 relative">
          <div className="flex items-center gap-1.5 font-mono text-xs font-semibold text-pravaah-cyan mb-1">
            <Sparkles className="w-3.5 h-3.5 text-pravaah-teal animate-pulse" />
            <span>SYSTEM RATIONALE (AI Depth Selection):</span>
          </div>
          <p className="font-mono text-xs text-pravaah-text/90 italic leading-relaxed">
            "{item.systemRationale}"
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-[11px] font-mono bg-pravaah-card text-pravaah-muted border border-pravaah-outline/40"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer Action */}
      <div className="pt-3 border-t border-pravaah-outline/30 flex items-center justify-between">
        <button
          onClick={() => onSelect(item)}
          className="flex items-center gap-2 font-mono text-xs font-semibold text-pravaah-primary group-hover:text-pravaah-cyan transition-colors"
        >
          <span>Inspect Intelligence Analysis</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>

        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-pravaah-muted/60 hover:text-pravaah-cyan p-1.5 transition-colors"
          title="View Original Source"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
