import React, { useState } from 'react';
import { Plus, Trash2, ChevronUp, ChevronDown, FolderPlus, Sparkles } from 'lucide-react';
import { useResumeStore } from '../../../context/ResumeContext';

export const CustomSectionForm: React.FC = () => {
  const {
    resumeData,
    addCustomSection,
    updateCustomSectionTitle,
    removeCustomSection,
    moveCustomSection,
    addCustomSectionEntry,
    updateCustomSectionEntry,
    removeCustomSectionEntry,
    moveCustomSectionEntry,
  } = useResumeStore();

  const { customSections } = resumeData;
  const [newTitle, setNewTitle] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addCustomSection(newTitle.trim());
    setNewTitle('');
  };

  const handleDeleteSection = (id: string, title: string) => {
    if (window.confirm(`Delete entire section "${title || 'Untitled Section'}" and all its entries?`)) {
      removeCustomSection(id);
    }
  };

  const handleDeleteEntry = (sectionId: string, entryId: string, title: string) => {
    if (window.confirm(`Delete item "${title || 'Untitled Item'}"?`)) {
      removeCustomSectionEntry(sectionId, entryId);
    }
  };

  const suggestions = [
    'Projects & Open Source',
    'Certifications & Licenses',
    'Awards & Honors',
    'Research Publications',
    'Volunteering & Community',
    'Languages & Dialects'
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="pb-4 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Custom Sections</h2>
        <p className="text-xs text-slate-500 mt-0.5">Add specialized categories like Projects, Certifications, or Publications</p>
      </div>

      {/* Creator Bar */}
      <form onSubmit={handleCreate} className="p-4 bg-slate-50 border border-slate-200/90 rounded-2xl space-y-3">
        <div className="text-xs font-bold text-slate-800">Create New Custom Section</div>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Section Title (e.g. Research Publications)"
            className="flex-1 text-xs rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500"
          />
          <button
            type="submit"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold transition-all shrink-0 shadow-xs"
          >
            <FolderPlus className="w-3.5 h-3.5" />
            <span>Create Section</span>
          </button>
        </div>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[10px] text-slate-400 font-semibold">Ideas:</span>
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => addCustomSection(s)}
              className="text-[10px] px-2 py-0.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:border-brand-300 hover:text-brand-600 transition-colors"
            >
              + {s}
            </button>
          ))}
        </div>
      </form>

      {/* Sections List */}
      {customSections.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
          <Sparkles className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h4 className="text-sm font-bold text-slate-700">No custom sections added</h4>
          <p className="text-xs text-slate-500">Highlight portfolio projects, honors, and credentials to stand out.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {customSections.map((sec, secIdx) => (
            <div
              key={sec.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4"
            >
              {/* Section Title Header & Reorder */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 gap-2">
                <input
                  type="text"
                  value={sec.title}
                  onChange={(e) => updateCustomSectionTitle(sec.id, e.target.value)}
                  placeholder="Section Title"
                  className="text-base font-extrabold text-slate-900 border-none p-0 focus:ring-0 placeholder:text-slate-300 flex-1"
                />

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => moveCustomSection(secIdx, 'up')}
                    disabled={secIdx === 0}
                    className="p-1 rounded text-slate-400 hover:text-slate-800 disabled:opacity-20"
                    title="Move Section Up"
                  >
                    <ChevronUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveCustomSection(secIdx, 'down')}
                    disabled={secIdx === customSections.length - 1}
                    className="p-1 rounded text-slate-400 hover:text-slate-800 disabled:opacity-20"
                    title="Move Section Down"
                  >
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => addCustomSectionEntry(sec.id)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold transition-colors ml-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Item</span>
                  </button>

                  <button
                    onClick={() => handleDeleteSection(sec.id, sec.title)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors ml-1"
                    title="Delete Section"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Entries for this Section */}
              <div className="space-y-3">
                {sec.entries.map((ent, entIdx) => (
                  <div
                    key={ent.id}
                    className="p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-slate-700">Item #{entIdx + 1}</span>
                        <div className="flex items-center">
                          <button
                            onClick={() => moveCustomSectionEntry(sec.id, entIdx, 'up')}
                            disabled={entIdx === 0}
                            className="p-0.5 text-slate-400 hover:text-slate-800 disabled:opacity-20"
                            title="Move Item Up"
                          >
                            <ChevronUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => moveCustomSectionEntry(sec.id, entIdx, 'down')}
                            disabled={entIdx === sec.entries.length - 1}
                            className="p-0.5 text-slate-400 hover:text-slate-800 disabled:opacity-20"
                            title="Move Item Down"
                          >
                            <ChevronDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteEntry(sec.id, ent.id, ent.title)}
                        className="p-1 text-slate-300 hover:text-rose-500 rounded transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                          Title / Name *
                        </label>
                        <input
                          type="text"
                          value={ent.title}
                          onChange={(e) =>
                            updateCustomSectionEntry(sec.id, ent.id, { title: e.target.value })
                          }
                          placeholder="e.g. Distributed Consensus Engine"
                          className="w-full text-xs rounded-lg border-slate-200 focus:border-brand-500 focus:ring-brand-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                          Subtitle / Role / Issuer
                        </label>
                        <input
                          type="text"
                          value={ent.subtitle}
                          onChange={(e) =>
                            updateCustomSectionEntry(sec.id, ent.id, { subtitle: e.target.value })
                          }
                          placeholder="e.g. Lead Author / AWS"
                          className="w-full text-xs rounded-lg border-slate-200 focus:border-brand-500 focus:ring-brand-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                          Date / Year
                        </label>
                        <input
                          type="text"
                          value={ent.date}
                          onChange={(e) =>
                            updateCustomSectionEntry(sec.id, ent.id, { date: e.target.value })
                          }
                          placeholder="e.g. 2023 - Present"
                          className="w-full text-xs rounded-lg border-slate-200 focus:border-brand-500 focus:ring-brand-500"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                          Link / Location
                        </label>
                        <input
                          type="text"
                          value={ent.location}
                          onChange={(e) =>
                            updateCustomSectionEntry(sec.id, ent.id, { location: e.target.value })
                          }
                          placeholder="e.g. github.com/user/project"
                          className="w-full text-xs rounded-lg border-slate-200 focus:border-brand-500 focus:ring-brand-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-700 block mb-0.5">
                        Description / Outcomes
                      </label>
                      <textarea
                        rows={2}
                        value={ent.description}
                        onChange={(e) =>
                          updateCustomSectionEntry(sec.id, ent.id, { description: e.target.value })
                        }
                        placeholder="Detail achievements, impact, or technologies used..."
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

