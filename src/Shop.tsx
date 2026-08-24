import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import { products, categories } from './data/products';
import { Product } from './types';
import ProductCard from './components/ProductCard';
import { formatPrice } from './lib/format';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating';

const MAX_PRICE = 300000;

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') ?? '';
  const query = searchParams.get('q') ?? '';

  const [priceMax, setPriceMax] = useState(MAX_PRICE);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const toggleCategory = (category: string) => {
    const next = new URLSearchParams(searchParams);
    if (activeCategory === category) {
      next.delete('category');
    } else {
      next.set('category', category);
    }
    setSearchParams(next);
  };

  const clearFilters = () => {
    setSearchParams({});
    setPriceMax(MAX_PRICE);
    setInStockOnly(false);
    setSort('featured');
  };

  const filtered: Product[] = useMemo(() => {
    let list = products.filter((p) => p.price <= priceMax);
    if (activeCategory) list = list.filter((p) => p.category === activeCategory);
    if (inStockOnly) list = list.filter((p) => p.inStock);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q)
      );
    }
    switch (sort) {
      case 'price-asc':
        return [...list].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...list].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...list].sort((a, b) => b.rating - a.rating);
      default:
        return [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
  }, [activeCategory, inStockOnly, priceMax, query, sort]);

  const activeFilterCount = (activeCategory ? 1 : 0) + (inStockOnly ? 1 : 0) + (priceMax < MAX_PRICE ? 1 : 0);

  const FiltersPanel = (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-ink-900">Category</h3>
        <div className="flex flex-col gap-2.5">
          {categories.map((c) => (
            <label
              key={c.name}
              className="flex cursor-pointer items-center gap-3 text-sm text-ink-600 transition-colors hover:text-ink-900"
            >
              <input
                type="checkbox"
                checked={activeCategory === c.name}
                onChange={() => toggleCategory(c.name)}
                className="h-4 w-4 rounded border-ink-300 bg-transparent text-brand-500 accent-brand-500 focus:ring-brand-200"
              />
              {c.name}
              <span className="ml-auto text-xs text-ink-400">
                {products.filter((p) => p.category === c.name).length}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-ink-900">Max Price</h3>
        <input
          type="range"
          min={0}
          max={MAX_PRICE}
          step={1000}
          value={priceMax}
          onChange={(e) => setPriceMax(Number(e.target.value))}
          className="w-full accent-brand-500"
        />
        <div className="mt-2 flex items-center justify-between text-xs text-ink-500">
          <span>₹0</span>
          <span className="font-medium text-brand-600">{formatPrice(priceMax)}</span>
        </div>
      </div>

      <div>
        <label className="flex cursor-pointer items-center gap-3 text-sm text-ink-600 transition-colors hover:text-ink-900">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="h-4 w-4 rounded border-ink-300 bg-transparent text-brand-500 accent-brand-500 focus:ring-brand-200"
          />
          In stock only
        </label>
      </div>

      {activeFilterCount > 0 && (
        <button
          onClick={clearFilters}
          className="flex items-center gap-1.5 text-sm font-medium text-brand-600 transition-colors hover:text-brand-700"
        >
          <X className="h-3.5 w-3.5" />
          Clear all filters
        </button>
      )}
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-ink-900">
          {activeCategory || 'All Products'}
        </h1>
        <p className="mt-2 text-sm text-ink-500">
          {query ? `Search results for "${query}" — ` : ''}
          {filtered.length} product{filtered.length !== 1 ? 's' : ''} available
        </p>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[240px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24">{FiltersPanel}</div>
        </aside>

        <div>
          <div className="mb-6 flex items-center justify-between gap-3">
            <button
              onClick={() => setMobileFiltersOpen(true)}
              className="btn-secondary py-2.5 text-sm lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <span className="ml-1 rounded-full bg-brand-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="relative ml-auto">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="appearance-none rounded-full border border-ink-200 bg-white py-2.5 pl-4 pr-9 text-sm text-ink-900 outline-none transition-colors focus:border-brand-400"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="card-surface flex flex-col items-center gap-3 rounded-2xl px-6 py-20 text-center">
              <p className="text-lg font-semibold text-ink-900">No products found</p>
              <p className="text-sm text-ink-500">Try adjusting your filters or search term.</p>
              <button onClick={clearFilters} className="btn-primary mt-2">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-full max-w-xs overflow-y-auto border-r border-ink-200 bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-base font-bold text-ink-900">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-400 hover:bg-cream-200 hover:text-ink-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            {FiltersPanel}
            <button
              onClick={() => setMobileFiltersOpen(false)}
              className="btn-primary mt-8 w-full"
            >
              Show {filtered.length} results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
