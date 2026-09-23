import React from 'react';
import { Product } from '../../../types/catalog.types';
import { ProductCard } from './ProductCard';

export interface ProductGridProps {
  products: Product[];
  onQuickAdd?: (product: Product, size: string) => void;
  onSelectProduct?: (product: Product) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onQuickAdd,
  onSelectProduct
}) => {
  if (products.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px bg-neutral-800 border-b border-neutral-800">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickAdd={onQuickAdd}
          onSelect={onSelectProduct}
        />
      ))}
    </div>
  );
};
