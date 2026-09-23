import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export interface CatalogLayoutProps {
  children: React.ReactNode;
  cartCount?: number;
  activePath?: string;
  onNavigate?: (path: string) => void;
  onCartClick?: () => void;
  onSearchClick?: () => void;
}

export const CatalogLayout: React.FC<CatalogLayoutProps> = ({
  children,
  cartCount = 3,
  activePath = 'shop',
  onNavigate,
  onCartClick,
  onSearchClick
}) => {
  return (
    <div className="bg-[#131313] font-sans text-neutral-200 antialiased min-h-screen flex flex-col selection:bg-white selection:text-black">
      <Header
        cartCount={cartCount}
        activePath={activePath}
        onNavigate={onNavigate}
        onCartClick={onCartClick}
        onSearchClick={onSearchClick}
      />
      <main className="w-full pt-24 bg-[#131313] flex-1 flex flex-col">
        {children}
      </main>
      <Footer onLinkClick={onNavigate} />
    </div>
  );
};
