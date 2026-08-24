export type ProductCategory =
  | 'Laptops'
  | 'Desktops'
  | 'Components'
  | 'Accessories'
  | 'Printers'
  | 'Software';

export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductSpecs {
  processor?: string;
  graphics?: string;
  ram?: string;
  storage?: string;
  display?: string;
  connectivity?: string;
  materials?: string;
  dimensions?: string;
  weight?: string;
  battery?: string;
  switchType?: string;
  chipset?: string;
  vram?: string;
  coreClock?: string;
  powerDraw?: string;
  socket?: string;
  formFactor?: string;
  printSpeed?: string;
  printResolution?: string;
  licenseType?: string;
  platform?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  stockCount: number;
  images: ProductImage[];
  description: string;
  highlights: string[];
  specs: ProductSpecs;
  badge?: 'New' | 'Best Seller' | 'Limited' | 'Sale';
  featured?: boolean;
  colors?: string[];
}
