import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCart } from './context/CartContext';
import { formatPrice } from './lib/format';

const SHIPPING_THRESHOLD = 4999;
const SHIPPING_COST = 199;
const GST_RATE = 0.18;

export default function Cart() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const shipping = items.length === 0 || subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const gst = Math.round((subtotal - discount) * GST_RATE);
  const total = subtotal - discount + shipping + gst;

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'TIC10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
      setPromoApplied(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-5 px-4 py-32 text-center sm:px-6 lg:px-8">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream-200">
          <ShoppingBag className="h-9 w-9 text-ink-300" />
        </div>
        <h1 className="font-display text-2xl font-bold text-ink-900">Your cart is empty</h1>
        <p className="max-w-sm text-sm text-ink-500">
          Looks like you haven’t added anything yet. Browse our collection to find your next
          upgrade.
        </p>
        <Link to="/shop" className="btn-primary">
          Start Shopping
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="mb-8 font-display text-3xl font-bold text-ink-900">Shopping Cart</h1>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div className="card-surface divide-y divide-ink-200 rounded-2xl">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 p-5 sm:gap-6 sm:p-6">
              <Link
                to={`/product/${product.slug}`}
                className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-cream-200 sm:h-28 sm:w-28"
              >
                <img
                  src={product.images[0].url}
                  alt={product.images[0].alt}
                  className="h-full w-full object-cover"
                />
              </Link>

              <div className="flex flex-1 flex-col justify-between gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-medium uppercase tracking-wide text-gold-600">
                      {product.category}
                    </span>
                    <Link
                      to={`/product/${product.slug}`}
                      className="mt-0.5 block text-sm font-semibold text-ink-900 transition-colors hover:text-brand-600 sm:text-base"
                    >
                      {product.name}
                    </Link>
                    <p className="mt-0.5 text-xs text-ink-400">
                      {product.inStock ? 'In stock' : 'Out of stock'}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(product.id)}
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-cream-200 hover:text-brand-600"
                    aria-label={`Remove ${product.name}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 rounded-full border border-ink-200 bg-cream-200 px-1.5 py-1.5">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-ink-600 hover:bg-white hover:text-ink-900"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-5 text-center text-sm font-medium text-ink-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-ink-600 hover:bg-white hover:text-ink-900"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-base font-bold text-ink-900 sm:text-lg">
                      {formatPrice(product.price * quantity)}
                    </p>
                    {quantity > 1 && (
                      <p className="text-xs text-ink-400">{formatPrice(product.price)} each</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="card-surface sticky top-24 rounded-2xl p-6">
            <h2 className="font-display text-lg font-bold text-ink-900">Order Summary</h2>

            <form onSubmit={applyPromo} className="mt-5">
              <label className="mb-2 block text-xs font-medium text-ink-500">Promo Code</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="TIC10"
                    className="input-field pl-9 py-2.5 text-sm"
                  />
                </div>
                <button type="submit" className="btn-secondary px-4 py-2.5 text-sm">
                  Apply
                </button>
              </div>
              {promoError && <p className="mt-2 text-xs text-brand-600">{promoError}</p>}
              {promoApplied && (
                <p className="mt-2 text-xs text-emerald-600">10% discount applied!</p>
              )}
            </form>

            <div className="mt-6 flex flex-col gap-3 border-t border-ink-200 pt-5 text-sm">
              <div className="flex justify-between text-ink-500">
                <span>Subtotal</span>
                <span className="text-ink-900">{formatPrice(subtotal)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-emerald-600">
                  <span>Discount (10%)</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-ink-500">
                <span>Shipping</span>
                <span className="text-ink-900">
                  {shipping === 0 ? 'Free' : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between text-ink-500">
                <span>GST (18%)</span>
                <span className="text-ink-900">{formatPrice(gst)}</span>
              </div>
            </div>

            {subtotal < SHIPPING_THRESHOLD && (
              <p className="mt-4 rounded-xl bg-brand-50 px-3 py-2.5 text-xs text-brand-700">
                Add {formatPrice(SHIPPING_THRESHOLD - subtotal)} more for free shipping
              </p>
            )}

            <div className="mt-5 flex justify-between border-t border-ink-200 pt-5">
              <span className="font-display text-base font-bold text-ink-900">Total</span>
              <span className="font-display text-xl font-bold text-ink-900">
                {formatPrice(total)}
              </span>
            </div>

            <button onClick={() => navigate('/checkout')} className="btn-primary mt-6 w-full py-3.5">
              Proceed to Checkout
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link to="/shop" className="mt-3 block text-center text-sm text-ink-500 hover:text-ink-800">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
