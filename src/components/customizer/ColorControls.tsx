import React from 'react';
import { Check } from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';

const PRESET_COLORS = [
  { name: 'Sky Blue', hex: '#0284c7' },
  { name: 'Indigo', hex: '#4f46e5' },
  { name: 'Emerald', hex: '#059669' },
  { name: 'Amber', hex: '#d97706' },
  { name: 'Rose', hex: '#e11d48' },
  { name: 'Slate', hex: '#334155' },
  { name: 'Teal', hex: '#0d9488' },
  { name: 'Violet', hex: '#7c3aed' },
];

export const ColorControls: React.FC = () => {
  const { customization, updateStyling } = useResumeStore();
  const { primaryColor, textColor, headerBgColor } = customization.styling;

  return (
    <div className="space-y-6">
      {/* Primary Accent Color Presets */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2.5">
          Accent Brand Color
        </label>
        <div className="grid grid-cols-4 gap-2 mb-3">
          {PRESET_COLORS.map((col) => {
            const isSelected = primaryColor.toLowerCase() === col.hex.toLowerCase();
            return (
              <button
                key={col.hex}
                onClick={() => updateStyling({ primaryColor: col.hex })}
                className="flex items-center gap-1.5 p-2 rounded-xl border border-slate-200 hover:border-slate-300 transition-all text-left bg-white"
              >
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: col.hex }}
                >
                  {isSelected && <Check className="w-2.5 h-2.5 text-white" />}
                </span>
                <span className="text-[11px] font-medium text-slate-700 truncate">{col.name}</span>
              </button>
            );
          })}
        </div>

        {/* Custom Hex Input */}
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => updateStyling({ primaryColor: e.target.value })}
            className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer p-0.5 bg-white"
          />
          <div className="flex-1 relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-mono">
              HEX
            </span>
            <input
              type="text"
              value={primaryColor}
              onChange={(e) => updateStyling({ primaryColor: e.target.value })}
              className="w-full text-xs font-mono uppercase pl-10 pr-3 py-1.5 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
            />
          </div>
        </div>
      </div>

      {/* Header Background Color */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
          Header / Accent Tint
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={headerBgColor.startsWith('#') ? headerBgColor : '#f0f9ff'}
            onChange={(e) => updateStyling({ headerBgColor: e.target.value })}
            className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer p-0.5 bg-white"
          />
          <button
            onClick={() => updateStyling({ headerBgColor: 'transparent' })}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
              headerBgColor === 'transparent'
                ? 'border-brand-500 bg-brand-50 text-brand-700'
                : 'border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            Transparent
          </button>
          <button
            onClick={() => updateStyling({ headerBgColor: '#f8fafc' })}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Soft Slate
          </button>
        </div>
      </div>

      {/* Text Color */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
          Body Text Color
        </label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={textColor}
            onChange={(e) => updateStyling({ textColor: e.target.value })}
            className="w-9 h-9 rounded-lg border border-slate-200 cursor-pointer p-0.5 bg-white"
          />
          <span className="text-xs font-mono text-slate-600">{textColor}</span>
        </div>
      </div>
    </div>
  );
};
