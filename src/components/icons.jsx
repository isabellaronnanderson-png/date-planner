// Small hand-drawn-style line icons, single color, currentColor stroke.
// Kept loose and a little imperfect on purpose — no perfectly round circles
// or straight-ruler lines, in keeping with the sketched menu-doodle feel.

const base = {
  viewBox: '0 0 40 40',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round'
};

export function BreakfastIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M10 15 h16 l-1 12 a7 7 0 0 1 -7 6 h-1 a7 7 0 0 1 -7 -6 z" />
      <path d="M26 17 h4 a4 4 0 0 1 0.5 8 h-3.5" />
      <path d="M14 9 q2 -3 -0.5 -5.5" />
      <path d="M20 9 q2 -3 -0.5 -5.5" />
    </svg>
  );
}

export function DayActivityIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M20 14 a6.5 6 0 1 1 -0.3 0 z" />
      <path d="M20 4 v4" />
      <path d="M20 32 v4" />
      <path d="M8 20 h4" />
      <path d="M28 20 h4" />
      <path d="M11 11 l3 3" />
      <path d="M26 26 l3 3" />
      <path d="M29 11 l-3 3" />
      <path d="M14 26 l-3 3" />
    </svg>
  );
}

export function NightActivityIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M25 8 a12 12 0 1 0 8 19 a9.5 9.5 0 0 1 -8 -19 z" />
      <path d="M11 12 l1.3 2.6 L15 16 l-2.7 1.3 L11 20 l-1.3 -2.7 L7 16 l2.7 -1.4 Z" />
    </svg>
  );
}

export function DinnerIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M13 6 v11 a3 3 0 0 0 6 0 V6" />
      <path d="M16 6 v28" />
      <path d="M27 6 c-2 3 -2 8 0 11 v17" />
      <path d="M27 6 v9" />
    </svg>
  );
}

export function DrinksIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M11 7 h18 l-2.5 12 a5.5 5.5 0 0 1 -5.4 4.5 h-2.2 a5.5 5.5 0 0 1 -5.4 -4.5 z" />
      <path d="M20 23.5 v9" />
      <path d="M14 34 h12" />
      <path d="M13 12 h14" />
    </svg>
  );
}

// A loose hand-drawn underline squiggle, used beneath the wordmark.
export function SquiggleUnderline(props) {
  return (
    <svg viewBox="0 0 240 20" fill="none" {...props}>
      <path
        d="M4 12 C 40 4, 70 18, 110 9 S 180 3, 236 13"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
