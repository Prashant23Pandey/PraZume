import { ResumeData } from '../types/resume';

export interface ATSCheckResult {
  score: number; // 0 to 100
  tier: 'Excellent' | 'Good' | 'Needs Improvement';
  tierColor: string;
  metrics: {
    contactScore: number;
    summaryScore: number;
    experienceScore: number;
    skillsScore: number;
    metricsScore: number;
  };
  actionVerbsFound: string[];
  metricsFound: string[];
  suggestions: {
    category: 'Contact' | 'Summary' | 'Experience' | 'Skills';
    type: 'success' | 'warning' | 'tip';
    message: string;
  }[];
}

const ACTION_VERBS = [
  'accelerated', 'achieved', 'administered', 'advised', 'analyzed', 'applied',
  'architected', 'automated', 'boosted', 'built', 'championed', 'coached',
  'collaborated', 'composed', 'conceived', 'consolidated', 'constructed',
  'coordinated', 'created', 'curated', 'decreased', 'delivered', 'deployed',
  'designed', 'developed', 'devised', 'directed', 'distributed', 'doubled',
  'eliminated', 'engineered', 'enhanced', 'established', 'evaluated', 'executed',
  'expanded', 'expedited', 'facilitated', 'formulated', 'fostered', 'generated',
  'guided', 'halved', 'headed', 'identified', 'implemented', 'improved',
  'increased', 'initiated', 'innovated', 'instituted', 'integrated', 'invented',
  'investigated', 'launched', 'led', 'managed', 'maximized', 'mentored',
  'migrated', 'minimized', 'modernized', 'negotiated', 'optimized', 'orchestrated',
  'overhauled', 'oversaw', 'partnered', 'pioneered', 'planned', 'prepared',
  'produced', 'programmed', 'projected', 'published', 're-engineered', 'reduced',
  'refined', 'reformed', 'remodeled', 'reorganized', 'replaced', 'restructured',
  'revitalized', 'saved', 'scaled', 'slashed', 'solved', 'spearheaded',
  'standardized', 'streamlined', 'strengthened', 'structured', 'surpassed',
  'synthesized', 'trained', 'transformed', 'upgraded', 'validated', 'yielded'
];

