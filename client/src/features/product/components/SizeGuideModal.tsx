import React, { useEffect } from 'react';
import { SizeGuideMeasurement } from '../types/product-detail.types';
import { CloseIcon } from '../../../components/ui/Icons';

export interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  measurements: SizeGuideMeasurement[];
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  measurements
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="size-guide-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#131313]/85 backdrop-blur-sm p-3 sm:p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-surface border border-primary max-w-xl w-full p-4 sm:p-space-lg shadow-[6px_6px_0px_0px_#ffffff] sm:shadow-[8px_8px_0px_0px_#ffffff] relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-outline-variant pb-2.5 sm:pb-space-sm mb-3 sm:mb-space-md">
          <div>
            <span className="font-label-sm text-[9px] sm:text-label-sm text-outline uppercase">
              DIMENSIONAL METRIC MATRIX
            </span>
            <h3
              id="size-guide-title"
              className="font-headline-sm text-lg sm:text-headline-sm text-primary uppercase"
            >
              HOODIE // MEASUREMENTS (CM)
            </h3>
          </div>
          <button
            type="button"
            aria-label="Close size guide"
            onClick={onClose}
            className="text-primary hover:text-outline p-1 cursor-pointer transition-colors"
          >
            <CloseIcon size={20} className="sm:w-[22px] sm:h-[22px]" />
          </button>
        </div>

        {/* METRIC MATRIX TABLE */}
        <div className="overflow-x-auto mb-3 sm:mb-space-md -mx-1 sm:mx-0">
          <table className="w-full text-left font-label-sm text-[10px] sm:text-label-sm border border-outline-variant min-w-[280px]">
            <thead className="bg-surface-container border-b border-outline-variant text-primary">
              <tr>
                <th className="p-1.5 sm:p-2 border-r border-outline-variant">SPEC / SIZE</th>
                <th className="p-1.5 sm:p-2 border-r border-outline-variant">CHEST (1/2)</th>
                <th className="p-1.5 sm:p-2 border-r border-outline-variant">LENGTH</th>
                <th className="p-1.5 sm:p-2">SHOULDER</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant text-on-surface">
              {measurements.map((m) => (
                <tr
                  key={m.size}
                  className={m.isRecommended ? 'bg-surface-container-high text-primary' : ''}
                >
                  <td className="p-1.5 sm:p-2 font-bold border-r border-outline-variant">{m.size}</td>
                  <td className="p-1.5 sm:p-2 border-r border-outline-variant">{m.chest}</td>
                  <td className="p-1.5 sm:p-2 border-r border-outline-variant">{m.length}</td>
                  <td className="p-1.5 sm:p-2">{m.shoulder}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* NOTE */}
        <p className="font-body-sm text-xs sm:text-body-sm text-on-surface-variant mb-3 sm:mb-space-md leading-relaxed">
          Cut with drastic drop-shoulder architecture. If standard fitting is preferred rather
          than exaggerated boxy volume, consider sizing down one level.
        </p>

        {/* ACKNOWLEDGE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          className="w-full bg-primary text-on-primary font-label-md text-xs sm:text-label-md py-2.5 sm:py-3 uppercase tracking-wider font-bold hover:bg-surface-container-highest hover:text-primary transition-colors cursor-pointer"
        >
          ACKNOWLEDGE SPECIFICATION
        </button>
      </div>
    </div>
  );
};
