export interface NavItem {
  label: string;
  href: `#${string}`;
}

export type SocialIcon = 'github' | 'linkedin' | 'mail';

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIcon;
}

export interface Profile {
  name: string;
  fullName: string;
  alternateNames: readonly string[];
  initials: string;
  role: string;
  focus: string;
  heroBio: string;
  location: string;
  email: string;
  availability: string;
  resumeUrl: string;
  socials: readonly SocialLink[];
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

export type DocBlock =
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: readonly string[] }
  | { type: 'code'; lang: string; content: string }
  | { type: 'stats'; items: readonly StatItem[] }
  | { type: 'portrait' };

export type EditorFileId = 'about' | 'education';

export interface EditorFile {
  id: EditorFileId;
  name: string;
  title: string;
  blocks: readonly DocBlock[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  startYear: number;
  endYear: number;
  notes: readonly string[];
}

export interface SkillItem {
  name: string;
  icon: string;
}

export interface ProjectLink {
  kind: 'repo' | 'demo';
  href: string;
}

export interface ProjectItem {
  slug: string;
  title: string;
  description: string;
  tags: readonly string[];
  links: readonly ProjectLink[];
  year: number;
  featured?: boolean;
  image?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  start: string;
  end?: string;
  current?: boolean;
  achievements: readonly string[];
  tags: readonly string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export type FormState =
  | { status: 'idle' }
  | { status: 'submitting' }
  | { status: 'success' }
  | { status: 'error'; message: string };
