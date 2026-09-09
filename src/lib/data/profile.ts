import type { Profile } from '$lib/types';

export const profile = {
  name: 'Afrians Yoga',
  fullName: 'Afriansyah Yogatama',
  alternateNames: ['Afrians Yoga', 'Ayt', 'afriansyogs'],
  initials: 'Ayt',
  role: 'Fullstack Developer',
  focus: 'AI/ML Enthusiast',
  heroBio:
    'I build things for the web from end to end, and lately, I’ve been exploring AI/ML to see what I can build with it.',
  location: 'Indonesia',
  email: 'afriansyoga@gmail.com',
  availability: 'Open to Opportunities',
  resumeUrl: '/cv/CV_Afriansyah_Yogatama.pdf',
  socials: [
    { label: 'GitHub', href: 'https://github.com/afriansyogs', icon: 'github' },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/afriansyah-yogatama-204758318/',
      icon: 'linkedin'
    },
    { label: 'Email', href: 'mailto:afriansyoga@gmail.com', icon: 'mail' }
  ]
} as const satisfies Profile;
