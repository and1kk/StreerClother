import React, { useState } from 'react';
import { ChevronDownIcon } from '../../../components/ui/Icons';
import { Checkbox } from '../../../components/ui/Checkbox';
import { Radio } from '../../../components/ui/Radio';
import { Button } from '../../../components/ui/Button';
import { PriceRangeSlider } from '../../../components/ui/PriceRangeSlider';
import { FilterState } from '../../../types/catalog.types';
import { CATEGORIES_LIST, SIZES_LIST, COLORS_LIST, FITS_LIST } from '../../../data/products.data';

export interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onApplyFilters?: () => void;
  onClearFilters: () => void;
  className?: string;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onFilterChange,
  onApplyFilters,
  onClearFilters,
  className = ''
}) => {
  // Accordion state
  const [openSections, setOpenSections] = useState({
    categories: true,
    sizes: true,
    palette: true,
    fit: true,
    price: true
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCategoryToggle = (category: string) => {
    const exists = filters.categories.includes(category);
    const newCategories = exists
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleSizeToggle = (size: string) => {
    const exists = filters.sizes.includes(size);
    const newSizes = exists
      ? filters.sizes.filter((s) => s !== size)
      : [...filters.sizes, size];

    onFilterChange({ ...filters, sizes: newSizes });
  };

  const handleColorToggle = (colorName: string) => {
    const exists = filters.colors.includes(colorName);
    const newColors = exists
      ? filters.colors.filter((c) => c !== colorName)
      : [...filters.colors, colorName];

    onFilterChange({ ...filters, colors: newColors });
  };

  const handleFitChange = (fit: string) => {
    onFilterChange({
      ...filters,
      fitType: filters.fitType === fit ? '' : fit
    });
  };

  const handleMinPriceChange = (val: number) => {
    onFilterChange({
      ...filters,
      priceRange: [val, filters.priceRange[1]]
    });
  };

  const handleMaxPriceChange = (val: number) => {
    onFilterChange({
      ...filters,
      priceRange: [filters.priceRange[0], val]
    });
  };

  return (
    <aside className={`w-72 flex-shrink-0 border-r border-neutral-800 bg-[#0e0e0e] p-7 self-start sticky top-[113px] h-[calc(100vh-113px)] overflow-y-auto ${className}`}>
      {/* HEADER */}
      <div className="flex items-center justify-between pb-5 border-b border-neutral-800 mb-7 pt-1 px-1">
        <span className="font-display text-base sm:text-lg text-white uppercase tracking-wider font-bold brand-display-title">
          INDEX FILTER
        </span>
        <button
          type="button"
          onClick={onClearFilters}
          className="font-mono text-[10px] text-neutral-500 hover:text-white underline uppercase transition-colors"
        >
          RESET ALL
        </button>
      </div>

      <div className="flex flex-col space-y-6">
        {/* 01 / CATEGORY */}
        <div className="border-b border-neutral-800 pb-6">
          <button
            type="button"
            onClick={() => toggleSection('categories')}
            className="w-full flex items-center justify-between text-left group"
          >
            <span className="font-mono text-xs text-white uppercase tracking-widest font-bold">
              01 / CATEGORY
            </span>
            <ChevronDownIcon
              size={16}
              className={`text-neutral-400 group-hover:text-white transition-transform ${
                openSections.categories ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.categories && (
            <div className="mt-4 flex flex-col space-y-2.5">
              {CATEGORIES_LIST.map((cat) => (
                <Checkbox
                  key={cat.name}
                  label={cat.name}
                  count={cat.count}
                  checked={filters.categories.includes(cat.name)}
                  onChange={() => handleCategoryToggle(cat.name)}
                />
              ))}
            </div>
          )}
        </div>

        {/* 02 / SIZE SPEC */}
        <div className="border-b border-neutral-800 pb-6">
          <button
            type="button"
            onClick={() => toggleSection('sizes')}
            className="w-full flex items-center justify-between text-left group"
          >
            <span className="font-mono text-xs text-white uppercase tracking-widest font-bold">
              02 / SIZE SPEC
            </span>
            <ChevronDownIcon
              size={16}
              className={`text-neutral-400 group-hover:text-white transition-transform ${
                openSections.sizes ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.sizes && (
            <div className="mt-4 grid grid-cols-4 gap-2">
              {SIZES_LIST.map((size) => {
                const isSelected = filters.sizes.includes(size);
                const isDisabled = size === 'XXL';

                if (isDisabled) {
                  return (
                    <button
                      key={size}
                      disabled
                      type="button"
                      className="py-2 text-center font-mono text-[11px] border border-neutral-800 text-neutral-600 line-through cursor-not-allowed bg-neutral-900/40"
                    >
                      {size}
                    </button>
                  );
                }

                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => handleSizeToggle(size)}
                    className={`py-2 text-center font-mono text-[11px] border transition-all ${
                      isSelected
                        ? 'bg-white text-black border-white font-bold'
                        : 'border-neutral-800 text-neutral-300 hover:border-neutral-400'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 03 / PALETTE */}
        <div className="border-b border-neutral-800 pb-6">
          <button
            type="button"
            onClick={() => toggleSection('palette')}
            className="w-full flex items-center justify-between text-left group"
          >
            <span className="font-mono text-xs text-white uppercase tracking-widest font-bold">
              03 / PALETTE
            </span>
            <ChevronDownIcon
              size={16}
              className={`text-neutral-400 group-hover:text-white transition-transform ${
                openSections.palette ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.palette && (
            <div className="mt-4 flex flex-wrap gap-3">
              {COLORS_LIST.map((c) => {
                const isSelected = filters.colors.includes(c.name);
                return (
                  <button
                    key={c.name}
                    type="button"
                    title={c.name}
                    onClick={() => handleColorToggle(c.name)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-7 h-7 transition-all ${
                      isSelected
                        ? 'border-2 border-white ring-2 ring-white/40 ring-offset-2 ring-offset-[#131313]'
                        : 'border border-neutral-700 hover:border-white'
                    }`}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* 04 / SILHOUETTE FIT */}
        <div className="border-b border-neutral-800 pb-6">
          <button
            type="button"
            onClick={() => toggleSection('fit')}
            className="w-full flex items-center justify-between text-left group"
          >
            <span className="font-mono text-xs text-white uppercase tracking-widest font-bold">
              04 / SILHOUETTE FIT
            </span>
            <ChevronDownIcon
              size={16}
              className={`text-neutral-400 group-hover:text-white transition-transform ${
                openSections.fit ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.fit && (
            <div className="mt-4 flex flex-col space-y-1">
              {FITS_LIST.map((fit) => (
                <Radio
                  key={fit}
                  name="fit-type"
                  label={fit}
                  checked={filters.fitType === fit}
                  onChange={() => handleFitChange(fit)}
                />
              ))}
            </div>
          )}
        </div>

        {/* 05 / VALUATION (USD) */}
        <div className="pb-2">
          <button
            type="button"
            onClick={() => toggleSection('price')}
            className="w-full flex items-center justify-between text-left group"
          >
            <span className="font-mono text-xs text-white uppercase tracking-widest font-bold">
              05 / VALUATION (USD)
            </span>
            <ChevronDownIcon
              size={16}
              className={`text-neutral-400 group-hover:text-white transition-transform ${
                openSections.price ? 'rotate-180' : ''
              }`}
            />
          </button>

          {openSections.price && (
            <div className="mt-5 flex flex-col space-y-4">
              {/* INTERACTIVE DUAL THUMB SLIDER */}
              <PriceRangeSlider
                min={0}
                max={500}
                step={10}
                value={filters.priceRange}
                onChange={(val) => onFilterChange({ ...filters, priceRange: val })}
              />

              {/* INPUT BOUNDS */}
              <div className="flex items-center gap-2 pt-2">
                <div className="flex-1 bg-[#131313] border border-neutral-700 px-2.5 py-1.5 flex items-center">
                  <span className="font-mono text-[10px] text-neutral-500 mr-1">$</span>
                  <input
                    type="number"
                    min={0}
                    max={500}
                    value={filters.priceRange[0]}
                    onChange={(e) => handleMinPriceChange(Number(e.target.value))}
                    className="w-full bg-transparent font-mono text-xs text-white focus:outline-none"
                  />
                </div>
                <span className="text-neutral-500 font-mono text-xs">—</span>
                <div className="flex-1 bg-[#131313] border border-neutral-700 px-2.5 py-1.5 flex items-center">
                  <span className="font-mono text-[10px] text-neutral-500 mr-1">$</span>
                  <input
                    type="number"
                    min={0}
                    max={500}
                    value={filters.priceRange[1]}
                    onChange={(e) => handleMaxPriceChange(Number(e.target.value))}
                    className="w-full bg-transparent font-mono text-xs text-white focus:outline-none"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ACTION ROW */}
        <div className="pt-4 flex flex-col gap-2">
          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            onClick={onApplyFilters}
          >
            APPLY FILTER PARAMS
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="sm"
            fullWidth
            onClick={onClearFilters}
          >
            PURGE CRITERIA [CLEAR]
          </Button>
        </div>
      </div>
    </aside>
  );
};
