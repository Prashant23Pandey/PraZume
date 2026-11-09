import React from 'react';
import { Star, Sparkles } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const stories = [
    {
      quote: "I had been a loyal FlowCV user for 3 years until they placed downloads behind subscriptions. PraZume gives me the exact same typographic control, 2-column layout flexibility, and zero paywalls.",
      author: "Manvi Varshney",
      role: "Staff Product Designer",
      badge: "Design Leader",
      rating: 5,
    },
    {
      quote: "As a college student applying to 50+ internships, having to pay $19 just to download a revised PDF was infuriating. PraZume is lightning fast, 100% free, and helped me get my first offer in 2 weeks.",
      author: "Ravi Verma",
      role: "Recent CS Graduate",
      badge: "Student / New Grad",
      rating: 5,
    },
    {
      quote: "The formatting on the Modern and Minimal templates is top-tier. ATS software parses the plaintext cleanly, and the JSON backup feature makes it trivial to store resumes in GitHub dotfiles.",
      author: "Jaish Jaiswal",
      role: "Engineering Director",
      badge: "Hiring Manager",
      rating: 5,
    },
    {
      quote: "Zero telemetry and client-side only local storage. My personal phone number and career history are never stored in a corporate cloud database. Prashant built something truly remarkable here.",
      author: "Prakhar Chaurasia",
      role: "Cloud Infrastructure Architect",
      badge: "Privacy Advocate",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#fbf9fe] border-t border-purple-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (Photo 1 Aesthetic: Student Stories) */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100/60 border border-purple-200/80 text-purple-700 text-[11px] font-sans font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Community Voices</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-serif font-black text-slate-900 tracking-tight">
            Student <span className="italic font-normal text-purple-600">Stories</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-sans leading-relaxed">
            Real experiences from students, career switchers, and engineers building job-winning resumes without subscription paywalls.
          </p>
        </div>

        {/* Featured Hero Testimonial Card (Exact Photo 1 Styling) */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="bg-white rounded-[32px] sm:rounded-[40px] p-8 sm:p-14 shadow-xl border border-slate-100 text-center relative">
            <p className="font-serif italic text-xl sm:text-2xl text-slate-800 leading-relaxed mb-6 font-normal">
              "I have been using PraZume for my career applications for months now, and I myself have seen drastic changes in my confidence and interview callbacks."
            </p>
            <p className="font-sans text-xs sm:text-sm font-bold tracking-widest text-purple-600 uppercase">
              - Krithvik Dixit
            </p>
          </div>
        </div>

        {/* Supporting Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-[28px] bg-white border border-purple-100/80 shadow-md hover:shadow-xl hover:border-purple-200 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(story.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-sans font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
                    {story.badge}
                  </span>
                </div>

                <p className="font-serif italic text-sm text-slate-700 leading-relaxed mb-6">
                  "{story.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <div className="font-sans font-bold text-xs text-slate-900">{story.author}</div>
                <div className="font-sans text-[11px] text-purple-600 font-medium">{story.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
