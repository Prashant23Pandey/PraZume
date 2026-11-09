import React, { useState } from 'react';
import { Plus, Trash2, Wrench } from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';
import { SkillLevel } from '../../types/resume';
import { SectionHeader } from './SectionHeader';

export const SkillsForm: React.FC = () => {
  const { resumeData, addSkill, updateSkill, removeSkill } = useResumeStore();
  const { skills } = resumeData;

  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillCategory, setNewSkillCategory] = useState('Frontend');
  const [newSkillLevel, setNewSkillLevel] = useState<SkillLevel>('Advanced');

  const levels: SkillLevel[] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const handleQuickAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    addSkill(newSkillCategory.trim() || 'General');
    // Update the newly added skill with the name and level
    setTimeout(() => {
      // Find the last skill and update
      const latest = skills[skills.length - 1];
      if (latest) {
        updateSkill(latest.id, {
          name: newSkillName.trim(),
          category: newSkillCategory.trim() || 'General',
          level: newSkillLevel,
        });
      }
    }, 50);

    setNewSkillName('');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <SectionHeader
        title="Skills & Technologies"
        description="Highlight core competencies, frameworks, programming languages, and tools"
        onAdd={() => addSkill('General')}
        addLabel="Add Skill"
      />

      {/* Quick Add Form */}
      <form onSubmit={handleQuickAdd} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
        <span className="text-xs font-bold text-slate-700 block">Quick Add Skill</span>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
          <input
            type="text"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            placeholder="Skill name (e.g. TypeScript, Docker)"
            className="sm:col-span-5 text-xs rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
          />
          <input
            type="text"
            value={newSkillCategory}
            onChange={(e) => setNewSkillCategory(e.target.value)}
            placeholder="Category (e.g. Frontend)"
            className="sm:col-span-3 text-xs rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
          />
          <select
            value={newSkillLevel}
            onChange={(e) => setNewSkillLevel(e.target.value as SkillLevel)}
            className="sm:col-span-2 text-xs rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
          >
            {levels.map((lvl) => (
              <option key={lvl} value={lvl}>{lvl}</option>
            ))}
          </select>
          <button
            type="submit"
            className="sm:col-span-2 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </form>

      {/* Skills Pill Grid */}
      {skills.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
          <Wrench className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h4 className="text-sm font-semibold text-slate-700">No skills added yet</h4>
          <p className="text-xs text-slate-500">Add technical and soft skills to enhance ATS match scoring.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Current Skill List ({skills.length})
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between gap-2 hover:border-slate-300 transition-all"
              >
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                    placeholder="Skill name"
                    className="w-full text-xs font-bold text-slate-800 border-none p-0 focus:ring-0 placeholder:text-slate-300"
                  />
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      value={skill.category}
                      onChange={(e) => updateSkill(skill.id, { category: e.target.value })}
                      placeholder="Category"
                      className="text-[10px] text-slate-500 border-none p-0 focus:ring-0 w-24"
                    />
                    <span className="text-slate-300">•</span>
                    <select
                      value={skill.level}
                      onChange={(e) => updateSkill(skill.id, { level: e.target.value as SkillLevel })}
                      className="text-[10px] font-semibold text-brand-600 border-none p-0 focus:ring-0 bg-transparent cursor-pointer"
                    >
                      {levels.map((lvl) => (
                        <option key={lvl} value={lvl}>{lvl}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => removeSkill(skill.id)}
                  className="p-1 text-slate-300 hover:text-rose-500 rounded transition-colors"
                  title="Remove skill"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
