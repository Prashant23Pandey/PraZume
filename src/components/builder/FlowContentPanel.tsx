import React, { useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  FileText, 
  Brain, 
  FolderPlus, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  Phone, 
  MapPin, 
  Plus, 
  Check,
  Edit3,
  Camera
} from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';
import { PersonalForm } from './forms/PersonalForm';
import { SummaryForm } from './forms/SummaryForm';
import { ExperienceForm } from './forms/ExperienceForm';
import { EducationForm } from './forms/EducationForm';
import { SkillsForm } from './forms/SkillsForm';
import { CustomSectionForm } from './forms/CustomSectionForm';

export const FlowContentPanel: React.FC = () => {
  const { resumeData, addWorkExperience, addEducation, addSkill, addCustomSection } = useResumeStore();
  const { personalDetails, workExperience, education, skills, customSections } = resumeData;

  // Track which card is currently expanded ('personal' | 'education' | 'skills' | 'summary' | 'experience' | 'custom' | null)
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setExpandedSection((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full space-y-3.5 pb-20">
      {/* 1. PERSONAL DETAILS CARD (Exact FlowCV Style with Pink Edit Button) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
        {expandedSection === 'personal' ? (
          <div className="p-5">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Edit Personal Details
              </span>
              <button
                onClick={() => setExpandedSection(null)}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors shadow-xs"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Done</span>
              </button>
            </div>
            <PersonalForm />
          </div>
        ) : (
          <div 
            onClick={() => setExpandedSection('personal')}
            className="p-5 relative cursor-pointer group hover:border-slate-300"
          >
            {/* Top-Right Pink Edit Button (Exact FlowCV Aesthetic) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setExpandedSection('personal');
              }}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-rose-500 hover:bg-rose-600 text-white flex items-center justify-center shadow-md shadow-rose-500/20 group-hover:scale-105 transition-all"
              title="Edit Personal Details"
            >
              <Edit3 className="w-4 h-4" />
            </button>

            {/* Layout: Info on Left + Circular Photo on Right */}
            <div className="flex items-start justify-between gap-4 pr-10">
              <div className="space-y-1.5 flex-1 min-w-0">
                {personalDetails.fullName ? (
                  <h3 className="font-serif font-black text-slate-900 text-base sm:text-lg tracking-tight uppercase truncate">
                    {personalDetails.fullName}
                  </h3>
                ) : (
                  <h3 className="font-sans font-bold text-slate-800 text-base sm:text-lg tracking-tight">
                    Add Personal Details
                  </h3>
                )}

                {personalDetails.jobTitle ? (
                  <p className="text-xs font-medium text-slate-500 line-clamp-1">
                    {personalDetails.jobTitle}
                  </p>
                ) : (
                  <p className="text-xs text-slate-400">
                    Click to enter your name, professional title & contact info
                  </p>
                )}

                {/* Contact Items with Icons or Empty State */}
                {personalDetails.email || personalDetails.phone || personalDetails.location ? (
                  <div className="space-y-1 pt-2 text-xs text-slate-600 font-sans">
                    {personalDetails.email && (
                      <div className="flex items-center gap-2 truncate">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{personalDetails.email}</span>
                      </div>
                    )}
                    {personalDetails.phone && (
                      <div className="flex items-center gap-2 truncate">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{personalDetails.phone}</span>
                      </div>
                    )}
                    {personalDetails.location && (
                      <div className="flex items-center gap-2 truncate">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate">{personalDetails.location}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="pt-2 text-xs text-slate-400 font-sans flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                    <span>No contact details added yet</span>
                  </div>
                )}
              </div>

              {/* Profile Photo or Camera Placeholder */}
              <div className="shrink-0 mt-1">
                {personalDetails.photoUrl ? (
                  <img
                    src={personalDetails.photoUrl}
                    alt={personalDetails.fullName || 'Profile Photo'}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-white shadow-md ring-1 ring-slate-200"
                  />
                ) : (
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 group-hover:border-rose-300 group-hover:text-rose-500 transition-colors">
                    <Camera className="w-5 h-5 mb-0.5" />
                    <span className="text-[9px] font-bold uppercase tracking-wider">Photo</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 2. EDUCATIONAL HISTORY CARD */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
        <button
          onClick={() => toggleSection('education')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50/60 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <GraduationCap className="w-4 h-4" />
            </span>
            <div>
              <span className="font-sans font-bold text-sm text-slate-900 block">
                Educational History
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {education.length} {education.length === 1 ? 'qualification' : 'qualifications'} added
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {expandedSection === 'education' ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </div>
        </button>

        {expandedSection === 'education' && (
          <div className="p-5 border-t border-slate-100 bg-slate-50/30">
            <EducationForm />
          </div>
        )}
      </div>

      {/* 3. RELEVANT SKILLS CARD */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
        <button
          onClick={() => toggleSection('skills')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50/60 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <Brain className="w-4 h-4" />
            </span>
            <div>
              <span className="font-sans font-bold text-sm text-slate-900 block">
                Relevant Skills
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {skills.length} skills & technologies
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {expandedSection === 'skills' ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </div>
        </button>

        {expandedSection === 'skills' && (
          <div className="p-5 border-t border-slate-100 bg-slate-50/30">
            <SkillsForm />
          </div>
        )}
      </div>

      {/* 4. PROFESSIONAL SUMMARY CARD */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
        <button
          onClick={() => toggleSection('summary')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50/60 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <FileText className="w-4 h-4" />
            </span>
            <div>
              <span className="font-sans font-bold text-sm text-slate-900 block">
                Summary
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {personalDetails.summary ? 'Biographical intro active' : 'Add summary pitch'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {expandedSection === 'summary' ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </div>
        </button>

        {expandedSection === 'summary' && (
          <div className="p-5 border-t border-slate-100 bg-slate-50/30">
            <SummaryForm />
          </div>
        )}
      </div>

      {/* 5. WORK EXPERIENCE CARD */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
        <button
          onClick={() => toggleSection('experience')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50/60 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <Briefcase className="w-4 h-4" />
            </span>
            <div>
              <span className="font-sans font-bold text-sm text-slate-900 block">
                Work Experience
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {workExperience.length} {workExperience.length === 1 ? 'role' : 'roles'} listed
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {expandedSection === 'experience' ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </div>
        </button>

        {expandedSection === 'experience' && (
          <div className="p-5 border-t border-slate-100 bg-slate-50/30">
            <ExperienceForm />
          </div>
        )}
      </div>

      {/* 6. CUSTOM SECTIONS (HACKATHONS / PROJECTS / LEADERSHIP) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md">
        <button
          onClick={() => toggleSection('custom')}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50/60 transition-colors"
        >
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-slate-100 text-slate-700">
              <FolderPlus className="w-4 h-4" />
            </span>
            <div>
              <span className="font-sans font-bold text-sm text-slate-900 block">
                Custom Sections & Leadership
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {customSections.length} {customSections.length === 1 ? 'section' : 'sections'} active
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {expandedSection === 'custom' ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </div>
        </button>

        {expandedSection === 'custom' && (
          <div className="p-5 border-t border-slate-100 bg-slate-50/30">
            <CustomSectionForm />
          </div>
        )}
      </div>

      {/* QUICK ADD SECTION ACTIONS */}
      <div className="pt-2 flex flex-wrap items-center gap-2">
        <button
          onClick={() => {
            addCustomSection('Hackathons & Awards');
            setExpandedSection('custom');
          }}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs hover:shadow-xs transition-all"
        >
          <Plus className="w-3.5 h-3.5 text-purple-600" />
          <span>Add Section</span>
        </button>

        <button
          onClick={() => {
            addWorkExperience();
            setExpandedSection('experience');
          }}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs hover:shadow-xs transition-all"
        >
          <Plus className="w-3.5 h-3.5 text-emerald-600" />
          <span>Add Experience</span>
        </button>

        <button
          onClick={() => {
            addEducation();
            setExpandedSection('education');
          }}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs hover:shadow-xs transition-all"
        >
          <Plus className="w-3.5 h-3.5 text-blue-600" />
          <span>Add Education</span>
        </button>

        <button
          onClick={() => {
            addSkill('Technical');
            setExpandedSection('skills');
          }}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-700 shadow-2xs hover:shadow-xs transition-all"
        >
          <Plus className="w-3.5 h-3.5 text-amber-600" />
          <span>Add Skill</span>
        </button>
      </div>
    </div>
  );
};

