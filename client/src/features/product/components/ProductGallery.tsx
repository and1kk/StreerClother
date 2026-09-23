import React, { useRef, useState, useEffect } from 'react';
import { GallerySlide } from '../types/product-detail.types';
import {
  CameraIcon,
  SwipeIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '../../../components/ui/Icons';

export interface ProductGalleryProps {
  slides: GallerySlide[];
  activeSlide: number;
  seriesRef?: string;
  onSlideChange: (index: number) => void;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  slides,
  activeSlide,
  seriesRef = '091-HD',
  onSlideChange
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const isHorizontalSwipeRef = useRef<boolean | null>(null);

  const totalSlides = slides.length;

  const handlePrevSlide = () => {
    const nextIndex = activeSlide <= 0 ? totalSlides - 1 : activeSlide - 1;
    onSlideChange(nextIndex);
  };

  const handleNextSlide = () => {
    const nextIndex = activeSlide >= totalSlides - 1 ? 0 : activeSlide + 1;
    onSlideChange(nextIndex);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }
      if (e.key === 'ArrowLeft') {
        handlePrevSlide();
      } else if (e.key === 'ArrowRight') {
        handleNextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlide, totalSlides]);

  // Pointer / Touch Swipe Handlers (Fluid Real-Time Dragging)
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return;
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    startXRef.current = e.clientX;
    startYRef.current = e.clientY;
    isHorizontalSwipeRef.current = null;
    setIsDragging(true);

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // safe fallback
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const deltaX = e.clientX - startXRef.current;
    const deltaY = e.clientY - startYRef.current;

    // Detect direction threshold
    if (isHorizontalSwipeRef.current === null) {
      if (Math.abs(deltaX) > 6 || Math.abs(deltaY) > 6) {
        isHorizontalSwipeRef.current = Math.abs(deltaX) > Math.abs(deltaY);
      }
    }

    if (isHorizontalSwipeRef.current) {
      let effectiveDelta = deltaX;
      if (
        (activeSlide === 0 && deltaX > 0) ||
        (activeSlide === totalSlides - 1 && deltaX < 0)
      ) {
        effectiveDelta = deltaX * 0.35;
      }
      setDragOffset(effectiveDelta);
    }
  };

  const handlePointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // safe fallback
    }

    const finalOffset = dragOffset;
    setIsDragging(false);
    setDragOffset(0);

    if (isHorizontalSwipeRef.current) {
      const swipeThreshold = 40;
      if (finalOffset < -swipeThreshold) {
        handleNextSlide();
      } else if (finalOffset > swipeThreshold) {
        handlePrevSlide();
      }
    }

    isHorizontalSwipeRef.current = null;
  };

  const currentFrameBadge = `FRAME 0${activeSlide + 1} / 0${totalSlides}`;

  return (
    <div className="lg:col-span-7 flex flex-col border-b lg:border-b-0 lg:border-r border-outline-variant pr-0 lg:pr-space-md">
      {/* GALLERY UTILITY HEADER STRIP */}
      <div className="flex items-center justify-between pb-2.5 sm:pb-3 mb-space-sm border-b border-outline-variant">
        <div className="flex items-center gap-2">
          <CameraIcon size={16} className="text-primary flex-shrink-0" />
          <span className="font-label-md text-[10px] sm:text-label-md uppercase text-primary tracking-widest truncate">
            OPTICAL RECORD // 0{totalSlides} ANGLES
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <div
            id="active-slide-badge"
            className="font-label-sm text-[9px] sm:text-label-sm bg-surface-container-high px-2 py-0.5 border border-outline-variant text-primary font-bold tracking-widest select-none"
          >
            {currentFrameBadge}
          </div>
          <div className="font-label-sm text-label-sm text-outline hidden sm:flex items-center gap-2 uppercase select-none">
            <SwipeIcon size={14} />
            <span>SWIPE / ARROWS</span>
          </div>
        </div>
      </div>

      {/* GALLERY WORKSPACE: Stacked on mobile, side-by-side on sm+ */}
      <div className="flex flex-col sm:flex-row gap-3 w-full items-center sm:items-start justify-center lg:justify-start max-w-3xl mx-auto lg:mx-0">
        {/* DESKTOP/TABLET VERTICAL THUMBNAILS (Hidden on phones < sm for maximum picture width) */}
        <div
          className="hidden sm:flex flex-col gap-2 w-16 sm:w-20 flex-shrink-0 items-stretch"
          id="gallery-thumbnails"
        >
          {/* SCROLL UP BUTTON */}
          <button
            type="button"
            aria-label="Previous Image"
            onClick={handlePrevSlide}
            className="w-full py-2 bg-surface-container-high hover:bg-primary text-primary hover:text-on-primary border border-primary flex items-center justify-center transition-all focus:outline-none shadow-sm cursor-pointer select-none"
          >
            <ChevronUpIcon size={18} className="font-bold" />
          </button>

          {/* THUMBNAIL LIST */}
          <div className="flex flex-col gap-2 justify-start" id="thumbnail-list">
            {slides.map((slide, idx) => {
              const isActive = idx === activeSlide;
              return (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Go to Frame ${slide.frameNumber}`}
                  onClick={() => onSlideChange(idx)}
                  className={`thumbnail-btn aspect-[4/5] bg-surface-container-lowest overflow-hidden transition-all duration-200 group text-left relative cursor-pointer select-none ${
                    isActive
                      ? 'border-2 border-primary opacity-100 ring-1 ring-primary'
                      : 'border border-outline-variant opacity-40 hover:opacity-100'
                  }`}
                >
                  <img
                    src={slide.imageUrl}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform"
                    loading="lazy"
                  />
                  <span className="absolute bottom-1 left-1 font-label-sm text-[9px] bg-black/85 px-1 py-0.5 text-primary border border-outline-variant font-mono">
                    {slide.frameNumber}
                  </span>
                </button>
              );
            })}
          </div>

          {/* SCROLL DOWN BUTTON */}
          <button
            type="button"
            aria-label="Next Image"
            onClick={handleNextSlide}
            className="w-full py-2 bg-surface-container-high hover:bg-primary text-primary hover:text-on-primary border border-primary flex items-center justify-center transition-all focus:outline-none shadow-sm cursor-pointer select-none"
          >
            <ChevronDownIcon size={18} className="font-bold" />
          </button>
        </div>

        {/* MAIN CONTROLLED VIEWPORT (Full width on mobile, bounded on desktop) */}
        <div className="w-full sm:flex-1 flex flex-col items-center">
          <div
            ref={containerRef}
            tabIndex={0}
            role="region"
            aria-label="Product Media Carousel"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            className={`relative w-full max-w-[560px] xl:max-w-[600px] h-[360px] xs:h-[420px] sm:h-[480px] md:h-[520px] lg:h-[560px] aspect-[4/5] overflow-hidden border border-outline-variant bg-surface-container-lowest select-none group touch-pan-y focus:outline-none focus:ring-1 focus:ring-primary ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
          >
            {/* SLIDES CONTAINER WITH REAL-TIME TRANSFORM */}
            <div
              className="w-full h-full flex"
              style={{
                transform: `translateX(calc(-${activeSlide * 100}% + ${dragOffset}px))`,
                transition: isDragging ? 'none' : 'transform 320ms cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="min-w-full w-full h-full flex-shrink-0 relative overflow-hidden bg-surface-container"
                >
                  {/* FRAME TOP-LEFT BADGE */}
                  <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-20 font-label-sm text-[9px] sm:text-label-sm bg-surface/90 text-primary px-2 py-0.5 sm:py-1 border border-outline-variant backdrop-blur-sm pointer-events-none">
                    FRAME_{slide.frameNumber} // {slide.title}
                  </div>

                  {/* HOVER MAGNIFY BADGE (DESKTOP) */}
                  <div className="absolute bottom-3 right-3 z-20 opacity-0 group-hover:opacity-100 transition-opacity font-label-sm text-label-sm bg-primary text-on-primary px-2 py-1 font-bold pointer-events-none hidden sm:block">
                    [+] 100% MAGNIFY
                  </div>

                  {/* IMAGE */}
                  <img
                    src={slide.imageUrl}
                    alt={slide.alt}
                    draggable={false}
                    className="w-full h-full object-cover object-center grayscale contrast-125 group-hover:scale-105 transition-transform duration-500 ease-out select-none pointer-events-none"
                  />
                </div>
              ))}
            </div>

            {/* OVERLAY QUICK PREV/NEXT BUTTONS */}
            <button
              type="button"
              aria-label="Previous Slide"
              onPointerDown={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                handlePrevSlide();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-10 sm:h-10 bg-[#131313]/90 hover:bg-white text-white hover:text-black border border-neutral-700 hover:border-white flex items-center justify-center opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-md select-none"
            >
              <ChevronLeftIcon size={18} />
            </button>

            <button
              type="button"
              aria-label="Next Slide"
              onPointerDown={(e) => e.stopPropagation()}
              onPointerUp={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation();
                handleNextSlide();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-40 w-9 h-9 sm:w-10 sm:h-10 bg-[#131313]/90 hover:bg-white text-white hover:text-black border border-neutral-700 hover:border-white flex items-center justify-center opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer shadow-md select-none"
            >
              <ChevronRightIcon size={18} />
            </button>
          </div>

          {/* MOBILE COMPACT THUMBNAILS ROW (Clean, tappable, under the photo) */}
          <div className="grid grid-cols-4 gap-2 w-full max-w-[560px] mt-2.5 sm:hidden">
            {slides.map((slide, idx) => {
              const isActive = idx === activeSlide;
              return (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Jump to Frame ${slide.frameNumber}`}
                  onClick={() => onSlideChange(idx)}
                  className={`aspect-[4/5] bg-surface-container-lowest overflow-hidden transition-all relative ${
                    isActive
                      ? 'border-2 border-primary opacity-100 ring-1 ring-primary'
                      : 'border border-outline-variant opacity-50 hover:opacity-100'
                  }`}
                >
                  <img
                    src={slide.imageUrl}
                    alt={`Thumb ${slide.frameNumber}`}
                    className="w-full h-full object-cover grayscale"
                  />
                  <span className="absolute bottom-0.5 left-0.5 font-label-sm text-[8px] bg-black/90 px-1 text-primary border border-outline-variant">
                    {slide.frameNumber}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* GALLERY FOOTER INDEX */}
      <div className="p-space-sm mt-space-md border border-outline-variant bg-surface-container-lowest flex items-center justify-between text-[10px] sm:text-label-sm">
        <span className="font-label-sm text-outline uppercase tracking-wider">
          OPTICAL ARCHIVE // VERIFIED
        </span>
        <span className="font-label-sm text-primary uppercase font-bold">
          REF: {seriesRef} // 0{totalSlides}
        </span>
      </div>
    </div>
  );
};
