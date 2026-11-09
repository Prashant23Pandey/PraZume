import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Menu, X, ShieldCheck } from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';

export const Navbar: React.FC = () => {
  const { setActiveView } = useResumeStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Templates', href: '#templates' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Creator', href: '#creator' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5'
          : 'bg-white/80 backdrop-blur-sm border-b border-slate-100 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Left: Brand Name & Pill Badge (Logo removed) */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setActiveView('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group text-left"
          >
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif font-black tracking-tight text-slate-900 group-hover:text-purple-700 transition-colors">
                Pra<span className="italic font-normal text-purple-600">Zume</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-sans font-bold tracking-widest uppercase bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                100% Free & Open
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium -mt-0.5">Privacy-First Resume Studio</p>
          </button>
        </div>

        {/* Center: Navigation Scroll Links (Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-semibold text-slate-600 hover:text-brand-600 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-brand-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: High-Contrast CTA Button */}
        <div className="flex items-center gap-3">
          <span className="sm:hidden inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
            Free
          </span>

          <button
            onClick={() => setActiveView('builder')}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-brand-600 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-brand-500/25 transition-all duration-200 transform hover:-translate-y-0.5 group"
          >
            <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform" />
            <span>Start Building Now</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-brand-600 hover:bg-brand-50/50 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 text-xs text-emerald-700 font-semibold bg-emerald-50 rounded-lg">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Free & Open · Zero Telemetry</span>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setActiveView('builder');
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold shadow-sm transition-colors"
            >
              <span>Start Building Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
