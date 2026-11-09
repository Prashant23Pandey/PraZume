import React, { useState } from 'react';
import { X, Sliders, Palette, Type, Space, Camera, RotateCcw, Columns } from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';
import { LayoutControls } from './LayoutControls';
import { ColorControls } from './ColorControls';
import { TypographyControls } from './TypographyControls';
import { SpacingControls } from './SpacingControls';
import { PhotoControls } from './PhotoControls';
import { defaultCustomization } from '../../utils/defaultData';

type CustomizerTab = 'layout' | 'colors' | 'typography' | 'spacing' | 'photo';

export const CustomizerDrawer: React.FC = () => {
  const { isCustomizerOpen, setIsCustomizerOpen, setEntireCustomization } = useResumeStore();
  const [activeTab, setActiveTab] = useState<CustomizerTab>('layout');

  if (!isCustomizerOpen) return null;

  const tabs: { id: CustomizerTab; label: string; icon: any }[] = [
    { id: 'layout', label: 'Layout', icon: Columns },
    { id: 'colors', label: 'Colors', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Type },
    { id: 'spacing', label: 'Spacing', icon: Space },
    { id: 'photo', label: 'Photo', icon: Camera },
  ];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-brand-100 text-brand-600">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">Design Customizer</h3>
            <p className="text-[10px] text-slate-500">Live FlowCV-Style Adjustments</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setEntireCustomization(defaultCustomization)}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors"
            title="Reset to default design"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsCustomizerOpen(false)}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 rounded-lg transition-colors"
            title="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 bg-slate-50/50 px-2 pt-2 gap-1 overflow-x-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-t-lg transition-all shrink-0 border-b-2 ${
                isActive
                  ? 'border-brand-600 text-brand-700 bg-white shadow-sm'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100/60'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Body */}
      <div className="flex-1 overflow-y-auto p-5">
        {activeTab === 'layout' && <LayoutControls />}
        {activeTab === 'colors' && <ColorControls />}
        {activeTab === 'typography' && <TypographyControls />}
        {activeTab === 'spacing' && <SpacingControls />}
        {activeTab === 'photo' && <PhotoControls />}
      </div>

      {/* Drawer Footer */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-500">Live preview syncs in real-time</span>
        <button
          onClick={() => setIsCustomizerOpen(false)}
          className="px-3.5 py-1.5 rounded-lg bg-brand-600 hover:bg-brand-700 text-white font-semibold transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};

