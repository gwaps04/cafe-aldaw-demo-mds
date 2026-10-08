import React from 'react';
import { MenuItem, ThemeMode } from '../types';
import { ImagePlaceholder } from './ImagePlaceholder';
import { X, Sparkles, Coffee } from 'lucide-react';

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
  const fallbackType =
    item.category === 'Drinks' ? 'drink' : item.category === 'Pastries' ? 'pastry' : 'food';

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
          style={{ height: '260px' }}
        >
          <ImagePlaceholder
            assetKey={item.imageKey}
            alt={item.name}
            shape="rounded"
            fallbackType={fallbackType}
            label={item.name}
            containerClassName="w-full h-full rounded-none"
          />

          {item.tag && (
            <div className="absolute top-4 left-4 bg-[#7A8974] text-[#F7F5F0] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
              {item.tag}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#B89C82] mb-1">
                {item.category} • Cafe Aldaw Recipe
              </div>
              <h2 id="modal-item-title" className="font-serif text-2xl sm:text-3xl font-bold">
                {item.name}
              </h2>
            </div>
            <div className="font-serif text-2xl font-bold text-[#7A8974] shrink-0">
              ₱{item.price}
            </div>
          </div>

          <p
            className={`text-sm sm:text-base leading-relaxed mb-6 ${
              isNight ? 'text-[#C5CBC1]' : 'text-[#5E6659]'
            }`}
          >
            {item.description}
          </p>

          <div
            className={`p-4 rounded-2xl mb-6 flex items-start gap-3 border ${
              isNight
                ? 'bg-[#2A3125] border-[#3E453A]/70 text-[#D0D4CE]'
                : 'bg-[#EFECE4] border-[#B89C82]/20 text-[#5E6659]'
            }`}
          >
            <Sparkles className="w-5 h-5 text-[#B89C82] shrink-0 mt-0.5" />
            <div className="text-xs leading-relaxed">
              <span className="font-semibold text-[#3E453A] block dark:text-[#F7F5F0] mb-0.5">
                Freshly Prepared Upon Order
              </span>
              Handcrafted in small batches daily to preserve the full aromatic profile.
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              type="button"
              className="flex-1 py-3 px-6 rounded-xl font-semibold text-xs uppercase tracking-wider bg-[#7A8974] text-[#F7F5F0] hover:bg-[#63715D] transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              <Coffee className="w-4 h-4" />
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
