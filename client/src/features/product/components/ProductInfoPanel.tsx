import React from 'react';
import {
  ProductColorway,
  ProductDetailData
} from '../types/product-detail.types';
import { ColorwaySelector } from './ColorwaySelector';
import { SizeSelector } from './SizeSelector';
import { ProductAccordions } from './ProductAccordions';
import {
  BagIcon,
  BookmarkIcon,
  BookmarkBorderIcon,
  ShareIcon,
  ShieldCheckIcon
} from '../../../components/ui/Icons';

export interface ProductInfoPanelProps {
  product: ProductDetailData;
  selectedColor: ProductColorway;
  selectedSize: string;
  isArchived: boolean;
  ctaState: 'idle' | 'allocating' | 'added';
  onSelectColor: (color: ProductColorway) => void;
  onSelectSize: (size: string) => void;
  onOpenSizeGuide: () => void;
  onAddToBag: () => void;
  onToggleArchive: () => void;
  onShareSpec: () => void;
}

export const ProductInfoPanel: React.FC<ProductInfoPanelProps> = ({
  product,
  selectedColor,
  selectedSize,
  isArchived,
  ctaState,
  onSelectColor,
  onSelectSize,
  onOpenSizeGuide,
  onAddToBag,
  onToggleArchive,
  onShareSpec
}) => {
  const getCtaLabel = () => {
    if (ctaState === 'allocating') return 'ALLOCATING BATCH DISPATCH...';
    if (ctaState === 'added') return `ADDED // SIZE ${selectedSize} - $${product.price} USD`;
    return `ADD TO BAG — $${product.price} USD`;
  };

  return (
    <div className="lg:col-span-5 flex flex-col lg:pl-space-lg lg:pt-0 pt-6 px-0">
      <div className="lg:sticky lg:top-28 flex flex-col space-y-3.5 sm:space-y-4">
        {/* BADGES & TITLE */}
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="font-label-sm text-[9px] sm:text-label-sm bg-primary text-on-primary font-bold px-2 py-0.5 uppercase tracking-widest">
              {product.badges[0] || 'NEW DISPATCH // ARCHIVE FW25'}
            </span>
            {product.badges[1] && (
              <span className="font-label-sm text-[9px] sm:text-label-sm text-outline border border-outline-variant px-2 py-0.5 uppercase">
                {product.badges[1]}
              </span>
            )}
          </div>

          <h1 className="font-headline-md text-2xl sm:text-3xl lg:text-headline-md text-primary tracking-tighter uppercase mt-0.5 leading-none">
            {product.title}
          </h1>

          {/* PRICING & INVENTORY */}
          <div className="flex items-baseline justify-between flex-wrap gap-2 border-b border-outline-variant pb-2.5 sm:pb-space-sm pt-1.5">
            <div className="font-headline-sm text-xl sm:text-headline-sm text-primary font-bold tracking-tight">
              ${product.price}{' '}
              <span className="font-label-md text-xs sm:text-label-md text-on-surface-variant font-normal">
                {product.currency}
              </span>
            </div>

            <div className="font-label-sm text-[9px] sm:text-label-sm text-outline tracking-wider uppercase flex items-center gap-1.5">
              <span className="relative flex h-2 w-2 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full bg-error opacity-75" />
                <span className="relative inline-flex h-2 w-2 bg-error" />
              </span>
              <span className="text-error font-medium">{product.lowInventoryText}</span>
            </div>
          </div>
        </div>

        {/* PRODUCT DESCRIPTION SUMMARY */}
        <p className="font-body-md text-xs sm:text-body-md text-on-surface-variant leading-relaxed">
          {product.description}
        </p>

        {/* COLORWAY SELECTOR */}
        <ColorwaySelector
          colorways={product.colorways}
          selectedColor={selectedColor}
          onSelectColor={onSelectColor}
        />

        {/* SIZE SELECTOR */}
        <SizeSelector
          sizes={product.sizes}
          selectedSize={selectedSize}
          onSelectSize={onSelectSize}
          onOpenSizeGuide={onOpenSizeGuide}
          modelNote={product.modelNote}
        />

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-2 pt-space-xs">
          {/* PRIMARY CTA BUTTON */}
          <button
            type="button"
            id="add-to-bag-btn"
            onClick={onAddToBag}
            disabled={ctaState === 'allocating'}
            className={`w-full bg-primary text-on-primary hover:bg-surface-container-highest hover:text-primary hover:border hover:border-primary border border-transparent font-label-lg text-xs sm:text-label-lg py-3.5 sm:py-4 uppercase tracking-widest font-black transition-all flex items-center justify-center gap-2.5 sm:gap-3 group active:scale-[0.99] cursor-pointer select-none ${
              ctaState === 'allocating' ? 'opacity-80' : ''
            }`}
          >
            <BagIcon size={18} className="group-hover:rotate-12 transition-transform" />
            <span id="cta-label">{getCtaLabel()}</span>
          </button>

          {/* SECONDARY MICRO-ACTIONS */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              id="wishlist-btn"
              onClick={onToggleArchive}
              className="border border-outline-variant bg-surface-container-lowest hover:border-primary hover:text-primary text-on-surface-variant font-label-sm text-[10px] sm:text-label-sm uppercase py-2.5 sm:py-3 px-2 tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer select-none"
            >
              {isArchived ? (
                <BookmarkIcon size={16} className="text-primary flex-shrink-0" />
              ) : (
                <BookmarkBorderIcon size={16} className="flex-shrink-0" />
              )}
              <span id="wishlist-text" className="truncate">
                {isArchived ? 'SAVED TO ARCHIVE' : 'SAVE TO ARCHIVE'}
              </span>
            </button>

            <button
              type="button"
              onClick={onShareSpec}
              className="border border-outline-variant bg-surface-container-lowest hover:border-primary hover:text-primary text-on-surface-variant font-label-sm text-[10px] sm:text-label-sm uppercase py-2.5 sm:py-3 px-2 tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer select-none"
            >
              <ShareIcon size={16} className="flex-shrink-0" />
              <span id="share-text">SHARE SPEC</span>
            </button>
          </div>
        </div>

        {/* TECHNICAL ACCORDIONS */}
        <ProductAccordions />

        {/* INDUSTRIAL AUTHENTICITY TICKER */}
        <div className="border border-outline-variant p-2.5 sm:p-3 bg-surface flex items-center justify-between font-label-sm text-[10px] sm:text-label-sm text-outline gap-2">
          <div className="flex items-center gap-2 truncate">
            <ShieldCheckIcon size={16} className="text-primary flex-shrink-0" />
            <span className="truncate">VOID™ CRYPTOGRAPHIC NFC EMBEDDED</span>
          </div>
          <span className="text-primary font-bold flex-shrink-0">SEC-VERIFIED</span>
        </div>
      </div>
    </div>
  );
};
