import React from 'react';
import { Star, Quote, Sparkles } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Sarah Chen',
      role: 'Staff Product Designer',
      context: 'Landed job at San Francisco Unicorn',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&q=80',
      comment: 'I had been a loyal FlowCV user for 3 years until they placed downloads behind subscriptions. PraZume gives me the exact same level of typographic control, 2-column layout flexibility, and zero paywalls.',
      badge: 'Design Leader',
    },
    {
      name: 'Rohan Mehta',
      role: 'Recent CS Graduate',
      context: 'Hired as Junior SWE',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80',
      comment: 'As a college student applying to 50+ internships, having to pay $19 just to download a revised PDF was infuriating. PraZume is lightning fast, 100% free, and helped me get my first offer in 2 weeks.',
      badge: 'Student / New Grad',
    },
    {
      name: 'Elena Rostova',
      role: 'Engineering Director',
      context: 'Reviewed 400+ tech candidates',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80',
      comment: 'The formatting on the Modern and Minimal templates is top-tier. ATS software parses the plaintext cleanly, and the JSON backup feature makes it trivial to store resumes in GitHub dotfiles.',
      badge: 'Hiring Manager',
    },
    {
      name: 'Devon Miller',
      role: 'Cloud Infrastructure Architect',
      context: 'Open-Source Contributor',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&q=80',
      comment: 'Zero telemetry and client-side only local storage. My personal phone number and career history are never stored in a corporate cloud database. Prashant built something truly remarkable here.',
      badge: 'Privacy Advocate',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/60 text-amber-800 text-xs font-bold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Community Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Loved by Students & Job Seekers Worldwide
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Real feedback from professionals who took control of their job hunt without predatory subscriptions.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-xs hover:shadow-lg hover:border-brand-300 hover:bg-white transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                    {rev.badge}
                  </span>
                </div>

                <Quote className="w-6 h-6 text-slate-300 mb-2" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-6">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-4 border-t border-slate-200/60 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-xs shrink-0"
                />
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-900 truncate">{rev.name}</div>
                  <div className="text-[11px] text-slate-500 truncate">{rev.role}</div>
                  <div className="text-[10px] text-brand-600 font-medium truncate">{rev.context}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
