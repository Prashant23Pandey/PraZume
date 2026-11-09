import React from 'react';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, FileText } from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';

export const ResumeCanvas: React.FC = () => {
  const { resumeData, customization } = useResumeStore();
  const { personalDetails, workExperience, education, skills, customSections } = resumeData;
  const { layout, typography, spacing, styling } = customization;

  // Font family mapping
  const getFontFamilyCSS = () => {
    switch (typography.fontFamily) {
      case 'PT Serif':
        return "'PT Serif', Georgia, serif";
      case 'Lora':
        return "'Lora', Georgia, serif";
      case 'EB Garamond':
        return "'EB Garamond', Garamond, Georgia, serif";
      case 'Crimson Pro':
        return "'Crimson Pro', Georgia, serif";
      case 'Cormorant Garamond':
        return "'Cormorant Garamond', Garamond, Georgia, serif";
      case 'Zilla Slab':
        return "'Zilla Slab', Georgia, serif";
      case 'Literata':
        return "'Literata', Georgia, serif";
      case 'Source Serif Pro':
        return "'Source Serif 4', Georgia, serif";
      case 'Playfair Display':
      case 'Serif':
      case 'Merriweather':
        return "'Playfair Display', Georgia, serif";
      case 'Source Code Pro':
      case 'Mono':
        return "'Source Code Pro', monospace";
      case 'Roboto':
        return "'Roboto', sans-serif";
      case 'Inter':
      case 'Sans':
      case 'Plus Jakarta Sans':
      default:
        return "'Plus Jakarta Sans', 'Inter', sans-serif";
    }
  };

  const photoBorderRadius =
    styling.photoShape === 'circle'
      ? '9999px'
      : styling.photoShape === 'rounded'
      ? '16px'
      : '0px';

  // Section Heading Component (FlowCV Banner Style as in Reference Photo 1)
  const SectionHeader: React.FC<{ title: string; icon?: React.ReactNode }> = ({ title, icon }) => (
    <div
      className="section-header-block page-break-avoid py-1 px-3 mb-2.5 rounded bg-[#e2e8f0] text-slate-900 flex items-center justify-center border border-slate-300/40"
    >
      {icon && <span className="mr-2 text-slate-800 text-xs shrink-0">{icon}</span>}
      <h2
        className="font-bold tracking-wider uppercase font-serif"
        style={{
          fontSize: `${typography.headingFontSize}pt`,
          color: '#0f172a',
        }}
      >
        {title}
      </h2>
    </div>
  );

  // Professional Summary Component
  const renderSummary = () =>
    personalDetails.summary ? (
      <section style={{ marginBottom: `${spacing.spaceBetweenSections}px` }} className="resume-section-block page-break-avoid">
        <SectionHeader title="Summary" icon="📇" />
        <p className="leading-relaxed text-slate-700 text-xs sm:text-[13px]">{personalDetails.summary}</p>
      </section>
    ) : null;

  // Experience Entries
  const renderExperience = () =>
    workExperience.length > 0 ? (
      <section style={{ marginBottom: `${spacing.spaceBetweenSections}px` }} className="resume-section-block">
        <SectionHeader title="Work Experience" icon="💼" />
        <div className="space-y-3.5">
          {workExperience.map((exp) => (
            <div key={exp.id} className="resume-entry-block page-break-avoid">
              <div className="flex items-baseline justify-between mb-0.5">
                <span className="font-bold text-slate-900 pr-3">{exp.position}</span>
                <span className="text-xs font-mono text-slate-500 whitespace-nowrap shrink-0 ml-auto">
                  {exp.startDate} {exp.startDate && (exp.endDate || exp.current) ? '—' : ''}{' '}
                  {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div className="flex items-baseline justify-between text-xs text-slate-600 mb-1">
                <span className="font-semibold italic pr-3" style={{ color: styling.primaryColor || '#0f172a' }}>
                  {exp.company}
                </span>
                {exp.location && <span className="text-slate-400 italic shrink-0 ml-auto">{exp.location}</span>}
              </div>
              {exp.highlights.length > 0 && (
                <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700 text-xs">
                  {exp.highlights.map((bullet, i) =>
                    bullet.trim() ? (
                      <li key={i} className="pl-0.5 leading-relaxed">
                        {bullet}
                      </li>
                    ) : null
                  )}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    ) : null;

  // Education Entries
  const renderEducation = () =>
    education.length > 0 ? (
      <section style={{ marginBottom: `${spacing.spaceBetweenSections}px` }} className="resume-section-block">
        <SectionHeader title="Educational History" icon="🎓" />
        <div className="space-y-3">
          {education.map((edu) => (
            <div key={edu.id} className="resume-entry-block page-break-avoid">
              <div className="flex items-baseline justify-between mb-0.5">
                <span className="font-bold text-slate-900 pr-3">
                  {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
                </span>
                <span className="text-xs font-mono text-slate-500 whitespace-nowrap shrink-0 ml-auto">
                  {edu.startDate} {edu.startDate && edu.endDate ? '—' : ''} {edu.endDate}
                </span>
              </div>
              <div className="flex items-baseline justify-between text-xs text-slate-600">
                <span className="font-semibold pr-3" style={{ color: styling.primaryColor }}>
                  {edu.institution}
                </span>
                {edu.location && <span className="text-slate-400 shrink-0 ml-auto">{edu.location}</span>}
              </div>
              {edu.gpa && (
                <div className="text-[11px] text-slate-500 mt-0.5">
                  <span className="font-semibold">GPA/Honors:</span> {edu.gpa}
                </div>
              )}
              {edu.highlights.length > 0 && (
                <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-xs text-slate-700">
                  {edu.highlights.map((h, i) => (h.trim() ? <li key={i}>{h}</li> : null))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>
    ) : null;

  // Skills & Languages
  const renderSkills = () =>
    skills.length > 0 ? (
      <section style={{ marginBottom: `${spacing.spaceBetweenSections}px` }} className="resume-section-block page-break-avoid">
        <SectionHeader title="Relevant Skills" icon="🧠" />
        <div className="flex flex-wrap">
          {skills.map((skill) => (
            <span
              key={skill.id}
              className="mr-1.5 mb-1.5 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
            >
              {skill.name}
              {skill.level && (
                <span className="ml-1 text-[10px] text-slate-500">({skill.level})</span>
              )}
            </span>
          ))}
        </div>
      </section>
    ) : null;

  // Custom Sections
  const renderCustomSections = () =>
    customSections.map((sec) => (
      <section key={sec.id} style={{ marginBottom: `${spacing.spaceBetweenSections}px` }} className="resume-section-block">
        <SectionHeader title={sec.title || 'Custom Section'} icon="📂" />
        <div className="space-y-3">
          {sec.entries.map((ent) => (
            <div key={ent.id} className="resume-entry-block page-break-avoid text-xs">
              <div className="flex items-baseline justify-between mb-0.5">
                <span className="font-bold text-slate-900 pr-3">{ent.title}</span>
                {ent.date && <span className="font-mono text-slate-500 text-[11px] shrink-0 ml-auto">{ent.date}</span>}
              </div>
              <div className="flex items-baseline justify-between text-slate-600 mb-0.5">
                {ent.subtitle && (
                  <span className="font-medium pr-3" style={{ color: styling.primaryColor }}>
                    {ent.subtitle}
                  </span>
                )}
                {ent.location && <span className="text-slate-400 italic shrink-0 ml-auto">{ent.location}</span>}
              </div>
              {ent.description && (
                <p className="text-slate-700 leading-relaxed">{ent.description}</p>
              )}
            </div>
          ))}
        </div>
      </section>
    ));

  const isDarkHeader = styling.headerBgColor && styling.headerBgColor !== 'transparent' && styling.headerBgColor !== '#ffffff';

  // Contact Meta Strip
  const renderContactInfo = () => {
    const hasAnyContact = Boolean(
      personalDetails.email ||
      personalDetails.phone ||
      personalDetails.location ||
      personalDetails.linkedin ||
      personalDetails.website ||
      personalDetails.github
    );

    if (!hasAnyContact) return null;

    return (
      <div
        className={`mt-2.5 text-xs ${
          isDarkHeader ? 'text-slate-200' : 'text-slate-600'
        } ${
          layout.headerAlignment === 'top-center' ? 'text-center' : 'text-left'
        }`}
      >
        <div className={`flex flex-wrap items-center ${layout.headerAlignment === 'top-center' ? 'justify-center' : 'justify-start'}`}>
          {personalDetails.email && (
            <span className="inline-flex items-center mr-4 mb-1.5">
              {styling.showIcons && <Mail className={`w-3.5 h-3.5 mr-1.5 shrink-0 ${isDarkHeader ? 'text-slate-300' : 'text-slate-400'}`} />}
              <span>{personalDetails.email}</span>
            </span>
          )}
          {personalDetails.phone && (
            <span className="inline-flex items-center mr-4 mb-1.5">
              {styling.showIcons && <Phone className={`w-3.5 h-3.5 mr-1.5 shrink-0 ${isDarkHeader ? 'text-slate-300' : 'text-slate-400'}`} />}
              <span>{personalDetails.phone}</span>
            </span>
          )}
          {personalDetails.location && (
            <span className="inline-flex items-center mr-4 mb-1.5">
              {styling.showIcons && <MapPin className={`w-3.5 h-3.5 mr-1.5 shrink-0 ${isDarkHeader ? 'text-slate-300' : 'text-slate-400'}`} />}
              <span>{personalDetails.location}</span>
            </span>
          )}
          {personalDetails.linkedin && (
            <span className="inline-flex items-center mr-4 mb-1.5">
              {styling.showIcons && <Linkedin className={`w-3.5 h-3.5 mr-1.5 shrink-0 ${isDarkHeader ? 'text-slate-300' : 'text-slate-400'}`} />}
              <span>{personalDetails.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
            </span>
          )}
          {personalDetails.website && (
            <span className="inline-flex items-center mr-4 mb-1.5">
              {styling.showIcons && <Globe className={`w-3.5 h-3.5 mr-1.5 shrink-0 ${isDarkHeader ? 'text-slate-300' : 'text-slate-400'}`} />}
              <span>{personalDetails.website.replace(/^https?:\/\//, '')}</span>
            </span>
          )}
          {personalDetails.github && (
            <span className="inline-flex items-center mr-4 mb-1.5">
              {styling.showIcons && <Github className={`w-3.5 h-3.5 mr-1.5 shrink-0 ${isDarkHeader ? 'text-slate-300' : 'text-slate-400'}`} />}
              <span>{personalDetails.github.replace(/^https?:\/\/(www\.)?github\.com\//, 'github.com/')}</span>
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Target DOM Element for PDF generation & print */}
      <div
        id="resume-preview-canvas"
        className="a4-page shadow-paper transition-all relative overflow-hidden"
        style={{
          fontFamily: getFontFamilyCSS(),
          fontSize: `${typography.baseFontSize}pt`,
          lineHeight: spacing.lineSpacing,
          color: styling.textColor,
          backgroundColor: styling.backgroundColor,
          padding: `${spacing.pageMargins}mm`,
          paddingBottom: `${Math.max(spacing.pageMargins, 14) + 8}mm`,
        }}
      >
        {/* Semantic Header (Full-width Dark Banner like Reference Photo 1) */}
        <header
          className={`pb-4 mb-4 border-b ${
            layout.headerAlignment === 'top-center' ? 'text-center' : 'text-left'
          }`}
          style={
            isDarkHeader
              ? {
                  backgroundColor: styling.headerBgColor,
                  color: '#ffffff',
                  margin: `-${spacing.pageMargins}mm -${spacing.pageMargins}mm 16px -${spacing.pageMargins}mm`,
                  padding: `${spacing.pageMargins}mm`,
                  borderColor: 'transparent',
                }
              : { borderColor: `${styling.primaryColor}20` }
          }
        >
          <div
            className={`flex items-center gap-4 ${
              layout.headerAlignment === 'top-center'
                ? 'flex-col justify-center'
                : 'justify-between'
            }`}
          >
            {/* Header Text */}
            <div className="flex-1">
              <h1
                className="font-black tracking-normal"
                style={{
                  fontSize: `${typography.nameFontSize}pt`,
                  color: isDarkHeader ? '#ffffff' : styling.primaryColor,
                  lineHeight: 1.15,
                  marginBottom: '4px',
                }}
              >
                {personalDetails.fullName || (
                  <span className={isDarkHeader ? 'text-white/40 font-sans tracking-normal text-lg font-semibold' : 'text-slate-300 font-sans tracking-normal text-lg font-semibold'}>
                    Your Full Name
                  </span>
                )}
              </h1>
              {personalDetails.jobTitle ? (
                <p 
                  className={`text-sm mt-0.5 ${
                    isDarkHeader ? 'text-slate-200 italic font-serif' : 'font-semibold text-slate-700'
                  }`}
                >
                  {personalDetails.jobTitle}
                </p>
              ) : (
                <p 
                  className={`text-xs mt-0.5 ${
                    isDarkHeader ? 'text-white/40 italic font-serif' : 'text-slate-400 italic'
                  }`}
                >
                  Professional Title / Specialization
                </p>
              )}
              {renderContactInfo()}
            </div>

            {/* Profile Photo - Only render if user has uploaded a photo */}
            {styling.showPhoto && personalDetails.photoUrl && (
              <div className="shrink-0">
                <img
                  src={personalDetails.photoUrl}
                  alt={personalDetails.fullName || 'Profile Photo'}
                  className={`object-cover shadow-sm ${
                    isDarkHeader
                      ? 'border-2 border-white ring-4 ring-white/10'
                      : 'ring-2 ring-white border border-slate-200'
                  }`}
                  style={{
                    width: `${styling.photoSize || 86}px`,
                    height: `${styling.photoSize || 86}px`,
                    borderRadius: photoBorderRadius,
                  }}
                />
              </div>
            )}
          </div>
        </header>

        {/* Content Layout Dispatcher */}
        {layout.columnLayout === 'single' ? (
          /* Single Column Layout */
          <div className="space-y-2">
            {renderSummary()}
            {renderExperience()}
            {renderEducation()}
            {renderSkills()}
            {renderCustomSections()}
          </div>
        ) : layout.columnLayout === 'right-sidebar' ? (
          /* Two Column with Right Sidebar */
          <div className="flex">
            <div style={{ width: `${100 - layout.leftColumnWidthPercent}%`, paddingRight: '20px' }} className="flex-1 space-y-2">
              {renderSummary()}
              {renderExperience()}
              {renderCustomSections()}
            </div>
            <aside
              style={{
                width: `${layout.leftColumnWidthPercent}%`,
                backgroundColor: styling.sidebarBgColor || 'transparent',
              }}
              className="shrink-0 space-y-2 p-2.5 rounded-xl"
            >
              {renderSkills()}
              {renderEducation()}
            </aside>
          </div>
        ) : (
          /* Two Column with Left Sidebar (Default) */
          <div className="flex">
            <aside
              style={{
                width: `${layout.leftColumnWidthPercent}%`,
                backgroundColor: styling.sidebarBgColor || 'transparent',
                paddingRight: '20px',
              }}
              className="shrink-0 space-y-2 p-2.5 rounded-xl"
            >
              {renderSkills()}
              {renderEducation()}
            </aside>
            <div style={{ width: `${100 - layout.leftColumnWidthPercent}%` }} className="flex-1 space-y-2">
              {renderSummary()}
              {renderExperience()}
              {renderCustomSections()}
            </div>
          </div>
        )}

        {/* Empty Canvas Guidance when everything is empty */}
        {!personalDetails.summary && workExperience.length === 0 && education.length === 0 && skills.length === 0 && customSections.length === 0 && (
          <div className="py-20 text-center text-slate-400">
            <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3 border border-slate-200">
              <FileText className="w-6 h-6 text-slate-400" />
            </div>
            <h3 className="font-sans font-bold text-slate-700 text-sm">Resume Canvas Ready</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 leading-relaxed">
              Use the cards on the left to add your personal details, education, skills, and work experience. Each item updates here instantly.
            </p>
          </div>
        )}
      </div>

      {/* Page Break Visualizer Guide (Shows exact A4 297mm height boundary) */}
      <div
        className="page-boundary-guide absolute left-0 right-0 pointer-events-none z-20 flex items-center justify-between px-4 border-b-2 border-dashed border-rose-400/80 text-[10px] font-mono text-rose-500 font-bold uppercase tracking-wider"
        style={{ top: '297mm' }}
      >
        <span className="bg-white/90 px-2 py-0.5 rounded shadow-xs">
          ✂ Page 1 Boundary (297mm)
        </span>
        <span className="bg-white/90 px-2 py-0.5 rounded shadow-xs">
          Content below will print on Page 2
        </span>
      </div>
    </div>
  );
};
