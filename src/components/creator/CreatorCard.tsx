import React from 'react';
import { Linkedin, Github, Globe, Mail, Check } from 'lucide-react';

export const CreatorCard: React.FC = () => {
  const competencies = [
    'Full-Stack Systems',
    'AI & Machine Learning',
    'Cloud Architecture',
    'Client-Side Performance',
    'Open-Source Tools',
    'Privacy by Design',
  ];

  return (
    <div className="bg-white rounded-[32px] sm:rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/60 p-6 sm:p-10 lg:p-12 transition-all">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Photo with offset colored backdrop */}
        <div className="md:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[4/5]">
            {/* Offset decorative lavender backdrop */}
            <div 
              className="absolute inset-0 translate-x-3 translate-y-3 sm:translate-x-4 sm:translate-y-4 rounded-[28px] sm:rounded-[36px] bg-[#c4b5fd] -z-0"
              aria-hidden="true"
            />

            {/* Profile Photo Container */}
            <div className="relative z-10 w-full h-full rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-lg border-2 border-white bg-slate-100">
              <img
                src="/PROFILE1.jpg"
                alt="Prashant Pandey"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  // Fallback in case of image load delay
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Side: Bio, Headings, Competencies & LinkedIn CTA */}
        <div className="md:col-span-7 text-left">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center px-4 py-1.5 rounded-full text-[11px] font-sans font-bold tracking-widest uppercase bg-[#f3e8ff] text-[#9333ea] border border-[#e9d5ff]/80 mb-3 sm:mb-4">
            Computer Science & AI Engineer
          </div>

          {/* Main Serif Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-bold text-slate-900 tracking-tight leading-tight mb-4">
            Meet <span className="italic font-normal text-purple-600">Prashant Pandey</span>
          </h2>

          {/* Narrative Biography */}
          <div className="space-y-3 text-sm sm:text-[15px] text-slate-600 leading-relaxed font-normal mb-6">
            <p>
              Prashant Pandey is a Computer Science & AI Engineer, Full-Stack Developer, and Founder. He designs and implements high-performance distributed systems, machine learning applications, and local-first frontend architectures.
            </p>
            <p>
              His engineering philosophy centers on developer empowerment, algorithmic efficiency, and absolute user privacy. He created PraZume as a 100% free, subscription-free studio so students, engineers, and professionals worldwide can craft interview-winning resumes with zero paywalls and zero data tracking.
            </p>
          </div>

          {/* Competency Pill Tags with checkmarks */}
          <div className="flex flex-wrap gap-2 sm:gap-2.5 mb-7">
            {competencies.map((comp) => (
              <span
                key={comp}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-[13px] font-semibold text-slate-800 shadow-xs"
              >
                <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[2.5]" />
                <span>{comp}</span>
              </span>
            ))}
          </div>

          {/* Action CTAs: LinkedIn Button + Social Links */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="https://linkedin.com/in/prashantpandey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#0077b5] hover:bg-[#006097] text-white text-xs sm:text-sm font-bold shadow-md shadow-sky-600/25 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              <Linkedin className="w-4 h-4 fill-white" />
              <span>Connect on LinkedIn</span>
            </a>

            <a
              href="https://github.com/prashantpandey"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>

            <a
              href="https://prashantpandey.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition-colors"
            >
              <Globe className="w-4 h-4 text-brand-600" />
              <span>Portfolio</span>
            </a>

            <a
              href="mailto:contact@prashantpandey.dev"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition-colors"
            >
              <Mail className="w-4 h-4 text-rose-500" />
              <span>Get in Touch</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
