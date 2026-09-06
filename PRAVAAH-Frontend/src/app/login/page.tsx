'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, ArrowRight, ShieldCheck, Activity, Cpu, Database, Network, User, MessageSquare, ArrowLeft } from 'lucide-react';

export default function LoginPage() {
  const [view, setView] = useState<'login' | 'request_access'>('login');
  
  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Request Access State
  const [name, setName] = useState('');
  const [requestEmail, setRequestEmail] = useState('');
  const [reason, setReason] = useState('');
  
  // Shared State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSuccess(true);
  };

  const handleRequestAccess = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setSuccess(true);
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    // Simulate OAuth redirect delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="w-full min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
        <div className="max-w-md w-full px-4 py-20 flex flex-col items-center text-center animate-in fade-in surface-card rounded-2xl shadow-xl">
          <div className="w-16 h-16 bg-pravaah-teal/20 rounded-full flex items-center justify-center mb-6">
            <ShieldCheck className="w-8 h-8 text-pravaah-primary" />
          </div>
          <h1 className="text-3xl font-bold font-sans text-pravaah-text mb-4">
            {view === 'login' ? 'Authentication Successful' : 'Request Submitted'}
          </h1>
          <p className="text-pravaah-muted font-mono text-sm mb-8">
            {view === 'login' 
              ? 'Secure connection established to the PRAVAAH autonomous engine.'
              : 'Your access request has been sent. Our team will review your application and notify you.'}
          </p>
          {view === 'login' ? (
            <Link 
              href="/dashboard"
              className="px-6 py-3 bg-pravaah-teal text-white dark:text-pravaah-bg font-mono text-sm font-bold uppercase rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              Enter Dashboard
            </Link>
          ) : (
            <button 
              onClick={() => {
                setSuccess(false);
                setView('login');
              }}
              className="px-6 py-3 bg-pravaah-surface border border-pravaah-outline text-pravaah-text font-mono text-sm font-bold uppercase rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              Return to Login
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-64px)] flex">
      {/* Left Column - Branding & AI Details */}
      <div className="hidden lg:flex lg:w-1/2 bg-pravaah-lowest border-r border-pravaah-outline/40 flex-col justify-between p-12 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-pravaah-primary rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 -left-20 w-80 h-80 bg-pravaah-cyan rounded-full blur-[100px]"></div>
        </div>

        {/* Logo and Intro */}
        <div className="relative z-10 flex flex-col gap-6 max-w-lg">
          <div className="flex items-center gap-4 group cursor-default">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-pravaah-teal to-pravaah-cyan p-1 flex items-center justify-center shadow-[0_0_30px_rgba(30,58,138,0.3)] dark:shadow-[0_0_30px_rgba(0,184,169,0.3)] transition-all">
              <div className="w-full h-full bg-pravaah-bg rounded-[8px] flex items-center justify-center">
                <span className="font-bold text-pravaah-cyan font-mono text-4xl tracking-tighter">P</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-4xl text-pravaah-text tracking-tight font-sans">
                Pravaah<span className="text-pravaah-teal">.ai</span>
              </span>
              <span className="text-xs uppercase font-mono tracking-widest text-pravaah-primary">
                Autonomous Intelligence
              </span>
            </div>
          </div>

          <p className="text-pravaah-muted text-lg mt-6 leading-relaxed">
            Welcome to the command center. Pravaah is a self-driving AI engine that continuously discovers, researches, and maps complex information architectures in real-time.
          </p>
        </div>

        {/* Feature List */}
        <div className="relative z-10 flex flex-col gap-6 mt-12">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-pravaah-card border border-pravaah-outline/50 text-pravaah-primary">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-pravaah-text font-bold font-sans text-lg">Continuous Autonomous Loops</h3>
              <p className="text-pravaah-muted font-mono text-sm mt-1">Agents automatically generate hypothesis, run web searches, and compile research without human intervention.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-pravaah-card border border-pravaah-outline/50 text-pravaah-teal">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-pravaah-text font-bold font-sans text-lg">Self-Organizing Knowledge</h3>
              <p className="text-pravaah-muted font-mono text-sm mt-1">Ingested data is automatically vectorized and categorized into distinct focus domains like Geopolitics, Gaming, and Technology.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-pravaah-card border border-pravaah-outline/50 text-pravaah-cyan">
              <Network className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-pravaah-text font-bold font-sans text-lg">Dynamic Knowledge Graph</h3>
              <p className="text-pravaah-muted font-mono text-sm mt-1">Visualize complex entity relationships dynamically mapped by the Pravaah engine.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column - Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-pravaah-bg">
        <div className="w-full max-w-md flex flex-col gap-8 relative">
          
          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pravaah-teal to-pravaah-cyan p-0.5 flex items-center justify-center shadow-lg">
              <div className="w-full h-full bg-pravaah-bg rounded-[6px] flex items-center justify-center">
                <span className="font-bold text-pravaah-cyan font-mono text-xl">P</span>
              </div>
            </div>
          </div>

          {view === 'login' ? (
            /* ============================== LOGIN VIEW ============================== */
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="text-center lg:text-left mb-8">
                <h1 className="font-sans text-3xl font-bold text-pravaah-text">
                  Welcome Back
                </h1>
                <p className="font-mono text-xs text-pravaah-muted mt-2">
                  Authenticate to access the intelligence platform
                </p>
              </div>

              <div className="surface-card rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-xl w-full">
                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs font-bold text-pravaah-text uppercase tracking-wider">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-pravaah-muted" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="agent@pravaah.ai"
                        className="w-full bg-pravaah-lowest border border-pravaah-outline rounded-lg pl-10 pr-4 py-3 font-mono text-sm text-pravaah-text focus:border-pravaah-teal focus:ring-1 focus:ring-pravaah-teal focus:outline-none transition-all placeholder:text-pravaah-muted/50"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label className="font-mono text-xs font-bold text-pravaah-text uppercase tracking-wider">
                        Password
                      </label>
                      <button type="button" className="font-mono text-[10px] text-pravaah-primary hover:underline">
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-pravaah-muted" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-pravaah-lowest border border-pravaah-outline rounded-lg pl-10 pr-4 py-3 font-mono text-sm text-pravaah-text focus:border-pravaah-teal focus:ring-1 focus:ring-pravaah-teal focus:outline-none transition-all placeholder:text-pravaah-muted/50"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !email || !password}
                    className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-pravaah-teal to-pravaah-cyan text-white dark:text-pravaah-bg font-mono text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Activity className="w-5 h-5 animate-spin" />
                        <span>Authenticating...</span>
                      </>
                    ) : (
                      <>
                        <span>Secure Sign In</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-pravaah-outline"></div>
                  <span className="flex-shrink-0 mx-4 text-pravaah-muted font-mono text-xs">or continue with</span>
                  <div className="flex-grow border-t border-pravaah-outline"></div>
                </div>

                <button 
                  type="button" 
                  onClick={handleGoogleLogin}
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-pravaah-outline bg-pravaah-lowest hover:bg-pravaah-card disabled:opacity-50 transition-colors font-mono text-xs text-pravaah-text"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Sign in with Google</span>
                </button>
              </div>

              <div className="text-center mt-8 font-mono text-xs text-pravaah-muted">
                Don't have an account?{' '}
                <button onClick={() => setView('request_access')} className="text-pravaah-primary font-bold hover:underline">
                  Request Access
                </button>
              </div>
            </div>
          ) : (
            /* ============================== REQUEST ACCESS VIEW ============================== */
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <button 
                onClick={() => setView('login')}
                className="mb-6 flex items-center gap-1 font-mono text-xs text-pravaah-muted hover:text-pravaah-primary transition-colors"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Back to Login</span>
              </button>
              
              <div className="text-center lg:text-left mb-8">
                <h1 className="font-sans text-3xl font-bold text-pravaah-text">
                  Request Access
                </h1>
                <p className="font-mono text-xs text-pravaah-muted mt-2">
                  Apply for entry to the PRAVAAH autonomous engine.
                </p>
              </div>

              <div className="surface-card rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-xl w-full">
                <form onSubmit={handleRequestAccess} className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs font-bold text-pravaah-text uppercase tracking-wider">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-pravaah-muted" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-pravaah-lowest border border-pravaah-outline rounded-lg pl-10 pr-4 py-3 font-mono text-sm text-pravaah-text focus:border-pravaah-teal focus:ring-1 focus:ring-pravaah-teal focus:outline-none transition-all placeholder:text-pravaah-muted/50"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs font-bold text-pravaah-text uppercase tracking-wider">
                      Work Email
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-pravaah-muted" />
                      <input
                        type="email"
                        required
                        value={requestEmail}
                        onChange={(e) => setRequestEmail(e.target.value)}
                        placeholder="john@company.com"
                        className="w-full bg-pravaah-lowest border border-pravaah-outline rounded-lg pl-10 pr-4 py-3 font-mono text-sm text-pravaah-text focus:border-pravaah-teal focus:ring-1 focus:ring-pravaah-teal focus:outline-none transition-all placeholder:text-pravaah-muted/50"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs font-bold text-pravaah-text uppercase tracking-wider">
                      Why do you need access?
                    </label>
                    <div className="relative">
                      <MessageSquare className="w-4 h-4 absolute left-3 top-3 text-pravaah-muted" />
                      <textarea
                        required
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="I want to build autonomous knowledge bases..."
                        rows={3}
                        className="w-full bg-pravaah-lowest border border-pravaah-outline rounded-lg pl-10 pr-4 py-3 font-mono text-sm text-pravaah-text focus:border-pravaah-teal focus:ring-1 focus:ring-pravaah-teal focus:outline-none transition-all placeholder:text-pravaah-muted/50 resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !name || !requestEmail || !reason}
                    className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-pravaah-teal to-pravaah-cyan text-white dark:text-pravaah-bg font-mono text-sm font-bold uppercase tracking-wider shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Activity className="w-5 h-5 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Request</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
