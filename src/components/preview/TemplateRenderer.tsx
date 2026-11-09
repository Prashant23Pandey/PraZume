import React from 'react';
import { ResumeData, CustomizationSettings } from '../../types/resume';
import { ModernTemplate } from './templates/ModernTemplate';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { MinimalTemplate } from './templates/MinimalTemplate';

interface TemplateRendererProps {
  data: ResumeData;
  settings: CustomizationSettings;
}

export const TemplateRenderer: React.FC<TemplateRendererProps> = ({ data, settings }) => {
  const { templateId } = settings.layout;

  switch (templateId) {
    case 'classic':
      return <ClassicTemplate data={data} settings={settings} />;
    case 'minimal':
      return <MinimalTemplate data={data} settings={settings} />;
    case 'modern':
    default:
      return <ModernTemplate data={data} settings={settings} />;
  }
};

