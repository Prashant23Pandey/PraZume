import React, { useRef } from 'react';
import { 
  User, 
  FileText, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  FolderPlus, 
  Sliders, 
  RotateCcw, 
  Download, 
  Upload, 
  Trash2, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';
import { ActiveSection } from '../../types/resume';
import { exportResumeAsJSON, importResumeFromJSON } from '../../utils/storage';
import { PersonalForm } from './forms/PersonalForm';
import { SummaryForm } from './forms/SummaryForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { CustomSectionForm } from './forms/CustomSectionForm';

export const Editor: React.FC = () => {
  const {
    resumeData,
    customization,
    activeSection,
    setActiveSection,
    isCustomizerOpen,
    setIsCustomizerOpen,
    resetToDefault,
    clearAll,
    loadCustomData,
    setIsCoverLetterModalOpen,
    setIsATSModalOpen,
  } = useResumeStore();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const navTabs: { id: ActiveSection; label: string; icon: any }[] = [
    { id: 'personal', label: 'Personal Details', icon: User },
    { id: 'summary', label: 'Professional Summary', icon: FileText },
    { id: 'experience', label: 'Work Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills & Languages', icon: Wrench },
    { id: 'custom', label: 'Custom Sections', icon: FolderPlus },
  ];

  const handleLoadSample = () => {
    if (window.confirm('Load sample prefilled resume? Any unsaved edits will be replaced.')) {
      resetToDefault();
    }
  };

  const handleClear = () => {
    if (window.confirm('Clear all form fields? This will delete your current resume draft.')) {
      clearAll();
    }
  };

  const handleExportJSON = () => {
    exportResumeAsJSON(resumeData, customization);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    importResumeFromJSON(
      file,
      (imported) => {
        loadCustomData(imported);
        alert('Resume draft successfully restored!');
      },
      (error) => alert(error)
    );
  };

  const renderActiveForm = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalForm />;
      case 'summary':
        return <SummaryForm />;
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'skills':
        return <SkillsForm />;
      case 'custom':
        return <CustomSectionForm />;
      default:
        return <PersonalForm />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Top Utility Action Bar */}
      <div className="p-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
        {/* Left: Auto-Save Status */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="hidden sm:inline text-slate-600">Draft saved locally</span>
        </div>

        {/* Right: State Action Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImportFile}
            className="hidden"
          />

          <button
            onClick={handleLoadSample}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-700 text-xs font-semibold transition-colors"
            title="Populate complete dummy resume"
          >
            <RotateCcw className="w-3.5 h-3.5 text-brand-600" />
            <span className="hidden md:inline">Load Sample Data</span>
            <span className="md:hidden">Sample</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-700 text-xs font-semibold transition-colors"
            title="Download JSON data payload"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden lg:inline">Export Data JSON</span>
            <span className="lg:hidden">JSON</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-200 hover:bg-white text-slate-700 text-xs font-semibold transition-colors"
            title="Restore resume state from JSON"
          >
            <Upload className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden lg:inline">Import Data JSON</span>
            <span className="lg:hidden">Import</span>
          </button>

          <button
            onClick={() => setIsCoverLetterModalOpen(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-semibold transition-colors"
            title="Generate AI cover letter draft"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
            <span className="hidden xl:inline">Cover Letter</span>
          </button>

          <button
            onClick={() => setIsATSModalOpen(true)}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold transition-colors"
            title="Scan resume for ATS compatibility"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden xl:inline">ATS Score</span>
          </button>

          <button
            onClick={handleClear}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-semibold transition-colors"
            title="Clear all fields"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear Form</span>
          </button>
        </div>
      </div>

      {/* Main Split: Vertical Accordion Tabs on Left + Form View on Right */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Tabbed Sidebar Navigation */}
        <div className="w-full md:w-56 bg-slate-900 text-slate-300 p-2 sm:p-3 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto shrink-0 border-b md:border-b-0 md:border-r border-slate-800">
          <div className="hidden md:block text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5">
            Sections
          </div>

          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 md:w-full text-left ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}

          <div className="hidden md:block pt-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5">
            Design
          </div>

          {/* Layout & Styling Customizer Trigger */}
          <button
            onClick={() => setIsCustomizerOpen(!isCustomizerOpen)}
            className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 md:w-full text-left ${
              isCustomizerOpen
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-indigo-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Sliders className="w-4 h-4 text-indigo-400" />
            <span>Layout & Styling</span>
          </button>
        </div>

        {/* Active Form Scrollable Viewport */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-2xl mx-auto">
            {renderActiveForm()}
          </div>
        </div>
      </div>
    </div>
  );
};
