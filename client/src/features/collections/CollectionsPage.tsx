import React, { useState } from 'react';
import { COLLECTIONS_DATA } from './data/collections.data';
import { ArrowForwardIcon, CameraIcon } from '../../components/ui/Icons';
import { Toast } from '../../components/ui/Toast';

export interface CollectionsPageProps {
  onSelectProduct?: (productId: string) => void;
  onQuickAddGarment?: (title: string, price: number) => void;
}

export const CollectionsPage: React.FC<CollectionsPageProps> = ({
  onSelectProduct,
  onQuickAddGarment
}) => {
  const [selectedSeason, setSelectedSeason] = useState('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const seasons = ['ALL', 'FW25 // MONOLITH', 'SS25 // FREQUENCY'];

  const filteredLooks =
    selectedSeason === 'ALL'
      ? COLLECTIONS_DATA
      : COLLECTIONS_DATA.filter((l) => l.season === selectedSeason);

  const handleAddGarment = (title: string, price: number) => {
    onQuickAddGarment?.(title, price);
    setToastMessage(`LOOK PIECE ALLOCATED: ${title} ($${price})`);
  };

  return (
    <div className="w-full bg-[#131313] py-8 sm:py-12 px-4 sm:px-6 md:px-12 flex-1 flex flex-col">
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* HEADER & MANIFESTO */}
      <div className="max-w-6xl mx-auto w-full pb-6 border-b border-neutral-800 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1">
          <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest flex items-center gap-2">
            <CameraIcon size={14} className="text-white" />
            VISUAL DISPATCH ARCHIVE // EDITORIAL LOOKBOOK
          </div>
          <h1 className="font-headline-md text-3xl sm:text-4xl lg:text-5xl text-white uppercase tracking-tight leading-none">
            COLLECTIONS &amp; ARCHIVES
          </h1>
        </div>

        {/* SEASON FILTER TABS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 font-mono text-[11px]">
          {seasons.map((s) => {
            const isActive = selectedSeason === s;
            return (
              <button
                key={s}
                type="button"
                onClick={() => setSelectedSeason(s)}
                className={`px-3 py-2 uppercase border transition-all cursor-pointer select-none whitespace-nowrap ${
                  isActive
                    ? 'bg-white text-black border-white font-bold'
                    : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
                }`}
              >
                {s}
              </button>
            );
          })}
        </div>
      </div>

      {/* LOOKBOOK EDITORIAL GRID */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {filteredLooks.map((look) => (
          <article
            key={look.id}
            className="border border-neutral-800 bg-[#0e0e0e] flex flex-col group hover:border-white transition-colors overflow-hidden"
          >
            {/* LOOK PHOTO CONTAINER */}
            <div className="relative w-full aspect-[4/5] bg-neutral-900 overflow-hidden border-b border-neutral-800">
              <img
                src={look.imageUrl}
                alt={look.title}
                className="w-full h-full object-cover object-center grayscale contrast-125 group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 bg-black/85 backdrop-blur-sm border border-neutral-800 px-2 py-1 font-mono text-[10px] text-white font-bold uppercase tracking-wider">
                {look.lookNumber} // {look.season}
              </div>
            </div>

            {/* CONTENT & GARMENT SPECIFICATION */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-5">
              <div className="space-y-2">
                <h3 className="font-headline-sm text-xl sm:text-2xl text-white uppercase tracking-tight leading-tight">
                  {look.title}
                </h3>
                <p className="font-sans text-xs text-neutral-400 leading-relaxed">
                  {look.notes}
                </p>
              </div>

              {/* WEARABLE HARDWARE BREAKDOWN */}
              <div className="border border-neutral-800 bg-[#131313] p-3.5 space-y-2.5">
                <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest block border-b border-neutral-800 pb-1.5 font-bold">
                  UNIFORM HARDWARE BREAKDOWN
                </span>
                <div className="divide-y divide-neutral-900">
                  {look.garments.map((g) => (
                    <div key={g.sku} className="py-2 flex items-center justify-between gap-2 font-mono text-xs">
                      <div>
                        <span className="text-white font-bold block">{g.title}</span>
                        <span className="text-[10px] text-neutral-500 uppercase">{g.sku} // {g.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-bold">${g.price}</span>
                        <button
                          type="button"
                          onClick={() => handleAddGarment(g.title, g.price)}
                          className="border border-neutral-700 hover:border-white hover:bg-white hover:text-black text-[9px] uppercase px-2 py-1 transition-colors cursor-pointer select-none"
                        >
                          + ADD
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* INSPECT ACTION */}
              <button
                type="button"
                onClick={() => onSelectProduct?.('prod-001')}
                className="w-full bg-[#131313] hover:bg-white text-white hover:text-black border border-neutral-700 hover:border-white font-mono text-xs uppercase font-bold py-3 tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer select-none"
              >
                <span>INSPECT LOOK HARDWARE</span>
                <ArrowForwardIcon size={14} />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
