import React from 'react';
import { Sparkles, ShieldCheck, Code2, Heart } from 'lucide-react';
import { CreatorCard } from './CreatorCard';

export const CreatorPage: React.FC = () => {
  const architecturalPillars = [
    {
      icon: ShieldCheck,
      title: 'Zero Data Harvesting',
      description: 'Your personal contact details, career history, and references never leave your browser.',
    },
    {
      icon: Code2,
      title: '100% Client-Side Engine',
      description: 'Engineered with React 18, TypeScript, and Vite with zero reliance on cloud databases or external APIs.',
    },
    {
      icon: Heart,
      title: 'Free Forever For Everyone',
      description: 'A genuine open utility designed to eliminate paywall barriers for students and job seekers worldwide.',
    },
  ];

  return (
    <section id="creator" className="py-20 sm:py-28 bg-[#f8f9fc] border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-[11px] font-sans font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Open Source Creator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight">
            Built by <span className="italic font-normal text-purple-600">Prashant Pandey</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
            Computer Science & AI Engineer · Full-Stack Developer · Founder
          </p>
        </div>

        {/* Creator Card Component (Exact Photo 1 Aesthetic) */}
        <div className="mb-14">
          <CreatorCard />
        </div>

        {/* Supporting Architectural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {architecturalPillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 text-left hover:border-purple-300 hover:shadow-lg transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1">{p.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{p.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
