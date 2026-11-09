import React from 'react';
import { Mail, Phone, MapPin, Globe, Github, Linkedin } from 'lucide-react';
import { ResumeData, CustomizationSettings } from '../../../types/resume';

interface TemplateProps {
  data: ResumeData;
  settings: CustomizationSettings;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ data, settings }) => {
  const { personalDetails, workExperience, education, skills, customSections } = data;
  const { layout, typography, spacing, styling } = settings;

  // Custom typography styles dynamically mapped
  const fontClass =
    typography.fontFamily === 'Serif'
      ? 'font-serif'
      : typography.fontFamily === 'Mono'
      ? 'font-mono'
      : 'font-sans';

  const linkStyleClass =
    styling.linkStyle === 'underlined'
      ? 'underline'
      : styling.linkStyle === 'colored'
      ? ''
      : 'text-inherit no-underline';

  const photoBorderRadius =
    styling.photoShape === 'circle'
      ? 'rounded-full'
      : styling.photoShape === 'rounded'
      ? 'rounded-2xl'
      : 'rounded-none';

  // Section Header Component
  const SectionTitle: React.FC<{ title: string }> = ({ title }) => (
    <div className="mb-2.5 pb-1 border-b flex items-center justify-between" style={{ borderColor: styling.primaryColor + '33' }}>
      <h3
        className="font-bold tracking-tight uppercase"
        style={{
          fontSize: `${typography.headingFontSize}pt`,
          color: styling.primaryColor,
        }}
      >
        {title}
      </h3>
    </div>
  );

  // Experience entry renderer
  const renderExperience = () => (
    workExperience.length > 0 && (
      <div style={{ marginBottom: `${spacing.spaceBetweenSections}px` }}>
        <SectionTitle title="Experience" />
        <div className="space-y-4">
          {workExperience.map((exp) => (
            <div key={exp.id} className="page-break-avoid">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-bold text-slate-900">{exp.position}</span>
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
                  {exp.startDate} {exp.startDate && (exp.endDate || exp.current) ? '—' : ''} {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-2 text-xs text-slate-600 mb-1.5">
                <span className="font-semibold" style={{ color: styling.primaryColor }}>
                  {exp.company}
                </span>
                {exp.location && <span className="text-slate-400 italic">{exp.location}</span>}
              </div>
              {exp.highlights.length > 0 && (
                <ul className="list-disc list-outside ml-4 space-y-1 text-slate-700">
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
      </div>
    )
  );

  // Education entry renderer
  const renderEducation = () => (
    education.length > 0 && (
      <div style={{ marginBottom: `${spacing.spaceBetweenSections}px` }}>
        <SectionTitle title="Education" />
        <div className="space-y-3">
          {education.map((edu) => (
            <div key={edu.id} className="page-break-avoid">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-bold text-slate-900">{edu.degree} {edu.fieldOfStudy && `in ${edu.fieldOfStudy}`}</span>
                <span className="text-xs font-medium text-slate-500 whitespace-nowrap">
                  {edu.startDate} {edu.startDate && edu.endDate ? '—' : ''} {edu.endDate}
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-2 text-xs text-slate-600">
                <span className="font-medium" style={{ color: styling.primaryColor }}>{edu.institution}</span>
                {edu.location && <span className="text-slate-400">{edu.location}</span>}
              </div>
              {edu.gpa && (
                <div className="text-xs text-slate-500 mt-0.5">
                  <span className="font-medium">GPA:</span> {edu.gpa}
                </div>
              )}
              {edu.highlights.length > 0 && (
                <ul className="list-disc list-outside ml-4 mt-1 space-y-0.5 text-slate-700 text-xs">
                  {edu.highlights.map((h, i) =>
                    h.trim() ? <li key={i}>{h}</li> : null
                  )}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  );

  // Skills renderer
  const renderSkills = () => (
    skills.length > 0 && (
      <div style={{ marginBottom: `${spacing.spaceBetweenSections}px` }}>
        <SectionTitle title="Skills & Competencies" />
        <div className="flex flex-wrap gap-1.5">
          {skills.map((skill) => (
            <span
              key={skill.id}
              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-800 border border-slate-200"
            >
              {skill.name}
              {skill.level && (
                <span className="ml-1 text-[10px] text-slate-500 font-normal">
                  ({skill.level})
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    )
  );

  // Custom sections renderer
  const renderCustomSections = () => (
    customSections.map((sec) => (
      <div key={sec.id} style={{ marginBottom: `${spacing.spaceBetweenSections}px` }}>
        <SectionTitle title={sec.title || 'Custom Section'} />
        <div className="space-y-3">
          {sec.entries.map((entry) => (
            <div key={entry.id} className="page-break-avoid">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-bold text-slate-900">{entry.title}</span>
                {entry.date && (
                  <span className="text-xs font-medium text-slate-500 whitespace-nowrap">{entry.date}</span>
                )}
              </div>
              <div className="flex items-baseline justify-between gap-2 text-xs text-slate-600 mb-1">
                {entry.subtitle && (
                  <span className="font-medium" style={{ color: styling.primaryColor }}>
                    {entry.subtitle}
                  </span>
                )}
                {entry.location && <span className="text-slate-400 italic">{entry.location}</span>}
              </div>
              {entry.description && (
                <p className="text-slate-700 leading-relaxed text-xs">{entry.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    ))
  );

  return (
    <div
      className={`a4-page shadow-paper transition-all ${fontClass}`}
      style={{
        padding: `${spacing.pageMargins}mm`,
        fontSize: `${typography.baseFontSize}pt`,
        lineHeight: spacing.lineSpacing,
        color: styling.textColor,
        backgroundColor: styling.backgroundColor,
      }}
    >
      {/* Header Block */}
      <header
        className="pb-5 mb-5 border-b rounded-xl p-4"
        style={{
          borderColor: styling.primaryColor + '25',
          backgroundColor: styling.headerBgColor === 'transparent' ? 'transparent' : styling.headerBgColor,
        }}
      >
        <div className="flex items-start justify-between gap-6">
          {/* Text Details */}
          <div className="flex-1">
            <h1
              className="font-extrabold tracking-tight"
              style={{
                fontSize: `${typography.nameFontSize}pt`,
                color: styling.primaryColor,
              }}
            >
              {personalDetails.fullName || 'Your Name'}
            </h1>
            <p className="text-base font-semibold text-slate-700 mt-0.5">
              {personalDetails.jobTitle || 'Professional Title'}
            </p>

            {/* Contact meta strip */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 text-xs text-slate-600">
              {personalDetails.email && (
                <a
                  href={`mailto:${personalDetails.email}`}
                  className={`flex items-center gap-1 hover:text-slate-900 transition-colors ${linkStyleClass}`}
                  style={{ color: styling.linkStyle === 'colored' ? styling.primaryColor : undefined }}
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{personalDetails.email}</span>
                </a>
              )}
              {personalDetails.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{personalDetails.phone}</span>
                </span>
              )}
              {personalDetails.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{personalDetails.location}</span>
                </span>
              )}
              {personalDetails.website && (
                <a
                  href={personalDetails.website}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-1 hover:text-slate-900 transition-colors ${linkStyleClass}`}
                  style={{ color: styling.linkStyle === 'colored' ? styling.primaryColor : undefined }}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{personalDetails.website.replace(/^https?:\/\//, '')}</span>
                </a>
              )}
              {personalDetails.github && (
                <a
                  href={personalDetails.github}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-1 hover:text-slate-900 transition-colors ${linkStyleClass}`}
                  style={{ color: styling.linkStyle === 'colored' ? styling.primaryColor : undefined }}
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>{personalDetails.github.replace(/^https?:\/\/(www\.)?github\.com\//, '')}</span>
                </a>
              )}
              {personalDetails.linkedin && (
                <a
                  href={personalDetails.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className={`flex items-center gap-1 hover:text-slate-900 transition-colors ${linkStyleClass}`}
                  style={{ color: styling.linkStyle === 'colored' ? styling.primaryColor : undefined }}
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>

          {/* Profile Photo */}
          {styling.showPhoto && personalDetails.photoUrl && (
            <div className="shrink-0">
              <img
                src={personalDetails.photoUrl}
                alt={personalDetails.fullName}
                className={`object-cover shadow-sm ring-2 ring-white ${photoBorderRadius}`}
                style={{
                  width: `${styling.photoSize}px`,
                  height: `${styling.photoSize}px`,
                }}
              />
            </div>
          )}
        </div>

        {/* Summary */}
        {personalDetails.summary && (
          <div className="mt-4 pt-3 border-t border-slate-200/60 text-slate-600 leading-relaxed text-xs">
            {personalDetails.summary}
          </div>
        )}
      </header>

      {/* Main Body: 1 Column or 2 Columns */}
      {layout.columns === 1 ? (
        <div className="space-y-4">
          {renderExperience()}
          {renderEducation()}
          {renderSkills()}
          {renderCustomSections()}
        </div>
      ) : (
        <div className="flex gap-6">
          {/* Left Column */}
          <div style={{ width: `${layout.leftColumnWidthPercent}%` }} className="shrink-0 space-y-4">
            {renderSkills()}
            {renderEducation()}
          </div>

          {/* Right Column */}
          <div style={{ width: `${100 - layout.leftColumnWidthPercent}%` }} className="flex-1 space-y-4">
            {renderExperience()}
            {renderCustomSections()}
          </div>
        </div>
      )}
    </div>
  );
};
