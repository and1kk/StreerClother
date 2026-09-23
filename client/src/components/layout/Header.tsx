import React, { useState } from 'react';
import { MenuIcon, SearchIcon, BagIcon, CloseIcon } from '../ui/Icons';
import { AnnouncementBar } from './AnnouncementBar';

export interface HeaderProps {
  cartCount?: number;
  activePath?: string;
  onNavigate?: (path: string) => void;
  onCartClick?: () => void;
  onSearchClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount = 3,
  activePath = 'shop',
  onNavigate,
  onCartClick,
  onSearchClick
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'shop', label: 'SHOP' },
    { id: 'collections', label: 'COLLECTIONS' },
    { id: 'product', label: 'PDP SPEC' }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate?.(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <AnnouncementBar />

      <div className="h-16 w-full bg-[#131313]/90 backdrop-blur-md px-4 sm:px-6 md:px-10 border-b border-neutral-800 flex items-center justify-between">
        {/* LEFT NAV */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = activePath === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleLinkClick(link.id)}
                  className={`font-mono text-xs uppercase tracking-wider transition-colors py-1 cursor-pointer ${
                    isActive
                      ? 'text-white underline underline-offset-4 decoration-white font-bold'
                      : 'text-neutral-400 hover:text-white hover:underline underline-offset-4'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* LOGO CENTER */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <button
            type="button"
            onClick={() => handleLinkClick('shop')}
            className="font-display text-2xl tracking-tight uppercase font-bold text-white select-none hover:opacity-85 transition-opacity brand-display-title cursor-pointer"
          >
            VOID™
          </button>
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            aria-label="Search catalogue"
            onClick={onSearchClick}
            className="flex items-center justify-center text-neutral-300 hover:text-white transition-colors p-1 cursor-pointer"
          >
            <SearchIcon size={20} />
          </button>

          <button
            type="button"
            aria-label="Dispatch Bag"
            onClick={onCartClick}
            className="relative flex items-center justify-center text-neutral-300 hover:text-white transition-colors p-1 cursor-pointer"
          >
            <BagIcon size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-black font-mono text-[9px] flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e0e0e] border-b border-neutral-800 px-4 py-4 flex flex-col space-y-2 animate-fade-in shadow-xl">
          {navLinks.map((link) => {
            const isActive = activePath === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleLinkClick(link.id)}
                className={`text-left font-mono text-sm uppercase tracking-widest py-2 px-3 border transition-colors flex items-center justify-between cursor-pointer ${
                  isActive
                    ? 'border-white/30 bg-white/5 text-white font-bold'
                    : 'border-transparent text-neutral-400 hover:text-white hover:border-neutral-800'
                }`}
              >
                <span>{link.label}</span>
                {isActive && <span className="w-1.5 h-1.5 bg-white" />}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
