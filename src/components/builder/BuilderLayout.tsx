import React, { useState } from 'react';
import { useResumeStore } from '../../context/ResumeContext';
import { SidebarNav } from './SidebarNav';
import { PersonalForm } from './PersonalForm';
import { ExperienceForm } from './ExperienceForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { CustomSectionForm } from './CustomSectionForm';
import { ResumePreview } from '../preview/ResumePreview';
import { CustomizerDrawer } from '../customizer/CustomizerDrawer';
import { Eye, Edit3, Sliders } from 'lucide-react';

export const BuilderLayout: React.FC = () => {
  const { activeSection, isCustomizerOpen, setIsCustomizerOpen } = useResumeStore();
  const [mobileTab, setMobileTab] = useState<'editor' | 'preview'>('editor');

  const renderActiveForm = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalForm />;
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
    <div className="builder-container flex h-screen w-screen overflow-hidden bg-slate-100 font-sans">
      {/* Desktop Navigation Sidebar */}
      <div className="hidden md:block h-full">
        <SidebarNav />
      </div>

      {/* Main Split-Pane Workspace */}
      <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden relative">
        {/* Mobile View Toggle Bar */}
        <div className="md:hidden bg-slate-900 text-white p-2 flex items-center justify-between border-b border-slate-800">
          <div className="flex rounded-lg bg-slate-800 p-0.5">
            <button
              onClick={() => setMobileTab('editor')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold ${
                mobileTab === 'editor' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editor</span>
            </button>
            <button
              onClick={() => setMobileTab('preview')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold ${
                mobileTab === 'preview' ? 'bg-brand-600 text-white shadow-sm' : 'text-slate-400'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
          </div>

          <button
            onClick={() => setIsCustomizerOpen(!isCustomizerOpen)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
            title="Open Customizer"
          >
            <Sliders className="w-4 h-4" />
          </button>
        </div>

        {/* Left / Active Form Column */}
        <div
          className={`w-full md:w-[480px] lg:w-[540px] xl:w-[580px] h-full flex flex-col bg-white border-r border-slate-200 overflow-y-auto ${
            mobileTab === 'preview' ? 'hidden md:flex' : 'flex'
          }`}
        >
          <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto w-full">
            {renderActiveForm()}
          </div>
        </div>

        {/* Right / Live Preview Column */}
        <div
          className={`flex-1 h-full overflow-hidden ${
            mobileTab === 'editor' ? 'hidden md:flex' : 'flex'
          }`}
        >
          <ResumePreview />
        </div>

        {/* Design Customizer Flyout Drawer */}
        <CustomizerDrawer />
      </div>
    </div>
  );
};

