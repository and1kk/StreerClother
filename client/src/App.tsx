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
import { OrderConfirmationData } from './features/checkout/types/checkout.types';

export const App: React.FC = () => {
  const [activePath, setActivePath] = useState<string>('shop');
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleNavigate = (path: string) => {
    setActivePath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (_productOrId: Product | string) => {
    setActivePath('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    const newItem: CartItem = {
      id: `cart-${Date.now()}`,
      productId: 'prod-001',
      sku: '091-HD',
      title,
      price,
      color: 'WASHED BLACK',
      size: 'L',
      quantity: 1,
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB1Ay2rj0m4mI-SgXIrdZ_nTbZNfdyOGSGKGTwN7172yhL6sNiWp6js9kmaeYjH6nCDhGz6A4tyE3otv6KltzbNU_ZXQft0KMeZA76uSUHkfARoHqSTsSRUTqw3qe_3PI8DaQhqh9C89MH437mhWjkppWm5TmLFcM3EXQBtUQZEffa2o1Y-Ocr049MZyjpwjVirsjeD8oEzRDLqovfbkrziLWo-dYZ0_YlXwoQK856ecUmpl8O_Eo3T'
    };
    setCartItems((prev) => [newItem, ...prev]);
    setIsCartOpen(true);
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
          />
        )}

        {activePath === 'product' && (
          <ProductDetailPage
            onNavigateHome={() => handleNavigate('shop')}
            onNavigateCategory={() => handleNavigate('shop')}
            onCartCountChange={() => setIsCartOpen(true)}
          />
        )}

        {activePath === 'collections' && (
          <CollectionsPage
            onSelectProduct={() => handleNavigate('product')}
            onQuickAddGarment={handleQuickAddGarment}
          />
        )}

        {activePath === 'profile' && (
          <ProfilePage
            onNavigateCatalog={() => handleNavigate('shop')}
            onSelectProduct={() => handleNavigate('product')}
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
            onSelectProduct={() => handleNavigate('product')}
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
