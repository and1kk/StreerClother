import React from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  count?: number;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  count,
  className = '',
  checked,
  onChange,
  id,
  ...props
}) => {
  const generatedId = id || (label ? `chk-${label.toLowerCase().replace(/\s+/g, '-')}` : undefined);

  return (
    <label
      htmlFor={generatedId}
      className={`flex items-center justify-between cursor-pointer group select-none py-1.5 px-0.5 ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center flex-shrink-0">
          <input
            id={generatedId}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="sr-only peer"
            {...props}
          />
          {/* Custom brutalist square box: #1b1b1b unchecked, solid white fill with black check when checked */}
          <div
            className={`w-4 h-4 rounded-none border transition-all flex items-center justify-center ${
              checked
                ? 'bg-white border-white text-black shadow-[0_0_8px_rgba(255,255,255,0.2)]'
                : 'bg-[#1b1b1b] border-neutral-700 group-hover:border-neutral-400 group-hover:bg-[#262626]'
            }`}
          >
            {checked && (
              <svg
                className="w-3 h-3 text-black stroke-[3]"
                viewBox="0 0 14 14"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.5 7.5L5.5 10.5L11.5 3.5" strokeLinecap="square" strokeLinejoin="miter" />
              </svg>
            )}
          </div>
        </div>
        {label && (
          <span
            className={`font-sans text-xs tracking-wide transition-colors ${
              checked ? 'text-white font-medium' : 'text-neutral-400 group-hover:text-white'
            }`}
          >
            {label}
          </span>
        )}
      </div>
      {typeof count === 'number' && (
        <span className="font-mono text-[10px] text-neutral-500 tracking-wider">
          ({count})
        </span>
      )}
    </label>
  );
};
