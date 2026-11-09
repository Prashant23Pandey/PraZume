import React from 'react';
import { ResumeData, CustomizationSettings } from '../../../types/resume';

interface TemplateProps {
  data: ResumeData;
  settings: CustomizationSettings;
}

export const ClassicTemplate: React.FC<TemplateProps> = ({ data, settings }) => {
  const { personalDetails, workExperience, education, skills, customSections } = data;
  const { typography, spacing, styling } = settings;

  const fontClass =
    typography.fontFamily === 'Sans'
      ? 'font-sans'
      : typography.fontFamily === 'Mono'
      ? 'font-mono'
      : 'font-serif';

  const photoBorderRadius =
    styling.photoShape === 'circle'
      ? 'rounded-full'
      : styling.photoShape === 'rounded'
      ? 'rounded-xl'
      : 'rounded-none';

  const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
    <div className="mb-2 pb-1 border-b-2 border-slate-900 flex items-center justify-between">
      <h3
        className="font-bold tracking-wider uppercase"
        style={{
          fontSize: `${typography.headingFontSize}pt`,
          color: styling.primaryColor || '#0f172a',
        }}
      >
        {title}
      </h3>
    </div>
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
      {/* Executive Header */}
      <header className="text-center pb-4 mb-4 border-b border-slate-300">
        <div className="flex items-center justify-center gap-4">
          {styling.showPhoto && personalDetails.photoUrl && (
            <img
              src={personalDetails.photoUrl}
              alt={personalDetails.fullName}
              className={`object-cover shadow-sm ${photoBorderRadius}`}
              style={{
                width: `${styling.photoSize}px`,
                height: `${styling.photoSize}px`,
              }}
            />
          )}
          <div>
            <h1
              className="font-black tracking-tight uppercase"
              style={{
                fontSize: `${typography.nameFontSize}pt`,
                color: styling.primaryColor,
              }}
            >
              {personalDetails.fullName || 'YOUR NAME'}
            </h1>
            <p className="text-sm font-semibold tracking-wide text-slate-700 mt-0.5">
              {personalDetails.jobTitle || 'Executive Professional'}
            </p>
          </div>
        </div>

        {/* Contact info single centered line */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 mt-2 text-xs text-slate-600">
          {personalDetails.location && <span>{personalDetails.location}</span>}
          {personalDetails.phone && <span>• {personalDetails.phone}</span>}
          {personalDetails.email && <span>• {personalDetails.email}</span>}
          {personalDetails.website && <span>• {personalDetails.website.replace(/^https?:\/\//, '')}</span>}
          {personalDetails.linkedin && <span>• linkedin.com</span>}
          {personalDetails.github && <span>• github.com</span>}
        </div>

        {personalDetails.summary && (
          <p className="mt-3 text-xs text-slate-700 italic max-w-2xl mx-auto leading-relaxed">
            "{personalDetails.summary}"
          </p>
        )}
      </header>

      {/* Experience */}
      {workExperience.length > 0 && (
        <section style={{ marginBottom: `${spacing.spaceBetweenSections}px` }}>
          <SectionHeader title="Professional Experience" />
          <div className="space-y-3.5">
            {workExperience.map((exp) => (
              <div key={exp.id} className="page-break-avoid">
                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-slate-900">{exp.company}</span>
                  <span className="text-xs text-slate-500 font-medium">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex items-baseline justify-between text-xs text-slate-700 italic mb-1">
                  <span>{exp.position}</span>
                  <span>{exp.location}</span>
                </div>
                {exp.highlights.length > 0 && (
                  <ul className="list-disc list-outside ml-4 space-y-0.5 text-xs text-slate-700">
                    {exp.highlights.map((h, i) =>
                      h.trim() ? <li key={i}>{h}</li> : null
                    )}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section style={{ marginBottom: `${spacing.spaceBetweenSections}px` }}>
          <SectionHeader title="Education" />
          <div className="space-y-2.5">
            {education.map((edu) => (
              <div key={edu.id} className="page-break-avoid">
                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-slate-900">{edu.institution}</span>
                  <span className="text-xs text-slate-500">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
                <div className="flex items-baseline justify-between text-xs text-slate-700">
                  <span>
                    {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
                  </span>
                  <span>{edu.location}</span>
                </div>
                {edu.gpa && <div className="text-[11px] text-slate-500">GPA: {edu.gpa}</div>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ marginBottom: `${spacing.spaceBetweenSections}px` }}>
          <SectionHeader title="Technical & Core Competencies" />
          <p className="text-xs text-slate-700 leading-relaxed">
            {skills.map((s) => s.name).join(' • ')}
          </p>
        </section>
      )}

      {/* Custom Sections */}
      {customSections.map((sec) => (
        <section key={sec.id} style={{ marginBottom: `${spacing.spaceBetweenSections}px` }}>
          <SectionHeader title={sec.title || 'Additional Information'} />
          <div className="space-y-2">
            {sec.entries.map((ent) => (
              <div key={ent.id} className="page-break-avoid text-xs">
                <div className="flex items-baseline justify-between font-bold text-slate-900">
                  <span>{ent.title}</span>
                  <span className="text-slate-500 font-normal">{ent.date}</span>
                </div>
                {ent.subtitle && <div className="text-slate-600 italic">{ent.subtitle}</div>}
                {ent.description && <p className="mt-0.5 text-slate-700 leading-relaxed">{ent.description}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};
