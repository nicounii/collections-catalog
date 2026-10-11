# src/context/

## Responsibility
Global state management for shopping cart functionality using React Context API.

## Design Patterns
- React Context API for state propagation
- Provider pattern with CartProvider component
- Custom hook pattern (useCart) for consuming context
- Reducer-like state updates via methods (addToCart, removeFromCart, updateQuantity, clearCart)

## Key Contexts
- **CartContext.js**: Creates CartContext and CartProvider
  - State: `cart` array containing cart items `{ id, name, price, image, category, quantity }`
  - Methods:
    - `addToCart(product)`: Adds product to cart or increments quantity if already exists
    - `removeFromCart(productId)`: Removes item from cart
    - `updateQuantity(productId, quantity)`: Updates item quantity (removes if quantity <= 0)
    - `clearCart()`: Clears all cart items
    - `getCartTotal()`: Calculates total price
    - `getCartItemCount()`: Calculates total item count

## Data & Control Flow
1. CartProvider wraps app at root level (App.jsx)
2. Components call `useCart()` hook to access cart state and methods
3. Cart mutations update cart state via setCart
4. Context value changes trigger re-renders in all consuming components
5. Cart calculations (total, count) computed on-demand from current cart state

## Integration Points
- Consumed by: ProductCard, Cart, CartItem (via useCart hook)
- Provided by: App.jsx (CartProvider)
- Depends on: React (createContext, useState)
