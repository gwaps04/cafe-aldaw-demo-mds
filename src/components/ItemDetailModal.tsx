import React from 'react';
import { MenuItem, ThemeMode } from '../types';
import { ImagePlaceholder } from './ImagePlaceholder';
import { MenuBadgeTag } from './MenuBadges';
import { ADDONS_DATA } from '../data/menu';
import { X, Sparkles, Coffee, Utensils } from 'lucide-react';

interface ItemDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  themeMode: ThemeMode;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  themeMode,
}) => {
  if (!isOpen || !item) return null;

  const isNight = themeMode === 'night';
  const isDrink =
    item.category === 'Nucturna (Coffee)' ||
    item.category === 'Luna Blanca & Milk Tea';
  const fallbackType = isDrink ? 'drink' : 'food';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-item-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div
        className={`relative z-10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border transition-all transform animate-in fade-in zoom-in-95 duration-200 ${
          isNight
            ? 'bg-[#1E231B] border-[#3E453A] text-[#F7F5F0]'
            : 'bg-[#F7F5F0] border-[#B89C82]/30 text-[#3E453A]'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Archway Image Container */}
        <div
          className="relative w-full overflow-hidden bg-[#EFECE4]"
          style={{ height: '240px' }}
        >
          <ImagePlaceholder
            assetKey={item.imageKey}
            alt={item.name}
            shape="rounded"
            fallbackType={fallbackType}
            label={item.name}
            containerClassName="w-full h-full rounded-none"
          />

          <div className="absolute top-4 left-4 flex flex-col gap-1 items-start">
            {item.badges &&
              item.badges.map((b) => <MenuBadgeTag key={b} badge={b} />)}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#B89C82] mb-1">
                {item.subcategory || item.category} • Cafe Aldaw
              </div>
              <h2
                id="modal-item-title"
                className="font-serif text-2xl sm:text-3xl font-bold"
              >
                {item.name}
              </h2>
            </div>

            {/* Price badge */}
            <div className="text-right shrink-0">
              {item.priceIce !== undefined ? (
                <div className="flex flex-col items-end">
                  <span className="font-serif text-xl font-bold text-[#7A8974]">
                    Hot ₱{item.price}
                  </span>
                  <span className="font-serif text-sm font-semibold text-[#B89C82]">
                    Ice ₱{item.priceIce}
                  </span>
                </div>
              ) : item.price22oz !== undefined ? (
                <div className="flex flex-col items-end">
                  <span className="font-serif text-xl font-bold text-[#7A8974]">
                    16oz ₱{item.price}
                  </span>
                  <span className="font-serif text-sm font-semibold text-[#B89C82]">
                    22oz ₱{item.price22oz}
                  </span>
                </div>
              ) : (
                <div className="font-serif text-2xl font-bold text-[#7A8974]">
                  ₱{item.price}
                </div>
              )}
            </div>
          </div>

          <p
            className={`text-sm sm:text-base leading-relaxed mb-6 ${
              isNight ? 'text-[#C5CBC1]' : 'text-[#5E6659]'
            }`}
          >
            {item.description}
          </p>

          {/* If drink, show add-ons quick hint */}
          {isDrink && (
            <div
              className={`p-3.5 rounded-2xl mb-6 border text-xs ${
                isNight
                  ? 'bg-[#2A3125] border-[#3E453A]/70 text-[#D0D4CE]'
                  : 'bg-[#EFECE4] border-[#B89C82]/20 text-[#5E6659]'
              }`}
            >
              <div className="font-semibold text-[#7A8974] mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Available Add-Ons:</span>
              </div>
              <div className="flex flex-wrap gap-2 text-[11px]">
                {ADDONS_DATA.map((ad) => (
                  <span
                    key={ad.name}
                    className="px-2 py-1 rounded-lg bg-black/5 dark:bg-white/5 font-medium"
                  >
                    {ad.name.split('(')[0].trim()} (+₱{ad.price})
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              type="button"
              className="flex-1 py-3 px-6 rounded-xl font-semibold text-xs uppercase tracking-wider bg-[#7A8974] text-[#F7F5F0] hover:bg-[#63715D] transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              {isDrink ? (
                <Coffee className="w-4 h-4" />
              ) : (
                <Utensils className="w-4 h-4" />
              )}
              <span>Order at Counter or Scan QR</span>
            </button>
            <button
              onClick={onClose}
              type="button"
              className={`py-3 px-5 rounded-xl font-semibold text-xs uppercase tracking-wider border transition-colors ${
                isNight
                  ? 'border-[#3E453A] text-[#F7F5F0] hover:bg-white/5'
                  : 'border-[#3E453A]/20 text-[#3E453A] hover:bg-black/5'
              }`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
