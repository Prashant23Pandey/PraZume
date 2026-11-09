import React, { useState } from 'react';
import { Sparkles, Zap } from 'lucide-react';
import { useResumeStore } from '../../../context/ResumeContext';
import { ActionVerbPopover } from '../AIHelpers';

export const SummaryForm: React.FC = () => {
  const { resumeData, updatePersonalDetails } = useResumeStore();
  const { summary } = resumeData.personalDetails;
  const [showVerbPopover, setShowVerbPopover] = useState(false);

  const wordsCount = summary.trim() ? summary.trim().split(/\s+/).length : 0;
  const charsCount = summary.length;

  const handleInsertVerb = (verb: string) => {
    const updated = summary ? `${summary} ${verb}` : verb;
    updatePersonalDetails({ summary: updated });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Professional Summary</h2>
          <p className="text-xs text-slate-500 mt-0.5">A 2–4 sentence high-impact snapshot of your career expertise</p>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowVerbPopover(!showVerbPopover)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 text-xs font-bold border border-amber-200 transition-colors"
          >
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Power Verbs</span>
          </button>

          {showVerbPopover && (
            <div className="absolute right-0 top-10 z-30">
              <ActionVerbPopover
                onSelectVerb={handleInsertVerb}
                onClose={() => setShowVerbPopover(false)}
              />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700 block">
          Summary Narrative *
        </label>
        <textarea
          rows={6}
          value={summary}
          onChange={(e) => updatePersonalDetails({ summary: e.target.value })}
          placeholder="High-impact Software Engineer with 7+ years of experience architecting distributed cloud systems..."
          className="w-full text-sm rounded-2xl border-slate-200 focus:border-brand-500 focus:ring-brand-500 shadow-sm leading-relaxed p-4"
        />

        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono px-1">
          <span>Target: 40–80 words for optimal ATS scanning</span>
          <span className={`${wordsCount > 100 ? 'text-amber-500 font-bold' : ''}`}>
            {wordsCount} words · {charsCount} characters
          </span>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-100 text-xs text-slate-600 space-y-1">
        <div className="font-bold text-brand-900 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-brand-600" />
          <span>Pro Formula for ATS Impact:</span>
        </div>
        <p className="leading-relaxed">
          <strong>[Title/Years of Experience]</strong> + <strong>[2-3 Core Technical Specialties]</strong> + <strong>[Quantifiable Peak Accomplishment]</strong>. Avoid passive cliches like "Responsible for" or "Hardworking team player".
        </p>
      </div>
    </div>
  );
};

