import { ResumeData, CustomizationSettings } from '../types/resume';

export const emptyResumeData: ResumeData = {
  personalDetails: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    github: '',
    linkedin: '',
    summary: '',
    photoUrl: '',
  },
  workExperience: [],
  education: [],
  skills: [],
  customSections: [],
};

export const sampleResumeData: ResumeData = {
  personalDetails: {
    fullName: 'PRASHANT PANDEY',
    jobTitle: 'Software Developer – Community Founder – Compassion Advocate',
    email: '23prashantpandey@gmail.com',
    phone: '+91 7991885976',
    location: 'Gautam Buddha Nagar, Greater Noida 201310',
    website: 'https://prashantpandey.dev',
    github: 'https://github.com/prashantpandey',
    linkedin: 'https://linkedin.com/in/prashant23pandey',
    summary: 'Computer Science undergraduate specializing in Artificial Intelligence, combining software engineering expertise with startup leadership. Experienced in designing AI-powered platforms, prompt engineering, and hardware-software integration. Active technical leader who has won 6+ Hackathons, 15+ Hackathon Finalists and mentored 4+ student developer events, and scaled tech-driven communities from the ground up.',
    photoUrl: '/PROFILE1.jpg',
  },
  workExperience: [
    {
      id: 'exp-1',
      company: 'SGCA TECHNOLOGIES PVT. LTD.',
      position: 'Full Stack Developer',
      location: 'Greater Noida, India',
      startDate: '03/2026',
      endDate: '',
      current: true,
      highlights: [
        'Driving product architecture, technology decisions, system design, and end-to-end software development. Built full-stack applications, AI-powered systems, APIs, automation workflows, and security-focused solutions.',
        'Delivered software engineering, machine learning, AI, and cybersecurity solutions across diverse client projects and technical use cases.',
        'Architected high-throughput microservices cutting response latency by 35% with robust caching layers.'
      ]
    },
    {
      id: 'exp-2',
      company: 'HARIT BY HCL FOUNDATION & MASH FOUNDATION',
      position: 'Compassion Advocate',
      location: 'Noida, India',
      startDate: '06/2026',
      endDate: '',
      current: true,
      highlights: [
        'Championed environmental sustainability, green technological initiatives, and community welfare programs reaching 5,000+ local citizens.',
        'Organized and led multi-disciplinary volunteer drives, tree plantation campaigns, and youth environmental awareness workshops.'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      institution: 'Galgotias University',
      degree: 'Bachelor of Technology (B.Tech)',
      fieldOfStudy: 'Computer Science & Engineering (Artificial Intelligence)',
      location: 'Greater Noida, UP',
      startDate: '2022-08',
      endDate: '2026-06',
      gpa: '8.8 / 10.0',
      highlights: [
        '6+ Times National Hackathon Winner & 15+ Times Finalist across premier Indian tech institutions.',
        'Founder & Lead Organizer of developer tech student community with 1,200+ active members.',
        'Relevant Coursework: Machine Learning, Deep Neural Networks, Natural Language Processing, Distributed Systems, Algorithms & Data Structures.'
      ]
    }
  ],
  skills: [
    { id: 'sk-1', name: 'Artificial Intelligence & ML', level: 'Expert', rating: 5, category: 'AI & Data' },
    { id: 'sk-2', name: 'Full Stack Web Development', level: 'Expert', rating: 5, category: 'Engineering' },
    { id: 'sk-3', name: 'React / Next.js / TypeScript', level: 'Expert', rating: 5, category: 'Frontend' },
    { id: 'sk-4', name: 'Python / FastAPI / PyTorch', level: 'Expert', rating: 5, category: 'Backend' },
    { id: 'sk-5', name: 'System Architecture & APIs', level: 'Advanced', rating: 4, category: 'Architecture' },
    { id: 'sk-6', name: 'Prompt Engineering & LLMs', level: 'Expert', rating: 5, category: 'AI & Data' },
    { id: 'sk-7', name: 'Community Leadership', level: 'Expert', rating: 5, category: 'Leadership' },
    { id: 'sk-8', name: 'Cybersecurity Principles', level: 'Advanced', rating: 4, category: 'Security' }
  ],
  customSections: [
    {
      id: 'cs-1',
      title: 'Hackathons & Leadership',
      entries: [
        {
          id: 'ent-1',
          title: '6x National Hackathon Champion',
          subtitle: 'National Level Technical Competitions',
          date: '2023 - 2026',
          location: 'Pan-India',
          description: 'Spearheaded engineering teams to first-place victories building high-impact AI, computer vision, and local-first decentralized applications.'
        },
        {
          id: 'ent-2',
          title: 'PraZume Founder & Architect',
          subtitle: 'Open Source Community Initiative',
          date: '2024 - Present',
          location: 'Global',
          description: 'Engineered a 100% client-side, privacy-respecting resume builder eliminating predatory paywalls and subscription traps for job seekers worldwide.'
        }
      ]
    }
  ]
};

// Default is completely empty as requested: everything added individually by the user
export const defaultResumeData: ResumeData = emptyResumeData;

export const defaultCustomization: CustomizationSettings = {
  layout: {
    templateId: 'modern',
    columnLayout: 'single',
    columns: 1,
    leftColumnWidthPercent: 35,
    headerAlignment: 'top-left',
    headerPosition: 'top',
  },
  typography: {
    fontFamily: 'Playfair Display',
    baseFontSize: 10,
    headingFontSize: 13,
    nameFontSize: 24,
  },
  spacing: {
    lineSpacing: 1.4,
    spaceBetweenSections: 14,
    pageMargins: 12,
  },
  styling: {
    primaryColor: '#0f172a',
    textColor: '#1e293b',
    backgroundColor: '#ffffff',
    sidebarBgColor: '#f8fafc',
    headerBgColor: '#000000',
    showPhoto: true,
    photoShape: 'circle',
    photoSize: 96,
    linkStyle: 'colored',
    showIcons: true,
  }
};
