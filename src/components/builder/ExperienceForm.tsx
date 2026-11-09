import React from 'react';
import { Trash2, Plus, Briefcase } from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';
import { SectionHeader } from './SectionHeader';

export const ExperienceForm: React.FC = () => {
  const {
    resumeData,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    addHighlight,
    updateHighlight,
    removeHighlight,
  } = useResumeStore();

  const { workExperience } = resumeData;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <SectionHeader
        title="Work Experience"
        description="Detail your employment history and quantifiable accomplishments"
        onAdd={addWorkExperience}
        addLabel="Add Experience"
      />

      {workExperience.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
          <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h4 className="text-sm font-semibold text-slate-700">No work experience added yet</h4>
          <p className="text-xs text-slate-500 mb-4">Add your current or past roles to showcase your career journey.</p>
          <button
            onClick={addWorkExperience}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            Add First Job
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {workExperience.map((exp, index) => (
            <div
              key={exp.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-slate-300 transition-all space-y-4"
            >
              {/* Card top banner */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-sm font-bold text-slate-800">
                    {exp.position || exp.company || 'Untitled Position'}
                  </span>
                </div>
                <button
                  onClick={() => removeWorkExperience(exp.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete experience"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    value={exp.company}
                    onChange={(e) => updateWorkExperience(exp.id, { company: e.target.value })}
                    placeholder="e.g. Acme Corp"
                    className="w-full text-sm rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Job Title / Role *
                  </label>
                  <input
                    type="text"
                    value={exp.position}
                    onChange={(e) => updateWorkExperience(exp.id, { position: e.target.value })}
                    placeholder="e.g. Lead Frontend Developer"
                    className="w-full text-sm rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={exp.location}
                    onChange={(e) => updateWorkExperience(exp.id, { location: e.target.value })}
                    placeholder="e.g. New York, NY (or Remote)"
                    className="w-full text-sm rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Start Date
                    </label>
                    <input
                      type="text"
                      value={exp.startDate}
                      onChange={(e) => updateWorkExperience(exp.id, { startDate: e.target.value })}
                      placeholder="e.g. 2021-03"
                      className="w-full text-sm rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      End Date
                    </label>
                    <input
                      type="text"
                      disabled={exp.current}
                      value={exp.current ? 'Present' : exp.endDate}
                      onChange={(e) => updateWorkExperience(exp.id, { endDate: e.target.value })}
                      placeholder="e.g. 2023-08"
                      className="w-full text-sm rounded-xl border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Currently Working Checkbox */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id={`current-${exp.id}`}
                  checked={exp.current}
                  onChange={(e) =>
                    updateWorkExperience(exp.id, {
                      current: e.target.checked,
                      endDate: e.target.checked ? '' : exp.endDate,
                    })
                  }
                  className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                />
                <label htmlFor={`current-${exp.id}`} className="text-xs font-medium text-slate-700 cursor-pointer">
                  I currently work here
                </label>
              </div>

              {/* Accomplishments & Highlights */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Key Highlights & Impact
                  </label>
                  <button
                    onClick={() => addHighlight(exp.id, '')}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-600 hover:text-brand-700"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Bullet Point</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {exp.highlights.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2">
                      <span className="text-slate-400 mt-2 text-xs select-none">•</span>
                      <textarea
                        rows={2}
                        value={bullet}
                        onChange={(e) => updateHighlight(exp.id, bIdx, e.target.value)}
                        placeholder="Action verb + quantifiable achievement + business result..."
                        className="flex-1 text-xs rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500 shadow-sm leading-relaxed"
                      />
                      <button
                        onClick={() => removeHighlight(exp.id, bIdx)}
                        className="p-1.5 text-slate-300 hover:text-rose-500 rounded transition-colors mt-1"
                        title="Delete highlight"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
