import React, { useState } from 'react';
import { 
  Check, 
  RotateCcw, 
  RotateCw, 
  AlignLeft, 
  AlignCenter 
} from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';
import { FontFamily } from '../../types/resume';
import { THEME_PALETTES } from '../customizer/Controls';

export type CustomizeSection = 
  | 'document'
  | 'templates'
  | 'layout'
  | 'fontSize'
  | 'spacing'
  | 'entries'
  | 'headings'
  | 'font'
  | 'colors'
  | 'header'
  | 'photo'
  | 'links'
  | 'footer'
  | 'sections';

export const FlowCustomizePanel: React.FC = () => {
  const { customization, updateLayout, updateTypography, updateSpacing, updateStyling } = useResumeStore();
  const { layout, typography, spacing, styling } = customization;

  const [activeSubTab, setActiveSubTab] = useState<CustomizeSection>('font');
  const [fontTarget, setFontTarget] = useState<'full' | 'headings'>('full');

  const subTabs: { id: CustomizeSection; label: string }[] = [
    { id: 'document', label: 'Document' },
    { id: 'templates', label: 'Templates' },
    { id: 'layout', label: 'Layout' },
    { id: 'fontSize', label: 'Font Size' },
    { id: 'spacing', label: 'Spacing' },
    { id: 'entries', label: 'Entries' },
    { id: 'headings', label: 'Headings' },
    { id: 'font', label: 'Font' },
    { id: 'colors', label: 'Colors' },
    { id: 'header', label: 'Header' },
    { id: 'photo', label: 'Photo' },
    { id: 'links', label: 'Links' },
    { id: 'footer', label: 'Footer' },
    { id: 'sections', label: 'Sections' },
  ];

  // Font options matching FlowCV reference in Image 1
  const fontList: { id: FontFamily; label: string; sample: string }[] = [
    { id: 'Lora', label: 'Lora', sample: 'Contemporary balanced serif' },
    { id: 'Source Serif Pro', label: 'Source Serif Pro', sample: 'Digital editorial serif' },
    { id: 'Zilla Slab', label: 'Zilla Slab', sample: 'Contemporary slab serif' },
    { id: 'PT Serif', label: 'PT Serif', sample: 'Universal legible serif' },
    { id: 'Literata', label: 'Literata', sample: 'Bookish editorial serif' },
    { id: 'EB Garamond', label: 'EB Garamond', sample: 'Classic Renaissance serif' },
    { id: 'Crimson Pro', label: 'Crimson Pro', sample: 'Gentle literary serif' },
    { id: 'Cormorant Garamond', label: 'Cormorant Garamond', sample: 'High-contrast luxury serif' },
    { id: 'Playfair Display', label: 'Playfair Display', sample: 'Editorial high-contrast serif' },
    { id: 'Plus Jakarta Sans', label: 'Plus Jakarta Sans', sample: 'Clean modern geometric' },
    { id: 'Inter', label: 'Inter', sample: 'Standard screen sans-serif' },
    { id: 'Source Code Pro', label: 'Source Code Pro', sample: 'Clean developer monospace' },
    { id: 'Roboto', label: 'Roboto', sample: 'Neutral geometric sans-serif' },
  ];

  return (
    <div className="flex gap-4 h-full relative pb-16">
      {/* 1. LEFT VERTICAL SUB-NAV MENU (Exact FlowCV Styling from Image 1) */}
      <nav className="w-28 sm:w-32 shrink-0 py-2 space-y-1.5 border-r border-slate-200/80 pr-2 select-none overflow-y-auto">
        {subTabs.map((tab) => {
          const isActive = activeSubTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`w-full text-left py-1 text-xs transition-colors flex items-center ${
                isActive
                  ? 'text-purple-600 font-bold border-l-2 border-purple-600 pl-3'
                  : 'text-slate-600 hover:text-slate-900 font-medium pl-3.5'
              }`}
            >
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* 2. RIGHT CONTROLS CARD CONTAINER */}
      <div className="flex-1 min-w-0">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 overflow-y-auto max-h-[calc(100vh-140px)] animate-in fade-in duration-150">
          
          {/* TAB: FONT (Active default matching Image 1) */}
          {activeSubTab === 'font' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Typography & Font Family
                </h3>
                <span className="text-[11px] font-mono text-purple-600 font-bold">
                  {typography.fontFamily}
                </span>
              </div>

              {/* Scrollable Font List */}
              <div className="space-y-1 max-h-[380px] overflow-y-auto pr-1">
                {fontList.map((f) => {
                  const isSelected = typography.fontFamily === f.id;
                  return (
                    <button
                      key={f.id}
                      onClick={() => updateTypography({ fontFamily: f.id })}
                      className={`w-full py-2.5 px-3 rounded-xl text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-purple-50 text-purple-700 font-bold'
                          : 'hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-semibold tracking-tight">{f.label}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{f.sample}</div>
                      </div>
                      {isSelected && (
                        <Check className="w-4 h-4 text-purple-600 stroke-[2.5] shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Target Pills at bottom of card (Full Page / Headings as in Image 1) */}
              <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={() => setFontTarget('full')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    fontTarget === 'full'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Full Page
                </button>
                <button
                  onClick={() => setFontTarget('headings')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    fontTarget === 'headings'
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Headings
                </button>
              </div>
            </div>
          )}

          {/* TAB: DOCUMENT */}
          {activeSubTab === 'document' && (
            <div className="space-y-5">
              <div className="pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Document Settings
                </h3>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">Paper Format</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className="p-3 rounded-xl border border-purple-500 bg-purple-50 text-purple-900 font-bold text-xs text-left"
                  >
                    <div>A4 Standard</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">210 × 297 mm (Global)</div>
                  </button>
                  <button
                    className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs text-left"
                  >
                    <div>US Letter</div>
                    <div className="text-[10px] text-slate-500 font-normal mt-0.5">8.5 × 11 in (North America)</div>
                  </button>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Page Margins</span>
                  <span className="font-mono text-purple-600 font-bold">{spacing.pageMargins}mm</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="24"
                  step="1"
                  value={spacing.pageMargins}
                  onChange={(e) => updateSpacing({ pageMargins: Number(e.target.value) })}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* TAB: TEMPLATES */}
          {activeSubTab === 'templates' && (
            <div className="space-y-4">
              <div className="pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Resume Template Presets
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    updateStyling({ headerBgColor: '#000000', primaryColor: '#0f172a' });
                    updateLayout({ columnLayout: 'single' });
                  }}
                  className="p-3 rounded-xl border-2 border-slate-900 bg-slate-50 text-left hover:shadow-xs transition-all"
                >
                  <div className="font-bold text-xs text-slate-900">Modern Obsidian</div>
                  <div className="text-[11px] text-slate-500 mt-1">FlowCV black banner header with grey section badges.</div>
                </button>

                <button
                  onClick={() => {
                    updateStyling({ headerBgColor: 'transparent', primaryColor: '#1e3a8a' });
                    updateLayout({ columnLayout: 'single' });
                  }}
                  className="p-3 rounded-xl border border-slate-200 bg-white text-left hover:bg-slate-50 transition-all"
                >
                  <div className="font-bold text-xs text-slate-900">Minimal Clean</div>
                  <div className="text-[11px] text-slate-500 mt-1">Crisp white background with navy typography accents.</div>
                </button>

                <button
                  onClick={() => {
                    updateStyling({ headerBgColor: '#1e3a8a', primaryColor: '#1e3a8a', sidebarBgColor: '#f8fafc' });
                    updateLayout({ columnLayout: 'left-sidebar', leftColumnWidthPercent: 35 });
                  }}
                  className="p-3 rounded-xl border border-slate-200 bg-white text-left hover:bg-slate-50 transition-all"
                >
                  <div className="font-bold text-xs text-slate-900">Executive Sidebar</div>
                  <div className="text-[11px] text-slate-500 mt-1">Two-column layout with left skills and education sidebar.</div>
                </button>

                <button
                  onClick={() => {
                    updateStyling({ headerBgColor: '#0d9488', primaryColor: '#0d9488' });
                    updateTypography({ fontFamily: 'Source Code Pro' });
                    updateLayout({ columnLayout: 'single' });
                  }}
                  className="p-3 rounded-xl border border-slate-200 bg-white text-left hover:bg-slate-50 transition-all"
                >
                  <div className="font-bold text-xs text-slate-900">Tech Lead Mono</div>
                  <div className="text-[11px] text-slate-500 mt-1">Monospace clarity and clean tech layout for engineers.</div>
                </button>
              </div>
            </div>
          )}

          {/* TAB: LAYOUT */}
          {activeSubTab === 'layout' && (
            <div className="space-y-5">
              <div className="pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Column Architecture
                </h3>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">Column Structure</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => updateLayout({ columnLayout: 'single', columns: 1 })}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      layout.columnLayout === 'single'
                        ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700 font-medium'
                    }`}
                  >
                    <div className="text-xs">Single Column</div>
                  </button>

                  <button
                    onClick={() => updateLayout({ columnLayout: 'left-sidebar', columns: 2 })}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      layout.columnLayout === 'left-sidebar'
                        ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700 font-medium'
                    }`}
                  >
                    <div className="text-xs">Left Sidebar</div>
                  </button>

                  <button
                    onClick={() => updateLayout({ columnLayout: 'right-sidebar', columns: 2 })}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      layout.columnLayout === 'right-sidebar'
                        ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700 font-medium'
                    }`}
                  >
                    <div className="text-xs">Right Sidebar</div>
                  </button>
                </div>
              </div>

              {layout.columnLayout !== 'single' && (
                <div>
                  <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1.5">
                    <span>Sidebar Width Ratio</span>
                    <span className="font-mono text-purple-600 font-bold">{layout.leftColumnWidthPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="45"
                    step="1"
                    value={layout.leftColumnWidthPercent}
                    onChange={(e) => updateLayout({ leftColumnWidthPercent: Number(e.target.value) })}
                    className="w-full accent-purple-600 cursor-pointer"
                  />
                </div>
              )}
            </div>
          )}

          {/* TAB: FONT SIZE */}
          {activeSubTab === 'fontSize' && (
            <div className="space-y-4">
              <div className="pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Font Sizes (Fine-Grained Steppers)
                </h3>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Full Name</span>
                    <span className="text-[10px] text-slate-500">Header name display</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1">
                    <button
                      onClick={() => updateTypography({ nameFontSize: Math.max(18, typography.nameFontSize - 1) })}
                      className="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="text-xs font-mono font-bold text-slate-900 px-2">{typography.nameFontSize}pt</span>
                    <button
                      onClick={() => updateTypography({ nameFontSize: Math.min(28, typography.nameFontSize + 1) })}
                      className="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 font-bold text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Section Headings</span>
                    <span className="text-[10px] text-slate-500">Summary, Experience, Education</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1">
                    <button
                      onClick={() => updateTypography({ headingFontSize: Math.max(12, typography.headingFontSize - 1) })}
                      className="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="text-xs font-mono font-bold text-slate-900 px-2">{typography.headingFontSize}pt</span>
                    <button
                      onClick={() => updateTypography({ headingFontSize: Math.min(18, typography.headingFontSize + 1) })}
                      className="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 font-bold text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Body Text</span>
                    <span className="text-[10px] text-slate-500">Bullet points, descriptions</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1">
                    <button
                      onClick={() => updateTypography({ baseFontSize: Math.max(9, typography.baseFontSize - 0.5) })}
                      className="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="text-xs font-mono font-bold text-slate-900 px-2">{typography.baseFontSize}pt</span>
                    <button
                      onClick={() => updateTypography({ baseFontSize: Math.min(12, typography.baseFontSize + 0.5) })}
                      className="w-7 h-7 rounded bg-slate-100 hover:bg-slate-200 font-bold text-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SPACING */}
          {activeSubTab === 'spacing' && (
            <div className="space-y-4">
              <div className="pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Vertical Spacing & Margins
                </h3>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Line Height</span>
                  <span className="font-mono text-purple-600 font-bold">{spacing.lineSpacing}</span>
                </div>
                <input
                  type="range"
                  min="1.1"
                  max="1.8"
                  step="0.05"
                  value={spacing.lineSpacing}
                  onChange={(e) => updateSpacing({ lineSpacing: Number(e.target.value) })}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Space Between Sections</span>
                  <span className="font-mono text-purple-600 font-bold">{spacing.spaceBetweenSections}px</span>
                </div>
                <input
                  type="range"
                  min="8"
                  max="24"
                  step="1"
                  value={spacing.spaceBetweenSections}
                  onChange={(e) => updateSpacing({ spaceBetweenSections: Number(e.target.value) })}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                  <span>Page Margins (A4)</span>
                  <span className="font-mono text-purple-600 font-bold">{spacing.pageMargins}mm</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="25"
                  step="1"
                  value={spacing.pageMargins}
                  onChange={(e) => updateSpacing({ pageMargins: Number(e.target.value) })}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* TAB: HEADINGS */}
          {activeSubTab === 'headings' && (
            <div className="space-y-4">
              <div className="pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Section Headings Styling
                </h3>
              </div>

              <div className="space-y-2">
                <div className="p-3 rounded-xl border-2 border-purple-600 bg-purple-50 text-left">
                  <div className="font-bold text-xs text-purple-900">Shaded Grey Banner (FlowCV Default)</div>
                  <div className="text-[11px] text-slate-600 mt-1">Light grey full-width strip with centered uppercase font and icon.</div>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-white text-left hover:bg-slate-50 cursor-pointer">
                  <div className="font-bold text-xs text-slate-900">Accent Underline</div>
                  <div className="text-[11px] text-slate-500 mt-1">Solid primary color underline below heading.</div>
                </div>

                <div className="p-3 rounded-xl border border-slate-200 bg-white text-left hover:bg-slate-50 cursor-pointer">
                  <div className="font-bold text-xs text-slate-900">Minimal Typography</div>
                  <div className="text-[11px] text-slate-500 mt-1">Clean sans-serif or serif bold without background bars.</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: COLORS */}
          {activeSubTab === 'colors' && (
            <div className="space-y-5">
              <div className="pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Color Themes & Custom Palette
                </h3>
              </div>

              {/* Preset Color Themes */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">Preset Themes</label>
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
                      className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 hover:border-slate-300 bg-white text-left transition-all"
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
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Header Banner
                  </label>
                  <div className="flex items-center gap-2 p-1.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <input
                      type="color"
                      value={styling.headerBgColor || '#000000'}
                      onChange={(e) => updateStyling({ headerBgColor: e.target.value })}
                      className="w-7 h-7 rounded border-none cursor-pointer"
                    />
                    <span className="text-xs font-mono font-bold uppercase">{styling.headerBgColor || '#000000'}</span>
                  </div>
                </div>

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

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Sidebar Tint
                  </label>
                  <div className="flex items-center gap-2 p-1.5 bg-slate-50 border border-slate-200 rounded-xl">
                    <input
                      type="color"
                      value={styling.sidebarBgColor}
                      onChange={(e) => updateStyling({ sidebarBgColor: e.target.value })}
                      className="w-7 h-7 rounded border-none cursor-pointer"
                    />
                    <span className="text-xs font-mono font-bold uppercase">{styling.sidebarBgColor}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: HEADER */}
          {activeSubTab === 'header' && (
            <div className="space-y-5">
              <div className="pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Header Banner & Alignment
                </h3>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">Header Style</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updateStyling({ headerBgColor: '#000000' })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      styling.headerBgColor && styling.headerBgColor !== 'transparent'
                        ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">Solid Dark Banner</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Full-bleed dark header bar</div>
                  </button>

                  <button
                    onClick={() => updateStyling({ headerBgColor: 'transparent' })}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      !styling.headerBgColor || styling.headerBgColor === 'transparent'
                        ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">Clean Minimal</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">Transparent white header</div>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">Text Alignment</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updateLayout({ headerAlignment: 'top-left' })}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      layout.headerAlignment === 'top-left'
                        ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700 font-medium'
                    }`}
                  >
                    <div className="text-xs flex items-center justify-center gap-1.5">
                      <AlignLeft className="w-3.5 h-3.5" />
                      <span>Top Left</span>
                    </div>
                  </button>

                  <button
                    onClick={() => updateLayout({ headerAlignment: 'top-center' })}
                    className={`p-2.5 rounded-xl border text-center transition-all ${
                      layout.headerAlignment === 'top-center'
                        ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700 font-medium'
                    }`}
                  >
                    <div className="text-xs flex items-center justify-center gap-1.5">
                      <AlignCenter className="w-3.5 h-3.5" />
                      <span>Centered</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PHOTO */}
          {activeSubTab === 'photo' && (
            <div className="space-y-5">
              <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Profile Photo Settings
                </h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-xs text-slate-600 font-medium">Show Photo</span>
                  <input
                    type="checkbox"
                    checked={styling.showPhoto}
                    onChange={(e) => updateStyling({ showPhoto: e.target.checked })}
                    className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                  />
                </label>
              </div>

              {styling.showPhoto && (
                <>
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-2">Photo Shape</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => updateStyling({ photoShape: 'circle' })}
                        className={`p-2 rounded-xl border text-center text-xs font-bold transition-all ${
                          styling.photoShape === 'circle'
                            ? 'border-purple-600 bg-purple-50 text-purple-900'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        Circle
                      </button>
                      <button
                        onClick={() => updateStyling({ photoShape: 'rounded' })}
                        className={`p-2 rounded-xl border text-center text-xs font-bold transition-all ${
                          styling.photoShape === 'rounded'
                            ? 'border-purple-600 bg-purple-50 text-purple-900'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        Rounded
                      </button>
                      <button
                        onClick={() => updateStyling({ photoShape: 'square' })}
                        className={`p-2 rounded-xl border text-center text-xs font-bold transition-all ${
                          styling.photoShape === 'square'
                            ? 'border-purple-600 bg-purple-50 text-purple-900'
                            : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        Square
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>Photo Size</span>
                      <span className="font-mono text-purple-600 font-bold">{styling.photoSize}px</span>
                    </div>
                    <input
                      type="range"
                      min="60"
                      max="110"
                      step="2"
                      value={styling.photoSize}
                      onChange={(e) => updateStyling({ photoSize: Number(e.target.value) })}
                      className="w-full accent-purple-600 cursor-pointer"
                    />
                  </div>
                </>
              )}
            </div>
          )}

          {/* TAB: LINKS */}
          {activeSubTab === 'links' && (
            <div className="space-y-4">
              <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Contact Links & Icons
                </h3>
                <label className="flex items-center gap-2 cursor-pointer">
                  <span className="text-xs text-slate-600 font-medium">Show Icons</span>
                  <input
                    type="checkbox"
                    checked={styling.showIcons}
                    onChange={(e) => updateStyling({ showIcons: e.target.checked })}
                    className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                  />
                </label>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">Link Style</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => updateStyling({ linkStyle: 'colored' })}
                    className={`p-2 rounded-xl border text-center text-xs font-bold transition-all ${
                      styling.linkStyle === 'colored'
                        ? 'border-purple-600 bg-purple-50 text-purple-900'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    Colored
                  </button>
                  <button
                    onClick={() => updateStyling({ linkStyle: 'underlined' })}
                    className={`p-2 rounded-xl border text-center text-xs font-bold transition-all ${
                      styling.linkStyle === 'underlined'
                        ? 'border-purple-600 bg-purple-50 text-purple-900'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    Underlined
                  </button>
                  <button
                    onClick={() => updateStyling({ linkStyle: 'plain' })}
                    className={`p-2 rounded-xl border text-center text-xs font-bold transition-all ${
                      styling.linkStyle === 'plain'
                        ? 'border-purple-600 bg-purple-50 text-purple-900'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    Neutral
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ENTRIES */}
          {activeSubTab === 'entries' && (
            <div className="space-y-5">
              <div className="pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  List Entries & Bullet Formatting
                </h3>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">Bullet Point Style</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    className="p-2.5 rounded-xl border border-purple-600 bg-purple-50 text-purple-900 font-bold text-xs text-center"
                  >
                    <span>• Bullet Disc</span>
                  </button>
                  <button
                    className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs text-center"
                  >
                    <span>– Dash</span>
                  </button>
                  <button
                    className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs text-center"
                  >
                    <span>→ Arrow</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-2">Company / Institution Font</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    className="p-2.5 rounded-xl border border-purple-600 bg-purple-50 text-purple-900 font-bold text-xs text-center"
                  >
                    <span className="italic">Italicized Accent</span>
                  </button>
                  <button
                    className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium text-xs text-center"
                  >
                    <span>Standard Weight</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: FOOTER */}
          {activeSubTab === 'footer' && (
            <div className="space-y-5">
              <div className="pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Resume Footer & Pagination
                </h3>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Show Page Numbers</span>
                  <span className="text-[10px] text-slate-500">Prints page numbers at bottom right</span>
                </div>
                <input
                  type="checkbox"
                  defaultChecked={true}
                  className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Custom Footer Note (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. References available upon request"
                  className="w-full text-xs rounded-xl border-slate-200 focus:border-purple-500 focus:ring-purple-500 shadow-sm p-2.5"
                />
              </div>
            </div>
          )}

          {/* TAB: SECTIONS */}
          {activeSubTab === 'sections' && (
            <div className="space-y-4">
              <div className="pb-2 border-b border-slate-100">
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Section Visibility & Order
                </h3>
              </div>

              <div className="space-y-2">
                {[
                  { name: 'Summary', icon: '📇', desc: 'Professional biographical intro' },
                  { name: 'Work Experience', icon: '💼', desc: 'Job history & achievements' },
                  { name: 'Educational History', icon: '🎓', desc: 'Degrees & institutions' },
                  { name: 'Relevant Skills', icon: '🧠', desc: 'Tech stack & proficiencies' },
                  { name: 'Custom Sections', icon: '📂', desc: 'Hackathons, projects & leadership' },
                ].map((s) => (
                  <div
                    key={s.name}
                    className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-200/80"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm">{s.icon}</span>
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">{s.name}</span>
                        <span className="text-[10px] text-slate-500">{s.desc}</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* 3. FLOATING UNDO / REDO PILL (As in FlowCV Image 1) */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-lg border border-slate-200/90 px-3 py-1.5 flex items-center gap-3 z-30">
        <button
          onClick={() => {}}
          className="p-1 hover:bg-slate-100 text-slate-600 rounded-full transition-colors"
          title="Undo"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        <div className="w-px h-3.5 bg-slate-200" />
        <button
          onClick={() => {}}
          className="p-1 hover:bg-slate-100 text-slate-600 rounded-full transition-colors"
          title="Redo"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
