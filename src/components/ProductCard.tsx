import { Link } from 'react-router-dom';
import { Star, ShoppingCart, PlusCircle } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/format';

const badgeStyles: Record<string, string> = {
  New: 'bg-gold-100 text-gold-700 border-gold-300',
  'Best Seller': 'badge-gradient border-transparent',
  Limited: 'bg-ink-900 text-white border-ink-900',
  Sale: 'bg-gold-400 text-ink-900 border-gold-400',
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="card-surface group relative flex flex-col overflow-hidden hover:-translate-y-1 hover:border-brand-200 hover:shadow-card-hover">
      <Link to={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-cream-200">
        <img
          src={product.images[0].url}
          alt={product.images[0].alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {product.badge && (
          <span
            className={`absolute left-3 top-3 animate-float rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide shadow-sm ${badgeStyles[product.badge]}`}
          >
            {product.badge}
          </span>
        )}
        {!product.inStock && (
          <span className="absolute right-3 top-3 rounded-full border border-ink-200 bg-white/90 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-500 backdrop-blur-md">
            Out of Stock
          </span>
        )}

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            if (product.inStock) addItem(product, 1);
          }}
          disabled={!product.inStock}
          aria-label={`Add ${product.name} to cart`}
          className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-brand-500 text-white opacity-0 shadow-glow transition-all duration-300 hover:bg-brand-600 group-hover:translate-y-0 group-hover:opacity-100 disabled:cursor-not-allowed disabled:bg-ink-200 disabled:text-ink-400"
        >
          <PlusCircle className="h-5 w-5" />
        </button>
      </Link>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <span className="text-[11px] font-medium uppercase tracking-wider text-gold-600">
          {product.category}
        </span>
        <Link to={`/product/${product.slug}`}>
          <h3 className="text-base font-semibold leading-snug text-ink-900 transition-colors group-hover:text-brand-600">
            {product.name}
          </h3>
        </Link>
        <p className="line-clamp-1 text-sm text-ink-500">{product.tagline}</p>

        <div className="mt-1 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.round(product.rating)
                    ? 'fill-gold-400 text-gold-400'
                    : 'fill-ink-100 text-ink-100'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-ink-400">({product.reviewCount})</span>
        </div>

        <div className="mt-auto flex items-end justify-between pt-3">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg font-bold text-ink-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-ink-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <ShoppingCart className="h-4 w-4 text-ink-300 transition-colors group-hover:text-brand-500" />
        </div>
      </div>
    </div>
  );
}
