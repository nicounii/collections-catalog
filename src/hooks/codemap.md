# src/hooks/

## Responsibility
Custom React hooks providing reusable logic for data fetching and cart operations.

## Design Patterns
- Custom hooks (use* naming convention)
- Encapsulation of side effects and stateful logic
- Abstraction over data access and context consumption

## Key Hooks
- **useProducts.js**: Manages product data fetching and processing
  - Returns products array from data source
  - Can be extended for async data fetching
- **useCart.js**: Convenience hook for consuming CartContext
  - Returns cart context value `{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartItemCount }`
  - Throws error if used outside CartProvider

## Data & Control Flow
1. useProducts imports from src/data/products.js and returns products
2. useCart accesses CartContext via useContext and validates provider existence
3. Components call hooks to get state and actions
4. Hook state changes propagate to components

## Integration Points
- Consumed by: ProductList (useProducts), ProductCard/Cart/CartItem (useCart)
- Depends on: src/data/products.js, src/context/CartContext.js, React hooks