export function analyzeResumeForATS(data: ResumeData): ATSCheckResult {
  const suggestions: ATSCheckResult['suggestions'] = [];
  const actionVerbsFoundSet = new Set<string>();
  const metricsFound: string[] = [];

  // 1. Contact Info Scoring (Max 20 pts)
  let contactScore = 0;
  const { fullName, email, phone, location, linkedin, github, summary } = data.personalDetails;

  if (fullName.trim()) contactScore += 5;
  else suggestions.push({ category: 'Contact', type: 'warning', message: 'Add your full name.' });

  if (email.trim() && email.includes('@')) contactScore += 5;
  else suggestions.push({ category: 'Contact', type: 'warning', message: 'Provide a valid professional email address.' });

  if (phone.trim()) contactScore += 4;
  else suggestions.push({ category: 'Contact', type: 'tip', message: 'Add a contact phone number with country code.' });

  if (location.trim()) contactScore += 3;
  else suggestions.push({ category: 'Contact', type: 'tip', message: 'Specify your city and state or "Open to Remote".' });

  if (linkedin.trim() || github.trim()) {
    contactScore += 3;
    suggestions.push({ category: 'Contact', type: 'success', message: 'Professional links (LinkedIn/GitHub) detected.' });
  } else {
    suggestions.push({ category: 'Contact', type: 'tip', message: 'Include your LinkedIn or GitHub profile link to boost recruiter trust.' });
  }

  // 2. Summary Scoring (Max 15 pts)
  let summaryScore = 0;
  const summaryWords = summary.trim() ? summary.trim().split(/\s+/).length : 0;
  if (summaryWords >= 30 && summaryWords <= 120) {
    summaryScore = 15;
    suggestions.push({ category: 'Summary', type: 'success', message: `Great summary length (${summaryWords} words).` });
  } else if (summaryWords > 0) {
    summaryScore = 8;
    suggestions.push({ category: 'Summary', type: 'tip', message: `Summary is ${summaryWords} words. Aim for 30–80 words for optimal scanability.` });
  } else {
    suggestions.push({ category: 'Summary', type: 'warning', message: 'Add a 2–3 sentence executive summary highlighting your top achievements.' });
  }

  // 3. Experience & Bullet Points (Max 35 pts)
  let experienceScore = 0;
  let totalBullets = 0;
  let bulletsWithVerbs = 0;
  let bulletsWithMetrics = 0;

  if (data.workExperience.length > 0) {
    experienceScore += 10;
    const metricRegex = /(\b\d+(\.\d+)?%|\$\d+[\d,]*(\.\d+)?|\b\d+x\b|\b\d+[\d,]*\b)/gi;

    data.workExperience.forEach((exp) => {
      exp.highlights.forEach((h) => {
        if (!h.trim()) return;
        totalBullets++;

        // Action verb detection
        const words = h.toLowerCase().replace(/[^a-z0-9\s-]/g, '').split(/\s+/);
        const firstFewWords = words.slice(0, 4);
        let foundVerb = false;
        for (const w of firstFewWords) {
          if (ACTION_VERBS.includes(w)) {
            actionVerbsFoundSet.add(w);
            foundVerb = true;
          }
        }
        if (foundVerb) bulletsWithVerbs++;

        // Metric detection
        const match = h.match(metricRegex);
        if (match) {
          bulletsWithMetrics++;
          match.slice(0, 2).forEach((m) => {
            if (!metricsFound.includes(m) && metricsFound.length < 8) {
              metricsFound.push(m);
            }
          });
        }
      });
    });

    // Score based on verb density
    if (totalBullets > 0) {
      const verbRatio = bulletsWithVerbs / totalBullets;
      experienceScore += Math.round(verbRatio * 15);

      const metricRatio = bulletsWithMetrics / totalBullets;
      experienceScore += Math.round(metricRatio * 10);

      if (verbRatio >= 0.6) {
        suggestions.push({ category: 'Experience', type: 'success', message: `${bulletsWithVerbs} of ${totalBullets} bullet points start with strong action verbs.` });
      } else {
        suggestions.push({ category: 'Experience', type: 'tip', message: 'Start bullet points with impactful verbs like "Architected", "Accelerated", "Delivered".' });
      }

      if (metricRatio >= 0.4) {
        suggestions.push({ category: 'Experience', type: 'success', message: 'Strong quantification! Several achievements include metrics or percentages.' });
      } else {
        suggestions.push({ category: 'Experience', type: 'warning', message: 'Add quantifiable results (e.g., "reduced latency by 45%", "mentored 8 engineers").' });
      }
    }
  } else {
    suggestions.push({ category: 'Experience', type: 'warning', message: 'Add at least one work experience or internship entry.' });
  }

  // 4. Skills Scoring (Max 20 pts)
  let skillsScore = 0;
  if (data.skills.length >= 8) {
    skillsScore = 20;
    suggestions.push({ category: 'Skills', type: 'success', message: `Great skill variety (${data.skills.length} skills listed across categories).` });
  } else if (data.skills.length >= 4) {
    skillsScore = 14;
    suggestions.push({ category: 'Skills', type: 'tip', message: 'Add a few more core technical skills or frameworks to boost ATS keyword match.' });
  } else {
    skillsScore = 6;
    suggestions.push({ category: 'Skills', type: 'warning', message: 'List at least 6–8 relevant skills to match ATS job posting keywords.' });
  }

  // 5. Metrics Scoring (Max 10 pts)
  let metricsScore = Math.min(bulletsWithMetrics * 3, 10);

  const totalScore = Math.min(
    Math.round(contactScore + summaryScore + experienceScore + skillsScore + metricsScore),
    100
  );

  let tier: ATSCheckResult['tier'] = 'Needs Improvement';
  let tierColor = 'text-rose-600 bg-rose-50 border-rose-200';
  if (totalScore >= 85) {
    tier = 'Excellent';
    tierColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  } else if (totalScore >= 65) {
    tier = 'Good';
    tierColor = 'text-amber-700 bg-amber-50 border-amber-200';
  }

  return {
    score: totalScore,
    tier,
    tierColor,
    metrics: {
      contactScore,
      summaryScore,
      experienceScore,
      skillsScore,
      metricsScore,
    },
    actionVerbsFound: Array.from(actionVerbsFoundSet),
    metricsFound,
    suggestions,
  };
}

