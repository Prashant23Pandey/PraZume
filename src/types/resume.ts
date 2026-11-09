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
  rating?: number; // 1 - 5
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
export type ColumnLayout = 'single' | 'left-sidebar' | 'right-sidebar';
export type HeaderAlignment = 'top-left' | 'top-center' | 'integrated';
export type HeaderPosition = 'top' | 'left' | 'right';
export type FontFamily = 
  | 'Lora'
  | 'Source Serif Pro'
  | 'Zilla Slab'
  | 'PT Serif'
  | 'Literata'
  | 'EB Garamond'
  | 'Crimson Pro'
  | 'Cormorant Garamond'
  | 'Playfair Display'
  | 'Plus Jakarta Sans'
  | 'Inter' 
  | 'Roboto' 
  | 'Merriweather' 
  | 'Source Code Pro'
  | 'Sans' 
  | 'Serif' 
  | 'Mono';

export type PhotoShape = 'square' | 'rounded' | 'circle';
export type LinkStyle = 'underlined' | 'colored' | 'plain';

export interface CustomizationSettings {
  layout: {
    templateId: TemplateId;
    columnLayout: ColumnLayout;
    columns: number; // 1 | 2
    leftColumnWidthPercent: number; // e.g. 35 -> 35% left, 65% right
    headerAlignment: HeaderAlignment;
    headerPosition: HeaderPosition;
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
    sidebarBgColor: string;   // HEX e.g. '#f8fafc'
    headerBgColor: string;    // HEX or 'transparent'
    showPhoto: boolean;
    photoShape: PhotoShape;
    photoSize: number;        // px (e.g. 80)
    linkStyle: LinkStyle;
    showIcons: boolean;
  };
}

export interface ResumeData {
  personalDetails: PersonalDetails;
  workExperience: WorkExperience[];
  education: Education[];
  skills: SkillItem[];
  customSections: CustomSection[];
}

export type ActiveSection = 
  | 'personal' 
  | 'summary' 
  | 'experience' 
  | 'education' 
  | 'skills' 
  | 'custom' 
  | 'customizer';
