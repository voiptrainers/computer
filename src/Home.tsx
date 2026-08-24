import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  Tag,
  Headphones,
  Award,
  Laptop,
  Monitor,
  CircuitBoard,
  Printer,
  AppWindow,
  Wrench,
  Settings2,
  DatabaseBackup,
  Briefcase,
  Users,
  Store,
  Globe2,
  Star,
} from 'lucide-react';
import { products, categories } from './data/products';
import ProductCard from './components/ProductCard';

const trustBadges = [
  { icon: ShieldCheck, label: '100% Genuine', sub: 'Original Products' },
  { icon: Tag, label: 'Best Prices', sub: 'Unbeatable Deals' },
  { icon: Truck, label: 'Fast Delivery', sub: 'Across India' },
  { icon: Headphones, label: 'Expert Support', sub: 'Always Here to Help' },
  { icon: Award, label: 'Official Warranty', sub: 'Assured Support' },
];

const categoryIcons: Record<string, typeof Laptop> = {
  Laptops: Laptop,
  Desktops: Monitor,
  Components: CircuitBoard,
  Accessories: Headphones,
  Printers: Printer,
  Software: AppWindow,
};

const services = [
  { icon: Wrench, label: 'Repair & Maintenance', sub: 'Quick & Reliable Support' },
  { icon: Settings2, label: 'Expert Custom Builds', sub: 'Tailored to Your Needs' },
  { icon: DatabaseBackup, label: 'Data Recovery', sub: 'Your Data, Our Priority' },
  { icon: Briefcase, label: 'Business Solutions', sub: 'Empowering Businesses' },
  { icon: ShieldCheck, label: 'AMC & Warranty', sub: 'Peace of Mind Always' },
];

const yearsOfTrust = new Date().getFullYear() - 2007;

const stats = [
  { icon: Users, value: '1M+', label: 'Happy Customers' },
  { icon: Store, value: '50+', label: 'Stores Worldwide' },
  { icon: Globe2, value: '20+', label: 'Countries' },
  { icon: Award, value: `${yearsOfTrust}+`, label: 'Years of Trust' },
];

