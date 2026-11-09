import { ResumeData, CustomizationSettings } from '../types/resume';

export const defaultResumeData: ResumeData = {
  personalDetails: {
    fullName: 'Alex Vance',
    jobTitle: 'Senior Full Stack Engineer & Cloud Architect',
    email: 'alex.vance@example.dev',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA (Open to Remote)',
    website: 'https://alexvance.dev',
    github: 'https://github.com/alexvance-dev',
    linkedin: 'https://linkedin.com/in/alexvance-dev',
    summary: 'High-impact Software Engineer with 7+ years of experience architecting distributed cloud systems, high-concurrency web applications, and local-first frontend architectures. Proven track record of spearheading micro-frontends, cutting API latency by 45%, and championing clean code and CI/CD best practices.',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  },
  workExperience: [
    {
      id: 'exp-1',
      company: 'Vortex Cloud Solutions',
      position: 'Staff Frontend Engineer',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: '',
      current: true,
      highlights: [
        'Architected a high-performance web dashboard processing over 120,000 real-time telemetry metrics per second with sub-16ms frame render times.',
        'Led migration from monolithic legacy codebase to modern React, TypeScript, and Vite, reducing CI/CD build duration from 22 minutes to 3.5 minutes.',
        'Mentored 8 mid-level engineers, instituted automated unit/integration testing standards resulting in 91% code coverage and a 38% decrease in production bugs.'
      ]
    },
    {
      id: 'exp-2',
      company: 'Aether Technologies',
      position: 'Senior Software Engineer',
      location: 'Austin, TX',
      startDate: '2019-06',
      endDate: '2022-02',
      current: false,
      highlights: [
        'Designed and implemented offline-first client storage caching layer utilizing IndexedDB and Web Workers, boosting client-side perceived performance by 65%.',
        'Co-authored internal component library and design system adopted by 14 cross-functional product teams.',
        'Engineered responsive document generation service outputting high-fidelity PDF and vector graphics directly in the client browser.'
      ]
    },
    {
      id: 'exp-3',
      company: 'Nexus Interactive',
      position: 'Frontend Developer',
      location: 'Seattle, WA',
      startDate: '2017-08',
      endDate: '2019-05',
      current: false,
      highlights: [
        'Built dynamic customer-facing analytics dashboards using React, Redux, and D3.js visualization engines.',
        'Optimized critical rendering paths and asset bundles, achieving Google Lighthouse scores of 98+ across Desktop and Mobile.'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'University of Washington',
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science & Software Engineering',
      location: 'Seattle, WA',
      startDate: '2013-09',
      endDate: '2017-06',
      gpa: '3.85 / 4.0',
      highlights: [
        'Dean\'s Honor List (All Quarters)',
        'President of Open Source Software Club; organized 4 university hackathons with 600+ participants.',
        'Relevant Coursework: Distributed Systems, Advanced Algorithms, Web Architecture, Compiler Design.'
      ]
    }
  ],
  skills: [
    { id: 'sk-1', name: 'React / Next.js', level: 'Expert', category: 'Frontend' },
    { id: 'sk-2', name: 'TypeScript', level: 'Expert', category: 'Languages' },
    { id: 'sk-3', name: 'Tailwind CSS', level: 'Expert', category: 'Frontend' },
    { id: 'sk-4', name: 'Node.js / Express', level: 'Advanced', category: 'Backend' },
    { id: 'sk-5', name: 'GraphQL & REST', level: 'Advanced', category: 'Backend' },
    { id: 'sk-6', name: 'Docker / Kubernetes', level: 'Intermediate', category: 'DevOps' },
    { id: 'sk-7', name: 'PostgreSQL & Redis', level: 'Advanced', category: 'Databases' },
    { id: 'sk-8', name: 'AWS Cloud Architecture', level: 'Advanced', category: 'DevOps' },
    { id: 'sk-9', name: 'Automated Testing (Vitest/Jest/Playwright)', level: 'Advanced', category: 'Testing' }
  ],
  customSections: [
    {
      id: 'cs-1',
      title: 'Projects & Open Source',
      entries: [
        {
          id: 'ent-1',
          title: 'HyperRender Engine',
          subtitle: 'Creator & Lead Maintainer',
          date: '2023 - Present',
          location: 'github.com/alexvance-dev/hyper-render',
          description: 'A zero-dependency lightweight canvas-based data visualizer for streaming time-series metrics. Featured on GitHub Trending with 1,800+ stars.'
        },
        {
          id: 'ent-2',
          title: 'DocuCraft — Local Document Studio',
          subtitle: 'Architect',
          date: '2021 - 2022',
          location: 'Online Web App',
          description: '100% client-side privacy-first markdown and diagram editor with instant PDF compilation and local encryption.'
        }
      ]
    },
    {
      id: 'cs-2',
      title: 'Certifications & Honors',
      entries: [
        {
          id: 'ent-3',
          title: 'AWS Certified Solutions Architect – Professional',
          subtitle: 'Amazon Web Services',
          date: '2023',
          location: 'Credential ID: AWS-9812401',
          description: 'Demonstrated mastery in designing and deploying dynamically scalable, highly available, fault-tolerant, and reliable enterprise systems on AWS.'
        }
      ]
    }
  ]
};

export const defaultCustomization: CustomizationSettings = {
  layout: {
    templateId: 'modern',
    headerPosition: 'top',
    columns: 2,
    leftColumnWidthPercent: 34,
  },
  typography: {
    fontFamily: 'Sans',
    baseFontSize: 9.5,
    headingFontSize: 13,
    nameFontSize: 24,
  },
  spacing: {
    lineSpacing: 1.35,
    spaceBetweenSections: 16,
    pageMargins: 12,
  },
  styling: {
    primaryColor: '#0284c7', // Brand Sky Blue
    textColor: '#1e293b',    // Slate 800
    backgroundColor: '#ffffff',
    headerBgColor: '#f0f9ff', // Soft Sky tint
    showPhoto: true,
    photoShape: 'rounded',
    photoSize: 85,
    linkStyle: 'colored',
  }
};

