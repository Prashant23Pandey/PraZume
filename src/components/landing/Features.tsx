import React from 'react';
import { 
  XCircle, 
  CheckCircle2, 
  Sparkles, 
  Sliders, 
  Type, 
  Download, 
  FileJson, 
  ArrowRight,
  Check
} from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';

export const Features: React.FC = () => {
  const { setActiveView } = useResumeStore();

  const comparisonFeatures = [
    {
      aspect: 'Pricing Model',
      paid: '$15 – $30 per month recurring charge',
      free: '100% Free Forever ($0.00)',
      freeHighlight: true,
    },
    {
      aspect: 'Export Watermarks',
      paid: 'Watermarks injected on free tier',
      free: 'Zero watermarks on any export',
      freeHighlight: true,
    },
    {
      aspect: 'Account & Privacy',
      paid: 'Requires sign-up, email & tracking',
      free: 'No account needed, 100% client-side privacy',
      freeHighlight: true,
    },
    {
      aspect: 'Data Storage',
      paid: 'Stored on centralized company servers',
      free: 'Persisted strictly in your local browser',
      freeHighlight: true,
    },
    {
      aspect: 'PDF Export Quality',
      paid: 'Rasterized or capped downloads',
      free: 'High-res DPI + vector browser print engine',
      freeHighlight: true,
    },
    {
      aspect: 'Data Portability',
      paid: 'Locked into proprietary ecosystem',
      free: 'Full JSON backup export & restore anytime',
      freeHighlight: true,
    },
  ];

  const coreFeatures = [
    {
      icon: Sliders,
      title: 'Interactive Layout Editor',
      description: 'Switch between single-column and asymmetric two-column splits in one click. Customize left-sidebar width percentages dynamically to fit your content perfectly.',
      badge: 'FlowCV-Inspired',
    },
    {
      icon: Type,
      title: 'Customizable Fonts & Spacing',
      description: 'Choose from Modern Sans, Executive Serif, or Tech Mono typeface pairings. Adjust body font sizes (pt), heading scales, line heights, and millimeter page margins.',
      badge: 'Typography',
    },
    {
      icon: Download,
      title: 'Instant High-DPI PDF Export',
      description: 'Generate publication-ready A4 PDFs directly in the browser via high-DPI canvas capture, or use native vector printing stylesheets for razor-sharp recruiter reviews.',
      badge: 'Dual Engine',
    },
    {
      icon: FileJson,
      title: 'Resume Data Import & Export (JSON)',
      description: 'Never lose your resume data. Download your complete resume payload as clean JSON to version-control on GitHub, or import an existing draft instantly.',
      badge: 'Portability',
    },
  ];

  return (
    <section id="features" className="py-20 sm:py-28 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-[11px] font-sans font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Honest, Transparent Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight">
            Stop Paying for <span className="italic font-normal text-purple-600">Download Buttons</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
            Compare why thousands of developers, designers, and job seekers left subscription resume sites for our open, client-side studio.
          </p>
        </div>

        {/* Side-by-Side Comparison Card */}
        <div className="max-w-5xl mx-auto rounded-3xl overflow-hidden border border-slate-200 shadow-xl mb-20 bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Card: Paid Resume Builders */}
            <div className="p-8 sm:p-10 bg-slate-50/80 border-b md:border-b-0 md:border-r border-slate-200">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider mb-2">
                <XCircle className="w-4 h-4" />
                <span>The Predatory SaaS Pattern</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                Paid Resume Builders
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                They lure you in with "free templates", wait until you spend 2 hours typing, and hold your download hostage.
              </p>

              <div className="space-y-4">
                {comparisonFeatures.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600">
                    <span className="p-1 rounded-full bg-rose-100 text-rose-600 shrink-0 mt-0.5">
                      <XCircle className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <span className="font-semibold text-slate-700">{item.aspect}: </span>
                      <span className="text-slate-500">{item.paid}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card: This Free Builder */}
            <div className="p-8 sm:p-10 bg-gradient-to-br from-brand-900 via-slate-900 to-indigo-950 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>The Developer-First Standard</span>
              </div>
              <h3 className="text-2xl font-black text-white mb-2">
                PraZume Resume Studio
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mb-6">
                100% free forever, total privacy, unlimited unwatermarked PDF exports, and zero server dependencies.
              </p>

              <div className="space-y-4">
                {comparisonFeatures.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm">
                    <span className="p-1 rounded-full bg-emerald-500/20 text-emerald-400 shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 font-bold" />
                    </span>
                    <div>
                      <span className="font-semibold text-white">{item.aspect}: </span>
                      <span className="text-emerald-300 font-medium">{item.free}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800">
                <button
                  onClick={() => setActiveView('builder')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-bold text-sm shadow-md transition-all"
                >
                  <span>Build Your Free Resume Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Feature List Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Powerful Features Crafted for Precision
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Every tool and customization you need to pass ATS filters and impress hiring managers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {coreFeatures.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="p-7 sm:p-8 rounded-3xl bg-slate-50 border border-slate-200/90 hover:border-brand-300 hover:bg-white hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-slate-200/60 text-slate-700">
                        {feat.badge}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2">
                      {feat.title}
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center text-xs font-bold text-brand-600 group-hover:text-brand-700">
                    <span className="flex items-center gap-1">
                      Ready to customize in live studio &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
