import React from 'react';

export interface MobileStickyBarProps {
  title: string;
  price: number;
  currency?: string;
  selectedSize: string;
  onAddToBag: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  title,
  price,
  currency = 'USD',
  selectedSize,
  onAddToBag
}) => {
  return (
    <aside
      aria-label="Mobile purchase bar"
      className="fixed bottom-0 left-0 w-full px-4 pt-3 pb-[calc(env(safe-area-inset-bottom,0px)+0.75rem)] bg-surface/95 backdrop-blur-md border-t border-outline-variant flex items-center justify-between z-40 lg:hidden shadow-[0_-4px_24px_rgba(0,0,0,0.7)]"
    >
      <div className="flex flex-col min-w-0 pr-2">
        <span className="font-label-sm text-[9px] text-outline uppercase leading-none truncate max-w-[150px] xs:max-w-[190px]">
          {title}
        </span>
        <span className="font-headline-sm text-[18px] xs:text-[20px] text-primary font-bold mt-0.5 leading-none">
          ${price} <span className="text-[10px] font-normal text-outline">{currency}</span>
        </span>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <span
          id="mobile-selected-size"
          className="font-label-sm text-xs border border-outline-variant px-2.5 py-2 uppercase text-primary font-mono select-none"
        >
          {selectedSize}
        </span>
        <button
          type="button"
          onClick={onAddToBag}
          className="bg-primary text-on-primary px-4 xs:px-5 py-2.5 font-label-md text-xs xs:text-label-md font-black uppercase tracking-wider active:bg-surface active:text-primary active:border active:border-primary transition-all cursor-pointer select-none"
        >
          ADD TO BAG
        </button>
      </div>
    </aside>
  );
};
