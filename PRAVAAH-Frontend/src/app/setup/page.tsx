'use client';

import React, { useState } from 'react';
import { initializeAgent } from '@/services/api';
import { Sparkles, Sliders, CheckCircle2, ShieldCheck, Zap, Server, Activity, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function SetupPage() {
  const [focusAreas, setFocusAreas] = useState<string[]>([
    'LLMs',
    'Autonomous Agents',
    'Quantum Computing',
    'Multimodal AI'
  ]);
  const [threshold, setThreshold] = useState<number>(0.75);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const availableTopics = [
    'LLMs',
    'Autonomous Agents',
    'Quantum Computing',
    'Multimodal AI',
    'Cybernetics',
    'GPU Kernel Optimization',
    'Edge AI',
    'Reinforcement Learning',
    'Computer Vision',
    'Vector Databases',
    'Generative Art',
    'Robotics & Control',
    'Geopolitics',
    'Gaming & Esports',
    'Culinary Arts & Food',
    'Global Economy',
    'Pop Culture',
    'Sports Analytics',
    'Climate Science',
    'Literature & Fiction'
  ];

  const toggleFocusArea = (topic: string) => {
    if (focusAreas.includes(topic)) {
      setFocusAreas(focusAreas.filter((t) => t !== topic));
    } else {
      setFocusAreas([...focusAreas, topic]);
    }
  };

  const handleInitialize = async () => {
    setIsSubmitting(true);
    setSuccessMessage(null);

    const res = await initializeAgent({
      focusAreas,
      threshold
    });

    setIsSubmitting(false);
    if (res.success) {
      setSuccessMessage(res.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-10 flex flex-col gap-8">
      {/* Header */}
      <div className="border-b border-pravaah-outline/30 pb-5">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pravaah-teal/10 border border-pravaah-teal/30 text-pravaah-primary font-mono text-xs mb-3 font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          ONE-TIME AGENT INITIALIZATION
        </div>
        <h1 className="font-sans text-3xl md:text-4xl font-bold text-pravaah-text">
          PRAVAAH Agent Setup (/setup)
        </h1>
        <p className="font-mono text-xs text-pravaah-muted/80 mt-2 leading-relaxed">
          Configure the autonomous agent parameters and trigger initialization. API keys are managed securely via backend environment variables.
        </p>
      </div>

      {/* Main Setup Card */}
      <div className="surface-card rounded-2xl p-6 md:p-8 border border-pravaah-outline/40 flex flex-col gap-8 shadow-xl">
        {/* Focus Areas */}
        <div className="flex flex-col gap-3">
          <label className="font-mono text-xs font-bold text-pravaah-cyan uppercase tracking-wider flex items-center gap-2">
            <Zap className="w-4 h-4 text-pravaah-teal" />
            <span>Select Intelligence Focus Areas:</span>
          </label>
          <p className="font-sans text-xs text-pravaah-muted">
            Select research domains PRAVAAH should continuously monitor across arXiv, GitHub, and Hugging Face.
          </p>

          <div className="flex flex-wrap gap-2.5 mt-2">
            {availableTopics.map((topic) => {
              const selected = focusAreas.includes(topic);
              return (
                <button
                  key={topic}
                  type="button"
                  onClick={() => toggleFocusArea(topic)}
                  className={`px-4 py-2 rounded-lg font-mono text-xs transition-all border flex items-center gap-2 ${
                    selected
                      ? 'bg-pravaah-teal/20 text-pravaah-primary border-pravaah-teal shadow-[0_0_15px_rgba(0,184,169,0.3)] font-semibold'
                      : 'bg-pravaah-lowest text-pravaah-muted border-pravaah-outline/40 hover:border-pravaah-cyan'
                  }`}
                >
                  {selected && <CheckCircle2 className="w-3.5 h-3.5 text-pravaah-teal" />}
                  <span>{topic}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Signal Threshold Slider */}
        <div className="flex flex-col gap-3 bg-pravaah-lowest border border-pravaah-outline/40 p-5 rounded-xl">
          <div className="flex justify-between items-center">
            <label className="font-mono text-xs font-bold text-pravaah-cyan uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-pravaah-teal" />
              <span>Signal-to-Noise Discriminator Threshold:</span>
            </label>
            <span className="font-mono text-sm font-bold text-pravaah-primary bg-pravaah-teal/20 border border-pravaah-teal/40 px-3 py-0.5 rounded">
              {threshold.toFixed(2)} Score
            </span>
          </div>

          <p className="font-sans text-xs text-pravaah-muted">
            Topics scoring below this signal ratio (e.g. repetitive prompt tips or trivial code) will be automatically rejected and logged to the Audit Log.
          </p>

          <input
            type="range"
            min="0.50"
            max="0.95"
            step="0.05"
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
            className="w-full accent-pravaah-teal bg-pravaah-card h-2 rounded-lg cursor-pointer mt-2"
          />

          <div className="flex justify-between font-mono text-[11px] text-pravaah-muted/60">
            <span>0.50 (Permissive)</span>
            <span>0.75 (Recommended)</span>
            <span>0.95 (Strict Depth Only)</span>
          </div>
        </div>

        {/* Backend Info Box */}
        <div className="bg-pravaah-surface border border-pravaah-outline/40 p-4 rounded-xl flex items-start gap-3">
          <Server className="w-5 h-5 text-pravaah-cyan shrink-0 mt-0.5" />
          <div className="flex flex-col gap-1 font-mono text-xs text-pravaah-muted">
            <span className="font-bold text-pravaah-text">Backend Environment Integration:</span>
            <p className="text-pravaah-muted/80 font-sans text-xs">
              This setup triggers <code className="text-pravaah-primary">POST /init</code> on the Antigravity backend. All LLM API keys remain securely encrypted within server environment variables.
            </p>
          </div>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="bg-pravaah-teal/15 border border-pravaah-teal p-4 rounded-xl flex flex-col gap-3 animate-in fade-in">
            <div className="flex items-center gap-2 text-pravaah-primary font-mono text-xs font-bold">
              <CheckCircle2 className="w-5 h-5 text-pravaah-teal" />
              <span>{successMessage}</span>
            </div>
            <div className="flex items-center gap-4 pt-2 border-t border-pravaah-teal/30">
              <Link
                href="/dashboard"
                className="text-xs font-mono text-pravaah-cyan hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Go to Live Telemetry Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                href="/editorial"
                className="text-xs font-mono text-pravaah-primary hover:underline flex items-center gap-1"
              >
                <span>Check Audit Log</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* PRIMARY INITIALIZE ACTION */}
        <button
          onClick={handleInitialize}
          disabled={isSubmitting || focusAreas.length === 0}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-pravaah-teal via-pravaah-primary to-pravaah-cyan text-pravaah-bg font-mono text-sm font-bold uppercase tracking-wider shadow-[0_0_30px_rgba(0,184,169,0.4)] hover:shadow-[0_0_40px_rgba(92,225,230,0.6)] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Activity className="w-5 h-5 animate-spin" />
              <span>Initializing Agent on Antigravity Backend...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              <span>Initialize Agent (POST /init)</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