export default function Home() {
  const featured = products.filter((p) => p.featured);

  return (
    <div className="flex flex-col">
      {/* Hero + features strip: sized to fill the viewport below the sticky navbar */}
      <div className="hero-viewport flex flex-col">
        {/* Hero */}
        <section className="relative flex min-h-[420px] flex-1 items-center overflow-hidden border-b border-ink-200">
          <video
            src="/hero-workstation.mp4"
            poster="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1600&q=80"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover brightness-110 contrast-105 saturate-[1.15]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900/55 via-ink-900/25 to-ink-900/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/45 via-transparent to-transparent" />

          <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.3fr_auto] lg:px-8 lg:py-24">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 rounded-full border border-gold-300/40 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-gold-300 backdrop-blur-md">
                Technology. Trust. Since 2007.
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)] sm:text-5xl">
                The Indian
                <span className="block text-brand-400">Computers</span>
              </h1>
              <p className="mt-5 max-w-md text-sm text-white/90 drop-shadow-[0_1px_4px_rgba(0,0,0,0.6)] sm:text-base">
                Your trusted destination for premium computers, laptops, accessories and IT
                solutions. Powering India. Connecting the World.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link to="/shop" className="btn-primary">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white hover:text-ink-900 active:scale-[0.97]"
                >
                  Our Services
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="hidden flex-col gap-5 border-l border-white/25 pl-8 lg:flex">
              <div className="flex flex-col items-center gap-1.5 text-center">
                <Award className="h-6 w-6 text-gold-300" />
                <span className="text-xs font-bold uppercase tracking-wide text-white">Since</span>
                <span className="text-xs font-bold uppercase tracking-wide text-white">2007</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <ShieldCheck className="h-6 w-6 text-gold-300" />
                <span className="text-xs font-bold uppercase tracking-wide text-white">Trusted by</span>
                <span className="text-xs font-bold uppercase tracking-wide text-white">1M+ Customers</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 text-center">
                <Globe2 className="h-6 w-6 text-gold-300" />
                <span className="text-xs font-bold uppercase tracking-wide text-white">Serving</span>
                <span className="text-xs font-bold uppercase tracking-wide text-white">Globally</span>
              </div>
            </div>
          </div>
        </section>

        {/* Trust badges row */}
        <div className="shrink-0 border-b border-ink-800 bg-ink-900">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-6 sm:px-6 md:grid-cols-5 lg:px-8">
            {trustBadges.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center justify-center gap-2.5 sm:justify-start">
                <Icon className="h-5 w-5 shrink-0 text-gold-300" />
                <div className="text-left">
                  <p className="text-xs font-bold uppercase tracking-wide text-white">{label}</p>
                  <p className="text-[11px] text-white/60">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Shop by Category */}
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">
            Shop by Category
          </span>
          <div className="mx-auto mt-3 h-px w-16 bg-gold-400" />
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((cat) => {
            const Icon = categoryIcons[cat.name];
            return (
              <Link
                key={cat.name}
                to={`/shop?category=${encodeURIComponent(cat.name)}`}
                className="group card-surface flex flex-col items-center overflow-hidden text-center hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover"
              >
                <div className="relative aspect-square w-full overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent" />
                  <Icon className="absolute left-3 top-3 h-6 w-6 text-white" />
                </div>
                <div className="flex w-full flex-col gap-0.5 p-3">
                  <p className="text-sm font-bold uppercase tracking-wide text-ink-900">{cat.name}</p>
                  <p className="text-[11px] text-ink-500">{cat.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured products */}
      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">
              Trending Now
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-ink-900 sm:text-3xl">
              Featured Products
            </h2>
          </div>
          <Link
            to="/shop"
            className="hidden items-center gap-1 text-sm font-semibold text-ink-600 transition-colors hover:text-brand-600 sm:flex"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Our Services */}
      <section id="services" className="border-y border-ink-200 bg-cream-200 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-600">
              Our Services
            </span>
            <div className="mx-auto mt-3 h-px w-16 bg-gold-400" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {services.map(({ icon: Icon, label, sub }) => (
              <div
                key={label}
                className="card-surface flex flex-col items-center gap-3 px-5 py-8 text-center hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-50">
                  <Icon className="h-6 w-6 text-brand-600" />
                </div>
                <p className="text-sm font-bold uppercase tracking-wide text-ink-900">{label}</p>
                <p className="text-xs text-ink-500">{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global trust / stats */}
      <section className="relative overflow-hidden bg-ink-900 py-16">
        <Globe2 className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 text-gold-500/[0.06]" />
        <Globe2 className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 text-brand-500/[0.08]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col items-center gap-4 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-gold-400">
              Global Vision. Indian Trust.
            </span>
            <h2 className="max-w-xl font-display text-2xl font-bold text-white sm:text-3xl">
              From India to the World — We Deliver Excellence Everywhere
            </h2>
            <Link to="/shop" className="btn-gold mt-2">
              Know More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center">
                <Icon className="h-6 w-6 text-brand-400" />
                <span className="font-display text-2xl font-extrabold text-white sm:text-3xl">
                  {value}
                </span>
                <span className="text-xs font-medium uppercase tracking-wide text-white/50">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="mx-auto w-full max-w-5xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <div className="mb-4 flex justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-gold-400 text-gold-400" />
          ))}
        </div>
        <blockquote className="font-display text-xl font-semibold leading-relaxed text-ink-900 sm:text-2xl">
          "The Indian Computers built our entire office setup — desktops, networking, the works.
          Genuine products, fair prices, and support that actually shows up."
        </blockquote>
        <p className="mt-4 text-sm text-ink-500">
          Rohan Mehta — Operations Head, verified buyer
        </p>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="card-surface relative overflow-hidden rounded-3xl px-8 py-14 text-center sm:px-16">
          <div className="absolute inset-0 bg-gold-fade" />
          <div className="relative">
            <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">
              Ready to upgrade your workspace?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm text-ink-500 sm:text-base">
              Join a million+ customers who trust The Indian Computers for genuine hardware and
              honest service.
            </p>
            <Link to="/shop" className="btn-primary mt-8 inline-flex">
              Start Shopping
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
