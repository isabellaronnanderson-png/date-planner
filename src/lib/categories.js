export const CATEGORIES = [
  { value: 'breakfast', label: 'Breakfast', cssVar: '--mustard' },
  { value: 'activity-day', label: 'Activity — Day', cssVar: '--teal' },
  { value: 'activity-night', label: 'Activity — Night', cssVar: '--navy' },
  { value: 'dinner', label: 'Dinner', cssVar: '--terracotta' },
  { value: 'drinks', label: 'Drinks', cssVar: '--plum' }
];

export function categoryMeta(value) {
  return CATEGORIES.find((c) => c.value === value) || { label: value, cssVar: '--ink' };
}
