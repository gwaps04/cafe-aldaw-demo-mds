import React from 'react';
import { ArrowLeft, Volume2, VolumeX, BookOpen, ShoppingBag, Heart } from 'lucide-react';

interface CozyCafeHeaderProps {
  score: number;
  ordersServed: number;
  lives: number;
  dayTime: 'Sunrise (Aldaw)' | 'Golden Hour' | 'Sunset Courtyard';
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenRecipeBook: () => void;
  onOpenUpgrades: () => void;
  onBackToHome: () => void;
}

export const CozyCafeHeader: React.FC<CozyCafeHeaderProps> = ({
  score,
  ordersServed,
  lives,
  dayTime,
  soundEnabled,
  onToggleSound,
  onOpenRecipeBook,
  onOpenUpgrades,
  onBackToHome,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#EFECE4]/95 backdrop-blur-md border-b border-[#B89C82]/30 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
      {/* Left: Back button & Brand */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBackToHome}
          type="button"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-[#B89C82]/30 bg-white/70 hover:bg-white text-xs font-semibold text-[#3E453A] transition-all hover:scale-105"
          title="Return to Cafe Aldaw Homepage"
        >
          <ArrowLeft className="w-4 h-4 text-[#7A8974]" />
          <span className="hidden sm:inline">Back to Sanctuary</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="font-serif font-bold text-base sm:text-lg tracking-tight text-[#3E453A]">
            Cafe Aldaw
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-[#7A8974] text-white text-[10px] font-bold uppercase tracking-wider">
            ☀️ Cozy Sun Barista
          </span>
        </div>
      </div>

      {/* Center: Live Stats Dashboard */}
      <div className="flex items-center gap-4 sm:gap-6 text-xs">
        {/* Earnings */}
        <div className="flex items-center gap-1.5">
          <span className="w-6 h-6 rounded-full bg-[#7A8974]/20 text-[#7A8974] font-bold flex items-center justify-center font-serif text-xs">
            ₱
          </span>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#B89C82] block leading-none">
              Earnings
            </span>
            <span className="font-serif font-bold text-sm text-[#2F362A]">₱{score}</span>
          </div>
        </div>

        {/* Orders Served */}
        <div className="flex items-center gap-1.5">
          <span className="text-base">☕</span>
          <div>
            <span className="text-[10px] uppercase font-bold text-[#B89C82] block leading-none">
              Served
            </span>
            <span className="font-serif font-bold text-sm text-[#2F362A]">{ordersServed}</span>
          </div>
        </div>

        {/* Lives / Satisfaction */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 3 }).map((_, i) => (
            <Heart
              key={i}
              className={`w-4 h-4 ${
                i < lives ? 'text-red-500 fill-red-500' : 'text-black/20 dark:text-white/20'
              }`}
            />
          ))}
        </div>

        {/* Time of Day Sun Badge */}
        <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-900 text-xs font-semibold">
          <span>☀️</span>
          <span>{dayTime}</span>
        </div>
      </div>

      {/* Right Controls: Recipe Book, Upgrades & Audio */}
      <div className="flex items-center gap-2">
        <button
          onClick={onOpenRecipeBook}
          type="button"
          className="p-2 sm:px-3 sm:py-1.5 rounded-full border border-[#B89C82]/30 bg-white/80 hover:bg-white text-xs font-semibold text-[#7A8974] transition-colors flex items-center gap-1.5"
          title="Open Recipe Book"
        >
          <BookOpen className="w-4 h-4" />
          <span className="hidden sm:inline">Recipes</span>
        </button>

        <button
          onClick={onOpenUpgrades}
          type="button"
          className="p-2 sm:px-3 sm:py-1.5 rounded-full border border-[#B89C82]/30 bg-white/80 hover:bg-white text-xs font-semibold text-[#B89C82] transition-colors flex items-center gap-1.5"
          title="Cozy Cafe Perks & Upgrades"
        >
          <ShoppingBag className="w-4 h-4 text-[#B89C82]" />
          <span className="hidden sm:inline">Upgrades</span>
        </button>

        <button
          onClick={onToggleSound}
          type="button"
          className="p-2 rounded-full border border-[#B89C82]/30 bg-white/80 hover:bg-white text-[#7A8974] transition-colors"
          title={soundEnabled ? 'Mute Game Audio' : 'Enable Game Audio'}
          aria-label="Toggle audio"
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4" />
          ) : (
            <VolumeX className="w-4 h-4 text-red-500" />
          )}
        </button>
      </div>
    </header>
  );
};
