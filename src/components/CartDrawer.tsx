import React from 'react';
import { CartItem, ThemeMode } from '../types';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemIndex: number, delta: number) => void;
  onRemoveItem: (itemIndex: number) => void;
  onProceedToCheckout: () => void;
  themeMode: ThemeMode;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  themeMode,
}) => {
  if (!isOpen) return null;

  const isNight = themeMode === 'night';
  const totalItems = cart.reduce((acc, it) => acc + it.quantity, 0);
  const subtotal = cart.reduce((acc, it) => acc + it.unitPrice * it.quantity, 0);
  const freeDeliveryThreshold = 600;
  const isFreeDelivery = subtotal >= freeDeliveryThreshold;
  const deliveryFee = isFreeDelivery ? 0 : 45;
  const total = subtotal + deliveryFee;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className={`w-screen max-w-md shadow-2xl flex flex-col border-l transition-transform transform duration-300 animate-in slide-in-from-right ${
            isNight
              ? 'bg-[#1D221A] border-[#3E453A] text-[#F7F5F0]'
              : 'bg-[#FDFCF9] border-[#B89C82]/30 text-[#3E453A]'
          }`}
        >
          {/* Header */}
          <div
            className={`p-6 border-b flex items-center justify-between ${
              isNight ? 'bg-[#242A20] border-[#3E453A]/70' : 'bg-[#F7F5F0] border-[#B89C82]/20'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#7A8974]/15 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-[#7A8974]" />
              </div>
              <div>
                <h2 id="cart-drawer-title" className="font-serif text-lg font-bold">
                  Your Order Tray
                </h2>
                <span className="text-[10px] text-[#B89C82] font-semibold uppercase tracking-wider block">
                  {totalItems} {totalItems === 1 ? 'Item' : 'Items'} Selected
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              type="button"
              className="p-2 rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 transition-colors"
              aria-label="Close cart tray"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-[#8E968B]">
                <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mb-3">
                  <ShoppingBag className="w-8 h-8 text-[#B89C82]" />
                </div>
                <h3 className="font-serif text-lg font-bold mb-1 text-[#3E453A] dark:text-[#F7F5F0]">
                  Your Tray is Empty
                </h3>
                <p className="text-xs leading-relaxed max-w-xs mb-6">
                  Browse our authentic dishes, rice bowls, craft coffee, or pasta and tap "+ Add to
                  Order".
                </p>
                <button
                  onClick={onClose}
                  type="button"
                  className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#7A8974] text-[#F7F5F0] hover:bg-[#63715D] transition-colors"
                >
                  Explore Menu
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Free Delivery Bar */}
                <div
                  className={`p-3 rounded-2xl text-xs border ${
                    isFreeDelivery
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200'
                      : 'bg-[#FAF6F0] dark:bg-[#252C21] border-[#B89C82]/30 text-[#6B7266] dark:text-[#C5CBC1]'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-semibold mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#B89C82]" />
                    <span>
                      {isFreeDelivery
                        ? '🎉 You unlocked FREE Courtyard Delivery!'
                        : `Add ₱${freeDeliveryThreshold - subtotal} more for Free Delivery`}
                    </span>
                  </div>
                  <div className="w-full bg-black/10 dark:bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#7A8974] h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (subtotal / freeDeliveryThreshold) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Items loop */}
                {cart.map((cartItem, idx) => (
                  <div
                    key={`${cartItem.item.id}-${cartItem.selectedOption}-${idx}`}
                    className={`p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${
                      isNight
                        ? 'bg-[#23291F] border-[#3E453A]/60'
                        : 'bg-white border-[#B89C82]/20 shadow-2xs'
                    }`}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#B89C82]">
                          {cartItem.item.subcategory || cartItem.item.category}
                        </span>
                        {cartItem.selectedOption && (
                          <span className="text-[9px] uppercase px-2 py-0.5 rounded-full bg-[#7A8974]/15 text-[#7A8974] font-bold">
                            {cartItem.selectedOption}
                          </span>
                        )}
                      </div>

                      <h4 className="font-serif text-sm font-bold leading-snug">
                        {cartItem.item.name}
                      </h4>

                      <div className="font-serif font-bold text-sm text-[#7A8974] mt-1">
                        ₱{cartItem.unitPrice * cartItem.quantity}
                        {cartItem.quantity > 1 && (
                          <span className="text-[10px] text-[#8E968B] font-normal ml-1">
                            (₱{cartItem.unitPrice} ea)
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <button
                        onClick={() => onRemoveItem(idx)}
                        type="button"
                        className="text-black/30 hover:text-red-500 dark:text-white/30 dark:hover:text-red-400 p-1 transition-colors"
                        title="Remove item"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                      <div className="flex items-center gap-2 border rounded-full px-2 py-1 bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-xs">
                        <button
                          onClick={() => onUpdateQuantity(idx, -1)}
                          type="button"
                          className="hover:text-[#7A8974] transition-colors p-0.5"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold min-w-[14px] text-center">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, 1)}
                          type="button"
                          className="hover:text-[#7A8974] transition-colors p-0.5"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Checkout Action */}
          {cart.length > 0 && (
            <div
              className={`p-6 border-t space-y-4 ${
                isNight
                  ? 'bg-[#242A20] border-[#3E453A]/70'
                  : 'bg-[#F7F5F0] border-[#B89C82]/20'
              }`}
            >
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#6B7266] dark:text-[#A8B0A5]">
                  <span>Subtotal</span>
                  <span className="font-mono font-medium">₱{subtotal}</span>
                </div>
                <div className="flex justify-between text-[#6B7266] dark:text-[#A8B0A5]">
                  <span>Courtyard Delivery Fee</span>
                  <span className="font-mono font-medium">
                    {deliveryFee === 0 ? 'FREE' : `₱${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold pt-2 border-t border-black/10 dark:border-white/10">
                  <span>Total</span>
                  <span className="text-[#7A8974]">₱{total}</span>
                </div>
              </div>

              <button
                onClick={onProceedToCheckout}
                type="button"
                className="w-full py-4 rounded-full font-bold text-xs uppercase tracking-wider bg-[#7A8974] text-[#F7F5F0] hover:bg-[#63715D] transition-all shadow-md hover:scale-102 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
