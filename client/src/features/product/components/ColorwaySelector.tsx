import React from 'react';
import { ProductColorway } from '../types/product-detail.types';

export interface ColorwaySelectorProps {
  colorways: ProductColorway[];
  selectedColor: ProductColorway;
  onSelectColor: (color: ProductColorway) => void;
}

export const ColorwaySelector: React.FC<ColorwaySelectorProps> = ({
  colorways,
  selectedColor,
  onSelectColor
}) => {
  return (
    <div className="flex flex-col gap-space-xs pt-space-xs border-t border-outline-variant">
      {/* HEADER METRICS */}
      <div className="flex items-center justify-between">
        <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
          COLORWAY:{' '}
          <span className="text-primary font-bold" id="current-color-label">
            {selectedColor.name}
          </span>
        </span>
        <span className="font-label-sm text-label-sm text-outline">
          CODE: {selectedColor.code}
        </span>
      </div>

      {/* SWATCH RADIOGROUP */}
      <div
        aria-label="Color selector"
        role="radiogroup"
        className="flex items-center gap-3 mt-1"
      >
        {colorways.map((color) => {
          const isSelected = color.id === selectedColor.id;
          return (
            <button
              key={color.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              title={color.name}
              onClick={() => onSelectColor(color)}
              className={`color-btn w-8 h-8 rounded-none relative flex items-center justify-center p-0.5 focus:outline-none transition-all cursor-pointer ${
                isSelected
                  ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface border border-primary'
                  : 'border border-outline-variant hover:border-primary'
              }`}
              style={{ backgroundColor: color.hex }}
            >
              <span
                className="w-full h-full block border border-outline-variant/50"
                style={{ backgroundColor: color.innerHex || color.hex }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
