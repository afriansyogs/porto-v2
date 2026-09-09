import type { NavItem } from '$lib/types';

export const dockNavItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' }
] as const satisfies readonly NavItem[];

export const footerNavItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' }
] as const satisfies readonly NavItem[];

export const sectionIds = [
  'home',
  'about',
  'skills',
  'projects',
  'experience',
  'faq',
  'contact'
] as const satisfies readonly string[];
