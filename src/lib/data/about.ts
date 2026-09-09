import type { DocBlock, EditorFile } from '$lib/types';

const aboutBlocks = [
  { type: 'heading', level: 2, text: 'Who I Am' },
  { type: 'portrait' },
  {
    type: 'paragraph',
    text: 'I am Afriansyah Yogatama (commonly known as Afrians Yoga), a fullstack developer who enjoys the whole journey of a product: modeling the data, shaping the API, and polishing the interface until it feels right. My roots are in full-stack web development with PHP, TypeScript, and Python.'
  },
  {
    type: 'paragraph',
    text: 'Lately, I’ve been exploring AI/ML engineering, learning about things like retrieval-augmented generation, LLM-powered features, and model serving. I’m still learning, but I enjoy treating ML as another engineering discipline: something to understand, experiment with, and build around.'
  },
  { type: 'heading', level: 2, text: 'What I Do' },
  {
    type: 'list',
    items: [
      'Full-stack web development (SvelteKit, Next.js, Laravel, FastAPI)',
      'API design and database modeling (PostgreSQL, MySQL)',
      'Exploring AI/ML through RAG, LLM applications, and model serving',
      'Containerized deployments and CI-friendly workflows (Docker, Linux)'
    ]
  },
  {
    type: 'code',
    lang: 'ts',
    content:
      "const me = {\n\trole: 'Fullstack Developer',\n\tExploreing: 'AI/ML',\n\topenTo: building & learning\n};"
  },
  { type: 'heading', level: 2, text: 'By the Numbers' },
  {
    type: 'stats',
    items: [
      { label: 'Years of Experience', value: 3, suffix: '+' },
      { label: 'Projects Shipped', value: 20, suffix: '+' },
      { label: 'Technologies', value: 23 },
      { label: 'Cups of Coffee', value: 9999, suffix: '+' }
    ]
  },
  { type: 'heading', level: 2, text: 'Currently' },
  {
    type: 'paragraph',
    text: 'Building AI-assisted tooling on a SvelteKit + FastAPI stack, reading transformer papers more slowly than I would like, and looking for a team where engineering quality and ML curiosity both matter.'
  }
] as const satisfies readonly DocBlock[];

export const aboutFile = {
  id: 'about',
  name: 'ABOUT.md',
  title: 'About Me',
  blocks: aboutBlocks
} as const satisfies EditorFile;
