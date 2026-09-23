import React, { useState } from 'react';
import { CartItem } from '../types/cart.types';
import { CloseIcon, TrashIcon, PlusIcon, MinusIcon, BagIcon, ArrowForwardIcon } from '../../../components/ui/Icons';

export interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onProceedToCheckout: () => void;
  onExploreCatalog: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  onExploreCatalog
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const freeShippingThreshold = 200; // $200 USD (~2000+ UAH standard equivalent)
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingCost = isFreeShipping || items.length === 0 ? 0 : 25;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'VOID10') {
      setDiscountPercent(10);
      setPromoMessage('PROMO APPLIED: 10% ARCHIVE DISCOUNT');
    } else if (promoCode.trim().toUpperCase() === 'CYBER20') {
      setDiscountPercent(20);
      setPromoMessage('PROMO APPLIED: 20% OPERATOR CODE');
    } else {
      setDiscountPercent(0);
      setPromoMessage('INVALID FREQUENCY CODE');
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      />

      {/* DRAWER CONTAINER (Full-width on mobile, 440px on sm+) */}
      <div
        className={`absolute inset-y-0 right-0 w-full sm:max-w-[440px] bg-[#0e0e0e] border-l border-neutral-800 flex flex-col transition-transform duration-300 z-10 shadow-2xl ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* HEADER */}
        <div className="p-4 border-b border-neutral-800 flex items-center justify-between sticky top-0 bg-[#0e0e0e] z-20">
          <div className="flex items-center gap-2">
            <BagIcon size={18} className="text-white" />
            <span className="font-display text-lg text-white uppercase font-bold tracking-tight brand-display-title">
              DISPATCH BAG
            </span>
            <span className="font-mono text-[10px] text-neutral-400 bg-neutral-900 border border-neutral-800 px-1.5 py-0.5">
              [{items.reduce((s, i) => s + i.quantity, 0)} UNITS]
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="p-1.5 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* FREE SHIPPING METER */}
        <div className="px-4 py-2.5 bg-[#131313] border-b border-neutral-800 flex flex-col gap-1.5">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider">
            {isFreeShipping ? (
              <span className="text-white font-bold flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 bg-white"></span>
                COMPLIMENTARY DISPATCH UNLOCKED
              </span>
            ) : (
              <span className="text-neutral-400">
                ADD <span className="text-white font-bold">${freeShippingThreshold - subtotal} USD</span> FOR FREE SHIPPING
              </span>
            )}
            <span className="text-neutral-500 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-1 bg-neutral-800 overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* ITEMS LIST */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col divide-y divide-neutral-900">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4 my-auto">
              <div className="w-16 h-16 border border-neutral-800 bg-[#131313] flex items-center justify-center text-neutral-600">
                <BagIcon size={32} />
              </div>
              <div className="space-y-1">
                <span className="font-mono text-sm uppercase text-white font-bold block">
                  BAG IS VACANT // ZERO ALLOCATIONS
                </span>
                <p className="font-sans text-xs text-neutral-500 max-w-xs leading-relaxed">
                  No tactical hardware or garments staged for dispatch.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onExploreCatalog();
                }}
                className="bg-white text-black font-mono text-xs uppercase px-5 py-3 font-bold hover:bg-neutral-200 transition-colors cursor-pointer select-none"
              >
                EXPLORE CATALOG
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.size}-${item.color}`} className="py-4 flex gap-3 group">
                {/* THUMBNAIL */}
                <div className="w-20 h-24 bg-neutral-900 border border-neutral-800 overflow-hidden flex-shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform"
                  />
                </div>

                {/* INFO */}
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">
                        {item.sku}
                      </span>
                      <h4 className="font-sans text-xs font-bold text-white uppercase tracking-tight truncate max-w-[190px]">
                        {item.title}
                      </h4>
                      <span className="font-mono text-[10px] text-neutral-400 uppercase mt-0.5 block">
                        {item.color} // SIZE: <span className="text-white font-bold">{item.size}</span>
                      </span>
                    </div>

                    <button
                      type="button"
                      aria-label="Remove item"
                      onClick={() => onRemoveItem(item.id)}
                      className="text-neutral-500 hover:text-white transition-colors p-1"
                    >
                      <TrashIcon size={14} />
                    </button>
                  </div>

                  {/* BOTTOM ROW: QUANTITY & PRICE */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-neutral-700 bg-[#131313]">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <MinusIcon size={12} />
                      </button>
                      <span className="w-8 text-center font-mono text-xs text-white font-bold select-none">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-7 h-7 flex items-center justify-center text-neutral-400 hover:text-white transition-colors cursor-pointer"
                      >
                        <PlusIcon size={12} />
                      </button>
                    </div>

                    <span className="font-mono text-xs text-white font-bold">
                      ${item.price * item.quantity} USD
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* SUMMARY & CHECKOUT FOOTER */}
        {items.length > 0 && (
          <div className="p-4 border-t border-neutral-800 bg-[#0e0e0e] flex flex-col gap-3 sticky bottom-0 z-20 pb-[calc(env(safe-area-inset-bottom,0px)+1rem)]">
            {/* PROMO INPUT */}
            <form onSubmit={handleApplyPromo} className="flex border border-neutral-700 focus-within:border-white">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="PROMO / OPERATOR CODE (e.g. VOID10)"
                className="bg-[#131313] text-white placeholder-neutral-500 font-mono text-[10px] px-3 py-2 flex-1 min-w-0 uppercase focus:outline-none"
              />
              <button
                type="submit"
                className="bg-neutral-800 hover:bg-white text-white hover:text-black font-mono text-[10px] uppercase font-bold px-3 py-2 transition-colors cursor-pointer flex-shrink-0"
              >
                APPLY
              </button>
            </form>
            {promoMessage && (
              <span className={`font-mono text-[10px] uppercase tracking-wider ${
                discountPercent > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {promoMessage}
              </span>
            )}

            {/* BREAKDOWN */}
            <div className="space-y-1.5 font-mono text-[11px] pt-1">
              <div className="flex justify-between text-neutral-400">
                <span>SUBTOTAL:</span>
                <span className="text-white">${subtotal} USD</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-green-400">
                  <span>DISCOUNT ({discountPercent}%):</span>
                  <span>-${discountAmount} USD</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-400">
                <span>SHIPPING:</span>
                <span className="text-white">
                  {shippingCost === 0 ? 'COMPLIMENTARY' : `$${shippingCost} USD`}
                </span>
              </div>
              <div className="flex justify-between text-white font-bold border-t border-neutral-800 pt-2 text-sm">
                <span>TOTAL ESTIMATE:</span>
                <span>${total} USD</span>
              </div>
            </div>

            {/* CTA CHECKOUT */}
            <button
              type="button"
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full bg-white text-black hover:bg-neutral-200 font-mono text-xs uppercase font-bold py-3.5 tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer select-none"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowForwardIcon size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
