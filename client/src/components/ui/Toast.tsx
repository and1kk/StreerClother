import React, { useEffect } from 'react';
import { CheckCircleIcon } from './Icons';

export interface ToastProps {
  message: string | null;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({ message, onClose, duration = 2400 }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div
      role="alert"
      className="fixed bottom-6 right-6 z-50 bg-white text-black font-mono text-xs px-4 py-3 flex items-center gap-3 border border-neutral-700 shadow-[4px_4px_0px_0px_#ffffff] transition-all duration-300 animate-slide-up"
    >
      <CheckCircleIcon size={18} className="text-black flex-shrink-0" />
      <span className="font-bold tracking-wider uppercase">{message}</span>
    </div>
  );
};
