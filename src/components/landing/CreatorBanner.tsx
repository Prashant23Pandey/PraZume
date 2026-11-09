import React from 'react';
import { User } from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';

export const CreatorBanner: React.FC = () => {
  const { setIsCreatorModalOpen } = useResumeStore();

  return (
    <section className="py-12 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-500 to-indigo-500 flex items-center justify-center font-bold text-white text-xl shadow-lg ring-2 ring-white/20 shrink-0">
              PP
            </div>
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <h3 className="text-lg font-bold text-white">Built by Prashant Pandey</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-brand-500/20 text-brand-300 border border-brand-400/30">
                  Open Source
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Dedicated to developing privacy-respecting client-side developer tooling that puts people first.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCreatorModalOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-xs sm:text-sm font-semibold shadow-md transition-all shrink-0"
          >
            <User className="w-4 h-4 text-brand-600" />
            <span>Meet the Architect</span>
          </button>
        </div>
      </div>
    </section>
  );
};
