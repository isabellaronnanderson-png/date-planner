import { useEffect, useRef, useState } from 'react';
import { CATEGORIES } from '../lib/categories';
import { searchPlaces } from '../lib/placesApi';

const emptyForm = {
  name: '',
  city: '',
  address: '',
  category: 'breakfast',
  cost: '',
  notes: '',
  exhibitionEndDate: '',
  lat: null,
  lng: null,
  googlePlaceId: null
};

export default function PlaceForm({ cities, defaultCity, onSave, onClose }) {
  const [form, setForm] = useState({ ...emptyForm, city: defaultCity || '' });
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchNote, setSearchNote] = useState('');
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const found = await searchPlaces(query, form.city);
        setResults(found);
        setSearchNote(found.length === 0 ? 'No matches — you can still enter this place manually below.' : '');
      } catch (err) {
        setSearchNote('Place search isn\u2019t available right now — enter details manually below.');
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 400);
    return () => clearTimeout(debounceRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  function selectResult(r) {
    setForm((f) => ({
      ...f,
      name: r.name,
      address: r.address,
      lat: r.lat,
      lng: r.lng,
      googlePlaceId: r.googlePlaceId
    }));
    setQuery('');
    setResults([]);
  }

  function submit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.city.trim()) return;
    onSave({
      ...form,
      cost: form.cost === '' ? null : Number(form.cost)
    });
  }

  const showExhibitionField = form.category.startsWith('activity');

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>Add a place</h3>
          <button className="close-x" onClick={onClose} aria-label="Close">×</button>
        </div>

        <form className="stack" onSubmit={submit}>
          <div className="field autocomplete-wrap">
            <label htmlFor="search">Search (optional)</label>
            <input
              id="search"
              placeholder="Start typing a place name…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
            {searching && <div className="hint">Searching…</div>}
            {searchNote && <div className="hint">{searchNote}</div>}
            {results.length > 0 && (
              <div className="autocomplete-list">
                {results.map((r) => (
                  <div key={r.googlePlaceId} className="autocomplete-item" onClick={() => selectResult(r)}>
                    <strong>{r.name}</strong>
                    <div className="hint">{r.address}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div className="field">
              <label htmlFor="city">City</label>
              <input
                id="city"
                required
                list="city-list"
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              />
              <datalist id="city-list">
                {cities.map((c) => (
                  <option key={c} value={c} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="field">
            <label htmlFor="address">Address</label>
            <input
              id="address"
              value={form.address}
              onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
            />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="cost">Approx. cost</label>
              <input
                id="cost"
                type="number"
                min="0"
                placeholder="e.g. 25"
                value={form.cost}
                onChange={(e) => setForm((f) => ({ ...f, cost: e.target.value }))}
              />
            </div>
          </div>

          {showExhibitionField && (
            <div className="field">
              <label htmlFor="exhibitionEnd">On view through (optional, for exhibitions)</label>
              <input
                id="exhibitionEnd"
                type="date"
                value={form.exhibitionEndDate}
                onChange={(e) => setForm((f) => ({ ...f, exhibitionEndDate: e.target.value }))}
              />
            </div>
          )}

          <div className="field">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              rows={2}
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
            />
          </div>

          <div className="ticket-actions">
            <button type="submit" className="btn btn-primary">Save place</button>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
