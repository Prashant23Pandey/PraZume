import React from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Sliders, 
  Download, 
  FileJson, 
  Zap, 
  Layout 
} from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: ShieldCheck,
      iconColor: 'text-emerald-600 bg-emerald-50',
      title: '100% Local-First Privacy',
      description: 'Your career data belongs to you. Everything is stored directly in your browser’s localStorage. Zero analytics, zero data harvesting, and zero server storage.'
    },
    {
      icon: Zap,
      iconColor: 'text-amber-600 bg-amber-50',
      title: 'Zero Paywalls or Subscriptions',
      description: 'Never get held hostage at the download button. Export unlimited high-resolution PDF resumes with zero watermarks and zero recurring credit card charges.'
    },
    {
      icon: Sliders,
      iconColor: 'text-brand-600 bg-brand-50',
      title: 'FlowCV-Grade Customizer',
      description: 'Fine-tune every typographic nuance: font family pairings (Sans, Serif, Mono), line spacing, section gaps, page margins (mm), and asymmetric column splits.'
    },
    {
      icon: Download,
      iconColor: 'text-indigo-600 bg-indigo-50',
      title: 'Dual-Engine PDF Export',
      description: 'Built-in high-DPI canvas rasterization with smart multi-page break detection plus native browser vector print styling (@media print).'
    },
    {
      icon: FileJson,
      iconColor: 'text-purple-600 bg-purple-50',
      title: 'JSON Backup & Portability',
      description: 'Download your full resume payload as clean JSON at any time. Restore or swap profiles instantly with one click, fully offline.'
    },
    {
      icon: Layout,
      iconColor: 'text-sky-600 bg-sky-50',
      title: 'ATS-Optimized Formatting',
      description: 'Semantic document hierarchy and standard section identifiers ensure automated Applicant Tracking Systems parse your credentials effortlessly.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            Architectural Highlights
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Engineered for Freedom & Precision
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            A developer-crafted system replacing predatory SaaS resume platforms with clean client-side elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                className="group relative p-7 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:bg-white hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${feat.iconColor} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feat.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feat.description}</p>
              </div>
            );
          })}
        </div>

        {/* Comparison Callout banner */}
        <div className="mt-16 bg-slate-900 rounded-2xl p-8 sm:p-10 text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-brand-400 font-mono text-xs uppercase tracking-wider font-bold">Why CVForge?</span>
              <h3 className="text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight">
                Traditional Resume Sites vs CVForge
              </h3>
              <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                Most online builders hide the price until you finish typing, sell your email to recruiters, and inject watermarks on free downloads. CVForge is 100% free, forever, with your data safe in your browser.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-rose-400 font-bold mb-2">Traditional Builders</div>
                <ul className="space-y-1.5 text-slate-400">
                  <li>&times; \$15-30 / month recurring</li>
                  <li>&times; Account creation required</li>
                  <li>&times; Watermarks on free exports</li>
                  <li>&times; Cloud storage vulnerability</li>
                </ul>
              </div>
              <div className="p-4 rounded-xl bg-brand-950/60 border border-brand-500/40">
                <div className="text-brand-300 font-bold mb-2">CVForge Studio</div>
                <ul className="space-y-1.5 text-slate-200 font-medium">
                  <li>✓ Free forever (0.00)</li>
                  <li>✓ No signup or email needed</li>
                  <li>✓ Crisp vector & high-res PDF</li>
                  <li>✓ 100% Local browser storage</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
