import React from 'react';

export interface BreadcrumbBarProps {
  category: string;
  title: string;
  sku: string;
  specStatus?: string;
  edition?: string;
  onNavigateHome?: () => void;
  onNavigateCategory?: () => void;
}

export const BreadcrumbBar: React.FC<BreadcrumbBarProps> = ({
  category,
  title,
  sku,
  specStatus = 'SPEC VERIFICATION: ACTIVE',
  edition = 'EDITION: FW25-BATCH.04',
  onNavigateHome,
  onNavigateCategory
}) => {
  return (
    <div className="w-full border-b border-outline-variant px-4 sm:px-6 md:px-margin py-2 sm:py-3 flex items-center justify-between gap-x-3 gap-y-1.5 bg-surface text-[10px] sm:text-label-sm">
      {/* BREADCRUMBS */}
      <div className="flex items-center gap-1.5 sm:gap-2 font-label-sm text-outline uppercase tracking-wider sm:tracking-widest overflow-hidden min-w-0">
        <button
          type="button"
          onClick={onNavigateHome}
          className="hover:text-primary transition-colors cursor-pointer flex-shrink-0"
        >
          HOME
        </button>
        <span className="flex-shrink-0">/</span>
        <button
          type="button"
          onClick={onNavigateCategory}
          className="hover:text-primary transition-colors cursor-pointer flex-shrink-0"
        >
          {category}
        </button>
        <span className="flex-shrink-0">/</span>
        <span className="text-primary font-bold truncate max-w-[140px] sm:max-w-none">{title}</span>
        <span className="text-outline-variant font-normal hidden md:inline">//</span>
        <span className="text-on-surface-variant hidden md:inline">SKU: {sku}</span>
      </div>

      {/* SYSTEM TELEMETRY */}
      <div className="flex items-center gap-2 sm:gap-3 font-label-sm text-outline uppercase flex-shrink-0">
        <span className="inline-block w-1.5 h-1.5 rounded-none bg-primary animate-ping" />
        <span className="text-primary hidden sm:inline">{specStatus}</span>
        <span className="text-primary sm:hidden">ACTIVE</span>
        <span className="text-outline-variant hidden sm:inline">|</span>
        <span className="hidden sm:inline">{edition}</span>
      </div>
    </div>
  );
};
