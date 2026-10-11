export const brl = (n) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 2,
  }).format(n);

// Keep gbp as alias for backward compat during migration
export const gbp = brl;

export const lotNumber = (lot) => lot.replace(/[^0-9]/g, '');
