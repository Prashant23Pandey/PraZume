import React from 'react';
import { Space, Maximize2, MoveVertical } from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';

export const SpacingControls: React.FC = () => {
  const { customization, updateSpacing } = useResumeStore();
  const { lineSpacing, spaceBetweenSections, pageMargins } = customization.spacing;

  return (
    <div className="space-y-6">
      {/* Page Margins (mm) */}
      <div>
        <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
          <span className="flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-slate-400" />
            Page Margins (A4)
          </span>
          <span className="font-mono text-brand-600 font-bold">{pageMargins} mm</span>
        </div>
        <input
          type="range"
          min="6"
          max="24"
          step="1"
          value={pageMargins}
          onChange={(e) => updateSpacing({ pageMargins: Number(e.target.value) })}
          className="w-full accent-brand-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>Narrow (6mm)</span>
          <span>Balanced (12mm)</span>
          <span>Wide (24mm)</span>
        </div>
      </div>

      {/* Space Between Sections (px) */}
      <div>
        <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
          <span className="flex items-center gap-1.5">
            <MoveVertical className="w-3.5 h-3.5 text-slate-400" />
            Section Gaps
          </span>
          <span className="font-mono text-brand-600 font-bold">{spaceBetweenSections} px</span>
        </div>
        <input
          type="range"
          min="8"
          max="32"
          step="2"
          value={spaceBetweenSections}
          onChange={(e) => updateSpacing({ spaceBetweenSections: Number(e.target.value) })}
          className="w-full accent-brand-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>Compact (8px)</span>
          <span>Normal (16px)</span>
          <span>Spacious (32px)</span>
        </div>
      </div>

      {/* Line Spacing */}
      <div>
        <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
          <span className="flex items-center gap-1.5">
            <Space className="w-3.5 h-3.5 text-slate-400" />
            Line Height (Leading)
          </span>
          <span className="font-mono text-brand-600 font-bold">{lineSpacing}</span>
        </div>
        <input
          type="range"
          min="1.15"
          max="1.75"
          step="0.05"
          value={lineSpacing}
          onChange={(e) => updateSpacing({ lineSpacing: Number(e.target.value) })}
          className="w-full accent-brand-600 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-1">
          <span>Tight (1.15)</span>
          <span>Optimal (1.35)</span>
          <span>Airy (1.75)</span>
        </div>
      </div>
    </div>
  );
};

