import React, { useState } from 'react';
import { CatalogLayout } from './components/layout/CatalogLayout';
import { CatalogPage } from './features/catalog/CatalogPage';
import { ProductDetailPage } from './features/product/ProductDetailPage';
import { CollectionsPage } from './features/collections/CollectionsPage';
import { ProfilePage } from './features/profile/ProfilePage';
import { CheckoutPage } from './features/checkout/CheckoutPage';
import { CartDrawer } from './features/cart/components/CartDrawer';
import { SearchModal } from './components/ui/SearchModal';
import { Toast } from './components/ui/Toast';
import { INITIAL_CART_ITEMS } from './features/cart/data/cart.data';
import { CartItem } from './features/cart/types/cart.types';
import { Product } from './types/catalog.types';
import { ProductDetailData } from './features/product/types/product-detail.types';
import { HOODIE_PRODUCT_DATA } from './features/product/data/product-detail.data';
import { INITIAL_PRODUCTS } from './data/products.data';
import { OrderConfirmationData } from './features/checkout/types/checkout.types';

const mapProductToDetailData = (p: Product): ProductDetailData => {
  return {
    id: p.id,
    sku: p.sku.replace(/^SKU\s*\/\/\s*/i, ''),
    title: p.title,
    category: p.category.toUpperCase(),
    price: p.price,
    currency: 'USD',
    badges: p.badge ? [p.badge.label] : ['NEW DISPATCH // ARCHIVE FW25'],
    edition: 'FW25-BATCH.04',
    specVerification: 'ACTIVE',
    lowInventoryText: 'LOW INVENTORY // LIMITED UNITS REMAINING',
    description: `Architectural volume garment engineered for extreme durability and oversized silhouette. Finished in high-density cotton with ${p.fit} geometry.`,
    slides: [
      {
        id: 'slide-01',
        frameNumber: '01',
        title: 'PRIMARY ELEVATION',
        imageUrl: p.primaryImage,
        alt: p.alt
      },
      ...(p.secondaryImage
        ? [
            {
              id: 'slide-02',
              frameNumber: '02',
              title: 'DETAIL PERSPECTIVE',
              imageUrl: p.secondaryImage,
              alt: `${p.alt} detail`
            }
          ]
        : [])
    ],
    colorways: [
      {
        id: 'col-1',
        name: p.colorName,
        code: '01',
        hex: '#1a1a1a',
        innerHex: '#262626',
        image: p.primaryImage
      }
    ],
    sizes: p.availableSizes.map((s) => ({
      id: `size-${s}`,
      label: s,
      inStock: true,
      isRecommended: s === 'L' || s === 'OS'
    })),
    modelNote: `SPECIFIED FIT // ${p.fit.toUpperCase()}`,
    compatibleProducts: HOODIE_PRODUCT_DATA.compatibleProducts,
    sizeGuide: HOODIE_PRODUCT_DATA.sizeGuide
  };
};

