# src/components/

## Responsibility
UI components for the Sale Catalog Site. Provides reusable, presentational and container components for product display, cart management, filtering, and layout.

## Design Patterns
- Functional React components with hooks
- Props-based composition
- Container/presentational separation (e.g., ProductList manages data via hooks, ProductCard displays data)
- Controlled components for search/filter inputs
- Component composition for layout (Header, Footer)

## Key Components
- **App.jsx**: Root application component. Sets up CartProvider and renders main layout (Header, ProductList, Cart, Footer)
- **Header.jsx**: Site header with title and cart icon showing item count
- **Footer.jsx**: Site footer
- **ProductList.jsx**: Main product listing. Fetches products via useProducts hook, manages search and category filters, renders ProductCard grid
- **ProductCard.jsx**: Individual product display card showing image, name, price, category, and add to cart button
- **Cart.jsx**: Shopping cart sidebar/modal showing cart items, quantities, totals, and remove/update actions
- **CartItem.jsx**: Individual cart line item with quantity controls and remove button
- **SearchBar.jsx**: Search input for filtering products by name
- **CategoryFilter.jsx**: Category dropdown/filter for filtering products by category

## Data & Control Flow
1. ProductList reads products from useProducts hook
2. SearchBar and CategoryFilter update local filter state in ProductList
3. Filtered products passed to ProductCard components
4. ProductCard triggers addToCart via CartContext (accessed through useCart hook)
5. Cart reads cart state from CartContext and renders CartItem components
6. CartItem triggers updateQuantity/removeFromCart via CartContext

## Integration Points
- Consumed by: App.jsx
- Depends on: src/hooks (useProducts, useCart), src/context (CartContext), src/data (product types via data)
- Styling: CSS modules/classes as defined in component files
