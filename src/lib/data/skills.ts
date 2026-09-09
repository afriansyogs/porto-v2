import type { SkillItem } from '$lib/types';

export const skills = [
  { name: 'HTML5', icon: '/img/tech-icon/HTML5.svg' },
  { name: 'CSS3', icon: '/img/tech-icon/CSS3.svg' },
  { name: 'JavaScript', icon: '/img/tech-icon/JavaScript.svg' },
  { name: 'TypeScript', icon: '/img/tech-icon/TypeScript.svg' },
  { name: 'PHP', icon: '/img/tech-icon/PHP.svg' },
  { name: 'Python', icon: '/img/tech-icon/Python.svg' },
  { name: 'Bootstrap', icon: '/img/tech-icon/Bootstrap.svg' },
  { name: 'Tailwind CSS', icon: '/img/tech-icon/Tailwind CSS.svg' },
  { name: 'Svelte', icon: '/img/tech-icon/Svelte.svg' },
  { name: 'React', icon: '/img/tech-icon/React.svg' },
  { name: 'Next.js', icon: '/img/tech-icon/Next.js.svg' },
  { name: 'Vue.js', icon: '/img/tech-icon/Vue.js.svg' },
  { name: 'Express', icon: '/img/tech-icon/Express.svg' },
  { name: 'Laravel', icon: '/img/tech-icon/Laravel.svg' },
  { name: 'Phalcon', icon: '/img/tech-icon/Phalcon.svg' },
  { name: 'FastAPI', icon: '/img/tech-icon/FastAPI.svg' },
  { name: 'PostgreSQL', icon: '/img/tech-icon/PostgresSQL.svg' },
  { name: 'MySQL', icon: '/img/tech-icon/MySQL.svg' },
  { name: 'Linux', icon: '/img/tech-icon/Linux.svg' },
  { name: 'Git', icon: '/img/tech-icon/Git.svg' },
  { name: 'Docker', icon: '/img/tech-icon/Docker.svg' },
  { name: 'Postman', icon: '/img/tech-icon/Postman.svg' },
  { name: 'Figma', icon: '/img/tech-icon/Figma.svg' }
] as const satisfies readonly SkillItem[];

export const aiMlFocus = [
  'Machine Learning',
  'Computer Vision',
  'LLM Apps',
  'RAG Pipelines'
] as const satisfies readonly string[];
