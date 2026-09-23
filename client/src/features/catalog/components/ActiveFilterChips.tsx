import React from 'react';
import { CloseIcon } from '../../../components/ui/Icons';
import { FilterState } from '../../../types/catalog.types';

export interface ActiveFilterChipsProps {
  filters: FilterState;
  onRemoveCategory: (category: string) => void;
  onRemoveSize: (size: string) => void;
  onRemoveColor: (color: string) => void;
  onResetFit: () => void;
  onClearAll: () => void;
}

export const ActiveFilterChips: React.FC<ActiveFilterChipsProps> = ({
  filters,
  onRemoveCategory,
  onRemoveSize,
  onRemoveColor,
  onResetFit,
  onClearAll
}) => {
  const chips: { id: string; label: string; onRemove: () => void }[] = [];

  filters.categories.forEach((cat) => {
    chips.push({
      id: `cat-${cat}`,
      label: `CAT: ${cat.toUpperCase()}`,
      onRemove: () => onRemoveCategory(cat)
    });
  });

  filters.sizes.forEach((size) => {
    chips.push({
      id: `size-${size}`,
      label: `SIZE: ${size.toUpperCase()}`,
      onRemove: () => onRemoveSize(size)
    });
  });

  filters.colors.forEach((color) => {
    chips.push({
      id: `color-${color}`,
      label: `COLOR: ${color.toUpperCase()}`,
      onRemove: () => onRemoveColor(color)
    });
  });

  if (filters.fitType) {
    chips.push({
      id: `fit-${filters.fitType}`,
      label: `FIT: ${filters.fitType.toUpperCase()}`,
      onRemove: onResetFit
    });
  }

  if (chips.length === 0) {
    return null;
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 py-3 border-b border-neutral-800 bg-[#131313] flex flex-wrap items-center gap-2">
      <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider mr-2">
        APPLIED SPEC:
      </span>

      {chips.map((chip) => (
        <span
          key={chip.id}
          className="inline-flex items-center gap-1.5 bg-[#262626] text-white border border-neutral-700 px-2.5 py-1 font-mono text-[10px] uppercase"
        >
          {chip.label}
          <button
            type="button"
            onClick={chip.onRemove}
            className="hover:text-red-400 transition-colors p-0.5"
            aria-label={`Remove filter ${chip.label}`}
          >
            <CloseIcon size={12} />
          </button>
        </span>
      ))}

      <button
        type="button"
        onClick={onClearAll}
        className="font-mono text-[10px] text-neutral-400 hover:text-white underline ml-auto uppercase tracking-widest transition-colors py-1"
      >
        CLEAR ALL ({chips.length})
      </button>
    </div>
  );
};
