import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'contrast';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center uppercase tracking-widest font-mono font-bold transition-all select-none rounded-none focus:outline-none';

  const sizeStyles = {
    sm: 'px-2.5 py-1 text-[11px] leading-4',
    md: 'px-4 py-2.5 text-xs tracking-wider',
    lg: 'px-6 py-3.5 text-sm tracking-widest'
  }[size];

  const variantStyles = {
    primary: 'bg-white text-black hover:bg-neutral-200 border border-white disabled:opacity-40 disabled:cursor-not-allowed',
    outline: 'bg-transparent text-white border border-neutral-700 hover:border-white hover:bg-neutral-900 disabled:opacity-40 disabled:cursor-not-allowed',
    contrast: 'bg-black text-white border border-white hover:bg-white hover:text-black shadow-[4px_4px_0px_0px_#ffffff]',
    ghost: 'bg-transparent text-neutral-400 hover:text-white underline-offset-4 hover:underline'
  }[variant];

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
