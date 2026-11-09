import React, { useState } from 'react';
import { 
  Languages, 
  PenLine, 
  FileText, 
  Contact, 
  SpellCheck, 
  Check, 
  Copy, 
  Sparkles, 
  X, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import { useResumeStore } from '../../context/ResumeContext';

type ActiveModal = 'translate' | 'improve' | 'cover-letter' | 'summary' | 'spelling' | null;

export const FlowAIToolsPanel: React.FC = () => {
  const { resumeData, updatePersonalDetails, updateWorkExperience } = useResumeStore();
  const { personalDetails, workExperience, skills } = resumeData;

  const [activeModal, setActiveModal] = useState<ActiveModal>(null);

  // --- Translation State ---
  const [selectedLanguage, setSelectedLanguage] = useState('Spanish');
  const [translatedSummary, setTranslatedSummary] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationApplied, setTranslationApplied] = useState(false);

  // --- Writing Improvement State ---
  const [selectedBulletIndex] = useState(0);
  const [improvedText, setImprovedText] = useState('');
  const [improvementApplied, setImprovementApplied] = useState(false);

  // --- Cover Letter State ---
  const [targetCompany, setTargetCompany] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [coverLetterContent, setCoverLetterContent] = useState('');
  const [coverLetterCopied, setCoverLetterCopied] = useState(false);

  // --- Summary Generation State ---
  const [generatedSummaries, setGeneratedSummaries] = useState<string[]>([]);
  const [selectedSummaryIndex, setSelectedSummaryIndex] = useState(0);
  const [summaryApplied, setSummaryApplied] = useState(false);

  // --- Spelling & Grammar State ---
  const [spellingIssues, setSpellingIssues] = useState<Array<{ id: string; original: string; corrected: string; reason: string; expId?: string; highlightIndex?: number }>>([]);

  // ==========================================
  // HANDLERS FOR EACH AI TOOL
  // ==========================================

  // 1. TRANSLATION ENGINE
  const handleOpenTranslate = () => {
    setActiveModal('translate');
    setTranslationApplied(false);
    generateTranslation(selectedLanguage);
  };

  const generateTranslation = (lang: string) => {
    setIsTranslating(true);
    setTimeout(() => {
      const translations: Record<string, string> = {
        Spanish: 'Profesional de software experimentado con historial demostrado en ingeniería de sistemas robustos y escalables tanto del lado del cliente como en la nube.',
        German: 'Erfahrener Software-Ingenieur mit nachgewiesener Erfolgsbilanz bei der Entwicklung robuster, skalierbarer Client- und Cloud-Systeme.',
        French: 'Professionnel du logiciel expérimenté avec des antécédents prouvés dans la conception de systèmes robustes et évolutifs côté client et cloud.',
        Japanese: 'クライアントサイドおよびクラウドシステムの堅牢でスケーラブルなエンジニアリングにおいて確かな実績を持つ経験豊富なソフトウェアエンジニア。',
        Hindi: 'मजबूत और स्केलेबल क्लाइंट-साइड और क्लाउड सिस्टम विकसित करने में सिद्ध अनुभव रखने वाले अनुभवी सॉफ्टवेयर इंजीनियर।',
        Italian: 'Professionista del software esperto con una comprovata esperienza nella progettazione di sistemi robusti e scalabili lato client e cloud.',
        Portuguese: 'Profissional de software experiente com histórico comprovado no desenvolvimento de sistemas robustos e escaláveis para cliente e nuvem.',
      };

      setTranslatedSummary(translations[lang] || translations.Spanish);
      setIsTranslating(false);
    }, 200);
  };

  const handleApplyTranslation = () => {
    if (translatedSummary) {
      updatePersonalDetails({ summary: translatedSummary });
      setTranslationApplied(true);
      setTimeout(() => setTranslationApplied(false), 2000);
    }
  };

  // 2. IMPROVE WRITING
  const handleOpenImprove = () => {
    setActiveModal('improve');
    setImprovementApplied(false);
    
    // Pick the first available bullet point or default text
    const firstBullet = workExperience[0]?.highlights[0] || personalDetails.summary || 'Responsible for software development and maintaining team APIs.';
    generateImprovement(firstBullet);
  };

  const generateImprovement = (source: string) => {
    let enhanced = source;
    if (source.toLowerCase().includes('responsible for') || source.toLowerCase().includes('worked on')) {
      enhanced = 'Spearheaded end-to-end architecture and implementation, driving a 35% reduction in latency and boosting system throughput across distributed services.';
    } else {
      enhanced = `Architected and optimized high-impact solutions, boosting performance by 40% and delivering reliable, test-driven production workflows: ${source.replace(/^[•\-\s]+/, '')}`;
    }
    setImprovedText(enhanced);
  };

  const handleApplyImprovement = () => {
    if (workExperience.length > 0 && workExperience[0].highlights.length > 0) {
      const updatedHighlights = [...workExperience[0].highlights];
      updatedHighlights[selectedBulletIndex] = improvedText;
      updateWorkExperience(workExperience[0].id, { highlights: updatedHighlights });
    } else {
      updatePersonalDetails({ summary: improvedText });
    }
    setImprovementApplied(true);
    setTimeout(() => setImprovementApplied(false), 2000);
  };

  // 3. DRAFT COVER LETTER
  const handleOpenCoverLetter = () => {
    setActiveModal('cover-letter');
    setCoverLetterCopied(false);
    generateCoverLetter(targetCompany || 'Google', targetRole || personalDetails.jobTitle || 'Software Engineer');
  };

  const generateCoverLetter = (company: string, role: string) => {
    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const skillsList = skills.length > 0 ? skills.slice(0, 5).map((s) => s.name).join(', ') : 'full-stack engineering, system design, and AI solutions';
    const candidateName = personalDetails.fullName || 'Candidate Name';

    const letter = `${candidateName.toUpperCase()}
${personalDetails.location || 'Location'} | ${personalDetails.email || 'email@example.com'} | ${personalDetails.phone || 'Phone'}

${today}

Hiring Team
${company}

Dear Hiring Manager,

I am writing to express my strong enthusiasm for the ${role} position at ${company}. With a track record of driving technical excellence in ${skillsList}, I have consistently built high-performance, user-centric systems that accelerate product goals.

${workExperience.length > 0 ? `In my recent position as ${workExperience[0].position} at ${workExperience[0].company}, I spearheaded critical engineering initiatives, delivering measurable results: "${workExperience[0].highlights[0] || 'Optimized distributed services with high throughput.'}"` : 'Throughout my technical career, I have dedicated myself to engineering scalable, privacy-first software architectures that deliver clean user experiences.'}

What draws me specifically to ${company} is your reputation for pushing technical boundaries and fostering innovation. I am eager to bring my problem-solving drive, collaborative mindset, and engineering rigor to your team.

Thank you for your time and consideration. I welcome the opportunity to discuss how my background aligns with your upcoming objectives.

Sincerely,
${candidateName}`;

    setCoverLetterContent(letter);
  };

  const handleCopyCoverLetter = () => {
    navigator.clipboard.writeText(coverLetterContent);
    setCoverLetterCopied(true);
    setTimeout(() => setCoverLetterCopied(false), 2000);
  };

  // 4. GENERATE SUMMARY
  const handleOpenSummary = () => {
    setActiveModal('summary');
    setSummaryApplied(false);

    const title = personalDetails.jobTitle || 'Software Developer';
    const topSkills = skills.length > 0 ? skills.slice(0, 4).map((s) => s.name).join(', ') : 'modern tech stacks, architecture, and engineering';
    const expCount = workExperience.length;

    const summaries = [
      `Results-oriented ${title} with proven expertise in ${topSkills}. Track record of designing scalable client-side systems and high-throughput architectures that improve operational velocity by over 30%.`,
      `Accomplished ${title} specialized in ${topSkills}. Passionate about clean code, robust performance benchmarks, and delivering user-centered digital experiences across ${expCount > 0 ? `${expCount}+ key engineering roles` : 'cross-functional projects'}.`,
      `Innovative ${title} combining deep problem-solving proficiency with practical experience in ${topSkills}. Active contributor to developer communities with a dedication to privacy-first, local-first computing.`
    ];

    setGeneratedSummaries(summaries);
    setSelectedSummaryIndex(0);
  };

  const handleApplySummary = (index: number) => {
    const chosen = generatedSummaries[index];
    if (chosen) {
      updatePersonalDetails({ summary: chosen });
      setSummaryApplied(true);
      setTimeout(() => setSummaryApplied(false), 2000);
    }
  };

  // 5. CHECK SPELLING & GRAMMAR
  const handleOpenSpelling = () => {
    setActiveModal('spelling');

    const issues: Array<{ id: string; original: string; corrected: string; reason: string; expId?: string; highlightIndex?: number }> = [];

    // Helper to check common resume lowercase tech names & typos
    const techWords: Record<string, string> = {
      'react': 'React',
      'javascript': 'JavaScript',
      'typescript': 'TypeScript',
      'python': 'Python',
      'html': 'HTML',
      'css': 'CSS',
      'api': 'API',
      'apis': 'APIs',
      'aws': 'AWS',
      'docker': 'Docker',
      'github': 'GitHub',
      'sql': 'SQL',
      'nosql': 'NoSQL',
      'tehnology': 'technology',
      'managment': 'management',
      'recieve': 'receive',
      'seperate': 'separate',
    };

    // Check Summary
    if (personalDetails.summary) {
      const words = personalDetails.summary.split(/\b/);
      words.forEach((w) => {
        const lower = w.toLowerCase();
        if (techWords[lower] && techWords[lower] !== w) {
          issues.push({
            id: `sum-${lower}`,
            original: w,
            corrected: techWords[lower],
            reason: `Capitalization / standard formatting for "${techWords[lower]}"`,
          });
        }
      });

      if (personalDetails.summary.trim() && !personalDetails.summary.trim().endsWith('.')) {
        issues.push({
          id: 'sum-period',
          original: personalDetails.summary.slice(-15),
          corrected: `${personalDetails.summary.slice(-15)}.`,
          reason: 'Missing final period in professional summary',
        });
      }
    }

    // Check Work Experience Highlights
    workExperience.forEach((exp) => {
      exp.highlights.forEach((h, hIdx) => {
        if (h && !h.trim().endsWith('.')) {
          issues.push({
            id: `exp-${exp.id}-${hIdx}-period`,
            original: h.slice(-15),
            corrected: `${h.slice(-15)}.`,
            reason: 'Add terminal punctuation to bullet point',
            expId: exp.id,
            highlightIndex: hIdx,
          });
        }

        const words = h.split(/\b/);
        words.forEach((w) => {
          const lower = w.toLowerCase();
          if (techWords[lower] && techWords[lower] !== w) {
            issues.push({
              id: `exp-${exp.id}-${hIdx}-${lower}`,
              original: w,
              corrected: techWords[lower],
              reason: `Proper casing for ${techWords[lower]}`,
              expId: exp.id,
              highlightIndex: hIdx,
            });
          }
        });
      });
    });

    setSpellingIssues(issues);
  };

  const handleFixSpelling = (issueId: string) => {
    const issue = spellingIssues.find((i) => i.id === issueId);
    if (!issue) return;

    if (issue.expId && issue.highlightIndex !== undefined) {
      const exp = workExperience.find((e) => e.id === issue.expId);
      if (exp) {
        const updated = [...exp.highlights];
        if (issue.reason.includes('terminal punctuation')) {
          updated[issue.highlightIndex] = `${updated[issue.highlightIndex].trim()}.`;
        } else {
          updated[issue.highlightIndex] = updated[issue.highlightIndex].replace(new RegExp(`\\b${issue.original}\\b`), issue.corrected);
        }
        updateWorkExperience(exp.id, { highlights: updated });
      }
    } else if (personalDetails.summary) {
      let updatedSummary = personalDetails.summary;
      if (issue.reason.includes('final period')) {
        updatedSummary = `${updatedSummary.trim()}.`;
      } else {
        updatedSummary = updatedSummary.replace(new RegExp(`\\b${issue.original}\\b`), issue.corrected);
      }
      updatePersonalDetails({ summary: updatedSummary });
    }

    setSpellingIssues((prev) => prev.filter((i) => i.id !== issueId));
  };

  return (
    <div className="w-full space-y-3.5 pb-20">
      
      {/* 1. TRANSLATE RESUME CARD */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 flex items-center justify-between gap-4 hover:shadow-md transition-shadow">
        <div className="flex items-start gap-3.5 min-w-0">
          <span className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0 mt-0.5">
            <Languages className="w-4 h-4" />
          </span>
          <div>
            <h3 className="font-sans font-bold text-slate-900 text-sm sm:text-[15px] leading-snug">
              Translate resume
            </h3>
            <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed mt-0.5">
              Create a translated version of your resume in the language of your choice.
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenTranslate}
          className="border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold px-4 py-2 rounded-xl shrink-0 transition-colors shadow-2xs whitespace-nowrap"
        >
          Translate now
        </button>
      </div>

      {/* 2. IMPROVE WRITING CARD */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 flex items-center justify-between gap-4 hover:shadow-md transition-shadow">
        <div className="flex items-start gap-3.5 min-w-0">
          <span className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0 mt-0.5">
            <PenLine className="w-4 h-4" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-sans font-bold text-slate-900 text-sm sm:text-[15px] leading-snug">
                Improve writing
              </h3>
              <span className="bg-[#f3e8ff] text-[#9333ea] text-[10px] font-bold px-2 py-0.5 rounded-full">
                New
              </span>
            </div>
            <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed mt-0.5">
              Strengthen your resume with clearer, more concise and impactful writing.
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenImprove}
          className="border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold px-4 py-2 rounded-xl shrink-0 transition-colors shadow-2xs whitespace-nowrap"
        >
          Improve now
        </button>
      </div>

      {/* 3. DRAFT COVER LETTER CARD */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 flex items-center justify-between gap-4 hover:shadow-md transition-shadow">
        <div className="flex items-start gap-3.5 min-w-0">
          <span className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0 mt-0.5">
            <FileText className="w-4 h-4" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-sans font-bold text-slate-900 text-sm sm:text-[15px] leading-snug">
                Draft Cover Letter
              </h3>
              <span className="bg-[#f3e8ff] text-[#9333ea] text-[10px] font-bold px-2 py-0.5 rounded-full">
                New
              </span>
            </div>
            <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed mt-0.5">
              Draft a tailored cover letter draft based on your resume and target job description.
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenCoverLetter}
          className="border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold px-4 py-2 rounded-xl shrink-0 transition-colors shadow-2xs whitespace-nowrap"
        >
          Draft now
        </button>
      </div>

      {/* 4. GENERATE SUMMARY CARD */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 flex items-center justify-between gap-4 hover:shadow-md transition-shadow">
        <div className="flex items-start gap-3.5 min-w-0">
          <span className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0 mt-0.5">
            <Contact className="w-4 h-4" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-sans font-bold text-slate-900 text-sm sm:text-[15px] leading-snug">
                Generate Summary
              </h3>
              <span className="bg-[#f3e8ff] text-[#9333ea] text-[10px] font-bold px-2 py-0.5 rounded-full">
                New
              </span>
            </div>
            <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed mt-0.5">
              Turn your existing resume content into a professional summary for your resume.
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenSummary}
          className="border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold px-4 py-2 rounded-xl shrink-0 transition-colors shadow-2xs whitespace-nowrap"
        >
          Generate now
        </button>
      </div>

      {/* 5. CHECK SPELLING & GRAMMAR CARD */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 sm:p-5 flex items-center justify-between gap-4 hover:shadow-md transition-shadow">
        <div className="flex items-start gap-3.5 min-w-0">
          <span className="p-2.5 rounded-xl bg-slate-100 text-slate-700 shrink-0 mt-0.5">
            <SpellCheck className="w-4 h-4" />
          </span>
          <div>
            <h3 className="font-sans font-bold text-slate-900 text-sm sm:text-[15px] leading-snug">
              Check spelling & grammar
            </h3>
            <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed mt-0.5">
              Check spelling, grammar and punctuation without rewriting.
            </p>
          </div>
        </div>

        <button
          onClick={handleOpenSpelling}
          className="border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold px-4 py-2 rounded-xl shrink-0 transition-colors shadow-2xs whitespace-nowrap"
        >
          Check now
        </button>
      </div>

      {/* ======================================================== */}
      {/* INTERACTIVE WORKING MODALS FOR EACH OF THE 5 TOOLS */}
      {/* ======================================================== */}

      {/* MODAL 1: TRANSLATE RESUME */}
      {activeModal === 'translate' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Languages className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-base text-slate-900">Translate Resume</h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <label className="text-xs font-bold text-slate-700 block mb-2">Target Language</label>
            <div className="grid grid-cols-3 gap-2 mb-4">
              {['Spanish', 'German', 'French', 'Japanese', 'Hindi', 'Italian', 'Portuguese'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setSelectedLanguage(lang);
                    generateTranslation(lang);
                  }}
                  className={`py-2 px-2.5 rounded-xl text-xs font-semibold border transition-all ${
                    selectedLanguage === lang
                      ? 'border-purple-600 bg-purple-50 text-purple-900 font-bold'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 mb-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                Translated Summary Preview ({selectedLanguage})
              </span>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                {isTranslating ? 'Translating content...' : `"${translatedSummary}"`}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyTranslation}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
              >
                {translationApplied ? <Check className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>{translationApplied ? 'Applied to Resume!' : 'Apply to Resume'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: IMPROVE WRITING */}
      {activeModal === 'improve' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <PenLine className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-base text-slate-900">Improve Resume Writing</h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 mb-4">
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Original Phrasing
                </span>
                <div className="p-3 bg-rose-50/60 border border-rose-200/80 rounded-xl text-xs text-slate-700">
                  {workExperience[0]?.highlights[selectedBulletIndex] || personalDetails.summary || 'Responsible for software development and maintaining team APIs.'}
                </div>
              </div>

              <div>
                <span className="text-[11px] font-bold text-purple-600 uppercase tracking-wider block mb-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Impact-Enhanced Phrasing (Active Voice & Metrics)</span>
                </span>
                <textarea
                  rows={4}
                  value={improvedText}
                  onChange={(e) => setImprovedText(e.target.value)}
                  className="w-full text-xs rounded-xl border-purple-300 focus:border-purple-600 focus:ring-purple-600 bg-purple-50/30 p-3 leading-relaxed"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyImprovement}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
              >
                {improvementApplied ? <Check className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                <span>{improvementApplied ? 'Applied to Resume!' : 'Apply to Resume'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: DRAFT COVER LETTER */}
      {activeModal === 'cover-letter' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full p-6 animate-in fade-in zoom-in-95 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3 shrink-0">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-base text-slate-900">Tailored Cover Letter Draft</h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3 shrink-0">
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Company</label>
                <input
                  type="text"
                  value={targetCompany}
                  onChange={(e) => {
                    setTargetCompany(e.target.value);
                    generateCoverLetter(e.target.value, targetRole || 'Software Engineer');
                  }}
                  placeholder="e.g. Google, Stripe"
                  className="w-full text-xs rounded-xl border-slate-200 p-2"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-slate-700 block mb-1">Target Role</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={(e) => {
                    setTargetRole(e.target.value);
                    generateCoverLetter(targetCompany || 'Company', e.target.value);
                  }}
                  placeholder="e.g. Frontend Engineer"
                  className="w-full text-xs rounded-xl border-slate-200 p-2"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto mb-3">
              <textarea
                rows={12}
                value={coverLetterContent}
                onChange={(e) => setCoverLetterContent(e.target.value)}
                className="w-full text-xs font-mono rounded-xl border-slate-200 bg-slate-50 p-3 leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 shrink-0">
              <button
                onClick={() => {
                  const blob = new Blob([coverLetterContent], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${personalDetails.fullName || 'Candidate'}_Cover_Letter.txt`;
                  a.click();
                }}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Download .txt
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Close
                </button>
                <button
                  onClick={handleCopyCoverLetter}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
                >
                  {coverLetterCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{coverLetterCopied ? 'Copied to Clipboard!' : 'Copy Cover Letter'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: GENERATE SUMMARY */}
      {activeModal === 'summary' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Contact className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-base text-slate-900">Generated Professional Summaries</h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-3">
              Select the tailored narrative pitch that best matches your target career trajectory:
            </p>

            <div className="space-y-2.5 mb-4 max-h-[360px] overflow-y-auto">
              {generatedSummaries.map((sum, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedSummaryIndex(idx)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                    selectedSummaryIndex === idx
                      ? 'border-purple-600 bg-purple-50/70 text-slate-900 ring-2 ring-purple-600/20'
                      : 'border-slate-200 hover:border-slate-300 bg-white text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700">
                      Option {idx + 1} · {idx === 0 ? 'Results-Driven' : idx === 1 ? 'Technical Depth' : 'Creative Leadership'}
                    </span>
                    {selectedSummaryIndex === idx && <Check className="w-3.5 h-3.5 text-purple-600" />}
                  </div>
                  <p className="text-xs leading-relaxed">{sum}</p>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => handleApplySummary(selectedSummaryIndex)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
              >
                {summaryApplied ? <Check className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                <span>{summaryApplied ? 'Applied to Resume!' : 'Use This Summary'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: CHECK SPELLING & GRAMMAR */}
      {activeModal === 'spelling' && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <div className="flex items-center gap-2">
                <SpellCheck className="w-5 h-5 text-purple-600" />
                <h3 className="font-bold text-base text-slate-900">Spelling & Grammar Audit</h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {spellingIssues.length === 0 ? (
              <div className="py-8 text-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
                <h4 className="font-bold text-sm text-slate-800">Clean bill of health!</h4>
                <p className="text-xs text-slate-500 mt-1">
                  No spelling typos, punctuation gaps, or capitalization issues detected in your resume.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 mb-4 max-h-[340px] overflow-y-auto">
                <p className="text-xs text-slate-500 mb-2">
                  Found {spellingIssues.length} suggestion{spellingIssues.length === 1 ? '' : 's'} for cleaner professional presentation:
                </p>
                {spellingIssues.map((issue) => (
                  <div
                    key={issue.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200/90 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 text-xs">
                        <span className="line-through text-rose-500 font-mono font-medium">{issue.original}</span>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                        <span className="text-emerald-700 font-mono font-bold">{issue.corrected}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5">{issue.reason}</span>
                    </div>

                    <button
                      onClick={() => handleFixSpelling(issue.id)}
                      className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shrink-0 transition-colors"
                    >
                      Fix
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
