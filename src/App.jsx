import { useEffect, useState } from 'react';
import SavedPlacesTab from './pages/SavedPlacesTab';
import PlanTab from './pages/PlanTab';
import { getPlaces, addPlace, updatePlace, deletePlace, getCities } from './lib/storage';
import { SquiggleUnderline } from './components/icons';

const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

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

  return (
    <div className="app-shell">
      <header className="masthead">
        <div className="masthead-top">
          <span>Vol. I, single edition</span>
          <span>{today}</span>
        </div>
        <h1 className="masthead-title">Dispatch</h1>
        <SquiggleUnderline className="masthead-doodle" />
        <div className="masthead-tagline">A guide to the perfect day out</div>

        <nav className="tab-row">
          <button className={`tab-stub ${tab === 'saved' ? 'active' : ''}`} onClick={() => setTab('saved')}>
            Saved places
          </button>
          <button className={`tab-stub ${tab === 'plan' ? 'active' : ''}`} onClick={() => setTab('plan')}>
            Plan a day
          </button>
        </nav>
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
