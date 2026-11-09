import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  Briefcase, 
  ChevronRight, 
  Zap, 
  AlignLeft
} from 'lucide-react';
import { useResumeStore } from '../../../context/ResumeContext';
import { ActionVerbPopover } from '../AIHelpers';

export const ExperienceForm: React.FC = () => {
  const {
    resumeData,
    addWorkExperience,
    updateWorkExperience,
    removeWorkExperience,
    moveWorkExperience,
    setHighlightsFromText,
  } = useResumeStore();

  const { workExperience } = resumeData;
  const [collapsedIds, setCollapsedIds] = useState<string[]>([]);
  const [activeVerbPopoverId, setActiveVerbPopoverId] = useState<string | null>(null);

  const toggleCollapse = (id: string) => {
    setCollapsedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDelete = (id: string, company: string) => {
    if (window.confirm(`Delete experience entry for "${company || 'Untitled Company'}"?`)) {
      removeWorkExperience(id);
    }
  };

  const handleAdd = () => {
    addWorkExperience();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Work Experience</h2>
          <p className="text-xs text-slate-500 mt-0.5">Chronological employment history with measurable impact</p>
        </div>

        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Position</span>
        </button>
      </div>

      {workExperience.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
          <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-700">No work experience listed</h4>
          <p className="text-xs text-slate-500 mb-4">Add your present or past career roles to populate your resume.</p>
          <button
            onClick={handleAdd}
            className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold"
          >
            Add First Job
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {workExperience.map((exp, idx) => {
            const isCollapsed = collapsedIds.includes(exp.id);
            const bulletText = exp.highlights.join('\n');

            return (
              <div
                key={exp.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all duration-200"
              >
                {/* Collapsible Card Header */}
                <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => toggleCollapse(exp.id)}
                    className="flex-1 flex items-center gap-3 text-left min-w-0"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 shrink-0">
                      {idx + 1}
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm font-bold text-slate-900 block truncate">
                        {exp.company || 'New Company'} — {exp.position || 'Job Title'}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {exp.startDate || 'YYYY-MM'} – {exp.current ? 'Present' : exp.endDate || 'YYYY-MM'}
                      </span>
                    </div>
                  </button>

                  {/* Up / Down Reorder & Delete controls */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => moveWorkExperience(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 rounded text-slate-400 hover:text-slate-800 disabled:opacity-30 hover:bg-slate-200/60 transition-colors"
                      title="Move Up"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveWorkExperience(idx, 'down')}
                      disabled={idx === workExperience.length - 1}
                      className="p-1 rounded text-slate-400 hover:text-slate-800 disabled:opacity-30 hover:bg-slate-200/60 transition-colors"
                      title="Move Down"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(exp.id, exp.company)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-1"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => toggleCollapse(exp.id)}
                      className="p-1.5 text-slate-400 hover:text-slate-700"
                      title={isCollapsed ? 'Expand' : 'Collapse'}
                    >
                      <ChevronRight
                        className={`w-4 h-4 transition-transform duration-200 ${
                          !isCollapsed ? 'rotate-90 text-brand-600' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Collapsible Card Body */}
                {!isCollapsed && (
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Company / Organization *
                        </label>
                        <input
                          type="text"
                          value={exp.company}
                          onChange={(e) => updateWorkExperience(exp.id, { company: e.target.value })}
                          placeholder="e.g. Vortex Cloud"
                          className="w-full text-xs rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Role / Position Title *
                        </label>
                        <input
                          type="text"
                          value={exp.position}
                          onChange={(e) => updateWorkExperience(exp.id, { position: e.target.value })}
                          placeholder="e.g. Staff Frontend Engineer"
                          className="w-full text-xs rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={exp.location}
                          onChange={(e) => updateWorkExperience(exp.id, { location: e.target.value })}
                          placeholder="e.g. San Francisco, CA (or Remote)"
                          className="w-full text-xs rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">
                            Start Date
                          </label>
                          <input
                            type="text"
                            value={exp.startDate}
                            onChange={(e) => updateWorkExperience(exp.id, { startDate: e.target.value })}
                            placeholder="MM/YYYY"
                            className="w-full text-xs rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">
                            End Date
                          </label>
                          <input
                            type="text"
                            disabled={exp.current}
                            value={exp.current ? 'Present' : exp.endDate}
                            onChange={(e) => updateWorkExperience(exp.id, { endDate: e.target.value })}
                            placeholder="MM/YYYY"
                            className="w-full text-xs rounded-xl border-slate-200 disabled:bg-slate-100 disabled:text-slate-400 focus:border-brand-500 focus:ring-brand-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Presently Working Here Toggle */}
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={`curr-${exp.id}`}
                        checked={exp.current}
                        onChange={(e) =>
                          updateWorkExperience(exp.id, {
                            current: e.target.checked,
                            endDate: e.target.checked ? '' : exp.endDate,
                          })
                        }
                        className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
                      />
                      <label htmlFor={`curr-${exp.id}`} className="text-xs font-medium text-slate-700 cursor-pointer">
                        I am presently working in this role
                      </label>
                    </div>

                    {/* Multi-line Bullet Point Editor */}
                    <div className="pt-2 border-t border-slate-100 relative">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <AlignLeft className="w-3.5 h-3.5 text-slate-400" />
                          <span>Bullet Points (One accomplishment per line)</span>
                        </label>

                        <button
                          type="button"
                          onClick={() => setActiveVerbPopoverId(activeVerbPopoverId === exp.id ? null : exp.id)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 px-2 py-0.5 rounded-lg transition-colors"
                        >
                          <Zap className="w-3 h-3 text-amber-500 fill-amber-500" />
                          <span>Insert Action Verb</span>
                        </button>

                        {activeVerbPopoverId === exp.id && (
                          <div className="absolute right-0 top-8 z-30">
                            <ActionVerbPopover
                              onSelectVerb={(verb) => {
                                const currentText = bulletText.trim() ? `${bulletText}\n${verb} ` : `${verb} `;
                                setHighlightsFromText(exp.id, currentText);
                              }}
                              onClose={() => setActiveVerbPopoverId(null)}
                            />
                          </div>
                        )}
                      </div>

                      <textarea
                        rows={5}
                        value={bulletText}
                        onChange={(e) => setHighlightsFromText(exp.id, e.target.value)}
                        placeholder="Architected a high-performance web dashboard...&#10;Spearheaded CI/CD migration, cutting build times by 45%...&#10;Mentored 8 mid-level engineers..."
                        className="w-full text-xs font-mono leading-relaxed p-3 rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500 shadow-xs"
                      />
                      <p className="text-[10px] text-slate-400 mt-1">
                        Tip: Press Enter to create a new bullet. Each non-empty line formats automatically onto your resume.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
