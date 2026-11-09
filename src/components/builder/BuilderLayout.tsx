import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Sliders, 
  Wand2, 
  Download, 
  MoreVertical, 
  RotateCcw, 
  Upload, 
  ShieldCheck, 
  Trash2, 
  ArrowLeft, 
  Loader2,
  Eye,
  Edit3,
  Printer
} from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';
import { FlowContentPanel } from './FlowContentPanel';
import { FlowCustomizePanel } from './FlowCustomizePanel';
import { FlowAIToolsPanel } from './FlowAIToolsPanel';
import { ResumePreview } from '../preview/ResumePreview';
import { CoverLetterModal } from './AIHelpers';
import { ATSModal } from './ATSModal';
import { exportResumeAsJSON, importResumeFromJSON } from '../../utils/storage';

export const BuilderLayout: React.FC = () => {
  const {
    resumeData,
    customization,
    setActiveView,
    resetToDefault,
    clearAll,
    loadCustomData,
    setIsCoverLetterModalOpen,
    setIsATSModalOpen,
    isExportingPDF,
    exportPDF,
  } = useResumeStore();

  // Top Tabs: 'content' | 'customize' | 'ai-tools' (Overview removed as requested)
  const [activeTab, setActiveTab] = useState<'content' | 'customize' | 'ai-tools'>('content');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLoadSample = () => {
    if (window.confirm('Load sample resume data? Any unsaved changes will be replaced.')) {
      resetToDefault();
      setIsMenuOpen(false);
    }
  };

  const handleClear = () => {
    if (window.confirm('Clear all resume fields? This will delete your current draft.')) {
      clearAll();
      setIsMenuOpen(false);
    }
  };

  const handleExportJSON = () => {
    exportResumeAsJSON(resumeData, customization);
    setIsMenuOpen(false);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    importResumeFromJSON(
      file,
      (imported) => {
        loadCustomData(imported);
        alert('Resume draft successfully restored!');
        setIsMenuOpen(false);
      },
      (error) => alert(error)
    );
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'customize':
        return <FlowCustomizePanel />;
      case 'ai-tools':
        return <FlowAIToolsPanel />;
      case 'content':
      default:
        return <FlowContentPanel />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#f4f2ee] font-sans">
      {/* Hidden Import File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleImportFile}
        className="hidden"
      />

      {/* TOP FLOATING NAVIGATION BAR (Clean FlowCV Aesthetic without Overview and Resume pill) */}
      <header className="px-3 sm:px-6 pt-3 pb-2 shrink-0 z-30">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200/90 px-3 sm:px-5 py-2.5 flex items-center justify-between gap-3">
          {/* Left: Brand / Home Link + Segmented 3 Tabs */}
          <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto">
            {/* Back to Landing */}
            <button
              onClick={() => setActiveView('landing')}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl hover:bg-slate-100 text-slate-700 text-xs font-bold transition-colors shrink-0"
              title="Return to Home"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-500" />
              <span className="font-serif font-black text-sm tracking-tight text-slate-900 hidden sm:inline">
                Pra<span className="italic font-normal text-purple-600">Zume</span>
              </span>
            </button>

            <div className="h-4 w-px bg-slate-200 shrink-0 hidden sm:block" />

            {/* Segmented Top Tabs */}
            <div className="flex items-center gap-1.5 shrink-0">
              {/* Content Tab */}
              <button
                onClick={() => setActiveTab('content')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'content'
                    ? 'bg-rose-50 text-rose-600 border border-rose-200 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Content</span>
              </button>

              {/* Customize Tab */}
              <button
                onClick={() => setActiveTab('customize')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'customize'
                    ? 'bg-rose-50 text-rose-600 border border-rose-200 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Customize</span>
              </button>

              {/* AI Tools Tab */}
              <button
                onClick={() => setActiveTab('ai-tools')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'ai-tools'
                    ? 'bg-rose-50 text-rose-600 border border-rose-200 shadow-2xs font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <Wand2 className="w-3.5 h-3.5" />
                <span>AI Tools</span>
              </button>
            </div>
          </div>

          {/* Right: Download Button & More Options (Resume dropdown removed) */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Mobile View Toggle */}
            <div className="md:hidden flex rounded-lg bg-slate-100 p-0.5">
              <button
                onClick={() => setMobileView('editor')}
                className={`p-1.5 rounded-md text-xs ${mobileView === 'editor' ? 'bg-white shadow-xs font-bold text-slate-900' : 'text-slate-500'}`}
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setMobileView('preview')}
                className={`p-1.5 rounded-md text-xs ${mobileView === 'preview' ? 'bg-white shadow-xs font-bold text-slate-900' : 'text-slate-500'}`}
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* High-Impact Download Button */}
            <button
              onClick={exportPDF}
              disabled={isExportingPDF}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#18181b] hover:bg-black text-white text-xs font-bold shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60"
            >
              {isExportingPDF ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>{isExportingPDF ? 'Exporting...' : 'Download'}</span>
            </button>

            {/* Options Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 transition-colors"
                title="More Options"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {isMenuOpen && (
                <div 
                  className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-1.5 z-50 text-xs font-medium animate-in fade-in zoom-in-95"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <button
                    onClick={handleLoadSample}
                    className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-slate-50 text-slate-700"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-purple-600" />
                    <span>Load Sample Data</span>
                  </button>

                  <button
                    onClick={handleExportJSON}
                    className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-slate-50 text-slate-700"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-500" />
                    <span>Export JSON Backup</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      window.print();
                    }}
                    className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-slate-50 text-slate-700"
                    title="Print directly or save via browser vector PDF"
                  >
                    <Printer className="w-3.5 h-3.5 text-blue-600" />
                    <span>Print / Save Vector PDF</span>
                  </button>

                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-slate-50 text-slate-700"
                  >
                    <Upload className="w-3.5 h-3.5 text-slate-500" />
                    <span>Import JSON Backup</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsCoverLetterModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-slate-50 text-slate-700"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-rose-500" />
                    <span>Cover Letter Generator</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsATSModalOpen(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-slate-50 text-slate-700"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>ATS Compatibility Scanner</span>
                  </button>

                  <div className="my-1 border-t border-slate-100" />

                  <button
                    onClick={handleClear}
                    className="w-full px-3.5 py-2 text-left flex items-center gap-2 hover:bg-rose-50 text-rose-600 font-semibold"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Clear Resume</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MAIN SYSTEMATIC WORKSPACE SPLIT-PANE */}
      <div className="flex-1 flex flex-col md:flex-row h-[calc(100vh-76px)] overflow-hidden relative max-w-7xl mx-auto w-full px-3 sm:px-6 pb-3 gap-6">
        {/* Left Pane: Stack of Functional Clickable Cards or Flow Customize Panel */}
        <div
          className={`w-full ${
            activeTab === 'customize' 
              ? 'md:w-[500px] lg:w-[540px] xl:w-[580px]' 
              : 'md:w-[460px] lg:w-[490px] xl:w-[520px]'
          } h-full overflow-y-auto pr-1 shrink-0 transition-all duration-200 ${
            mobileView === 'preview' ? 'hidden md:block' : 'block'
          }`}
        >
          {renderActiveTabContent()}
        </div>

        {/* Right Pane: Live Centered A4 Canvas Preview */}
        <div
          className={`flex-1 h-full overflow-hidden ${
            mobileView === 'editor' ? 'hidden md:block' : 'block'
          }`}
        >
          <ResumePreview />
        </div>
      </div>

      {/* MODALS */}
      <CoverLetterModal />
      <ATSModal />
    </div>
  );
};
