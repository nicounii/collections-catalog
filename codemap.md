# Repository Atlas: Sale Catalog Site (Acervo do Marvete)

## Project Responsibility
A React-based vintage/comic book and collectibles e-commerce catalog. Enables users to browse products, filter by category, search by name, sort, paginate, add items to cart, manage cart quantities, and view documentation pages. Built with Vite, styled with Tailwind CSS, with product data synced from Airtable.

## System Entry Points
- `index.html`: HTML entry point mounting the React app
- `src/main.jsx`: React application bootstrap (renders App into DOM)
- `src/App.jsx`: Root component with CartProvider, hash routing, doc/home switching
- `package.json`: Dependencies (React, Vite) and scripts (dev, build, sync, preview)
- `vite.config.js`: Vite build configuration
- `scripts/sync-catalog.mjs`: Airtable sync script (generates products.generated.json)

## Directory Map (Aggregated)
| Directory | Responsibility Summary | Detailed Map |
|-----------|------------------------|--------------|
| `src/` | Root application source with component architecture, state management, routing, data, and utilities | [View Map](src/codemap.md) |
| `src/components/` | UI components for layout, product display, cart, filtering, navigation, and content sections | [View Map](src/components/codemap.md) |
| `src/context/` | Global cart state management via React Context API | [View Map](src/context/codemap.md) |
| `src/data/` | Product catalog data (generated from Airtable) with constants and navigation config | [View Map](src/data/codemap.md) |
| `src/hooks/` | Custom React hooks for cart operations and hash routing | [View Map](src/hooks/codemap.md) |
| `src/lib/` | Utilities for formatting, image optimization, pagination, markdown rendering, routing, WhatsApp links | [View Map](src/lib/codemap.md) |
| `src/pages/` | Page components for routed views (documentation pages) | [View Map](src/pages/codemap.md) |
