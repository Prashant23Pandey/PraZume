import React, { useRef } from 'react';
import { 
  Download, 
  Printer, 
  ZoomIn, 
  ZoomOut, 
  Sliders, 
  FileDown, 
  FileUp, 
  RotateCcw, 
  Loader2 
} from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';
import { exportResumeAsJSON, importResumeFromJSON } from '../../utils/storage';
import { TemplateId } from '../../types/resume';

export const CanvasToolbar: React.FC = () => {
  const {
    resumeData,
    customization,
    zoomLevel,
    setZoomLevel,
    isCustomizerOpen,
    setIsCustomizerOpen,
    isExportingPDF,
    exportPDF,
    resetToDefault,
    loadCustomData,
    updateLayout,
  } = useResumeStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 10, 150));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 10, 50));
  const handleResetZoom = () => setZoomLevel(100);

  const handleExportJSON = () => {
    exportResumeAsJSON(resumeData, customization);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    importResumeFromJSON(
      file,
      (imported) => {
        loadCustomData(imported);
        alert('Resume data successfully imported!');
      },
      (error) => alert(error)
    );
  };

  return (
    <div className="canvas-toolbar bg-white border-b border-slate-200 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20 shadow-sm">
      {/* Template Quick Switcher */}
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider hidden lg:inline">
          Template:
        </span>
        {(['modern', 'classic', 'minimal'] as TemplateId[]).map((tpl) => (
          <button
            key={tpl}
            onClick={() => updateLayout({ templateId: tpl })}
            className={`capitalize px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
              customization.layout.templateId === tpl
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {tpl}
          </button>
        ))}
      </div>

      {/* Center: Zoom Controls */}
      <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
        <button
          onClick={handleZoomOut}
          className="p-1 hover:bg-white text-slate-600 rounded-lg transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleResetZoom}
          className="text-xs font-mono font-semibold px-2 py-0.5 text-slate-700 hover:bg-white rounded transition-colors"
          title="Reset Zoom to 100%"
        >
          {zoomLevel}%
        </button>
        <button
          onClick={handleZoomIn}
          className="p-1 hover:bg-white text-slate-600 rounded-lg transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Right: Actions & PDF Download */}
      <div className="flex items-center gap-2">
        {/* Hidden File Input for JSON restore */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
          title="Import JSON Resume backup"
        >
          <FileUp className="w-3.5 h-3.5" />
          <span>Import JSON</span>
        </button>

        <button
          onClick={handleExportJSON}
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium transition-colors"
          title="Save raw JSON resume file"
        >
          <FileDown className="w-3.5 h-3.5" />
          <span>Export JSON</span>
        </button>

        <button
          onClick={() => {
            if (window.confirm('Reset resume to FlowCV-inspired default data?')) {
              resetToDefault();
            }
          }}
          className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
          title="Reset to default sample resume"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        <button
          onClick={() => window.print()}
          className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
          title="Print directly or save via browser"
        >
          <Printer className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsCustomizerOpen(!isCustomizerOpen)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all ${
            isCustomizerOpen
              ? 'bg-brand-50 border-brand-500 text-brand-700 ring-2 ring-brand-500/20'
              : 'border-slate-200 hover:bg-slate-50 text-slate-700'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Customize</span>
        </button>

        <button
          onClick={exportPDF}
          disabled={isExportingPDF}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 disabled:opacity-70 text-white text-xs font-bold shadow-sm hover:shadow transition-all"
        >
          {isExportingPDF ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Rendering PDF...</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
