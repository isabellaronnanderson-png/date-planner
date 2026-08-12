import { useEffect, useState } from 'react';
import SavedPlacesTab from './pages/SavedPlacesTab';
import PlanTab from './pages/PlanTab';
import { getPlaces, addPlace, updatePlace, deletePlace, getCities } from './lib/storage';

const HEADER_PHOTOS = [
  '/photos/header-1.jpg',
  '/photos/header-2.jpg',
  '/photos/header-3.jpg',
  '/photos/header-4.jpg',
  '/photos/header-5.jpg',
  '/photos/header-6.jpg',
  '/photos/header-7.jpg',
  '/photos/header-8.jpg'
];

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
        <div className="photo-header">
          <div className="photo-grid">
            {HEADER_PHOTOS.map((src, i) => (
              <img key={i} src={src} alt="" />
            ))}
          </div>
          <div className="title-overlay">
            <div className="title-card">
              <h1 className="title-card-text">Dispatch</h1>
            </div>
          </div>
        </div>

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
