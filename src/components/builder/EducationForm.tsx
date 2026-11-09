import React from 'react';
import { Trash2, Plus, GraduationCap } from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';
import { SectionHeader } from './SectionHeader';

export const EducationForm: React.FC = () => {
  const {
    resumeData,
    addEducation,
    updateEducation,
    removeEducation,
    addEducationHighlight,
    updateEducationHighlight,
    removeEducationHighlight,
  } = useResumeStore();

  const { education } = resumeData;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <SectionHeader
        title="Education"
        description="Degrees, academic credentials, and university honors"
        onAdd={addEducation}
        addLabel="Add Education"
      />

      {education.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
          <GraduationCap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h4 className="text-sm font-semibold text-slate-700">No education entries yet</h4>
          <p className="text-xs text-slate-500 mb-4">Add your university, college, or bootcamp history.</p>
          <button
            onClick={addEducation}
            className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            Add Education
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:border-slate-300 transition-all space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <span className="text-sm font-bold text-slate-800">
                    {edu.institution || 'Untitled Institution'}
                  </span>
                </div>
                <button
                  onClick={() => removeEducation(edu.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  title="Delete education"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Institution / University *
                  </label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, { institution: e.target.value })}
                    placeholder="e.g. Stanford University"
                    className="w-full text-sm rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Degree *
                  </label>
                  <input
                    type="text"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, { degree: e.target.value })}
                    placeholder="e.g. Bachelor of Science"
                    className="w-full text-sm rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Field of Study / Major
                  </label>
                  <input
                    type="text"
                    value={edu.fieldOfStudy}
                    onChange={(e) => updateEducation(edu.id, { fieldOfStudy: e.target.value })}
                    placeholder="e.g. Computer Science"
                    className="w-full text-sm rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={edu.location}
                    onChange={(e) => updateEducation(edu.id, { location: e.target.value })}
                    placeholder="e.g. Stanford, CA"
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
                      value={edu.startDate}
                      onChange={(e) => updateEducation(edu.id, { startDate: e.target.value })}
                      placeholder="e.g. 2016-09"
                      className="w-full text-sm rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      End Date
                    </label>
                    <input
                      type="text"
                      value={edu.endDate}
                      onChange={(e) => updateEducation(edu.id, { endDate: e.target.value })}
                      placeholder="e.g. 2020-06"
                      className="w-full text-sm rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    GPA / Honors (Optional)
                  </label>
                  <input
                    type="text"
                    value={edu.gpa}
                    onChange={(e) => updateEducation(edu.id, { gpa: e.target.value })}
                    placeholder="e.g. 3.9 / 4.0 or Summa Cum Laude"
                    className="w-full text-sm rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
                  />
                </div>
              </div>

              {/* Highlights */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Academic Achievements / Clubs
                  </label>
                  <button
                    onClick={() => addEducationHighlight(edu.id, '')}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-brand-600 hover:text-brand-700"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Honor</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {edu.highlights.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-2">
                      <span className="text-slate-400 text-xs select-none">•</span>
                      <input
                        type="text"
                        value={bullet}
                        onChange={(e) => updateEducationHighlight(edu.id, bIdx, e.target.value)}
                        placeholder="e.g. Dean's List, Captain of Robotics Team..."
                        className="flex-1 text-xs rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
                      />
                      <button
                        onClick={() => removeEducationHighlight(edu.id, bIdx)}
                        className="p-1.5 text-slate-300 hover:text-rose-500 rounded transition-colors"
                        title="Delete honor"
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

