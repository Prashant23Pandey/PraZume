import React from 'react';
import { 
  Columns, 
  SplitSquareVertical, 
  AlignLeft, 
  AlignCenter, 
  Type, 
  Palette, 
  Space, 
  Camera, 
  Square, 
  Circle,
  Eye,
  EyeOff
} from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';
import { 
  ColumnLayout, 
  HeaderAlignment, 
  FontFamily, 
  PhotoShape 
} from '../../types/resume';

export const THEME_PALETTES = [
  {
    name: 'FlowCV Obsidian',
    primary: '#0f172a',
    headerBg: '#000000',
    text: '#0f172a',
    bg: '#ffffff',
    sidebar: '#f8fafc',
    dot: '#000000',
  },
  {
    name: 'Executive Navy',
    primary: '#1e3a8a',
    headerBg: '#1e3a8a',
    text: '#0f172a',
    bg: '#ffffff',
    sidebar: '#f8fafc',
    dot: '#1e3a8a',
  },
  {
    name: 'Modern Teal',
    primary: '#0d9488',
    headerBg: '#0d9488',
    text: '#134e4a',
    bg: '#ffffff',
    sidebar: '#f0fdfa',
    dot: '#0d9488',
  },
  {
    name: 'Minimal Charcoal',
    primary: '#334155',
    headerBg: '#334155',
    text: '#0f172a',
    bg: '#ffffff',
    sidebar: '#f8fafc',
    dot: '#334155',
  },
  {
    name: 'Creative Emerald',
    primary: '#059669',
    headerBg: '#059669',
    text: '#064e3b',
    bg: '#ffffff',
    sidebar: '#f0fdf4',
    dot: '#059669',
  },
  {
    name: 'Cobalt Blue',
    primary: '#2563eb',
    headerBg: '#2563eb',
    text: '#1e293b',
    bg: '#ffffff',
    sidebar: '#f0f9ff',
    dot: '#2563eb',
  },
  {
    name: 'Imperial Crimson',
    primary: '#be123c',
    headerBg: '#be123c',
    text: '#1e293b',
    bg: '#ffffff',
    sidebar: '#fff1f2',
    dot: '#be123c',
  },
];

