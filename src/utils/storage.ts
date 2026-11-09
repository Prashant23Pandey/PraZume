import { ResumeData, CustomizationSettings } from '../types/resume';
import { defaultResumeData, defaultCustomization } from './defaultData';

export const STORAGE_KEY = 'free_cv_builder_data';

export interface StoredPayload {
  version: number;
  timestamp: string;
  resumeData: ResumeData;
  customization: CustomizationSettings;
}

export function loadSavedResume(): { resumeData: ResumeData; customization: CustomizationSettings } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { resumeData: defaultResumeData, customization: defaultCustomization };
    }

    const parsed = JSON.parse(raw);
    const resumeData: ResumeData = {
      personalDetails: { ...defaultResumeData.personalDetails, ...(parsed.resumeData?.personalDetails || {}) },
      workExperience: Array.isArray(parsed.resumeData?.workExperience) ? parsed.resumeData.workExperience : defaultResumeData.workExperience,
      education: Array.isArray(parsed.resumeData?.education) ? parsed.resumeData.education : defaultResumeData.education,
      skills: Array.isArray(parsed.resumeData?.skills) ? parsed.resumeData.skills : defaultResumeData.skills,
      customSections: Array.isArray(parsed.resumeData?.customSections) ? parsed.resumeData.customSections : defaultResumeData.customSections,
    };

    const customization: CustomizationSettings = {
      layout: { ...defaultCustomization.layout, ...(parsed.customization?.layout || {}) },
      typography: { ...defaultCustomization.typography, ...(parsed.customization?.typography || {}) },
      spacing: { ...defaultCustomization.spacing, ...(parsed.customization?.spacing || {}) },
      styling: { ...defaultCustomization.styling, ...(parsed.customization?.styling || {}) },
    };

    return { resumeData, customization };
  } catch (err) {
    console.error('Failed to load resume data from localStorage:', err);
    return { resumeData: defaultResumeData, customization: defaultCustomization };
  }
}

export function saveResume(resumeData: ResumeData, customization: CustomizationSettings): boolean {
  try {
    const payload: StoredPayload = {
      version: 1,
      timestamp: new Date().toISOString(),
      resumeData,
      customization,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return true;
  } catch (err) {
    console.error('Failed to save resume data to localStorage:', err);
    return false;
  }
}

export function clearSavedResume(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Failed to clear saved resume data:', err);
  }
}

export function exportResumeAsJSON(resumeData: ResumeData, customization: CustomizationSettings): void {
  const payload: StoredPayload = {
    version: 1,
    timestamp: new Date().toISOString(),
    resumeData,
    customization,
  };
  const jsonStr = JSON.stringify(payload, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const fileName = (resumeData.personalDetails.fullName || 'resume')
    .toLowerCase()
    .replace(/\s+/g, '_')
    .concat('_backup.json');
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function importResumeFromJSON(
  file: File,
  onSuccess: (data: { resumeData: ResumeData; customization: CustomizationSettings }) => void,
  onError: (errorMsg: string) => void
): void {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const content = e.target?.result as string;
      const parsed = JSON.parse(content);
      if (!parsed || typeof parsed !== 'object') {
        throw new Error('Invalid JSON structure');
      }

      const importedResume: ResumeData = {
        personalDetails: { ...defaultResumeData.personalDetails, ...(parsed.resumeData?.personalDetails || {}) },
        workExperience: Array.isArray(parsed.resumeData?.workExperience) ? parsed.resumeData.workExperience : [],
        education: Array.isArray(parsed.resumeData?.education) ? parsed.resumeData.education : [],
        skills: Array.isArray(parsed.resumeData?.skills) ? parsed.resumeData.skills : [],
        customSections: Array.isArray(parsed.resumeData?.customSections) ? parsed.resumeData.customSections : [],
      };

      const importedCustomization: CustomizationSettings = {
        layout: { ...defaultCustomization.layout, ...(parsed.customization?.layout || {}) },
        typography: { ...defaultCustomization.typography, ...(parsed.customization?.typography || {}) },
        spacing: { ...defaultCustomization.spacing, ...(parsed.customization?.spacing || {}) },
        styling: { ...defaultCustomization.styling, ...(parsed.customization?.styling || {}) },
      };

      onSuccess({ resumeData: importedResume, customization: importedCustomization });
    } catch (err) {
      onError('Unable to parse file. Please verify it is a valid PraZume JSON backup.');
    }
  };
  reader.onerror = () => onError('Failed to read selected file.');
  reader.readAsText(file);
}

