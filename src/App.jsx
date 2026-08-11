import { useEffect, useState } from 'react';
import SavedPlacesTab from './pages/SavedPlacesTab';
import PlanTab from './pages/PlanTab';
import { getPlaces, addPlace, updatePlace, deletePlace, getCities } from './lib/storage';

const today = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

export default function App() {
  const [tab, setTab] = useState('saved');
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    setPlaces(getPlaces());
  }, []);

  function handleAdd(place) {
    addPlace(place);
    setPlaces(getPlaces());
  }

  function handleToggleFavorite(id) {
    const place = places.find((p) => p.id === id);
    updatePlace(id, { favorite: !place.favorite });
    setPlaces(getPlaces());
  }

  function handleToggleVisited(id) {
    const place = places.find((p) => p.id === id);
    updatePlace(id, { visited: !place.visited });
    setPlaces(getPlaces());
  }

  function handleDelete(id) {
    deletePlace(id);
    setPlaces(getPlaces());
  }

  const cities = getCities();

  const teaser =
    places.length === 0
      ? 'Start your collection — save a few favorite spots, then let Dispatch plan the day.'
      : `Featuring ${places.length} saved ${places.length === 1 ? 'spot' : 'spots'} across ${cities.length} ${cities.length === 1 ? 'city' : 'cities'}${cities.length > 0 ? `, from ${cities.slice(0, 3).join(' to ')}` : ''} — plan your next perfect day below.`;

  return (
    <div className="app-shell">
      <header className="masthead">
        <div className="masthead-top">
          <span>Issue 01</span>
          <span>{today}</span>
        </div>

        <h1 className="masthead-title">Dispatch</h1>
        <div className="masthead-rule" />
        <p className="masthead-teaser">{teaser}</p>

        <nav className="tab-row">
          <button className={`tab-stub ${tab === 'saved' ? 'active' : ''}`} onClick={() => setTab('saved')}>
            Saved places
          </button>
          <button className={`tab-stub ${tab === 'plan' ? 'active' : ''}`} onClick={() => setTab('plan')}>
            Plan a day
          </button>
        </nav>

        <div className="masthead-foot">
          <div className="barcode" aria-hidden="true">
            {Array.from({ length: 28 }).map((_, i) => (
              <span key={i} style={{ width: (i * 7) % 3 === 0 ? 3 : 1.5 }} />
            ))}
          </div>
          <span className="masthead-foot-label">dispatch · single edition</span>
        </div>
      </header>

      <main>
        {tab === 'saved' && (
          <SavedPlacesTab
            places={places}
            cities={cities}
            onAdd={handleAdd}
            onToggleFavorite={handleToggleFavorite}
            onToggleVisited={handleToggleVisited}
            onDelete={handleDelete}
          />
        )}
        {tab === 'plan' && <PlanTab places={places} cities={cities} />}
      </main>
    </div>
  );
}
