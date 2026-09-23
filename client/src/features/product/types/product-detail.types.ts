export interface GallerySlide {
  id: string;
  frameNumber: string;
  title: string;
  imageUrl: string;
  alt: string;
}

export interface ProductColorway {
  id: string;
  name: string;
  code: string;
  hex: string;
  borderHex?: string;
  innerHex?: string;
  image?: string;
  imageUrl?: string;
}

export interface ProductSize {
  id: string;
  label: string;
  inStock: boolean;
  isRecommended?: boolean;
}

export interface AccordionSection {
  id: string;
  number: string;
  title: string;
  content: React.ReactNode;
}

export interface CompatibleProduct {
  id: string;
  sku: string;
  title: string;
  categorySpec: string;
  price: number;
  badgeText?: string;
  imageUrl: string;
  alt: string;
}

export interface SizeGuideMeasurement {
  size: string;
  chest: string;
  length: string;
  shoulder: string;
  isRecommended?: boolean;
}

export interface ProductDetailData {
  id: string;
  sku: string;
  title: string;
  category: string;
  price: number;
  currency: string;
  badges: string[];
  edition: string;
  specVerification: string;
  lowInventoryText: string;
  description: string;
  slides: GallerySlide[];
  colorways: ProductColorway[];
  sizes: ProductSize[];
  modelNote: string;
  compatibleProducts: CompatibleProduct[];
  sizeGuide: SizeGuideMeasurement[];
}
