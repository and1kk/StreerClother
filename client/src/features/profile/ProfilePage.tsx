import React, { useState } from 'react';
import { USER_PROFILE_MOCK, ORDER_RECORDS_MOCK } from './data/profile.data';
import { UserIcon, PackageIcon, BookmarkIcon, ShieldCheckIcon } from '../../components/ui/Icons';
import { Toast } from '../../components/ui/Toast';

export interface ProfilePageProps {
  onNavigateCatalog?: () => void;
  onSelectProduct?: (productId: string) => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({
  onNavigateCatalog,
  onSelectProduct
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'saved' | 'config'>('orders');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Saved archive mock items
  const savedItems = [
    {
      id: 'saved-01',
      productId: 'prod-001',
      title: 'HEAVYWEIGHT BOXY HOODIE',
      sku: '091-HD',
      price: 180,
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB1Ay2rj0m4mI-SgXIrdZ_nTbZNfdyOGSGKGTwN7172yhL6sNiWp6js9kmaeYjH6nCDhGz6A4tyE3otv6KltzbNU_ZXQft0KMeZA76uSUHkfARoHqSTsSRUTqw3qe_3PI8DaQhqh9C89MH437mhWjkppWm5TmLFcM3EXQBtUQZEffa2o1Y-Ocr049MZyjpwjVirsjeD8oEzRDLqovfbkrziLWo-dYZ0_YlXwoQK856ecUmpl8O_Eo3T'
    },
    {
      id: 'saved-02',
      productId: 'prod-003',
      title: 'TACTICAL CARGO TROUSERS',
      sku: '044-TR',
      price: 220,
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCrBMv8XoojhRCv5EO193GG68XLyZC03hiNzm0unW2OTKJ-xc41jLf6Lx7Jjrpws2eB5vKH7MLpyE8m5idBaGhZ8tPtxR0PdX0DpB7Q6r4UsiuHwdYnGU02Dkmt7JmBxSawMIYlEpZ9xeTDVnXVX7lYaK7IVDZ6LQWZBL8T4HOICuldLWHCD3VgDmH_UjsuCnaa9cm3eJhr9pbkyuaOKTdU1PfNV286fyR8l2paovRT-YZAjM66kqFG'
    }
  ];

  const handleCopyTracking = (code: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setToastMessage(`WAYBILL COPIED: ${code}`);
    }
  };

  const renderStatusBadge = (status: string) => {
    if (status === 'IN TRANSIT') {
      return (
        <span className="bg-white text-black font-mono text-[9px] px-2 py-0.5 font-bold uppercase tracking-wider">
          IN TRANSIT
        </span>
      );
    }
    if (status === 'DELIVERED') {
      return (
        <span className="border border-neutral-700 text-neutral-400 font-mono text-[9px] px-2 py-0.5 uppercase tracking-wider">
          DELIVERED
        </span>
      );
    }
    return (
      <span className="bg-neutral-800 text-white font-mono text-[9px] px-2 py-0.5 uppercase tracking-wider">
        {status}
      </span>
    );
  };

  return (
    <div className="w-full bg-[#131313] py-8 sm:py-12 px-4 sm:px-6 md:px-12 flex-1 flex flex-col">
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* OPERATOR IDENTITY CARD */}
      <div className="max-w-6xl mx-auto w-full mb-8 border border-neutral-800 bg-[#0e0e0e] p-5 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-neutral-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-none bg-white text-black flex items-center justify-center font-bold">
              <UserIcon size={28} className="text-black" />
            </div>
            <div>
              <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 bg-white"></span>
                {USER_PROFILE_MOCK.id}
              </div>
              <h1 className="font-headline-md text-2xl sm:text-3xl text-white uppercase tracking-tight mt-0.5">
                {USER_PROFILE_MOCK.callsign}
              </h1>
              <span className="font-mono text-xs text-neutral-400 uppercase">
                {USER_PROFILE_MOCK.clearanceLevel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onNavigateCatalog}
              className="border border-neutral-700 hover:border-white hover:bg-white hover:text-black px-3.5 py-2 font-mono text-[10px] text-neutral-300 uppercase transition-all cursor-pointer select-none font-bold"
            >
              GO TO CATALOG
            </button>
          </div>

          {/* TELEMETRY SPECS */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t md:border-t-0 border-neutral-800 pt-4 md:pt-0 font-mono text-xs">
            <div className="flex flex-col">
              <span className="text-neutral-500 text-[10px] uppercase">TERMINAL BASE:</span>
              <span className="text-white font-bold text-[11px] truncate">{USER_PROFILE_MOCK.terminalBase}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-neutral-500 text-[10px] uppercase">LOYALTY CREDITS:</span>
              <span className="text-white font-bold text-[11px]">{USER_PROFILE_MOCK.loyaltyUnits} PTS</span>
            </div>
            <div className="flex flex-col col-span-2 sm:col-span-1">
              <span className="text-neutral-500 text-[10px] uppercase">SEC LEVEL:</span>
              <span className="text-white font-bold text-[11px] flex items-center gap-1">
                <ShieldCheckIcon size={12} className="text-white" />
                VERIFIED
              </span>
            </div>
          </div>
        </div>

        {/* PROFILE TABS */}
        <div className="flex items-center gap-2 pt-4 overflow-x-auto font-mono text-[11px]">
          <button
            type="button"
            onClick={() => setActiveTab('orders')}
            className={`px-4 py-2 uppercase border transition-colors cursor-pointer select-none whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'orders'
                ? 'bg-white text-black border-white font-bold'
                : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
            }`}
          >
            <PackageIcon size={14} />
            <span>01 // DISPATCH RECORDS ({ORDER_RECORDS_MOCK.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-2 uppercase border transition-colors cursor-pointer select-none whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'saved'
                ? 'bg-white text-black border-white font-bold'
                : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
            }`}
          >
            <BookmarkIcon size={14} />
            <span>02 // SAVED SPECIFICATIONS ({savedItems.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('config')}
            className={`px-4 py-2 uppercase border transition-colors cursor-pointer select-none whitespace-nowrap ${
              activeTab === 'config'
                ? 'bg-white text-black border-white font-bold'
                : 'border-neutral-800 text-neutral-400 hover:border-neutral-600 hover:text-white'
            }`}
          >
            03 // TERMINAL CONFIG
          </button>
        </div>
      </div>

      {/* TAB CONTENT */}
      <div className="max-w-6xl mx-auto w-full">
        {/* TAB 1: DISPATCH RECORDS */}
        {activeTab === 'orders' && (
          <div className="flex flex-col space-y-4">
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block font-bold">
              LOGGED DISPATCH TELEMETRY ({ORDER_RECORDS_MOCK.length} ARCHIVES)
            </span>

            <div className="flex flex-col space-y-4">
              {ORDER_RECORDS_MOCK.map((order) => (
                <div
                  key={order.id}
                  className="border border-neutral-800 bg-[#0e0e0e] p-5 sm:p-6 space-y-4 hover:border-neutral-700 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm text-white font-bold">{order.id}</span>
                      {renderStatusBadge(order.status)}
                    </div>

                    <div className="flex items-center gap-3 font-mono text-xs text-neutral-400">
                      <span>{order.date}</span>
                      <span>|</span>
                      <span>TOTAL: <strong className="text-white">${order.total} USD</strong></span>
                    </div>
                  </div>

                  {/* ORDER ITEMS LIST */}
                  <div className="divide-y divide-neutral-900">
                    {order.items.map((item) => (
                      <div key={item.sku} className="py-2.5 flex items-center justify-between font-mono text-xs">
                        <div>
                          <span className="text-white font-bold block">{item.title}</span>
                          <span className="text-neutral-500 text-[10px] uppercase">
                            SKU: {item.sku} // SIZE: {item.size} // QTY: {item.quantity}
                          </span>
                        </div>
                        <span className="text-white font-bold">${item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  {/* CARRIER & TRACKING ACTION */}
                  <div className="pt-2 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
                    <div className="text-neutral-400">
                      CARRIER: <span className="text-white">{order.carrier}</span> ({order.tracking})
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopyTracking(order.tracking)}
                      className="border border-neutral-700 hover:border-white hover:bg-white hover:text-black px-3 py-1.5 uppercase transition-colors cursor-pointer select-none text-[10px] self-start sm:self-auto font-bold"
                    >
                      COPY WAYBILL TELEMETRY
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: SAVED SPECIFICATIONS */}
        {activeTab === 'saved' && (
          <div className="flex flex-col space-y-4">
            <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block font-bold">
              ENCRYPTED ARCHIVE SAVES ({savedItems.length} ITEMS)
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-neutral-800 bg-[#0e0e0e] p-4 flex gap-4 group hover:border-white transition-colors"
                >
                  <div className="w-20 h-24 bg-neutral-900 border border-neutral-800 overflow-hidden flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <span className="font-mono text-[9px] text-neutral-500 uppercase tracking-widest block">
                        SKU // {item.sku}
                      </span>
                      <h4 className="font-sans text-xs font-bold text-white uppercase tracking-tight truncate mt-0.5">
                        {item.title}
                      </h4>
                      <span className="font-mono text-xs text-white font-bold mt-1 block">
                        ${item.price} USD
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectProduct?.(item.productId)}
                      className="border border-neutral-700 hover:border-white hover:bg-white hover:text-black font-mono text-[10px] uppercase py-1 px-2 transition-colors cursor-pointer text-center font-bold"
                    >
                      VIEW SPECIFICATION
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: TERMINAL CONFIG */}
        {activeTab === 'config' && (
          <div className="border border-neutral-800 bg-[#0e0e0e] p-5 sm:p-8 space-y-6 max-w-2xl">
            <div className="border-b border-neutral-800 pb-3">
              <span className="font-mono text-xs text-white uppercase tracking-widest font-bold">
                OPERATOR TERMINAL PARAMETERS
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-neutral-400 uppercase">OPERATOR CALLSIGN</label>
                <input
                  type="text"
                  defaultValue={USER_PROFILE_MOCK.callsign}
                  className="bg-[#131313] border border-neutral-700 text-white font-mono text-xs px-3 py-2.5 focus:border-white focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-neutral-400 uppercase">FREQUENCY EMAIL</label>
                <input
                  type="email"
                  defaultValue={USER_PROFILE_MOCK.email}
                  className="bg-[#131313] border border-neutral-700 text-white font-mono text-xs px-3 py-2.5 focus:border-white focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-neutral-400 uppercase">COMMUNICATION TELEPHONE</label>
                <input
                  type="tel"
                  defaultValue={USER_PROFILE_MOCK.phone}
                  className="bg-[#131313] border border-neutral-700 text-white font-mono text-xs px-3 py-2.5 focus:border-white focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[10px] text-neutral-400 uppercase">DEFAULT DISPATCH DESTINATION</label>
                <input
                  type="text"
                  defaultValue="Kyiv, Nova Poshta Branch #42"
                  className="bg-[#131313] border border-neutral-700 text-white font-mono text-xs px-3 py-2.5 focus:border-white focus:outline-none"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setToastMessage('TERMINAL PARAMETERS SYNCHRONIZED')}
              className="bg-white text-black hover:bg-neutral-200 font-mono text-xs uppercase font-bold py-3 px-6 transition-colors cursor-pointer select-none"
            >
              SAVE PARAMETERS
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
