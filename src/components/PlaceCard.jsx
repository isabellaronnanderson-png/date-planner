import CategoryStamp from './CategoryStamp';
import { isClosingSoon, daysUntil } from '../lib/planGenerator';

export default function PlaceCard({ place, onToggleFavorite, onToggleVisited, onDelete }) {
  const closing = isClosingSoon(place);
  const daysLeft = daysUntil(place.exhibitionEndDate);

  return (
    <div className="ticket">
      {closing && (
        <div className="stamp-closing">
          closing in {daysLeft}d
        </div>
      )}

      <div className="ticket-top">
        <div>
          <div className="ticket-name">{place.name}</div>
          <div className="ticket-meta">
            <span>{place.city}</span>
            {place.cost != null && place.cost !== '' && <span>~${place.cost}</span>}
          </div>
        </div>
        <button
          className={`ticket-fav-btn ${place.favorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(place.id)}
          title={place.favorite ? 'Remove from favorites' : 'Mark as favorite'}
          aria-label="Toggle favorite"
        >
          {place.favorite ? '♥' : '♡'}
        </button>
      </div>

      <div className="ticket-perf" />

      <CategoryStamp category={place.category} />

      {place.exhibitionEndDate && (
        <div className="ticket-meta" style={{ marginTop: 6 }}>
          on view through {place.exhibitionEndDate}
        </div>
      )}

      {place.notes && <div className="ticket-notes">{place.notes}</div>}

      <div className="ticket-actions">
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
