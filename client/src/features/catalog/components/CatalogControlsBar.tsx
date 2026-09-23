import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, FilterIcon, SearchIcon } from '../../../components/ui/Icons';
import { SortOrder } from '../../../types/catalog.types';

export interface CatalogControlsBarProps {
  totalCount: number;
  season?: string;
  activeFilterCount: number;
  currentSort: SortOrder;
  onSortChange: (sort: SortOrder) => void;
  onOpenMobileFilters: () => void;
  onOpenSearch?: () => void;
}

const SORT_OPTIONS: SortOrder[] = [
  'NEWEST DISPATCH',
  'PRICE: LOW TO HIGH',
  'PRICE: HIGH TO LOW',
  'ARCHIVAL PRIORITY'
];

const SORT_SHORT_LABELS: Record<SortOrder, string> = {
  'NEWEST DISPATCH': 'NEW',
  'PRICE: LOW TO HIGH': 'PRICE ↑',
  'PRICE: HIGH TO LOW': 'PRICE ↓',
  'ARCHIVAL PRIORITY': 'ARCHIVE'
};

export const CatalogControlsBar: React.FC<CatalogControlsBarProps> = ({
  totalCount,
  season = 'SEASON FW25',
  activeFilterCount,
  currentSort,
  onSortChange,
  onOpenMobileFilters,
  onOpenSearch
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <section className="sticky top-16 z-40 w-full bg-[#0e0e0e] border-b border-neutral-800">
      <div className="px-4 sm:px-6 md:px-10 py-2.5 sm:py-3 flex flex-wrap items-center justify-between gap-3">
        {/* SPEC INFO */}
        <div className="flex items-center gap-3 sm:gap-4">
          <span className="font-mono text-[10px] sm:text-[11px] text-neutral-400 uppercase tracking-wider sm:tracking-widest flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 bg-white"></span>
            CATALOG // <span className="text-white font-bold">{totalCount}</span> UNITS
          </span>
          <span className="hidden sm:inline text-neutral-500 font-mono text-[11px]">
            | {season}
          </span>
        </div>

        {/* CONTROLS (Fixed width buttons, aligned flex-end / far right on both mobile and PC) */}
        <div className="flex items-center justify-end gap-2 sm:gap-3 ml-auto">
          {/* SEARCH BUTTON (Identical fixed size w-28 sm:w-32 md:w-36) */}
          <button
            type="button"
            onClick={onOpenSearch}
            className="w-28 sm:w-32 md:w-36 h-9 sm:h-9.5 flex items-center justify-between bg-[#131313] text-white border border-neutral-700 hover:border-white px-2.5 sm:px-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider hover:bg-white hover:text-black transition-all cursor-pointer select-none flex-shrink-0"
          >
            <div className="flex items-center gap-1.5">
              <SearchIcon size={13} />
              <span>SEARCH</span>
            </div>
            <span className="text-neutral-500 font-mono text-[9px] sm:text-[10px]">[FIND]</span>
          </button>

          {/* SORT DROPDOWN (Fixed width w-28 sm:w-32 md:w-36) */}
          <div className="relative flex-shrink-0" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-28 sm:w-32 md:w-36 h-9 sm:h-9.5 flex items-center justify-between bg-[#131313] text-white border border-neutral-700 px-2.5 sm:px-3 font-mono text-[10px] sm:text-[11px] uppercase hover:border-white transition-colors cursor-pointer select-none"
            >
              <div className="flex items-center gap-1.5 truncate">
                <span className="text-neutral-400">SORT:</span>
                <span className="text-white font-bold">{SORT_SHORT_LABELS[currentSort]}</span>
              </div>
              <ChevronDownIcon
                size={14}
                className={`transition-transform duration-200 flex-shrink-0 ${dropdownOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-52 bg-[#0e0e0e] border border-white z-50 shadow-[4px_4px_0px_0px_#ffffff]">
                <div className="flex flex-col divide-y divide-neutral-800 font-mono text-[11px]">
                  {SORT_OPTIONS.map((option) => {
                    const isSelected = currentSort === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          onSortChange(option);
                          setDropdownOpen(false);
                        }}
                        className={`text-left px-3.5 py-2.5 uppercase transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-white text-black font-bold'
                            : 'text-neutral-300 hover:bg-white hover:text-black'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* FILTER TOGGLE BUTTON (Hidden on PC lg:hidden; exactly same fixed size w-28 sm:w-32 md:w-36 as SEARCH and SORT) */}
          <button
            type="button"
            onClick={onOpenMobileFilters}
            className="lg:hidden w-28 sm:w-32 md:w-36 h-9 sm:h-9.5 flex items-center justify-between bg-[#131313] text-white border border-neutral-700 hover:border-white px-2.5 sm:px-3 font-mono text-[10px] sm:text-[11px] uppercase tracking-wider hover:bg-white hover:text-black transition-all cursor-pointer select-none flex-shrink-0"
          >
            <div className="flex items-center gap-1.5">
              <FilterIcon size={13} />
              <span>FILTERS</span>
            </div>
            {activeFilterCount > 0 ? (
              <span className="bg-white text-black px-1.5 py-0.5 font-mono text-[9px] font-black">
                {activeFilterCount}
              </span>
            ) : (
              <span className="text-neutral-500 font-mono text-[9px] sm:text-[10px]">ALL</span>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
