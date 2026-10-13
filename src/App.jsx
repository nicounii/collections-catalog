import { useEffect, lazy, Suspense } from 'react';
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
import DocPage from './pages/DocPage.jsx';
import { useHashRoute } from './lib/useHashRoute.js';
import { byCategory } from './data/products.js';
import faq from '../docs/faq.md?raw';
import conditionGuide from '../docs/condition-guide.md?raw';
import shippingReturns from '../docs/shipping-returns.md?raw';

const AdminPage = lazy(() => import('./pages/AdminPage.jsx'));

// Trust docs are surfaced as hash routes so they get shareable URLs.
const DOCS = {
  '#/faq': faq,
  '#/condicao': conditionGuide,
  '#/envio': shippingReturns,
};

function Home() {
  return (
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
  );
}

export default function App() {
  const hash = useHashRoute();
  const doc = DOCS[hash];

  useEffect(() => {
    if (doc) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    const id = hash.replace(/^#/, '');
    if (id && id !== 'top') {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [hash, doc]);

  return (
    <CartProvider>
      {(() => {
        const isAdmin =
          window.location.pathname.replace(/\/+$/, '') === '/admin' ||
          hash === '#/admin';
        if (isAdmin) return (
          <Suspense fallback={<div className="min-h-screen bg-ink" />}>
            <AdminPage />
          </Suspense>
        );
        return null;
      })() || (
        <>
          <Announcement />
          <Nav />
          {doc ? <DocPage markdown={doc} /> : <Home />}
          <Footer />
          <CartDrawer />
        </>
      )}
    </CartProvider>
  );
}
