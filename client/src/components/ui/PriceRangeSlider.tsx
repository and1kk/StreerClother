import React, { useRef, useState, useEffect } from 'react';

export interface PriceRangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

export const PriceRangeSlider: React.FC<PriceRangeSliderProps> = ({
  min = 0,
  max = 500,
  step = 10,
  value,
  onChange
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeThumb, setActiveThumb] = useState<'min' | 'max' | null>(null);

  const getPercent = (val: number) => {
    return Math.max(0, Math.min(100, ((val - min) / (max - min)) * 100));
  };

  const minPercent = getPercent(value[0]);
  const maxPercent = getPercent(value[1]);

  const updateFromPointer = (clientX: number, thumb: 'min' | 'max') => {
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const rawVal = min + ratio * (max - min);
    const steppedVal = Math.round(rawVal / step) * step;

    if (thumb === 'min') {
      const clampedVal = Math.max(min, Math.min(steppedVal, value[1] - step));
      onChange([clampedVal, value[1]]);
    } else {
      const clampedVal = Math.min(max, Math.max(steppedVal, value[0] + step));
      onChange([value[0], clampedVal]);
    }
  };

  useEffect(() => {
    if (!activeThumb) return;

    const handlePointerMove = (e: PointerEvent) => {
      updateFromPointer(e.clientX, activeThumb);
    };

    const handlePointerUp = () => {
      setActiveThumb(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [activeThumb, value, min, max, step]);

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const clickedVal = min + ratio * (max - min);

    // Determine nearest thumb
    const distToMin = Math.abs(clickedVal - value[0]);
    const distToMax = Math.abs(clickedVal - value[1]);

    if (distToMin < distToMax) {
      const clamped = Math.max(min, Math.min(Math.round(clickedVal / step) * step, value[1] - step));
      onChange([clamped, value[1]]);
    } else {
      const clamped = Math.min(max, Math.max(Math.round(clickedVal / step) * step, value[0] + step));
      onChange([value[0], clamped]);
    }
  };

  return (
    <div className="w-full flex flex-col py-2 select-none">
      {/* TRACK CONTAINER */}
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        className="relative w-full h-7 flex items-center cursor-pointer touch-none"
      >
        {/* INACTIVE BACKGROUND BAR */}
        <div className="absolute w-full h-1.5 bg-neutral-800 pointer-events-none" />

        {/* ACTIVE WHITE RANGE BAR */}
        <div
          className="absolute h-1.5 bg-white pointer-events-none transition-all duration-75"
          style={{
            left: `${minPercent}%`,
            width: `${Math.max(0, maxPercent - minPercent)}%`
          }}
        />

        {/* MIN THUMB */}
        <div
          role="slider"
          aria-label="Minimum price"
          aria-valuemin={min}
          aria-valuemax={value[1]}
          aria-valuenow={value[0]}
          tabIndex={0}
          onPointerDown={(e) => {
            e.stopPropagation();
            setActiveThumb('min');
          }}
          className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#131313] cursor-grab active:cursor-grabbing hover:scale-110 transition-transform z-20 ${
            activeThumb === 'min' ? 'ring-2 ring-white/50 scale-110' : ''
          }`}
          style={{
            left: `calc(${minPercent}% - 8px)`
          }}
        />

        {/* MAX THUMB */}
        <div
          role="slider"
          aria-label="Maximum price"
          aria-valuemin={value[0]}
          aria-valuemax={max}
          aria-valuenow={value[1]}
          tabIndex={0}
          onPointerDown={(e) => {
            e.stopPropagation();
            setActiveThumb('max');
          }}
          className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#131313] cursor-grab active:cursor-grabbing hover:scale-110 transition-transform z-30 ${
            activeThumb === 'max' ? 'ring-2 ring-white/50 scale-110' : ''
          }`}
          style={{
            left: `calc(${maxPercent}% - 8px)`
          }}
        />
      </div>
    </div>
  );
};
