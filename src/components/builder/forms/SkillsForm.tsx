import React, { useState } from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown, Wrench, Star } from 'lucide-react';
import { useResumeStore } from '../../../context/ResumeContext';
import { SkillLevel } from '../../../types/resume';

export const SkillsForm: React.FC = () => {
  const { resumeData, addSkill, updateSkill, removeSkill, moveSkill } = useResumeStore();
  const { skills } = resumeData;

  const [newSkillName, setNewSkillName] = useState('');
  const [newCategory, setNewCategory] = useState('Frontend');
  const [newRating, setNewRating] = useState<number>(4);

  const levels: SkillLevel[] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const quickPillSuggestions = [
    'React', 'TypeScript', 'Node.js', 'Next.js', 'Tailwind CSS',
    'Python', 'PostgreSQL', 'Docker', 'AWS', 'GraphQL', 'Kubernetes', 'CI/CD'
  ];

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName.trim()) return;

    addSkill(newCategory || 'General');
    // Update newly added skill
    setTimeout(() => {
      const latest = skills[skills.length - 1];
      if (latest) {
        updateSkill(latest.id, {
          name: newSkillName.trim(),
          category: newCategory.trim() || 'General',
          rating: newRating,
          level: newRating >= 5 ? 'Expert' : newRating >= 4 ? 'Advanced' : newRating >= 3 ? 'Intermediate' : 'Beginner',
        });
      }
    }, 50);

    setNewSkillName('');
  };

  const handleQuickAdd = (skillName: string) => {
    if (skills.some((s) => s.name.toLowerCase() === skillName.toLowerCase())) return;
    addSkill('Technical');
    setTimeout(() => {
      const latest = skills[skills.length - 1];
      if (latest) {
        updateSkill(latest.id, {
          name: skillName,
          category: 'Technical',
          rating: 4,
          level: 'Advanced',
        });
      }
    }, 50);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="pb-4 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Skills & Languages</h2>
        <p className="text-xs text-slate-500 mt-0.5">Core technical proficiencies, frameworks, and competency ratings</p>
      </div>

      {/* Quick Add Form */}
      <form onSubmit={handleAddSkill} className="p-4 bg-slate-50 border border-slate-200/90 rounded-2xl space-y-3">
        <div className="text-xs font-bold text-slate-800">Add New Competency</div>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
          <input
            type="text"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            placeholder="Skill name (e.g. Next.js, Docker)"
            className="sm:col-span-5 text-xs rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500"
          />
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Category (e.g. Frontend)"
            className="sm:col-span-3 text-xs rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500"
          />

          {/* 1-5 Rating Selector */}
          <div className="sm:col-span-2 flex items-center justify-center gap-1 bg-white p-1 rounded-xl border border-slate-200">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setNewRating(star)}
                className={`p-0.5 transition-colors ${
                  star <= newRating ? 'text-amber-500' : 'text-slate-300 hover:text-amber-300'
                }`}
                title={`Level ${star} of 5`}
              >
                <Star className={`w-3.5 h-3.5 ${star <= newRating ? 'fill-amber-400' : ''}`} />
              </button>
            ))}
          </div>

          <button
            type="submit"
            className="sm:col-span-2 inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

        {/* Quick Suggestions Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[10px] text-slate-400 font-semibold">Suggested:</span>
          {quickPillSuggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => handleQuickAdd(s)}
              className="text-[10px] px-2 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-600 transition-colors"
            >
              + {s}
            </button>
          ))}
        </div>
      </form>

      {/* Skill List with 1-5 Rating and Up/Down Reorder */}
      {skills.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
          <Wrench className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-700">No skills added yet</h4>
          <p className="text-xs text-slate-500">Add programming languages and frameworks to pass ATS filters.</p>
        </div>
      ) : (
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
            <span>Skill List ({skills.length})</span>
            <span>Proficiency Rating</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {skills.map((skill, idx) => (
              <div
                key={skill.id}
                className="p-3 bg-white border border-slate-200/90 rounded-xl shadow-xs flex items-center justify-between gap-2 hover:border-slate-300 transition-all"
              >
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => moveSkill(idx, 'up')}
                    disabled={idx === 0}
                    className="p-0.5 text-slate-400 hover:text-slate-800 disabled:opacity-20"
                    title="Move Up"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => moveSkill(idx, 'down')}
                    disabled={idx === skills.length - 1}
                    className="p-0.5 text-slate-400 hover:text-slate-800 disabled:opacity-20"
                    title="Move Down"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                    className="w-full text-xs font-bold text-slate-900 border-none p-0 focus:ring-0"
                    placeholder="Skill name"
                  />
                  <div className="flex items-center gap-2 mt-0.5">
                    <input
                      type="text"
                      value={skill.category}
                      onChange={(e) => updateSkill(skill.id, { category: e.target.value })}
                      className="text-[10px] text-slate-400 border-none p-0 focus:ring-0 w-20"
                      placeholder="Category"
                    />
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

                {/* 1-5 Star Level Rating */}
                <div className="flex items-center gap-0.5 shrink-0">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const currentRating = skill.rating || 4;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => updateSkill(skill.id, { rating: star })}
                        className={`p-0.5 ${
                          star <= currentRating ? 'text-amber-400' : 'text-slate-200'
                        }`}
                      >
                        <Star className={`w-3 h-3 ${star <= currentRating ? 'fill-amber-400' : ''}`} />
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => removeSkill(skill.id)}
                  className="p-1 text-slate-300 hover:text-rose-500 rounded transition-colors ml-1"
                  title="Delete Skill"
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

