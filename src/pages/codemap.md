# src/pages/

## Responsibility
Page-level components for route-based views (hash-routed documentation pages).

## Design Patterns
- Page component pattern
- Props-driven content rendering
- Integration with markdown renderer

## Key Pages
- **DocPage.jsx**: Documentation page component
  - Renders markdown content via `renderMarkdown()` from lib/markdown.jsx
  - Includes "Voltar ao acervo" (back to catalog) link
  - Applies doc prose styling

## Data & Control Flow
1. App.jsx determines if current hash matches a doc route
2. Loads markdown content from docs/*.md (via Vite raw imports)
3. Passes markdown to DocPage component
4. DocPage renders via markdown renderer

## Integration Points
- Consumed by: App.jsx (when doc route matched)
- Depends on: src/lib/markdown.jsx, src/components/icons.jsx
