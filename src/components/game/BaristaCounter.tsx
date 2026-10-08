import React from 'react';
import { CustomerCharacter, MachineAction } from './types';
import { Clock } from 'lucide-react';

interface BaristaCounterProps {
  activeCustomer: CustomerCharacter | null;
  machineAction: MachineAction;
  baristaMood: 'happy' | 'brewing' | 'cheering';
  happyCustomerMsg: string | null;
}

export const BaristaCounter: React.FC<BaristaCounterProps> = ({
  activeCustomer,
  machineAction,
  baristaMood,
  happyCustomerMsg,
}) => {
  return (
    <div className="relative rounded-3xl p-5 sm:p-7 bg-gradient-to-b from-[#F2EDE2] via-[#E8E1D2] to-[#DFCBB4] border-2 border-[#B89C82]/40 shadow-xl overflow-hidden mb-6">
      {/* Background Arch Window: Sun & Mount Mayon Horizon */}
      <div className="absolute top-2 right-6 opacity-20 pointer-events-none select-none flex flex-col items-center">
        <div className="w-20 h-20 rounded-full bg-amber-400 blur-md" />
        <span className="font-serif italic text-xs font-bold text-[#7A8974] mt-1">
          Aldaw Courtyard Sun
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
        {/* BARISTA CHARACTER (Left 4 Cols) */}
        <div className="md:col-span-4 flex items-center gap-4 bg-white/80 backdrop-blur-xs p-4 rounded-3xl border border-[#B89C82]/30 shadow-sm">
          {/* Animated Barista Avatar */}
          <div className="relative">
            <div
              className={`w-16 h-16 rounded-full bg-[#7A8974]/20 border-2 border-[#7A8974] flex items-center justify-center text-3xl shadow-md transition-transform duration-300 ${
                baristaMood === 'cheering' ? 'scale-115 rotate-3' : 'hover:scale-105'
              }`}
            >
              🧑‍🍳
            </div>
            {baristaMood === 'cheering' && (
              <span className="absolute -top-1 -right-1 text-base animate-bounce">✨</span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-sm text-[#2F362A]">Barista Aldaw</span>
              <span className="px-2 py-0.5 rounded-full bg-[#7A8974] text-white text-[9px] font-bold">
                You
              </span>
            </div>
            <div className="text-[11px] text-[#5E6659] mt-0.5">
              {machineAction === 'grinding' && '🫘 Grinding fresh beans...'}
              {machineAction === 'brewing' && '☕ Pulling golden espresso...'}
              {machineAction === 'steaming' && '🥛 Steaming silky microfoam...'}
              {machineAction === 'topping' && '🍪 Garnishing signature flair...'}
              {machineAction === 'idle' &&
                baristaMood === 'cheering' &&
                '🎉 Order served with love!'}
              {machineAction === 'idle' &&
                baristaMood !== 'cheering' &&
                'Ready to brew at the counter!'}
            </div>
          </div>
        </div>

        {/* CUSTOMER COUNTER & SPEECH BUBBLE (Right 8 Cols) */}
        <div className="md:col-span-8">
          {happyCustomerMsg ? (
            <div className="bg-emerald-500/15 border-2 border-emerald-500/40 p-4 rounded-3xl text-emerald-900 flex items-center gap-3 animate-in zoom-in-95 duration-200 shadow-md">
              <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-2xl shrink-0">
                ❤️
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 block">
                  Customer Delighted!
                </span>
                <p className="font-serif font-bold text-sm text-emerald-950">
                  {happyCustomerMsg}
                </p>
              </div>
            </div>
          ) : activeCustomer ? (
            <div className="bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-[#B89C82]/30 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Customer Avatar & Speech */}
              <div className="flex items-start gap-3.5 flex-1">
                <div className="w-14 h-14 rounded-2xl bg-[#EFECE4] border border-[#B89C82]/40 flex items-center justify-center text-3xl shrink-0 shadow-inner">
                  {activeCustomer.avatar}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-serif font-bold text-sm sm:text-base text-[#2F362A]">
                      {activeCustomer.name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#B89C82]/20 text-[#8C6D53] font-semibold">
                      {activeCustomer.role}
                    </span>
                  </div>

                  <p className="text-xs text-[#5E6659] leading-relaxed italic mb-2">
                    "{activeCustomer.quote}"
                  </p>

                  {/* Patience Bar */}
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#B89C82] shrink-0" />
                    <div className="w-32 sm:w-44 bg-black/10 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          activeCustomer.remainingPatience > 15
                            ? 'bg-emerald-500'
                            : activeCustomer.remainingPatience > 7
                            ? 'bg-amber-500'
                            : 'bg-red-500 animate-pulse'
                        }`}
                        style={{
                          width: `${(activeCustomer.remainingPatience / activeCustomer.maxPatience) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-[#8C9388] font-bold">
                      {activeCustomer.remainingPatience}s
                    </span>
                  </div>
                </div>
              </div>

              {/* Recipe Ticket Tag */}
              <div className="bg-[#FAF7F2] p-3 rounded-2xl border-2 border-dashed border-[#B89C82]/50 shrink-0 text-right w-full sm:w-auto">
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#B89C82]">
                  Order Ticket
                </div>
                <div className="font-serif font-bold text-sm text-[#7A8974]">
                  {activeCustomer.desiredRecipe.name}
                </div>
                <div className="text-[11px] font-mono font-bold text-[#3E453A]">
                  ₱{activeCustomer.desiredRecipe.price}
                </div>

                <div className="flex items-center justify-end gap-1 mt-1 text-[11px] font-semibold text-[#8C9388]">
                  {activeCustomer.desiredRecipe.temperature === 'iced' ? (
                    <span className="px-1.5 py-0.5 rounded bg-sky-100 text-sky-700 text-[9px] font-bold">
                      ICED 🧊
                    </span>
                  ) : (
                    <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700 text-[9px] font-bold">
                      HOT ☕
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/80 p-5 rounded-3xl border border-[#B89C82]/30 text-center text-[#8C9388] text-xs">
              Courtyard peaceful... waiting for the next customer to step up to the counter!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
