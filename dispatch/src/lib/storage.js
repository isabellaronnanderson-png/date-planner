// Simple localStorage-backed persistence for places.
// Single-device by design (see README for upgrading to a synced backend later).

const KEY = 'dispatch:places:v1';

function readAll() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Dispatch: failed to read saved places', err);
    return [];
  }
}

function writeAll(places) {
  try {
    localStorage.setItem(KEY, JSON.stringify(places));
  } catch (err) {
    console.error('Dispatch: failed to save places', err);
  }
}

export function getPlaces() {
  return readAll();
}

export function addPlace(place) {
  const places = readAll();
  const withId = {
    id: place.id || crypto.randomUUID(),
    name: place.name,
    category: place.category,
    city: place.city,
    address: place.address || '',
    lat: place.lat ?? null,
    lng: place.lng ?? null,
    cost: place.cost ?? null,
    notes: place.notes || '',
    exhibitionEndDate: place.exhibitionEndDate || null,
    favorite: place.favorite || false,
    visited: place.visited || false,
    googlePlaceId: place.googlePlaceId || null,
    createdAt: place.createdAt || new Date().toISOString()
  };
  writeAll([withId, ...places]);
  return withId;
}

export function updatePlace(id, patch) {
  const places = readAll().map((p) => (p.id === id ? { ...p, ...patch } : p));
  writeAll(places);
  return places.find((p) => p.id === id);
}

export function deletePlace(id) {
  writeAll(readAll().filter((p) => p.id !== id));
}

export function getCities() {
  const cities = new Set(readAll().map((p) => p.city).filter(Boolean));
  return Array.from(cities).sort();
}
