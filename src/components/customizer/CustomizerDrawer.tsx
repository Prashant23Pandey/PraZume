import React from 'react';
import { X, Sliders, RotateCcw } from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';
import { Controls } from './Controls';
import { defaultCustomization } from '../../utils/defaultData';

export const CustomizerDrawer: React.FC = () => {
  const { isCustomizerOpen, setIsCustomizerOpen, setEntireCustomization } = useResumeStore();

  if (!isCustomizerOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-white shadow-2xl border-l border-slate-200 flex flex-col animate-in slide-in-from-right duration-200">
      {/* Drawer Header */}
      <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-700">
            <Sliders className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Design Customizer</h3>
            <p className="text-[10px] text-slate-500">Live Granular Formatting</p>
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
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
            title="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Drawer Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-5">
        <Controls />
      </div>

      {/* Drawer Footer */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-500">Updates canvas in real-time</span>
        <button
          onClick={() => setIsCustomizerOpen(false)}
          className="px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};
