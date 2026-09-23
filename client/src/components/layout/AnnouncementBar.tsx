import React from 'react';

export interface AnnouncementBarProps {
  message?: string;
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({
  message = 'FREE STANDARD SHIPPING ON ORDERS OVER 2000 UAH'
}) => {
  return (
    <div className="bg-[#0e0e0e] text-white font-mono text-[10px] text-center py-2 px-4 sm:px-6 uppercase tracking-widest border-b border-neutral-800">
      {message}
    </div>
  );
};
