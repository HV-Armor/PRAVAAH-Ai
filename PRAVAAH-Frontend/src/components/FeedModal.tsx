'use client';

import React, { useEffect } from 'react';
import { IntelligenceFeedItem } from '@/services/api';
import { X, Sparkles, ExternalLink, ShieldCheck, Flame, Cpu, FileText, CheckCircle2 } from 'lucide-react';

interface FeedModalProps {
  item: IntelligenceFeedItem | null;
  onClose: () => void;
}

export default function FeedModal({ item, onClose }: FeedModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-pravaah-bg/80 backdrop-blur-md flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-pravaah-surface border border-pravaah-cyan/40 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 flex flex-col gap-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-pravaah-muted hover:text-white p-2 rounded-full hover:bg-pravaah-card transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-3 py-1 rounded bg-pravaah-teal/20 text-pravaah-primary border border-pravaah-teal/40 font-mono text-xs font-semibold">
            {item.source}
          </span>
          <span className="px-3 py-1 rounded bg-pravaah-card text-pravaah-muted border border-pravaah-outline/40 font-mono text-xs">
            Category: {item.category}
          </span>
          <span className="text-xs font-mono text-pravaah-muted/60">
            Published: {item.timestamp}
          </span>
        </div>

        {/* Title */}
        <h2 className="font-sans text-2xl md:text-3xl font-bold text-pravaah-text leading-tight">
          {item.title}
        </h2>

        {/* Score Telemetry Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-pravaah-lowest border border-pravaah-outline/40 p-4 rounded-xl font-mono text-xs">
          <div className="flex flex-col">
            <span className="text-pravaah-muted/70 text-[11px]">Technical Depth Score</span>
            <div className="flex items-center gap-1.5 font-bold text-pravaah-primary text-lg mt-0.5">
              <Flame className="w-5 h-5 text-pravaah-teal" />
              <span>{item.depthScore} / 100</span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-pravaah-muted/70 text-[11px]">AI Confidence Rating</span>
            <div className="flex items-center gap-1.5 font-bold text-pravaah-cyan text-lg mt-0.5">
              <ShieldCheck className="w-5 h-5" />
              <span>{item.confidence}%</span>
            </div>
          </div>

          <div className="flex flex-col col-span-2 sm:col-span-1">
            <span className="text-pravaah-muted/70 text-[11px]">Source Attribution</span>
            <span className="font-semibold text-pravaah-text mt-1 truncate">
              {item.authorOrRepo || item.source}
            </span>
          </div>
        </div>

        {/* DEDICATED SYSTEM RATIONALE SECTION (Requirement 4) */}
        <div className="bg-gradient-to-r from-pravaah-teal/15 to-pravaah-cyan/10 border-l-4 border-pravaah-teal p-4 rounded-r-xl">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-pravaah-cyan mb-1.5">
            <Sparkles className="w-4 h-4 text-pravaah-teal animate-pulse" />
            <span>SYSTEM RATIONALE & AUTONOMOUS EVALUATION</span>
          </div>
          <p className="font-mono text-xs text-pravaah-text leading-relaxed">
            "{item.systemRationale}"
          </p>
        </div>

        {/* Full Analysis Content */}
        <div className="flex flex-col gap-4 font-sans text-pravaah-text">
          <h3 className="font-mono text-sm font-bold text-pravaah-primary uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4" />
            <span>Synthesized Research Analysis</span>
          </h3>

          <p className="text-base leading-relaxed text-pravaah-text/90">
            {item.fullAnalysis}
          </p>

          <div className="bg-pravaah-card border border-pravaah-outline/40 p-4 rounded-xl flex flex-col gap-2 mt-2">
            <span className="font-mono text-xs font-bold text-pravaah-cyan uppercase">Key Technical Takeaways:</span>
            <ul className="flex flex-col gap-1.5 font-sans text-sm text-pravaah-muted">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-pravaah-teal shrink-0 mt-0.5" />
                <span>Extremely high signal-to-noise ratio passing signal filter thresholds.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-pravaah-teal shrink-0 mt-0.5" />
                <span>Direct architectural impact on open-source LLM inference efficiency.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-pravaah-teal shrink-0 mt-0.5" />
                <span>Integrated into Pravaah's persistent agent memory graph.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-pravaah-outline/30">
          {item.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded text-xs font-mono bg-pravaah-card text-pravaah-primary border border-pravaah-teal/30">
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-pravaah-outline/40">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded border border-pravaah-outline text-pravaah-muted font-mono text-xs hover:bg-pravaah-card transition-colors"
          >
            Close Analysis
          </button>

          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 rounded bg-pravaah-teal text-pravaah-bg font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-[0_0_20px_rgba(0,184,169,0.4)] hover:shadow-[0_0_30px_rgba(0,184,169,0.6)] transition-all"
          >
            <span>Open Original Source</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
