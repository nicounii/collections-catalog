# src/data/

## Responsibility
Static product data and data models for the catalog.

## Design Patterns
- Module-based data export
- Plain JavaScript objects/arrays for static data
- Consistent product schema

## Key Data
- **products.js**: Exports `products` array with product objects
  - Schema: `{ id, name, price, image, category, description }`
  - Contains sample product catalog (e.g., electronics, clothing, accessories)

## Data & Control Flow
1. Products data imported by useProducts hook
2. Hook transforms/processes data as needed
3. Processed data consumed by ProductList component
4. Individual product objects passed to ProductCard

## Integration Points
- Consumed by: src/hooks/useProducts.js
- Depends on: None (static data)
