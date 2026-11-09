import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is CVForge really 100% free with no subscription traps?',
      a: 'Yes, completely free. There are no trial periods, no hidden fees, no credit card requirements, and no watermarks on your downloaded documents. All PDF generation executes directly in your browser.'
    },
    {
      q: 'Where is my personal resume data stored?',
      a: 'Your data is strictly saved in your browser’s localStorage on your current device. No information is transmitted to any cloud database or third-party server. Your contact details, employment history, and photos remain 100% private.'
    },
    {
      q: 'Will my resume pass Applicant Tracking Systems (ATS)?',
      a: 'Yes. CVForge templates use clean, semantic text hierarchy, standard section headers, and un-nested layouts that ATS screeners and recruitment algorithms can parse cleanly.'
    },
    {
      q: 'How does the PDF export work?',
      a: 'CVForge offers two PDF generation engines: a built-in high-DPI rendering engine (using html2canvas and jsPDF) for direct one-click PDF downloads, as well as a native browser print option (@media print) for vector printing.'
    },
    {
      q: 'Can I transfer my resume to another computer or browser?',
      a: 'Absolutely! Use the "Export JSON" button to download a backup file of your entire resume data and design settings. On your other computer, simply click "Import JSON" to restore your resume in seconds.'
    },
    {
      q: 'Can I add custom sections like Certifications, Projects, or Publications?',
      a: 'Yes. You can add unlimited custom sections with customizable titles, dates, descriptions, and subtitle fields that integrate seamlessly into all resume templates.'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-brand-600" />
            Common Questions
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Everything you need to know about our local-first resume builder architecture.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors bg-slate-50/50"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-100/60 transition-colors"
                >
                  <span className="font-semibold text-slate-900 text-sm sm:text-base">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand-600' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

