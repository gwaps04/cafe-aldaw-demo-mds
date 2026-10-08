import React, { useState } from 'react';
import { MENU_ITEMS } from '../data/menu';
import { MenuCategory, MenuItem, ThemeMode } from '../types';
import { ImagePlaceholder } from './ImagePlaceholder';
import { Utensils, Coffee, Croissant, Sparkles, Plus, ArrowUpRight } from 'lucide-react';

interface MenuPeekSectionProps {
  themeMode: ThemeMode;
  onSelectItem: (item: MenuItem) => void;
}

export const MenuPeekSection: React.FC<MenuPeekSectionProps> = ({
  themeMode,
  onSelectItem,
}) => {
  const [activeTab, setActiveTab] = useState<MenuCategory>('Drinks');
  const isNight = themeMode === 'night';

  const categories: { key: MenuCategory; label: string; icon: React.ReactNode }[] = [
    { key: 'Drinks', label: 'Artisan Drinks', icon: <Coffee className="w-4 h-4" /> },
    { key: 'Food', label: 'Comfort Food', icon: <Utensils className="w-4 h-4" /> },
    { key: 'Pastries', label: 'Daily Pastries', icon: <Croissant className="w-4 h-4" /> },
  ];

  // Filter items matching active tab (take first 3)
  const currentItems = MENU_ITEMS.filter((item) => item.category === activeTab).slice(0, 3);

  return (
    <section
      id="menu-peek"
      className={`py-16 md:py-24 transition-colors duration-500 ${
        isNight ? 'bg-[#23291F] text-[#F7F5F0]' : 'bg-[#FAF9F5] text-[#3E453A]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 border ${
              isNight
                ? 'bg-[#2A3125] text-[#EED5B7] border-[#B89C82]/30'
                : 'bg-[#EFECE4] text-[#7A8974] border-[#7A8974]/20'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Offerings</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            The Menu Peek
          </h2>
          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isNight ? 'text-[#C5CBC1]' : 'text-[#5E6659]'
            }`}
          >
            Handcrafted beverages and slow-cooked culinary staples rooted in Bicol
            ingredients and Middle Eastern spices. Toggle below for a taste.
          </p>
        </div>

        {/* Interactive Tabs */}
        <div className="flex justify-center mb-12">
          <div
            className={`inline-flex p-1.5 rounded-full border shadow-xs transition-colors ${
              isNight
                ? 'bg-[#1E231B] border-[#3E453A]/60'
                : 'bg-[#EFECE4] border-[#B89C82]/30'
            }`}
            role="tablist"
            aria-label="Menu categories"
          >
            {categories.map((cat) => {
              const isActive = activeTab === cat.key;
              return (
                <button
                  key={cat.key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(cat.key)}
                  className={`flex items-center gap-2 px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-[#7A8974] text-[#F7F5F0] shadow-md transform scale-102'
                      : isNight
                      ? 'text-[#C5CBC1] hover:text-[#F7F5F0] hover:bg-white/5'
                      : 'text-[#3E453A] hover:text-[#7A8974] hover:bg-black/5'
                  }`}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3 Arch-Shaped Product Placeholder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {currentItems.map((item) => {
            const fallbackType =
              activeTab === 'Drinks' ? 'drink' : activeTab === 'Pastries' ? 'pastry' : 'food';

            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                className={`group cursor-pointer flex flex-col rounded-3xl p-4 sm:p-5 transition-all duration-500 border ${
                  isNight
                    ? 'bg-[#1E231B] border-[#3E453A]/50 hover:border-[#B89C82]/50 hover:shadow-2xl'
                    : 'bg-[#F7F5F0] border-[#B89C82]/25 hover:border-[#7A8974]/50 hover:shadow-xl'
                } hover:-translate-y-1.5`}
              >
                {/* Arch-shaped top container with placeholder image slot */}
                <div
                  className="relative w-full overflow-hidden rounded-t-[100px] rounded-b-2xl mb-5 bg-[#EFECE4] shadow-inner transition-transform duration-500 group-hover:scale-101"
                  style={{ height: '240px' }}
                >
                  <ImagePlaceholder
                    assetKey={item.imageKey}
                    alt={item.name}
                    shape="arch"
                    fallbackType={fallbackType}
                    label={item.name}
                    containerClassName="w-full h-full"
                  />

                  {/* Badge */}
                  {item.tag && (
                    <div className="absolute top-4 right-4 bg-[#7A8974] text-[#F7F5F0] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      {item.tag}
                    </div>
                  )}

                  {/* Quick Expand Button Hover */}
                  <div className="absolute inset-0 bg-[#3E453A]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-[#F7F5F0] text-[#3E453A] rounded-full p-2.5 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                      <ArrowUpRight className="w-5 h-5 text-[#7A8974]" />
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-serif text-lg sm:text-xl font-bold group-hover:text-[#7A8974] transition-colors">
                      {item.name}
                    </h3>
                    <span className="font-serif text-base sm:text-lg font-bold text-[#7A8974] shrink-0">
                      ₱{item.price}
                    </span>
                  </div>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2 flex-grow ${
                      isNight ? 'text-[#B0B7AC]' : 'text-[#5E6659]'
                    }`}
                  >
                    {item.description}
                  </p>

                  <div className="pt-3 border-t border-black/5 flex items-center justify-between text-xs font-semibold">
                    <span className="text-[#B89C82] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      {activeTab}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform ${
                        isNight ? 'text-[#EED5B7]' : 'text-[#7A8974]'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" /> Quick View
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note on image customization */}
        <div className="mt-12 text-center">
          <p
            className={`text-xs italic ${
              isNight ? 'text-[#8E968B]' : 'text-[#8C9388]'
            }`}
          >
            Tip: Image placeholders can be updated directly in{' '}
            <code className="px-1.5 py-0.5 rounded bg-black/10 font-mono text-[11px]">
              src/data/assets.ts
            </code>
          </p>
        </div>
      </div>
    </section>
  );
};