export const App: React.FC = () => {
  const [activePath, setActivePath] = useState<string>('shop');
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedProductData, setSelectedProductData] = useState<ProductDetailData>(HOODIE_PRODUCT_DATA);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavigate = (path: string) => {
    setActivePath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (productOrId: Product | string) => {
    if (typeof productOrId === 'string') {
      const found = INITIAL_PRODUCTS.find((p) => p.id === productOrId || p.sku.includes(productOrId));
      if (found) {
        setSelectedProductData(mapProductToDetailData(found));
      } else {
        setSelectedProductData(HOODIE_PRODUCT_DATA);
      }
    } else {
      setSelectedProductData(mapProductToDetailData(productOrId));
    }
    setActivePath('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (item: {
    productId?: string;
    sku: string;
    title: string;
    price: number;
    color?: string;
    size?: string;
    quantity?: number;
    imageUrl?: string;
  }) => {
    const finalSize = item.size || 'L';
    const finalColor = item.color || 'WASHED BLACK';
    const finalQty = item.quantity || 1;
    const finalImage = item.imageUrl || '';

    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) => i.title === item.title && i.size === finalSize && i.color === finalColor
      );

      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx] = {
          ...copy[existingIdx],
          quantity: copy[existingIdx].quantity + finalQty
        };
        return copy;
      }

      const newItem: CartItem = {
        id: `cart-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        productId: item.productId || item.sku,
        sku: item.sku,
        title: item.title,
        price: item.price,
        color: finalColor,
        size: finalSize,
        quantity: finalQty,
        imageUrl: finalImage
      };
      return [newItem, ...prev];
    });

    setIsCartOpen(true);
  };

  const handleQuickAddCatalog = (product: Product, size: string) => {
    handleAddToCart({
      productId: product.id,
      sku: product.sku.replace(/^SKU\s*\/\/\s*/i, ''),
      title: product.title,
      price: product.price,
      color: product.colorName,
      size: size,
      quantity: 1,
      imageUrl: product.primaryImage
    });
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
    setToastMessage('ITEM PURGED FROM DISPATCH BAG');
  };

  const handleQuickAddGarment = (title: string, price: number) => {
    handleAddToCart({
      sku: '091-HD',
      title,
      price,
      color: 'WASHED BLACK',
      size: 'L',
      quantity: 1,
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB1Ay2rj0m4mI-SgXIrdZ_nTbZNfdyOGSGKGTwN7172yhL6sNiWp6js9kmaeYjH6nCDhGz6A4tyE3otv6KltzbNU_ZXQft0KMeZA76uSUHkfARoHqSTsSRUTqw3qe_3PI8DaQhqh9C89MH437mhWjkppWm5TmLFcM3EXQBtUQZEffa2o1Y-Ocr049MZyjpwjVirsjeD8oEzRDLqovfbkrziLWo-dYZ0_YlXwoQK856ecUmpl8O_Eo3T'
    });
  };

  const handleOrderCompleted = (order: OrderConfirmationData) => {
    setCartItems([]);
    setToastMessage(`MANIFEST REGISTERED: ${order.orderId}`);
  };

  return (
    <>
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      <CatalogLayout
        cartCount={cartCount}
        activePath={activePath}
        onNavigate={handleNavigate}
        onCartClick={() => setIsCartOpen(true)}
        onSearchClick={() => setIsSearchOpen(true)}
      >
        {activePath === 'shop' && (
          <CatalogPage
            onSelectProduct={handleSelectProduct}
            onOpenSearch={() => setIsSearchOpen(true)}
            onAddToCart={handleQuickAddCatalog}
          />
        )}

        {activePath === 'product' && (
          <ProductDetailPage
            product={selectedProductData}
            onNavigateHome={() => handleNavigate('shop')}
            onNavigateCategory={() => handleNavigate('shop')}
            onCartCountChange={() => setIsCartOpen(true)}
            onAddToCart={handleAddToCart}
          />
        )}

        {activePath === 'collections' && (
          <CollectionsPage
            onSelectProduct={handleSelectProduct}
            onQuickAddGarment={handleQuickAddGarment}
          />
        )}

        {activePath === 'profile' && (
          <ProfilePage
            onNavigateCatalog={() => handleNavigate('shop')}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {activePath === 'checkout' && (
          <CheckoutPage
            items={cartItems}
            onOrderCompleted={handleOrderCompleted}
            onNavigateCatalog={() => handleNavigate('shop')}
          />
        )}

        {activePath === 'archive' && (
          <CollectionsPage
            onSelectProduct={handleSelectProduct}
            onQuickAddGarment={handleQuickAddGarment}
          />
        )}
      </CatalogLayout>

      {/* GLOBAL SLIDE-OVER CART DRAWER */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => handleNavigate('checkout')}
        onExploreCatalog={() => handleNavigate('shop')}
      />

      {/* GLOBAL SEARCH OVERLAY */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
      />
    </>
  );
};

export default App;
