import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronRight,
  Check,
} from 'lucide-react';
import { getProductBySlug, getRelatedProducts } from './data/products';
import { useCart } from './context/CartContext';
import ProductCard from './components/ProductCard';
import { formatPrice } from './lib/format';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeColor, setActiveColor] = useState(0);
  const [justAdded, setJustAdded] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    setActiveImage(0);
    setQuantity(1);
    setActiveColor(0);
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) return <Navigate to="/shop" replace />;

  const related = getRelatedProducts(product);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const specEntries = Object.entries(product.specs).filter(([, v]) => v) as [string, string][];
  const specLabels: Record<string, string> = {
    processor: 'Processor',
    graphics: 'Graphics',
    ram: 'Memory',
    storage: 'Storage',
    display: 'Display',
    connectivity: 'Connectivity',
    materials: 'Materials',
    dimensions: 'Dimensions',
    weight: 'Weight',
    battery: 'Battery',
    switchType: 'Switch Type',
    chipset: 'Chipset',
    vram: 'Video Memory',
    coreClock: 'Core Clock',
    powerDraw: 'Power Draw',
    socket: 'Socket',
    formFactor: 'Form Factor',
    printSpeed: 'Print Speed',
    printResolution: 'Print Resolution',
    licenseType: 'License',
    platform: 'Platform',
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-8 flex items-center gap-1.5 text-sm text-ink-400">
        <Link to="/" className="hover:text-brand-600">Home</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to="/shop" className="hover:text-brand-600">Shop</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-brand-600">
          {product.category}
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ink-700">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="card-surface mb-4 aspect-square overflow-hidden rounded-2xl">
            <img
              src={product.images[activeImage].url}
              alt={product.images[activeImage].alt}
              className="h-full w-full object-cover transition-opacity duration-300"
            />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {product.images.map((img, i) => (
              <button
                key={img.url}
                onClick={() => setActiveImage(i)}
                className={`aspect-square overflow-hidden rounded-xl border-2 transition-all ${
                  activeImage === i
                    ? 'border-brand-500 shadow-glow'
                    : 'border-ink-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt={img.alt} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gold-600">
              {product.category}
            </span>
            {product.badge && (
              <span className="rounded-full border border-brand-200 bg-brand-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand-600">
                {product.badge}
              </span>
            )}
          </div>

          <h1 className="mt-3 font-display text-3xl font-bold text-ink-900 sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-2 text-ink-500">{product.tagline}</p>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(product.rating)
                      ? 'fill-gold-400 text-gold-400'
                      : 'fill-ink-100 text-ink-100'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-ink-500">
              {product.rating.toFixed(1)} ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-3xl font-bold text-ink-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-ink-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-600">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              </>
            )}
          </div>

          <div className="mt-4">
            {product.inStock ? (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                <Check className="h-3.5 w-3.5" />
                In Stock — {product.stockCount} available
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-cream-200 px-3 py-1 text-xs font-medium text-ink-500">
                Out of Stock
              </span>
            )}
          </div>

          <p className="mt-6 leading-relaxed text-ink-600">{product.description}</p>

          <ul className="mt-6 flex flex-col gap-2.5">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 text-sm text-ink-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                {h}
              </li>
            ))}
          </ul>

          {product.colors && (
            <div className="mt-6">
              <p className="mb-2.5 text-sm font-medium text-ink-700">Finish</p>
              <div className="flex items-center gap-2.5">
                {product.colors.map((color, i) => (
                  <button
                    key={color}
                    onClick={() => setActiveColor(i)}
                    style={{ backgroundColor: color }}
                    aria-label={`Select finish ${i + 1}`}
                    className={`h-8 w-8 rounded-full border-2 transition-all ${
                      activeColor === i ? 'border-brand-500 scale-110' : 'border-ink-200'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3 rounded-full border border-ink-200 bg-cream-200 px-2 py-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="flex h-8 w-8 items-center justify-center rounded-full text-ink-600 hover:bg-white hover:text-ink-900"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-6 text-center text-sm font-semibold text-ink-900">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-ink-600 hover:bg-white hover:text-ink-900"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="btn-primary flex-1 py-3.5"
            >
              {justAdded ? (
                <>
                  <Check className="h-4 w-4" /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </>
              )}
            </button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 border-t border-ink-200 pt-6 sm:grid-cols-3">
            <div className="flex items-center gap-2 text-xs text-ink-500">
              <Truck className="h-4 w-4 text-brand-600" /> Free delivery across India
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-500">
              <ShieldCheck className="h-4 w-4 text-brand-600" /> Warranty assured
            </div>
            <div className="flex items-center gap-2 text-xs text-ink-500">
              <RotateCcw className="h-4 w-4 text-brand-600" /> 7-day returns
            </div>
          </div>
        </div>
      </div>

      {/* Specs table */}
      <div className="mt-20">
        <h2 className="mb-6 font-display text-xl font-bold text-ink-900">Specifications</h2>
        <div className="card-surface overflow-hidden rounded-2xl">
          <table className="w-full text-sm">
            <tbody>
              {specEntries.map(([key, value], i) => (
                <tr key={key} className={i % 2 === 0 ? 'bg-cream-200' : ''}>
                  <td className="w-1/3 px-6 py-4 font-medium text-ink-500">
                    {specLabels[key] ?? key}
                  </td>
                  <td className="px-6 py-4 text-ink-900">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="mb-6 font-display text-xl font-bold text-ink-900">You might also like</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
