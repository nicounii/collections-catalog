# src/components/

## Responsibility
UI components for the Sale Catalog Site. Provides layout, product display, cart management, filtering, navigation, and content sections.

## Design Patterns
- Functional React components with hooks
- Props-based composition
- Container/presentational patterns (Catalog manages filtering/sorting/pagination, ProductCard displays data)
- Controlled components for search/filter inputs
- Reusable UI primitives (Reveal for animations, Plate for styling, icons)
- Drawer pattern for cart (CartDrawer)

## Key Components
- **App.jsx** (in src/): Root app with CartProvider, hash routing, doc pages vs home
- **Announcement.jsx**: Top announcement bar
- **Nav.jsx**: Navigation header with links and cart indicator
- **Hero.jsx**: Hero section
- **Catalog.jsx**: Main product catalog with search, category filters, sorting, pagination (24 per page). Uses `paginate()` utility
- **CategoryRail.jsx**: Horizontal scrollable product rail for category sections
- **Vault.jsx**: Featured/vault section
- **Heritage.jsx**: About/heritage section
- **OnTheBlock.jsx**: Featured/auction-like section
- **Journal.jsx**: Blog/journal posts section
- **Footer.jsx**: Site footer with links (including FAQ, shipping, conditions via hash routes)
- **CartDrawer.jsx**: Slide-out cart drawer showing items, quantities, totals
- **ProductCard.jsx**: Product card with image, title, maker, price, lot, category, negotiation button (WhatsApp)
- **ProductMedia.jsx**: Product image/media component with Cloudinary optimization via `cldUrl`
- **CartItem.jsx**: (referenced via CartDrawer) Individual cart line item
- **SearchBar.jsx**: Search input component
- **CategoryFilter.jsx**: Category filter component
- **Reveal.jsx**: Animation wrapper component
- **Plate.jsx**: Styled container component
- **icons.jsx**: Icon components (Search, Cart, Arrow, etc.)

## Data & Control Flow
1. Catalog reads products from `data/products.js`, manages filters/sort/page state
2. CategoryRail receives filtered items via `byCategory()`
3. ProductCard receives product data, uses `useCart()` to add to cart, generates WhatsApp link via `waLink()`
4. ProductMedia optimizes images with `cldUrl()` from `lib/cloudinary.js`
5. CartDrawer reads cart state from CartContext via `useCart()`, renders cart items
6. Nav shows cart item count from CartContext
7. Footer links to hash routes (#/faq, #/condicao, #/envio)

## Integration Points
- Consumed by: App.jsx
- Depends on: src/hooks (useCart), src/context (CartContext), src/data (products, byCategory, CATEGORIES), src/lib (paginate, cldUrl, waLink, format)
- Styling: Tailwind CSS classes
