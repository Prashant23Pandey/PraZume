import React from 'react';
import { Star, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const reviews = [
    {
      name: 'Sarah Chen',
      role: 'Staff Product Designer',
      company: 'Figma Community Member',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      content: 'I had been using FlowCV for years until they capped free downloads and locked features behind subscriptions. CVForge matches the design precision, runs 100% locally, and gives you total creative control.',
    },
    {
      name: 'Marcus Brody',
      role: 'Senior Backend Engineer',
      company: 'Fintech Startup',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      content: 'Zero tracking and zero server storage was the immediate selling point for me. My personal contact info and job history never hit a remote database. Plus the PDF export is crisp and ATS-compliant.',
    },
    {
      name: 'Elena Rostova',
      role: 'Engineering Manager',
      company: 'Series B Scaleup',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      rating: 5,
      content: 'Being able to export your resume state as a clean JSON file and version-control it on GitHub is brilliant. Prashant built an exceptional open-source developer tool here.',
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Loved by Developers & Designers
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            See how professionals around the world use CVForge to land interviews at top tech companies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow relative flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-slate-300 mb-3" />
                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">
                  "{rev.content}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-brand-500/20"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{rev.name}</h4>
                  <p className="text-xs text-slate-500">{rev.role} · {rev.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

