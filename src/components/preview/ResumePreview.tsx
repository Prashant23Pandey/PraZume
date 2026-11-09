import React, { useState } from 'react';
import { 
  Printer, 
  ZoomIn, 
  ZoomOut, 
  Copy, 
  Check 
} from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';
import { ResumeCanvas } from './ResumeCanvas';

export const ResumePreview: React.FC = () => {
  const {
    resumeData,
    zoomLevel,
    setZoomLevel,
  } = useResumeStore();

  const [copiedPlainText, setCopiedPlainText] = useState(false);

  // Calibrate base scale: 100% zoom maps to the comfortable 0.8 aspect ratio that fits the preview screen perfectly
  const scaleFactor = (zoomLevel / 100) * 0.8;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 10, 150));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 10, 50));
  const handleResetZoom = () => setZoomLevel(100);

  const handleCopyPlainText = () => {
    const { personalDetails, workExperience, education, skills } = resumeData;
    const plainText = `${(personalDetails.fullName || 'RESUME').toUpperCase()}
${personalDetails.jobTitle || ''}
${[personalDetails.email, personalDetails.phone, personalDetails.location].filter(Boolean).join(' | ')}
${personalDetails.linkedin ? `LinkedIn: ${personalDetails.linkedin}` : ''}
${personalDetails.github ? `GitHub: ${personalDetails.github}` : ''}

${personalDetails.summary ? `PROFESSIONAL SUMMARY\n${personalDetails.summary}\n\n` : ''}${
  workExperience.length > 0
    ? `WORK EXPERIENCE\n${workExperience
        .map(
          (exp) => `${exp.position || 'Role'} — ${exp.company || 'Company'} (${exp.startDate || ''} - ${exp.current ? 'Present' : exp.endDate || ''})
${exp.location || ''}
${exp.highlights.map((h) => `• ${h}`).join('\n')}`
        )
        .join('\n\n')}\n\n`
    : ''
}${
  education.length > 0
    ? `EDUCATION\n${education
        .map(
          (edu) => `${edu.degree || 'Degree'}${edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''} — ${edu.institution || 'School'} (${edu.startDate || ''} - ${edu.endDate || ''})
${edu.gpa ? `GPA: ${edu.gpa}` : ''}
${edu.highlights.map((h) => `• ${h}`).join('\n')}`
        )
        .join('\n\n')}\n\n`
    : ''
}${skills.length > 0 ? `SKILLS\n${skills.map((s) => s.name).join(', ')}` : ''}`.trim();

    navigator.clipboard.writeText(plainText);
    setCopiedPlainText(true);
    setTimeout(() => setCopiedPlainText(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-transparent overflow-hidden">
      {/* Floating Canvas Utility Bar */}
      <div className="px-2 py-2 flex items-center justify-between gap-2 shrink-0 z-20">
        {/* Left: Zoom Controls */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl shadow-xs border border-slate-200/80">
          <button
            onClick={handleZoomOut}
            className="p-1 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleResetZoom}
            className="text-xs font-mono font-bold px-2 py-0.5 text-slate-700 hover:bg-slate-100 rounded transition-colors"
            title="Reset Zoom to 100%"
          >
            {zoomLevel}%
          </button>
          <button
            onClick={handleZoomIn}
            className="p-1 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Copy Plaintext ATS Helper */}
          <button
            onClick={handleCopyPlainText}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-colors"
            title="Copy formatted plain text for ATS application forms"
          >
            {copiedPlainText ? (
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-slate-500" />
            )}
            <span className="hidden sm:inline">
              {copiedPlainText ? 'Copied ATS Text!' : 'Copy Plaintext'}
            </span>
          </button>

          {/* Native Print */}
          <button
            onClick={() => window.print()}
            className="p-2 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 shadow-xs transition-colors"
            title="Print or Save via Browser"
          >
            <Printer className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Live A4 Canvas Scaled Viewport with generous bottom space */}
      <div className="preview-wrapper flex-1 overflow-auto p-2 sm:p-4 pb-28 flex items-start justify-center">
        <div
          id="resume-canvas-scaler"
          className="transition-transform duration-150 origin-top shadow-2xl rounded-sm pb-16"
          style={{
            transform: `scale(${scaleFactor})`,
            marginBottom: `${Math.max((scaleFactor - 1) * 1122 + 80, 60)}px`,
          }}
        >
          <ResumeCanvas />
        </div>
      </div>
    </div>
  );
};
