import React from 'react';
import { useResumeStore } from '../../context/ResumeContext';
import { FontFamily, LinkStyle } from '../../types/resume';

export const TypographyControls: React.FC = () => {
  const { customization, updateTypography, updateStyling } = useResumeStore();
  const { fontFamily, baseFontSize, headingFontSize, nameFontSize } = customization.typography;
  const { linkStyle } = customization.styling;

  const fontOptions: { id: FontFamily; label: string; sample: string; cssClass: string }[] = [
    { id: 'Sans', label: 'Modern Sans', sample: 'Inter (Default)', cssClass: 'font-sans' },
    { id: 'Serif', label: 'Executive Serif', sample: 'Merriweather', cssClass: 'font-serif' },
    { id: 'Mono', label: 'Tech Mono', sample: 'JetBrains Mono', cssClass: 'font-mono' },
  ];

  return (
    <div className="space-y-6">
      {/* Font Family */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2.5">
          Font Family
        </label>
        <div className="grid grid-cols-3 gap-2">
          {fontOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => updateTypography({ fontFamily: opt.id })}
              className={`p-3 rounded-xl text-left border transition-all ${
                fontFamily === opt.id
                  ? 'border-brand-600 bg-brand-50/70 text-brand-900 ring-2 ring-brand-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              <div className={`text-sm font-bold ${opt.cssClass}`}>{opt.id}</div>
              <div className="text-[10px] text-slate-500 mt-0.5 truncate">{opt.sample}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Name Font Size */}
      <div>
        <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
          <span>Name Font Size</span>
          <span className="font-mono text-brand-600 font-bold">{nameFontSize} pt</span>
        </div>
        <input
          type="range"
          min="18"
          max="32"
          step="1"
          value={nameFontSize}
          onChange={(e) => updateTypography({ nameFontSize: Number(e.target.value) })}
          className="w-full accent-brand-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>Subtle (18pt)</span>
          <span>Standard (24pt)</span>
          <span>Bold (32pt)</span>
        </div>
      </div>

      {/* Heading Font Size */}
      <div>
        <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
          <span>Section Heading Size</span>
          <span className="font-mono text-brand-600 font-bold">{headingFontSize} pt</span>
        </div>
        <input
          type="range"
          min="11"
          max="18"
          step="0.5"
          value={headingFontSize}
          onChange={(e) => updateTypography({ headingFontSize: Number(e.target.value) })}
          className="w-full accent-brand-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>Compact (11pt)</span>
          <span>Standard (13pt)</span>
          <span>Prominent (18pt)</span>
        </div>
      </div>

      {/* Body Font Size */}
      <div>
        <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
          <span>Body Font Size</span>
          <span className="font-mono text-brand-600 font-bold">{baseFontSize} pt</span>
        </div>
        <input
          type="range"
          min="8.5"
          max="12"
          step="0.5"
          value={baseFontSize}
          onChange={(e) => updateTypography({ baseFontSize: Number(e.target.value) })}
          className="w-full accent-brand-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>Dense (8.5pt)</span>
          <span>Standard (9.5pt)</span>
          <span>Large (12pt)</span>
        </div>
      </div>

      {/* Link Styling */}
      <div>
        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
          Hyperlink Presentation
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(['colored', 'underlined', 'plain'] as LinkStyle[]).map((style) => (
            <button
              key={style}
              onClick={() => updateStyling({ linkStyle: style })}
              className={`py-2 px-2 rounded-xl text-center capitalize border text-xs font-semibold transition-all ${
                linkStyle === style
                  ? 'border-brand-600 bg-brand-50 text-brand-900 ring-2 ring-brand-500/20'
                  : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
