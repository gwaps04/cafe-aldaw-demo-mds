import React from 'react';
import { CafeUpgrade } from './types';
import { X, Check, ShoppingBag } from 'lucide-react';

interface UpgradesShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  upgrades: CafeUpgrade[];
  score: number;
  onBuyUpgrade: (upgradeId: string) => void;
}

export const UpgradesShopModal: React.FC<UpgradesShopModalProps> = ({
  isOpen,
  onClose,
  upgrades,
  score,
  onBuyUpgrade,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg bg-[#FDFCF9] rounded-3xl overflow-hidden shadow-2xl border border-[#B89C82]/30 text-[#3E453A] p-6 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#B89C82]/20 pb-4 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#B89C82]/20 flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-[#B89C82]" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#B89C82] block">
                Courtyard Perks & Gear
              </span>
              <h3 className="font-serif text-xl font-bold">Cozy Cafe Upgrades</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="p-2 rounded-full bg-black/5 hover:bg-black/10 transition-colors"
            aria-label="Close upgrades shop"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Balance Bar */}
        <div className="p-3.5 rounded-2xl bg-[#7A8974]/15 border border-[#7A8974]/30 flex items-center justify-between text-xs mb-4">
          <span className="font-semibold text-[#5E6659]">Your Current Earnings:</span>
          <span className="font-serif font-bold text-lg text-[#7A8974]">₱{score}</span>
        </div>

        {/* Upgrades List */}
        <div className="space-y-3 mb-4">
          {upgrades.map((item) => {
            const canAfford = score >= item.cost;

            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  item.unlocked
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-white border-[#B89C82]/20 shadow-2xs'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#2F362A]">{item.name}</h4>
                    <p className="text-xs text-[#5E6659] leading-snug mt-0.5">{item.desc}</p>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  {item.unlocked ? (
                    <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-700 text-xs font-bold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Unlocked
                    </span>
                  ) : (
                    <button
                      onClick={() => onBuyUpgrade(item.id)}
                      disabled={!canAfford}
                      type="button"
                      className={`px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all ${
                        canAfford
                          ? 'bg-[#7A8974] text-white hover:bg-[#63715D] shadow-sm hover:scale-102 active:scale-95'
                          : 'bg-black/10 text-[#8C9388] cursor-not-allowed'
                      }`}
                    >
                      Buy ₱{item.cost}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="w-full py-2.5 rounded-full font-bold text-xs uppercase tracking-wider border border-black/10 hover:bg-black/5 transition-colors"
        >
          Close Shop
        </button>
      </div>
    </div>
  );
};
