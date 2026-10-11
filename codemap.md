# Repository Atlas: Sale Catalog Site

## Project Responsibility
A React-based e-commerce product catalog and shopping cart application. Enables users to browse products, filter by category, search by name, add items to cart, and manage cart quantities with real-time totals.

## System Entry Points
- `index.html`: HTML entry point mounting the React app
- `src/main.jsx`: React application bootstrap (renders App into DOM)
- `src/App.jsx`: Root component setting up providers and layout
- `package.json`: Dependencies (React, Vite) and build scripts
- `vite.config.js`: Vite build configuration

## Directory Map (Aggregated)
| Directory | Responsibility Summary | Detailed Map |
|-----------|------------------------|--------------|
| `src/` | Root application source with component architecture, state management, data, and utilities | [View Map](src/codemap.md) |
| `src/components/` | UI components for product display, cart, filtering, and layout | [View Map](src/components/codemap.md) |
| `src/context/` | Global cart state management via React Context API | [View Map](src/context/codemap.md) |
| `src/data/` | Static product catalog data with consistent schema | [View Map](src/data/codemap.md) |
| `src/hooks/` | Custom React hooks for data access and cart operations | [View Map](src/hooks/codemap.md) |
| `src/lib/` | Utility functions and helper libraries | [View Map](src/lib/codemap.md) |
