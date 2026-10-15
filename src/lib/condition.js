// Shared condition → badge style map (used by ProductCard and ProductPage).
export const CONDITION_STYLE = {
  Novo: { bg: 'rgba(16,185,129,0.14)', fg: '#0f9d6f', dot: '#10b981' },
  Seminovo: { bg: 'rgba(245,158,11,0.16)', fg: '#b45309', dot: '#f59e0b' },
  Usado: { bg: 'rgba(10,10,12,0.06)', fg: '#4a4a52', dot: '#8a8a92' },
  Restaurado: { bg: 'rgba(230,36,41,0.14)', fg: '#c1121f', dot: '#e62429' },
  // fallback for English terms during migration
  Excellent: { bg: 'rgba(16,185,129,0.14)', fg: '#0f9d6f', dot: '#10b981' },
  Good: { bg: 'rgba(10,10,12,0.06)', fg: '#4a4a52', dot: '#8a8a92' },
  Fair: { bg: 'rgba(245,158,11,0.16)', fg: '#b45309', dot: '#f59e0b' },
  Restored: { bg: 'rgba(230,36,41,0.14)', fg: '#c1121f', dot: '#e62429' },
};
