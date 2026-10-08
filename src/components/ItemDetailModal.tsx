import React, { useState, useEffect } from 'react';
import { MenuItem, ThemeMode } from '../types';
import { ImagePlaceholder } from './ImagePlaceholder';
import { MenuBadgeTag } from './MenuBadges';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

interface ItemDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem, quantity: number, option?: 'hot' | 'ice' | '16oz' | '22oz', unitPrice?: number) => void;
  onQuickCheckout?: (item: MenuItem, quantity: number, option?: 'hot' | 'ice' | '16oz' | '22oz', unitPrice?: number) => void;
  themeMode: ThemeMode;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  isOpen,
  onClose,
  onAddToCart,
  onQuickCheckout,
  themeMode,
}) => {
  const isNight = themeMode === 'night';

  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState<'hot' | 'ice' | '16oz' | '22oz' | undefined>(undefined);

  // Initialize options when modal opens or item changes
  useEffect(() => {
    if (item) {
      setQuantity(1);
      if (item.priceIce !== undefined) {
        setSelectedOption('hot');
      } else if (item.price22oz !== undefined) {
        setSelectedOption('16oz');
      } else {
        setSelectedOption(undefined);
      }
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const isDrink =
    item.category === 'Nucturna (Coffee)' ||
    item.category === 'Luna Blanca & Milk Tea';
  const fallbackType = isDrink ? 'drink' : 'food';

  // Calculate current unit price based on selected option
  let currentUnitPrice = item.price;
  if (selectedOption === 'ice' && item.priceIce !== undefined) {
    currentUnitPrice = item.priceIce;
  } else if (selectedOption === '22oz' && item.price22oz !== undefined) {
    currentUnitPrice = item.price22oz;
  }

  const totalPrice = currentUnitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(item, quantity, selectedOption, currentUnitPrice);
    onClose();
  };

  const handleCheckoutNow = () => {
    if (onQuickCheckout) {
      onQuickCheckout(item, quantity, selectedOption, currentUnitPrice);
    } else {
      onAddToCart(item, quantity, selectedOption, currentUnitPrice);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-item-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog Card */}
      <div
        className={`relative z-10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border transition-all transform animate-in fade-in zoom-in-95 duration-200 ${
          isNight
            ? 'bg-[#1E231B] border-[#3E453A] text-[#F7F5F0]'
            : 'bg-[#FDFCF9] border-[#B89C82]/30 text-[#3E453A]'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors shadow-md"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Archway Image Container */}
        <div
          className="relative w-full overflow-hidden bg-[#EFECE4]"
          style={{ height: '230px' }}
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
        <div className="p-6 sm:p-7">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#B89C82] mb-0.5">
                {item.subcategory || item.category} • Cafe Aldaw
              </div>
              <h2
                id="modal-item-title"
                className="font-serif text-2xl sm:text-3xl font-bold leading-tight"
              >
                {item.name}
              </h2>
            </div>

            {/* Price badge */}
            <div className="text-right shrink-0">
              <div className="font-serif text-2xl font-bold text-[#7A8974]">
                ₱{currentUnitPrice}
              </div>
              {quantity > 1 && (
                <div className="text-xs font-semibold text-[#B89C82]">
                  Total: ₱{totalPrice}
                </div>
              )}
            </div>
          </div>

          <p
            className={`text-xs sm:text-sm leading-relaxed mb-5 ${
              isNight ? 'text-[#C5CBC1]' : 'text-[#5E6659]'
            }`}
          >
            {item.description}
          </p>

          {/* Option Selector (Hot/Ice or 16oz/22oz) */}
          {item.priceIce !== undefined && (
            <div className="mb-4">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8C9388] block mb-1.5">
                Select Temperature:
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedOption('hot')}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    selectedOption === 'hot'
                      ? 'bg-[#7A8974] text-white border-[#7A8974] shadow-xs'
                      : isNight
                      ? 'bg-[#252C20] border-[#3E453A] text-[#C5CBC1]'
                      : 'bg-white border-[#B89C82]/30 text-[#3E453A]'
                  }`}
                >
                  Hot (₱{item.price})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedOption('ice')}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    selectedOption === 'ice'
                      ? 'bg-[#7A8974] text-white border-[#7A8974] shadow-xs'
                      : isNight
                      ? 'bg-[#252C20] border-[#3E453A] text-[#C5CBC1]'
                      : 'bg-white border-[#B89C82]/30 text-[#3E453A]'
                  }`}
                >
                  Ice (₱{item.priceIce})
                </button>
              </div>
            </div>
          )}

          {item.price22oz !== undefined && (
            <div className="mb-4">
              <label className="text-xs font-bold uppercase tracking-wider text-[#8C9388] block mb-1.5">
                Select Cup Size:
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedOption('16oz')}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    selectedOption === '16oz'
                      ? 'bg-[#7A8974] text-white border-[#7A8974] shadow-xs'
                      : isNight
                      ? 'bg-[#252C20] border-[#3E453A] text-[#C5CBC1]'
                      : 'bg-white border-[#B89C82]/30 text-[#3E453A]'
                  }`}
                >
                  16oz (₱{item.price})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedOption('22oz')}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    selectedOption === '22oz'
                      ? 'bg-[#7A8974] text-white border-[#7A8974] shadow-xs'
                      : isNight
                      ? 'bg-[#252C20] border-[#3E453A] text-[#C5CBC1]'
                      : 'bg-white border-[#B89C82]/30 text-[#3E453A]'
                  }`}
                >
                  22oz (₱{item.price22oz})
                </button>
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center justify-between mb-5 p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <span className="text-xs font-semibold">Quantity</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-full bg-white dark:bg-[#252C20] border border-black/10 dark:border-white/10 flex items-center justify-center hover:scale-105 transition-transform"
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="font-serif font-bold text-base min-w-[20px] text-center">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-full bg-white dark:bg-[#252C20] border border-black/10 dark:border-white/10 flex items-center justify-center hover:scale-105 transition-transform"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Action buttons: Add to Tray + Quick Checkout */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleAdd}
              type="button"
              className="w-full sm:flex-1 py-3 px-5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#7A8974] text-[#F7F5F0] hover:bg-[#63715D] transition-all shadow-md hover:scale-102 flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Tray (₱{totalPrice})</span>
            </button>

            <button
              onClick={handleCheckoutNow}
              type="button"
              className={`w-full sm:w-auto py-3 px-5 rounded-xl font-semibold text-xs uppercase tracking-wider border transition-colors flex items-center justify-center gap-1.5 ${
                isNight
                  ? 'border-[#B89C82]/50 text-[#EED5B7] hover:bg-white/5'
                  : 'border-[#7A8974]/40 text-[#7A8974] hover:bg-[#7A8974]/10'
              }`}
            >
              <span>Quick Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
