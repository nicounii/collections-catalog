# src/

## Responsibility
React application source code for a Sale Catalog Site - a product catalog and shopping cart application. Provides UI components, state management, data models, and utilities for browsing products, managing cart, and filtering by categories.

## Design Patterns
- Component-based architecture (React functional components with hooks)
- Context API for global state management (CartContext)
- Custom hooks for reusable logic (useProducts, useCart)
- Separation of concerns: components (UI), context (state), hooks (logic), data (models), lib (utilities)

## Data & Control Flow
1. App initializes with product data from `data/products.js`
2. Products are loaded via `useProducts` hook which transforms raw data
3. Cart state managed globally via `CartContext` provider
4. User interactions (add to cart, filter, search) flow through components → hooks/context → state updates → re-render
5. Cart operations (add/remove/update quantity) handled by CartContext methods

## Integration Points
- Consumed by: `App.jsx` (root component)
- Depends on: React, React DOM
- Exports: Components, contexts, hooks, data, utilities
