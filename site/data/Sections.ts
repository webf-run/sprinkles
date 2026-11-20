import { Links } from './Constant';

export type SectionId = 'guide' | 'components' | 'blocks';

/** Top-level sidebar groups that belong to each section. */
export const sectionGroups: Record<SectionId, readonly string[]> = {
  guide: ['Getting Started'],
  components: [
    'Actions',
    'Navigation',
    'Fields',
    'Overlays',
    'Feedback',
    'Layout',
    'Data display',
  ],
  blocks: ['Blocks', 'Cards'],
};

/** URL folders (first path segment) that belong to each section. */
const sectionFolders: Record<SectionId, readonly string[]> = {
  guide: ['getting-started'],
  components: [
    'components',
    'actions',
    'navigation',
    'fields',
    'overlays',
    'feedback',
    'layout',
    'data-display',
  ],
  blocks: ['blocks', 'cards'],
};

export const sections: ReadonlyArray<{
  id: SectionId;
  label: string;
  href: string;
}> = [
  { id: 'guide', label: 'Guide', href: Links.gettingStarted },
  { id: 'components', label: 'Components', href: Links.components },
  { id: 'blocks', label: 'Blocks', href: Links.blocks },
];

/** Which section a pathname belongs to, or undefined (e.g. the home page). */
export function getSection(pathname: string): SectionId | undefined {
  const first = pathname.replace(/^\/+|\/+$/g, '').split('/')[0];
  if (!first) return undefined;
  for (const id of Object.keys(sectionFolders) as SectionId[]) {
    if (sectionFolders[id].includes(first)) return id;
  }
  return 'guide';
}
