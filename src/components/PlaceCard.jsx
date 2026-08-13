import CategoryStamp from './CategoryStamp';
import { isClosingSoon, daysUntil } from '../lib/planGenerator';
import { categoryMeta } from '../lib/categories';
import { currencyForCity } from '../lib/currency';

export default function PlaceCard({ place, onToggleFavorite, onToggleVisited, onDelete }) {
  const closing = isClosingSoon(place);
  const daysLeft = daysUntil(place.exhibitionEndDate);
  const meta = categoryMeta(place.category);
  const currency = currencyForCity(place.city);

  return (
    <div className="place-card" style={{ '--accent': `var(${meta.cssVar})` }}>
      {closing && <div className="closing-pill">closing in {daysLeft}d</div>}

      <div className="place-card-top">
        <div>
          <CategoryStamp category={place.category} />
          <div className="place-name">{place.name}</div>
          <div className="place-meta">
            <span>{place.city}</span>
            {place.cost != null && place.cost !== '' && <span>· ~{currency}{place.cost}</span>}
          </div>
        </div>
        <button
          className={`fav-btn ${place.favorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(place.id)}
          title={place.favorite ? 'Remove from favorites' : 'Mark as favorite'}
          aria-label="Toggle favorite"
        >
          {place.favorite ? '♥' : '♡'}
        </button>
      </div>

      {place.exhibitionEndDate && (
        <div className="place-meta" style={{ marginTop: 8 }}>
          on view through {place.exhibitionEndDate}
        </div>
      )}

      {place.notes && <div className="place-notes">{place.notes}</div>}

      <div className="place-actions">
        <button
          className={`btn btn-sm ${place.visited ? '' : 'btn-ghost'}`}
          onClick={() => onToggleVisited(place.id)}
        >
          {place.visited ? '✓ been there' : 'mark visited'}
        </button>
        <button className="btn btn-sm btn-ghost" onClick={() => onDelete(place.id)}>
          remove
        </button>
      </div>
    </div>
  );
}
