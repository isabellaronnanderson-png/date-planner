import { averagePairwiseDistance } from './geo';

const REQUIRED_CATEGORIES = {
  day: ['breakfast', 'activity-day'],
  evening: ['drinks', 'dinner', 'activity-night']
};

const OPTIONAL_CATEGORY = {
  day: 'drinks',
  evening: null
};

// Rough default cost estimates used only when a place has no cost entered,
// so budget filtering still works for partially-filled data.
const DEFAULT_COST_ESTIMATE = {
  breakfast: 12,
  'activity-day': 15,
  'activity-night': 20,
  dinner: 30,
  drinks: 12
};

const CLOSING_SOON_WINDOW_DAYS = 21;
const MAX_CANDIDATES_PER_CATEGORY = 8; // keeps the combo search fast & sane

export function daysUntil(dateStr) {
  if (!dateStr) return null;
  const end = new Date(dateStr + 'T00:00:00');
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diffMs = end - now;
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

export function isClosingSoon(place) {
  const d = daysUntil(place.exhibitionEndDate);
  return d != null && d >= 0 && d <= CLOSING_SOON_WINDOW_DAYS;
}

function estimatedCost(place) {
  if (place.cost != null && place.cost !== '') return Number(place.cost);
  return DEFAULT_COST_ESTIMATE[place.category] ?? 15;
}

function scoreCombo(combo, mode) {
  const avgDist = averagePairwiseDistance(combo);
  // If we don't have coordinates for enough places, treat proximity as neutral
  // rather than penalizing — better to still produce a plan.
  const proximityScore = avgDist == null ? 2 : avgDist;

  let bonus = 0;
  for (const place of combo) {
    if (isClosingSoon(place)) bonus += 3; // strongly prioritize expiring exhibitions
    if (mode === 'favorites' && place.favorite) bonus += 1.5;
    if (mode === 'new' && !place.visited) bonus += 1;
    if (mode === 'new' && place.visited) bonus -= 0.5;
  }

  return proximityScore - bonus;
}

function cartesian(buckets) {
  // buckets: array of arrays -> array of combos (arrays)
  return buckets.reduce(
    (acc, bucket) => acc.flatMap((combo) => bucket.map((item) => [...combo, item])),
    [[]]
  );
}

// Pre-trim each category bucket to the most promising candidates so the
// cartesian product stays small even with a large saved-places list.
function trimBucket(bucket, mode) {
  return [...bucket]
    .sort((a, b) => {
      const scoreA = (isClosingSoon(a) ? 3 : 0) + (mode === 'favorites' && a.favorite ? 1.5 : 0) + (mode === 'new' && !a.visited ? 1 : 0);
      const scoreB = (isClosingSoon(b) ? 3 : 0) + (mode === 'favorites' && b.favorite ? 1.5 : 0) + (mode === 'new' && !b.visited ? 1 : 0);
      return scoreB - scoreA;
    })
    .slice(0, MAX_CANDIDATES_PER_CATEGORY);
}

/**
 * Generate a suggested day plan.
 *
 * @param {Object} opts
 * @param {Array} opts.places - all saved places
 * @param {string} opts.city - city to plan in (required)
 * @param {'day'|'evening'} opts.timeOfDay
 * @param {number|null} opts.budget - max total estimated spend, or null for no limit
 * @param {'any'|'favorites'|'new'} opts.mode
 * @param {boolean} opts.includeOptionalDrink - for day plans, try to add a drink after
 */
export function generatePlan({ places, city, timeOfDay, budget = null, mode = 'any', includeOptionalDrink = true }) {
  if (!city) {
    return { ok: false, reason: 'no_city' };
  }

  const cityPlaces = places.filter(
    (p) => (p.city || '').trim().toLowerCase() === city.trim().toLowerCase()
  );

  const required = REQUIRED_CATEGORIES[timeOfDay];
  const buckets = required.map((cat) => cityPlaces.filter((p) => p.category === cat));

  const missing = required.filter((cat, i) => buckets[i].length === 0);
  if (missing.length > 0) {
    return { ok: false, reason: 'missing_category', missing };
  }

  const trimmedBuckets = buckets.map((b) => trimBucket(b, mode));
  let combos = cartesian(trimmedBuckets);

  if (budget != null) {
    const filtered = combos.filter((combo) => combo.reduce((sum, p) => sum + estimatedCost(p), 0) <= budget);
    // Only apply the budget filter if it leaves us something to work with —
    // otherwise fall back to unfiltered so we still return a plan.
    if (filtered.length > 0) combos = filtered;
  }

  if (combos.length === 0) {
    return { ok: false, reason: 'no_combo' };
  }

  const scored = combos
    .map((combo) => ({ combo, score: scoreCombo(combo, mode) }))
    .sort((a, b) => a.score - b.score);

  let best = scored[0].combo;

  // Try to attach an optional drink stop for day plans.
  const optionalCat = OPTIONAL_CATEGORY[timeOfDay];
  let optionalStop = null;
  if (optionalCat && includeOptionalDrink) {
    const optionalCandidates = trimBucket(
      cityPlaces.filter((p) => p.category === optionalCat),
      mode
    );
    if (optionalCandidates.length > 0) {
      const withDistances = optionalCandidates
        .map((p) => ({ p, d: averagePairwiseDistance([...best, p]) }))
        .sort((a, b) => (a.d ?? 99) - (b.d ?? 99));
      const candidate = withDistances[0]?.p;
      if (candidate) {
        const totalWithDrink = [...best, candidate].reduce((sum, p) => sum + estimatedCost(p), 0);
        if (budget == null || totalWithDrink <= budget) {
          optionalStop = candidate;
        }
      }
    }
  }

  const fullPlan = optionalStop ? [...best, optionalStop] : best;
  const totalCost = fullPlan.reduce((sum, p) => sum + estimatedCost(p), 0);
  const avgDistance = averagePairwiseDistance(fullPlan);
  const closingSoonStops = fullPlan.filter(isClosingSoon).map((p) => p.id);

  return {
    ok: true,
    timeOfDay,
    city,
    stops: labelStops(best, optionalStop, timeOfDay),
    totalCost,
    avgDistanceKm: avgDistance,
    closingSoonStops,
    hasCoordinates: fullPlan.every((p) => p.lat != null && p.lng != null)
  };
}

function labelStops(requiredCombo, optionalStop, timeOfDay) {
  const order = timeOfDay === 'day' ? ['breakfast', 'activity-day'] : ['drinks', 'dinner', 'activity-night'];
  const byCategory = {};
  for (const p of requiredCombo) byCategory[p.category] = p;

  const stops = order
    .filter((cat) => byCategory[cat])
    .map((cat) => ({ slot: slotLabel(cat), place: byCategory[cat] }));

  if (optionalStop) {
    stops.push({ slot: 'drink after', place: optionalStop });
  }
  return stops;
}

function slotLabel(category) {
  const labels = {
    breakfast: 'breakfast',
    'activity-day': 'by day',
    drinks: 'drinks',
    dinner: 'dinner',
    'activity-night': 'by night'
  };
  return labels[category] || category;
}
