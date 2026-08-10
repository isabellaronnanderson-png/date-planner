import { useMemo, useState } from 'react';
import PlaceCard from '../components/PlaceCard';
import PlaceForm from '../components/PlaceForm';
import { CATEGORIES } from '../lib/categories';

export default function SavedPlacesTab({ places, cities, onAdd, onToggleFavorite, onToggleVisited, onDelete }) {
  const [showForm, setShowForm] = useState(false);
  const [cityFilter, setCityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const filtered = useMemo(() => {
    return places.filter((p) => {
      if (cityFilter !== 'all' && p.city !== cityFilter) return false;
      if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
      if (favoritesOnly && !p.favorite) return false;
      return true;
    });
  }, [places, cityFilter, categoryFilter, favoritesOnly]);

  return (
    <div>
      <div className="section-head">
        <div>
          <span className="section-eyebrow">The collection</span>
          <h2>Saved places</h2>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>+ Add a place</button>
      </div>

      <div className="panel" style={{ marginBottom: 22, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'flex-end' }}>
        <div className="field">
          <label htmlFor="cityFilter">City</label>
          <select id="cityFilter" value={cityFilter} onChange={(e) => setCityFilter(e.target.value)}>
            <option value="all">All cities</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="catFilter">Category</label>
          <select id="catFilter" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option value="all">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <button
          className={`btn btn-sm ${favoritesOnly ? '' : 'btn-ghost'}`}
          onClick={() => setFavoritesOnly((v) => !v)}
        >
          {favoritesOnly ? '♥ favorites only' : '♡ show favorites only'}
        </button>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <h3>Nothing here yet</h3>
          <p>Add a breakfast spot, an exhibition, a bar — anything you'd want on a perfect day out.</p>
        </div>
      ) : (
        <div className="ticket-grid">
          {filtered.map((p) => (
            <PlaceCard
              key={p.id}
              place={p}
              onToggleFavorite={onToggleFavorite}
              onToggleVisited={onToggleVisited}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      {showForm && (
        <PlaceForm
          cities={cities}
          defaultCity={cityFilter !== 'all' ? cityFilter : ''}
          onClose={() => setShowForm(false)}
          onSave={(place) => {
            onAdd(place);
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}
