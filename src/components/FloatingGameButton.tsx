import React from 'react';
import { Gamepad2, Sparkles } from 'lucide-react';
import { ThemeMode } from '../types';

interface FloatingGameButtonProps {
  onPlayGame: () => void;
  themeMode: ThemeMode;
}

export const FloatingGameButton: React.FC<FloatingGameButtonProps> = ({
  onPlayGame,
  themeMode,
}) => {
  const isNight = themeMode === 'night';

  return (
    <aside aria-label="Game Launcher" className="fixed bottom-6 right-6 z-40 select-none">
      <button
        onClick={onPlayGame}
        type="button"
        className={`group relative flex items-center gap-3 px-5 py-3.5 rounded-full shadow-2xl border transition-all duration-300 hover:scale-105 active:scale-95 ${
          isNight
            ? 'bg-[#2A3226]/95 border-[#B89C82]/50 text-[#F7F5F0] hover:bg-[#343E30]'
            : 'bg-[#F7F5F0]/95 border-[#7A8974]/35 text-[#3E453A] hover:bg-[#FFFFFF]'
        } backdrop-blur-md`}
        title="Play the Cafe Aldaw Game"
        aria-label="Play the Cafe Aldaw Game"
      >
        {/* Pulsing indicator ring */}
        <span className="relative flex h-3 w-3 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7A8974] opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#7A8974]" />
        </span>

        {/* Minimalist Gamepad Icon */}
        <div className="w-7 h-7 rounded-full bg-[#7A8974]/15 flex items-center justify-center shrink-0 group-hover:bg-[#7A8974] group-hover:text-[#F7F5F0] transition-colors">
          <Gamepad2 className="w-4 h-4 text-[#7A8974] group-hover:text-[#F7F5F0] transition-colors" />
        </div>

        {/* Minimalist Label */}
        <div className="flex flex-col text-left">
          <span className="text-xs sm:text-sm font-semibold tracking-wide font-serif">
            Play the Cafe Aldaw Game
          </span>
          <span className="text-[10px] tracking-wider uppercase text-[#B89C82] font-medium hidden sm:inline-block flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 inline" /> Barista Courtyard Rush
          </span>
        </div>
      </button>
    </aside>
  );
};
