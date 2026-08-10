import { BreakfastIcon, DayActivityIcon, NightActivityIcon, DinnerIcon, DrinksIcon } from '../components/icons';

export const CATEGORIES = [
  { value: 'breakfast', label: 'Breakfast', cssVar: '--mustard', Icon: BreakfastIcon },
  { value: 'activity-day', label: 'Activity — Day', cssVar: '--teal', Icon: DayActivityIcon },
  { value: 'activity-night', label: 'Activity — Night', cssVar: '--navy', Icon: NightActivityIcon },
  { value: 'dinner', label: 'Dinner', cssVar: '--red', Icon: DinnerIcon },
  { value: 'drinks', label: 'Drinks', cssVar: '--plum', Icon: DrinksIcon }
];

export function categoryMeta(value) {
  return CATEGORIES.find((c) => c.value === value) || { label: value, cssVar: '--ink', Icon: null };
}
