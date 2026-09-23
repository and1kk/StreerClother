import React from 'react';
import { Product } from '../../../types/catalog.types';

export interface ProductCardProps {
  product: Product;
  onQuickAdd?: (product: Product, size: string) => void;
  onSelect?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickAdd,
  onSelect
}) => {
  const { title, price, originalPrice, colorName, sku, primaryImage, secondaryImage, alt, badge, availableSizes } = product;

  const handleSizeClick = (e: React.MouseEvent, size: string) => {
    e.stopPropagation();
    onQuickAdd?.(product, size);
  };

  const renderBadge = () => {
    if (!badge) return null;

    if (badge.type === 'SALE') {
      return (
        <span className="bg-red-500 text-white px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider">
          {badge.label}
        </span>
      );
    }

    if (badge.type === 'LIMITED') {
      return (
        <span className="bg-[#131313] text-white border border-white px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider">
          {badge.label}
        </span>
      );
    }

    return (
      <span className="bg-white text-black px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider">
        {badge.label}
      </span>
    );
  };

  return (
    <article
      onClick={() => onSelect?.(product)}
      className="group relative flex flex-col bg-[#131313] p-4 transition-colors hover:bg-[#0e0e0e] cursor-pointer"
    >
      {/* BADGE */}
      {badge && (
        <div className="absolute top-6 left-6 z-20 flex flex-col gap-1">
          {renderBadge()}
        </div>
      )}

      {/* MEDIA CONTAINER */}
      <div className="relative w-full aspect-[4/5] bg-neutral-900 overflow-hidden">
        <img
          src={primaryImage}
          alt={alt}
          loading="lazy"
          className={`w-full h-full object-cover object-center absolute inset-0 transition-opacity duration-500 ${
            secondaryImage ? 'group-hover:opacity-0' : ''
          }`}
        />

        {secondaryImage && (
          <img
            src={secondaryImage}
            alt={`${alt} alternate angle`}
            loading="lazy"
            className="w-full h-full object-cover object-center absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        )}

        {/* QUICK COMMIT DRAWER */}
        <div className="absolute inset-x-0 bottom-0 bg-[#0e0e0e]/95 backdrop-blur-md p-3 border-t border-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-30">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[10px] text-white uppercase font-bold tracking-widest">
              QUICK COMMIT
            </span>
            <span className="font-mono text-[10px] text-neutral-400">
              {availableSizes.length === 1 && availableSizes[0] === 'OS' ? 'ONE SIZE' : 'SELECT SPEC'}
            </span>
          </div>

          {availableSizes.length === 1 && availableSizes[0] === 'OS' ? (
            <button
              type="button"
              onClick={(e) => handleSizeClick(e, 'OS')}
              className="w-full border border-neutral-700 py-2 font-mono text-[11px] text-white hover:bg-white hover:text-black transition-colors uppercase font-bold"
            >
              ADD OS TO BAG
            </button>
          ) : (
            <div className="grid grid-cols-4 gap-1.5">
              {availableSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={(e) => handleSizeClick(e, size)}
                  className="border border-neutral-700 py-1.5 font-mono text-[11px] text-white hover:bg-white hover:text-black transition-colors font-bold"
                >
                  {size}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* METADATA INFO */}
      <div className="mt-4 flex flex-col justify-between flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-sans text-xs sm:text-sm text-white font-bold uppercase tracking-tight group-hover:underline">
            {title}
          </h3>
          <div className="flex items-baseline gap-1.5">
            {originalPrice && (
              <span className="font-mono text-[11px] text-neutral-500 line-through">
                ${originalPrice}
              </span>
            )}
            <span
              className={`font-mono text-xs sm:text-sm font-bold whitespace-nowrap ${
                originalPrice ? 'text-red-400' : 'text-white'
              }`}
            >
              ${price}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-800">
          <span className="font-mono text-[10px] text-neutral-400">
            {colorName}
          </span>
          <span className="font-mono text-[10px] text-neutral-500">
            {sku}
          </span>
        </div>
      </div>
    </article>
  );
};
