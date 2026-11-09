import React, { useRef } from 'react';
import { Camera, Trash2, Upload, Square, Circle, ShieldAlert } from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';
import { PhotoShape } from '../../types/resume';

export const PhotoControls: React.FC = () => {
  const { resumeData, customization, updateStyling, setProfilePhoto, removeProfilePhoto } = useResumeStore();
  const { showPhoto, photoShape, photoSize } = customization.styling;
  const { photoUrl } = resumeData.personalDetails;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Photo size exceeds 2MB limit. Please select a smaller image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target?.result as string;
      setProfilePhoto(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-6">
      {/* Photo Toggle */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
        <div>
          <span className="text-xs font-bold text-slate-800 block">Display Profile Photo</span>
          <span className="text-[10px] text-slate-500">Toggle avatar visibility on resume</span>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={showPhoto}
            onChange={(e) => updateStyling({ showPhoto: e.target.checked })}
            className="sr-only peer"
          />
          <div className="w-10 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-600"></div>
        </label>
      </div>

      {showPhoto && (
        <>
          {/* Photo Preview & Upload Controls */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Photo Upload (Local-Only)
            </label>
            <div className="flex items-center gap-4 p-3 bg-white border border-slate-200 rounded-xl">
              <div className="relative">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt="Profile Avatar"
                    className={`w-14 h-14 object-cover border border-slate-200 ${
                      photoShape === 'circle'
                        ? 'rounded-full'
                        : photoShape === 'rounded'
                        ? 'rounded-xl'
                        : 'rounded-none'
                    }`}
                  />
                ) : (
                  <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                    <Camera className="w-6 h-6" />
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-wrap gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose Image</span>
                </button>

                {photoUrl && (
                  <button
                    onClick={removeProfilePhoto}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                )}
              </div>
            </div>
            <p className="text-[10px] text-slate-400 mt-1.5 flex items-center gap-1">
              <ShieldAlert className="w-3 h-3 text-emerald-500" />
              Stored locally as base64 in your browser — never sent to servers.
            </p>
          </div>

          {/* Photo Shape */}
          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
              Photo Shape
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { id: 'circle', label: 'Circle', icon: Circle },
                  { id: 'rounded', label: 'Rounded', icon: Square },
                  { id: 'square', label: 'Sharp', icon: Square },
                ] as { id: PhotoShape; label: string; icon: any }[]
              ).map((shape) => {
                const Icon = shape.icon;
                return (
                  <button
                    key={shape.id}
                    onClick={() => updateStyling({ photoShape: shape.id })}
                    className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl text-center capitalize border text-xs font-semibold transition-all ${
                      photoShape === shape.id
                        ? 'border-brand-600 bg-brand-50 text-brand-900 ring-2 ring-brand-500/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{shape.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Photo Diameter Size Slider */}
          <div>
            <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
              <span>Photo Diameter</span>
              <span className="font-mono text-brand-600 font-bold">{photoSize} px</span>
            </div>
            <input
              type="range"
              min="50"
              max="130"
              step="5"
              value={photoSize}
              onChange={(e) => updateStyling({ photoSize: Number(e.target.value) })}
              className="w-full accent-brand-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>Small (50px)</span>
              <span>Medium (85px)</span>
              <span>Large (130px)</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

