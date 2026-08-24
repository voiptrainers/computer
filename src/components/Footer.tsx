import { Link } from 'react-router-dom';
import { Instagram, Twitter, Youtube, Linkedin, Mail, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { categories } from '../data/products';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-cream-200">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 border-b border-ink-200 pb-10 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <Truck className="h-5 w-5 shrink-0 text-brand-600" />
            <div>
              <p className="text-sm font-semibold text-ink-900">Free Delivery Across India</p>
              <p className="text-xs text-ink-500">On all orders over ₹4,999</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <ShieldCheck className="h-5 w-5 shrink-0 text-brand-600" />
            <div>
              <p className="text-sm font-semibold text-ink-900">Warranty Assured</p>
              <p className="text-xs text-ink-500">Full coverage, zero fine print</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <RotateCcw className="h-5 w-5 shrink-0 text-brand-600" />
            <div>
              <p className="text-sm font-semibold text-ink-900">7-Day Returns</p>
              <p className="text-xs text-ink-500">Easy, no-questions-asked returns</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 py-10 sm:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-ink-500">
              Your trusted destination for premium computers, laptops, components and IT
              solutions. Powering India. Connecting the World.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a href="#" aria-label="Instagram" className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 text-ink-500 transition-colors hover:border-brand-400 hover:text-brand-600">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Twitter" className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 text-ink-500 transition-colors hover:border-brand-400 hover:text-brand-600">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 text-ink-500 transition-colors hover:border-brand-400 hover:text-brand-600">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Youtube" className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 text-ink-500 transition-colors hover:border-brand-400 hover:text-brand-600">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-ink-900">Shop</h4>
            <ul className="space-y-2.5">
              {categories.map((c) => (
                <li key={c.name}>
                  <Link
                    to={`/shop?category=${encodeURIComponent(c.name)}`}
                    className="text-sm text-ink-500 transition-colors hover:text-brand-600"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-ink-900">Company</h4>
            <ul className="space-y-2.5">
              {['About Us', 'Careers', 'Press', 'Store Locator'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-ink-500 transition-colors hover:text-brand-600">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-wider text-ink-900">Support</h4>
            <ul className="space-y-2.5">
              {['Contact Us', 'Shipping Info', 'Returns', 'Warranty', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-ink-500 transition-colors hover:text-brand-600">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-ink-200 py-8">
          <div className="mx-auto flex max-w-md flex-col items-center gap-3 text-center">
            <Mail className="h-5 w-5 text-brand-600" />
            <p className="text-sm font-semibold text-ink-900">Get early access to new drops</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full max-w-sm items-center gap-2"
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="input-field flex-1"
              />
              <button type="submit" className="btn-primary shrink-0 px-5 py-3">
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-ink-200 pt-6 text-xs text-ink-400 sm:flex-row">
          <p>© {new Date().getFullYear()} The Indian Computers. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-ink-700">Privacy Policy</a>
            <a href="#" className="hover:text-ink-700">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
