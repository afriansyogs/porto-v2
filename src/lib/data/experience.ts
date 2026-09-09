import type { ExperienceItem } from '$lib/types';

export const experience = [
  {
    role: 'Frontend Developer & QA',
    company: 'PT INOVASI SOLUSI DIGITAL',
    location: 'Indonesia · Remote',
    start: 'Aug 2026',
    current: true,
    achievements: [
      'Built scalable and responsive web applications using SvelteKit with reusable component architectures',
      'Implemented SSR and CSR strategies and optimized frontend performance through code splitting, lazy loading, and efficient API handling',
      'Implemented a test-driven development approach, writing unit and integration tests to ensure code quality and reliability',
      'Created and executed test cases, performed functional and regression testing, and documented bugs to ensure application quality'
    ],
    tags: ['TypeScript', 'Svelte', 'Tailwind CSS', 'QA']
  },
  {
    role: 'Full-Stack Developer',
    company: 'Zi.Care',
    location: 'Semarang, Indonesia · On-site',
    start: 'Feb 2024',
    end: 'Des 2024',
    achievements: [
      'Contributed to building Zi.Hub, a healthcare web platform integrated with SATUSEHAT, supporting digital transformation in the medical sector',
      'Developed a responsive frontend using Vue.js and handled backend services using the Phalcon PHP framework to ensure reliable performance',
      'Created and executed test cases, performed functional testing, and identified and documented bugs'
    ],
    tags: ['Javascript', 'Vue.js', 'Phalcon PHP', 'MySQL', 'QA Testing']
  },
  {
    role: 'Web Developer',
    company: 'UNNES',
    location: 'Semarang, Indonesia · On-site',
    start: 'Oct 2023',
    end: 'Des 2023',
    achievements: [
      'Developed a web-based thesis management system using native PHP and Bootstrap for a responsive frontend',
      'Led the project by coordinating the team, defining goals, and overseeing project execution',
      'Designed an intuitive user interface and seamless user experience using Figma'
    ],
    tags: ['JavaScript', 'PHP', 'Bootstrap', 'Figma']
  }
] as const satisfies readonly ExperienceItem[];
