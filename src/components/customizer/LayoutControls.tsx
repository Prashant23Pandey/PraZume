import React from 'react';
import { Columns, SplitSquareVertical } from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';
import { TemplateId, HeaderPosition } from '../../types/resume';

export const LayoutControls: React.FC = () => {
  const { customization, updateLayout } = useResumeStore();
  const { templateId, columns, leftColumnWidthPercent, headerPosition } = customization.layout;

  const templates: { id: TemplateId; name: string; desc: string }[] = [
    { id: 'modern', name: 'Modern', desc: 'Clean header with accent highlights' },
    { id: 'classic', name: 'Classic', desc: 'Timeless executive serif hierarchy' },
    { id: 'minimal', name: 'Minimal', desc: 'Streamlined Scandinavian layout' },
  ];

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
          Resume Template
        </label>
        <div className="grid grid-cols-3 gap-2">
          {templates.map((tpl) => (
            <button
              key={tpl.id}
              onClick={() => updateLayout({ templateId: tpl.id })}
              className={`p-3 rounded-xl text-left border transition-all ${
                templateId === tpl.id
                  ? 'border-brand-600 bg-brand-50/60 ring-2 ring-brand-500/20 text-brand-900'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <div className="text-xs font-bold">{tpl.name}</div>
              <div className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{tpl.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Columns Toggle */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
          Column Structure
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => updateLayout({ columns: 1 })}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
              columns === 1
                ? 'border-brand-600 bg-brand-50 text-brand-900 ring-2 ring-brand-500/20'
                : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>Single Column</span>
          </button>
          <button
            onClick={() => updateLayout({ columns: 2 })}
            className={`flex items-center justify-center gap-2 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
              columns === 2
                ? 'border-brand-600 bg-brand-50 text-brand-900 ring-2 ring-brand-500/20'
                : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
            }`}
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span>Two Columns</span>
          </button>
        </div>
      </div>

      {/* Left Column Width Slider (if 2 columns) */}
      {columns === 2 && (
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
          <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
            <span>Left Sidebar Ratio</span>
            <span className="font-mono text-brand-600 font-bold">{leftColumnWidthPercent}%</span>
          </div>
          <input
            type="range"
            min="25"
            max="45"
            step="1"
            value={leftColumnWidthPercent}
            onChange={(e) => updateLayout({ leftColumnWidthPercent: Number(e.target.value) })}
            className="w-full accent-brand-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>Compact (25%)</span>
            <span>Balanced (35%)</span>
            <span>Wide (45%)</span>
          </div>
        </div>
      )}

      {/* Header Position */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
          Header Placement
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['top', 'left', 'right'] as HeaderPosition[]).map((pos) => (
            <button
              key={pos}
              onClick={() => updateLayout({ headerPosition: pos })}
              className={`py-2 px-2 rounded-xl text-center capitalize border text-xs font-semibold transition-all ${
                headerPosition === pos
                  ? 'border-brand-600 bg-brand-50 text-brand-900 ring-2 ring-brand-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              {pos}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
