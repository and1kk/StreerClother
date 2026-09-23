import React, { useState, useMemo } from 'react';
import { CatalogControlsBar } from './components/CatalogControlsBar';
import { ActiveFilterChips } from './components/ActiveFilterChips';
import { FilterSidebar } from './components/FilterSidebar';
import { MobileFilterDrawer } from './components/MobileFilterDrawer';
import { ProductGrid } from './components/ProductGrid';
import { Pagination } from './components/Pagination';
import { DiagnosticEmptyState } from './components/DiagnosticEmptyState';
import { Toast } from '../../components/ui/Toast';
import { INITIAL_PRODUCTS } from '../../data/products.data';
import { Product, FilterState, SortOrder } from '../../types/catalog.types';

const INITIAL_FILTER_STATE: FilterState = {
  categories: ['Hoodies', 'Bottoms'],
  sizes: ['L'],
  colors: ['Black'],
  fitType: 'Boxy / Oversized',
  priceRange: [0, 350]
};

export interface CatalogPageProps {
  onSelectProduct?: (product: Product) => void;
  onOpenSearch?: () => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({ onSelectProduct, onOpenSearch }) => {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER_STATE);
  const [currentSort, setCurrentSort] = useState<SortOrder>('NEWEST DISPATCH');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active filter count
  const activeFilterCount = useMemo(() => {
    let count = filters.categories.length + filters.sizes.length + filters.colors.length;
    if (filters.fitType) count += 1;
    if (filters.priceRange[0] > 0 || filters.priceRange[1] < 500) count += 1;
    return count;
  }, [filters]);

  // Handle Sort Change
  const handleSortChange = (newSort: SortOrder) => {
    setCurrentSort(newSort);
    setToastMessage(`SORT UPDATED: ${newSort}`);
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter by category if any selected
    if (filters.categories.length > 0) {
      list = list.filter((p) => filters.categories.includes(p.category));
    }

    // Filter by size if any selected
    if (filters.sizes.length > 0) {
      list = list.filter((p) => p.availableSizes.some((s) => filters.sizes.includes(s)));
    }

    // Filter by fit type if selected
    if (filters.fitType) {
      list = list.filter((p) => p.fit.toLowerCase() === filters.fitType.toLowerCase());
    }

    // Filter by price range
    list = list.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Apply sorting
    if (currentSort === 'PRICE: LOW TO HIGH') {
      list.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'PRICE: HIGH TO LOW') {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, filters, currentSort]);

  // Filter actions
  const handleClearFilters = () => {
    setFilters({
      categories: [],
      sizes: [],
      colors: [],
      fitType: '',
      priceRange: [0, 500]
    });
    setToastMessage('ALL PARAMETERS PURGED');
  };

  const handleRemoveCategory = (cat: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.filter((c) => c !== cat)
    }));
  };

  const handleRemoveSize = (size: string) => {
    setFilters((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((s) => s !== size)
    }));
  };

  const handleRemoveColor = (color: string) => {
    setFilters((prev) => ({
      ...prev,
      colors: prev.colors.filter((c) => c !== color)
    }));
  };

  const handleResetFit = () => {
    setFilters((prev) => ({ ...prev, fitType: '' }));
  };

  const handleQuickAdd = (product: Product, size: string) => {
    setToastMessage(`DISPATCHED: ${product.title} [${size}] TO REGISTER`);
  };

  return (
    <div className="flex flex-col w-full">
      {/* TOAST NOTIFICATION */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

      {/* CATALOG CONTROLS BAR */}
      <CatalogControlsBar
        totalCount={142}
        season="SEASON FW25"
        activeFilterCount={activeFilterCount}
        currentSort={currentSort}
        onSortChange={handleSortChange}
        onOpenMobileFilters={() => setMobileDrawerOpen(true)}
        onOpenSearch={onOpenSearch}
      />

      {/* MAIN VIEWPORT */}
      <div className="w-full flex">
        {/* DESKTOP FILTER SIDEBAR */}
        <FilterSidebar
          className="hidden lg:block"
          filters={filters}
          onFilterChange={setFilters}
          onClearFilters={handleClearFilters}
          onApplyFilters={() => setToastMessage('PARAM SELECTION SYNCHRONIZED')}
        />

        {/* RIGHT DYNAMIC PRODUCT VIEW */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* APPLIED CHIPS */}
          <ActiveFilterChips
            filters={filters}
            onRemoveCategory={handleRemoveCategory}
            onRemoveSize={handleRemoveSize}
            onRemoveColor={handleRemoveColor}
            onResetFit={handleResetFit}
            onClearAll={handleClearFilters}
          />

          {/* PRODUCT GRID */}
          <ProductGrid
            products={filteredProducts.length > 0 ? filteredProducts : products}
            onQuickAdd={handleQuickAdd}
            onSelectProduct={onSelectProduct}
          />

          {/* PAGINATION FOOTER */}
          <Pagination
            currentPage={currentPage}
            totalPages={3}
            totalItems={142}
            displayedItems={products.length}
            onPageChange={setCurrentPage}
          />

          {/* DIAGNOSTIC EMPTY STATE PREVIEW */}
          <DiagnosticEmptyState onPurgeFilters={handleClearFilters} />
        </div>
      </div>

      {/* MOBILE SLIDE-OVER DRAWER */}
      <MobileFilterDrawer
        isOpen={mobileDrawerOpen}
        filters={filters}
        onClose={() => setMobileDrawerOpen(false)}
        onFilterChange={setFilters}
        onClearFilters={handleClearFilters}
        onConfirm={() => setToastMessage('PARAM SELECTION SYNCHRONIZED')}
      />
    </div>
  );
};
