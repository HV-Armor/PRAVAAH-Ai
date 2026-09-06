'use client';

import React, { useState, useEffect } from 'react';
import { fetchFlowStatus, runFlowCycle, FlowStatusResponse } from '@/services/api';
import { Radio, Search, Filter, ShieldCheck, Database, FileText, ArrowRight, CheckCircle2, Play, RefreshCw, Sparkles } from 'lucide-react';

export default function AIFlowPage() {
  const [activeStage, setActiveStage] = useState<number>(1);
  const [flowStatus, setFlowStatus] = useState<FlowStatusResponse | null>(null);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const loadStatus = async () => {
    const data = await fetchFlowStatus();
    setFlowStatus(data);
    if (data.currentStage) {
      if (data.currentStage === 'Discovery') setActiveStage(1);
      else if (data.currentStage === 'Evaluation') setActiveStage(2);
      else if (data.currentStage === 'Research & Memory') setActiveStage(3);
      else if (data.currentStage === 'Publishing') setActiveStage(4);
    }
  };

  useEffect(() => {
    loadStatus();
    const interval = setInterval(loadStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleRunCycle = async () => {
    setIsRunning(true);
    await runFlowCycle();
    await loadStatus();
    setIsRunning(false);
  };

  const stages = [
    {
      step: 1,
      name: 'Discovery',
      color: '#1E3A8A',
      title: 'Automated 24/7 Source Scanning',
      icon: Search,
      description: 'Continuous background workers poll research repositories (arXiv API, GitHub Trending, Hugging Face Papers, TechCrunch AI) every 15 minutes without manual prompts.',
      inputs: ['arXiv CS.AI RSS', 'GitHub Trending Repos', 'Hugging Face Daily Papers'],
      outputs: ['Raw Topic Stream (avg 50 items/cycle)']
    },
    {
      step: 2,
      name: 'Evaluation',
      color: '#D4AF37',
      title: 'Signal vs. Noise Discriminator',
      icon: ShieldCheck,
      description: 'Every raw topic is evaluated by Pravaah\'s scoring matrix (Novelty Score, Signal-to-Noise Ratio). Topics scoring below the 0.75 threshold (e.g. generic prompt lists) are rejected and logged to the Audit Log.',
      inputs: ['Raw Topic Stream', 'Signal Threshold (0.75)'],
      outputs: ['Approved Technical Topics', 'Rejection Log Entries']
    },
    {
      step: 3,
      name: 'Research & Memory',
      color: '#F59E0B',
      title: 'Context Synthesis & Memory Graph',
      icon: Database,
      description: 'The engine queries its 84,920 vector embeddings to cross-reference historical papers, detect architectural relationships (e.g. MLA + MoE), and synthesize technical context.',
      inputs: ['Approved Technical Topic', 'Vector DB HNSW Index'],
      outputs: ['Synthesized Knowledge Context Node']
    },
    {
      step: 4,
      name: 'Publishing',
      color: '#3B82F6',
      title: 'Autonomous Insight Generation',
      icon: FileText,
      description: 'Generates structured analytical breakdowns, technical depth ratings, and system rationale badges, automatically publishing to the Live Intelligence Feed.',
      inputs: ['Synthesized Context Node'],
      outputs: ['Live Feed Article', 'Interactive Insight Card']
    }
  ];

  const current = stages.find((s) => s.step === activeStage) || stages[0];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-pravaah-outline/30 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pravaah-teal/10 border border-pravaah-teal/30 text-pravaah-primary font-mono text-xs mb-2 font-semibold">
            <Radio className="w-3.5 h-3.5 text-pravaah-cyan animate-pulse" />
            4-STAGE ENGINE VISUALIZER
          </div>
          <h1 className="font-sans text-3xl font-bold text-pravaah-text">
            Pravaah AI Flow (/flow)
          </h1>
          <p className="font-mono text-xs text-pravaah-muted/70 mt-1">
            Interactive breakdown of the 4 autonomous stages running 24/7 on the Antigravity backend.
          </p>
        </div>

        <button
          onClick={handleRunCycle}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-pravaah-teal to-pravaah-cyan text-pravaah-bg font-mono text-xs font-bold uppercase hover:shadow-[0_0_20px_rgba(0,184,169,0.4)] transition-all disabled:opacity-50"
        >
          {isRunning ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Executing Pipeline Run...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>Run Pipeline Cycle (POST /flow/run)</span>
            </>
          )}
        </button>
      </div>

      {/* Stage Progress Pills */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        {stages.map((st) => {
          const isSelected = st.step === activeStage;
          const IconComp = st.icon;
          return (
            <button
              key={st.step}
              onClick={() => setActiveStage(st.step)}
              className={`surface-card p-4 rounded-xl border text-left flex flex-col gap-2 transition-all ${isSelected
                  ? 'border-pravaah-cyan bg-pravaah-teal/15 shadow-[0_0_20px_rgba(92,225,230,0.3)]'
                  : 'border-pravaah-outline/40 hover:border-pravaah-teal'
                }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase" style={{ color: st.color }}>
                  Stage {st.step}
                </span>
                <IconComp className="w-4 h-4 text-pravaah-text" />
              </div>
              <span className="font-sans text-base font-bold text-pravaah-text">{st.name}</span>
            </button>
          );
        })}
      </div>

      {/* Stage Detail Card */}
      <div className="surface-card rounded-2xl p-6 md:p-8 border border-pravaah-outline/40 flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-pravaah-outline/30 pb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center font-bold font-mono text-lg text-pravaah-bg"
              style={{ backgroundColor: current.color }}
            >
              {current.step}
            </div>
            <div>
              <span className="font-mono text-xs font-semibold text-pravaah-muted">STAGE {current.step} DETAILS</span>
              <h2 className="font-sans text-2xl font-bold text-pravaah-text">{current.title}</h2>
            </div>
          </div>

          <span className="px-3 py-1 rounded bg-pravaah-lowest border border-pravaah-outline/40 font-mono text-xs text-pravaah-cyan">
            Status: ACTIVE IN BACKEND LOOP
          </span>
        </div>

        <p className="font-sans text-sm text-pravaah-text/90 leading-relaxed bg-pravaah-lowest p-5 rounded-xl border border-pravaah-outline/40">
          {current.description}
        </p>

        {/* Inputs vs Outputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-pravaah-lowest border border-pravaah-outline/40 p-5 rounded-xl flex flex-col gap-3">
            <span className="font-mono text-xs font-bold text-pravaah-teal uppercase">Stage Inputs:</span>
            <ul className="flex flex-col gap-2 font-mono text-xs text-pravaah-muted">
              {current.inputs.map((inp, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pravaah-teal shrink-0" />
                  <span>{inp}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-pravaah-lowest border border-pravaah-outline/40 p-5 rounded-xl flex flex-col gap-3">
            <span className="font-mono text-xs font-bold text-pravaah-cyan uppercase">Stage Outputs:</span>
            <ul className="flex flex-col gap-2 font-mono text-xs text-pravaah-muted">
              {current.outputs.map((out, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-pravaah-cyan shrink-0" />
                  <span>{out}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
