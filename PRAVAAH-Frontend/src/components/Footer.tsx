'use client';

import React from 'react';
import Link from 'next/link';
import { Cpu, Terminal, ShieldCheck, Activity } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-pravaah-bg border-t border-pravaah-outline/30 py-10 px-4 md:px-8 text-pravaah-muted font-mono text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        {/* Left branding */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-pravaah-text text-base font-sans">PRAVAAH</span>
            <span className="text-[10px] text-pravaah-primary bg-pravaah-teal/10 px-2 py-0.5 rounded border border-pravaah-teal/30">
              v2.4-AUTONOMOUS
            </span>
          </div>
          <p className="text-xs text-pravaah-muted/80 font-sans max-w-md">
            A self-driving AI research engine that continuously discovers live technical breakthroughs, evaluates signal depth, synthesizes context, and publishes insights completely on its own.
          </p>
        </div>

        {/* Telemetry pill */}
        <div className="flex flex-wrap items-center gap-4 bg-pravaah-lowest border border-pravaah-outline/40 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-pravaah-cyan" />
            <span className="text-pravaah-cyan">Telemetry: 24/7 Loop</span>
          </div>
          <div className="h-3 w-[1px] bg-pravaah-outline/40"></div>
          <div className="flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-pravaah-primary" />
            <span>Vectors: 84.9k</span>
          </div>
          <div className="h-3 w-[1px] bg-pravaah-outline/40"></div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-pravaah-amber" />
            <span>Signal Threshold: 0.75</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-pravaah-outline/20 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-[11px] text-pravaah-muted/60 gap-4">
        <div>© 2026 PRAVAAH Intelligence Engine. Powered by Antigravity Autonomous Backend.</div>
        <div className="flex items-center gap-4">
          <Link href="/setup" className="hover:text-pravaah-cyan transition-colors">Agent Setup</Link>
          <Link href="/dashboard" className="hover:text-pravaah-cyan transition-colors">Telemetry</Link>
          <Link href="/feed" className="hover:text-pravaah-cyan transition-colors">Live Feed</Link>
          <Link href="/editorial" className="hover:text-pravaah-cyan transition-colors">Audit Log</Link>
        </div>
      </div>
    </footer>
  );
}
