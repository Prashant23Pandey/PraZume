import React from 'react';
import { ArrowRight, Check, Layout, FileText } from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';
import { TemplateId } from '../../types/resume';

export const Templates: React.FC = () => {
  const { setActiveView, updateLayout } = useResumeStore();

  const templateCards: {
    id: TemplateId;
    title: string;
    tagline: string;
    description: string;
    badge: string;
    bestFor: string;
    features: string[];
    previewBg: string;
  }[] = [
    {
      id: 'modern',
      title: 'Modern Asymmetric',
      tagline: 'FlowCV-Inspired 2-Column Split',
      description: 'Features a contemporary colored accent strip, customizable sidebar column ratios (25% to 45%), and prominent skill badges.',
      badge: 'Most Popular',
      bestFor: 'Software Engineers, Product Managers & Cloud Architects',
      features: [
        'Configurable 1 or 2 column split',
        'Accent header banner with photo support',
        'Visual skill badge hierarchy',
        'Optimized for 1 or 2 page layouts'
      ],
      previewBg: 'from-sky-50 to-indigo-50 border-sky-200',
    },
    {
      id: 'classic',
      title: 'Executive Classic',
      tagline: 'Timeless Serif Typography',
      description: 'Traditional formal hierarchy with elegant horizontal dividing rules and centered executive headers designed for corporate leadership.',
      badge: 'Executive',
      bestFor: 'Finance, Law, Consulting & Senior Leadership',
      features: [
        'Merriweather executive serif pairing',
        'Standard ATS-compliant linear flow',
        'Emphasis on job tenure and credentials',
        'Clean, formal black & white contrast'
      ],
      previewBg: 'from-amber-50 to-orange-50 border-amber-200',
    },
    {
      id: 'minimal',
      title: 'Scandinavian Minimal',
      tagline: 'Ultra-Clean Whitespace Focus',
      description: 'Stripped of all visual clutter, focusing strictly on high-readability typography, light dividers, and concise formatting.',
      badge: 'Minimalist',
      bestFor: 'Designers, Writers, Researchers & Early Career',
      features: [
        'Generous whitespace and line height',
        'Subtle mono dates and metadata styling',
        'Distraction-free reading flow',
        'High ink economy for physical prints'
      ],
      previewBg: 'from-slate-50 to-stone-50 border-slate-200',
    },
  ];

  const handleSelectTemplate = (id: TemplateId) => {
    updateLayout({ templateId: id });
    setActiveView('builder');
  };

  return (
    <section id="templates" className="py-20 sm:py-28 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-[11px] font-sans font-bold tracking-widest uppercase mb-4">
            <Layout className="w-3.5 h-3.5 text-purple-600" />
            <span>Curated Design Templates</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight">
            Designed for <span className="italic font-normal text-purple-600">Recruiter Impact</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
            Every template is 100% customizable: change colors, fonts, margins, and column widths anytime in the live customizer.
          </p>
        </div>

        {/* Template Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {templateCards.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              {/* Card Header & Preview Graphic */}
              <div className={`p-6 bg-gradient-to-br ${tpl.previewBg} border-b border-inherit`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-white text-slate-800 shadow-xs border border-slate-200/60">
                    {tpl.badge}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-brand-600">
                    <FileText className="w-3.5 h-3.5" />
                    <span>A4 Ready</span>
                  </div>
                </div>

                <h3 className="text-xl font-black text-slate-900 mb-1">
                  {tpl.title}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mb-4">
                  {tpl.tagline}
                </p>

                {/* Simulated Mini Resume Wireframe */}
                <div className="bg-white rounded-xl shadow-md p-4 space-y-2.5 border border-slate-200/60 group-hover:scale-[1.02] transition-transform">
                  <div className="flex items-center gap-3 pb-2.5 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-bold text-xs flex items-center justify-center">
                      CV
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="h-2 w-24 bg-slate-800 rounded"></div>
                      <div className="h-1.5 w-32 bg-slate-400 rounded"></div>
                    </div>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <div className="h-1.5 w-full bg-slate-200 rounded"></div>
                    <div className="h-1.5 w-5/6 bg-slate-200 rounded"></div>
                    <div className="h-1.5 w-4/6 bg-slate-200 rounded"></div>
                  </div>
                  <div className="flex gap-1.5 pt-2">
                    <div className="h-3 w-12 bg-slate-100 rounded"></div>
                    <div className="h-3 w-12 bg-slate-100 rounded"></div>
                    <div className="h-3 w-12 bg-slate-100 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Best Suited For
                  </div>
                  <p className="text-xs font-medium text-brand-700 bg-brand-50 p-2.5 rounded-xl border border-brand-100 mb-4">
                    {tpl.bestFor}
                  </p>

                  <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Key Features
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {tpl.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 font-bold" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleSelectTemplate(tpl.id)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-900 hover:bg-brand-600 text-white font-bold text-xs shadow-sm hover:shadow transition-all group-hover:bg-brand-600"
                >
                  <span>Use This Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
