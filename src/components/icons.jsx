export const Icon = {
  Search: (p) => (
    <svg viewBox="0 0 24 24" {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  Heart: (p) => (
    <svg viewBox="0 0 24 24" {...p}>
      <path d="M12 20s-7-4.4-9.2-8.4C1.2 8.7 2.7 5.5 6 5.5c2 0 3.2 1.2 4 2.4.8-1.2 2-2.4 4-2.4 3.3 0 4.8 3.2 3.2 6.1C19 15.6 12 20 12 20Z" />
    </svg>
  ),
  Bag: (p) => (
    <svg viewBox="0 0 24 24" {...p}>
      <path d="M6 8h12l1 12H5L6 8Z" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" />
    </svg>
  ),
  Menu: (p) => (
    <svg viewBox="0 0 24 24" {...p}>
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  ),
  Close: (p) => (
    <svg viewBox="0 0 24 24" {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  Arrow: (p) => (
    <svg viewBox="0 0 24 24" {...p}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  ),
  Chevron: (p) => (
    <svg viewBox="0 0 24 24" {...p}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  ),
  Plus: (p) => (
    <svg viewBox="0 0 24 24" {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  Minus: (p) => (
    <svg viewBox="0 0 24 24" {...p}>
      <path d="M5 12h14" />
    </svg>
  ),
  Gavel: (p) => (
    <svg viewBox="0 0 24 24" {...p}>
      <path d="m14 4 6 6-4 4-6-6 4-4Z" />
      <path d="m9 9-5 5 4 4 5-5" />
      <path d="M3 21h9" />
    </svg>
  ),
  Shield: (p) => (
    <svg viewBox="0 0 24 24" {...p}>
      <path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  Truck: (p) => (
    <svg viewBox="0 0 24 24" {...p}>
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  ),
  Scale: (p) => (
    <svg viewBox="0 0 24 24" {...p}>
      <path d="M12 4v16M7 20h10" />
      <path d="M4 8h16M6 8l-3 6h6L6 8Zm12 0-3 6h6l-3-6Z" />
    </svg>
  ),
};

export const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};
