export const SORT_OPTIONS = [
  {
    name: 'POPULARITY_DESC',
    label: 'Popularity',
    description: 'Most popular first',
  },
  { name: 'SCORE_DESC', label: 'Score', description: 'Highest rated first' },
  { name: 'TITLE_ROMAJI', label: 'A to Z', description: 'Alphabetical order' },
  {
    name: 'START_DATE_DESC',
    label: 'Newest',
    description: 'Recently released first',
  },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]['name'];
