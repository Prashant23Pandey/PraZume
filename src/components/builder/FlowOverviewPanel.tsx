import React from 'react';
import { Layout, Check, MoveVertical } from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';
import { TemplateId } from '../../types/resume';

export const FlowOverviewPanel: React.FC = () => {
  const { resumeData, customization, updateLayout } = useResumeStore();
  const { workExperience, education, skills, customSections } = resumeData;
  const { templateId } = customization.layout;

  const templates: { id: TemplateId; name: string; desc: string }[] = [
    { id: 'modern', name: 'Modern Header', desc: 'FlowCV-style dark header band with photo' },
    { id: 'classic', name: 'Executive Classic', desc: 'Traditional serif hierarchy' },
    { id: 'minimal', name: 'Scandinavian Minimal', desc: 'Clean high-whitespace formatting' },
  ];

  const totalBulletPoints = workExperience.reduce((acc, curr) => acc + curr.highlights.length, 0);

  return (
    <div className="w-full space-y-4 pb-20">
      {/* 1. DOCUMENT SUMMARY METRICS */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5">
        <h3 className="text-xs font-sans font-bold tracking-widest uppercase text-slate-400 mb-3">
          Resume Overview & Analytics
        </h3>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xl font-bold font-mono text-purple-700 block">{workExperience.length}</span>
            <span className="text-[10px] text-slate-500 font-medium">Roles</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xl font-bold font-mono text-purple-700 block">{totalBulletPoints}</span>
            <span className="text-[10px] text-slate-500 font-medium">Bullets</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xl font-bold font-mono text-purple-700 block">{skills.length}</span>
            <span className="text-[10px] text-slate-500 font-medium">Skills</span>
          </div>
        </div>
      </div>

      {/* 2. TEMPLATE QUICK SWITCHER */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-3">
          <Layout className="w-4 h-4 text-purple-600" />
          <h3 className="font-sans font-bold text-sm text-slate-900">
            Active Layout Template
          </h3>
        </div>

        <div className="space-y-2">
          {templates.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => updateLayout({ templateId: tpl.id })}
              className={`w-full p-3 rounded-xl text-left border transition-all flex items-center justify-between ${
                templateId === tpl.id
                  ? 'border-purple-600 bg-purple-50/60 ring-2 ring-purple-500/20 text-purple-900'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <div>
                <div className="text-xs font-bold">{tpl.name}</div>
                <div className="text-[10px] text-slate-500 mt-0.5">{tpl.desc}</div>
              </div>
              {templateId === tpl.id && (
                <Check className="w-4 h-4 text-purple-600" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 3. SECTION STRUCTURE LIST */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5">
        <div className="flex items-center gap-2 mb-3">
          <MoveVertical className="w-4 h-4 text-slate-500" />
          <h3 className="font-sans font-bold text-sm text-slate-900">
            Active Sections Order
          </h3>
        </div>

        <div className="space-y-1.5 text-xs text-slate-700 font-medium">
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span>1. Personal Details & Header</span>
            <span className="text-[10px] text-emerald-600 font-bold uppercase">Required</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span>2. Professional Summary</span>
            <span className="text-[10px] text-slate-400">Top flow</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span>3. Work Experience ({workExperience.length})</span>
            <span className="text-[10px] text-purple-600 font-bold">Primary</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span>4. Educational History ({education.length})</span>
            <span className="text-[10px] text-slate-400">Standard</span>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span>5. Relevant Skills ({skills.length})</span>
            <span className="text-[10px] text-slate-400">ATS Tags</span>
          </div>
          {customSections.map((sec, idx) => (
            <div key={sec.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
              <span>{6 + idx}. {sec.title}</span>
              <span className="text-[10px] text-indigo-600 font-bold">Custom</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
