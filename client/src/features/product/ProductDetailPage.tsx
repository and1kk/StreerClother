import React, { useState } from 'react';
import { ProductDetailData, ProductColorway, CompatibleProduct } from './types/product-detail.types';
import { HOODIE_PRODUCT_DATA } from './data/product-detail.data';
import { BreadcrumbBar } from './components/BreadcrumbBar';
import { ProductGallery } from './components/ProductGallery';
import { ProductInfoPanel } from './components/ProductInfoPanel';
import { CompleteTheUniform } from './components/CompleteTheUniform';
import { SizeGuideModal } from './components/SizeGuideModal';
import { MobileStickyBar } from './components/MobileStickyBar';
import { Toast } from '../../components/ui/Toast';

export interface ProductDetailPageProps {
  product?: ProductDetailData;
  onNavigateHome?: () => void;
  onNavigateCategory?: () => void;
  onCartCountChange?: (count: number) => void;
  onAddToCart?: (item: {
    productId: string;
    sku: string;
    title: string;
    price: number;
    color: string;
    size: string;
    quantity: number;
    imageUrl: string;
  }) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product = HOODIE_PRODUCT_DATA,
  onNavigateHome,
  onNavigateCategory,
  onCartCountChange,
  onAddToCart
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColorway>(
    product.colorways?.[0] || { id: 'default', name: 'DEFAULT', code: '00', hex: '#111' }
  );
  const [selectedSize, setSelectedSize] = useState(
    product.sizes?.[0]?.label || 'L'
  );
  const [isArchived, setIsArchived] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [ctaState, setCtaState] = useState<'idle' | 'allocating' | 'added'>('idle');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const handleSelectColor = (color: ProductColorway) => {
    setSelectedColor(color);
    showToast(`COLOR PROTOCOL APPLIED: ${color.name}`);
  };

  const handleSelectSize = (size: string) => {
    setSelectedSize(size);
  };

  const handleAddToBag = () => {
    if (ctaState === 'allocating') return;
    setCtaState('allocating');

    setTimeout(() => {
      setCtaState('added');
      const itemImage =
        selectedColor.image ||
        product.slides?.[0]?.imageUrl ||
        '';

      onAddToCart?.({
        productId: product.id || product.sku,
        sku: product.sku,
        title: product.title,
        price: product.price,
        color: selectedColor.name,
        size: selectedSize,
        quantity: 1,
        imageUrl: itemImage
      });

      showToast(`DISPATCH QUEUED: ${product.title} (${selectedSize} / ${selectedColor.name})`);
      onCartCountChange?.(1);

      setTimeout(() => {
        setCtaState('idle');
      }, 2500);
    }, 600);
  };

  const handleToggleArchive = () => {
    const nextStatus = !isArchived;
    setIsArchived(nextStatus);
    if (nextStatus) {
      showToast('SPEC LOGGED TO ENCRYPTED ARCHIVE');
    } else {
      showToast('SPEC REMOVED FROM USER ARCHIVE');
    }
  };

  const handleShareSpec = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator
        .share({
          title: `VOID™ ${product.title}`,
          url: window.location.href
        })
        .catch(() => {});
    } else if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href).catch(() => {});
      showToast('TELEMETRY LINK COPIED TO CLIPBOARD');
    } else {
      showToast('TELEMETRY LINK COPIED TO CLIPBOARD');
    }
  };

  const handleQuickAdd = (item: CompatibleProduct) => {
    onAddToCart?.({
      productId: item.sku,
      sku: item.sku,
      title: item.title,
      price: item.price,
      color: 'WASHED BLACK',
      size: 'L',
      quantity: 1,
      imageUrl: item.imageUrl
    });
    showToast(`UNIFORM COMPONENT ADDED: ${item.title} ($${item.price})`);
    onCartCountChange?.(1);
  };

  return (
    <div className="flex flex-col w-full bg-surface pb-24 lg:pb-0">
      {/* TOAST NOTIFICATION */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* BREADCRUMBS & TOP METADATA BAR */}
      <BreadcrumbBar
        category={product.category}
        title={product.title}
        sku={product.sku}
        specStatus={product.specVerification ? `SPEC VERIFICATION: ${product.specVerification}` : undefined}
        edition={`EDITION: ${product.edition}`}
        onNavigateHome={onNavigateHome}
        onNavigateCategory={onNavigateCategory}
      />

      {/* MAIN PRODUCT LAYOUT: 60% MEDIA / 40% STICKY INFO */}
      <div className="w-full px-3 sm:px-6 md:px-margin py-3 sm:py-space-md grid grid-cols-1 lg:grid-cols-12 gap-0 border-b border-outline-variant">
        {/* LEFT COLUMN: 60% MEDIA GALLERY */}
        <ProductGallery
          slides={product.slides}
          activeSlide={activeSlide}
          seriesRef={product.sku}
          onSlideChange={setActiveSlide}
        />

        {/* RIGHT COLUMN: 40% STICKY PRODUCT INFO PANEL */}
        <ProductInfoPanel
          product={product}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          isArchived={isArchived}
          ctaState={ctaState}
          onSelectColor={handleSelectColor}
          onSelectSize={handleSelectSize}
          onOpenSizeGuide={() => setSizeGuideOpen(true)}
          onAddToBag={handleAddToBag}
          onToggleArchive={handleToggleArchive}
          onShareSpec={handleShareSpec}
        />
      </div>

      {/* CROSS-SELL / COMPLETE THE ARCHIVE LOOK */}
      <CompleteTheUniform
        items={product.compatibleProducts}
        onQuickAdd={handleQuickAdd}
        onViewAll={onNavigateCategory}
      />

      {/* SIZE GUIDE MODAL DIALOG */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
        measurements={product.sizeGuide}
      />

      {/* MOBILE FIXED BOTTOM ADD TO BAG BAR */}
      <MobileStickyBar
        title={product.title}
        price={product.price}
        currency={product.currency}
        selectedSize={selectedSize}
        onAddToBag={handleAddToBag}
      />
    </div>
  );
};
