'use client';

import React, { useState, useEffect } from 'react';
import { fetchEditorialAuditLog, AuditLogItem } from '@/services/api';
import { ShieldAlert, ShieldCheck, Filter, XCircle, CheckCircle2, BarChart2, Sparkles, Terminal } from 'lucide-react';

export default function EditorialAuditLogPage() {
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'APPROVED' | 'REJECTED'>('ALL');

  const loadAuditLogs = async () => {
    setLoading(true);
    const data = await fetchEditorialAuditLog();
    setAuditLogs(data);
    setLoading(false);
  };

  useEffect(() => {
    loadAuditLogs();
    const interval = setInterval(loadAuditLogs, 15000);
    return () => clearInterval(interval);
  }, []);

  const filteredLogs = auditLogs.filter((log) => {
    if (filterStatus === 'ALL') return true;
    return log.status === filterStatus;
  });

  const approvedCount = auditLogs.filter((l) => l.status === 'APPROVED').length;
  const rejectedCount = auditLogs.filter((l) => l.status === 'REJECTED').length;

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-pravaah-outline/30 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pravaah-amber/10 border border-pravaah-amber/30 text-pravaah-amber font-mono text-xs mb-2 font-semibold">
            <ShieldAlert className="w-3.5 h-3.5" />
            SIGNAL VS. NOISE AUDIT TRAIL
          </div>
          <h1 className="font-sans text-3xl font-bold text-pravaah-text">
            Editorial Audit Log (/editorial)
          </h1>
          <p className="font-mono text-xs text-pravaah-muted/70 mt-1">
            Transparent noise discriminator log proving autonomous agent editorial judgment. Displays rejected low-signal topics alongside approved research.
          </p>
        </div>

        {/* Telemetry Pill */}
        <div className="flex items-center gap-3 bg-pravaah-lowest border border-pravaah-outline/40 px-4 py-2 rounded-xl font-mono text-xs">
          <div className="flex items-center gap-1.5 text-pravaah-primary">
            <CheckCircle2 className="w-4 h-4 text-pravaah-teal" />
            <span>Approved: <strong>{approvedCount}</strong></span>
          </div>
          <div className="h-3 w-[1px] bg-pravaah-outline/40"></div>
          <div className="flex items-center gap-1.5 text-pravaah-red">
            <XCircle className="w-4 h-4 text-pravaah-red" />
            <span>Rejected: <strong>{rejectedCount}</strong></span>
          </div>
        </div>
      </div>

      {/* Audit Stats Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="surface-card p-5 rounded-xl border border-pravaah-outline/40 flex flex-col gap-2">
          <span className="font-mono text-xs text-pravaah-muted uppercase">Total Evaluated Topics</span>
          <span className="font-sans text-3xl font-bold text-pravaah-text">{auditLogs.length}</span>
          <span className="font-mono text-[11px] text-pravaah-cyan">100% Autonomous Evaluation</span>
        </div>

        <div className="surface-card p-5 rounded-xl border border-pravaah-teal/40 bg-pravaah-teal/5 flex flex-col gap-2">
          <span className="font-mono text-xs text-pravaah-primary uppercase">Published Signal Rate</span>
          <span className="font-sans text-3xl font-bold text-pravaah-primary">
            {Math.round((approvedCount / auditLogs.length) * 100)}%
          </span>
          <span className="font-mono text-[11px] text-pravaah-muted">Met Signal Threshold (≥ 0.75)</span>
        </div>

        <div className="surface-card p-5 rounded-xl border border-pravaah-red/40 bg-pravaah-red/5 flex flex-col gap-2">
          <span className="font-mono text-xs text-pravaah-red uppercase">Noise Filtering Efficiency</span>
          <span className="font-sans text-3xl font-bold text-pravaah-red">
            {Math.round((rejectedCount / auditLogs.length) * 100)}%
          </span>
          <span className="font-mono text-[11px] text-pravaah-muted">Filtered Out Repetitive Content</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between surface-card p-4 rounded-xl border border-pravaah-outline/40">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterStatus('ALL')}
            className={`px-4 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all ${
              filterStatus === 'ALL'
                ? 'bg-pravaah-teal text-pravaah-bg shadow-[0_0_15px_rgba(0,184,169,0.3)]'
                : 'bg-pravaah-lowest text-pravaah-muted border border-pravaah-outline/40 hover:border-pravaah-cyan'
            }`}
          >
            All Audit Logs ({auditLogs.length})
          </button>

          <button
            onClick={() => setFilterStatus('APPROVED')}
            className={`px-4 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all ${
              filterStatus === 'APPROVED'
                ? 'bg-pravaah-teal/20 text-pravaah-primary border border-pravaah-teal'
                : 'bg-pravaah-lowest text-pravaah-muted border border-pravaah-outline/40 hover:border-pravaah-cyan'
            }`}
          >
            APPROVED ({approvedCount})
          </button>

          <button
            onClick={() => setFilterStatus('REJECTED')}
            className={`px-4 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all ${
              filterStatus === 'REJECTED'
                ? 'bg-pravaah-red/20 text-pravaah-red border border-pravaah-red'
                : 'bg-pravaah-lowest text-pravaah-muted border border-pravaah-outline/40 hover:border-pravaah-cyan'
            }`}
          >
            REJECTED ({rejectedCount})
          </button>
        </div>

        <span className="hidden sm:inline-block font-mono text-xs text-pravaah-muted/60">
          Evaluated against 0.75 Discriminator Threshold
        </span>
      </div>

      {/* Audit Log Entries List */}
      <div className="flex flex-col gap-4">
        {filteredLogs.map((log) => {
          const isApproved = log.status === 'APPROVED';
          return (
            <div
              key={log.id}
              className={`surface-card rounded-xl p-5 md:p-6 border transition-all flex flex-col gap-4 ${
                isApproved
                  ? 'border-pravaah-teal/30 hover:border-pravaah-teal'
                  : 'border-pravaah-red/30 hover:border-pravaah-red bg-[#170a0d]/40'
              }`}
            >
              {/* Header Info */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded text-xs font-mono font-bold flex items-center gap-1.5 ${
                      isApproved
                        ? 'bg-pravaah-teal/20 text-pravaah-primary border border-pravaah-teal/40'
                        : 'bg-pravaah-red/20 text-pravaah-red border border-pravaah-red/40'
                    }`}
                  >
                    {isApproved ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                    <span>{log.status}</span>
                  </span>

                  <span className="font-mono text-xs text-pravaah-muted/80 bg-pravaah-lowest px-2.5 py-1 rounded border border-pravaah-outline/40">
                    Source: {log.source}
                  </span>
                </div>

                <span className="font-mono text-xs text-pravaah-muted/60">{log.timestamp}</span>
              </div>

              {/* Topic Title */}
              <h3 className="font-sans text-xl font-bold text-pravaah-text">{log.topic}</h3>

              {/* Scoring Matrix Bars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-pravaah-lowest border border-pravaah-outline/40 p-4 rounded-xl font-mono text-xs">
                {/* Novelty Score Bar */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between">
                    <span className="text-pravaah-muted">Technical Novelty Score:</span>
                    <strong className="text-pravaah-cyan">{(log.noveltyScore * 100).toFixed(0)}%</strong>
                  </div>
                  <div className="w-full bg-pravaah-card h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-pravaah-cyan h-full rounded-full"
                      style={{ width: `${log.noveltyScore * 100}%` }}
                    />
                  </div>
                </div>

                {/* Signal-to-Noise Ratio Bar */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex justify-between">
                    <span className="text-pravaah-muted">Signal-to-Noise Ratio:</span>
                    <strong className={isApproved ? 'text-pravaah-primary' : 'text-pravaah-red'}>
                      {(log.signalToNoiseRatio * 100).toFixed(0)}%
                    </strong>
                  </div>
                  <div className="w-full bg-pravaah-card h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isApproved ? 'bg-pravaah-teal' : 'bg-pravaah-red'}`}
                      style={{ width: `${log.signalToNoiseRatio * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Rejection Rationale (For Rejected Topics) */}
              {!isApproved && log.rejectionReason && (
                <div className="bg-[#93000a]/20 border-l-4 border-pravaah-red p-3.5 rounded-r-xl flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-pravaah-red shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1 font-mono text-xs">
                    <span className="font-bold text-pravaah-red uppercase">Rejection Rationale:</span>
                    <span className="text-pravaah-text italic">{log.rejectionReason}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
