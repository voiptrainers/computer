import { Link } from 'react-router-dom';
import { X, Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/format';

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, updateQuantity, removeItem, subtotal } = useCart();

  return (
    <>
      <div
        onClick={closeDrawer}
        className={`fixed inset-0 z-50 bg-ink-900/50 backdrop-blur-sm transition-opacity duration-300 ${
          isDrawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-ink-200 bg-white shadow-card-hover transition-transform duration-300 ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-hidden={!isDrawerOpen}
      >
        <div className="flex items-center justify-between border-b border-ink-200 px-6 py-5">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-brand-600" />
            <h2 className="font-display text-base font-bold text-ink-900">Your Cart</h2>
            <span className="rounded-full bg-cream-200 px-2 py-0.5 text-xs text-ink-600">
              {items.reduce((s, i) => s + i.quantity, 0)}
            </span>
          </div>
          <button
            onClick={closeDrawer}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-cream-200 hover:text-ink-900"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cream-200">
              <ShoppingBag className="h-7 w-7 text-ink-300" />
            </div>
            <p className="text-sm text-ink-500">Your cart is empty. Time to gear up.</p>
            <Link to="/shop" onClick={closeDrawer} className="btn-primary">
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              <ul className="flex flex-col gap-5">
                {items.map(({ product, quantity }) => (
                  <li key={product.id} className="flex gap-4">
                    <Link
                      to={`/product/${product.slug}`}
                      onClick={closeDrawer}
                      className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-cream-200"
                    >
                      <img
                        src={product.images[0].url}
                        alt={product.images[0].alt}
                        className="h-full w-full object-cover"
                      />
                    </Link>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link
                            to={`/product/${product.slug}`}
                            onClick={closeDrawer}
                            className="text-sm font-semibold text-ink-900 transition-colors hover:text-brand-600"
                          >
                            {product.name}
                          </Link>
                          <p className="text-xs text-ink-400">{product.category}</p>
                        </div>
                        <button
                          onClick={() => removeItem(product.id)}
                          className="text-ink-300 transition-colors hover:text-brand-600"
                          aria-label={`Remove ${product.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full border border-ink-200 bg-cream-200 px-1 py-1">
                          <button
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full text-ink-600 hover:bg-white hover:text-ink-900"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-4 text-center text-xs font-medium text-ink-900">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="flex h-6 w-6 items-center justify-center rounded-full text-ink-600 hover:bg-white hover:text-ink-900"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-ink-900">
                          {formatPrice(product.price * quantity)}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-ink-200 px-6 py-5">
              <div className="mb-4 flex items-center justify-between text-sm">
                <span className="text-ink-500">Subtotal</span>
                <span className="font-display text-lg font-bold text-ink-900">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mb-4 text-xs text-ink-400">Shipping and taxes calculated at checkout.</p>
              <Link
                to="/cart"
                onClick={closeDrawer}
                className="btn-secondary mb-2 w-full"
              >
                View Cart
              </Link>
              <Link to="/checkout" onClick={closeDrawer} className="btn-primary w-full">
                Checkout
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
