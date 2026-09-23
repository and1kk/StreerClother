import React, { useState } from 'react';
import { ChevronDownIcon } from '../../../components/ui/Icons';

export const ProductAccordions: React.FC = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    spec: false,
    matrix: false,
    dispatch: false,
    care: false
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="flex flex-col border border-outline-variant divide-y divide-outline-variant mt-space-sm bg-surface-container-lowest">
      {/* ACCORDION ITEM 1: SYSTEM SPECIFICATION */}
      <div className="accordion-item">
        <button
          type="button"
          onClick={() => toggleSection('spec')}
          className="w-full px-3 sm:px-space-sm flex items-center justify-between text-left font-label-md text-[10px] sm:text-label-md uppercase tracking-wider text-primary hover:bg-surface-container transition-colors py-3 cursor-pointer select-none"
        >
          <span className="flex items-center gap-1.5 sm:gap-2 truncate pr-2">
            <span className="text-outline flex-shrink-0">01 //</span>
            <span className="truncate">SYSTEM SPECIFICATION &amp; DESCRIPTION</span>
          </span>
          <ChevronDownIcon
            size={16}
            className={`transition-transform duration-200 flex-shrink-0 ${
              openSections.spec ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.spec && (
          <div className="px-3 sm:px-space-sm pb-3.5 sm:pb-4 pt-1 font-body-sm text-xs sm:text-body-sm text-on-surface-variant space-y-2 border-t border-outline-variant bg-surface-container-low">
            <p className="leading-relaxed">
              Constructed to dismantle conventional commercial proportion. Engineered with zero
              external cords or metallic eyelets for an austere brutalist neck contour.
            </p>
            <ul className="font-label-sm text-[10px] sm:text-label-sm text-on-surface space-y-1 pt-1 list-inside uppercase">
              <li>• Double-layer structured hood engineered to stand upright</li>
              <li>• Reinforced underarm gusseting for mechanical range</li>
              <li>• Invisible side seam kangaroo pocket integration</li>
              <li>• Blind tonal embroidery at nape: VOID™ SYSTEM PROTOCOL</li>
            </ul>
          </div>
        )}
      </div>

      {/* ACCORDION ITEM 2: FIT & FABRIC MATRIX */}
      <div className="accordion-item">
        <button
          type="button"
          onClick={() => toggleSection('matrix')}
          className="w-full px-3 sm:px-space-sm flex items-center justify-between text-left font-label-md text-[10px] sm:text-label-md uppercase tracking-wider text-primary hover:bg-surface-container transition-colors py-3 cursor-pointer select-none"
        >
          <span className="flex items-center gap-1.5 sm:gap-2 truncate pr-2">
            <span className="text-outline flex-shrink-0">02 //</span>
            <span className="truncate">FIT &amp; FABRIC MATRIX</span>
          </span>
          <ChevronDownIcon
            size={16}
            className={`transition-transform duration-200 flex-shrink-0 ${
              openSections.matrix ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.matrix && (
          <div className="px-3 sm:px-space-sm pb-3.5 sm:pb-4 pt-1 font-body-sm text-xs sm:text-body-sm text-on-surface-variant space-y-3 border-t border-outline-variant bg-surface-container-low">
            <p className="leading-relaxed">
              100% GOTS certified organic heavyweight cotton. Custom woven 450 GSM French Terry
              loopback yarn. Pre-shrunk with industrial stone enzyme wash for vintage surface hand
              feel.
            </p>
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2 font-label-sm text-[9px] sm:text-label-sm border border-outline-variant p-2 bg-surface">
              <div>
                <span className="text-outline">WEIGHT:</span> 450 GSM
              </div>
              <div>
                <span className="text-outline">WEAVE:</span> FRENCH TERRY
              </div>
              <div>
                <span className="text-outline">CUT:</span> BOXY CROPPED
              </div>
              <div>
                <span className="text-outline">SHRINKAGE:</span> &lt;1.5% POST-WASH
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ACCORDION ITEM 3: LOGISTICS & RETURNS */}
      <div className="accordion-item">
        <button
          type="button"
          onClick={() => toggleSection('dispatch')}
          className="w-full px-3 sm:px-space-sm flex items-center justify-between text-left font-label-md text-[10px] sm:text-label-md uppercase tracking-wider text-primary hover:bg-surface-container transition-colors py-3 cursor-pointer select-none"
        >
          <span className="flex items-center gap-1.5 sm:gap-2 truncate pr-2">
            <span className="text-outline flex-shrink-0">03 //</span>
            <span className="truncate">DISPATCH, LOGISTICS &amp; RETURNS</span>
          </span>
          <ChevronDownIcon
            size={16}
            className={`transition-transform duration-200 flex-shrink-0 ${
              openSections.dispatch ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.dispatch && (
          <div className="px-3 sm:px-space-sm pb-3.5 sm:pb-4 pt-1 font-body-sm text-xs sm:text-body-sm text-on-surface-variant space-y-2 border-t border-outline-variant bg-surface-container-low">
            <p className="leading-relaxed">Dispatched directly from Terminal Base 01 Kyiv within 24 hours of clearance.</p>
            <div className="space-y-1.5 font-label-sm text-[9px] sm:text-label-sm text-on-surface">
              <div className="flex flex-col xs:flex-row xs:justify-between border-b border-outline-variant py-1 gap-0.5">
                <span className="text-outline">UKRAINE (NOVA POSHTA):</span>
                <span>1-2 DAYS // COMPLIMENTARY &gt;2000 UAH</span>
              </div>
              <div className="flex flex-col xs:flex-row xs:justify-between border-b border-outline-variant py-1 gap-0.5">
                <span className="text-outline">GLOBAL (DHL EXPRESS):</span>
                <span>3-5 DAYS // AT CHECKOUT</span>
              </div>
              <div className="flex flex-col xs:flex-row xs:justify-between py-1 gap-0.5">
                <span className="text-outline">RETURNS:</span>
                <span>14 DAYS STRICT ZERO-COMPROMISE POLICY</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ACCORDION ITEM 4: CARE PROTOCOL */}
      <div className="accordion-item">
        <button
          type="button"
          onClick={() => toggleSection('care')}
          className="w-full px-3 sm:px-space-sm flex items-center justify-between text-left font-label-md text-[10px] sm:text-label-md uppercase tracking-wider text-primary hover:bg-surface-container transition-colors py-3 cursor-pointer select-none"
        >
          <span className="flex items-center gap-1.5 sm:gap-2 truncate pr-2">
            <span className="text-outline flex-shrink-0">04 //</span>
            <span className="truncate">CARE INSTRUCTIONS &amp; MAINTENANCE</span>
          </span>
          <ChevronDownIcon
            size={16}
            className={`transition-transform duration-200 flex-shrink-0 ${
              openSections.care ? 'rotate-180' : ''
            }`}
          />
        </button>
        {openSections.care && (
          <div className="px-3 sm:px-space-sm pb-3.5 sm:pb-4 pt-1 font-body-sm text-xs sm:text-body-sm text-on-surface-variant space-y-1 font-label-sm text-[9px] sm:text-label-sm border-t border-outline-variant bg-surface-container-low uppercase">
            <p>• COLD WASH INSIDE OUT MAXIMUM 30°C</p>
            <p>• DO NOT TUMBLE DRY (PREVENT FIBER TENSION)</p>
            <p>• FLAT DRY OR HANG IN SHADE TO MAINTAIN STRUCTURE</p>
            <p>• IRON REVERSE SIDE ON LOW HEAT IF DESIRED</p>
          </div>
        )}
      </div>
    </div>
  );
};
