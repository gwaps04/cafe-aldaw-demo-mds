import React, { useState } from 'react';
import { MENU_ITEMS, CATEGORY_DETAILS } from '../data/menu';
import { MenuCategory, MenuItem, ThemeMode } from '../types';
import { ImagePlaceholder } from './ImagePlaceholder';
import { MenuBadgeTag, MenuLegend } from './MenuBadges';
import {
  Coffee,
  Utensils,
  Sun,
  Sparkles,
  ArrowUpRight,
  BookOpen,
  Eye,
  Plus,
} from 'lucide-react';

interface MenuPeekSectionProps {
  themeMode: ThemeMode;
  onSelectItem: (item: MenuItem) => void;
  onOpenFullMenu: () => void;
  onAddToCart?: (item: MenuItem) => void;
}

export const MenuPeekSection: React.FC<MenuPeekSectionProps> = ({
  themeMode,
  onSelectItem,
  onOpenFullMenu,
  onAddToCart,
}) => {
  const [activeTab, setActiveTab] = useState<MenuCategory>('Nucturna (Coffee)');
  const isNight = themeMode === 'night';

  const categories: { key: MenuCategory; label: string; icon: React.ReactNode }[] = [
    {
      key: 'Nucturna (Coffee)',
      label: 'Nucturna Coffee',
      icon: <Coffee className="w-4 h-4" />,
    },
    {
      key: 'Rice Up',
      label: 'Rice Up Entrées',
      icon: <Utensils className="w-4 h-4" />,
    },
    {
      key: 'Al Dente',
      label: 'Al Dente Pastas',
      icon: <Sparkles className="w-4 h-4" />,
    },
    {
      key: 'Rice & Shine',
      label: 'Rice & Shine (Silogs)',
      icon: <Sun className="w-4 h-4" />,
    },
    {
      key: 'Luna Blanca & Milk Tea',
      label: 'Luna Blanca & Tea',
      icon: <Sparkles className="w-4 h-4" />,
    },
  ];

  // Pick top spotlight items (prioritizing popular/best-sellers first, then taking 3)
  const categoryItems = MENU_ITEMS.filter((item) => item.category === activeTab);
  const spotlightItems = [...categoryItems]
    .sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0))
    .slice(0, 3);

  const currentMeta = CATEGORY_DETAILS[activeTab];

  return (
    <section
      id="menu-peek"
      className={`py-16 md:py-24 transition-colors duration-500 ${
        isNight ? 'bg-[#23291F] text-[#F7F5F0]' : 'bg-[#FAF9F5] text-[#3E453A]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-3 border ${
              isNight
                ? 'bg-[#2A3125] text-[#EED5B7] border-[#B89C82]/30'
                : 'bg-[#EFECE4] text-[#7A8974] border-[#7A8974]/20'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Tailored to Cafe Aldaw's Authentic Menu</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
            The Menu Peek
          </h2>

          <p
            className={`text-sm sm:text-base leading-relaxed ${
              isNight ? 'text-[#C5CBC1]' : 'text-[#5E6659]'
            }`}
          >
            Explore our signature Filipino comforts, Bicol specials like Pinangat
            Curry and Kandingga, alongside craft Nucturna espresso and Luna Blanca lattes.
          </p>
        </div>

        {/* Legend for Best Sellers, Uniquely Ours, Premium */}
        <div className="mb-8">
          <MenuLegend isNight={isNight} />
        </div>

        {/* Interactive Category Tabs */}
        <div className="flex justify-center mb-8 overflow-x-auto pb-2">
          <div
            className={`inline-flex p-1.5 rounded-full border shadow-xs transition-colors overflow-x-auto ${
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
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
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

        {/* Category Header Banner with Quote from Menu Card */}
        {currentMeta && (
          <div
            className={`max-w-2xl mx-auto text-center p-4 rounded-2xl mb-10 border transition-colors ${
              isNight
                ? 'bg-[#1E231B]/80 border-[#3E453A]/40 text-[#D0D4CE]'
                : 'bg-[#F2ECE3]/80 border-[#B89C82]/25 text-[#5E6659]'
            }`}
          >
            <div className="font-serif text-lg font-bold text-[#7A8974] tracking-wide mb-1">
              {currentMeta.title} • {currentMeta.subtitle}
            </div>
            {currentMeta.quote && (
              <p className="text-xs sm:text-sm italic font-normal">
                "{currentMeta.quote}"
              </p>
            )}
          </div>
        )}

        {/* 3 Arch-Shaped Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mb-12">
          {spotlightItems.map((item) => {
            const isDrink =
              item.category === 'Nucturna (Coffee)' ||
              item.category === 'Luna Blanca & Milk Tea';
            const fallbackType = isDrink ? 'drink' : 'food';

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
                {/* Arch-shaped Top Container */}
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

                  {/* Badges on Arch Container */}
                  <div className="absolute top-4 right-4 flex flex-col gap-1 items-end">
                    {item.badges &&
                      item.badges.map((b) => (
                        <MenuBadgeTag key={b} badge={b} />
                      ))}
                  </div>

                  {/* Permanent High-Visibility Bottom Overlay (Always visible on mobile & desktop) */}
                  <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/90 via-black/50 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-0" />

                  {/* Always-Visible Bottom Info Chip */}
                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-between pointer-events-none z-10 transition-all duration-300 group-hover:opacity-0">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/25 text-[#F7F5F0] text-xs font-semibold shadow-lg">
                      <Eye className="w-3.5 h-3.5 text-[#EED5B7]" />
                      <span>View & Order</span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#7A8974] text-white text-xs font-bold font-serif shadow-md border border-white/20">
                      ₱{item.price}
                    </span>
                  </div>

                  {/* Deep High-Contrast Full Hover Overlay */}
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-4 text-center z-20">
                    <div className="bg-[#F7F5F0] text-[#242A20] px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-bold uppercase tracking-wider transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 border-2 border-white ring-4 ring-[#7A8974]/40">
                      <Eye className="w-4 h-4 text-[#7A8974]" />
                      <span>View & Order</span>
                    </div>
                    <div className="bg-[#7A8974] text-[#F7F5F0] px-3.5 py-1.5 rounded-full text-xs font-semibold mt-3 shadow-md flex items-center gap-1.5 border border-white/20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                      <Sparkles className="w-3.5 h-3.5 text-[#EED5B7]" />
                      <span>₱{item.price} • Tap for Details</span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-col flex-grow">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-widest text-[#B89C82] block mb-0.5">
                        {item.subcategory}
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-bold group-hover:text-[#7A8974] transition-colors">
                        {item.name}
                      </h3>
                    </div>

                    {/* Price display */}
                    <div className="text-right shrink-0">
                      {item.priceIce !== undefined ? (
                        <div className="flex flex-col items-end">
                          <span className="font-serif text-base font-bold text-[#7A8974]">
                            Hot ₱{item.price}
                          </span>
                          <span className="font-serif text-xs font-semibold text-[#B89C82]">
                            Ice ₱{item.priceIce}
                          </span>
                        </div>
                      ) : item.price22oz !== undefined ? (
                        <div className="flex flex-col items-end">
                          <span className="font-serif text-base font-bold text-[#7A8974]">
                            16oz ₱{item.price}
                          </span>
                          <span className="font-serif text-xs font-semibold text-[#B89C82]">
                            22oz ₱{item.price22oz}
                          </span>
                        </div>
                      ) : (
                        <span className="font-serif text-lg sm:text-xl font-bold text-[#7A8974]">
                          ₱{item.price}
                        </span>
                      )}
                    </div>
                  </div>

                  <p
                    className={`text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2 flex-grow ${
                      isNight ? 'text-[#B0B7AC]' : 'text-[#5E6659]'
                    }`}
                  >
                    {item.description}
                  </p>

                  <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs font-semibold gap-2">
                    <span className="text-[#B89C82] flex items-center gap-1 truncate">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{item.subcategory || activeTab}</span>
                    </span>

                    <div className="flex items-center gap-2 shrink-0">
                      {onAddToCart && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(item);
                          }}
                          type="button"
                          className="px-3 py-1.5 rounded-full bg-[#7A8974]/15 hover:bg-[#7A8974] text-[#7A8974] hover:text-[#F7F5F0] transition-colors flex items-center gap-1 text-[11px] font-bold"
                          title="Add directly to order tray"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Add</span>
                        </button>
                      )}
                      <span
                        className={`inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform ${
                          isNight ? 'text-[#EED5B7]' : 'text-[#7A8974]'
                        }`}
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View Full Menu CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <button
            onClick={onOpenFullMenu}
            type="button"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full text-sm font-semibold tracking-wide bg-[#7A8974] text-[#F7F5F0] hover:bg-[#63715D] shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>Browse Full Digital Menu ({MENU_ITEMS.length} Items)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
