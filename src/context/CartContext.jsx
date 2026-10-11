import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { products } from '../data/products.js';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [lines, setLines] = useState([]); // [{ id, qty }]
  const [open, setOpen] = useState(false);
  const [pulse, setPulse] = useState(0); // animates the bag glyph on add

  const add = useCallback((id) => {
    setLines((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l));
      return [...prev, { id, qty: 1 }];
    });
    setPulse((p) => p + 1);
  }, []);

  const setQty = useCallback((id, qty) => {
    setLines((prev) =>
      qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l))
    );
  }, []);

  const remove = useCallback((id) => setLines((prev) => prev.filter((l) => l.id !== id)), []);
  const clear = useCallback(() => setLines([]), []);

  const detailed = useMemo(
    () =>
      lines
        .map((l) => {
          const p = products.find((x) => x.id === l.id);
          return p ? { ...l, product: p } : null;
        })
        .filter(Boolean),
    [lines]
  );

  const count = useMemo(() => lines.reduce((a, l) => a + l.qty, 0), [lines]);
  const subtotal = useMemo(() => detailed.reduce((a, l) => a + l.product.price * l.qty, 0), [detailed]);

  const value = useMemo(
    () => ({ lines: detailed, add, setQty, remove, clear, count, subtotal, open, setOpen, pulse }),
    [detailed, add, setQty, remove, clear, count, subtotal, open, pulse]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
