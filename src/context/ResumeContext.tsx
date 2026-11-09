import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  ResumeData,
  CustomizationSettings,
  PersonalDetails,
  WorkExperience,
  Education,
  SkillItem,
  CustomSection,
  CustomSectionEntry,
  ActiveSection,
  SkillLevel,
} from '../types/resume';
import { defaultResumeData, defaultCustomization } from '../utils/defaultData';
import { loadSavedResume, saveResume, clearSavedResume } from '../utils/storage';
import { downloadResumePDF } from '../utils/pdfGenerator';

interface ResumeContextType {
  resumeData: ResumeData;
  customization: CustomizationSettings;
  activeSection: ActiveSection;
  activeView: 'landing' | 'builder';
  isCustomizerOpen: boolean;
  isCreatorModalOpen: boolean;
  isATSModalOpen: boolean;
  isExportingPDF: boolean;
  zoomLevel: number;

  // View & UI controls
  setActiveSection: (section: ActiveSection) => void;
  setActiveView: (view: 'landing' | 'builder') => void;
  setIsCustomizerOpen: (open: boolean) => void;
  setIsCreatorModalOpen: (open: boolean) => void;
  setIsATSModalOpen: (open: boolean) => void;
  setZoomLevel: (zoom: number | ((prev: number) => number)) => void;

  // Personal details
  updatePersonalDetails: (data: Partial<PersonalDetails>) => void;
  setProfilePhoto: (base64Url: string) => void;
  removeProfilePhoto: () => void;

  // Work experience
  addWorkExperience: () => void;
  updateWorkExperience: (id: string, data: Partial<WorkExperience>) => void;
  removeWorkExperience: (id: string) => void;
  moveWorkExperience: (index: number, direction: 'up' | 'down') => void;
  addHighlight: (experienceId: string, highlight: string) => void;
  updateHighlight: (experienceId: string, index: number, highlight: string) => void;
  removeHighlight: (experienceId: string, index: number) => void;

  // Education
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;
  moveEducation: (index: number, direction: 'up' | 'down') => void;
  addEducationHighlight: (educationId: string, highlight: string) => void;
  updateEducationHighlight: (educationId: string, index: number, highlight: string) => void;
  removeEducationHighlight: (educationId: string, index: number) => void;

  // Skills
  addSkill: (category?: string) => void;
  updateSkill: (id: string, data: Partial<SkillItem>) => void;
  removeSkill: (id: string) => void;
  moveSkill: (index: number, direction: 'up' | 'down') => void;

  // Custom sections
  addCustomSection: (title?: string) => void;
  updateCustomSectionTitle: (sectionId: string, title: string) => void;
  removeCustomSection: (sectionId: string) => void;
  moveCustomSection: (index: number, direction: 'up' | 'down') => void;
  addCustomSectionEntry: (sectionId: string) => void;
  updateCustomSectionEntry: (sectionId: string, entryId: string, data: Partial<CustomSectionEntry>) => void;
  removeCustomSectionEntry: (sectionId: string, entryId: string) => void;
  moveCustomSectionEntry: (sectionId: string, entryIndex: number, direction: 'up' | 'down') => void;

  // Customization
  updateLayout: (layout: Partial<CustomizationSettings['layout']>) => void;
  updateTypography: (typography: Partial<CustomizationSettings['typography']>) => void;
  updateSpacing: (spacing: Partial<CustomizationSettings['spacing']>) => void;
  updateStyling: (styling: Partial<CustomizationSettings['styling']>) => void;
  setEntireCustomization: (settings: CustomizationSettings) => void;

  // Bulk data & reset
  resetToDefault: () => void;
  clearAll: () => void;
  loadCustomData: (data: { resumeData: ResumeData; customization: CustomizationSettings }) => void;

  // PDF export
  exportPDF: () => Promise<void>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initial state from localStorage or default
  const [initialData] = useState(() => loadSavedResume());
  const [resumeData, setResumeData] = useState<ResumeData>(initialData.resumeData);
  const [customization, setCustomization] = useState<CustomizationSettings>(initialData.customization);

  const [activeSection, setActiveSection] = useState<ActiveSection>('personal');
  const [activeView, setActiveView] = useState<'landing' | 'builder'>('landing');
  const [isCustomizerOpen, setIsCustomizerOpen] = useState<boolean>(false);
  const [isCreatorModalOpen, setIsCreatorModalOpen] = useState<boolean>(false);
  const [isATSModalOpen, setIsATSModalOpen] = useState<boolean>(false);
  const [isExportingPDF, setIsExportingPDF] = useState<boolean>(false);
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Auto-persist to localStorage on every state mutation
  useEffect(() => {
    saveResume(resumeData, customization);
  }, [resumeData, customization]);

