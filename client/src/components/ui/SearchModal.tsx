import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, CloseIcon, ArrowForwardIcon } from './Icons';
import { Product } from '../../types/catalog.types';
import { INITIAL_PRODUCTS } from '../../data/products.data';

export interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim()
    ? INITIAL_PRODUCTS.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.sku.toLowerCase().includes(query.toLowerCase())
      )
    : INITIAL_PRODUCTS.slice(0, 4);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-start justify-center bg-[#131313]/90 backdrop-blur-md p-4 pt-16 sm:pt-24 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#0e0e0e] border border-white shadow-[8px_8px_0px_0px_#ffffff] p-5 sm:p-6 flex flex-col space-y-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* SEARCH INPUT BAR */}
        <div className="flex items-center gap-3 border-b border-neutral-700 pb-3">
          <SearchIcon size={20} className="text-white flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="SEARCH SPEC BY TITLE, SKU, OR CATEGORY..."
            className="w-full bg-transparent text-white font-mono text-xs sm:text-sm uppercase placeholder-neutral-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close search"
            className="text-neutral-400 hover:text-white p-1 cursor-pointer transition-colors"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* RESULTS HEADER */}
        <div className="flex items-center justify-between font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
          <span>{query.trim() ? `FOUND ${results.length} UNITS` : 'SUGGESTED DISPATCH ARTIFACTS'}</span>
          <span>ESC TO EXIT</span>
        </div>

        {/* RESULTS LIST */}
        <div className="divide-y divide-neutral-900 max-h-[380px] overflow-y-auto">
          {results.length === 0 ? (
            <div className="py-8 text-center font-mono text-xs text-neutral-500 uppercase">
              NO MATCHING ARCHIVE HARDWARE LOCATED
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="py-3 flex items-center justify-between gap-4 group cursor-pointer hover:bg-neutral-900/60 px-2 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-12 h-14 bg-neutral-900 border border-neutral-800 overflow-hidden flex-shrink-0">
                    <img
                      src={product.primaryImage}
                      alt={product.title}
                      className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-[9px] text-neutral-500 uppercase block">
                      {product.sku} // {product.category}
                    </span>
                    <h4 className="font-sans text-xs font-bold text-white uppercase tracking-tight truncate group-hover:underline">
                      {product.title}
                    </h4>
                    <span className="font-mono text-xs text-white font-bold block mt-0.5">
                      ${product.price} USD
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 font-mono text-[10px] text-neutral-400 group-hover:text-white uppercase transition-colors flex-shrink-0">
                  <span className="hidden sm:inline">VIEW SPEC</span>
                  <ArrowForwardIcon size={14} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
