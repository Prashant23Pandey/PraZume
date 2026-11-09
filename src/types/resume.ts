export interface PersonalDetails {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  github: string;
  linkedin: string;
  summary: string;
  photoUrl: string; // Base64 string or empty
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  highlights: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa: string;
  highlights: string[];
}

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface SkillItem {
  id: string;
  name: string;
  level: SkillLevel;
  category: string;
}

export interface CustomSectionEntry {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  location: string;
  description: string;
}

export interface CustomSection {
  id: string;
  title: string;
  entries: CustomSectionEntry[];
}

export type TemplateId = 'classic' | 'modern' | 'minimal';
export type HeaderPosition = 'top' | 'left' | 'right';
export type ColumnsCount = 1 | 2;
export type FontFamily = 'Sans' | 'Serif' | 'Mono';
export type PhotoShape = 'square' | 'rounded' | 'circle';
export type LinkStyle = 'underlined' | 'colored' | 'plain';

export interface CustomizationSettings {
  layout: {
    templateId: TemplateId;
    headerPosition: HeaderPosition;
    columns: ColumnsCount;
    leftColumnWidthPercent: number; // e.g. 35 -> 35% left, 65% right
  };
  typography: {
    fontFamily: FontFamily;
    baseFontSize: number;    // pt (e.g. 10)
    headingFontSize: number; // pt (e.g. 14)
    nameFontSize: number;    // pt (e.g. 24)
  };
  spacing: {
    lineSpacing: number;          // e.g. 1.4
    spaceBetweenSections: number; // px (e.g. 16)
    pageMargins: number;          // mm (e.g. 12)
  };
  styling: {
    primaryColor: string;     // HEX e.g. '#2563eb'
    textColor: string;        // HEX e.g. '#1e293b'
    backgroundColor: string;  // HEX e.g. '#ffffff'
    headerBgColor: string;    // HEX e.g. '#f8fafc'
    showPhoto: boolean;
    photoShape: PhotoShape;
    photoSize: number;        // px (e.g. 96)
    linkStyle: LinkStyle;
  };
}

export interface ResumeData {
  personalDetails: PersonalDetails;
  workExperience: WorkExperience[];
  education: Education[];
  skills: SkillItem[];
  customSections: CustomSection[];
}

export type ActiveSection = 'personal' | 'experience' | 'education' | 'skills' | 'custom' | 'customizer';

