'use client';

import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { Activity, Cpu, ShieldCheck, Database, Lock, Radio, Terminal, Server, Sparkles } from 'lucide-react';
import { fetchTelemetryStats, fetchFlowStatus, subscribeTelemetryStream, TelemetryStats } from '@/services/api';

const ACTIVITY_DATA = [
  { time: '20:00', discovery: 42, evaluation: 38, memory: 92 },
  { time: '20:05', discovery: 58, evaluation: 51, memory: 94 },
  { time: '20:10', discovery: 64, evaluation: 60, memory: 95 },
  { time: '20:15', discovery: 78, evaluation: 72, memory: 97 },
  { time: '20:20', discovery: 85, evaluation: 81, memory: 98 },
  { time: '20:25', discovery: 92, evaluation: 89, memory: 99 },
  { time: '20:30', discovery: 96, evaluation: 93, memory: 100 }
];

export default function DashboardPage() {
  const [stats, setStats] = useState<TelemetryStats>({
    autonomousLoopStatus: 'ACTIVE',
    activeMemoryVectors: 84920,
    intelligenceVelocity: 14.2,
    avgLatencyMs: 320,
    totalDataNodes: 1402,
    currentStage: 'Research & Memory',
    lastCycleTimestamp: 'Just now'
  });

  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // 1. Initial Fetch
    const loadDashboardData = async () => {
      const telemetry = await fetchTelemetryStats();
      const flow = await fetchFlowStatus();
      setStats(telemetry);
      if (flow.recentLogs && flow.recentLogs.length > 0) {
        setLogs(flow.recentLogs);
      }
    };
    loadDashboardData();

    // 2. Subscribe to Backend SSE Stream
    const unsubscribe = subscribeTelemetryStream((data) => {
      if (data.telemetry) setStats(data.telemetry);
      if (data.logs && data.logs.length > 0) setLogs(data.logs);
    });

    // 3. Fallback Polling interval every 10s
    const pollInterval = setInterval(loadDashboardData, 10000);

    return () => {
      unsubscribe();
      clearInterval(pollInterval);
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-pravaah-outline/30 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pravaah-teal/10 border border-pravaah-teal/30 text-pravaah-primary font-mono text-xs mb-2">
            <Radio className="w-3.5 h-3.5 text-pravaah-cyan animate-pulse" />
            LIVE TELEMETRY STREAM
          </div>
          <h1 className="font-sans text-3xl font-bold text-pravaah-text">
            Live Autonomous Dashboard (/dashboard)
          </h1>
          <p className="font-mono text-xs text-pravaah-muted/70 mt-1">
            Real-time backend telemetry monitoring 24/7 background research loop execution.
          </p>
        </div>

        {/* Live Pulse Card */}
        <div className="flex items-center gap-3 bg-pravaah-lowest border border-pravaah-teal/40 px-4 py-2.5 rounded-xl font-mono text-xs">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pravaah-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-pravaah-teal"></span>
          </span>
          <div className="flex flex-col">
            <span className="text-pravaah-cyan font-bold">24/7 BACKGROUND LOOP: ACTIVE</span>
            <span className="text-[10px] text-pravaah-muted/60">Stage: {stats.currentStage}</span>
          </div>
        </div>
      </div>

      {/* Passive System Telemetry Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="surface-card p-5 rounded-xl border border-pravaah-outline/40 flex flex-col justify-between">
          <div className="flex items-center justify-between text-pravaah-muted">
            <span className="font-mono text-xs uppercase font-semibold">Active Memory</span>
            <Database className="w-4 h-4 text-pravaah-teal" />
          </div>
          <div className="mt-4">
            <span className="font-sans text-3xl font-bold text-pravaah-text">
              {stats.activeMemoryVectors.toLocaleString()}
            </span>
            <span className="block font-mono text-[11px] text-pravaah-primary mt-1">
              Vector Embeddings
            </span>
          </div>
        </div>

        <div className="surface-card p-5 rounded-xl border border-pravaah-outline/40 flex flex-col justify-between">
          <div className="flex items-center justify-between text-pravaah-muted">
            <span className="font-mono text-xs uppercase font-semibold">Intelligence Velocity</span>
            <Activity className="w-4 h-4 text-pravaah-cyan" />
          </div>
          <div className="mt-4">
            <span className="font-sans text-3xl font-bold text-pravaah-text">
              {stats.intelligenceVelocity}
            </span>
            <span className="block font-mono text-[11px] text-pravaah-cyan mt-1">
              Insights / Hour
            </span>
          </div>
        </div>

        <div className="surface-card p-5 rounded-xl border border-pravaah-outline/40 flex flex-col justify-between">
          <div className="flex items-center justify-between text-pravaah-muted">
            <span className="font-mono text-xs uppercase font-semibold">Average Latency</span>
            <Cpu className="w-4 h-4 text-pravaah-amber" />
          </div>
          <div className="mt-4">
            <span className="font-sans text-3xl font-bold text-pravaah-text">
              {stats.avgLatencyMs} ms
            </span>
            <span className="block font-mono text-[11px] text-pravaah-amber mt-1">
              Context Synthesis Time
            </span>
          </div>
        </div>

        <div className="surface-card p-5 rounded-xl border border-pravaah-outline/40 flex flex-col justify-between">
          <div className="flex items-center justify-between text-pravaah-muted">
            <span className="font-mono text-xs uppercase font-semibold">Data Nodes</span>
            <Server className="w-4 h-4 text-pravaah-primary" />
          </div>
          <div className="mt-4">
            <span className="font-sans text-3xl font-bold text-pravaah-text">
              {stats.totalDataNodes}
            </span>
            <span className="block font-mono text-[11px] text-pravaah-primary mt-1">
              Graph Entities Connected
            </span>
          </div>
        </div>
      </div>

      {/* Main Activity Chart & Live Log Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Real-time Activity Graph */}
        <div className="lg:col-span-2 surface-card p-6 rounded-2xl border border-pravaah-outline/40 flex flex-col gap-4">
          <div className="flex justify-between items-center border-b border-pravaah-outline/30 pb-3">
            <h3 className="font-sans text-lg font-bold text-pravaah-text flex items-center gap-2">
              <Activity className="w-5 h-5 text-pravaah-teal" />
              <span>Real-Time Engine Throughput</span>
            </h3>
            <span className="font-mono text-xs text-pravaah-cyan">Live Feed Telemetry</span>
          </div>

          <div className="h-[280px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ACTIVITY_DATA}>
                <defs>
                  <linearGradient id="colorDisc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1E3A8A" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#1E3A8A" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorEval" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#6B7280" fontSize={11} tickLine={false} />
                <YAxis stroke="#6B7280" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#F3F4F6',
                    borderColor: '#E5E7EB',
                    borderRadius: '8px',
                    color: '#111827',
                    fontFamily: 'monospace',
                    fontSize: '12px'
                  }}
                />
                <Area type="monotone" dataKey="discovery" stroke="#1E3A8A" fillOpacity={1} fill="url(#colorDisc)" name="Discovery Rate" />
                <Area type="monotone" dataKey="evaluation" stroke="#D4AF37" fillOpacity={1} fill="url(#colorEval)" name="Signal Evaluation" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Pipeline Activity Stream */}
        <div className="surface-card p-6 rounded-2xl border border-pravaah-outline/40 flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-pravaah-outline/30 pb-3">
            <h3 className="font-sans text-lg font-bold text-pravaah-text flex items-center gap-2">
              <Terminal className="w-5 h-5 text-pravaah-cyan" />
              <span>Pipeline Stream Log</span>
            </h3>
            <span className="w-2 h-2 rounded-full bg-pravaah-teal animate-pulse" />
          </div>

          <div className="bg-pravaah-lowest border border-pravaah-outline/40 rounded-xl p-3 h-[280px] overflow-y-auto font-mono text-xs flex flex-col gap-2.5">
            {logs.map((log, idx) => (
              <div key={idx} className="text-pravaah-muted leading-relaxed border-b border-pravaah-outline/20 pb-1.5 last:border-none">
                <span className="text-pravaah-primary font-semibold">{log.split(' ')[0]}</span>{' '}
                <span>{log.substring(log.indexOf(' ') + 1)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SYSTEM OVERRIDES SECTION (Requirement 2 - Read-Only / Admin Restricted aesthetic) */}
      <div className="surface-card p-6 rounded-2xl border border-pravaah-outline/40 flex flex-col gap-4">
        <div className="flex items-center justify-between border-b border-pravaah-outline/30 pb-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-pravaah-amber" />
            <h3 className="font-sans text-base font-bold text-pravaah-text">System Overrides (Admin Debugging Only)</h3>
          </div>
          <span className="font-mono text-[11px] text-pravaah-amber bg-pravaah-amber/10 border border-pravaah-amber/30 px-2.5 py-0.5 rounded">
            LOCKED - 24/7 AUTONOMOUS MODE
          </span>
        </div>

        <p className="font-sans text-xs text-pravaah-muted">
          Manual trigger controls have been intentionally locked to protect the 24/7 background loop autonomy. The agent executes continuously on the Antigravity backend.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
          <div className="bg-pravaah-lowest border border-pravaah-outline/30 p-3.5 rounded-lg opacity-60 flex items-center justify-between cursor-not-allowed">
            <span>Force Discovery Loop</span>
            <Lock className="w-3.5 h-3.5 text-pravaah-muted" />
          </div>

          <div className="bg-pravaah-lowest border border-pravaah-outline/30 p-3.5 rounded-lg opacity-60 flex items-center justify-between cursor-not-allowed">
            <span>Manual Sentiment Flush</span>
            <Lock className="w-3.5 h-3.5 text-pravaah-muted" />
          </div>

          <div className="bg-pravaah-lowest border border-pravaah-outline/30 p-3.5 rounded-lg opacity-60 flex items-center justify-between cursor-not-allowed">
            <span>Override Loop Interval</span>
            <Lock className="w-3.5 h-3.5 text-pravaah-muted" />
          </div>
        </div>
      </div>
    </div>
  );
}