  // Personal Details
  const updatePersonalDetails = (data: Partial<PersonalDetails>) => {
    setResumeData((prev) => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, ...data },
    }));
  };

  const setProfilePhoto = (base64Url: string) => {
    setResumeData((prev) => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, photoUrl: base64Url },
    }));
  };

  const removeProfilePhoto = () => {
    setResumeData((prev) => ({
      ...prev,
      personalDetails: { ...prev.personalDetails, photoUrl: '' },
    }));
  };

  // Work Experience
  const addWorkExperience = () => {
    const newExp: WorkExperience = {
      id: uuidv4(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      highlights: [''],
    };
    setResumeData((prev) => ({
      ...prev,
      workExperience: [newExp, ...prev.workExperience],
    }));
  };

  const updateWorkExperience = (id: string, data: Partial<WorkExperience>) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
    }));
  };

  const removeWorkExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.filter((item) => item.id !== id),
    }));
  };

  const moveWorkExperience = (index: number, direction: 'up' | 'down') => {
    setResumeData((prev) => {
      const items = [...prev.workExperience];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= items.length) return prev;
      const temp = items[index];
      items[index] = items[targetIndex];
      items[targetIndex] = temp;
      return { ...prev, workExperience: items };
    });
  };

  const addHighlight = (experienceId: string, highlight: string) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((item) =>
        item.id === experienceId
          ? { ...item, highlights: [...item.highlights, highlight] }
          : item
      ),
    }));
  };

  const updateHighlight = (experienceId: string, index: number, highlight: string) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((item) => {
        if (item.id !== experienceId) return item;
        const updated = [...item.highlights];
        updated[index] = highlight;
        return { ...item, highlights: updated };
      }),
    }));
  };

  const removeHighlight = (experienceId: string, index: number) => {
    setResumeData((prev) => ({
      ...prev,
      workExperience: prev.workExperience.map((item) => {
        if (item.id !== experienceId) return item;
        return {
          ...item,
          highlights: item.highlights.filter((_, i) => i !== index),
        };
      }),
    }));
  };

  // Education
  const addEducation = () => {
    const newEdu: Education = {
      id: uuidv4(),
      institution: '',
      degree: '',
      fieldOfStudy: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      highlights: [],
    };
    setResumeData((prev) => ({
      ...prev,
      education: [newEdu, ...prev.education],
    }));
  };

  const updateEducation = (id: string, data: Partial<Education>) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
    }));
  };

  const removeEducation = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.filter((item) => item.id !== id),
    }));
  };

  const addEducationHighlight = (educationId: string, highlight: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((item) =>
        item.id === educationId
          ? { ...item, highlights: [...item.highlights, highlight] }
          : item
      ),
    }));
  };

  const updateEducationHighlight = (educationId: string, index: number, highlight: string) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((item) => {
        if (item.id !== educationId) return item;
        const updated = [...item.highlights];
        updated[index] = highlight;
        return { ...item, highlights: updated };
      }),
    }));
  };

  const removeEducationHighlight = (educationId: string, index: number) => {
    setResumeData((prev) => ({
      ...prev,
      education: prev.education.map((item) => {
        if (item.id !== educationId) return item;
        return {
          ...item,
          highlights: item.highlights.filter((_, i) => i !== index),
        };
      }),
    }));
  };

  // Skills
  const addSkill = (category: string = 'General') => {
    const newSkill: SkillItem = {
      id: uuidv4(),
      name: '',
      level: 'Advanced' as SkillLevel,
      category,
    };
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, newSkill],
    }));
  };

  const updateSkill = (id: string, data: Partial<SkillItem>) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.map((item) =>
        item.id === id ? { ...item, ...data } : item
      ),
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((item) => item.id !== id),
    }));
  };

  // Custom Sections
  const addCustomSection = (title: string = 'Custom Section') => {
    const newSection: CustomSection = {
      id: uuidv4(),
      title,
      entries: [
        {
          id: uuidv4(),
          title: '',
          subtitle: '',
          date: '',
          location: '',
          description: '',
        },
      ],
    };
    setResumeData((prev) => ({
      ...prev,
      customSections: [...prev.customSections, newSection],
    }));
  };

  const updateCustomSectionTitle = (sectionId: string, title: string) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((sec) =>
        sec.id === sectionId ? { ...sec, title } : sec
      ),
    }));
  };

  const removeCustomSection = (sectionId: string) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.filter((sec) => sec.id !== sectionId),
    }));
  };

  const addCustomSectionEntry = (sectionId: string) => {
    const newEntry: CustomSectionEntry = {
      id: uuidv4(),
      title: '',
      subtitle: '',
      date: '',
      location: '',
      description: '',
    };
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((sec) =>
        sec.id === sectionId ? { ...sec, entries: [...sec.entries, newEntry] } : sec
      ),
    }));
  };

  const updateCustomSectionEntry = (
    sectionId: string,
    entryId: string,
    data: Partial<CustomSectionEntry>
  ) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          entries: sec.entries.map((ent) =>
            ent.id === entryId ? { ...ent, ...data } : ent
          ),
        };
      }),
    }));
  };

  const removeCustomSectionEntry = (sectionId: string, entryId: string) => {
    setResumeData((prev) => ({
      ...prev,
      customSections: prev.customSections.map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          entries: sec.entries.filter((ent) => ent.id !== entryId),
        };
      }),
    }));
  };

  // Customization setters
  const updateLayout = (layout: Partial<CustomizationSettings['layout']>) => {
    setCustomization((prev) => ({
      ...prev,
      layout: { ...prev.layout, ...layout },
    }));
  };

  const updateTypography = (typography: Partial<CustomizationSettings['typography']>) => {
    setCustomization((prev) => ({
      ...prev,
      typography: { ...prev.typography, ...typography },
    }));
  };

  const updateSpacing = (spacing: Partial<CustomizationSettings['spacing']>) => {
    setCustomization((prev) => ({
      ...prev,
      spacing: { ...prev.spacing, ...spacing },
    }));
  };

  const updateStyling = (styling: Partial<CustomizationSettings['styling']>) => {
    setCustomization((prev) => ({
      ...prev,
      styling: { ...prev.styling, ...styling },
    }));
  };

  const setEntireCustomization = (settings: CustomizationSettings) => {
    setCustomization(settings);
  };

  // Bulk resets
  const resetToDefault = () => {
    setResumeData(defaultResumeData);
    setCustomization(defaultCustomization);
  };

  const clearAll = () => {
    setResumeData({
      personalDetails: {
        fullName: '',
        jobTitle: '',
        email: '',
        phone: '',
        location: '',
        website: '',
        github: '',
        linkedin: '',
        summary: '',
        photoUrl: '',
      },
      workExperience: [],
      education: [],
      skills: [],
      customSections: [],
    });
    clearSavedResume();
  };

  const loadCustomData = (data: { resumeData: ResumeData; customization: CustomizationSettings }) => {
    setResumeData(data.resumeData);
    setCustomization(data.customization);
  };

  // PDF Export
  const exportPDF = async () => {
    setIsExportingPDF(true);
    try {
      const fileName = `${(resumeData.personalDetails.fullName || 'resume')
        .toLowerCase()
        .replace(/\s+/g, '_')}_resume.pdf`;
      await downloadResumePDF('resume-preview-document', { filename: fileName, quality: 2 });
    } finally {
      setIsExportingPDF(false);
    }
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        customization,
        activeSection,
        activeView,
        isCustomizerOpen,
        isCreatorModalOpen,
        isExportingPDF,
        zoomLevel,

        setActiveSection,
        setActiveView,
        setIsCustomizerOpen,
        setIsCreatorModalOpen,
        setZoomLevel,

        updatePersonalDetails,
        setProfilePhoto,
        removeProfilePhoto,

        addWorkExperience,
        updateWorkExperience,
        removeWorkExperience,
        addHighlight,
        updateHighlight,
        removeHighlight,

        addEducation,
        updateEducation,
        removeEducation,
        addEducationHighlight,
        updateEducationHighlight,
        removeEducationHighlight,

        addSkill,
        updateSkill,
        removeSkill,

        addCustomSection,
        updateCustomSectionTitle,
        removeCustomSection,
        addCustomSectionEntry,
        updateCustomSectionEntry,
        removeCustomSectionEntry,

        updateLayout,
        updateTypography,
        updateSpacing,
        updateStyling,
        setEntireCustomization,

        resetToDefault,
        clearAll,
        loadCustomData,

        exportPDF,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResumeStore = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResumeStore must be used within a ResumeProvider');
  }
  return context;
};

