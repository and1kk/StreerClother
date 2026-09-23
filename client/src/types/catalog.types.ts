export type ProductBadgeType = 'NEW' | 'SALE' | 'LIMITED';

export interface ProductBadge {
  type: ProductBadgeType;
  label: string;
}

export interface Product {
  id: string;
  sku: string;
  title: string;
  category: 'Hoodies' | 'T-Shirts' | 'Bottoms' | 'Outerwear' | 'Accessories';
  price: number;
  originalPrice?: number;
  colorName: string;
  fit: string;
  availableSizes: string[];
  primaryImage: string;
  secondaryImage?: string;
  alt: string;
  badge?: ProductBadge;
}

export type SortOrder = 
  | 'NEWEST DISPATCH' 
  | 'PRICE: LOW TO HIGH' 
  | 'PRICE: HIGH TO LOW' 
  | 'ARCHIVAL PRIORITY';

export interface FilterState {
  categories: string[];
  sizes: string[];
  colors: string[];
  fitType: string;
  priceRange: [number, number];
}
