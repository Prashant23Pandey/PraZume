import React from 'react';
import { useResumeStore } from '../../context/ResumeContext';
import { TemplateRenderer } from './TemplateRenderer';
import { CanvasToolbar } from './CanvasToolbar';

export const ResumePreview: React.FC = () => {
  const { resumeData, customization, zoomLevel } = useResumeStore();

  const scaleFactor = zoomLevel / 100;

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-200/70 overflow-hidden">
      {/* Top Toolbar */}
      <CanvasToolbar />

      {/* Scrollable Canvas Viewport */}
      <div className="preview-wrapper flex-1 overflow-auto p-4 sm:p-8 flex items-start justify-center">
        <div
          className="transition-transform duration-150 origin-top shadow-paper-lg"
          style={{
            transform: `scale(${scaleFactor})`,
            marginBottom: `${(scaleFactor - 1) * 300}px`,
          }}
        >
          {/* Document ID targeted by html2canvas & print media query */}
          <div id="resume-preview-document">
            <TemplateRenderer data={resumeData} settings={customization} />
          </div>
        </div>
      </div>
    </div>
  );
};

