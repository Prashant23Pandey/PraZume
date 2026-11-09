import React, { useState } from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown, GraduationCap, ChevronRight } from 'lucide-react';
import { useResumeStore } from '../../../context/ResumeContext';

export const EducationForm: React.FC = () => {
  const {
    resumeData,
    addEducation,
    updateEducation,
    removeEducation,
    moveEducation,
    setEducationHighlightsFromText,
  } = useResumeStore();

  const { education } = resumeData;
  const [collapsedIds, setCollapsedIds] = useState<string[]>([]);

  const toggleCollapse = (id: string) => {
    setCollapsedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDelete = (id: string, inst: string) => {
    if (window.confirm(`Delete education entry for "${inst || 'Untitled Institution'}"?`)) {
      removeEducation(id);
    }
  };

  const handleAdd = () => {
    addEducation();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Education</h2>
          <p className="text-xs text-slate-500 mt-0.5">Degrees, academic credentials, and university honors</p>
        </div>

        <button
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Degree</span>
        </button>
      </div>

      {education.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
          <GraduationCap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-700">No education entries added</h4>
          <p className="text-xs text-slate-500 mb-4">Add your university degree or academic background.</p>
          <button
            onClick={handleAdd}
            className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-bold"
          >
            Add Degree
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu, idx) => {
            const isCollapsed = collapsedIds.includes(edu.id);
            const highlightsText = edu.highlights.join('\n');

            return (
              <div
                key={edu.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all duration-200"
              >
                {/* Header */}
                <div className="p-4 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between gap-3">
                  <button
                    onClick={() => toggleCollapse(edu.id)}
                    className="flex-1 flex items-center gap-3 text-left min-w-0"
                  >
                    <div className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center font-bold text-xs text-slate-700 shrink-0">
                      {idx + 1}
                    </div>
                    <div className="min-w-0">
                      <span className="text-sm font-bold text-slate-900 block truncate">
                        {edu.institution || 'New Institution'} — {edu.degree || 'Degree'}
                      </span>
                      <span className="text-[11px] text-slate-500 font-mono">
                        {edu.startDate || 'YYYY-MM'} – {edu.endDate || 'YYYY-MM'}
                      </span>
                    </div>
                  </button>

                  {/* Reorder and Delete */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => moveEducation(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 rounded text-slate-400 hover:text-slate-800 disabled:opacity-30 hover:bg-slate-200/60 transition-colors"
                      title="Move Up"
                    >
                      <ChevronUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => moveEducation(idx, 'down')}
                      disabled={idx === education.length - 1}
                      className="p-1 rounded text-slate-400 hover:text-slate-800 disabled:opacity-30 hover:bg-slate-200/60 transition-colors"
                      title="Move Down"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => handleDelete(edu.id, edu.institution)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors ml-1"
                      title="Delete Entry"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => toggleCollapse(edu.id)}
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

                {!isCollapsed && (
                  <div className="p-5 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Institution / School *
                        </label>
                        <input
                          type="text"
                          value={edu.institution}
                          onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                          placeholder="e.g. Stanford University"
                          className="w-full text-xs rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Degree / Credential *
                        </label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                          placeholder="e.g. Bachelor of Science"
                          className="w-full text-xs rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Field of Study / Major
                        </label>
                        <input
                          type="text"
                          value={edu.fieldOfStudy}
                          onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })}
                          placeholder="e.g. Computer Science"
                          className="w-full text-xs rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          Location
                        </label>
                        <input
                          type="text"
                          value={edu.location}
                          onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                          placeholder="e.g. Stanford, CA"
                          className="w-full text-xs rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">Start Date</label>
                          <input
                            type="text"
                            value={edu.startDate}
                            onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                            placeholder="MM/YYYY"
                            className="w-full text-xs rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">End Date</label>
                          <input
                            type="text"
                            value={edu.endDate}
                            onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                            placeholder="MM/YYYY"
                            className="w-full text-xs rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">
                          GPA / Honors (Optional)
                        </label>
                        <input
                          type="text"
                          value={edu.gpa}
                          onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                          placeholder="e.g. 3.9 / 4.0 or Dean's List"
                          className="w-full text-xs rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500"
                        />
                      </div>
                    </div>

                    {/* Multi-line Honors / Highlights */}
                    <div className="pt-2 border-t border-slate-100">
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Academic Honors / Activities (One per line)
                      </label>
                      <textarea
                        rows={3}
                        value={highlightsText}
                        onChange={(e) => setEducationHighlightsFromText(edu.id, e.target.value)}
                        placeholder="Dean's Honor List (All Semesters)&#10;President of ACM Student Chapter&#10;Relevant Coursework: Distributed Systems, Advanced Algorithms"
                        className="w-full text-xs font-mono leading-relaxed p-3 rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500"
                      />
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

