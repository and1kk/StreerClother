import React, { useState } from 'react';
import { TerminalIcon, SearchOffIcon } from '../../../components/ui/Icons';
import { Button } from '../../../components/ui/Button';

export interface DiagnosticEmptyStateProps {
  onPurgeFilters: () => void;
  defaultExpanded?: boolean;
}

export const DiagnosticEmptyState: React.FC<DiagnosticEmptyStateProps> = ({
  onPurgeFilters,
  defaultExpanded = false
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);

  return (
    <div className="p-6 bg-[#0e0e0e] border-b border-neutral-800">
      <div
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between cursor-pointer select-none group"
      >
        <div className="flex items-center gap-3">
          <TerminalIcon size={18} className="text-neutral-500 group-hover:text-neutral-300 transition-colors" />
          <span className="font-mono text-[11px] text-neutral-500 group-hover:text-neutral-300 uppercase tracking-wider transition-colors">
            DIAGNOSTIC VIEW: ZERO-RESULT QUERY TEST
          </span>
        </div>
        <span className="font-mono text-[11px] text-white underline uppercase">
          {expanded ? '[COLLAPSE PREVIEW]' : '[EXPAND PREVIEW]'}
        </span>
      </div>

      {expanded && (
        <div className="mt-6 p-12 bg-[#131313] border border-neutral-800 flex flex-col items-center justify-center text-center animate-fade-in">
          <div className="w-14 h-14 bg-neutral-900 border border-neutral-800 flex items-center justify-center mb-4">
            <SearchOffIcon size={28} className="text-neutral-500" />
          </div>

          <h4 className="font-display text-xl text-white uppercase tracking-tight font-black">
            NO MATCHING DISPATCH FOUND
          </h4>

          <p className="font-sans text-xs sm:text-sm text-neutral-400 max-w-md mt-2 leading-relaxed">
            Your query parameters yielded zero cataloged items. Reset filters, broaden the valuation range, or adjust sizing criteria.
          </p>

          <Button
            type="button"
            variant="primary"
            size="lg"
            className="mt-6"
            onClick={onPurgeFilters}
          >
            PURGE ALL ACTIVE FILTERS
          </Button>
        </div>
      )}
    </div>
  );
};
