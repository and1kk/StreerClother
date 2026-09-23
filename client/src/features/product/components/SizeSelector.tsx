import React from 'react';
import { ProductSize } from '../types/product-detail.types';
import { RulerIcon } from '../../../components/ui/Icons';

export interface SizeSelectorProps {
  sizes: ProductSize[];
  selectedSize: string;
  onSelectSize: (size: string) => void;
  onOpenSizeGuide: () => void;
  modelNote?: string;
}

export const SizeSelector: React.FC<SizeSelectorProps> = ({
  sizes,
  selectedSize,
  onSelectSize,
  onOpenSizeGuide,
  modelNote = "MODEL: 188 CM / 6'2\" WEARING SIZE L // BOXY OVERSIZED FIT"
}) => {
  return (
    <div className="flex flex-col gap-space-xs pt-space-xs border-t border-outline-variant">
      {/* HEADER & SIZE GUIDE TRIGGER */}
      <div className="flex items-center justify-between">
        <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
          SELECT SPECIFICATION / SIZE
        </span>
        <button
          type="button"
          onClick={onOpenSizeGuide}
          className="font-label-sm text-label-sm text-primary underline underline-offset-4 hover:text-outline transition-colors uppercase cursor-pointer"
        >
          SIZE GUIDE (METRIC/IMPERIAL)
        </button>
      </div>

      {/* SIZE BUTTONS GRID */}
      <div className="grid grid-cols-5 gap-2 mt-1" id="size-selector-group">
        {sizes.map((size) => {
          if (!size.inStock) {
            return (
              <button
                key={size.id}
                type="button"
                disabled
                className="py-3 font-label-md text-label-md uppercase tracking-wider border border-outline-variant bg-surface-container-lowest text-outline line-through cursor-not-allowed flex items-center justify-center relative group select-none"
              >
                {size.label}
                <span className="sr-only">Out of stock</span>
              </button>
            );
          }

          const isSelected = size.label === selectedSize;
          return (
            <button
              key={size.id}
              type="button"
              onClick={() => onSelectSize(size.label)}
              className={`size-btn py-3 font-label-md text-label-md uppercase tracking-wider transition-colors flex items-center justify-center cursor-pointer select-none ${
                isSelected
                  ? 'bg-primary text-on-primary font-bold border border-primary'
                  : 'border border-outline text-on-surface hover:border-primary'
              }`}
            >
              {size.label}
            </button>
          );
        })}
      </div>

      {/* MODEL MEASUREMENT FOOTNOTE */}
      {modelNote && (
        <div className="flex items-center gap-2 mt-2 font-label-sm text-label-sm text-outline">
          <RulerIcon size={14} className="flex-shrink-0" />
          <span>{modelNote}</span>
        </div>
      )}
    </div>
  );
};
