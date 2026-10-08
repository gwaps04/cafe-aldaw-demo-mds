import React, { useState } from 'react';
import { MENU_ITEMS, ADDONS_DATA } from '../data/menu';
import { MenuItem, MenuCategory, ThemeMode } from '../types';
import { MenuBadgeTag, MenuLegend } from './MenuBadges';
import { X, Search, Sparkles, Plus, Coffee, Utensils } from 'lucide-react';

interface FullMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItem: (item: MenuItem) => void;
  themeMode: ThemeMode;
}

export const FullMenuModal: React.FC<FullMenuModalProps> = ({
  isOpen,
  onClose,
  onSelectItem,
  themeMode,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | 'All'>('All');

  if (!isOpen) return null;

  const isNight = themeMode === 'night';

  const categories: (MenuCategory | 'All')[] = [
    'All',
    'Nucturna (Coffee)',
    'Rice Up',
    'Al Dente',
    'Rice & Shine',
    'Luna Blanca & Milk Tea',
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.subcategory && item.subcategory.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="full-menu-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Main Modal Container */}
      <div
        className={`relative z-10 w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl overflow-hidden shadow-2xl border transition-all ${
          isNight
            ? 'bg-[#1A1F17] border-[#3E453A] text-[#F7F5F0]'
            : 'bg-[#FDFCF9] border-[#B89C82]/30 text-[#3E453A]'
        }`}
      >
        {/* Header Bar */}
        <div
          className={`p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 ${
            isNight
              ? 'bg-[#22281E] border-[#3E453A]/70'
              : 'bg-[#F7F5F0] border-[#B89C82]/20'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs uppercase font-bold tracking-widest text-[#7A8974]">
                Cafe Aldaw Digital Menu
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#B89C82]" />
              <span className="text-xs text-[#B89C82] font-semibold">
                Albay, Philippines
              </span>
            </div>
            <h2 id="full-menu-title" className="font-serif text-2xl sm:text-3xl font-bold">
              Complete Sanctuary Menu
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A8974]" />
              <input
                type="text"
                placeholder="Search dish or beverage..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-9 pr-4 py-2 text-xs rounded-full border outline-hidden transition-colors ${
                  isNight
                    ? 'bg-[#1E231B] border-[#3E453A] text-[#F7F5F0] placeholder:text-[#A8B0A5] focus:border-[#7A8974]'
                    : 'bg-white border-[#B89C82]/30 text-[#3E453A] placeholder:text-[#8C9388] focus:border-[#7A8974]'
                }`}
              />
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              type="button"
              className="p-2.5 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors shrink-0"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Filter Pills & Legend */}
        <div
          className={`px-6 py-3 border-b overflow-x-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0 ${
            isNight
              ? 'bg-[#1E231B] border-[#3E453A]/40'
              : 'bg-[#F2EFE8] border-[#B89C82]/15'
          }`}
        >
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-[#7A8974] text-[#F7F5F0] shadow-xs'
                      : isNight
                      ? 'bg-[#2A3125] text-[#C5CBC1] hover:text-[#F7F5F0]'
                      : 'bg-white/80 text-[#5E6659] hover:text-[#7A8974]'
                  }`}
                >
                  {cat === 'All' ? 'All Items' : cat.split(' ')[0]}
                </button>
              );
            })}
          </div>

          <MenuLegend isNight={isNight} />
        </div>

        {/* Scrollable Menu Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-8">
          {/* Add-ons / Upgrades Callout */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border transition-colors ${
              isNight
                ? 'bg-[#22281E] border-[#3E453A]/80'
                : 'bg-[#FAF7F2] border-[#B89C82]/30'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#B89C82]" />
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#7A8974]">
                Add-On's & Upgrades
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ADDONS_DATA.map((addon) => (
                <div
                  key={addon.name}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                    isNight
                      ? 'bg-[#1A1F17] border-[#3E453A]/50'
                      : 'bg-white border-[#B89C82]/20 shadow-2xs'
                  }`}
                >
                  <div className="flex items-center gap-1.5">
                    {addon.badge && (
                      <span className="text-[#7A8974] font-bold">✦</span>
                    )}
                    <span>{addon.name}</span>
                  </div>
                  <span className="font-serif font-bold text-[#7A8974]">
                    +₱{addon.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Menu Items Grid grouped or filtered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => {
              const hasHotIce = item.priceIce !== undefined;
              const hasSizes = item.price22oz !== undefined;

              return (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className={`group cursor-pointer p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between hover:-translate-y-0.5 ${
                    isNight
                      ? 'bg-[#20261C] border-[#3E453A]/60 hover:border-[#7A8974]/60 hover:bg-[#252C20]'
                      : 'bg-white border-[#B89C82]/20 hover:border-[#7A8974]/40 hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Header: Name and Badges */}
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-[10px] uppercase font-bold tracking-widest text-[#B89C82]">
                            {item.subcategory || item.category}
                          </span>
                          {item.badges &&
                            item.badges.map((b) => (
                              <MenuBadgeTag key={b} badge={b} />
                            ))}
                        </div>
                        <h4 className="font-serif text-base sm:text-lg font-bold group-hover:text-[#7A8974] transition-colors">
                          {item.name}
                        </h4>
                      </div>

                      {/* Pricing Tag */}
                      <div className="text-right shrink-0">
                        {hasHotIce ? (
                          <div className="flex flex-col items-end">
                            <span className="text-xs font-semibold text-[#7A8974]">
                              Hot: ₱{item.price}
                            </span>
                            <span className="text-xs font-semibold text-[#B89C82]">
                              Ice: ₱{item.priceIce}
                            </span>
                          </div>
                        ) : hasSizes ? (
                          <div className="flex flex-col items-end">
                            <span className="text-xs font-semibold text-[#7A8974]">
                              16oz: ₱{item.price}
                            </span>
                            <span className="text-xs font-semibold text-[#B89C82]">
                              22oz: ₱{item.price22oz}
                            </span>
                          </div>
                        ) : (
                          <span className="font-serif text-lg font-bold text-[#7A8974]">
                            ₱{item.price}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p
                      className={`text-xs leading-relaxed mb-3 ${
                        isNight ? 'text-[#B0B7AC]' : 'text-[#697264]'
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-[11px] text-[#B89C82]">
                    <span className="flex items-center gap-1">
                      {item.category.includes('Coffee') ? (
                        <Coffee className="w-3.5 h-3.5" />
                      ) : (
                        <Utensils className="w-3.5 h-3.5" />
                      )}
                      <span>{item.category}</span>
                    </span>
                    <span className="font-semibold text-[#7A8974] group-hover:underline flex items-center gap-1">
                      <Plus className="w-3 h-3" /> View Detail
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="font-serif text-lg mb-2">No menu items match your search.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="text-xs text-[#7A8974] underline font-semibold"
              >
                Reset search & filters
              </button>
            </div>
          )}
        </div>

        {/* Modal Bottom Bar */}
        <div
          className={`p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0 ${
            isNight
              ? 'bg-[#22281E] border-[#3E453A]/70 text-[#A8B0A5]'
              : 'bg-[#F7F5F0] border-[#B89C82]/20 text-[#6E7569]'
          }`}
        >
          <div className="italic">
            "Served over warm rice or brewed fresh upon order at both Camalig & Legazpi branches."
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-full sm:w-auto px-6 py-2 rounded-full font-semibold bg-[#7A8974] text-[#F7F5F0] hover:bg-[#63715D] transition-colors"
          >
            Close Menu
          </button>
        </div>
      </div>
    </div>
  );
};
