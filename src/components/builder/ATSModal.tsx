import React from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Lightbulb, 
  ShieldCheck, 
  Zap, 
  Award
} from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';
import { analyzeResumeForATS } from '../../utils/atsChecker';

export const ATSModal: React.FC = () => {
  const { resumeData, isATSModalOpen, setIsATSModalOpen } = useResumeStore();

  if (!isATSModalOpen) return null;

  const result = analyzeResumeForATS(resumeData);
  const { score, tier, metrics, actionVerbsFound, metricsFound, suggestions } = result;

  const getTierBadgeColor = () => {
    switch (tier) {
      case 'Excellent':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Good':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Needs Improvement':
      default:
        return 'bg-rose-50 text-rose-700 border-rose-200';
    }
  };

  const getScoreColor = () => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-rose-600';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl border border-slate-100 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-[#fbf9fe]">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-purple-100 text-purple-700">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-base font-serif font-black text-slate-900 tracking-tight">
                ATS Compatibility <span className="italic font-normal text-purple-600">Scanner</span>
              </h2>
              <p className="text-[11px] font-sans text-slate-500">100% offline client-side applicant tracking system analysis</p>
            </div>
          </div>
          <button
            onClick={() => setIsATSModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-full transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Main Score Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 via-purple-50/40 to-indigo-50/40 border border-purple-100/80 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div className="flex items-center gap-5">
              <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-md border-4 border-purple-200">
                <div className="text-center">
                  <span className={`text-3xl font-black font-mono ${getScoreColor()}`}>
                    {score}
                  </span>
                  <span className="text-[10px] text-slate-400 block -mt-1 font-sans">/ 100</span>
                </div>
              </div>
              <div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border mb-1.5 ${getTierBadgeColor()}`}>
                  <Award className="w-3.5 h-3.5" />
                  <span>{tier} ATS Readiness</span>
                </span>
                <p className="text-xs font-sans text-slate-600 max-w-xs">
                  {score >= 80 
                    ? 'Excellent job! Your resume contains strong action verbs, quantifiable metrics, and complete contact credentials.'
                    : score >= 60 
                    ? 'Good foundation. Adding more quantified achievements and action verbs will boost recruiter visibility.'
                    : 'Requires attention. Complete your work highlights and contact details to pass automated parser filters.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 shrink-0 text-left">
              <div className="p-2.5 rounded-xl bg-white border border-slate-100 shadow-xs">
                <span className="text-[10px] text-slate-400 font-sans block">Action Verbs</span>
                <span className="text-sm font-bold text-slate-800 font-mono">{actionVerbsFound.length} found</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-slate-100 shadow-xs">
                <span className="text-[10px] text-slate-400 font-sans block">Metrics & %</span>
                <span className="text-sm font-bold text-slate-800 font-mono">{metricsFound.length} found</span>
              </div>
            </div>
          </div>

          {/* Detailed Metric Progress */}
          <div>
            <h3 className="text-xs font-sans font-bold tracking-widest uppercase text-slate-400 mb-3">
              Section Score Breakdown
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Contact Information</span>
                  <span className="font-mono font-bold text-purple-700">{metrics.contactScore} / 20</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: `${(metrics.contactScore / 20) * 100}%` }} />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Professional Summary</span>
                  <span className="font-mono font-bold text-purple-700">{metrics.summaryScore} / 15</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: `${(metrics.summaryScore / 15) * 100}%` }} />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Work Experience & Highlights</span>
                  <span className="font-mono font-bold text-purple-700">{metrics.experienceScore} / 30</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: `${(metrics.experienceScore / 30) * 100}%` }} />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex justify-between font-medium text-slate-700 mb-1">
                  <span>Skills & Quantifiable Impact</span>
                  <span className="font-mono font-bold text-purple-700">{metrics.skillsScore + metrics.metricsScore} / 35</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 rounded-full" style={{ width: `${((metrics.skillsScore + metrics.metricsScore) / 35) * 100}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Action Verbs Detected Chips */}
          {actionVerbsFound.length > 0 && (
            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                <h3 className="text-xs font-sans font-bold tracking-widest uppercase text-slate-400">
                  Power Action Verbs Detected ({actionVerbsFound.length})
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {actionVerbsFound.map((verb) => (
                  <span 
                    key={verb} 
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-purple-50 border border-purple-200/80 text-purple-700 text-xs font-semibold capitalize"
                  >
                    <CheckCircle2 className="w-3 h-3 text-purple-600" />
                    <span>{verb}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tailored Suggestions */}
          <div>
            <h3 className="text-xs font-sans font-bold tracking-widest uppercase text-slate-400 mb-3">
              Optimization Suggestions ({suggestions.length})
            </h3>
            {suggestions.length === 0 ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero issues detected! Your resume is thoroughly optimized for modern Applicant Tracking Systems.</span>
              </div>
            ) : (
              <div className="space-y-2">
                {suggestions.map((sug, idx) => (
                  <div 
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs text-slate-700"
                  >
                    {sug.type === 'warning' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    ) : (
                      <Lightbulb className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="font-bold text-slate-900 mr-1.5">[{sug.category}]</span>
                      <span>{sug.message}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="font-sans">PraZume ATS Engine · 100% Privacy by Design</span>
          <button
            onClick={() => setIsATSModalOpen(false)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors shadow-sm"
          >
            Done Reviewing
          </button>
        </div>
      </div>
    </div>
  );
};
