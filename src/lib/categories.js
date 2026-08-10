export const CATEGORIES = [
  { value: 'breakfast', label: 'Breakfast', stampClass: 'stamp-breakfast' },
  { value: 'activity-day', label: 'Activity — Day', stampClass: 'stamp-activity-day' },
  { value: 'activity-night', label: 'Activity — Night', stampClass: 'stamp-activity-night' },
  { value: 'dinner', label: 'Dinner', stampClass: 'stamp-dinner' },
  { value: 'drinks', label: 'Drinks', stampClass: 'stamp-drinks' }
];

export function categoryMeta(value) {
  return CATEGORIES.find((c) => c.value === value) || { label: value, stampClass: '' };
}
