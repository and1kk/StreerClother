import React from 'react';
import { ChevronRightIcon } from '../../../components/ui/Icons';

export interface PaginationProps {
  currentPage?: number;
  totalPages?: number;
  totalItems?: number;
  displayedItems?: number;
  onPageChange?: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages = 3,
  totalItems = 142,
  displayedItems = 8,
  onPageChange
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="px-4 sm:px-6 md:px-10 py-8 border-b border-neutral-800 bg-[#131313] flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="font-mono text-[11px] text-neutral-400 uppercase tracking-widest">
        SHOWING {displayedItems} OF {totalItems} CATALOGUED DISPATCHES
      </div>

      <div className="flex items-center gap-1">
        {pages.map((p) => {
          const isActive = p === currentPage;
          return (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange?.(p)}
              className={`w-10 h-10 border font-mono text-xs font-bold flex items-center justify-center transition-colors ${
                isActive
                  ? 'border-white bg-white text-black'
                  : 'border-neutral-800 text-neutral-300 hover:border-neutral-400'
              }`}
            >
              {p}
            </button>
          );
        })}

        <button
          type="button"
          onClick={() => onPageChange?.(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage >= totalPages}
          aria-label="Next page"
          className="w-10 h-10 border border-neutral-800 text-neutral-300 hover:border-neutral-400 font-mono text-xs flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronRightIcon size={16} />
        </button>
      </div>
    </div>
  );
};
