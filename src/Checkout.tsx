import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  Lock,
  CreditCard,
  Truck,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { useCart } from './context/CartContext';
import { formatPrice } from './lib/format';

const SHIPPING_THRESHOLD = 4999;
const SHIPPING_COST = 199;
const GST_RATE = 0.18;

interface FormState {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  apartment: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  cardNumber: string;
  cardExpiry: string;
  cardCvc: string;
  nameOnCard: string;
}

const initialForm: FormState = {
  email: '',
  firstName: '',
  lastName: '',
  address: '',
  apartment: '',
  city: '',
  state: '',
  pincode: '',
  country: 'India',
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
  nameOnCard: '',
};

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState<FormState>(initialForm);
  const [placing, setPlacing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [orderTotal, setOrderTotal] = useState(0);

  const shipping = subtotal >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const gst = Math.round(subtotal * GST_RATE);
  const total = subtotal + shipping + gst;

  const update =
    (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPlacing(true);
    setTimeout(() => {
      setOrderNumber(`TIC-${Math.floor(100000 + Math.random() * 900000)}`);
      setOrderTotal(total);
      setPlacing(false);
      setOrderPlaced(true);
      clearCart();
    }, 1200);
  };

  useEffect(() => {
    if (orderPlaced) window.scrollTo(0, 0);
  }, [orderPlaced]);

  if (items.length === 0 && !orderPlaced) {
    return <Navigate to="/shop" replace />;
  }

  if (orderPlaced) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-5 px-4 py-32 text-center sm:px-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-10 w-10 text-emerald-600" />
        </div>
        <h1 className="font-display text-3xl font-bold text-ink-900">Order Confirmed</h1>
        <p className="text-ink-500">
          Thank you! Your order <span className="font-semibold text-brand-600">{orderNumber}</span>{' '}
          has been placed. A confirmation email is on its way to {form.email || 'your inbox'}.
        </p>
        <div className="card-surface mt-4 w-full rounded-2xl p-6 text-left">
          <div className="flex justify-between text-sm text-ink-500">
            <span>Order total</span>
            <span className="font-semibold text-ink-900">{formatPrice(orderTotal)}</span>
          </div>
          <div className="mt-2 flex justify-between text-sm text-ink-500">
            <span>Estimated delivery</span>
            <span className="font-semibold text-ink-900">3–5 business days</span>
          </div>
        </div>
        <Link to="/shop" className="btn-primary mt-4">
          Continue Shopping
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-8 flex items-center gap-1.5 text-sm text-ink-400">
        <Link to="/cart" className="hover:text-brand-600">Cart</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ink-700">Checkout</span>
      </nav>

      <h1 className="mb-8 font-display text-3xl font-bold text-ink-900">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]">
        <div className="flex flex-col gap-8">
          <section className="card-surface rounded-2xl p-6">
            <div className="mb-5 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-600">
                1
              </span>
              <h2 className="font-display text-base font-bold text-ink-900">Contact</h2>
            </div>
            <label className="mb-1.5 block text-xs font-medium text-ink-500">Email address</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={update('email')}
              placeholder="you@example.com"
              className="input-field"
            />
          </section>

          <section className="card-surface rounded-2xl p-6">
            <div className="mb-5 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-600">
                2
              </span>
              <Truck className="h-4 w-4 text-brand-600" />
              <h2 className="font-display text-base font-bold text-ink-900">Shipping Address</h2>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink-500">First name</label>
                <input required value={form.firstName} onChange={update('firstName')} className="input-field" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink-500">Last name</label>
                <input required value={form.lastName} onChange={update('lastName')} className="input-field" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-medium text-ink-500">Street address</label>
                <input required value={form.address} onChange={update('address')} className="input-field" />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-medium text-ink-500">
                  Apartment, suite, etc. (optional)
                </label>
                <input value={form.apartment} onChange={update('apartment')} className="input-field" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink-500">City</label>
                <input required value={form.city} onChange={update('city')} className="input-field" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink-500">State</label>
                <input required value={form.state} onChange={update('state')} className="input-field" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink-500">PIN code</label>
                <input required value={form.pincode} onChange={update('pincode')} className="input-field" />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink-500">Country</label>
                <select value={form.country} onChange={update('country')} className="input-field">
                  <option>India</option>
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>United Arab Emirates</option>
                  <option>Australia</option>
                </select>
              </div>
            </div>
          </section>

          <section className="card-surface rounded-2xl p-6">
            <div className="mb-5 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-600">
                3
              </span>
              <CreditCard className="h-4 w-4 text-brand-600" />
              <h2 className="font-display text-base font-bold text-ink-900">Payment</h2>
              <Lock className="ml-auto h-3.5 w-3.5 text-ink-300" />
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-medium text-ink-500">Card number</label>
                <input
                  required
                  inputMode="numeric"
                  placeholder="1234 5678 9012 3456"
                  value={form.cardNumber}
                  onChange={update('cardNumber')}
                  className="input-field"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink-500">Expiry (MM/YY)</label>
                <input
                  required
                  placeholder="08/28"
                  value={form.cardExpiry}
                  onChange={update('cardExpiry')}
                  className="input-field"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-ink-500">CVC</label>
                <input
                  required
                  inputMode="numeric"
                  placeholder="123"
                  value={form.cardCvc}
                  onChange={update('cardCvc')}
                  className="input-field"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-1.5 block text-xs font-medium text-ink-500">Name on card</label>
                <input required value={form.nameOnCard} onChange={update('nameOnCard')} className="input-field" />
              </div>
            </div>
            <p className="mt-4 flex items-center gap-2 text-xs text-ink-400">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-600" />
              Your payment information is encrypted and secure. This is a demo checkout — no
              charges will be made.
            </p>
          </section>
        </div>

        <div>
          <div className="card-surface sticky top-24 rounded-2xl p-6">
            <h2 className="font-display text-lg font-bold text-ink-900">Order Summary</h2>
            <div className="mt-5 flex max-h-64 flex-col gap-4 overflow-y-auto pr-1">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-cream-200">
                    <img src={product.images[0].url} alt={product.images[0].alt} className="h-full w-full object-cover" />
                    <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-[10px] font-bold text-white">
                      {quantity}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col justify-center">
                    <p className="line-clamp-1 text-sm font-medium text-ink-900">{product.name}</p>
                    <p className="text-xs text-ink-400">{formatPrice(product.price)} each</p>
                  </div>
                  <span className="self-center text-sm font-semibold text-ink-900">
                    {formatPrice(product.price * quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-ink-200 pt-5 text-sm">
              <div className="flex justify-between text-ink-500">
                <span>Subtotal</span>
                <span className="text-ink-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-ink-500">
                <span>Shipping</span>
                <span className="text-ink-900">{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-ink-500">
                <span>GST (18%)</span>
                <span className="text-ink-900">{formatPrice(gst)}</span>
              </div>
            </div>

            <div className="mt-5 flex justify-between border-t border-ink-200 pt-5">
              <span className="font-display text-base font-bold text-ink-900">Total</span>
              <span className="font-display text-xl font-bold text-ink-900">{formatPrice(total)}</span>
            </div>

            <button type="submit" disabled={placing} className="btn-primary mt-6 w-full py-3.5">
              {placing ? (
                'Placing Order...'
              ) : (
                <>
                  <Lock className="h-4 w-4" />
                  Place Order
                </>
              )}
            </button>
            <p className="mt-3 text-center text-xs text-ink-400">
              By placing your order, you agree to our Terms of Service.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
