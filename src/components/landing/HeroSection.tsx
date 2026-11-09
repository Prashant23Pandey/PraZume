import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Eye, Download, CheckCircle2 } from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';

export const HeroSection: React.FC = () => {
  const { setActiveView } = useResumeStore();

  return (
    <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-slate-100/30">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-brand-300/20 via-indigo-200/20 to-sky-300/10 blur-3xl -z-10 pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/60 text-brand-700 text-xs font-semibold mb-6 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>FlowCV Experience · Zero Subscriptions · 100% Client-Side</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-[1.1] mb-6 max-w-4xl mx-auto">
          Craft High-Impact Resumes.{' '}
          <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-sky-500 bg-clip-text text-transparent">
            Without Paywalls or Watermarks.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
          Tired of spending hours writing your CV only to be hit with a \$19/month subscription at download? CVForge runs completely in your browser with instant PDF export and zero cloud lock-in.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveView('builder')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-base font-bold shadow-lg shadow-brand-500/25 hover:shadow-brand-500/35 transition-all transform hover:-translate-y-0.5"
          >
            <span>Start Building for Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <a
            href="#features"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-100 text-slate-700 text-base font-semibold border border-slate-200 transition-colors shadow-sm"
          >
            <Eye className="w-4 h-4 text-slate-500" />
            <span>Explore Architecture</span>
          </a>
        </div>

        {/* Value Prop Badges */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm font-medium text-slate-600">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>No Account Required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>100% Local-First Privacy</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Download className="w-4 h-4 text-emerald-500" />
            <span>Unwatermarked High-Res PDF</span>
          </div>
        </div>

        {/* Hero Interactive Workspace Mockup */}
        <div className="mt-14 max-w-5xl mx-auto rounded-2xl p-2 bg-slate-900/5 ring-1 ring-slate-900/10 shadow-2xl">
          <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-2xl">
            {/* Window bar */}
            <div className="h-9 bg-slate-800/90 px-4 flex items-center justify-between border-b border-slate-700/60">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                cvforge.app — live preview canvas
              </div>
              <div className="text-[11px] text-slate-400 font-medium">A4 300 DPI</div>
            </div>

            {/* Simulated Live Workspace UI */}
            <div 
              onClick={() => setActiveView('builder')}
              className="grid grid-cols-1 md:grid-cols-12 bg-slate-950 p-4 sm:p-6 gap-6 cursor-pointer group"
            >
              {/* Left pane: simulated form */}
              <div className="hidden md:flex flex-col md:col-span-5 bg-slate-900 rounded-xl p-5 border border-slate-800 text-left">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-brand-500"></div>
                    <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Experience Section</span>
                  </div>
                  <span className="text-[10px] text-brand-400 font-mono">Synced</span>
                </div>
                <div className="space-y-3">
                  <div className="h-8 bg-slate-800 rounded-lg border border-slate-700 px-3 flex items-center text-xs text-slate-300">
                    Vortex Cloud Solutions
                  </div>
                  <div className="h-8 bg-slate-800 rounded-lg border border-slate-700 px-3 flex items-center text-xs text-slate-300">
                    Staff Frontend Engineer
                  </div>
                  <div className="h-20 bg-slate-800/80 rounded-lg border border-slate-700 p-2.5 text-[11px] text-slate-400 leading-relaxed">
                    • Architected high-performance web dashboard processing 120k metrics/sec...
                  </div>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Auto-saved in localStorage</span>
                  <span className="text-brand-400 font-semibold group-hover:underline flex items-center gap-1">
                    Edit Live &rarr;
                  </span>
                </div>
              </div>

              {/* Right pane: live resume preview sheet */}
              <div className="col-span-12 md:col-span-7 flex items-center justify-center">
                <div className="w-full max-w-sm sm:max-w-md bg-white rounded-lg shadow-xl p-6 text-slate-900 text-left transform transition-transform group-hover:scale-[1.02]">
                  <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
                    <div className="w-12 h-12 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold text-lg">
                      AV
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">Alex Vance</h4>
                      <p className="text-xs text-brand-600 font-medium">Senior Full Stack Engineer</p>
                    </div>
                  </div>
                  <div className="pt-3 space-y-2">
                    <div className="h-2 w-3/4 bg-slate-200 rounded"></div>
                    <div className="h-2 w-5/6 bg-slate-100 rounded"></div>
                    <div className="h-2 w-1/2 bg-slate-100 rounded"></div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">2-Column Modern Template</span>
                    <span className="text-[10px] font-bold text-brand-600">Click to Open &rarr;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

