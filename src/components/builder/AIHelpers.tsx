import React, { useState } from 'react';
import { Copy, Check, FileText, Download, X, Zap } from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';

export const ACTION_VERB_CATEGORIES: { category: string; verbs: string[] }[] = [
  {
    category: 'Leadership & Management',
    verbs: ['Architected', 'Spearheaded', 'Directed', 'Orchestrated', 'Championed', 'Mentored', 'Pioneered', 'Steered', 'Mobilized'],
  },
  {
    category: 'Innovation & Engineering',
    verbs: ['Engineered', 'Overhauled', 'Automated', 'Devised', 'Formulated', 'Constructed', 'Revamped', 'Modernized', 'Designed'],
  },
  {
    category: 'Performance & Optimization',
    verbs: ['Accelerated', 'Optimized', 'Scaled', 'Streamlined', 'Boosted', 'Amplified', 'Enhanced', 'Maximized', 'Refined'],
  },
  {
    category: 'Results & Impact',
    verbs: ['Delivered', 'Generated', 'Decreased', 'Slashed', 'Surpassed', 'Secured', 'Expanded', 'Outperformed', 'Attained'],
  },
];

interface ActionVerbPopoverProps {
  onSelectVerb: (verb: string) => void;
  onClose: () => void;
}

export const ActionVerbPopover: React.FC<ActionVerbPopoverProps> = ({ onSelectVerb, onClose }) => {
  const [selectedCat, setSelectedCat] = useState(ACTION_VERB_CATEGORIES[0].category);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl p-4 w-80 sm:w-96 animate-in fade-in zoom-in-95 duration-150">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span className="text-xs font-bold text-slate-800">Action Verb Generator</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex gap-1 overflow-x-auto pb-2 mb-3">
        {ACTION_VERB_CATEGORIES.map((cat) => (
          <button
            key={cat.category}
            onClick={() => setSelectedCat(cat.category)}
            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold whitespace-nowrap transition-colors ${
              selectedCat === cat.category
                ? 'bg-brand-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat.category.split(' ')[0]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-1.5">
        {ACTION_VERB_CATEGORIES.find((c) => c.category === selectedCat)?.verbs.map((verb) => (
          <button
            key={verb}
            onClick={() => {
              onSelectVerb(verb);
              onClose();
            }}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-50 hover:bg-brand-50 hover:text-brand-700 hover:border-brand-300 border border-slate-200/80 text-slate-800 text-left transition-all"
          >
            + {verb}
          </button>
        ))}
      </div>
    </div>
  );
};

export const CoverLetterModal: React.FC = () => {
  const { resumeData, isCoverLetterModalOpen, setIsCoverLetterModalOpen } = useResumeStore();
  const { personalDetails, workExperience, skills } = resumeData;

  const [targetCompany, setTargetCompany] = useState('Acme Technologies');
  const [targetRole, setTargetRole] = useState(personalDetails.jobTitle || 'Software Engineer');
  const [hiringManager, setHiringManager] = useState('Hiring Team');
  const [copied, setCopied] = useState(false);

  if (!isCoverLetterModalOpen) return null;

  const primarySkill = skills[0]?.name || 'Full Stack Architecture';
  const recentCompany = workExperience[0]?.company || 'leading tech companies';

  const coverLetterText = `Dear ${hiringManager},

I am writing to express my strong enthusiasm for the ${targetRole} position at ${targetCompany}. With a proven track record of architecting scalable web applications and delivering measurable business impact, I am eager to contribute to your engineering team's mission.

During my tenure at ${recentCompany}, I spearheaded key initiatives focusing on ${primarySkill}, reducing critical latency, and mentoring cross-functional peers. My core strengths in ${skills.slice(0, 4).map(s => s.name).join(', ')} directly align with the technical challenges and high standards of excellence at ${targetCompany}.

What excites me most about ${targetCompany} is your commitment to high-impact products and customer-focused engineering. I am eager to bring my local-first engineering discipline, performance optimization expertise, and collaborative mindset to your team.

Thank you for your time and consideration. I welcome the opportunity to discuss how my background and enthusiasm will contribute to ${targetCompany}'s continued success.

Sincerely,

${personalDetails.fullName || 'Candidate'}
${personalDetails.email || ''} | ${personalDetails.phone || ''}
${personalDetails.location || ''}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(coverLetterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([coverLetterText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(personalDetails.fullName || 'Cover_Letter').replace(/\s+/g, '_')}_CoverLetter.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-indigo-100 text-indigo-600">
              <FileText className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-slate-800">Cover Letter Draft Generator</h3>
          </div>
          <button
            onClick={() => setIsCoverLetterModalOpen(false)}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Target Company</label>
              <input
                type="text"
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                className="w-full text-xs rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Target Role</label>
              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full text-xs rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">Hiring Manager</label>
              <input
                type="text"
                value={hiringManager}
                onChange={(e) => setHiringManager(e.target.value)}
                className="w-full text-xs rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">Generated Draft</label>
            <textarea
              readOnly
              rows={12}
              value={coverLetterText}
              className="w-full font-mono text-xs leading-relaxed p-4 rounded-xl border-slate-200 bg-slate-50 text-slate-800"
            />
          </div>
        </div>

        <div className="px-6 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">100% offline generated from your resume data</span>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy to Clipboard'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download (.txt)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
