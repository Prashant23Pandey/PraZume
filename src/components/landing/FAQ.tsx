import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ShieldCheck } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems = [
    {
      q: 'Is this builder really 100% free?',
      a: 'Yes, absolutely. There are zero paywalls, zero subscription tiers, zero watermarks on exported files, and zero credit card requirements. Everything runs client-side in your browser for free forever.',
    },
    {
      q: 'Where is my personal data stored?',
      a: "100% in your browser's local storage (localStorage key: 'free_cv_builder_data'). No personal data, contact information, work history, or uploaded photos are ever transmitted to or stored on any external server.",
    },
    {
      q: 'Can I download unlimited PDFs?',
      a: 'Yes! You can download as many high-resolution, pixel-perfect A4 PDF resumes as you need. There are no daily download limits or export caps whatsoever.',
    },
    {
      q: 'Is the output ATS-friendly?',
      a: 'Yes. The templates adhere to semantic document structures, un-nested layouts, standard headings (Experience, Education, Skills), and clean text hierarchy that Applicant Tracking Systems (ATS) can parse seamlessly.',
    },
    {
      q: 'How can I back up or transfer my resume to another computer?',
      a: 'You can click the "Export JSON" button anytime in the studio toolbar. This generates a portable JSON file containing your complete resume data and customizations. Simply use "Import JSON" on another device or browser to restore your work in seconds.',
    },
    {
      q: 'Can I use this on mobile devices or tablets?',
      a: 'Yes! The builder features a responsive mobile split interface with dedicated "Editor" and "Preview" toggle tabs so you can craft and review your resume on smartphones and tablets.',
    },
  ];

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-[11px] font-sans font-bold tracking-widest uppercase mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-black text-slate-900 tracking-tight">
            Frequently Asked <span className="italic font-normal text-purple-600">Questions</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
            Everything you need to know about our privacy-first, client-side resume builder.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900">
                    {item.q}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                      isOpen
                        ? 'bg-brand-50 text-brand-600 rotate-180'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white animate-in fade-in duration-150">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Security Assurance Footnote */}
        <div className="mt-12 p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-center gap-3 text-xs text-slate-600 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            <strong>100% Privacy Guarantee:</strong> We do not use third-party analytics, user tracking cookies, or remote databases.
          </span>
        </div>
      </div>
    </section>
  );
};
