import { ResumeData, CustomizationSettings } from '../types/resume';
import { defaultResumeData, emptyResumeData, defaultCustomization } from './defaultData';

export const STORAGE_KEY = 'prazume_builder_state_v4';

export interface StoredPayload {
  version: number;
  timestamp: string;
  resumeData: ResumeData;
  customization: CustomizationSettings;
}

export function loadSavedResume(): { resumeData: ResumeData; customization: CustomizationSettings } {
  try {
    // Clear legacy keys if present
    localStorage.removeItem('free_cv_builder_data');
    localStorage.removeItem('prazume_builder_data_v2');
    localStorage.removeItem('prazume_builder_data_v3');

    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { resumeData: emptyResumeData, customization: defaultCustomization };
    }

    const parsed = JSON.parse(raw);

    // If the saved data has the sample/prefilled data from older runs, reset to empty
    if (
      parsed.resumeData?.personalDetails?.fullName === 'PRASHANT PANDEY' ||
      parsed.resumeData?.personalDetails?.fullName?.toLowerCase().includes('alex vance')
    ) {
      localStorage.removeItem(STORAGE_KEY);
      return { resumeData: emptyResumeData, customization: defaultCustomization };
    }

    const resumeData: ResumeData = {
      personalDetails: { 
        ...emptyResumeData.personalDetails, 
        ...(parsed.resumeData?.personalDetails || {}),
        photoUrl: parsed.resumeData?.personalDetails?.photoUrl || '',
      },
      workExperience: Array.isArray(parsed.resumeData?.workExperience) 
        ? parsed.resumeData.workExperience 
        : [],
      education: Array.isArray(parsed.resumeData?.education) 
        ? parsed.resumeData.education 
        : [],
      skills: Array.isArray(parsed.resumeData?.skills) 
        ? parsed.resumeData.skills 
        : [],
      customSections: Array.isArray(parsed.resumeData?.customSections) 
        ? parsed.resumeData.customSections 
        : [],
    };

    const customization: CustomizationSettings = {
      layout: { ...defaultCustomization.layout, ...(parsed.customization?.layout || {}) },
      typography: { ...defaultCustomization.typography, ...(parsed.customization?.typography || {}) },
      spacing: { ...defaultCustomization.spacing, ...(parsed.customization?.spacing || {}) },
      styling: { 
        ...defaultCustomization.styling, 
        ...(parsed.customization?.styling || {}),
        headerBgColor: parsed.customization?.styling?.headerBgColor || '#000000',
        showPhoto: true,
      },
    };

    return { resumeData, customization };
  } catch (err) {
    console.error('Failed to load resume data from localStorage:', err);
    return { resumeData: emptyResumeData, customization: defaultCustomization };
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

