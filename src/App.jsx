import { CartProvider } from './context/CartContext.jsx';
import Announcement from './components/Announcement.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Catalog from './components/Catalog.jsx';
import Vault from './components/Vault.jsx';
import CategoryRail from './components/CategoryRail.jsx';
import Heritage from './components/Heritage.jsx';
import OnTheBlock from './components/OnTheBlock.jsx';
import Journal from './components/Journal.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import { byCategory } from './data/products.js';

export default function App() {
  return (
    <CartProvider>
      <Announcement />
      <Nav />
      <main>
        <Hero />
        <CategoryRail items={byCategory('Novidades')} eyebrow="Acabou de chegar" title="Novidades" variant="light" />
        <CategoryRail items={byCategory('Quadrinhos')} eyebrow="HQs & Mangás" title="Quadrinhos" variant="dark" />
        <CategoryRail items={byCategory('Marvel Comics')} eyebrow="Casa das Ideias" title="Marvel Comics" variant="light" />
        <CategoryRail items={byCategory('DC Comics')} eyebrow="Universo DC" title="DC Comics" variant="dark" />
        <Vault />
        <CategoryRail items={byCategory('Action Figures')} eyebrow="Colecionáveis" title="Action Figures" variant="light" />
        <CategoryRail items={byCategory('Retro Gaming')} eyebrow="Clássicos dos games" title="Retro Gaming" variant="dark" />
        <CategoryRail items={byCategory('Livros de Coleção')} eyebrow="Art books & guias" title="Livros de Coleção" variant="light" />
        <Catalog />
        <Heritage />
        <OnTheBlock />
        <Journal />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
