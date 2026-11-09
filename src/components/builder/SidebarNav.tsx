import React from 'react';
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Wrench, 
  FolderPlus, 
  Sliders, 
  RotateCcw, 
  Trash2, 
  Home, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';
import { ActiveSection } from '../../types/resume';

export const SidebarNav: React.FC = () => {
  const {
    activeSection,
    setActiveSection,
    setActiveView,
    isCustomizerOpen,
    setIsCustomizerOpen,
    resetToDefault,
    clearAll,
    setIsCreatorModalOpen,
  } = useResumeStore();

  const navItems: { id: ActiveSection; label: string; icon: any; count?: number }[] = [
    { id: 'personal', label: 'Personal Details', icon: User },
    { id: 'experience', label: 'Work Experience', icon: Briefcase },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'skills', label: 'Skills', icon: Wrench },
    { id: 'custom', label: 'Custom Sections', icon: FolderPlus },
  ];

  const handleReset = () => {
    if (window.confirm('Reset resume to FlowCV-inspired default template data?')) {
      resetToDefault();
    }
  };

  const handleClear = () => {
    if (window.confirm('Clear all resume entries? This will delete your current draft.')) {
      clearAll();
    }
  };

  return (
    <aside className="builder-sidebar w-64 bg-slate-900 text-slate-300 flex flex-col h-full border-r border-slate-800 shrink-0">
      {/* Brand Header (Logo removed) */}
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <button
          onClick={() => setActiveView('landing')}
          className="group text-left"
          title="Return to Home"
        >
          <div>
            <h1 className="text-lg font-black text-white tracking-tight leading-none group-hover:text-brand-400 transition-colors">
              PraZume
            </h1>
            <span className="text-[10px] text-slate-400 font-medium">Local Studio</span>
          </div>
        </button>

        <button
          onClick={() => setActiveView('landing')}
          className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          title="Back to Landing Page"
        >
          <Home className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
          Content Sections
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                isActive
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}`} />
                <span>{item.label}</span>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isActive ? 'text-white translate-x-0.5' : 'text-slate-600'}`} />
            </button>
          );
        })}

        <div className="pt-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-2">
          Design & Layout
        </div>

        <button
          onClick={() => setIsCustomizerOpen(!isCustomizerOpen)}
          className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
            isCustomizerOpen
              ? 'bg-indigo-600 text-white'
              : 'text-indigo-400 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <div className="flex items-center gap-3">
            <Sliders className="w-4 h-4" />
            <span>Customize Design</span>
          </div>
          <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/30 text-indigo-200">
            FlowCV
          </span>
        </button>
      </div>

      {/* Creator Spotlight & Utilities */}
      <div className="p-3 border-t border-slate-800 space-y-2">
        <button
          onClick={() => setIsCreatorModalOpen(true)}
          className="w-full flex items-center gap-2 p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white text-xs font-medium border border-slate-700/60 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-400" />
          <span className="truncate">Built by Prashant Pandey</span>
        </button>

        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium transition-colors"
            title="Reset to prefilled FlowCV sample resume"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
          <button
            onClick={handleClear}
            className="flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg bg-slate-800 hover:bg-rose-950/60 text-slate-300 hover:text-rose-400 text-[11px] font-medium transition-colors"
            title="Clear all fields"
          >
            <Trash2 className="w-3 h-3" />
            <span>Clear</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

