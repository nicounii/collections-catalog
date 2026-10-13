# src/

## Responsibility
React application source code for "Acervo do Marvete" (Sale Catalog Site) - a vintage/comic book and collectibles e-commerce catalog. Provides UI components, state management, routing via hash, data models, and utilities for browsing products, managing cart, filtering by categories, and serving static documentation pages.

## Design Patterns
- Component-based architecture (React functional components with hooks)
- Context API for global state management (CartContext)
- Custom hooks for reusable logic (useProducts, useCart, useHashRoute)
- Hash-based routing for in-app doc pages (no external router dependency)
- Separation of concerns: components (UI), context (state), hooks (logic), data (models), lib (utilities), pages (route views)
- Composition over inheritance with reusable UI primitives (Reveal, Plate)
- Data-driven UI with generated product catalog from Airtable

## Data & Control Flow
1. App initializes via `main.jsx` mounting into DOM
2. Product data loaded from `data/products.generated.json` (generated via sync script from Airtable, falls back to `products.sample.json`)
3. Products exposed via `data/products.js` (exports `products`, `CATEGORIES`, `byCategory`, etc.)
4. Hash routing via `useHashRoute` hook tracks URL fragment changes
5. Cart state managed globally via `CartContext` provider (add/remove/update/clear)
6. Components consume state via custom hooks (useCart, useProducts) and context
7. User interactions flow: components → hooks/context → state updates → re-render
8. Cloudinary image optimization via `cldUrl` utility for product/media images
9. WhatsApp negotiation links generated via `whatsapp.js` utility

## Integration Points
- Consumed by: `main.jsx` → `App.jsx`
- Depends on: React, React DOM, Vite
- Key modules: components (UI), context (cart state), hooks (logic), data (catalog), lib (utils), pages (doc routes)
- External: Cloudinary (image CDN), WhatsApp (negotiation), Airtable (data source via sync)
