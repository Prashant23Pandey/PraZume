import React from 'react';
import { ResumeData, CustomizationSettings } from '../../../types/resume';

interface TemplateProps {
  data: ResumeData;
  settings: CustomizationSettings;
}

export const MinimalTemplate: React.FC<TemplateProps> = ({ data, settings }) => {
  const { personalDetails, workExperience, education, skills, customSections } = data;
  const { typography, spacing, styling } = settings;

  const fontClass =
    typography.fontFamily === 'Serif'
      ? 'font-serif'
      : typography.fontFamily === 'Mono'
      ? 'font-mono'
      : 'font-sans';

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
      {/* Header */}
      <header className="mb-6">
        <h1
          className="font-light tracking-tight text-slate-900"
          style={{
            fontSize: `${typography.nameFontSize}pt`,
          }}
        >
          <span className="font-extrabold" style={{ color: styling.primaryColor }}>
            {personalDetails.fullName?.split(' ')[0] || 'Alex'}
          </span>{' '}
          {personalDetails.fullName?.split(' ').slice(1).join(' ') || 'Vance'}
        </h1>
        <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mt-1">
          {personalDetails.jobTitle || 'Product Designer & Engineer'}
        </p>

        {/* Minimal metadata line */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-slate-500">
          {personalDetails.email && <span>{personalDetails.email}</span>}
          {personalDetails.phone && <span>/ {personalDetails.phone}</span>}
          {personalDetails.location && <span>/ {personalDetails.location}</span>}
          {personalDetails.website && <span>/ {personalDetails.website.replace(/^https?:\/\//, '')}</span>}
        </div>

        {personalDetails.summary && (
          <p className="mt-3 text-xs text-slate-600 leading-relaxed max-w-2xl">
            {personalDetails.summary}
          </p>
        )}
      </header>

      {/* Experience */}
      {workExperience.length > 0 && (
        <section style={{ marginBottom: `${spacing.spaceBetweenSections}px` }}>
          <h2
            className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3"
            style={{ color: styling.primaryColor }}
          >
            Experience
          </h2>
          <div className="space-y-4">
            {workExperience.map((exp) => (
              <div key={exp.id} className="page-break-avoid">
                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-slate-900 text-xs">{exp.position}</span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-medium mb-1.5">
                  {exp.company} {exp.location && `· ${exp.location}`}
                </div>
                {exp.highlights.length > 0 && (
                  <ul className="space-y-1 text-xs text-slate-600">
                    {exp.highlights.map((h, i) =>
                      h.trim() ? (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-slate-300 select-none">—</span>
                          <span className="flex-1 leading-relaxed">{h}</span>
                        </li>
                      ) : null
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
          <h2
            className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2"
            style={{ color: styling.primaryColor }}
          >
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="page-break-avoid flex items-baseline justify-between text-xs">
                <div>
                  <span className="font-bold text-slate-900">
                    {edu.degree} {edu.fieldOfStudy ? `in ${edu.fieldOfStudy}` : ''}
                  </span>
                  <span className="text-slate-500">, {edu.institution}</span>
                </div>
                <span className="text-slate-400 font-mono text-[11px]">{edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section style={{ marginBottom: `${spacing.spaceBetweenSections}px` }}>
          <h2
            className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2"
            style={{ color: styling.primaryColor }}
          >
            Skills
          </h2>
          <div className="flex flex-wrap gap-2 text-xs text-slate-600">
            {skills.map((skill) => (
              <span key={skill.id} className="bg-slate-100/80 px-2 py-0.5 rounded text-[11px]">
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Custom Sections */}
      {customSections.map((sec) => (
        <section key={sec.id} style={{ marginBottom: `${spacing.spaceBetweenSections}px` }}>
          <h2
            className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2"
            style={{ color: styling.primaryColor }}
          >
            {sec.title}
          </h2>
          <div className="space-y-2 text-xs">
            {sec.entries.map((ent) => (
              <div key={ent.id} className="page-break-avoid">
                <div className="flex items-baseline justify-between">
                  <span className="font-bold text-slate-900">{ent.title}</span>
                  <span className="text-slate-400 font-mono text-[11px]">{ent.date}</span>
                </div>
                {ent.subtitle && <div className="text-slate-500">{ent.subtitle}</div>}
                {ent.description && <p className="text-slate-600 mt-0.5">{ent.description}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

