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

// A loose hand-drawn illustration for the side margin of the page —
// a compass, a paper-plane trail, a coffee cup and a couple of stars,
// scattered like doodles in a travel notebook.
export function SideDoodle(props) {
  return (
    <svg viewBox="0 0 100 480" fill="none" {...props}>
      {/* compass */}
      <circle cx="46" cy="60" r="30" stroke="currentColor" strokeWidth="2.2" />
      <path d="M46 34 L54 58 L46 86 L38 58 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="46" cy="60" r="3" fill="currentColor" />
      <path d="M46 22 v8 M46 90 v8 M8 60 h8 M76 60 h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* dotted trail */}
      <path
        d="M46 100 C 20 140, 70 170, 40 205 S 20 260, 55 290"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="1 10"
        strokeLinecap="round"
      />

      {/* paper plane */}
      <path d="M14 240 L58 222 L38 268 L30 248 L14 240 Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M30 248 L58 222" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />

      {/* coffee cup */}
      <path d="M24 330 h34 l-2 26 a15 15 0 0 1 -15 13 h-0 a15 15 0 0 1 -15 -13 z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M58 336 h8 a8 8 0 0 1 1 16 h-7" stroke="currentColor" strokeWidth="2.2" />
      <path d="M32 320 q2 -5 -1 -9 M42 320 q2 -5 -1 -9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />

      {/* stars */}
      <path d="M78 300 l2.4 5 5 2.4 -5 2.4 -2.4 5 -2.4 -5 -5 -2.4 5 -2.4 Z" fill="currentColor" />
      <path d="M18 410 l1.8 3.8 3.8 1.8 -3.8 1.8 -1.8 3.8 -1.8 -3.8 -3.8 -1.8 3.8 -1.8 Z" fill="currentColor" />

      {/* closing squiggle */}
      <path d="M20 430 C 40 420, 55 445, 75 432" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
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
