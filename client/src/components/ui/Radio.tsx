import React from 'react';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Radio: React.FC<RadioProps> = ({
  label,
  className = '',
  checked,
  onChange,
  id,
  name,
  value,
  ...props
}) => {
  const generatedId = id || (label ? `rad-${label.toLowerCase().replace(/[^a-z0-9]/g, '-')}` : undefined);

  return (
    <label
      htmlFor={generatedId}
      className={`flex items-center gap-3 cursor-pointer group select-none py-1.5 px-0.5 ${className}`}
    >
      <div className="relative flex items-center justify-center flex-shrink-0">
        <input
          id={generatedId}
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
          {...props}
        />
        {/* Custom brutalist square radio: strict square box with solid white activation fill */}
        <div
          className={`w-4 h-4 rounded-none border transition-all flex items-center justify-center ${
            checked
              ? 'bg-white border-white'
              : 'bg-[#1b1b1b] border-neutral-700 group-hover:border-neutral-400 group-hover:bg-[#262626]'
          }`}
        >
          {checked && (
            <div className="w-2 h-2 bg-black rounded-none" />
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
    </label>
  );
};
