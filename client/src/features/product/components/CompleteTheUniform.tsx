import React, { useState } from 'react';
import { CompatibleProduct } from '../types/product-detail.types';
import { ArrowForwardIcon } from '../../../components/ui/Icons';

export interface CompleteTheUniformProps {
  items: CompatibleProduct[];
  onQuickAdd: (item: CompatibleProduct) => void;
  onViewAll?: () => void;
}

export const CompleteTheUniform: React.FC<CompleteTheUniformProps> = ({
  items,
  onQuickAdd,
  onViewAll
}) => {
  const [queuedIds, setQueuedIds] = useState<Record<string, boolean>>({});

  const handleQuickAddClick = (item: CompatibleProduct) => {
    setQueuedIds((prev) => ({ ...prev, [item.id]: true }));
    onQuickAdd(item);

    setTimeout(() => {
      setQueuedIds((prev) => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  return (
    <section className="w-full px-4 sm:px-6 md:px-margin bg-surface-container-lowest py-8 sm:py-space-xl">
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-3 sm:pb-space-md border-b border-outline-variant mb-4 sm:mb-space-lg gap-2 sm:gap-4">
        <div className="flex flex-col gap-0.5 sm:gap-1">
          <div className="font-label-sm text-[9px] sm:text-label-sm text-outline uppercase tracking-wider sm:tracking-widest">
            CO-ORDINATE ARCHIVE SET // COMPATIBLE HARDWARE
          </div>
          <h2 className="font-headline-md text-xl sm:text-2xl md:text-headline-md text-primary uppercase tracking-tight">
            COMPLETE THE UNIFORM // COMPATIBLE SPEC
          </h2>
        </div>

        <button
          type="button"
          onClick={onViewAll}
          className="font-label-md text-xs sm:text-label-md text-primary underline underline-offset-4 uppercase tracking-wider sm:tracking-widest hover:text-outline transition-colors flex items-center gap-1 cursor-pointer self-start sm:self-auto"
        >
          <span>VIEW ALL COMPATIBLE (142)</span>
          <ArrowForwardIcon size={14} className="sm:w-4 sm:h-4" />
        </button>
      </div>

      {/* 2-COLUMN ON MOBILE / 4-COLUMN ON DESKTOP */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border border-outline-variant bg-surface">
        {items.map((item, index) => {
          const isQueued = queuedIds[item.id];
          const isOdd = index % 2 === 0;
          return (
            <article
              key={item.id}
              className={`flex flex-col border-b ${
                isOdd ? 'border-r' : ''
              } lg:border-r lg:last:border-r-0 lg:border-b-0 border-outline-variant p-2.5 sm:p-space-md group hover:bg-surface-container transition-colors relative`}
            >
              {/* TOP SPEC & BADGE */}
              <div className="flex items-center justify-between mb-2 sm:mb-space-sm font-label-sm text-[9px] sm:text-label-sm">
                <span className="text-outline uppercase truncate max-w-[80px] sm:max-w-none">
                  {item.sku}
                </span>
                {item.badgeText && (
                  <span className="bg-surface-container-highest px-1 sm:px-1.5 py-0.5 text-primary text-[8px] sm:text-[9px] uppercase font-bold">
                    {item.badgeText}
                  </span>
                )}
              </div>

              {/* IMAGE */}
              <div className="aspect-[3/4] w-full bg-surface-container-low mb-2 sm:mb-space-sm overflow-hidden border border-outline-variant">
                <img
                  src={item.imageUrl}
                  alt={item.alt}
                  className="w-full h-full object-cover object-center grayscale contrast-125 group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* INFO & QUICK ADD */}
              <div className="flex flex-col flex-1 justify-between gap-2">
                <div>
                  <span className="font-label-sm text-[9px] sm:text-label-sm text-outline uppercase truncate block">
                    {item.categorySpec}
                  </span>
                  <h3 className="font-headline-sm text-xs sm:text-[15px] lg:text-[18px] leading-tight text-primary uppercase tracking-tight mt-1 line-clamp-2">
                    {item.title}
                  </h3>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 pt-1.5 sm:pt-space-xs border-t border-outline-variant">
                  <span className="font-label-lg text-xs sm:text-label-lg text-primary font-bold">
                    ${item.price} USD
                  </span>
                  <button
                    type="button"
                    onClick={() => handleQuickAddClick(item)}
                    className={`border font-label-sm text-[9px] sm:text-label-sm px-2 sm:px-3 py-1 uppercase tracking-wider transition-colors cursor-pointer select-none text-center ${
                      isQueued
                        ? 'bg-primary text-on-primary border-primary'
                        : 'border-outline hover:border-primary hover:bg-primary hover:text-on-primary'
                    }`}
                  >
                    {isQueued ? 'QUEUED' : '+ QUICK ADD'}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
