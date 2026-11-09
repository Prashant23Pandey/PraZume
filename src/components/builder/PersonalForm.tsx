import React, { useRef } from 'react';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Camera, Trash2, Upload } from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';
import { SectionHeader } from './SectionHeader';

export const PersonalForm: React.FC = () => {
  const { resumeData, updatePersonalDetails, setProfilePhoto, removeProfilePhoto } = useResumeStore();
  const { personalDetails } = resumeData;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Photo size exceeds 2MB limit. Please choose a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target?.result as string;
      setProfilePhoto(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <SectionHeader
        title="Personal Details"
        description="Your core identity and direct contact information"
      />

      {/* Avatar upload quick banner */}
      <div className="flex items-center gap-4 p-4 bg-slate-50 border border-slate-200/80 rounded-2xl">
        <div className="relative">
          {personalDetails.photoUrl ? (
            <img
              src={personalDetails.photoUrl}
              alt="Avatar"
              className="w-16 h-16 rounded-xl object-cover ring-2 ring-white shadow-sm"
            />
          ) : (
            <div className="w-16 h-16 rounded-xl bg-slate-200 flex items-center justify-center text-slate-400">
              <Camera className="w-6 h-6" />
            </div>
          )}
        </div>

        <div className="flex-1">
          <h4 className="text-xs font-bold text-slate-800">Profile Photo</h4>
          <p className="text-[11px] text-slate-500 mb-2">
            PNG or JPG up to 2MB. Saved privately in localStorage.
          </p>

          <div className="flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-medium transition-colors"
            >
              <Upload className="w-3 h-3" />
              <span>Upload Photo</span>
            </button>

            {personalDetails.photoUrl && (
              <button
                onClick={removeProfilePhoto}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-medium transition-colors"
              >
                <Trash2 className="w-3 h-3" />
                <span>Remove</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Full Name *
          </label>
          <div className="relative">
            <input
              type="text"
              value={personalDetails.fullName}
              onChange={(e) => updatePersonalDetails({ fullName: e.target.value })}
              placeholder="e.g. Alex Vance"
              className="w-full text-sm rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
            />
          </div>
        </div>

        {/* Job Title */}
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Professional Title *
          </label>
          <input
            type="text"
            value={personalDetails.jobTitle}
            onChange={(e) => updatePersonalDetails({ jobTitle: e.target.value })}
            placeholder="e.g. Senior Software Architect"
            className="w-full text-sm rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
          />
        </div>

        {/* Email */}
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={personalDetails.email}
              onChange={(e) => updatePersonalDetails({ email: e.target.value })}
              placeholder="alex.vance@example.com"
              className="w-full text-sm rounded-xl border-slate-200 pl-9 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="tel"
              value={personalDetails.phone}
              onChange={(e) => updatePersonalDetails({ phone: e.target.value })}
              placeholder="+1 (555) 234-5678"
              className="w-full text-sm rounded-xl border-slate-200 pl-9 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Location
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={personalDetails.location}
              onChange={(e) => updatePersonalDetails({ location: e.target.value })}
              placeholder="San Francisco, CA (or Remote)"
              className="w-full text-sm rounded-xl border-slate-200 pl-9 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
            />
          </div>
        </div>

        {/* Website */}
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Portfolio / Website
          </label>
          <div className="relative">
            <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              value={personalDetails.website}
              onChange={(e) => updatePersonalDetails({ website: e.target.value })}
              placeholder="https://alexvance.dev"
              className="w-full text-sm rounded-xl border-slate-200 pl-9 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
            />
          </div>
        </div>

        {/* GitHub */}
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            GitHub URL
          </label>
          <div className="relative">
            <Github className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              value={personalDetails.github}
              onChange={(e) => updatePersonalDetails({ github: e.target.value })}
              placeholder="https://github.com/alexvance-dev"
              className="w-full text-sm rounded-xl border-slate-200 pl-9 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
            />
          </div>
        </div>

        {/* LinkedIn */}
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            LinkedIn Profile
          </label>
          <div className="relative">
            <Linkedin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              value={personalDetails.linkedin}
              onChange={(e) => updatePersonalDetails({ linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/alexvance-dev"
              className="w-full text-sm rounded-xl border-slate-200 pl-9 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      <div>
        <label className="text-xs font-semibold text-slate-700 block mb-1">
          Professional Summary
        </label>
        <textarea
          rows={4}
          value={personalDetails.summary}
          onChange={(e) => updatePersonalDetails({ summary: e.target.value })}
          placeholder="Briefly describe your high-level experience, specialties, and key accomplishments..."
          className="w-full text-sm rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500 shadow-sm leading-relaxed"
        />
      </div>
    </div>
  );
};
