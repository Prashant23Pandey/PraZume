import React from 'react';
import { Heart, Shield, Sparkles, Github, Linkedin, Globe } from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';

export const Footer: React.FC = () => {
  const { setActiveView, setIsCreatorModalOpen } = useResumeStore();

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="text-2xl font-serif font-black text-white tracking-tight">
                Pra<span className="italic font-normal text-purple-400">Zume</span>
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-sans font-bold uppercase tracking-widest bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                100% Free
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              A 100% client-side, local-first resume builder engineered to eliminate predatory paywalls, watermarks, and user surveillance from career preparation.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>Zero server dependencies · LocalStorage encryption ready</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    setActiveView('landing');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  Features & Comparison
                </a>
              </li>
              <li>
                <a href="#templates" className="hover:text-white transition-colors">
                  Resume Templates
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <button
                  onClick={() => setActiveView('builder')}
                  className="text-brand-400 hover:text-brand-300 font-bold transition-colors"
                >
                  Open Builder Studio &rarr;
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Creator Recognition */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-400" />
              <span>Architect & Creator</span>
            </h4>
            <p className="text-xs text-slate-300 font-medium">
              Designed & Built by <span className="text-white font-bold">Prashant Pandey</span>
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Computer Science & AI Engineer, Full-Stack Developer, and open-source advocate committed to building free developer tools.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <a
                href="https://github.com/prashantpandey"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/prashantpandey"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://prashantpandey.dev"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Portfolio"
              >
                <Globe className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsCreatorModalOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-brand-600/20 text-brand-300 hover:bg-brand-600/30 text-xs font-semibold border border-brand-500/30 transition-colors"
              >
                View Bio
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © {new Date().getFullYear()} PraZume. Open-source, subscription-free, and privacy-focused.
          </p>
          <p className="flex items-center gap-1.5 font-medium text-slate-300">
            <span>Designed & Built with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>by <strong className="text-white">Prashant Pandey</strong></span>
          </p>
        </div>
      </div>
    </footer>
  );
};
