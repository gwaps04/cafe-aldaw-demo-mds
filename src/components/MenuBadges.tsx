import React from 'react';
import { MenuBadge } from '../types';

export const MenuBadgeTag: React.FC<{ badge: MenuBadge }> = ({ badge }) => {
  if (badge === 'best-seller') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#7A8974] text-[#F7F5F0] shadow-xs">
        <span aria-hidden="true">✦</span>
        <span>Best Seller</span>
      </span>
    );
  }
  if (badge === 'uniquely-ours') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#B89C82] text-[#F7F5F0] shadow-xs">
        <span aria-hidden="true">✶</span>
        <span>Uniquely Ours</span>
      </span>
    );
  }
  if (badge === 'premium') {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#A3866E] text-[#F7F5F0] shadow-xs">
        <span aria-hidden="true">✹</span>
        <span>Premium</span>
      </span>
    );
  }
  return null;
};

export const MenuLegend: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-medium py-3 px-6 rounded-full border mx-auto w-fit transition-colors ${
        isNight
          ? 'bg-[#1E231B] border-[#3E453A]/70 text-[#C5CBC1]'
          : 'bg-[#F7F5F0] border-[#B89C82]/30 text-[#5E6659]'
      }`}
    >
      <div className="flex items-center gap-1.5">
        <span className="text-[#7A8974] font-bold">✦</span>
        <span>Best Sellers</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[#B89C82] font-bold">✶</span>
        <span>Uniquely Ours</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-[#A3866E] font-bold">✹</span>
        <span>Premium</span>
      </div>
    </div>
  );
};
