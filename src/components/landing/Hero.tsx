import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  FileDown, 
  CheckCircle2, 
  CircleDollarSign, 
  Eye 
} from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';

export const Hero: React.FC = () => {
  const { setActiveView, resumeData } = useResumeStore();
  const { fullName, jobTitle } = resumeData.personalDetails;

  const trustBadges = [
    {
      icon: CircleDollarSign,
      label: 'Zero Hidden Fees',
      desc: 'No credit card or paywalls',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200/80',
    },
    {
      icon: ShieldCheck,
      label: 'Client-Side Privacy',
      desc: '100% local browser storage',
      color: 'text-brand-600 bg-brand-50 border-brand-200/80',
    },
    {
      icon: CheckCircle2,
      label: 'ATS Compatible',
      desc: 'Standard parseable structure',
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200/80',
    },
    {
      icon: FileDown,
      label: 'Unlimited Downloads',
      desc: 'High-res unwatermarked PDF',
      color: 'text-amber-600 bg-amber-50 border-amber-200/80',
    },
  ];

  return (
    <section className="relative pt-10 pb-20 sm:pt-16 sm:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Dynamic ambient radial gradients */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-brand-200/30 via-indigo-200/30 to-purple-200/20 blur-3xl -z-10 rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Notification Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs hover:border-brand-300 transition-colors">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-600"></span>
            </span>
            <span className="text-xs font-semibold text-slate-700">
              The 100% Client-Side Alternative to FlowCV & Novoresume
            </span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline text-xs font-bold text-brand-600">No Account Required</span>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-black text-slate-900 tracking-tight leading-[1.08] mb-6">
            Build a Job-Winning Resume for Free{' '}
            <span className="bg-gradient-to-r from-brand-600 via-indigo-600 to-sky-600 bg-clip-text text-transparent block sm:inline">
              — No Subscription Required.
            </span>
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-3xl mx-auto mb-10">
            Create professional, ATS-friendly resumes in minutes. 100% free forever, unlimited PDF downloads, and total data privacy with zero account registration.
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <button
              onClick={() => setActiveView('builder')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white text-base font-bold shadow-xl shadow-brand-600/25 hover:shadow-brand-600/35 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Create My Resume</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#templates"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 text-base font-bold border border-slate-200/90 shadow-sm hover:shadow transition-all"
            >
              <Eye className="w-4 h-4 text-slate-500" />
              <span>Explore Templates</span>
            </a>
          </div>

          {/* Trust Grid: 4 Pill Badges with Icons */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-16">
            {trustBadges.map((badge, idx) => {
              const Icon = badge.icon;
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl border bg-white shadow-xs text-left ${badge.color}`}
                >
                  <div className="p-2 rounded-xl bg-white shrink-0 shadow-xs border border-inherit">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {badge.label}
                    </div>
                    <div className="text-[10px] sm:text-xs text-slate-500 truncate">
                      {badge.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Preview Card: Side-by-side editing interface mockup */}
        <div className="max-w-5xl mx-auto rounded-3xl p-2.5 sm:p-4 bg-slate-900/5 ring-1 ring-slate-900/10 shadow-2xl backdrop-blur-sm">
          <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
            {/* macOS Chrome Header */}
            <div className="h-10 bg-slate-900 px-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-slate-800/80 text-[11px] font-mono text-slate-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>prazume-studio · live split-view</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="hidden sm:inline font-mono">A4 300 DPI</span>
              </div>
            </div>

            {/* Split Screen Mockup Container (Clickable to enter builder) */}
            <div
              onClick={() => setActiveView('builder')}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 p-4 sm:p-8 cursor-pointer group bg-gradient-to-b from-slate-950 to-slate-900"
            >
              {/* Left Column: Form Editor Simulation */}
              <div className="md:col-span-5 bg-slate-900/90 rounded-2xl p-5 border border-slate-800 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-brand-600/20 text-brand-400 flex items-center justify-center font-bold text-xs">
                        1
                      </div>
                      <span className="text-xs font-bold text-white uppercase tracking-wider">
                        Personal & Experience Form
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                      Auto-saved
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-[10px] text-slate-400 mb-1 font-semibold">Full Name</div>
                      <div className="h-9 bg-slate-800/80 rounded-xl border border-slate-700/80 px-3 flex items-center text-xs text-white font-medium">
                        {fullName || 'Alex Vance'}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 mb-1 font-semibold">Job Title</div>
                      <div className="h-9 bg-slate-800/80 rounded-xl border border-slate-700/80 px-3 flex items-center text-xs text-brand-300 font-medium">
                        {jobTitle || 'Senior Full Stack Engineer'}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-400 mb-1 font-semibold">Work Highlights (ATS Optimized)</div>
                      <div className="h-20 bg-slate-800/60 rounded-xl border border-slate-700/80 p-3 text-[11px] text-slate-300 leading-relaxed overflow-hidden">
                        • Spearheaded client-side architecture cutting API latency by 45%...<br />
                        • Mentored 8 engineers and increased unit test coverage to 91%...
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">Synced to LocalStorage</span>
                  <span className="text-brand-400 font-bold group-hover:underline flex items-center gap-1">
                    Open in Editor &rarr;
                  </span>
                </div>
              </div>

              {/* Right Column: Live A4 Canvas Preview Simulation */}
              <div className="md:col-span-7 flex items-center justify-center relative">
                {/* Floating pill badge */}
                <div className="absolute -top-3 right-4 z-10 hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500 text-white text-[11px] font-bold shadow-lg">
                  <Sparkles className="w-3 h-3" />
                  <span>Real-Time Reactive Canvas</span>
                </div>

                <div className="w-full bg-white rounded-xl shadow-2xl p-6 sm:p-8 text-slate-900 transform transition-transform group-hover:scale-[1.02] duration-300 border border-slate-200">
                  {/* Miniature Resume Header */}
                  <div className="flex items-start justify-between pb-4 border-b border-slate-100">
                    <div>
                      <h3 className="text-xl font-black text-brand-600 tracking-tight leading-none">
                        {fullName || 'Alex Vance'}
                      </h3>
                      <p className="text-xs font-bold text-slate-700 mt-1">
                        {jobTitle || 'Senior Full Stack Engineer & Cloud Architect'}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-[10px] text-slate-500 font-medium">
                        <span>alex.vance@example.dev</span>
                        <span>•</span>
                        <span>San Francisco, CA</span>
                        <span>•</span>
                        <span>github.com/alexvance</span>
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-black text-base flex items-center justify-center shrink-0 shadow-sm">
                      AV
                    </div>
                  </div>

                  {/* Summary & Experience Mini Blocks */}
                  <div className="mt-4 space-y-3 text-left">
                    <div>
                      <div className="text-[10px] font-extrabold text-brand-600 uppercase tracking-wider mb-1">
                        Professional Summary
                      </div>
                      <p className="text-[10px] text-slate-600 leading-relaxed">
                        High-impact engineer with 7+ years of experience architecting distributed cloud systems and local-first frontend applications.
                      </p>
                    </div>

                    <div>
                      <div className="text-[10px] font-extrabold text-brand-600 uppercase tracking-wider mb-1">
                        Recent Experience
                      </div>
                      <div className="flex items-baseline justify-between text-[11px]">
                        <span className="font-bold text-slate-800">Staff Frontend Engineer — Vortex Cloud</span>
                        <span className="text-[9px] text-slate-400 font-mono">2022 – Present</span>
                      </div>
                      <p className="text-[10px] text-slate-600 mt-0.5">
                        • Architected high-performance dashboard streaming 120,000 metrics/sec.
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-slate-100 text-slate-700">React</span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-slate-100 text-slate-700">TypeScript</span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-slate-100 text-slate-700">Tailwind CSS</span>
                      <span className="px-2 py-0.5 rounded text-[9px] font-semibold bg-slate-100 text-slate-700">Node.js</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                    <span>A4 Standard Layout</span>
                    <span className="text-brand-600 font-bold flex items-center gap-1">
                      Click to start editing &rarr;
                    </span>
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
