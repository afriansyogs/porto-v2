import type { ProjectItem } from '$lib/types';

export const projects = [
  {
    slug: 'smartparking',
    title: 'SmartParking',
    image: '/smartparking.webp',
    description:
      'Developed a Smart Parking web platform integrating IoT and Computer Vision to provide real-time parking slot monitoring, QR ticket generation, and improper parking detection with automated alerts, achieving over 85% detection accuracy across varying lighting conditions.',
    tags: [
      'TypeScript',
      'Next.js',
      'FastAPI',
      'Computer Vision',
      'Yolo',
      'Roboflow',
      'IoT',
      'PostgreSQL',
      'WebSocket',
      'SSE',
      'REST API'
    ],
    links: [{ kind: 'repo', href: 'https://github.com/afriansyogs/smart-parkingV2' }],
    year: 2026,
    featured: true
  },
  {
    slug: 'FloraVerse',
    title: 'FloraVerse',
    image: '/FloraVerse.webp',
    description:
      'Developed FloraVerse, an interactive gamified e-learning platform that makes plant education more engaging through AI-powered features for plant identification, learning assistance, and personalized facts, earning 1st Place at FicpactCup2026.',
    tags: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Supabase', 'Gemini API'],
    links: [
      { kind: 'repo', href: 'https://github.com/afriansyogs/FloraVerse' },
      { kind: 'demo', href: 'https://flora-verse.vercel.app/' }
    ],
    year: 2026
  },
  {
    slug: 'Gate Access System',
    title: 'Gate Access System',
    description:
      'Developed an intelligent gate access system that combines RFID authentication and license plate recognition to automate vehicle access control, with centralized communication and real-time gate monitoring.',
    tags: [
      'SvelteKit',
      'Go (Fiber)',
      'Supabase',
      'Python',
      'EasyOCR',
      'OpenCV',
      'FastAPI',
      'Docker'
    ],
    links: [{ kind: 'repo', href: 'https://github.com/afriansyogs/rfid-lpr-gate-system' }],
    year: 2026
  },
  {
    slug: 'ORILOOKSTORE',
    title: 'ORILOOK STORE',
    image: '/ORILOOKSTORE.webp',
    description:
      'Developed a responsive shoe e-commerce platform with an admin dashboard, shipping cost calculation, voucher management, and integrated payment gateway processing to streamline the online shopping experience.',
    tags: ['Javascript', 'PHP', 'Tailwind CSS', 'Laravel Filament', 'MySQL', 'Midtrans'],
    links: [{ kind: 'repo', href: 'https://github.com/afriansyogs/orilook_store' }],
    year: 2025
  }
] as const satisfies readonly ProjectItem[];
