import React, { useRef } from 'react';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Camera, Trash2, Upload, Crop } from 'lucide-react';
import { useResumeStore } from '../../../context/ResumeContext';

export const PersonalForm: React.FC = () => {
  const { resumeData, updatePersonalDetails, setProfilePhoto, removeProfilePhoto } = useResumeStore();
  const { personalDetails } = resumeData;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.match(/^image\/(png|jpeg|jpg|webp)$/i)) {
      alert('Please select a PNG or JPEG image file.');
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      alert('Image size exceeds 3MB limit. Please choose a smaller image.');
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
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="pb-4 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Personal Details</h2>
        <p className="text-xs text-slate-500 mt-0.5">Your core contact information and recruiter touchpoints</p>
      </div>

      {/* Profile Photo Uploader */}
      <div className="p-4 bg-slate-50 border border-slate-200/90 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="relative shrink-0">
          {personalDetails.photoUrl ? (
            <img
              src={personalDetails.photoUrl}
              alt="Avatar"
              className="w-20 h-20 rounded-2xl object-cover ring-2 ring-white shadow-md border border-slate-200"
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-slate-200 flex items-center justify-center text-slate-400 border border-slate-300">
              <Camera className="w-8 h-8" />
            </div>
          )}
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h4 className="text-xs font-bold text-slate-800">Profile Photograph</h4>
          <p className="text-[11px] text-slate-500 mb-3">
            PNG or JPEG accepted. Converted to Base64 and stored 100% locally in your browser.
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              onChange={handlePhotoUpload}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold shadow-xs transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-brand-600" />
              <span>Upload Photo</span>
            </button>

            {personalDetails.photoUrl && (
              <>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold shadow-xs transition-colors"
                  title="Replace / Crop photo"
                >
                  <Crop className="w-3.5 h-3.5 text-slate-500" />
                  <span>Replace</span>
                </button>
                <button
                  onClick={removeProfilePhoto}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 text-xs font-semibold transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Input Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Full Name *
          </label>
          <input
            type="text"
            value={personalDetails.fullName}
            onChange={(e) => updatePersonalDetails({ fullName: e.target.value })}
            placeholder="e.g. Alex Vance"
            className="w-full text-sm rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Professional Title *
          </label>
          <input
            type="text"
            value={personalDetails.jobTitle}
            onChange={(e) => updatePersonalDetails({ jobTitle: e.target.value })}
            placeholder="e.g. Senior Full Stack Engineer"
            className="w-full text-sm rounded-xl border-slate-200 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={personalDetails.email}
              onChange={(e) => updatePersonalDetails({ email: e.target.value })}
              placeholder="alex.vance@example.dev"
              className="w-full text-sm rounded-xl border-slate-200 pl-9 focus:border-brand-500 focus:ring-brand-500 shadow-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
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

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Location / Address
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

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Portfolio / Website URL
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

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            LinkedIn Profile URL
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

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            GitHub Profile URL
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
      </div>
    </div>
  );
};

