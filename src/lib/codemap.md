# src/lib/

## Responsibility
Utility functions and helper libraries for formatting, image optimization, routing, pagination, markdown rendering, and external integrations.

## Design Patterns
- Pure utility functions (format.js, paginate.js, cloudinary.js)
- Custom hooks (useHashRoute.js)
- Component utilities (markdown.jsx exports renderMarkdown)
- External service helpers (whatsapp.js)
- Testable pure functions (paginate has tests)

## Key Utilities
- **cloudinary.js**: Cloudinary image URL optimization
  - `isCldUrl(url)`: Detects Cloudinary delivery URLs
  - `cldUrl(url, options)`: Adds transformation params (w,h,crop,quality,format) after `/image/upload/`
  - Passes through non-Cloudinary URLs unchanged
- **format.js**: Formatting utilities
  - `brl(n)`: Formats number as BRL currency (pt-BR)
  - `gbp(n)`: Alias for brl (backward compat)
  - `lotNumber(lot)`: Extracts numeric part from lot string
- **paginate.js**: Pure pagination helper
  - `paginate(items, page, pageSize)`: Returns `{ items, totalPages, page }` with clamping
  - Handles edge cases (empty lists, invalid pages)
  - Has unit tests in `paginate.test.js`
- **useHashRoute.js**: Hash routing hook (see hooks section)
- **whatsapp.js**: WhatsApp deep-link helper
  - `WHATSAPP_PHONE`: Configurable phone number (E.164 digits)
  - `waLink({ phone, text })`: Generates wa.me URL with encoded text
- **markdown.jsx**: Lightweight markdown renderer
  - `renderMarkdown(md)`: Renders headings, paragraphs, lists, bold, links, blockquotes to React elements
  - Rewrites relative doc links to hash routes
  - No dangerouslySetInnerHTML, no external deps

## Data & Control Flow
Utilities called from components as needed for formatting (prices), pagination (catalog), image optimization (ProductMedia), routing (App), markdown rendering (DocPage), and external links (ProductCard).

## Integration Points
- Consumed by: Catalog (paginate), ProductMedia (cldUrl), ProductCard (waLink, format), App (useHashRoute), DocPage (markdown), Footer (format if needed)
- Depends on: React (markdown.jsx, useHashRoute.js)
