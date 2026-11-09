import React, { useState } from 'react';
import { Plus, Trash2, FolderPlus, Sparkles } from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';
import { SectionHeader } from './SectionHeader';

export const CustomSectionForm: React.FC = () => {
  const {
    resumeData,
    addCustomSection,
    updateCustomSectionTitle,
    removeCustomSection,
    addCustomSectionEntry,
    updateCustomSectionEntry,
    removeCustomSectionEntry,
  } = useResumeStore();

  const { customSections } = resumeData;
  const [newTitle, setNewTitle] = useState('');

  const handleCreateSection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addCustomSection(newTitle.trim());
    setNewTitle('');
  };

  const presetTitles = ['Projects & Open Source', 'Certifications & Licenses', 'Awards & Honors', 'Publications', 'Volunteering'];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <SectionHeader
        title="Custom Sections"
        description="Add specialized categories like Projects, Certifications, or Publications"
      />

      {/* New Section Creator Bar */}
      <form onSubmit={handleCreateSection} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
        <label className="text-xs font-bold text-slate-700 block">Create New Custom Section</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Section title (e.g. Open Source Projects)"
            className="flex-1 text-xs rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm transition-colors shrink-0"
          >
            <FolderPlus className="w-3.5 h-3.5" />
            <span>Create Section</span>
          </button>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[10px] text-slate-400 font-medium">Suggestions:</span>
          {presetTitles.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => addCustomSection(preset)}
              className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-600 transition-colors"
            >
              + {preset}
            </button>
          ))}
        </div>
      </form>

      {/* Section List */}
      {customSections.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
          <Sparkles className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h4 className="text-sm font-semibold text-slate-700">No custom sections yet</h4>
          <p className="text-xs text-slate-500">Add side projects, credentials, or patents to stand out.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {customSections.map((section) => (
            <div
              key={section.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4"
            >
              {/* Section Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <input
                  type="text"
                  value={section.title}
                  onChange={(e) => updateCustomSectionTitle(section.id, e.target.value)}
                  placeholder="Section Title"
                  className="text-base font-bold text-slate-900 border-none p-0 focus:ring-0 placeholder:text-slate-300"
                />

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => addCustomSectionEntry(section.id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-semibold transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Item</span>
                  </button>
                  <button
                    onClick={() => removeCustomSection(section.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete entire section"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Entries */}
              <div className="space-y-4">
                {section.entries.map((entry, entIdx) => (
                  <div
                    key={entry.id}
                    className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-3 relative group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-600">
                        Item #{entIdx + 1}
                      </span>
                      <button
                        onClick={() => removeCustomSectionEntry(section.id, entry.id)}
                        className="p-1 text-slate-400 hover:text-rose-500 rounded transition-colors"
                        title="Delete entry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">
                          Title / Project Name *
                        </label>
                        <input
                          type="text"
                          value={entry.title}
                          onChange={(e) =>
                            updateCustomSectionEntry(section.id, entry.id, { title: e.target.value })
                          }
                          placeholder="e.g. Distributed Database Orchestrator"
                          className="w-full text-xs rounded-lg border-slate-200 focus:border-brand-500 focus:ring-brand-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">
                          Subtitle / Role / Issuer
                        </label>
                        <input
                          type="text"
                          value={entry.subtitle}
                          onChange={(e) =>
                            updateCustomSectionEntry(section.id, entry.id, { subtitle: e.target.value })
                          }
                          placeholder="e.g. Lead Author / AWS Certified"
                          className="w-full text-xs rounded-lg border-slate-200 focus:border-brand-500 focus:ring-brand-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">
                          Date / Year
                        </label>
                        <input
                          type="text"
                          value={entry.date}
                          onChange={(e) =>
                            updateCustomSectionEntry(section.id, entry.id, { date: e.target.value })
                          }
                          placeholder="e.g. 2023 - Present"
                          className="w-full text-xs rounded-lg border-slate-200 focus:border-brand-500 focus:ring-brand-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">
                          Location / Link URL
                        </label>
                        <input
                          type="text"
                          value={entry.location}
                          onChange={(e) =>
                            updateCustomSectionEntry(section.id, entry.id, { location: e.target.value })
                          }
                          placeholder="e.g. github.com/user/project"
                          className="w-full text-xs rounded-lg border-slate-200 focus:border-brand-500 focus:ring-brand-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-700 block mb-0.5">
                        Description / Outcomes
                      </label>
                      <textarea
                        rows={2}
                        value={entry.description}
                        onChange={(e) =>
                          updateCustomSectionEntry(section.id, entry.id, { description: e.target.value })
                        }
                        placeholder="Detail accomplishments, tech stack, or quantifiable outcomes..."
                        className="w-full text-xs rounded-lg border-slate-200 focus:border-brand-500 focus:ring-brand-500"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