export const Controls: React.FC = () => {
  const { customization, updateLayout, updateTypography, updateSpacing, updateStyling } = useResumeStore();
  const { layout, typography, spacing, styling } = customization;

  const fontOptions: { id: FontFamily; label: string; sample: string }[] = [
    { id: 'Playfair Display', label: 'Playfair Display', sample: 'Editorial High-Contrast Serif' },
    { id: 'Inter', label: 'Plus Jakarta Sans', sample: 'Modern Geometric Sans' },
    { id: 'Source Code Pro', label: 'Source Code Pro', sample: 'Clean Tech Monospace' },
  ];

  return (
    <div className="space-y-8 text-left pb-6">
      {/* SECTION A: Layout & Columns */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Columns className="w-4 h-4 text-brand-600" />
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Layout & Column Architecture
          </h4>
        </div>

        {/* Column Layout Picker */}
        <div>
          <label className="text-[11px] font-semibold text-slate-600 block mb-2">
            Column Structure
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'single', label: 'Single Column' },
              { id: 'left-sidebar', label: 'Left Sidebar' },
              { id: 'right-sidebar', label: 'Right Sidebar' },
            ].map((col) => (
              <button
                key={col.id}
                onClick={() =>
                  updateLayout({
                    columnLayout: col.id as ColumnLayout,
                    columns: col.id === 'single' ? 1 : 2,
                  })
                }
                className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                  layout.columnLayout === col.id
                    ? 'border-brand-600 bg-brand-50/70 text-brand-900 ring-2 ring-brand-500/20'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                }`}
              >
                {col.label}
              </button>
            ))}
          </div>
        </div>

        {/* Column Width Slider (if 2 columns) */}
        {layout.columns === 2 && (
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
              <span>Sidebar Column Ratio</span>
              <span className="font-mono text-brand-600 font-bold">{layout.leftColumnWidthPercent}%</span>
            </div>
            <input
              type="range"
              min="30"
              max="50"
              step="1"
              value={layout.leftColumnWidthPercent}
              onChange={(e) => updateLayout({ leftColumnWidthPercent: Number(e.target.value) })}
              className="w-full accent-brand-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>Compact (30%)</span>
              <span>Balanced (35%)</span>
              <span>Equal (50%)</span>
            </div>
          </div>
        )}

        {/* Header Alignment */}
        <div>
          <label className="text-[11px] font-semibold text-slate-600 block mb-2">
            Header Alignment
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'top-left', label: 'Top-Left', icon: AlignLeft },
              { id: 'top-center', label: 'Top-Center', icon: AlignCenter },
              { id: 'integrated', label: 'Column Integrated', icon: SplitSquareVertical },
            ].map((align) => {
              const Icon = align.icon;
              return (
                <button
                  key={align.id}
                  onClick={() => updateLayout({ headerAlignment: align.id as HeaderAlignment })}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl border text-[11px] font-semibold transition-all ${
                    layout.headerAlignment === align.id
                      ? 'border-brand-600 bg-brand-50 text-brand-900 ring-2 ring-brand-500/20'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{align.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* SECTION B: Typography */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Type className="w-4 h-4 text-brand-600" />
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Typography & Font Scale
          </h4>
        </div>

        {/* Font Selector */}
        <div>
          <label className="text-[11px] font-semibold text-slate-600 block mb-2">
            Typeface Family
          </label>
          <div className="grid grid-cols-2 gap-2">
            {fontOptions.map((f) => (
              <button
                key={f.id}
                onClick={() => updateTypography({ fontFamily: f.id })}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  typography.fontFamily === f.id
                    ? 'border-brand-600 bg-brand-50/70 text-brand-900 ring-2 ring-brand-500/20'
                    : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                }`}
              >
                <div className="text-xs font-bold truncate">{f.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{f.sample}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Fine-grained Font Size Steppers (+/- pt) */}
        <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-100">
          <div>
            <span className="text-[10px] font-bold text-slate-600 block mb-1">Full Name</span>
            <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg p-1">
              <button
                onClick={() => updateTypography({ nameFontSize: Math.max(18, typography.nameFontSize - 1) })}
                className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 font-bold text-xs"
              >
                -
              </button>
              <span className="text-xs font-mono font-bold text-slate-800">{typography.nameFontSize}pt</span>
              <button
                onClick={() => updateTypography({ nameFontSize: Math.min(28, typography.nameFontSize + 1) })}
                className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 font-bold text-xs"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-600 block mb-1">Headings</span>
            <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg p-1">
              <button
                onClick={() => updateTypography({ headingFontSize: Math.max(12, typography.headingFontSize - 1) })}
                className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 font-bold text-xs"
              >
                -
              </button>
              <span className="text-xs font-mono font-bold text-slate-800">{typography.headingFontSize}pt</span>
              <button
                onClick={() => updateTypography({ headingFontSize: Math.min(18, typography.headingFontSize + 1) })}
                className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 font-bold text-xs"
              >
                +
              </button>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-600 block mb-1">Body Text</span>
            <div className="flex items-center justify-between bg-white border border-slate-200 rounded-lg p-1">
              <button
                onClick={() => updateTypography({ baseFontSize: Math.max(9, typography.baseFontSize - 0.5) })}
                className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 font-bold text-xs"
              >
                -
              </button>
              <span className="text-xs font-mono font-bold text-slate-800">{typography.baseFontSize}pt</span>
              <button
                onClick={() => updateTypography({ baseFontSize: Math.min(12, typography.baseFontSize + 0.5) })}
                className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 font-bold text-xs"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION C: Spacing & Margins */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Space className="w-4 h-4 text-brand-600" />
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Spacing & Page Margins
          </h4>
        </div>

        <div>
          <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1">
            <span>Line Height</span>
            <span className="font-mono text-brand-600 font-bold">{spacing.lineSpacing}</span>
          </div>
          <input
            type="range"
            min="1.1"
            max="1.8"
            step="0.05"
            value={spacing.lineSpacing}
            onChange={(e) => updateSpacing({ lineSpacing: Number(e.target.value) })}
            className="w-full accent-brand-600 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1">
            <span>Section Spacing</span>
            <span className="font-mono text-brand-600 font-bold">{spacing.spaceBetweenSections}px</span>
          </div>
          <input
            type="range"
            min="8"
            max="24"
            step="1"
            value={spacing.spaceBetweenSections}
            onChange={(e) => updateSpacing({ spaceBetweenSections: Number(e.target.value) })}
            className="w-full accent-brand-600 cursor-pointer"
          />
        </div>

        <div>
          <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1">
            <span>Page Margins (A4)</span>
            <span className="font-mono text-brand-600 font-bold">{spacing.pageMargins}mm</span>
          </div>
          <input
            type="range"
            min="10"
            max="25"
            step="1"
            value={spacing.pageMargins}
            onChange={(e) => updateSpacing({ pageMargins: Number(e.target.value) })}
            className="w-full accent-brand-600 cursor-pointer"
          />
        </div>
      </div>

      {/* SECTION D: Color Palette Picker */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Palette className="w-4 h-4 text-brand-600" />
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Color Palettes & Tint
          </h4>
        </div>

        {/* Preset Palettes */}
        <div>
          <label className="text-[11px] font-semibold text-slate-600 block mb-2">
            Designer Color Themes
          </label>
          <div className="grid grid-cols-2 gap-2">
            {THEME_PALETTES.map((pal) => (
              <button
                key={pal.name}
                onClick={() =>
                  updateStyling({
                    primaryColor: pal.primary,
                    headerBgColor: pal.headerBg || pal.primary,
                    textColor: pal.text,
                    backgroundColor: pal.bg,
                    sidebarBgColor: pal.sidebar,
                  })
                }
                className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 hover:border-slate-300 bg-white transition-all text-left group"
              >
                <span
                  className="w-4 h-4 rounded-full shrink-0 shadow-xs ring-1 ring-slate-200"
                  style={{ backgroundColor: pal.dot }}
                />
                <span className="text-xs font-bold text-slate-800 truncate">{pal.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Color Pickers */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Primary Accent
            </label>
            <div className="flex items-center gap-2 p-1.5 bg-slate-50 border border-slate-200 rounded-xl">
              <input
                type="color"
                value={styling.primaryColor}
                onChange={(e) => updateStyling({ primaryColor: e.target.value })}
                className="w-7 h-7 rounded border-none cursor-pointer"
              />
              <span className="text-xs font-mono font-bold uppercase">{styling.primaryColor}</span>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-slate-600 block mb-1">
              Body Text
            </label>
            <div className="flex items-center gap-2 p-1.5 bg-slate-50 border border-slate-200 rounded-xl">
              <input
                type="color"
                value={styling.textColor}
                onChange={(e) => updateStyling({ textColor: e.target.value })}
                className="w-7 h-7 rounded border-none cursor-pointer"
              />
              <span className="text-xs font-mono font-bold uppercase">{styling.textColor}</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION E: Photo & Link Styling */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Camera className="w-4 h-4 text-brand-600" />
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            Photo & Icon Styling
          </h4>
        </div>

        {/* Photo Size Slider (40px to 120px) */}
        <div>
          <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1">
            <span>Photo Diameter</span>
            <span className="font-mono text-brand-600 font-bold">{styling.photoSize}px</span>
          </div>
          <input
            type="range"
            min="40"
            max="120"
            step="5"
            value={styling.photoSize}
            onChange={(e) => updateStyling({ photoSize: Number(e.target.value) })}
            className="w-full accent-brand-600 cursor-pointer"
          />
        </div>

        {/* Photo Shape Toggles */}
        <div>
          <label className="text-[11px] font-semibold text-slate-600 block mb-2">
            Photo Shape
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(
              [
                { id: 'circle', label: 'Circle', icon: Circle },
                { id: 'rounded', label: 'Rounded', icon: Square },
                { id: 'square', label: 'Square', icon: Square },
              ] as { id: PhotoShape; label: string; icon: any }[]
            ).map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => updateStyling({ photoShape: s.id })}
                  className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border text-xs font-bold transition-all ${
                    styling.photoShape === s.id
                      ? 'border-brand-600 bg-brand-50 text-brand-900 ring-2 ring-brand-500/20'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Contact Icon Toggle */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
          <div>
            <span className="text-xs font-bold text-slate-800 block">Contact Icons</span>
            <span className="text-[10px] text-slate-500">Show/Hide icons beside email, phone, links</span>
          </div>
          <button
            onClick={() => updateStyling({ showIcons: !styling.showIcons })}
            className={`p-2 rounded-xl transition-colors ${
              styling.showIcons ? 'bg-brand-100 text-brand-700' : 'bg-slate-200 text-slate-500'
            }`}
          >
            {styling.showIcons ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
};
