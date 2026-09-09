import type { DocBlock, EditorFile, EducationItem } from '$lib/types';

export const education = [
  {
    degree: 'B.Sc. in Computer Science',
    institution: 'Dian Nuswantoro University',
    location: 'Indonesia',
    startYear: 2025,
    endYear: 2029,
    notes: [
      'Focus on software engineering and always learning AI/ML',
      'Active in the DOSCOM (Dinus Open Source Community) as a programming division'
    ]
  },
  {
    degree: 'High School Diploma',
    institution: 'SMKN 8 Semarang',
    location: 'Semarang, Indonesia',
    startYear: 2022,
    endYear: 2025,
    notes: ['Focus on software engineering', 'Active in the SnapanDev community']
  }
] as const satisfies readonly EducationItem[];

function toBlocks(items: readonly EducationItem[]): DocBlock[] {
  const blocks: DocBlock[] = [{ type: 'heading', level: 2, text: 'Education' }];
  for (const item of items) {
    blocks.push({ type: 'heading', level: 3, text: item.degree });
    blocks.push({
      type: 'paragraph',
      text: `${item.institution} · ${item.location} · ${item.startYear} – ${item.endYear}`
    });
    if (item.notes.length > 0) {
      blocks.push({ type: 'list', items: item.notes });
    }
  }
  return blocks;
}

export const educationFile = {
  id: 'education',
  name: 'EDUCATION.md',
  title: 'Education',
  blocks: toBlocks(education)
} satisfies EditorFile;
