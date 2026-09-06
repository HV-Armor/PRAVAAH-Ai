'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Radio, Activity, Terminal, ShieldAlert, Cpu, Sparkles, Menu, X, ArrowRight } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Setup', path: '/setup' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Live Feed', path: '/feed' },
    { name: 'Knowledge Graph', path: '/knowledge-graph' },
    { name: 'Audit Log', path: '/editorial' },
    { name: 'AI Flow', path: '/flow' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-pravaah-bg/90 backdrop-blur-md border-b border-pravaah-outline/30 h-16 px-4 md:px-8 flex justify-between items-center transition-all">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-pravaah-teal to-pravaah-cyan p-0.5 flex items-center justify-center shadow-[0_0_15px_rgba(0,184,169,0.4)] group-hover:shadow-[0_0_20px_rgba(92,225,230,0.6)] transition-all">
            <div className="w-full h-full bg-pravaah-bg rounded-[4px] flex items-center justify-center">
              <span className="font-bold text-pravaah-cyan font-mono text-lg tracking-tighter">P</span>
            </div>
          </div>
          <span className="font-bold text-xl text-pravaah-text tracking-tight font-sans">
            Pravaah
          </span>
          <span className="hidden sm:inline-block text-[10px] uppercase font-mono px-1.5 py-0.5 rounded border border-pravaah-teal/40 text-pravaah-primary bg-pravaah-teal/10">
            Autonomous Engine
          </span>
        </Link>
      </div>

      {/* Center Nav Links */}
      <nav className="hidden lg:flex items-center gap-5">
        {/* Active Autonomous Status Indicator */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-pravaah-lowest border border-pravaah-outline/40 font-mono text-xs text-pravaah-muted">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pravaah-cyan opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-pravaah-teal"></span>
          </span>
          <span className="text-[11px] uppercase tracking-wider font-semibold text-pravaah-cyan">
            SYSTEM STATUS: AUTONOMOUS LOOP ACTIVE
          </span>
        </div>

        <div className="h-4 w-[1px] bg-pravaah-outline/40"></div>

        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`font-mono text-xs tracking-wide transition-colors py-1 px-2 rounded-md ${
                isActive
                  ? 'text-pravaah-primary font-semibold bg-pravaah-teal/15 border border-pravaah-teal/30'
                  : 'text-pravaah-muted hover:text-pravaah-cyan hover:bg-pravaah-card/50'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Right Header Action */}
      <div className="flex items-center gap-3">
        <ThemeToggle />

        <Link
          href="/login"
          className="hidden md:flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-pravaah-muted hover:text-pravaah-primary transition-colors font-medium px-2"
        >
          Login
        </Link>

        <Link
          href="/setup"
          className="hidden md:flex items-center gap-2 font-mono text-xs uppercase tracking-wider border border-pravaah-teal/60 text-pravaah-primary hover:text-pravaah-bg hover:bg-pravaah-teal px-4 py-2 rounded shadow-[0_0_15px_rgba(0,184,169,0.2)] hover:shadow-[0_0_20px_rgba(0,184,169,0.5)] transition-all font-medium"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Initialize Agent</span>
        </Link>

        {/* Mobile menu toggle button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-pravaah-text p-1.5 rounded-md border border-pravaah-outline/40 hover:bg-pravaah-card"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-16 left-0 w-full bg-pravaah-bg/95 backdrop-blur-xl border-b border-pravaah-outline p-5 flex flex-col gap-3 shadow-2xl">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-pravaah-lowest border border-pravaah-outline/40 font-mono text-xs text-pravaah-cyan mb-2">
            <span className="w-2 h-2 rounded-full bg-pravaah-teal animate-pulse"></span>
            AUTONOMOUS BACKGROUND LOOP ACTIVE
          </div>

          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`font-mono text-sm py-2 px-3 rounded ${
                pathname === item.path
                  ? 'bg-pravaah-teal/20 text-pravaah-primary border-l-2 border-pravaah-teal'
                  : 'text-pravaah-text hover:bg-pravaah-card'
              }`}
            >
              {item.name}
            </Link>
          ))}

          <Link
            href="/setup"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 text-center bg-pravaah-teal text-white dark:text-pravaah-bg font-mono text-xs uppercase font-bold py-2.5 rounded shadow-[0_0_15px_rgba(0,184,169,0.4)]"
          >
            Initialize Agent →
          </Link>

          <Link
            href="/login"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-1 text-center bg-transparent border border-pravaah-outline text-pravaah-text hover:bg-pravaah-card font-mono text-xs uppercase font-bold py-2.5 rounded"
          >
            Sign In
          </Link>
        </div>
      )}
    </header>
  );
}
