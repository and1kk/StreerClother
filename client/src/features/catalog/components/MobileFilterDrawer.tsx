import React, { useState } from 'react';
import { CloseIcon, ChevronDownIcon } from '../../../components/ui/Icons';
import { Checkbox } from '../../../components/ui/Checkbox';
import { Radio } from '../../../components/ui/Radio';
import { Button } from '../../../components/ui/Button';
import { PriceRangeSlider } from '../../../components/ui/PriceRangeSlider';
import { FilterState } from '../../../types/catalog.types';
import {
  CATEGORIES_LIST,
  SIZES_LIST,
  COLORS_LIST,
  FITS_LIST
} from '../../../data/products.data';

export interface MobileFilterDrawerProps {
  isOpen: boolean;
  filters: FilterState;
  onClose: () => void;
  onFilterChange: (filters: FilterState) => void;
  onClearFilters: () => void;
  onConfirm: () => void;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  filters,
  onClose,
  onFilterChange,
  onClearFilters,
  onConfirm
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
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/85 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      {/* DRAWER CONTAINER */}
      <div
        className={`absolute inset-y-0 right-0 max-w-full w-[340px] xs:w-[380px] bg-[#0e0e0e] border-l border-neutral-800 flex flex-col transition-transform duration-300 z-10 shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* STICKY DRAWER HEADER */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between sticky top-0 bg-[#0e0e0e] z-20">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg text-white uppercase font-bold brand-display-title">
              INDEX FILTER
            </span>
            <span className="font-mono text-[10px] text-neutral-400 bg-neutral-900 border border-neutral-800 px-1.5 py-0.5">
              ALL SPEC
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="p-1.5 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* SCROLLABLE FILTER BODY WITH ALL 5 SECTIONS */}
        <div className="p-5 flex flex-col space-y-5 flex-1 overflow-y-auto">
          {/* 01 // CATEGORY SPEC */}
          <div className="border-b border-neutral-800 pb-4">
            <button
              type="button"
              onClick={() => toggleSection('categories')}
              className="w-full flex items-center justify-between text-left group cursor-pointer"
            >
              <span className="font-mono text-xs text-white uppercase tracking-widest font-bold">
                01 // CATEGORY
              </span>
              <ChevronDownIcon
                size={16}
                className={`text-neutral-400 group-hover:text-white transition-transform ${
                  openSections.categories ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openSections.categories && (
              <div className="mt-3 flex flex-col space-y-2">
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

          {/* 02 // SIZE SPEC */}
          <div className="border-b border-neutral-800 pb-4">
            <button
              type="button"
              onClick={() => toggleSection('sizes')}
              className="w-full flex items-center justify-between text-left group cursor-pointer"
            >
              <span className="font-mono text-xs text-white uppercase tracking-widest font-bold">
                02 // SIZE SPEC
              </span>
              <ChevronDownIcon
                size={16}
                className={`text-neutral-400 group-hover:text-white transition-transform ${
                  openSections.sizes ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openSections.sizes && (
              <div className="mt-3 grid grid-cols-5 gap-1.5">
                {SIZES_LIST.map((size) => {
                  const isSelected = filters.sizes.includes(size);
                  const isDisabled = size === 'XXL';

                  if (isDisabled) {
                    return (
                      <button
                        key={size}
                        disabled
                        type="button"
                        className="py-2 text-center font-mono text-[11px] border border-neutral-800 text-neutral-600 line-through cursor-not-allowed bg-neutral-900/40 select-none"
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
                      className={`py-2 text-center font-mono text-[11px] border transition-all cursor-pointer select-none ${
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

          {/* 03 // PALETTE */}
          <div className="border-b border-neutral-800 pb-4">
            <button
              type="button"
              onClick={() => toggleSection('palette')}
              className="w-full flex items-center justify-between text-left group cursor-pointer"
            >
              <span className="font-mono text-xs text-white uppercase tracking-widest font-bold">
                03 // PALETTE
              </span>
              <ChevronDownIcon
                size={16}
                className={`text-neutral-400 group-hover:text-white transition-transform ${
                  openSections.palette ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openSections.palette && (
              <div className="mt-3 flex flex-wrap gap-2.5">
                {COLORS_LIST.map((c) => {
                  const isSelected = filters.colors.includes(c.name);
                  return (
                    <button
                      key={c.name}
                      type="button"
                      title={c.name}
                      onClick={() => handleColorToggle(c.name)}
                      style={{ backgroundColor: c.hex }}
                      className={`w-7 h-7 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-2 border-white ring-2 ring-white/40 ring-offset-2 ring-offset-[#0e0e0e]'
                          : 'border border-neutral-700 hover:border-white'
                      }`}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* 04 // SILHOUETTE FIT */}
          <div className="border-b border-neutral-800 pb-4">
            <button
              type="button"
              onClick={() => toggleSection('fit')}
              className="w-full flex items-center justify-between text-left group cursor-pointer"
            >
              <span className="font-mono text-xs text-white uppercase tracking-widest font-bold">
                04 // SILHOUETTE FIT
              </span>
              <ChevronDownIcon
                size={16}
                className={`text-neutral-400 group-hover:text-white transition-transform ${
                  openSections.fit ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openSections.fit && (
              <div className="mt-3 flex flex-col space-y-1.5">
                {FITS_LIST.map((fit) => (
                  <Radio
                    key={fit}
                    name="mobile-fit-type"
                    label={fit}
                    checked={filters.fitType === fit}
                    onChange={() => handleFitChange(fit)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* 05 // VALUATION (USD) */}
          <div className="pb-2">
            <button
              type="button"
              onClick={() => toggleSection('price')}
              className="w-full flex items-center justify-between text-left group cursor-pointer"
            >
              <span className="font-mono text-xs text-white uppercase tracking-widest font-bold">
                05 // VALUATION (USD)
              </span>
              <ChevronDownIcon
                size={16}
                className={`text-neutral-400 group-hover:text-white transition-transform ${
                  openSections.price ? 'rotate-180' : ''
                }`}
              />
            </button>

            {openSections.price && (
              <div className="mt-3 flex flex-col space-y-3">
                <PriceRangeSlider
                  min={0}
                  max={500}
                  step={10}
                  value={filters.priceRange}
                  onChange={(val) => onFilterChange({ ...filters, priceRange: val })}
                />

                <div className="flex items-center gap-2">
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
        </div>

        {/* STICKY DRAWER FOOTER ACTIONS */}
        <div className="p-4 border-t border-neutral-800 bg-[#0e0e0e] flex flex-col gap-2 sticky bottom-0 z-20">
          <Button
            type="button"
            variant="primary"
            size="lg"
            fullWidth
            onClick={() => {
              onConfirm();
              onClose();
            }}
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
    </div>
  );
};
