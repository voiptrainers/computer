import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ScrollToTop from './components/ScrollToTop';
import Home from './Home';
import Shop from './Shop';
import ProductDetail from './ProductDetail';
import Cart from './Cart';
import Checkout from './Checkout';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col bg-white text-ink-900">
          <Navbar />
          <CartDrawer />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="*"
                element={
                  <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 px-4 py-32 text-center">
                    <h1 className="font-display text-3xl font-bold text-ink-900">404</h1>
                    <p className="text-ink-500">This page doesn't exist.</p>
                  </div>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}
