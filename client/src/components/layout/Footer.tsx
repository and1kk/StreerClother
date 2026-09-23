import React, { useState } from 'react';

export interface FooterProps {
  onSubscribe?: (email: string) => void;
  onLinkClick?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSubscribe, onLinkClick }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubscribe?.(email);
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-[#0e0e0e] border-t border-neutral-800 py-10 sm:py-16">
      <div className="w-full px-4 sm:px-8 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
        {/* BRAND SPEC */}
        <div className="flex flex-col gap-3">
          <span className="font-display text-xl uppercase text-white tracking-wider font-black">
            VOID™
          </span>
          <p className="font-sans text-xs text-neutral-400 leading-relaxed max-w-sm">
            Architectural brutalist subcultural fashion. High-spec technical apparel engineered with zero compromise.
          </p>
        </div>

        {/* INDEX */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs text-white uppercase tracking-widest mb-2 font-bold">
            INDEX
          </span>
          <button
            type="button"
            onClick={() => onLinkClick?.('shop')}
            className="text-left font-sans text-xs text-neutral-400 hover:text-white transition-colors"
          >
            SHOP ALL
          </button>
          <button
            type="button"
            onClick={() => onLinkClick?.('collections')}
            className="text-left font-sans text-xs text-neutral-400 hover:text-white transition-colors"
          >
            LOOKBOOK FW25
          </button>
          <button
            type="button"
            onClick={() => onLinkClick?.('archive')}
            className="text-left font-sans text-xs text-neutral-400 hover:text-white transition-colors"
          >
            TECHNICAL ARCHIVE
          </button>
          <button
            type="button"
            onClick={() => onLinkClick?.('order-tracking')}
            className="text-left font-sans text-xs text-neutral-400 hover:text-white transition-colors"
          >
            DISPATCH &amp; TRACKING
          </button>
        </div>

        {/* COMMUNICATION */}
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs text-white uppercase tracking-widest mb-2 font-bold">
            COMMUNICATION
          </span>
          <p className="font-sans text-xs text-neutral-400">TERMINAL KYIV / BASE 01</p>
          <p className="font-mono text-[11px] text-neutral-400">DISPATCH: ORDERS OVER 2000 UAH COMPLIMENTARY</p>
          <p className="font-mono text-[11px] text-neutral-500">STATUS: OPERATIONAL</p>
        </div>

        {/* SYSTEM DISPATCH */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs text-white uppercase tracking-widest font-bold">
            SYSTEM DISPATCH
          </span>
          <form onSubmit={handleSubmit} className="flex border border-neutral-700 focus-within:border-white transition-colors">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={subscribed ? 'FREQUENCY CONNECTED' : 'ENTER FREQUENCY...'}
              className="bg-[#131313] text-white placeholder-neutral-500 font-mono text-xs px-3 py-2 flex-1 min-w-0 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-black font-mono text-xs font-bold px-4 py-2 uppercase hover:bg-neutral-200 transition-colors"
            >
              JOIN
            </button>
          </form>
          <span className="font-mono text-[10px] text-neutral-500 tracking-wider">
            © 2025 VOID™ ENTERPRISES. ALL RIGHTS RESERVED.
          </span>
        </div>
      </div>
    </footer>
  );
};
