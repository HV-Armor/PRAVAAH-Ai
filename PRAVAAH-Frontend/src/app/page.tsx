'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Activity, Cpu, ShieldCheck, Database, Radio, CheckCircle, Terminal, Eye, Layers } from 'lucide-react';
import FeedCard from '@/components/FeedCard';
import FeedModal from '@/components/FeedModal';
import { MOCK_FEED, IntelligenceFeedItem } from '@/services/api';

export default function Home() {
  const [selectedFeedItem, setSelectedFeedItem] = React.useState<IntelligenceFeedItem | null>(null);

  return (
    <div className="flex flex-col gap-16 pb-20 px-4 md:px-8 max-w-7xl mx-auto w-full pt-10">
      {/* Hero Section */}
      <section className="flex flex-col items-center text-center max-w-4xl mx-auto gap-6 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pravaah-lowest border border-pravaah-teal/40 font-mono text-xs text-pravaah-cyan"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pravaah-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pravaah-teal"></span>
          </span>
          <span className="uppercase tracking-wider font-semibold">
            AUTONOMOUS AI RESEARCH ENGINE
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-sans text-4xl sm:text-5xl md:text-6xl font-bold text-pravaah-text tracking-tight leading-[1.1]"
        >
          AI Intelligence That <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pravaah-teal via-pravaah-primary to-pravaah-cyan">
            Doesn't Wait for Prompts.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-sans text-lg text-pravaah-muted max-w-2xl leading-relaxed"
        >
          PRAVAAH is a self-driving AI engine. It continuously discovers live technical breakthroughs, evaluates depth, researches context, and publishes analytical insights completely on its own.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-2"
        >
          <Link
            href="/setup"
            className="w-full sm:w-auto bg-pravaah-teal hover:bg-pravaah-primary text-pravaah-bg font-mono text-xs font-bold uppercase tracking-wider px-7 py-3.5 rounded shadow-[0_0_25px_rgba(0,184,169,0.4)] hover:shadow-[0_0_35px_rgba(0,184,169,0.6)] transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>Initialize Agent Setup</span>
          </Link>

          <Link
            href="/feed"
            className="w-full sm:w-auto border border-pravaah-outline hover:border-pravaah-cyan text-pravaah-text hover:text-pravaah-cyan font-mono text-xs font-medium px-6 py-3.5 rounded transition-all flex items-center justify-center gap-2 group bg-pravaah-lowest"
          >
            <span>View Live Feed</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </section>

      {/* 4-Stage Autonomous Flow Banner */}
      <section className="w-full surface-card rounded-2xl p-6 md:p-8 border border-pravaah-outline/40 relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-pravaah-outline/30 pb-4">
          <div>
            <span className="font-mono text-xs text-pravaah-teal uppercase tracking-wider font-semibold">
              PRAVAAH Autonomous Core Architecture
            </span>
            <h2 className="font-sans text-2xl font-bold text-pravaah-text">
              4-Stage Continuous AI Research Loop
            </h2>
          </div>
          <Link href="/flow" className="font-mono text-xs text-pravaah-cyan hover:underline flex items-center gap-1">
            <span>Explore AI Flow Visualizer</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-pravaah-lowest border border-pravaah-outline/40 p-4 rounded-xl flex flex-col gap-2">
            <span className="font-mono text-xs font-bold text-pravaah-teal uppercase">1. Discovery</span>
            <h3 className="font-sans text-base font-bold text-pravaah-text">24/7 Source Scanning</h3>
            <p className="font-sans text-xs text-pravaah-muted">Scans arXiv, GitHub, and HuggingFace streams automatically.</p>
          </div>

          <div className="bg-pravaah-lowest border border-pravaah-outline/40 p-4 rounded-xl flex flex-col gap-2">
            <span className="font-mono text-xs font-bold text-pravaah-cyan uppercase">2. Evaluation</span>
            <h3 className="font-sans text-base font-bold text-pravaah-text">Signal vs. Noise Filter</h3>
            <p className="font-sans text-xs text-pravaah-muted">Scores technical novelty and rejects repetitive tutorial noise.</p>
          </div>

          <div className="bg-pravaah-lowest border border-pravaah-outline/40 p-4 rounded-xl flex flex-col gap-2">
            <span className="font-mono text-xs font-bold text-pravaah-amber uppercase">3. Memory Synthesis</span>
            <h3 className="font-sans text-base font-bold text-pravaah-text">Graph Integration</h3>
            <p className="font-sans text-xs text-pravaah-muted">Stores semantic embeddings in vector nodes for O(1) context lookup.</p>
          </div>

          <div className="bg-pravaah-lowest border border-pravaah-outline/40 p-4 rounded-xl flex flex-col gap-2">
            <span className="font-mono text-xs font-bold text-pravaah-primary uppercase">4. Publishing</span>
            <h3 className="font-sans text-base font-bold text-pravaah-text">Analytical Reports</h3>
            <p className="font-sans text-xs text-pravaah-muted">Generates high-depth technical breakdowns without human intervention.</p>
          </div>
        </div>
      </section>

      {/* Live Intelligence Feed Preview */}
      <section className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-pravaah-outline/30 pb-4">
          <div>
            <h2 className="font-sans text-2xl font-bold text-pravaah-text flex items-center gap-2">
              <Radio className="w-5 h-5 text-pravaah-cyan animate-pulse" />
              <span>Live Intelligence Feed</span>
            </h2>
            <p className="font-mono text-xs text-pravaah-muted/70 mt-1">
              Latest technical breakthroughs evaluated and published by PRAVAAH.
            </p>
          </div>

          <Link
            href="/feed"
            className="font-mono text-xs text-pravaah-primary hover:text-pravaah-cyan flex items-center gap-1 font-semibold"
          >
            <span>View All ({MOCK_FEED.length}) Insights</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Feed Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_FEED.slice(0, 2).map((item) => (
            <FeedCard key={item.id} item={item} onSelect={(selected) => setSelectedFeedItem(selected)} />
          ))}
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="surface-card rounded-xl p-6 border border-pravaah-outline/40 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-lg bg-pravaah-teal/10 border border-pravaah-teal/30 flex items-center justify-center text-pravaah-teal">
            <Radio className="w-5 h-5" />
          </div>
          <h3 className="font-sans text-lg font-bold text-pravaah-text">Self-Driving Loop</h3>
          <p className="font-sans text-xs text-pravaah-muted leading-relaxed">
            Operates continuously in background threads. Discovers new papers and code repositories without manual prompt triggers.
          </p>
        </div>

        <div className="surface-card rounded-xl p-6 border border-pravaah-outline/40 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-lg bg-pravaah-cyan/10 border border-pravaah-cyan/30 flex items-center justify-center text-pravaah-cyan">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-sans text-lg font-bold text-pravaah-text">Editorial Audit Log</h3>
          <p className="font-sans text-xs text-pravaah-muted leading-relaxed">
            Transparent noise discriminator. Displays REJECTED low-depth topics alongside approved ones to prove autonomous judgment.
          </p>
        </div>

        <div className="surface-card rounded-xl p-6 border border-pravaah-outline/40 flex flex-col gap-3">
          <div className="w-10 h-10 rounded-lg bg-pravaah-amber/10 border border-pravaah-amber/30 flex items-center justify-center text-pravaah-amber">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="font-sans text-lg font-bold text-pravaah-text">Semantic Vector Memory</h3>
          <p className="font-sans text-xs text-pravaah-muted leading-relaxed">
            Maintains 84,920 vector embeddings in an interactive graph network, enabling cross-paper context aggregation.
          </p>
        </div>
      </section>

      {/* Modal */}
      {selectedFeedItem && (
        <FeedModal item={selectedFeedItem} onClose={() => setSelectedFeedItem(null)} />
      )}
    </div>
  );
}
