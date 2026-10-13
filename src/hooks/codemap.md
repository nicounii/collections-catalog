# src/hooks/

## Responsibility
Custom React hooks providing reusable logic for routing and cart operations.

## Design Patterns
- Custom hooks (use* naming convention)
- Encapsulation of side effects and stateful logic
- Abstraction over browser APIs and context consumption
- SSR-safe patterns with useSyncExternalStore

## Key Hooks
- **useCart.js**: Convenience hook for consuming CartContext
  - Returns cart context value `{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemCount }`
  - Throws error if used outside CartProvider
- **useProducts.js**: (if present) Manages product data access
- **useHashRoute.js**: Hash-based routing hook
  - Uses `useSyncExternalStore` to subscribe to `hashchange` events
  - Returns current `window.location.hash`
  - SSR-safe (getServerSnapshot returns empty string)

## Data & Control Flow
1. useCart accesses CartContext via useContext and validates provider existence
2. useHashRoute subscribes to hash changes, providing reactive hash value to App.jsx
3. Components call hooks to get state and actions
4. Hook state changes propagate to components

## Integration Points
- Consumed by: ProductCard/CartDrawer/Nav (useCart), App.jsx (useHashRoute)
- Depends on: src/context/CartContext.js, React hooks (useContext, useSyncExternalStore)
