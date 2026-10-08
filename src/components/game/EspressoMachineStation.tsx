import React from 'react';
import { CupBrewState, MachineAction, CoffeeRecipe } from './types';
import { Sparkles, Trash2, Bell, Check, Flame, Droplets } from 'lucide-react';

interface EspressoMachineStationProps {
  cup: CupBrewState;
  machineAction: MachineAction;
  onGrindAndBrew: (coffeeType: 'espresso' | 'tea' | 'chocolate') => void;
  onAddMilk: (milkType: 'steamed_milk' | 'coconut_milk' | 'condensed_milk' | 'chocolate_milk') => void;
  onToggleIce: () => void;
  onAddTopping: (topping: 'biscoff' | 'caramel' | 'coconut_flakes' | 'boba') => void;
  onClearCup: () => void;
  onRingBell: () => void;
  targetRecipe?: CoffeeRecipe;
}

export const EspressoMachineStation: React.FC<EspressoMachineStationProps> = ({
  cup,
  machineAction,
  onGrindAndBrew,
  onAddMilk,
  onToggleIce,
  onAddTopping,
  onClearCup,
  onRingBell,
  targetRecipe,
}) => {
  const isCupEmpty = !cup.hasCoffee && !cup.hasMilk && !cup.hasTopping && !cup.hasIce;

  return (
    <div className="bg-[#23291F] rounded-3xl p-4 sm:p-6 border-2 border-[#7A8974]/40 shadow-2xl text-[#F7F5F0]">
      {/* Machine Top Brand Banner */}
      <div className="flex items-center justify-between border-b border-[#3E453A] pb-3 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-serif font-bold text-sm sm:text-base tracking-wide text-[#EED5B7]">
            ALDAW ESPRESSO ARTISAN MK-IV
          </span>
          <span className="px-2 py-0.5 rounded-full bg-[#7A8974] text-[9px] font-bold text-white uppercase tracking-wider hidden sm:inline">
            Courtyard Edition
          </span>
        </div>

        {/* Pressure Gauge & Temp Indicator */}
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1 text-[#B89C82]">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span className="font-mono">93.5°C</span>
          </div>
          <div className="flex items-center gap-1 text-[#7A8974]">
            <Droplets className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-mono">9.0 BAR</span>
          </div>
        </div>
      </div>

      {/* Main Machine Working Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* LEFT COLUMN: Coffee Extractor Controls (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-[10px] uppercase font-bold tracking-widest text-[#B89C82] flex items-center justify-between">
            <span>Step 1: Extract Base</span>
            {cup.hasCoffee && (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <Check className="w-3 h-3" /> Ready
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 gap-2">
            {/* Double Espresso */}
            <button
              onClick={() => onGrindAndBrew('espresso')}
              disabled={machineAction !== 'idle' || cup.hasCoffee === 'espresso'}
              type="button"
              className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                cup.hasCoffee === 'espresso'
                  ? 'bg-amber-950/50 border-amber-500/60 text-amber-200'
                  : 'bg-[#1C2118] border-[#3E453A] hover:border-[#7A8974] hover:bg-[#283123]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">☕</span>
                <div>
                  <div className="text-xs font-bold">Grind & Pull Espresso</div>
                  <div className="text-[10px] text-[#A8B0A5]">Double Albay Robusta/Arabica</div>
                </div>
              </div>
              {cup.hasCoffee === 'espresso' ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-bold">
                  Extracted
                </span>
              ) : (
                <span className="text-xs text-[#7A8974] font-bold">Brew ➔</span>
              )}
            </button>

            {/* Ceylon Black Tea */}
            <button
              onClick={() => onGrindAndBrew('tea')}
              disabled={machineAction !== 'idle' || cup.hasCoffee === 'tea'}
              type="button"
              className={`p-2.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                cup.hasCoffee === 'tea'
                  ? 'bg-emerald-950/50 border-emerald-500/60 text-emerald-200'
                  : 'bg-[#1C2118] border-[#3E453A] hover:border-[#7A8974] hover:bg-[#283123]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🍵</span>
                <div>
                  <div className="text-xs font-bold">Steep Ceylon Tea</div>
                  <div className="text-[10px] text-[#A8B0A5]">For Nutella Milk Tea</div>
                </div>
              </div>
              <span className="text-xs text-[#7A8974] font-bold">Steep</span>
            </button>

            {/* Rich Cocoa */}
            <button
              onClick={() => onGrindAndBrew('chocolate')}
              disabled={machineAction !== 'idle' || cup.hasCoffee === 'chocolate'}
              type="button"
              className={`p-2.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                cup.hasCoffee === 'chocolate'
                  ? 'bg-amber-950/50 border-amber-500/60 text-amber-200'
                  : 'bg-[#1C2118] border-[#3E453A] hover:border-[#7A8974] hover:bg-[#283123]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">🍫</span>
                <div>
                  <div className="text-xs font-bold">Melt Cocoa Base</div>
                  <div className="text-[10px] text-[#A8B0A5]">For Strawberry Choco</div>
                </div>
              </div>
              <span className="text-xs text-[#7A8974] font-bold">Melt</span>
            </button>
          </div>
        </div>

        {/* CENTER COLUMN: Physical Visual Glass Cup & Machine Bay (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-[#181C15] rounded-3xl border border-[#3E453A]/60 shadow-inner relative overflow-hidden">
          {/* Machine Group Head Hardware Graphic */}
          <div className="w-28 h-5 bg-[#3E453A] rounded-t-lg border-b-2 border-[#B89C82]/40 flex justify-center items-center shadow-md mb-2">
            <div className="w-16 h-2 bg-black/40 rounded-full" />
          </div>

          {/* Steam / Stream Droplets during brewing animation */}
          {machineAction === 'brewing' && (
            <div className="absolute top-12 flex gap-3 text-amber-400 animate-bounce">
              <span className="text-xs">💧</span>
              <span className="text-xs">💧</span>
            </div>
          )}

          {machineAction === 'steaming' && (
            <div className="absolute top-10 flex gap-2 text-white/80 animate-pulse">
              <span className="text-sm">☁️</span>
              <span className="text-xs">💨</span>
              <span className="text-sm">☁️</span>
            </div>
          )}

          {/* Visual Cup Container */}
          <div className="relative w-28 h-36 border-2 border-white/40 rounded-b-3xl rounded-t-lg bg-white/5 backdrop-blur-xs flex flex-col justify-end p-2 overflow-hidden shadow-2xl">
            {/* Ice Cubes floating inside */}
            {cup.hasIce && (
              <div className="absolute top-4 inset-x-0 flex justify-center gap-1 z-20 pointer-events-none">
                <span className="text-sm animate-pulse">🧊</span>
                <span className="text-xs animate-pulse">🧊</span>
                <span className="text-sm animate-pulse">🧊</span>
              </div>
            )}

            {/* Topping on top layer */}
            {cup.hasTopping && (
              <div className="w-full py-1.5 rounded-t-xl bg-amber-800/80 text-[10px] text-center font-bold text-amber-100 shadow-md z-10 truncate">
                {cup.hasTopping === 'biscoff' && '🍪 Biscoff Crumb'}
                {cup.hasTopping === 'caramel' && '🍯 Caramel Drizzle'}
                {cup.hasTopping === 'coconut_flakes' && '🥥 Coconut Flakes'}
                {cup.hasTopping === 'boba' && '🧋 Boba Pearls'}
              </div>
            )}

            {/* Milk Layer */}
            {cup.hasMilk && (
              <div
                className={`w-full transition-all duration-500 rounded-t-md ${
                  cup.hasMilk === 'condensed_milk'
                    ? 'h-10 bg-[#FAF3DD] text-[#3E453A]'
                    : cup.hasMilk === 'coconut_milk'
                    ? 'h-12 bg-[#F4F1DE] text-[#3E453A]'
                    : cup.hasMilk === 'chocolate_milk'
                    ? 'h-12 bg-[#7F4F24] text-white'
                    : 'h-12 bg-[#E9ECEF] text-[#3E453A]'
                } flex items-center justify-center text-[9px] font-bold truncate px-1 shadow-inner`}
              >
                {cup.hasMilk === 'condensed_milk' && 'Condensed Milk'}
                {cup.hasMilk === 'coconut_milk' && 'Coconut Gata'}
                {cup.hasMilk === 'chocolate_milk' && 'Choco Milk'}
                {cup.hasMilk === 'steamed_milk' && 'Steamed Milk'}
              </div>
            )}

            {/* Base Coffee Layer */}
            {cup.hasCoffee && (
              <div
                className={`w-full h-12 transition-all duration-500 rounded-b-2xl ${
                  cup.hasCoffee === 'espresso'
                    ? 'bg-[#3D2314] text-amber-200'
                    : cup.hasCoffee === 'tea'
                    ? 'bg-[#582F0E] text-amber-100'
                    : 'bg-[#271004] text-white'
                } flex items-center justify-center text-[10px] font-bold shadow-inner`}
              >
                {cup.hasCoffee === 'espresso' && 'Crema Espresso'}
                {cup.hasCoffee === 'tea' && 'Ceylon Tea'}
                {cup.hasCoffee === 'chocolate' && 'Rich Cocoa'}
              </div>
            )}

            {/* Empty cup message */}
            {isCupEmpty && (
              <div className="h-full flex items-center justify-center text-center text-white/30 text-[10px] italic">
                Clean Artisan Cup
              </div>
            )}
          </div>

          {/* Cup Status & Quick Reset */}
          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={onToggleIce}
              type="button"
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all flex items-center gap-1 ${
                cup.hasIce
                  ? 'bg-sky-500 text-white border-sky-400 shadow-sm'
                  : 'bg-black/40 text-[#A8B0A5] border-white/10 hover:border-white/30'
              }`}
            >
              <span>🧊</span>
              <span>{cup.hasIce ? 'Iced' : '+ Add Ice'}</span>
            </button>

            {!isCupEmpty && (
              <button
                onClick={onClearCup}
                type="button"
                className="p-1.5 rounded-full bg-red-500/20 text-red-300 hover:bg-red-500/40 border border-red-500/30 transition-colors"
                title="Discard & Start Fresh Cup"
                aria-label="Discard cup"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Milk Frother & Toppings (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Milk Selection */}
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#B89C82] flex items-center justify-between mb-1.5">
              <span>Step 2: Steam & Pour Milk</span>
              {cup.hasMilk && (
                <span className="text-emerald-400 font-bold flex items-center gap-1 text-[10px]">
                  <Check className="w-3 h-3" /> Poured
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => onAddMilk('condensed_milk')}
                disabled={machineAction !== 'idle' || cup.hasMilk === 'condensed_milk'}
                type="button"
                className="p-2 rounded-xl bg-[#1C2118] border border-[#3E453A] hover:border-[#7A8974] text-xs font-semibold flex items-center gap-1.5"
              >
                <span>🍯</span>
                <span className="truncate">Condensed</span>
              </button>

              <button
                onClick={() => onAddMilk('coconut_milk')}
                disabled={machineAction !== 'idle' || cup.hasMilk === 'coconut_milk'}
                type="button"
                className="p-2 rounded-xl bg-[#1C2118] border border-[#3E453A] hover:border-[#7A8974] text-xs font-semibold flex items-center gap-1.5"
              >
                <span>🥥</span>
                <span className="truncate">Coconut Gata</span>
              </button>

              <button
                onClick={() => onAddMilk('steamed_milk')}
                disabled={machineAction !== 'idle' || cup.hasMilk === 'steamed_milk'}
                type="button"
                className="p-2 rounded-xl bg-[#1C2118] border border-[#3E453A] hover:border-[#7A8974] text-xs font-semibold flex items-center gap-1.5"
              >
                <span>🥛</span>
                <span className="truncate">Steamed Milk</span>
              </button>

              <button
                onClick={() => onAddMilk('chocolate_milk')}
                disabled={machineAction !== 'idle' || cup.hasMilk === 'chocolate_milk'}
                type="button"
                className="p-2 rounded-xl bg-[#1C2118] border border-[#3E453A] hover:border-[#7A8974] text-xs font-semibold flex items-center gap-1.5"
              >
                <span>🍫</span>
                <span className="truncate">Choco Milk</span>
              </button>
            </div>
          </div>

          {/* Toppings Selection */}
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-[#B89C82] flex items-center justify-between mb-1.5">
              <span>Step 3: Signature Aldaw Topping</span>
              {cup.hasTopping && (
                <span className="text-emerald-400 font-bold flex items-center gap-1 text-[10px]">
                  <Check className="w-3 h-3" /> Garnished
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => onAddTopping('biscoff')}
                disabled={machineAction !== 'idle' || cup.hasTopping === 'biscoff'}
                type="button"
                className="p-2 rounded-xl bg-[#1C2118] border border-[#3E453A] hover:border-[#7A8974] text-xs font-semibold flex items-center gap-1.5"
              >
                <span>🍪</span>
                <span className="truncate">Biscoff Crumb</span>
              </button>

              <button
                onClick={() => onAddTopping('caramel')}
                disabled={machineAction !== 'idle' || cup.hasTopping === 'caramel'}
                type="button"
                className="p-2 rounded-xl bg-[#1C2118] border border-[#3E453A] hover:border-[#7A8974] text-xs font-semibold flex items-center gap-1.5"
              >
                <span>🍯</span>
                <span className="truncate">Caramel Drizzle</span>
              </button>

              <button
                onClick={() => onAddTopping('coconut_flakes')}
                disabled={machineAction !== 'idle' || cup.hasTopping === 'coconut_flakes'}
                type="button"
                className="p-2 rounded-xl bg-[#1C2118] border border-[#3E453A] hover:border-[#7A8974] text-xs font-semibold flex items-center gap-1.5"
              >
                <span>🥥</span>
                <span className="truncate">Coconut Flakes</span>
              </button>

              <button
                onClick={() => onAddTopping('boba')}
                disabled={machineAction !== 'idle' || cup.hasTopping === 'boba'}
                type="button"
                className="p-2 rounded-xl bg-[#1C2118] border border-[#3E453A] hover:border-[#7A8974] text-xs font-semibold flex items-center gap-1.5"
              >
                <span>🧋</span>
                <span className="truncate">Boba Pearls</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Counter Bottom Service Bar */}
      <div className="mt-5 pt-4 border-t border-[#3E453A] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-[#A8B0A5] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#EED5B7]" />
          <span>
            Target Recipe:{' '}
            <strong className="text-[#EED5B7]">
              {targetRecipe ? targetRecipe.name : 'Waiting for customer...'}
            </strong>
          </span>
        </div>

        {/* Big Brass Service Bell */}
        <button
          onClick={onRingBell}
          type="button"
          disabled={isCupEmpty}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-xl transition-all ${
            isCupEmpty
              ? 'bg-[#3E453A]/40 text-[#A8B0A5] cursor-not-allowed border border-[#3E453A]'
              : 'bg-gradient-to-r from-[#D4A373] via-[#EED5B7] to-[#B89C82] text-[#242A20] hover:scale-105 active:scale-95 border-2 border-white ring-4 ring-[#7A8974]/30'
          }`}
        >
          <Bell className="w-4 h-4 text-[#242A20] fill-[#242A20]" />
          <span>Ring Brass Bell & Serve Order (DING!)</span>
        </button>
      </div>
    </div>
  );
};
