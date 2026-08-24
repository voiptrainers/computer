import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag, User, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { categories } from '../data/products';
import Logo from './Logo';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
];

export default function Navbar() {
  const { itemCount, openDrawer } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(query.trim() ? `/shop?q=${encodeURIComponent(query.trim())}` : '/shop');
    setQuery('');
    setMobileOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 border-b border-ink-200 bg-white/95 backdrop-blur-md transition-shadow duration-300 ${
        scrolled ? 'shadow-card' : ''
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors ${
                  isActive ? 'text-brand-600' : 'text-ink-700 hover:text-brand-600'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <div className="group relative">
            <button className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide text-ink-700 transition-colors hover:text-brand-600">
              Products
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="grid gap-1 rounded-2xl border border-ink-200 bg-white p-2 shadow-card-hover">
                {categories.map((c) => (
                  <Link
                    key={c.name}
                    to={`/shop?category=${encodeURIComponent(c.name)}`}
                    className="rounded-xl px-3 py-2.5 text-sm text-ink-700 transition-colors hover:bg-cream-200 hover:text-brand-600"
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <a
            href="mailto:support@theindiancomputers.com"
            className="rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide text-ink-700 transition-colors hover:text-brand-600"
          >
            Contact Us
          </a>
        </nav>

        <div className="hidden flex-1 max-w-xs items-center xl:flex">
          <form onSubmit={handleSearch} className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-full border border-ink-200 bg-cream-200 py-2 pl-9 pr-4 text-sm text-ink-900 placeholder-ink-400 outline-none transition-colors focus:border-brand-400 focus:bg-white"
            />
          </form>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-ink-600 transition-colors hover:bg-cream-200 hover:text-brand-600 xl:hidden md:flex"
            aria-label="Search"
            onClick={() => setMobileOpen(true)}
          >
            <Search className="h-4.5 w-4.5" />
          </button>
          <button
            type="button"
            className="hidden h-10 w-10 items-center justify-center rounded-full text-ink-600 transition-colors hover:bg-cream-200 hover:text-brand-600 md:flex"
            aria-label="Account"
          >
            <User className="h-4.5 w-4.5" />
          </button>
          <button
            type="button"
            onClick={openDrawer}
            className="relative flex h-10 w-10 items-center justify-center rounded-full text-ink-600 transition-colors hover:bg-cream-200 hover:text-brand-600"
            aria-label="Open cart"
          >
            <ShoppingBag className="h-4.5 w-4.5" />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1 text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-ink-600 transition-colors hover:bg-cream-200 hover:text-brand-600 lg:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-ink-200 bg-white px-4 pb-6 pt-2 lg:hidden">
          <form onSubmit={handleSearch} className="relative mb-4 mt-3">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="input-field pl-9"
            />
          </form>
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2.5 text-sm font-semibold uppercase tracking-wide ${
                    isActive ? 'bg-cream-200 text-brand-600' : 'text-ink-700'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <div className="my-2 h-px bg-ink-200" />
            {categories.map((c) => (
              <Link
                key={c.name}
                to={`/shop?category=${encodeURIComponent(c.name)}`}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm text-ink-700 hover:bg-cream-200 hover:text-brand-600"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
