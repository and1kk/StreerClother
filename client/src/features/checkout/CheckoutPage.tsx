import React, { useState } from 'react';
import { CartItem } from '../cart/types/cart.types';
import { CheckoutFormData, OrderConfirmationData } from './types/checkout.types';
import {
  TruckIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  CheckCircleIcon,
  ArrowForwardIcon
} from '../../components/ui/Icons';

export interface CheckoutPageProps {
  items: CartItem[];
  onOrderCompleted?: (order: OrderConfirmationData) => void;
  onNavigateCatalog?: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  items,
  onOrderCompleted,
  onNavigateCatalog
}) => {
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: 'ALEXANDER VOID',
    email: 'operator@void.enterprises',
    phone: '+380 98 000 00 00',
    city: 'Kyiv',
    carrier: 'NOVA_POSHTA',
    branchOrAddress: 'Branch #42 (Khreshchatyk St, 22)',
    paymentMethod: 'CARD',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderConfirmationData | null>(null);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = formData.carrier === 'NOVA_POSHTA' ? 0 : 35;
  const total = subtotal + shippingCost;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const order: OrderConfirmationData = {
        orderId: `VOID-${Math.floor(100000 + Math.random() * 900000)}`,
        timestamp: new Date().toISOString(),
        carrier: formData.carrier,
        trackingNumber: `NP-${Math.floor(20450000000000 + Math.random() * 9000000000)}`,
        totalAmount: total,
        itemsCount: items.reduce((s, i) => s + i.quantity, 0)
      };

      setCompletedOrder(order);
      setIsSubmitting(false);
      onOrderCompleted?.(order);
    }, 1200);
  };

  // SUCCESS CONFIRMATION VIEW
  if (completedOrder) {
    return (
      <div className="w-full min-h-[calc(100vh-220px)] bg-[#131313] py-12 px-4 sm:px-6 md:px-12 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-[#0e0e0e] border border-white p-6 sm:p-10 shadow-[8px_8px_0px_0px_#ffffff] flex flex-col space-y-6">
          {/* BADGE & STATUS */}
          <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
            <div className="flex items-center gap-2">
              <CheckCircleIcon size={22} className="text-white" />
              <span className="font-mono text-xs uppercase text-white font-bold tracking-widest">
                DISPATCH ORDER REGISTERED // ACTIVE
              </span>
            </div>
            <span className="font-mono text-[10px] text-neutral-400 bg-neutral-900 border border-neutral-800 px-2 py-0.5">
              TERMINAL 01 KYIV
            </span>
          </div>

          <div className="space-y-2">
            <h1 className="font-headline-md text-3xl sm:text-4xl text-white uppercase tracking-tight leading-none">
              MANIFEST ALLOCATED
            </h1>
            <p className="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Your garments have been committed to queue at Terminal Base 01 Kyiv. Waybill telemetry has been logged and sent to <span className="text-white font-bold">{formData.email}</span>.
            </p>
          </div>

          {/* TELEMETRY MATRIX */}
          <div className="border border-neutral-800 bg-[#131313] p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            <div className="flex flex-col">
              <span className="text-neutral-500 text-[10px] uppercase">ORDER IDENTIFIER:</span>
              <span className="text-white font-bold">{completedOrder.orderId}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-neutral-500 text-[10px] uppercase">TRACKING CODE:</span>
              <span className="text-white font-bold">{completedOrder.trackingNumber}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-neutral-500 text-[10px] uppercase">LOGISTICS CARRIER:</span>
              <span className="text-white">{formData.carrier === 'NOVA_POSHTA' ? 'NOVA POSHTA EXPRESS' : 'DHL EXPRESS GLOBAL'}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-neutral-500 text-[10px] uppercase">TOTAL AUTHORIZED:</span>
              <span className="text-white font-bold">${completedOrder.totalAmount} USD</span>
            </div>
          </div>

          {/* BUTTON ACTIONS */}
          <div className="pt-4 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={onNavigateCatalog}
              className="flex-1 bg-white text-black hover:bg-neutral-200 font-mono text-xs uppercase font-bold py-3.5 tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer select-none"
            >
              <span>RETURN TO CATALOG</span>
              <ArrowForwardIcon size={16} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#131313] py-8 sm:py-12 px-4 sm:px-6 md:px-12 flex-1">
      {/* PAGE HEADER */}
      <div className="max-w-6xl mx-auto pb-6 border-b border-neutral-800 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest flex items-center gap-2 mb-1">
            <span className="inline-block w-1.5 h-1.5 bg-white"></span>
            DISPATCH PROTOCOL // TERMINAL CHECKOUT
          </div>
          <h1 className="font-headline-md text-2xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight">
            ORDER LOGISTICS &amp; PAYMENT
          </h1>
        </div>
        <div className="font-mono text-xs text-neutral-400 uppercase">
          SECURITY LEVEL: <span className="text-white font-bold">ENCRYPTED 256-BIT</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: 7 COLS FORM */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 flex flex-col space-y-8">
          {/* STEP 01: CONTACT & RECIPIENT */}
          <div className="border border-neutral-800 bg-[#0e0e0e] p-5 sm:p-7 space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <span className="font-mono text-xs text-white uppercase tracking-widest font-bold flex items-center gap-2">
                <span className="text-neutral-500">01 //</span> RECIPIENT TELEMETRY
              </span>
              <span className="font-mono text-[10px] text-neutral-500 uppercase">REQUIRED</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-neutral-400 uppercase">FULL NAME</label>
                <input
                  type="text"
                  required
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="bg-[#131313] border border-neutral-700 text-white font-mono text-xs px-3 py-2.5 focus:border-white focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-neutral-400 uppercase">FREQUENCY EMAIL</label>
                <input
                  type="email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-[#131313] border border-neutral-700 text-white font-mono text-xs px-3 py-2.5 focus:border-white focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="font-mono text-[10px] text-neutral-400 uppercase">TERMINAL PHONE NUMBER</label>
                <input
                  type="tel"
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-[#131313] border border-neutral-700 text-white font-mono text-xs px-3 py-2.5 focus:border-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* STEP 02: LOGISTICS CARRIER */}
          <div className="border border-neutral-800 bg-[#0e0e0e] p-5 sm:p-7 space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <span className="font-mono text-xs text-white uppercase tracking-widest font-bold flex items-center gap-2">
                <span className="text-neutral-500">02 //</span> LOGISTICS &amp; CARRIER SPEC
              </span>
              <TruckIcon size={16} className="text-neutral-400" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`p-3.5 border flex flex-col gap-1 cursor-pointer transition-all ${
                  formData.carrier === 'NOVA_POSHTA'
                    ? 'border-white bg-[#131313]'
                    : 'border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-white font-bold uppercase">NOVA POSHTA</span>
                  <input
                    type="radio"
                    name="carrier"
                    value="NOVA_POSHTA"
                    checked={formData.carrier === 'NOVA_POSHTA'}
                    onChange={handleChange}
                    className="accent-white"
                  />
                </div>
                <span className="font-sans text-xs text-neutral-400">Ukraine Delivery (1–2 days)</span>
                <span className="font-mono text-[10px] text-white mt-1">COMPLIMENTARY &gt; 2000 UAH</span>
              </label>

              <label
                className={`p-3.5 border flex flex-col gap-1 cursor-pointer transition-all ${
                  formData.carrier === 'DHL_EXPRESS'
                    ? 'border-white bg-[#131313]'
                    : 'border-neutral-800 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-white font-bold uppercase">DHL EXPRESS GLOBAL</span>
                  <input
                    type="radio"
                    name="carrier"
                    value="DHL_EXPRESS"
                    checked={formData.carrier === 'DHL_EXPRESS'}
                    onChange={handleChange}
                    className="accent-white"
                  />
                </div>
                <span className="font-sans text-xs text-neutral-400">Worldwide Air Dispatch (3–5 days)</span>
                <span className="font-mono text-[10px] text-neutral-300 mt-1">+$35 USD AT CHECKOUT</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-neutral-400 uppercase">DESTINATION CITY</label>
                <input
                  type="text"
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="bg-[#131313] border border-neutral-700 text-white font-mono text-xs px-3 py-2.5 focus:border-white focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-neutral-400 uppercase">BRANCH NUMBER / COURIER ADDRESS</label>
                <input
                  type="text"
                  required
                  name="branchOrAddress"
                  value={formData.branchOrAddress}
                  onChange={handleChange}
                  className="bg-[#131313] border border-neutral-700 text-white font-mono text-xs px-3 py-2.5 focus:border-white focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* STEP 03: PAYMENT PROTOCOL */}
          <div className="border border-neutral-800 bg-[#0e0e0e] p-5 sm:p-7 space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <span className="font-mono text-xs text-white uppercase tracking-widest font-bold flex items-center gap-2">
                <span className="text-neutral-500">03 //</span> PAYMENT PROTOCOL
              </span>
              <CreditCardIcon size={16} className="text-neutral-400" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'CARD', label: 'BANK CARD (VISA/MC)', desc: 'Secure direct stripe gateway' },
                { id: 'APPLE_PAY', label: 'APPLE PAY / GOOGLE PAY', desc: 'Instant biometric token' },
                { id: 'CRYPTO_USDT', label: 'CRYPTO (USDT TRC20)', desc: 'Web3 cold multi-sig address' },
                { id: 'CASH_ON_DELIVERY', label: 'CASH ON DELIVERY (UA)', desc: 'Inspect at Nova Poshta terminal' }
              ].map((m) => (
                <label
                  key={m.id}
                  className={`p-3.5 border flex flex-col gap-1 cursor-pointer transition-all ${
                    formData.paymentMethod === m.id
                      ? 'border-white bg-[#131313]'
                      : 'border-neutral-800 hover:border-neutral-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-white font-bold uppercase">{m.label}</span>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={m.id}
                      checked={formData.paymentMethod === m.id}
                      onChange={handleChange}
                      className="accent-white"
                    />
                  </div>
                  <span className="font-sans text-[11px] text-neutral-400">{m.desc}</span>
                </label>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-2 text-[10px] font-mono text-neutral-500">
              <ShieldCheckIcon size={14} className="text-white" />
              <span>TLS 1.3 HARDWARE LEVEL ENCRYPTED TRANSACTION</span>
            </div>
          </div>

          {/* MOBILE AUTHORIZE BUTTON (VISIBLE ON MOBILE BEFORE STICKY BAR) */}
          <div className="lg:hidden">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-white text-black hover:bg-neutral-200 font-mono text-sm uppercase font-bold py-4 tracking-widest flex items-center justify-center gap-2 transition-colors cursor-pointer select-none"
            >
              <span>{isSubmitting ? 'AUTHORIZING DISPATCH...' : `AUTHORIZE ORDER — $${total} USD`}</span>
              <ArrowForwardIcon size={16} />
            </button>
          </div>
        </form>

        {/* RIGHT COLUMN: 5 COLS STICKY ORDER REVIEW */}
        <aside className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col space-y-4">
          <div className="border border-neutral-800 bg-[#0e0e0e] p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <span className="font-mono text-xs text-white uppercase tracking-widest font-bold">
                MANIFEST REVIEW
              </span>
              <span className="font-mono text-[10px] text-neutral-400">
                {items.reduce((s, i) => s + i.quantity, 0)} ITEMS
              </span>
            </div>

            {/* ITEMS LIST */}
            <div className="divide-y divide-neutral-900 max-h-64 overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="py-3 flex gap-3">
                  <div className="w-14 h-16 bg-neutral-900 border border-neutral-800 overflow-hidden flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="font-sans text-xs font-bold text-white uppercase tracking-tight truncate">
                        {item.title}
                      </h4>
                      <span className="font-mono text-[10px] text-neutral-400 uppercase">
                        QTY: {item.quantity} // {item.size}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-white font-bold">
                      ${item.price * item.quantity} USD
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* BREAKDOWN */}
            <div className="border-t border-neutral-800 pt-4 space-y-2 font-mono text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>SUBTOTAL:</span>
                <span className="text-white">${subtotal} USD</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>LOGISTICS:</span>
                <span className="text-white">{shippingCost === 0 ? 'COMPLIMENTARY' : `$${shippingCost} USD`}</span>
              </div>
              <div className="flex justify-between text-neutral-400">
                <span>IMPORT SPEC &amp; TAXES:</span>
                <span className="text-white">INCLUDED // 0% SURCHARGE</span>
              </div>
              <div className="flex justify-between text-white font-bold border-t border-neutral-800 pt-3 text-base">
                <span>TOTAL PAYABLE:</span>
                <span>${total} USD</span>
              </div>
            </div>

            {/* DESKTOP CTA BUTTON */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="hidden lg:flex w-full bg-white text-black hover:bg-neutral-200 font-mono text-xs uppercase font-bold py-4 tracking-widest items-center justify-center gap-2 transition-colors cursor-pointer select-none"
            >
              <span>{isSubmitting ? 'AUTHORIZING DISPATCH...' : `CONFIRM DISPATCH — $${total} USD`}</span>
              <ArrowForwardIcon size={16} />
            </button>
          </div>

          {/* TELEMETRY FOOTNOTE */}
          <div className="p-3 border border-neutral-800 bg-[#131313] font-mono text-[10px] text-neutral-500 uppercase flex items-center justify-between">
            <span>TERMINAL KYIV CLEARANCE</span>
            <span className="text-white">STATUS: READY</span>
          </div>
        </aside>
      </div>
    </div>
  );
};
